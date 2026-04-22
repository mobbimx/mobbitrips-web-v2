# ✅ Sprint 1.3 + 1.4 — Completado

> Archivado el 2026-04-22. Ver `docs/BITACORA.md` sesiones 3 y 4 para detalle.

---

## Info del sprint

- **Sprint**: 1.3 + 1.4 (fusionados — se completaron en la misma sesión)
- **Fase**: 1 — MVP Web
- **Fechas**: 2026-04-20 → 2026-04-22
- **Objetivo original**: Flujo de solicitud de reserva + deploy en producción

---

## Tasks completadas (12/12 · 100%)

### Supabase — tablas

- [x] **S1.3-1** Migration `reservations` — `20260414000002_reservations.sql`
- [x] **S1.3-2** Migration `leads` — `20260414000003_leads.sql`
- [x] **S1.3-6** Migration `events` — `20260414000004_events.sql`
- [x] Migration `newsletter_subscribers` — `20260421000001_newsletter_subscribers.sql`

### Formulario de reserva

- [x] **S1.3-3** `/reserva/nueva` con resumen de propiedad, fechas, precio
- [x] **S1.3-4** `POST /api/reservations` con Zod, rate limiting, disponibilidad, audit trail
- [x] **S1.3-5** `/reserva/[id]/exito` con resumen y CTA WhatsApp
- [x] `GET /api/reservations/[id]` para consulta de reserva
- [x] `/reserva/[id]/pagar` — crea sesión Stripe y redirige
- [x] `/reserva/[id]/pendiente` — estado pendiente de pago

### Notificaciones

- [x] **S1.3-7** Email de confirmación con Resend (`lib/email.ts`) — template HTML completo
- [x] **S1.3-8** Link WhatsApp pre-llenado en email y página de éxito

### Contacto

- [x] **S1.3-9** Formulario `/contacto` con React Hook Form + Zod
- [x] **S1.3-10** `POST /api/leads` → Supabase + evento `lead.created`

### Mejoras

- [x] **S1.3-11** `FeaturedProperties` home con datos reales de Hostex
- [x] **S1.3-12** Catálogo con datos reales (precio, capacidad, amenidades) del CSV

### Sprint 1.4 — Deploy

- [x] Deploy en Vercel (rootDirectory: apps/web)
- [x] DNS configurado: mobbitrips.com → Vercel
- [x] Variables de entorno en Vercel

### Sesión adicional (2026-04-22)

- [x] Rediseño editorial completo: home, nosotros, servicios, contacto
- [x] Rebrand geográfico: "Xalapa, Veracruz" → "México" en toda la UI
- [x] Logo animado en Navbar (Framer Motion)
- [x] Fix bug: email footer decía "Xalapa, Ver." → corregido a "México"

---

## Commits principales

- `9838df4` feat(catalog): update all properties with real data from CSV
- `213da93` feat(home): FeaturedProperties usa datos reales de Hostex
- `d3f6318` chore: bitacora sesion 3
- `39a1756` feat(web): rediseño editorial completo de la home
- `f0ff986` feat(web): logo animado en Navbar con Framer Motion
- `911e62d` feat(web): rediseño editorial completo + eliminación de referencias a ubicación

---

## Bloqueos que pasan al siguiente sprint

- `STRIPE_WEBHOOK_SECRET` sin configurar → reservas no cambian a "paid" automáticamente
- Dominio Resend (`mobbitrips.com`) sin verificar → emails desde `reservas@mobbitrips.com` no funcionan en prod

---

## Criterios de cierre — estado

- [x] `pnpm lint` y `pnpm type-check` pasan
- [x] Flujo completo: ver propiedad → seleccionar fechas → llenar datos → confirmación
- [x] Reserva aparece en `reservations` con status `pending`
- [x] Evento `reservation.requested` en tabla `events`
- [x] Formulario de contacto guarda leads en Supabase
- [ ] Huésped recibe email de confirmación ← bloqueado por Resend
- [ ] Reserva pasa a "paid" automáticamente ← bloqueado por Stripe webhook secret
