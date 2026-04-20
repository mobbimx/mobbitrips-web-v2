'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from './PropertyCard';
import { PropertyFilters } from './PropertyFilters';
import { Skeleton } from '@mobbitrips/ui';
import type { InternalProperty } from '@mobbitrips/hostex-client';

interface PropertiesViewProps {
  properties: InternalProperty[];
}

function filterProperties(
  properties: InternalProperty[],
  guests: number,
  maxPrice: number,
  amenities: string[],
): InternalProperty[] {
  return properties.filter((p) => {
    if (p.maxGuests < guests) return false;
    if (p.pricePerNight > maxPrice) return false;
    if (amenities.length > 0 && !amenities.every((a) => p.amenities.includes(a))) return false;
    return true;
  });
}

function PropertiesGrid({ properties }: { properties: InternalProperty[] }) {
  const searchParams = useSearchParams();

  const guests = Number(searchParams.get('guests') ?? '1');
  const maxPrice = Number(searchParams.get('maxPrice') ?? '5000');
  const amenities = searchParams.get('amenities')?.split(',').filter(Boolean) ?? [];

  const filtered = filterProperties(properties, guests, maxPrice, amenities);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-border bg-white py-16 text-center">
        <p className="text-lg font-comfortaa font-semibold text-brand-charcoal">Sin resultados</p>
        <p className="mt-2 max-w-xs text-sm text-brand-gray">
          Ninguna propiedad coincide con tus filtros. Intenta ajustarlos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {filtered.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-4 border-t border-brand-border pt-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function PropertiesView({ properties }: PropertiesViewProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-72 lg:flex-shrink-0">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-brand-border bg-white p-5">
                <Skeleton className="mb-4 h-5 w-24" />
                <Skeleton className="mb-4 h-24 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            }
          >
            <PropertyFilters />
          </Suspense>
        </aside>

        {/* Properties grid */}
        <div className="flex-1">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <PropertiesGrid properties={properties} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
