import Link from 'next/link';
import Image from 'next/image';
import { Users, BedDouble, Bath, Star } from 'lucide-react';
import { Badge } from '@mobbitrips/ui';
import type { InternalProperty } from '@mobbitrips/hostex-client';

interface PropertyCardProps {
  property: InternalProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    slug,
    name,
    shortDescription,
    location,
    pricePerNight,
    maxGuests,
    bedrooms,
    bathrooms,
    coverImageUrl,
  } = property;

  return (
    <Link
      href={`/propiedades/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Ver ${name}`}
    >
      <div className="relative h-52 overflow-hidden bg-brand-border">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary-soft via-primary-light to-primary" />
        )}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-4">
          <Badge variant="coral" className="text-xs">
            Disponible
          </Badge>
        </div>
        <div className="absolute right-4 top-4 rounded-xl bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="text-xs text-brand-gray">desde</span>
          <p className="text-sm font-bold text-brand-charcoal">
            ${pricePerNight.toLocaleString('es-MX')}{' '}
            <span className="text-xs font-normal text-brand-gray">MXN/noche</span>
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
          <span className="flex items-center gap-1">
            <Bath size={13} aria-hidden="true" />
            {bathrooms} baño{bathrooms !== 1 ? 's' : ''}
          </span>
          <span className="ml-auto flex items-center gap-1 font-semibold text-status-warning">
            <Star size={13} className="fill-status-warning" aria-hidden="true" />
            Nuevo
          </span>
        </div>
      </div>
    </Link>
  );
}
