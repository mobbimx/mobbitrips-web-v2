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
    <main id="main-content">
      {/* Header */}
      <div className="bg-white border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary">
            Propiedades vacacionales
          </p>
          <h1 className="font-comfortaa text-3xl font-bold text-brand-charcoal sm:text-4xl">
            Nuestras propiedades
          </h1>
          <p className="mt-2 text-brand-gray">
            {properties.length} propiedade{properties.length !== 1 ? 's' : ''} disponible
            {properties.length !== 1 ? 's' : ''} — reserva directo y ahorra
          </p>
        </div>
      </div>

      <div className="bg-brand-cream min-h-screen">
        <PropertiesView properties={properties} />
      </div>
    </main>
  );
}
