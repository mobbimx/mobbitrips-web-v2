import Link from 'next/link';
import { Users, BedDouble, Star, ArrowRight } from 'lucide-react';
import { Badge, AnimatedSection } from '@mobbitrips/ui';
import { MOCK_PROPERTIES, type MockProperty } from '@/lib/mocks';

function PropertyCard({ property }: { property: MockProperty }) {
  const {
    slug,
    name,
    shortDescription,
    location,
    pricePerNight,
    maxGuests,
    bedrooms,
    rating,
    reviewCount,
    gradient,
  } = property;

  return (
    <Link
      href={`/propiedades/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Ver ${name}`}
    >
      {/* Imagen placeholder */}
      <div className={`relative h-52 bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-4">
          <Badge variant="coral" className="text-xs">
            Disponible
          </Badge>
        </div>
        {/* Precio flotante */}
        <div className="absolute right-4 top-4 rounded-xl bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="text-xs text-brand-gray">desde</span>
          <p className="text-sm font-bold text-brand-charcoal">
            ${pricePerNight.toLocaleString('es-MX')}{' '}
            <span className="text-xs font-normal text-brand-gray">MXN/noche</span>
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-comfortaa text-lg font-semibold text-brand-charcoal group-hover:text-primary transition-colors duration-200">
            {name}
          </h3>
          <p className="mt-0.5 text-xs text-brand-light">{location}</p>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-brand-gray">{shortDescription}</p>

        {/* Atributos */}
        <div className="flex items-center gap-4 border-t border-brand-border pt-3 text-xs text-brand-gray">
          <span className="flex items-center gap-1">
            <Users size={13} aria-hidden="true" />
            {maxGuests} huéspedes
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={13} aria-hidden="true" />
            {bedrooms} hab.
          </span>
          <span className="ml-auto flex items-center gap-1 font-semibold text-brand-charcoal">
            <Star
              size={13}
              className="fill-status-warning text-status-warning"
              aria-hidden="true"
            />
            {rating} ({reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProperties() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Nuestras propiedades
          </p>
          <h2
            id="featured-heading"
            className="font-comfortaa text-3xl font-bold text-brand-charcoal sm:text-4xl"
          >
            Un rincón especial te espera
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-gray">
            Cada propiedad es seleccionada y cuidada por nuestro equipo para que tu estadía sea
            exactamente como la imaginaste.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROPERTIES.map((property, i) => (
            <AnimatedSection key={property.id} direction="up" delay={i * 0.1}>
              <PropertyCard property={property} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection direction="up" delay={0.3} className="mt-12 text-center">
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Ver todas las propiedades
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
