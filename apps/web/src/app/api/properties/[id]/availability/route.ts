import { NextResponse, type NextRequest } from 'next/server';
import { checkAvailability, calculateTotalPrice } from '@mobbitrips/hostex-client';
import { z } from 'zod';

// Simple in-memory rate limiter (ephemeral, resets on cold start — good enough for Sprint 1)
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const history = requestLog.get(ip) ?? [];
  const recent = history.filter((t) => now - t < windowMs);
  if (recent.length >= limit) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

const querySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'formato YYYY-MM-DD'),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'formato YYYY-MM-DD'),
  guests: z.coerce.number().int().min(1).max(20).optional().default(1),
  pricing: z.enum(['true', 'false']).optional().default('false'),
});

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes, intenta más tarde.' },
      { status: 429 },
    );
  }

  const propertyId = Number(params.id);
  if (!Number.isFinite(propertyId) || propertyId <= 0) {
    return NextResponse.json({ error: 'ID de propiedad inválido' }, { status: 400 });
  }

  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { from, to, guests, pricing: withPricing } = parsed.data;

  if (from >= to) {
    return NextResponse.json(
      { error: 'La fecha de salida debe ser posterior a la de entrada' },
      { status: 400 },
    );
  }

  try {
    const [availability, pricingResult] = await Promise.all([
      checkAvailability(propertyId, from, to),
      withPricing === 'true' ? calculateTotalPrice(propertyId, from, to, guests) : null,
    ]);

    return NextResponse.json({
      available: availability.available,
      ...(pricingResult ? { pricing: pricingResult } : {}),
    });
  } catch {
    return NextResponse.json({ error: 'Error verificando disponibilidad' }, { status: 500 });
  }
}
