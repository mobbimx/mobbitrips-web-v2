'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Search } from 'lucide-react';
import { Button } from '@mobbitrips/ui';
import { cn } from '@mobbitrips/ui';

function getMinDate() {
  return new Date().toISOString().split('T')[0] ?? '';
}

function getDefaultCheckout(checkin: string) {
  if (!checkin) return '';
  const d = new Date(checkin);
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0] ?? '';
}

export function HeroSearchWidget() {
  const router = useRouter();
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);

  const handleCheckinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setCheckin(val);
      if (!checkout || checkout <= val) {
        setCheckout(getDefaultCheckout(val));
      }
    },
    [checkout],
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (checkin) params.set('from', checkin);
      if (checkout) params.set('to', checkout);
      params.set('guests', String(guests));
      router.push(`/propiedades?${params.toString()}`);
    },
    [checkin, checkout, guests, router],
  );

  const today = getMinDate();

  return (
    <form
      onSubmit={handleSearch}
      className="w-full rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:p-6"
      aria-label="Buscar disponibilidad"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {/* Fecha entrada */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gray">
            <Calendar size={13} aria-hidden="true" />
            Llegada
          </label>
          <input
            type="date"
            value={checkin}
            min={today}
            onChange={handleCheckinChange}
            aria-label="Fecha de llegada"
            className={cn(
              'rounded-xl border border-brand-border bg-brand-cream px-3 py-2.5 text-sm text-brand-charcoal',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
              'transition-colors duration-200',
            )}
          />
        </div>

        {/* Fecha salida */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gray">
            <Calendar size={13} aria-hidden="true" />
            Salida
          </label>
          <input
            type="date"
            value={checkout}
            min={checkin || today}
            onChange={(e) => setCheckout(e.target.value)}
            aria-label="Fecha de salida"
            className={cn(
              'rounded-xl border border-brand-border bg-brand-cream px-3 py-2.5 text-sm text-brand-charcoal',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
              'transition-colors duration-200',
            )}
          />
        </div>

        {/* Huéspedes */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gray">
            <Users size={13} aria-hidden="true" />
            Huéspedes
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-cream px-3 py-1.5">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              aria-label="Reducir huéspedes"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-lg font-medium text-brand-gray transition-colors hover:bg-brand-border hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              −
            </button>
            <span
              className="flex-1 text-center text-sm font-semibold text-brand-charcoal"
              aria-live="polite"
              aria-atomic="true"
            >
              {guests} {guests === 1 ? 'persona' : 'personas'}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(16, g + 1))}
              aria-label="Aumentar huéspedes"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-lg font-medium text-brand-gray transition-colors hover:bg-brand-border hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-4 w-full" leftIcon={<Search size={18} />}>
        Ver disponibilidad
      </Button>
    </form>
  );
}
