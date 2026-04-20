# 🚀 Sprint Actual — Sprint 1.3: Reservas + Flujo de solicitud

> Este archivo muestra **solo el sprint activo**. Al cerrarlo, se archiva en `docs/sprints/completados/` y se crea uno nuevo.

---

## 📌 Info del sprint

- **Sprint**: 1.3 — Reservas + Flujo de solicitud
- **Fase**: 1 — MVP Web
- **Fecha inicio**: 2026-04-21
- **Fecha objetivo**: ~2026-05-05 (calibrado para ~15h/semana)
- **Objetivo**: Un usuario puede solicitar una reserva desde el BookingWidget, llenar sus datos, y el equipo recibe la solicitud por WhatsApp/email. La reserva queda registrada en Supabase. No hay cobro aún (eso es Sprint 2.x).

---

## 📊 Progreso

**0 / 12 tasks completadas (0%)**

---

## ✅ Completadas

_(ninguna aún)_

---

## 🔄 En progreso

_(arrancamos con S1.3-1)_

---

## 📋 Backlog del sprint

### Supabase — tablas

- [ ] **S1.3-1** Migration `reservations` table `[2 pts]`
  - Campos: id, property_id (hostex int), property_slug, guest_name, guest_email, guest_phone, check_in_date, check_out_date, guests, status (`pending`|`confirmed`|`cancelled`), total_mxn, notes, created_at.
  - RLS: solo service_role puede leer/escribir.
  - Índices: property_id, status, check_in_date.

- [ ] **S1.3-2** Migration `leads` table `[1 pt]`
  - Campos: id, name, email, phone, message, source (`contact_form`|`owner_form`|`whatsapp`), created_at.
  - RLS: solo service_role.

### Formulario de solicitud de reserva

- [ ] **S1.3-3** Página `/reserva/nueva` `[3 pts]`
  - Recibe query params: `property`, `from`, `to`, `guests`.
  - Formulario: nombre completo, email, teléfono (México +52), notas opcionales.
  - Muestra resumen: propiedad, fechas, huéspedes, desglose de precio.
  - Validación React Hook Form + Zod.
  - Submit → POST `/api/reservations`.
  - Estados: idle / submitting / success / error.
  - En success: redirige a `/reserva/[id]/exito`.

- [ ] **S1.3-4** `POST /api/reservations` `[3 pts]`
  - Valida body con Zod.
  - Verifica disponibilidad de nuevo (checkAvailability) antes de insertar.
  - Inserta en tabla `reservations` con status `pending`.
  - Dispara evento `reservation.requested` en tabla `events`.
  - Rate limiting: 5 req/min por IP.
  - Responde con `{ id, ok: true }`.

- [ ] **S1.3-5** Página `/reserva/[id]/exito` `[1 pt]`
  - Muestra confirmación: "Tu solicitud fue recibida".
  - Datos del resumen de la reserva (fetch desde `/api/reservations/[id]`).
  - CTA: "Escríbenos por WhatsApp" → wa.me con mensaje pre-armado.

### Tabla `events` de Supabase (audit trail)

- [ ] **S1.3-6** Migration `events` table `[1 pt]`
  - Campos: id, event_type (text), payload (jsonb), created_at.
  - RLS: solo service_role.
  - Esta tabla es el bus de eventos que consumirá n8n en Sprint 2.

### Notificaciones básicas

- [ ] **S1.3-7** Email de confirmación al huésped `[2 pts]`
  - Instalar y configurar Resend (`RESEND_API_KEY` en .env.local).
  - Template simple: nombre, propiedad, fechas, total, botón WhatsApp.
  - Enviado desde `/api/reservations` al crear la reserva.
  - From: `reservas@mobbitrips.com` (o el dominio que esté configurado en Resend).

- [ ] **S1.3-8** Notificación interna por WhatsApp `[1 pt]`
  - Mensaje wa.me (link) en la página de éxito con datos pre-llenados.
  - No requiere WhatsApp Cloud API aún (eso es Sprint 2.2).

### Página de contacto

- [ ] **S1.3-9** Formulario `/contacto` funcional `[2 pts]`
  - Actualmente es placeholder. Implementar con React Hook Form + Zod.
  - Campos: nombre, email, teléfono, mensaje.
  - Submit → POST `/api/leads` → inserta en tabla `leads`.
  - Confirmación inline, no redirige.

- [ ] **S1.3-10** `POST /api/leads` `[1 pt]`
  - Valida body.
  - Inserta en `leads`.
  - Dispara evento `lead.created` en `events`.

### Mejoras menores

- [ ] **S1.3-11** Actualizar `FeaturedProperties` del home para usar datos reales `[1 pt]`
  - Cambiar de `MOCK_PROPERTIES` a `getProperties()` (Server Component).
  - Mostrar cover image real de Hostex en lugar de gradiente.

- [ ] **S1.3-12** Página de propiedades — estado `[slug]` mejorado `[1 pt]`
  - Mostrar badge de disponibilidad real en PropertyCard (llamada rápida por propiedad).
  - O simplemente quitar el badge "Disponible" hardcodeado si no hay dato real.

---

## 🎯 Criterios de cierre del sprint

- [ ] `pnpm lint` y `pnpm type-check` pasan.
- [ ] Un usuario puede completar el flujo: ver propiedad → seleccionar fechas → llenar datos → recibir confirmación.
- [ ] La reserva aparece en tabla `reservations` de Supabase con status `pending`.
- [ ] El huésped recibe email de confirmación.
- [ ] El evento `reservation.requested` queda en tabla `events`.
- [ ] Formulario de contacto guarda leads en Supabase.

---

## 🚨 Bloqueos

- **Resend**: necesita cuenta y `RESEND_API_KEY`. Si no está disponible, S1.3-7 se omite.
- **Dominio de email**: `reservas@mobbitrips.com` requiere dominio verificado en Resend. Alternativa: usar el email de sandbox de Resend temporalmente.

---

## 📝 Notas del sprint

- El flujo de pago real (Stripe/PayU) se implementa en Sprint 2.x. Por ahora la reserva queda `pending` y el equipo la confirma manualmente.
- La tabla `events` es el corazón del sistema de automatización. Cada evento que insertemos aquí será consumido por n8n en Sprint 2.1.
- `packages/supabase-client` se puede crear en este sprint o en el siguiente, dependiendo del tiempo. Por ahora usamos `apps/web/src/lib/supabase.ts` directamente.

---

## 🔗 Próximo sprint

**Sprint 1.4 — SEO + Performance + Deploy**

Objetivo: Lighthouse ≥ 90, sitemap, robots.txt, meta tags completos, deploy en Vercel con variables de entorno configuradas.

---

**Sprint anterior**: 1.2 — `docs/sprints/completados/sprint-1.2.md`
**Ver todos los sprints completados**: `docs/sprints/completados/`
