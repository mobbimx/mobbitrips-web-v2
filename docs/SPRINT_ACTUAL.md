# 🚀 Sprint Actual — Sprint 1.5: SEO + Performance + Stripe Config

> Este archivo muestra **solo el sprint activo**. Al cerrarlo, se archiva en `docs/sprints/completados/` y se crea uno nuevo.

---

## 📌 Info del sprint

- **Sprint**: 1.5 — SEO + Performance + Stripe Config
- **Fase**: 1 — MVP Web
- **Fecha inicio**: 2026-04-22
- **Fecha objetivo**: ~2026-05-06 (~15h/semana)
- **Objetivo**: Cerrar los bloqueadores del flujo de pagos y emails. Llevar Lighthouse ≥ 90. Dejar el MVP listo para recibir reservas reales con confirmación automática.

---

## 📊 Progreso

**7 / 10 tasks completadas (70%)**

---

## ✅ Completadas

- [x] **S1.5-2** Configurar Resend + verificar dominio ✓
  - DNS agregados en Hostinger (DKIM TXT + MX send + SPF TXT)
  - Dominio `mobbitrips.com` verificado en Resend
  - `RESEND_API_KEY` y `RESEND_FROM_EMAIL=reservas@mobbitrips.com` configurados en Vercel
  - Redeploy completado

- [x] **S1.5-3** `sitemap.xml` dinámico ✓
  - `apps/web/src/app/sitemap.ts` — incluye rutas estáticas + propiedades dinámicas de Hostex
  - Commit: `4617a9b`

- [x] **S1.5-4** `robots.txt` ✓
  - `apps/web/src/app/robots.ts` — bloquea `/api/*` y `/reserva/*`
  - Commit: `4617a9b`

- [x] **S1.5-5** Meta tags completos en todas las páginas ✓
  - `openGraph` agregado a `/propiedades`, `/nosotros`, `/servicios`, `/contacto`
  - Commit: `adde36c`

- [x] **S1.5-6** Optimizaciones de performance ✓ (parcial)
  - ISR `revalidate=3600` en Home (era `force-dynamic`)
  - `priority` en primera imagen de FeaturedProperties (LCP)
  - Commits: `a116c8f`

- [x] **S1.5-8** Error 404 personalizado ✓
  - `apps/web/src/app/not-found.tsx` — CTA dual (propiedades + inicio), aria attrs
  - Commit: `4617a9b`

- [x] **S1.5-9** Loading states globales ✓
  - `apps/web/src/app/propiedades/loading.tsx` — skeleton grid 6 cards
  - `apps/web/src/app/propiedades/[slug]/loading.tsx` — skeleton detalle
  - Commit: `adde36c`

---

## 🔄 En progreso

_(nada activo ahora mismo)_

---

## 📋 Pendiente

### 🔧 Cerrar bloqueadores (prioridad máxima)

- [ ] **S1.5-1** Configurar Stripe webhook en producción `[1 pt]`
  - En Stripe Dashboard → Developers → Webhooks → Add endpoint
  - URL: `https://mobbitrips.com/api/webhooks/stripe`
  - Evento: `checkout.session.completed`
  - Copiar el signing secret (`whsec_...`)
  - En Vercel → Settings → Environment Variables → agregar `STRIPE_WEBHOOK_SECRET`
  - Redeploy y verificar
  - **Criterio**: reserva creada con Stripe pasa a status `paid` automáticamente
  - **Nota**: requiere cuenta Stripe nueva (la anterior fue comprometida por Lodgify)

### ⚡ Performance

- [ ] **S1.5-7** Optimizar imágenes en detalle de propiedad `[1 pt]`
  - Agregar `priority` a la primera imagen del detalle (`/propiedades/[slug]`)
  - Verificar `sizes` correcto en galería
  - Lazy loading en imágenes de galería (no above-fold)

### 🧪 Verificación

- [ ] **S1.5-10** Verificar flujo completo end-to-end en producción `[1 pt]`
  - Probar email: hacer reserva de prueba → verificar que llega a inbox del huésped
  - Una vez Stripe configurado: crear reserva con tarjeta `4242 4242 4242 4242`
  - Verificar: email llega → reserva en Supabase cambia a "paid" → evento en `events`
  - Documentar resultado en BITACORA

---

## 🎯 Criterios de cierre del sprint

- [ ] `STRIPE_WEBHOOK_SECRET` configurado y verificado en producción
- [x] Emails de confirmación funcionando desde `reservas@mobbitrips.com`
- [ ] Lighthouse ≥ 90/95/95/95 en home (pendiente auditoría)
- [x] `sitemap.xml` y `robots.txt` accesibles en producción
- [ ] Flujo end-to-end probado con tarjeta real de prueba
- [x] `pnpm lint` y `pnpm type-check` pasan

---

## 🚨 Bloqueos activos

- **S1.5-1**: Requiere cuenta Stripe nueva (sin Lodgify) + webhook + secret en Vercel
- **S1.5-10**: Depende de S1.5-1 para la parte de pagos

---

## 📝 Notas del sprint

- S1.5-2 (Resend) **CERRADO** — dominio verificado, env vars configuradas
- El email footer se corrigió: "Mobbitrips · México" (ya no dice "Xalapa, Ver.")
- Home cambiada de `force-dynamic` a ISR `revalidate=3600` → mejora significativa de performance
- La metadata de todas las páginas ya no menciona "Xalapa, Veracruz" — rebrand limpio

---

## 🔗 Sprints

**Sprint anterior**: 1.3 + 1.4 — `docs/sprints/completados/sprint-1.3-1.4.md`
**Próximo sprint previsto**: 2.1 — n8n + automatización de reservas
