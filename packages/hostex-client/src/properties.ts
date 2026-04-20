import { hostexClient, hasToken } from './client';
import { hostexPropertyToInternal } from './mappers';
import { MOCK_PROPERTIES } from './mocks';
import type { HostexProperty, InternalProperty } from './types';

interface HostexPropertiesResponse {
  error_code: number;
  data: { properties: HostexProperty[]; total: number };
}

export async function getProperties(): Promise<InternalProperty[]> {
  if (!hasToken()) return MOCK_PROPERTIES;

  const { data } = await hostexClient.get<HostexPropertiesResponse>('/properties');
  return data.data.properties
    .map(hostexPropertyToInternal)
    .filter((p): p is InternalProperty => p !== null);
}

export async function getPropertyById(id: number): Promise<InternalProperty | null> {
  const properties = await getProperties();
  return properties.find((p) => p.id === id) ?? null;
}

export async function getPropertyBySlug(slug: string): Promise<InternalProperty | null> {
  const properties = await getProperties();
  return properties.find((p) => p.slug === slug) ?? null;
}
