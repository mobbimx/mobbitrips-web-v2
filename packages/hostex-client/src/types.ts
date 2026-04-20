// ── Hostex API raw types ───────────────────────────────────────────────────

export interface HostexCoverImage {
  original_url: string;
  large_url: string;
  extra_large_url: string;
  extra_extra_large_url: string;
  small_url: string;
}

export interface HostexChannel {
  channel_type: string;
  listing_id: string;
  currency: string;
}

export interface HostexProperty {
  id: number;
  title: string;
  channels: HostexChannel[];
  cover: HostexCoverImage | null;
  default_checkin_time: string;
  default_checkout_time: string;
  timezone: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface HostexReservationRate {
  currency: string;
  amount: number;
}

export interface HostexReservationRateDetail {
  type: string;
  description: string;
  currency: string;
  amount: number;
}

export interface HostexReservationRates {
  total_rate: HostexReservationRate;
  total_commission: HostexReservationRate;
  rate: HostexReservationRate;
  commission: HostexReservationRate;
  details: HostexReservationRateDetail[];
}

export interface HostexReservation {
  reservation_code: string;
  property_id: number;
  channel_type: string;
  listing_id: string;
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  status: 'accepted' | 'cancelled' | 'pending' | 'inquiry';
  stay_status: string;
  rates: HostexReservationRates;
}

// ── Internal Mobbitrips model ──────────────────────────────────────────────

export interface InternalProperty {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  neighborhood: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  cleaningFee: number;
  extraGuestFeePerNight: number;
  baseGuests: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  coverImageUrl: string | null;
  checkinTime: string;
  checkoutTime: string;
  tags: string[];
}

export interface AvailabilityResult {
  available: boolean;
  blockedBy?: string;
}

export interface PricingBreakdown {
  nights: number;
  pricePerNight: number;
  accommodationTotal: number;
  cleaningFee: number;
  extraGuestFee: number;
  total: number;
  currency: 'MXN';
}
