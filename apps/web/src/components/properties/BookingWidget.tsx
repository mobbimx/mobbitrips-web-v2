'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Calendar, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@mobbitrips/ui';
import type { PricingBreakdown } from '@mobbitrips/hostex-client';

interface BookingWidgetProps {
  propertyId: number;
  propertySlug: string;
  maxGuests: number;
  pricePerNight: number;
}

type AvailabilityState = 'idle' | 'checking' | 'available' | 'unavailable';

export function BookingWidget({
  propertyId,
  propertySlug,
  maxGuests,
  pricePerNight,
}: BookingWidgetProps) {
  const today = new Date().toISOString().split('T')[0] ?? '';
  const tomorrow = new Date(Date.now() + 86_400_000).toISOString().split('T')[0] ?? '';

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [availability, setAvailability] = useState<AvailabilityState>('idle');
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);
  const [loading, setLoading] = useState(false);

  const checkDates = useCallback(async () => {
    if (!from || !to || from >= to) return;
    setAvailability('checking');
    setLoading(true);
    try {
      const [availRes, priceRes] = await Promise.all([
        fetch(`/api/properties/${propertyId}/availability?from=${from}&to=${to}`),
        fetch(
          `/api/properties/${propertyId}/availability?from=${from}&to=${to}&guests=${guests}&pricing=true`,
        ),
      ]);

      const availData = (await availRes.json()) as { available: boolean };
      setAvailability(availData.available ? 'available' : 'unavailable');

      if (availData.available && priceRes.ok) {
        const priceData = (await priceRes.json()) as { pricing: PricingBreakdown };
        if (priceData.pricing) setPricing(priceData.pricing);
      } else {
        setPricing(null);
      }
    } catch {
      setAvailability('idle');
    } finally {
      setLoading(false);
    }
  }, [from, to, guests, propertyId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void checkDates();
    }, 400);
    return () => clearTimeout(timeout);
  }, [checkDates]);

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-md">
      <p className="mb-1 font-comfortaa text-2xl font-bold text-brand-charcoal">
        ${pricePerNight.toLocaleString('es-MX')}{' '}
        <span className="text-sm font-normal text-brand-gray">MXN / noche</span>
      </p>

      <div className="mt-4 space-y-3">
        {/* Check-in */}
        <div>
          <label
            htmlFor="booking-from"
            className="mb-1 flex items-center gap-1.5 text-xs font-medium text-brand-charcoal"
          >
            <Calendar size={13} aria-hidden="true" />
            Entrada
          </label>
          <input
            id="booking-from"
            type="date"
            value={from}
            min={today}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-xl border border-brand-border px-3 py-2.5 text-sm text-brand-charcoal focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Check-out */}
        <div>
          <label
            htmlFor="booking-to"
            className="mb-1 flex items-center gap-1.5 text-xs font-medium text-brand-charcoal"
          >
            <Calendar size={13} aria-hidden="true" />
            Salida
          </label>
          <input
            id="booking-to"
            type="date"
            value={to}
            min={from || today}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-xl border border-brand-border px-3 py-2.5 text-sm text-brand-charcoal focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Guests */}
        <div>
          <label
            htmlFor="booking-guests"
            className="mb-1 flex items-center gap-1.5 text-xs font-medium text-brand-charcoal"
          >
            <Users size={13} aria-hidden="true" />
            Huéspedes
          </label>
          <select
            id="booking-guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-xl border border-brand-border px-3 py-2.5 text-sm text-brand-charcoal focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'huésped' : 'huéspedes'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Availability indicator */}
      {availability !== 'idle' && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${
            availability === 'checking'
              ? 'bg-brand-border text-brand-gray'
              : availability === 'available'
                ? 'bg-status-success/10 text-status-success'
                : 'bg-status-error/10 text-status-error'
          }`}
          role="status"
          aria-live="polite"
        >
          {availability === 'checking' && (
            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
          )}
          {availability === 'available' && <CheckCircle size={15} aria-hidden="true" />}
          {availability === 'unavailable' && <XCircle size={15} aria-hidden="true" />}
          {availability === 'checking' && 'Verificando disponibilidad…'}
          {availability === 'available' && '¡Disponible para esas fechas!'}
          {availability === 'unavailable' && 'No disponible en esas fechas'}
        </div>
      )}

      {/* Pricing breakdown */}
      {pricing && availability === 'available' && (
        <div className="mt-4 space-y-2 border-t border-brand-border pt-4 text-sm">
          <div className="flex justify-between text-brand-gray">
            <span>
              ${pricing.pricePerNight.toLocaleString('es-MX')} × {pricing.nights}{' '}
              {pricing.nights === 1 ? 'noche' : 'noches'}
            </span>
            <span>${pricing.accommodationTotal.toLocaleString('es-MX')}</span>
          </div>
          <div className="flex justify-between text-brand-gray">
            <span>Limpieza</span>
            <span>${pricing.cleaningFee.toLocaleString('es-MX')}</span>
          </div>
          {pricing.extraGuestFee > 0 && (
            <div className="flex justify-between text-brand-gray">
              <span>Huéspedes adicionales</span>
              <span>${pricing.extraGuestFee.toLocaleString('es-MX')}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-brand-border pt-2 font-semibold text-brand-charcoal">
            <span>Total MXN</span>
            <span>${pricing.total.toLocaleString('es-MX')}</span>
          </div>
        </div>
      )}

      {/* CTA */}
      <Button
        variant="primary"
        size="lg"
        className="mt-4 w-full"
        disabled={loading || availability === 'unavailable' || availability === 'checking'}
        onClick={() => {
          if (availability !== 'available') return;
          const params = new URLSearchParams({ from, to, guests: String(guests) });
          window.location.href = `/reserva/nueva?property=${propertySlug}&${params.toString()}`;
        }}
        aria-label={
          availability === 'available'
            ? 'Solicitar reserva'
            : 'Selecciona fechas disponibles para reservar'
        }
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Verificando…
          </span>
        ) : availability === 'available' ? (
          'Solicitar reserva'
        ) : (
          'Selecciona fechas'
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-brand-light">
        No se realiza ningún cargo en este momento
      </p>
    </div>
  );
}
