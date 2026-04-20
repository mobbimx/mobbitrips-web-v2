import { hostexClient, hasToken } from './client';
import { getMockAvailability } from './mocks';
import { datesOverlap } from './utils';
import type { AvailabilityResult, HostexReservation } from './types';

interface HostexReservationsResponse {
  error_code: number;
  data: { reservations: HostexReservation[] };
}

export async function checkAvailability(
  propertyId: number,
  from: string,
  to: string,
): Promise<AvailabilityResult> {
  if (!hasToken()) return getMockAvailability(from, to);

  const { data } = await hostexClient.get<HostexReservationsResponse>('/reservations', {
    params: {
      property_id: propertyId,
      status: 'accepted',
    },
  });

  const conflict = data.data.reservations.find((r) =>
    datesOverlap(from, to, r.check_in_date, r.check_out_date),
  );

  if (conflict) {
    return { available: false, blockedBy: conflict.reservation_code };
  }
  return { available: true };
}
