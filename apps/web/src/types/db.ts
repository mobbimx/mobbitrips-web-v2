export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'paid';
export type LeadSource = 'contact_form' | 'owner_form' | 'whatsapp';

export interface Reservation {
  id: string;
  property_id: number;
  property_slug: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  status: ReservationStatus;
  total_mxn: number;
  stripe_session_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: LeadSource;
  created_at: string;
}

export interface DbEvent {
  id: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}
