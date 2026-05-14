import type { Metadata } from 'next';
import { getProperties } from '@mobbitrips/hostex-client';
import { PropertiesView } from '@/components/properties/PropertiesView';

export const metadata: Metadata = {
  title: 'Propiedades — Mobbitrips',
  description:
    'Explora nuestras propiedades vacacionales en México. Departamentos y casas para todos los grupos, con reserva directa y los mejores precios.',
  openGraph: {
    title: 'Propiedades vacacionales — Mobbitrips',
    description:
      'Departamentos y casas en México. Reserva directo, sin intermediarios, y paga menos.',
    url: '/propiedades',
  },
};

export const dynamic = 'force-dynamic';

export default async function PropiedadesPage() {
  const properties = await getProperties();

  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-28" aria-labelledby="propiedades-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Propiedades vacacionales
            </p>
          </div>
          <h1
            id="propiedades-heading"
            className="font-comfortaa font-bold text-brand-charcoal"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Casas con alma, <em className="not-italic text-primary">no hoteles.</em>
          </h1>
          <p className="mt-4 text-brand-gray">
            {properties.length} propiedad{properties.length !== 1 ? 'es' : ''} disponible
            {properties.length !== 1 ? 's' : ''} — reserva directo y ahorra
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="pb-24">
        <PropertiesView properties={properties} />
      </div>
    </>
  );
}
