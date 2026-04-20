import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle, Calendar, Users, MessageCircle } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';
import type { Reservation } from '@/types/db';
import { ExitoActions } from './ExitoActions';

export const metadata: Metadata = {
  title: '¡Solicitud enviada!',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { id: string };
  searchParams: { session_id?: string };
}

export default async function ExitoPage({ params, searchParams }: PageProps) {
  const { data, error } = await supabaseAdmin
    .from('reservations')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) notFound();

  const reservation = data as Reservation;
  const isPaid = reservation.status === 'paid' || Boolean(searchParams.session_id);

  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';
  const waMsg = encodeURIComponent(
    `Hola, soy ${reservation.guest_name}. Acabo de hacer una solicitud de reserva (${reservation.id.slice(0, 8).toUpperCase()}) del ${reservation.check_in_date} al ${reservation.check_out_date}. ¿Me pueden ayudar?`,
  );
  const waUrl = `https://wa.me/${WA}?text=${waMsg}`;

  return (
    <main id="main-content" className="min-h-screen bg-brand-cream py-12">
      <div className="mx-auto max-w-lg px-4">
        {/* Status banner */}
        <div className="mb-8 rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mb-4 flex justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-status-success/10">
              <CheckCircle size={36} className="text-status-success" aria-hidden="true" />
            </span>
          </div>
          <h1 className="font-comfortaa text-2xl font-bold text-brand-charcoal">
            {isPaid ? '¡Pago recibido!' : '¡Solicitud enviada!'}
          </h1>
          <p className="mt-2 text-brand-gray">
            {isPaid
              ? 'Tu pago fue procesado. Te escribiremos para coordinar el check-in.'
              : 'Te contactaremos pronto para confirmar tu reserva.'}
          </p>
          <p className="mt-1 text-xs text-brand-light">
            Folio: <strong>{reservation.id.slice(0, 8).toUpperCase()}</strong>
          </p>
        </div>

        {/* Reservation details */}
        <div className="mb-6 rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-comfortaa text-base font-semibold text-brand-charcoal">
            Detalle de tu reserva
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="shrink-0 text-primary" aria-hidden="true" />
              <span className="text-brand-gray">Entrada:</span>
              <span className="font-semibold text-brand-charcoal">{reservation.check_in_date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="shrink-0 text-primary" aria-hidden="true" />
              <span className="text-brand-gray">Salida:</span>
              <span className="font-semibold text-brand-charcoal">
                {reservation.check_out_date}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={16} className="shrink-0 text-primary" aria-hidden="true" />
              <span className="text-brand-gray">Huéspedes:</span>
              <span className="font-semibold text-brand-charcoal">{reservation.guests}</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle size={16} className="shrink-0 text-primary" aria-hidden="true" />
              <span className="text-brand-gray">Total:</span>
              <span className="font-bold text-primary">
                ${reservation.total_mxn.toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <ExitoActions reservationId={reservation.id} isPaid={isPaid} waUrl={waUrl} />
      </div>
    </main>
  );
}
