import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';
import type { Reservation } from '@/types/db';

export const metadata: Metadata = {
  title: 'Pagar reserva',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { id: string };
}

export default async function PagarPage({ params }: PageProps) {
  const { data, error } = await supabaseAdmin
    .from('reservations')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) notFound();

  const reservation = data as Reservation;

  if (reservation.status === 'paid') {
    redirect(`/reserva/${params.id}/exito?session_id=already_paid`);
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
            name: `Reserva ${reservation.property_slug} · ${reservation.check_in_date} → ${reservation.check_out_date}`,
            description: `${reservation.guests} huésped${reservation.guests > 1 ? 'es' : ''} · Folio ${reservation.id.slice(0, 8).toUpperCase()}`,
          },
        },
      },
    ],
    customer_email: reservation.guest_email,
    metadata: { reservation_id: params.id },
    success_url: `${siteUrl}/reserva/${params.id}/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/reserva/${params.id}/exito`,
  });

  await supabaseAdmin
    .from('reservations')
    .update({ stripe_session_id: session.id })
    .eq('id', params.id);

  if (!session.url) notFound();

  redirect(session.url);
}
