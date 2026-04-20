import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyBySlug, calculateTotalPrice } from '@mobbitrips/hostex-client';
import { ReservaForm } from './ReservaForm';

export const metadata: Metadata = {
  title: 'Solicitar reserva',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: {
    property?: string;
    from?: string;
    to?: string;
    guests?: string;
  };
}

export default async function ReservaNuevaPage({ searchParams }: PageProps) {
  const { property: slug, from, to, guests: guestsStr } = searchParams;

  if (!slug || !from || !to) notFound();

  const guests = Math.max(1, parseInt(guestsStr ?? '1', 10));

  const [property] = await Promise.all([getPropertyBySlug(slug)]);

  if (!property) notFound();

  const pricingData = await calculateTotalPrice(property.id, from, to, guests).catch(() => null);

  return (
    <main id="main-content" className="min-h-screen bg-brand-cream py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-2 font-comfortaa text-3xl font-bold text-brand-charcoal">
          Solicitar reserva
        </h1>
        <p className="mb-8 text-brand-gray">Llena tus datos y te confirmamos la disponibilidad.</p>

        {/* Resumen */}
        <div className="mb-8 rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-comfortaa text-lg font-semibold text-brand-charcoal">
            {property.name}
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-brand-gray">Entrada</span>
              <p className="font-semibold text-brand-charcoal">{from}</p>
            </div>
            <div>
              <span className="text-brand-gray">Salida</span>
              <p className="font-semibold text-brand-charcoal">{to}</p>
            </div>
            <div>
              <span className="text-brand-gray">Huéspedes</span>
              <p className="font-semibold text-brand-charcoal">{guests}</p>
            </div>
            {pricingData && (
              <div>
                <span className="text-brand-gray">Total</span>
                <p className="font-bold text-primary">
                  ${pricingData.total.toLocaleString('es-MX')} MXN
                </p>
              </div>
            )}
          </div>
          {pricingData && (
            <div className="mt-4 space-y-1 border-t border-brand-border pt-4 text-xs text-brand-gray">
              <div className="flex justify-between">
                <span>
                  ${pricingData.pricePerNight.toLocaleString('es-MX')} × {pricingData.nights}{' '}
                  {pricingData.nights === 1 ? 'noche' : 'noches'}
                </span>
                <span>${pricingData.accommodationTotal.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span>Limpieza</span>
                <span>${pricingData.cleaningFee.toLocaleString('es-MX')}</span>
              </div>
              {pricingData.extraGuestFee > 0 && (
                <div className="flex justify-between">
                  <span>Huéspedes adicionales</span>
                  <span>${pricingData.extraGuestFee.toLocaleString('es-MX')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <ReservaForm
          propertySlug={slug}
          propertyName={property.name}
          checkIn={from}
          checkOut={to}
          guests={guests}
          totalMxn={pricingData?.total ?? 0}
        />
      </div>
    </main>
  );
}
