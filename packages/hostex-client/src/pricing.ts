import { hasToken } from './client';
import { PROPERTY_CATALOG } from './catalog';
import { getMockPricing } from './mocks';
import { differenceInCalendarDays } from './utils';
import type { PricingBreakdown } from './types';

// Hostex doesn't expose a pricing API, so we calculate from the catalog rates.
// In the future this can be replaced with dynamic pricing from a pricing engine.
export async function calculateTotalPrice(
  propertyId: number,
  from: string,
  to: string,
  guests: number,
): Promise<PricingBreakdown> {
  if (!hasToken()) return getMockPricing(propertyId, from, to, guests);

  const entry = PROPERTY_CATALOG[propertyId];
  if (!entry) throw new Error(`Property ${propertyId} not found in catalog`);

  const nights = differenceInCalendarDays(to, from);
  const accommodationTotal = entry.pricePerNight * nights;
  const extraGuests = Math.max(0, guests - entry.baseGuests);
  const extraGuestFee = extraGuests * entry.extraGuestFeePerNight * nights;

  return {
    nights,
    pricePerNight: entry.pricePerNight,
    accommodationTotal,
    cleaningFee: entry.cleaningFee,
    extraGuestFee,
    total: accommodationTotal + entry.cleaningFee + extraGuestFee,
    currency: 'MXN',
  };
}
