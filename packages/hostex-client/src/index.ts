export { getProperties, getPropertyById, getPropertyBySlug } from './properties';
export { checkAvailability } from './availability';
export { calculateTotalPrice } from './pricing';
export { MOCK_PROPERTIES, getMockAvailability, getMockPricing } from './mocks';
export { PROPERTY_CATALOG } from './catalog';
export type {
  HostexProperty,
  HostexReservation,
  InternalProperty,
  AvailabilityResult,
  PricingBreakdown,
} from './types';
