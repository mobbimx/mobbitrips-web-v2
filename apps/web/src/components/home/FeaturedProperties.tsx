import Link from 'next/link';
import Image from 'next/image';
import { Users, BedDouble, Home, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';
import { getProperties, type InternalProperty } from '@mobbitrips/hostex-client';

function PropertyCard({
  property,
  priority = false,
}: {
  property: InternalProperty;
  priority?: boolean;
}) {
  const {
    slug,
    name,
    shortDescription,
    location,
    pricePerNight,
    maxGuests,
    bedrooms,
    coverImageUrl,
  } = property;

  return (
    <Link
      href={`/propiedades/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Ver ${name}`}
    >
      <div className="relative h-60 overflow-hidden bg-brand-border">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-soft to-brand-cream">
            <Home size={40} className="text-primary-light" aria-hidden="true" />
          </div>
        )}
        <div className="absolute right-4 top-4 rounded-xl bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
          <p className="text-xs text-brand-gray">desde</p>
          <p className="text-sm font-bold text-brand-charcoal">
            ${pricePerNight.toLocaleString('es-MX')}
            <span className="text-xs font-normal text-brand-gray"> MXN/noche</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-comfortaa text-lg font-semibold text-brand-charcoal transition-colors duration-200 group-hover:text-primary">
            {name}
          </h3>
          <p className="mt-0.5 text-xs text-brand-light">{location}</p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-brand-gray">{shortDescription}</p>
        <div className="flex items-center gap-4 border-t border-brand-border pt-3 text-xs text-brand-gray">
          <span className="flex items-center gap-1">
            <Users size={13} aria-hidden="true" />
            {maxGuests} huéspedes
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={13} aria-hidden="true" />
            {bedrooms} hab.
          </span>
        </div>
      </div>
    </Link>
  );
}

export async function FeaturedProperties() {
  const allProperties = await getProperties().catch(() => []);
  const properties = allProperties.slice(0, 3);

  if (properties.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Nuestras propiedades
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="featured-heading"
              className="font-comfortaa font-bold text-brand-charcoal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              Un rincón especial
              <br />
              te espera.
            </h2>
            <Link
              href="/propiedades"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:underline"
            >
              Ver todas las propiedades
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <AnimatedSection key={property.id} direction="up" delay={i * 0.1}>
              <PropertyCard property={property} priority={i === 0} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
