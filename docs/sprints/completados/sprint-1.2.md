# Sprint 1.2 — Propiedades + Hostex ✅ CERRADO

- **Fechas**: 2026-04-21
- **Fase**: 1 — MVP Web
- **Resultado**: Páginas `/propiedades` y `/propiedades/[slug]` funcionales con datos reales de Hostex. Newsletter conectado a Supabase.

## Tasks completadas (14/14)

- [x] **S1.2-1** Setup `packages/hostex-client` (Axios, Bearer auth, retries)
- [x] **S1.2-2** Tipos e interfaces Hostex + modelo interno `InternalProperty`
- [x] **S1.2-3** `properties.ts` — getProperties(), getPropertyById(), getPropertyBySlug()
- [x] **S1.2-4** `availability.ts` + `pricing.ts` (availability vía reservaciones, pricing desde catálogo)
- [x] **S1.2-5** `mocks.ts` — 3 propiedades mock realistas, fallback automático sin token
- [x] **S1.2-6** `PropertyFilters` — filtros por huéspedes, precio, amenidades, URL params
- [x] **S1.2-7** Página `/propiedades` con Server Component + PropertiesView client
- [x] **S1.2-8** `PropertyGallery` — grid + lightbox con keyboard nav
- [x] **S1.2-9** `PropertyAmenities` — grid con íconos Lucide, expand/collapse
- [x] **S1.2-10** `BookingWidget` — verificación real de disponibilidad + precio desglosado MXN
- [x] **S1.2-11** Página `/propiedades/[slug]` — ISR, breadcrumb, SEO, 404 si no existe
- [x] **S1.2-12** `GET /api/properties` — proxy con ISR 3600s
- [x] **S1.2-13** `GET /api/properties/[id]/availability` — rate limiting, validación Zod
- [x] **S1.2-14** Newsletter → Supabase (`newsletter_subscribers`, RLS, service_role)

## Decisiones técnicas

- Auth Hostex: `Authorization: Bearer` (no `Access-Token` como documentaba el sprint anterior)
- Pricing: calculado desde `catalog.ts` estático — Hostex no expone endpoint de precios
- Availability: derivada de `GET /reservations?property_id=X&status=accepted` + overlap check local
- Colina Estacionamiento (id 12155811): `isVisible: false` — no es unidad habitable
- 8 propiedades visibles de 9 en Hostex
- Supabase project: `luyxsgimdtpessazhpnf`

## Bloqueos resueltos

- Ninguno pendiente al cerrar

## Commits

- `cc46e16` feat(web): S1.2-1→13 hostex-client + páginas propiedades completas
- `cf47ce1` chore: update bitacora sesion 2 sprint 1.2
- `7921865` feat(web): S1.2-14 conectar newsletter a Supabase
