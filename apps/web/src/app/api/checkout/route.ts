import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { isRateLimited, getIp } from '@/lib/ratelimit';

const schema = z.object({
  reservation_id: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  if (isRateLimited(ip, 3)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'ID de reserva inválido' }, { status: 400 });
  }

  const { reservation_id } = parsed.data;

  const { data: reservation, error } = await supabaseAdmin
    .from('reservations')
    .select('*')
    .eq('id', reservation_id)
    .single();

  if (error || !reservation) {
    return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
  }

  if (reservation.status === 'paid') {
    return NextResponse.json({ error: 'Esta reserva ya fue pagada' }, { status: 409 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'mxn',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'mxn',
          unit_amount: Math.round(reservation.total_mxn * 100),
          product_data: {
            name: `Reserva en ${reservation.property_slug} · ${reservation.check_in_date} → ${reservation.check_out_date}`,
            description: `${reservation.guests} huésped${reservation.guests > 1 ? 'es' : ''} · Folio ${reservation.id.slice(0, 8).toUpperCase()}`,
          },
        },
      },
    ],
    customer_email: reservation.guest_email,
    metadata: { reservation_id },
    success_url: `${siteUrl}/reserva/${reservation_id}/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/reserva/${reservation_id}/exito`,
  });

  // Save session ID to reservation
  await supabaseAdmin
    .from('reservations')
    .update({ stripe_session_id: session.id })
    .eq('id', reservation_id);

  return NextResponse.json({ url: session.url });
}
