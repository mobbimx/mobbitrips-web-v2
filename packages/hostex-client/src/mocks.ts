import type { AvailabilityResult, InternalProperty, PricingBreakdown } from './types';
import { PROPERTY_CATALOG } from './catalog';
import { differenceInCalendarDays } from './utils';

// Mock data derived from the real Hostex property IDs, used when HOSTEX_API_TOKEN is absent.
export const MOCK_PROPERTIES: InternalProperty[] = [
  {
    id: 12393467,
    slug: 'noviembre-20',
    name: 'N20 H1',
    shortDescription: PROPERTY_CATALOG[12393467]?.shortDescription ?? '',
    description: PROPERTY_CATALOG[12393467]?.description ?? '',
    neighborhood: 'Colonia Modelo',
    location: 'Colonia Modelo, Xalapa',
    address: 'Av. 20 de Noviembre 507, Modelo, 91040 Xalapa-Enríquez, Ver., México',
    latitude: 19.5270183,
    longitude: -96.9097719,
    pricePerNight: 549,
    cleaningFee: 200,
    extraGuestFeePerNight: 50,
    baseGuests: 2,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: PROPERTY_CATALOG[12393467]?.amenities ?? [],
    coverImageUrl:
      'https://z1.muscache.cn/im/pictures/hosting/Hosting-1490697910956780765/original/f29021fa-fa09-41b6-8ff4-ed16f6ea4def.jpeg?aki_policy=xx_large',
    checkinTime: '15:00',
    checkoutTime: '12:00',
    tags: PROPERTY_CATALOG[12393467]?.tags ?? [],
  },
  {
    id: 12155810,
    slug: 'colina-6a',
    name: 'Colina 6A',
    shortDescription: PROPERTY_CATALOG[12155810]?.shortDescription ?? '',
    description: PROPERTY_CATALOG[12155810]?.description ?? '',
    neighborhood: 'Aguacatal',
    location: 'Aguacatal, Xalapa',
    address: 'Benito Fentanes 3a, Aguacatal, 91133 Xalapa-Enríquez, Ver., México',
    latitude: 19.5417077,
    longitude: -96.9225277,
    pricePerNight: 789,
    cleaningFee: 300,
    extraGuestFeePerNight: 50,
    baseGuests: 2,
    maxGuests: 7,
    bedrooms: 3,
    bathrooms: 2,
    amenities: PROPERTY_CATALOG[12155810]?.amenities ?? [],
    coverImageUrl:
      'https://z1.muscache.cn/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMzMTM2NzM0MzQ5OTA5ODQwOQ==/original/958b6837-5a21-4359-9ff3-8d0ca491147e.jpeg?aki_policy=xx_large',
    checkinTime: '15:00',
    checkoutTime: '12:00',
    tags: PROPERTY_CATALOG[12155810]?.tags ?? [],
  },
  {
    id: 12081652,
    slug: 'colina-14',
    name: 'Colina 14',
    shortDescription: PROPERTY_CATALOG[12081652]?.shortDescription ?? '',
    description: PROPERTY_CATALOG[12081652]?.description ?? '',
    neighborhood: 'Aguacatal',
    location: 'Aguacatal, Xalapa',
    address: 'Benito Fentanes 3a, Aguacatal, 91133 Xalapa-Enríquez, Ver., México',
    latitude: 19.5417077,
    longitude: -96.9225277,
    pricePerNight: 919,
    cleaningFee: 350,
    extraGuestFeePerNight: 50,
    baseGuests: 2,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 1,
    amenities: PROPERTY_CATALOG[12081652]?.amenities ?? [],
    coverImageUrl:
      'https://z1.muscache.cn/im/pictures/hosting/Hosting-1435607637480845822/original/8a60bb60-aea0-4409-91e5-2c8b4fb61d03.jpeg?aki_policy=xx_large',
    checkinTime: '15:00',
    checkoutTime: '12:00',
    tags: PROPERTY_CATALOG[12081652]?.tags ?? [],
  },
];

export function getMockAvailability(from: string, _to: string): AvailabilityResult {
  // Simulate a blocked weekend for demo purposes
  const fromDate = new Date(from);
  const isSaturdayCheckin = fromDate.getDay() === 6;
  if (isSaturdayCheckin) {
    return { available: false, blockedBy: 'mock-block' };
  }
  return { available: true };
}

export function getMockPricing(
  propertyId: number,
  from: string,
  to: string,
  guests: number,
): PricingBreakdown {
  const entry = PROPERTY_CATALOG[propertyId];
  const pricePerNight = entry?.pricePerNight ?? 1_000;
  const cleaningFee = entry?.cleaningFee ?? 250;
  const baseGuests = entry?.baseGuests ?? 2;
  const extraFee = entry?.extraGuestFeePerNight ?? 150;

  const nights = differenceInCalendarDays(to, from);
  const accommodationTotal = pricePerNight * nights;
  const extraGuests = Math.max(0, guests - baseGuests);
  const extraGuestFee = extraGuests * extraFee * nights;

  return {
    nights,
    pricePerNight,
    accommodationTotal,
    cleaningFee,
    extraGuestFee,
    total: accommodationTotal + cleaningFee + extraGuestFee,
    currency: 'MXN',
  };
}
