import type { MetadataRoute } from 'next';
import { getProperties } from '@mobbitrips/hostex-client';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mobbitrips.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/propiedades`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/nosotros`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/servicios`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/contacto`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/blog`, priority: 0.5, changeFrequency: 'weekly' },
    { url: `${BASE}/experiencias`, priority: 0.5, changeFrequency: 'weekly' },
    { url: `${BASE}/faq`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/privacidad`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/terminos`, priority: 0.3, changeFrequency: 'yearly' },
  ];

  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const properties = await getProperties();
    propertyRoutes = properties.map((p) => ({
      url: `${BASE}/propiedades/${p.slug}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }));
  } catch {
    // If Hostex is unavailable at build time, sitemap still generates without property URLs
  }

  return [...staticRoutes, ...propertyRoutes];
}
