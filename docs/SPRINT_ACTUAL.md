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

**0 / 10 tasks completadas (0%)**

---

## ✅ Completadas

_(ninguna aún)_

---

## 🔄 En progreso

_(empezamos con S1.5-1 — configuración Stripe)_

---

## 📋 Backlog del sprint

### 🔧 Cerrar bloqueadores (prioridad máxima)

- [ ] **S1.5-1** Configurar Stripe webhook en producción `[1 pt]`
  - En Stripe Dashboard → Developers → Webhooks → Add endpoint
  - URL: `https://mobbitrips.com/api/webhooks/stripe`
  - Evento: `checkout.session.completed`
  - Copiar el signing secret (`whsec_...`)
  - En Vercel → Settings → Environment Variables → agregar `STRIPE_WEBHOOK_SECRET`
  - Redeploy y verificar con `stripe trigger checkout.session.completed`
  - **Criterio**: reserva creada con Stripe pasa a status `paid` automáticamente

- [ ] **S1.5-2** Configurar Resend + verificar dominio `[2 pts]`
  - En Resend → API Keys → crear key → guardar en Vercel como `RESEND_API_KEY`
  - En Resend → Domains → Add Domain → `mobbitrips.com`
  - Agregar registros DNS en Hostinger (TXT para SPF + DKIM)
  - Verificar dominio en Resend
  - En Vercel: agregar `RESEND_FROM_EMAIL=reservas@mobbitrips.com`
  - Redeploy y hacer reserva de prueba
  - **Criterio**: huésped recibe email de confirmación al solicitar reserva

### 📈 SEO

- [ ] **S1.5-3** `sitemap.xml` dinámico `[2 pts]`
  - `apps/web/src/app/sitemap.ts` — Next.js genera automáticamente
  - Incluir: `/`, `/propiedades`, `/propiedades/[slug]` (todas las propiedades), `/nosotros`, `/servicios`, `/contacto`, `/blog`
  - Excluir: `/reserva/*`, `/api/*`
  - Prioridades: home=1.0, propiedades=0.9, detalle=0.8, info=0.6

- [ ] **S1.5-4** `robots.txt` `[0.5 pts]`
  - `apps/web/src/app/robots.ts`
  - Bloquear: `/api/*`, `/reserva/*`
  - Allow: todo lo demás
  - Sitemap pointer

- [ ] **S1.5-5** Meta tags completos en todas las páginas `[2 pts]`
  - Revisar que cada `page.tsx` tenga `metadata` con `title`, `description`, `openGraph`
  - Prioridad: home, /propiedades, /propiedades/[slug]
  - OG image: usar la cover photo de cada propiedad para el slug
  - Verificar en https://opengraph.xyz

### ⚡ Performance

- [ ] **S1.5-6** Auditoría Lighthouse y correcciones `[2 pts]`
  - Correr Lighthouse en `/`, `/propiedades`, `/propiedades/[slug]`
  - Objetivo: ≥ 90 en Performance, ≥ 95 en Accessibility, SEO, Best Practices
  - Issues comunes: `priority` en above-fold images, LCP, alt texts
  - Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1

- [ ] **S1.5-7** Optimizar imágenes de propiedades `[1 pt]`
  - Verificar que todas las `<Image>` de Hostex usen `sizes` correcto
  - Agregar `priority` a la primera imagen del detalle de propiedad
  - Lazy loading en galería

### 🎨 UX rápido

- [ ] **S1.5-8** Error 404 personalizado `[1 pt]`
  - `apps/web/src/app/not-found.tsx`
  - Mensaje amigable con CTA a `/propiedades`
  - Misma identidad visual

- [ ] **S1.5-9** Loading states globales `[0.5 pts]`
  - Revisar que `/propiedades` y `/propiedades/[slug]` tengan `loading.tsx`
  - Skeletons con forma de la UI real

- [ ] **S1.5-10** Verificar flujo completo end-to-end en producción `[1 pt]`
  - Crear reserva real con tarjeta de prueba Stripe (`4242 4242 4242 4242`)
  - Verificar: email llega → reserva en Supabase cambia a "paid" → evento en `events`
  - Documentar resultado en BITACORA

---

## 🎯 Criterios de cierre del sprint

- [ ] `STRIPE_WEBHOOK_SECRET` configurado y verificado en producción
- [ ] Emails de confirmación funcionando desde `reservas@mobbitrips.com`
- [ ] Lighthouse ≥ 90/95/95/95 en home
- [ ] `sitemap.xml` y `robots.txt` accesibles en producción
- [ ] Flujo end-to-end probado con tarjeta real de prueba
- [ ] `pnpm lint` y `pnpm type-check` pasan

---

## 🚨 Bloqueos activos

- **S1.5-1**: Requiere acceso a Stripe Dashboard (Emilio) + copiar secret a Vercel
- **S1.5-2**: Requiere acceso a Resend + acceso al DNS en Hostinger para agregar registros

---

## 📝 Notas del sprint

- S1.5-1 y S1.5-2 son tasks de configuración pura (no código) — pueden hacerse en 30 min combinados
- Una vez cerrados esos dos, el MVP de reservas está 100% funcional
- SEO con Next.js App Router es muy sencillo (`sitemap.ts`, `robots.ts`, `metadata` en cada page)
- No implementar GA4/Meta Pixel aún — eso es Sprint 2.x

---

## 🔗 Sprints

**Sprint anterior**: 1.3 + 1.4 — `docs/sprints/completados/sprint-1.3-1.4.md`
**Próximo sprint previsto**: 2.1 — n8n + automatización de reservas

---

**Sprint anterior**: 1.3 + 1.4 · `docs/sprints/completados/sprint-1.3-1.4.md`
**Ver todos los sprints completados**: `docs/sprints/completados/`
