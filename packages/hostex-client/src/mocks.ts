import type { AvailabilityResult, InternalProperty, PricingBreakdown } from './types';
import { PROPERTY_CATALOG } from './catalog';
import { differenceInCalendarDays } from './utils';

// Mock data derived from the real Hostex property IDs, used when HOSTEX_API_TOKEN is absent.
export const MOCK_PROPERTIES: InternalProperty[] = [
  {
    id: 12393467,
    slug: 'noviembre-20',
    name: 'Casa Noviembre 20',
    shortDescription:
      'Casa completa en colonia Modelo, a pasos de avenidas y vida urbana de Xalapa.',
    description: PROPERTY_CATALOG[12393467]?.description ?? '',
    neighborhood: 'Colonia Modelo',
    location: 'Colonia Modelo, Xalapa',
    address: 'Av. 20 de Noviembre 507, Modelo, 91040 Xalapa-Enríquez, Ver., México',
    latitude: 19.5270183,
    longitude: -96.9097719,
    pricePerNight: 1_400,
    cleaningFee: 400,
    extraGuestFeePerNight: 150,
    baseGuests: 4,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Cocina completa', 'Estacionamiento', 'TV', 'Terraza', 'Sala amplia'],
    coverImageUrl:
      'https://z1.muscache.cn/im/pictures/hosting/Hosting-1490697910956780765/original/f29021fa-fa09-41b6-8ff4-ed16f6ea4def.jpeg?aki_policy=xx_large',
    checkinTime: '15:00',
    checkoutTime: '12:00',
    tags: ['céntrico', 'familiar', 'grupos'],
  },
  {
    id: 12155810,
    slug: 'colina-6a',
    name: 'Colina — Unidad 6A',
    shortDescription: 'La unidad más grande del complejo, ideal para grupos y familias de hasta 6.',
    description: PROPERTY_CATALOG[12155810]?.description ?? '',
    neighborhood: 'Aguacatal',
    location: 'Aguacatal, Xalapa',
    address: 'Benito Fentanes 3a, Aguacatal, 91133 Xalapa-Enríquez, Ver., México',
    latitude: 19.5417077,
    longitude: -96.9225277,
    pricePerNight: 1_400,
    cleaningFee: 400,
    extraGuestFeePerNight: 150,
    baseGuests: 4,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: [
      'WiFi',
      'Cocina completa',
      'Estacionamiento',
      'TV',
      'Zona BBQ',
      'Jardín',
      'Sala amplia',
    ],
    coverImageUrl:
      'https://z1.muscache.cn/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMzMTM2NzM0MzQ5OTA5ODQwOQ==/original/958b6837-5a21-4359-9ff3-8d0ca491147e.jpeg?aki_policy=xx_large',
    checkinTime: '15:00',
    checkoutTime: '12:00',
    tags: ['colinas', 'familiar', 'grupos'],
  },
  {
    id: 12081652,
    slug: 'colina-14',
    name: 'Colina — Unidad 14',
    shortDescription:
      'Amplio departamento en complejo privado con vista al jardín y acceso a zona BBQ.',
    description: PROPERTY_CATALOG[12081652]?.description ?? '',
    neighborhood: 'Aguacatal',
    location: 'Aguacatal, Xalapa',
    address: 'Benito Fentanes 3a, Aguacatal, 91133 Xalapa-Enríquez, Ver., México',
    latitude: 19.5417077,
    longitude: -96.9225277,
    pricePerNight: 1_100,
    cleaningFee: 300,
    extraGuestFeePerNight: 150,
    baseGuests: 2,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Cocina completa', 'Estacionamiento', 'TV', 'Zona BBQ', 'Jardín'],
    coverImageUrl:
      'https://z1.muscache.cn/im/pictures/hosting/Hosting-1435607637480845822/original/8a60bb60-aea0-4409-91e5-2c8b4fb61d03.jpeg?aki_policy=xx_large',
    checkinTime: '15:00',
    checkoutTime: '12:00',
    tags: ['colinas', 'familiar'],
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
