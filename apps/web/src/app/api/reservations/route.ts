import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { sendReservationConfirmation } from '@/lib/email';
import { checkAvailability, getPropertyBySlug } from '@mobbitrips/hostex-client';
import { isRateLimited, getIp } from '@/lib/ratelimit';

const schema = z.object({
  property_slug: z.string().min(1),
  guest_name: z.string().min(2).max(120),
  guest_email: z.string().email(),
  guest_phone: z.string().regex(/^(\+?52)?[ -]?[0-9]{10}$/, 'Teléfono mexicano de 10 dígitos'),
  check_in_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.coerce.number().int().min(1).max(20),
  total_mxn: z.coerce.number().positive(),
  notes: z.string().max(500).optional().default(''),
});

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes, intenta más tarde.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { property_slug, check_in_date, check_out_date, guests, ...rest } = parsed.data;

  if (check_in_date >= check_out_date) {
    return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 });
  }

  // Verify property exists and get its ID
  const property = await getPropertyBySlug(property_slug);
  if (!property) {
    return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });
  }

  // Re-check availability before inserting
  const availability = await checkAvailability(property.id, check_in_date, check_out_date);
  if (!availability.available) {
    return NextResponse.json({ error: 'Las fechas ya no están disponibles' }, { status: 409 });
  }

  const { data: reservation, error } = await supabaseAdmin
    .from('reservations')
    .insert({
      property_id: property.id,
      property_slug,
      check_in_date,
      check_out_date,
      guests,
      ...rest,
      status: 'pending',
    })
    .select()
    .single();

  if (error || !reservation) {
    return NextResponse.json({ error: 'Error al guardar la reserva' }, { status: 500 });
  }

  // Log event for n8n
  await supabaseAdmin.from('events').insert({
    event_type: 'reservation.requested',
    payload: { reservation_id: reservation.id, property_slug, guests, total_mxn: rest.total_mxn },
  });

  // Send confirmation email (non-blocking)
  sendReservationConfirmation(
    reservation as Parameters<typeof sendReservationConfirmation>[0],
    property.name,
  ).catch(() => null);

  return NextResponse.json({ id: reservation.id, ok: true }, { status: 201 });
}
