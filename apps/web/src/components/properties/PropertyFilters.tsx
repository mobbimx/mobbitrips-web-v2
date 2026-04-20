'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';

const AMENITY_OPTIONS = [
  'WiFi',
  'Cocina completa',
  'Estacionamiento',
  'Zona BBQ',
  'Jardín',
  'Terraza',
  'Alberca',
  'TV',
];

export function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const guests = Number(searchParams.get('guests') ?? '1');
  const maxPrice = Number(searchParams.get('maxPrice') ?? '5000');
  const activeAmenities = searchParams.get('amenities')?.split(',').filter(Boolean) ?? [];

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  function toggleAmenity(amenity: string) {
    const next = activeAmenities.includes(amenity)
      ? activeAmenities.filter((a) => a !== amenity)
      : [...activeAmenities, amenity];
    update('amenities', next.join(','));
  }

  return (
    <aside
      aria-label="Filtros de búsqueda"
      className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-primary" aria-hidden="true" />
        <h2 className="font-comfortaa font-semibold text-brand-charcoal">Filtros</h2>
      </div>

      {/* Guests */}
      <div className="mb-5">
        <label
          htmlFor="filter-guests"
          className="mb-2 block text-sm font-medium text-brand-charcoal"
        >
          Huéspedes (mínimo)
        </label>
        <div className="flex gap-2" role="group" aria-label="Número mínimo de huéspedes">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update('guests', n === 1 ? '' : String(n))}
              aria-pressed={guests === n || (n === 1 && guests <= 1)}
              className={`h-9 w-9 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                (n === 1 && guests <= 1) || guests === n
                  ? 'bg-primary text-white'
                  : 'border border-brand-border text-brand-gray hover:border-primary hover:text-primary'
              }`}
            >
              {n === 6 ? '6+' : n}
            </button>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div className="mb-5">
        <label
          htmlFor="filter-price"
          className="mb-2 flex justify-between text-sm font-medium text-brand-charcoal"
        >
          <span>Precio máx./noche</span>
          <span className="font-normal text-brand-gray">
            ${maxPrice.toLocaleString('es-MX')} MXN
          </span>
        </label>
        <input
          id="filter-price"
          type="range"
          min={500}
          max={5000}
          step={100}
          value={maxPrice}
          onChange={(e) => update('maxPrice', e.target.value === '5000' ? '' : e.target.value)}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-border accent-primary"
          aria-valuemin={500}
          aria-valuemax={5000}
          aria-valuenow={maxPrice}
        />
        <div className="mt-1 flex justify-between text-xs text-brand-light">
          <span>$500</span>
          <span>$5,000</span>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <p className="mb-2 text-sm font-medium text-brand-charcoal">Amenidades</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por amenidades">
          {AMENITY_OPTIONS.map((amenity) => {
            const active = activeAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                aria-pressed={active}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                  active
                    ? 'bg-primary text-white'
                    : 'border border-brand-border text-brand-gray hover:border-primary hover:text-primary'
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
