# 🚀 Sprint Actual — Sprint 1.2: Propiedades + Hostex

> Este archivo muestra **solo el sprint activo**. Al cerrarlo, se archiva en `docs/sprints/completados/` y se crea uno nuevo.

---

## 📌 Info del sprint

- **Sprint**: 1.2 — Propiedades + Hostex client
- **Fase**: 1 — MVP Web
- **Fecha inicio**: 2026-04-17
- **Fecha objetivo**: ~2026-05-01 (calibrado para ~15h/semana)
- **Objetivo**: Página `/propiedades` con filtros funcionales, detalle `/propiedades/[slug]` completo, cliente Hostex tipado con mocks de fallback. Al cerrar: un usuario puede buscar propiedades, ver el detalle y llegar al formulario de reserva.

---

## 📊 Progreso

**0 / 14 tasks completadas (0%)**

---

## ✅ Completadas

_(ninguna aún)_

---

## 🔄 En progreso

_(arrancamos con S1.2-1)_

---

## 📋 Backlog del sprint

### Hostex client (`packages/hostex-client`)

- [ ] **S1.2-1** Setup `packages/hostex-client` `[2 pts]`
  - `package.json`, `tsconfig.json`, estructura de carpetas.
  - Axios client con header `Access-Token`, timeout 10s, retries 3×.
  - Variable de entorno: `HOSTEX_API_TOKEN`, `HOSTEX_BASE_URL`.

- [ ] **S1.2-2** Tipos e interfaces Hostex `[1 pt]`
  - `types.ts`: `HostexProperty`, `HostexListing`, `HostexCalendar`, `HostexPricing`, `HostexReservation`, `HostexReview`.
  - `mappers.ts`: `hostexPropertyToInternal()`, convierte al modelo interno de Mobbitrips.

- [ ] **S1.2-3** `properties.ts` — listado y detalle `[2 pts]`
  - `getProperties()`: GET `/properties`, caché ISR 3600s.
  - `getPropertyById(id)`: GET `/properties/{id}`, caché 1800s.
  - `getPropertyBySlug(slug)`: deriva del listado, filtra por slug normalizado.

- [ ] **S1.2-4** `availability.ts` + `pricing.ts` `[2 pts]`
  - `checkAvailability(propertyId, from, to)`: GET `/calendar`.
  - `calculateTotalPrice(propertyId, from, to, guests)`: GET `/listings/{id}/pricing`.
  - Ambas sin caché (tiempo real).

- [ ] **S1.2-5** `mocks.ts` — datos de desarrollo `[1 pt]`
  - 3 propiedades mock realistas (migrar y expandir desde `apps/web/src/lib/mocks.ts`).
  - `getMockAvailability()`, `getMockPricing()`.
  - Se activan cuando `HOSTEX_API_TOKEN` no está definido o en tests.

### Página `/propiedades`

- [ ] **S1.2-6** `PropertyFilters` component `[2 pts]`
  - Filtros: huéspedes (mínimo), precio máximo, amenidades (checkboxes).
  - Lee query params de la URL (`?guests=2&from=...&to=...`).
  - Al cambiar filtros actualiza URL con `router.replace` (sin reload).
  - Client component. Accesible: labels, aria-controls.

- [ ] **S1.2-7** Página `/propiedades` `[2 pts]`
  - Server component: llama `getProperties()` al render.
  - Aplica filtros del lado cliente con `PropertyFilters`.
  - `PropertyGrid`: layout grid responsivo con `PropertyCard` (reutilizar del home).
  - Estado vacío: mensaje amigable si no hay resultados.
  - Loading: `Skeleton` grid mientras carga.
  - SEO: `metadata` con title/description.

### Página `/propiedades/[slug]`

- [ ] **S1.2-8** `PropertyGallery` component `[1 pt]`
  - Grid de imágenes (2×2 + foto grande). Placeholder hasta tener fotos reales.
  - Click abre lightbox simple (modal con prev/next).
  - Accesible: aria-labels, keyboard nav.

- [ ] **S1.2-9** `PropertyAmenities` component `[1 pt]`
  - Grid de amenidades con íconos Lucide mapeados.
  - Mapa de iconos: WiFi → Wifi, Piscina → Waves, etc.
  - Máximo 8 visible, "Ver todos" expande.

- [ ] **S1.2-10** `BookingWidget` — formulario de reserva `[3 pts]`
  - Sticky en desktop (right column), accordion en mobile.
  - Campos: fecha entrada, fecha salida, huéspedes.
  - Llama `checkAvailability()` y `calculateTotalPrice()` en tiempo real.
  - Desglose de precio: noche × días, limpieza, total en MXN.
  - Botón "Solicitar reserva" → POST a `/api/reservations` (Sprint 1.3).
  - Estado: disponible / no disponible / cargando.

- [ ] **S1.2-11** Página `/propiedades/[slug]` `[2 pts]`
  - Server component: llama `getPropertyBySlug(slug)`.
  - `generateStaticParams()` para las 3 propiedades mock (ISR).
  - Secciones: Gallery → Título/info → Descripción → Amenities → Reviews → BookingWidget.
  - Breadcrumb: Inicio › Propiedades › {nombre}.
  - SEO: title, description, og:image.
  - 404 si slug no existe.

### API interna

- [ ] **S1.2-12** `GET /api/properties` `[1 pt]`
  - Proxy a Hostex con caché. Consume `getProperties()`.
  - Headers de caché correctos para ISR.

- [ ] **S1.2-13** `GET /api/properties/[id]/availability` `[1 pt]`
  - Query params: `from`, `to`.
  - Llama `checkAvailability()` + `calculateTotalPrice()`.
  - Rate limiting básico (IP-based, 30 req/min).

- [ ] **S1.2-14** Conectar newsletter a Supabase `[1 pt]`
  - Crear migration `newsletter_subscribers` en Supabase.
  - Actualizar `/api/newsletter/route.ts` para persistir en DB.
  - RLS: allow insert anónimo desde API Route con service_role.

---

## 🎯 Criterios de cierre del sprint

- [ ] `pnpm lint` y `pnpm type-check` pasan sin errores.
- [ ] `/propiedades` muestra las propiedades con filtros funcionales.
- [ ] `/propiedades/[slug]` carga el detalle con galería, amenidades y booking widget.
- [ ] `BookingWidget` muestra precio desglosado en MXN en tiempo real.
- [ ] Fallback a mocks cuando `HOSTEX_API_TOKEN` no está disponible.
- [ ] API routes con rate limiting básico.
- [ ] Newsletter persiste en Supabase (requiere proyecto Supabase activo).

---

## 🚨 Bloqueos

- **Supabase**: S1.2-14 requiere proyecto Supabase creado y URL/keys en `.env.local`.
- **Imágenes reales**: PropertyGallery usará placeholders hasta que Emilio las provea.

---

## 📝 Notas del sprint

- El token Hostex ya está en `apps/web/.env.local` — testearlo con una llamada real en S1.2-3.
- `packages/hostex-client` se instala en `apps/web` como `workspace:*`.
- Si la API de Hostex devuelve propiedades reales, descartar los mocks del home y usar datos live.

---

## 🔗 Próximo sprint

**Sprint 1.3 — Reservas + Flujo de pago**

Objetivo: Formulario de solicitud de reserva, integración con Hostex para crear reservas, flujo básico hacia Stripe/PayU.

---

**Sprint anterior**: 1.1 — `docs/sprints/completados/sprint-1.1.md`
**Ver todos los sprints completados**: `docs/sprints/completados/`
