import { PROPERTY_CATALOG } from './catalog';
import type { HostexProperty, InternalProperty } from './types';

export function hostexPropertyToInternal(raw: HostexProperty): InternalProperty | null {
  const entry = PROPERTY_CATALOG[raw.id];
  if (!entry || !entry.isVisible) return null;

  return {
    id: raw.id,
    slug: entry.slug,
    name: entry.name,
    shortDescription: entry.shortDescription,
    description: entry.description,
    neighborhood: entry.neighborhood,
    location: entry.location,
    address: raw.address,
    latitude: raw.latitude,
    longitude: raw.longitude,
    pricePerNight: entry.pricePerNight,
    cleaningFee: entry.cleaningFee,
    extraGuestFeePerNight: entry.extraGuestFeePerNight,
    baseGuests: entry.baseGuests,
    maxGuests: entry.maxGuests,
    bedrooms: entry.bedrooms,
    bathrooms: entry.bathrooms,
    amenities: entry.amenities,
    coverImageUrl: raw.cover?.extra_large_url ?? raw.cover?.original_url ?? null,
    checkinTime: raw.default_checkin_time,
    checkoutTime: raw.default_checkout_time,
    tags: entry.tags,
  };
}
