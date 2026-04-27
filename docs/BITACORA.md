# 📓 Bitácora Mobbitrips

> Log cronológico de sesiones de trabajo. **Las entradas más recientes van arriba.**
> Claude Code actualiza este archivo al cierre de cada sesión.

---

## 2026-04-27 · Sesión 8 — FeaturedProperties desde Claude Design

**Sprint**: design/hero-polish · Trabajó con: Emilio

**Tasks cerradas:**

- Implementación de sección FeaturedProperties desde bundle de Claude Design
- Documentación de protocolo de handoff en `docs/METODOLOGIA_DISENO_WEB.md` (sección 4b)

**Commits:**

- `4a01574` — feat(home): implementa sección FeaturedProperties desde Claude Design

**Lo que se hizo:**

- Extraído bundle Claude Design (tar.gz) → `components/Properties.jsx` + `styles/properties.css`
- Ignorado: Navbar.jsx, Hero.jsx del bundle (tenemos los nuestros polidos)
- Creado `FeaturedProperties.tsx` como client component TypeScript
- Carrusel scroll-snap, 6 propiedades con gradientes coral, filter chips, flechas liquid glass, dots, reveal animado
- Fondo gradient disuelve coral del hero → cream (continuidad visual entre secciones)
- CSS appended al final de `globals.css` — nada existente modificado
- `HeroSection.tsx` y `Navbar.tsx` intactos
- Lint ✅ Type-check ✅

**Decisiones:**

- hero-v2.html pesa 2MB (fuentes base64) — inviable importar a Claude Design. Continuidad se mantiene trabajando en el mismo archivo de Design con su propio hero como contexto
- Documentado protocolo de extracción parcial en METODOLOGIA_DISENO_WEB.md sección 4b: mostrar qué se ignora antes de implementar, esperar confirmación

**Bloqueos:** ninguno

**Próximo paso:** Revisar FeaturedProperties en `http://localhost:3000` y ajustar si hace falta. Luego siguiente sección en Claude Design.

---

## 2026-04-27 · Sesión 7 — Polish Hero + Navbar

**Sprint**: design/hero-polish · Trabajó con: Emilio

**Tasks cerradas**

- Headline hero: de 4 líneas visuales a 2 (quita max-width 14ch + fusiona "en casa" a línea 2)
- Search bar: max-width 720 → 860px (textos completos visibles)
- Navbar: elimina smart-hide; siempre visible y fijo al scroll. Hover links: pill coral suave (bg-primary/10)

**Commits**

- `0443e30` style(hero): headline 2 líneas, search más ancha, navbar siempre visible + hover links

**Decisiones**

- Secciones placeholder debajo del hero (FeaturedProperties, WhyBookDirect, etc.) se conservan en código pero no se tocan hasta que pasen por Claude Design
- Flujo confirmado: cada sección se diseña en Claude Design → HTML → Claude Code la implementa
- Date picker custom (react-day-picker) se deja para sprint propio, no durante polish visual

**Bloqueos activos**

- STRIPE_WEBHOOK_SECRET sin configurar
- Dominio Resend sin verificar

**Próximo paso**

- Emilio diseña la siguiente sección en Claude Design (FeaturedProperties o la que elija)
- Claude Code la implementa reemplazando el placeholder existente

---

## 2026-04-23 · Sesión 6 — Diseño Hero (continúa mañana en oficina)

**Sprint**: 1.5 · Trabajé con: Emilio

**Foco de la sesión**: Metodología Claude Design → Claude Code + refinamiento Hero standalone

**Tasks cerradas**:

- chore ✅ Metodología de trabajo formalizada: Claude Design genera secciones grandes → Claude Code afina detalles en browser → HTML final sube de vuelta como contexto a Claude Design
- chore ✅ `design/WORKFLOW.md` documentado con flujo completo + convenciones de naming
- chore ✅ `design/exports/hero-v1-editable.html` creado: HTML standalone extraído del bundle de Claude Design, con fuentes locales, logo base64 embebido, CSS design tokens inline
- chore ✅ `apps/web/src/components/sections/` creada (`.gitkeep`) — carpeta destino de secciones convertidas
- chore ✅ `apps/web/CLAUDE.md` actualizado: flujo Claude Design, carpeta sections/, design tokens

**Ajustes aplicados al Hero (hero-v1-editable.html)**:

- ✅ Animaciones ~20% más rápidas: eyebrow 800→640ms, words 900→720ms, script 1200→950ms, lede 700→560ms, search 1000→800ms, CTAs 600→480ms, scroll indicator 800→640ms
- ✅ Navbar: liquid glass→sólido ahora dispara a 40px scroll (era 80px) con 180ms de transición (era 400ms)
- ✅ Espaciado redistribuido: menos aire arriba (padding hero 96→72px, content padding-top 50→16px), más respiración entre elementos (headline 12→20px, lede 12→28px, search 16→32px, CTAs 16→24px)
- ✅ Search pill: padding horizontal 14→10px por sección + overflow:hidden en sección → fix truncado de texto en viewports 768-900px
- ✅ Placeholder texts acortados: "¿A dónde quieres ir?" → "Xalapa, México", "Agrega" → "Añade"

**Pendiente (continuar mañana en la oficina)**:

- 🔲 Verificar en browser que search pill ya no trunca texto en viewports ~768-900px
- 🔲 Aprobar visualmente el Hero completo en mobile (375px) y desktop (1440px)
- 🔲 Una vez aprobado el Hero → convertir a `apps/web/src/components/sections/HeroSection.tsx`
- 🔲 Continuar con la siguiente sección (abrir Claude Design con hero-v1-editable.html como contexto)

**Archivo principal de trabajo**:

```
design/exports/hero-v1-editable.html
```

Abrir este archivo en el browser y verificar el search pill antes de seguir.

**Commits**:

- `47ae98f` chore(design): hero editable standalone listo para afinar
- `(esta sesión)` chore(design): ajustes Hero — animaciones, navbar, espaciado, search pill

**Bloqueos**:

- Search pill text cutoff: aplicado fix (padding 10px + overflow hidden), pendiente verificar en browser mañana

---

## 2026-04-22 · Sesión 5 (en pausa)

**Sprint**: 1.5 · **Trabajé con**: Emilio

**Tasks cerradas**:

- docs ✅ Sprint 1.5 actualizado: 7/10 tasks marcadas como completadas (estaba en 0/10 por error)

**Avance de configuración Stripe (incompleto, retomar aquí)**:

- ✅ Cuenta Stripe nueva creada (separada de la cuenta comprometida por Lodgify)
- ✅ Webhook creado en Stripe Workbench → Webhooks → `Mobbitrips Producción`
  - URL: `https://mobbitrips.com/api/webhooks/stripe`
  - Evento: `checkout.session.completed`
  - Modo: **test** (Entorno de prueba)
- ⏳ `STRIPE_WEBHOOK_SECRET` obtenido (`whsec_...`) — **pendiente agregar en Vercel**
- ⏳ `STRIPE_SECRET_KEY` pendiente — obtener desde Stripe → Claves de API (`sk_test_...`)

**Commits**:

- `(ninguno esta sesión — solo docs)`

**Próximo paso al retomar** (exactamente aquí se quedó):

1. Ir a Vercel → Settings → Environment Variables → agregar `STRIPE_WEBHOOK_SECRET`
2. Ir a Stripe Workbench → Claves de API → copiar `sk_test_...` → agregar en Vercel como `STRIPE_SECRET_KEY`
3. Redeploy en Vercel
4. Probar end-to-end con tarjeta `4242 4242 4242 4242`

**Bloqueos activos**:

- S1.5-1: Stripe webhook creado pero falta agregar secrets en Vercel
- S1.5-10: Depende de que estén los secrets en Vercel

---

## 2026-04-22 · Sesión 4 (completa)

**Sprint**: 1.5 · **Trabajé con**: Emilio

**Tasks cerradas**:

- S1.5-2 ✅ Resend configurado y dominio `mobbitrips.com` verificado — emails desde `reservas@mobbitrips.com` funcionando
- S1.5-3 ✅ `sitemap.ts` dinámico (rutas estáticas + slugs de propiedades desde Hostex)
- S1.5-4 ✅ `robots.ts` (bloquea /api/_ y /reserva/_)
- S1.5-5 ✅ OG tags completos en home, /propiedades, /nosotros, /servicios, /contacto
- S1.5-8 ✅ `not-found.tsx` mejorado con CTA doble y aria attrs
- S1.5-9 ✅ `loading.tsx` en /propiedades y /propiedades/[slug] con skeletons animados
- fix ✅ `email.ts` footer "Xalapa, Ver." → "México"
- fix ✅ Home `description` metadata "Xalapa, Veracruz" → "México"
- perf ✅ Home cambiada de `force-dynamic` a ISR `revalidate=3600` (caché 1h, no llama Hostex en cada visita)
- perf ✅ Primera imagen de FeaturedProperties con `priority` (mejora LCP)
- docs ✅ Sprint 1.3+1.4 archivado, Sprint 1.5 abierto

**Commits**:

- `4617a9b` feat(web): SEO sitemap + robots + 404 mejorado + fix email rebrand
- `adde36c` feat(web): loading skeletons + OG tags en páginas estáticas
- `a116c8f` perf(home): ISR revalidate 1h + fix metadata rebrand + LCP priority image

**Decisiones tomadas**:

- Stripe: cuenta actual comprometida por Lodgify (se pusieron como admins). Emilio necesita cuenta nueva — el código no requiere ningún cambio, solo actualizar `STRIPE_SECRET_KEY` y configurar webhook.
- Resend: dominio verificado usando la cuenta `mobbimx` que ya existía. Key nueva creada por Emilio (`re_GScGreq...`). Valores placeholder `YOUR_SECRET_VALUE_GOES_HERE` reemplazados en Vercel.
- Rate limiting in-memory se mantiene para MVP.

**Bloqueos activos**:

- `STRIPE_WEBHOOK_SECRET` sin configurar → reservas no pasan a "paid" automáticamente
  - Requiere cuenta Stripe nueva (sin Lodgify como admin) → nuevo `STRIPE_SECRET_KEY` + webhook configurado
- `RESEND_FROM_EMAIL` en Vercel aún con valor placeholder → actualizar a `reservas@mobbitrips.com`

**Próximo paso sugerido**:

1. Actualizar `RESEND_FROM_EMAIL` en Vercel → hacer reserva de prueba y verificar que llegue el email
2. Crear cuenta Stripe nueva (sin Lodgify) → actualizar `STRIPE_SECRET_KEY` → configurar webhook → probar pago end-to-end

---

## 2026-04-20 · Sesión 3

**Sprint**: 1.3 + 1.4 · **Trabajé con**: Emilio

**Tasks cerradas**:

- Catálogo actualizado con datos reales del CSV (precios, capacidades, descripciones, amenidades)
- Sprint 1.3 completo: reservas, leads, eventos, Stripe, Resend, contacto
- Deploy en Vercel (rootDirectory: apps/web, pnpm monorepo)
- FeaturedProperties home usa datos reales de Hostex (no mocks)
- DNS configurado en Hostinger → dominio mobbitrips.com apunta a Vercel

**Commits**:

- `9838df4` feat(catalog): update all properties with real data from CSV
- `6a5fa5e` fix(web): force-dynamic on property detail page
- `bf428dc` fix(web): trim API token + force-dynamic on propiedades pages
- `213da93` feat(home): FeaturedProperties usa datos reales de Hostex
- `544bd0f` chore: update gitignore files from Vercel link

**Decisiones tomadas**:

- Colina Estacionamiento cambiada a isVisible: true — sí es unidad habitable
- extraGuestFeePerNight corregido a $50 (era $150 incorrecto)
- Páginas de propiedades como force-dynamic (no static) para evitar calls a Hostex en build time
- Deploy desde apps/web como rootDirectory, install desde raíz del monorepo
- DNS: registro A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com

**URLs producción**:

- https://mobbitrips-web.vercel.app (alias permanente)
- https://mobbitrips.com (DNS propagando, puede tardar hasta 1h)

**Bloqueos activos**:

- STRIPE_WEBHOOK_SECRET vacío — pagos procesan pero reserva no pasa a "paid" automáticamente
- Resend: dominio mobbitrips.com necesita verificación para enviar emails desde reservas@mobbitrips.com
- Emilio traerá CSV actualizado mañana con más info de propiedades

**Próximo paso sugerido**: verificar que mobbitrips.com carga v2, luego configurar Stripe webhook en dashboard de Stripe para cerrar el flujo de pagos.

---

## 2026-04-21 · Sesión 2 (lunes)

**Sprint**: 1.2 · **Trabajé con**: Emilio
**Tasks cerradas**: S1.2-1, S1.2-2, S1.2-3, S1.2-4, S1.2-5, S1.2-6, S1.2-7, S1.2-8, S1.2-9, S1.2-10, S1.2-11, S1.2-12, S1.2-13
**Tasks en progreso**: S1.2-14 (requiere Supabase)
**Commits**:

- `cc46e16` feat(web): S1.2-1→13 hostex-client + páginas propiedades completas

**Decisiones tomadas**:

- Auth de Hostex es `Authorization: Bearer` (no `Access-Token` como decía la doc inicial).
- Pricing calculado desde catálogo estático (`catalog.ts`) — Hostex no expone endpoint de precios.
- Availability derivada de `GET /reservations?property_id=X&status=accepted` + detección de overlap local.
- Colina Estacionamiento (id 12155811) marcada `isVisible: false` — no es unidad habitable.
- 8 propiedades visibles en total (9 en Hostex, una oculta).
- `hostex-client` usa mocks automáticamente cuando `HOSTEX_API_TOKEN` no está definido.

**Bloqueos**:

- S1.2-14 (newsletter → Supabase): requiere `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` en `.env.local`. Emilio lo está configurando.
- PropertyCard en `/propiedades` no tiene rating real aún (Hostex no expone reviews vía API activa). Muestra "Nuevo" por ahora.
- Imágenes de galería: solo la cover por unidad. La galería múltiple requiere fotos adicionales del propietario.
- Metadatos de propiedades (bedrooms, bathrooms, maxGuests, precio) son estimados en `catalog.ts` — deben ser verificados con el propietario.

**Próximo paso**: S1.2-14 en cuanto Emilio tenga las keys de Supabase. Después arrancar Sprint 1.3 (reservas + pagos).

---

## 📋 Formato de entrada

```markdown
## YYYY-MM-DD · Sesión N (día HH:MM-HH:MM)

**Sprint**: X.Y · **Trabajé con**: [nombre]
**Tasks cerradas**: [IDs]
**Tasks en progreso**: [IDs]
**Commits**: [hash corto] "mensaje"
**Preview deploy**: [URL si aplica]
**Métricas**: [Lighthouse, tests, etc. si aplica]
**Decisiones tomadas**: [descripción breve, o "Ninguna"]
**Bloqueos**: [descripción, o "Ninguno"]
**Próximo paso**: [qué sigue]
**Notas**: [contexto adicional útil para la siguiente sesión]
```

---

## 🎬 Ejemplos de entradas (borrar cuando arranques)

### Ejemplo 1 — Sesión de setup

```markdown
## 2026-04-20 · Sesión 1 (lunes 10:00-12:30)

**Sprint**: 1.0 · **Trabajé con**: Daniel
**Tasks cerradas**: S1.0-1, S1.0-2, S1.0-3
**Tasks en progreso**: S1.0-4 (config next/font)
**Commits**:

- `a1b2c3d` chore: init turborepo with pnpm workspaces
- `e4f5g6h` chore: setup next.js 14 with typescript strict
- `i7j8k9l` chore: configure tailwind with mobbitrips palette
  **Preview deploy**: https://mobbitrips.vercel.app (setup inicial, solo healthcheck)
  **Decisiones tomadas**: Ninguna nueva, seguimos master.
  **Bloqueos**: Ninguno.
  **Próximo paso**: S1.0-4 configurar next/font con Comfortaa+Inter. Después S1.0-5 ESLint+Prettier+Husky.
  **Notas**: El warning de Tailwind v3 sobre "content" array era falso positivo, ya tiene paths correctos. Vercel connected al repo con preview deploys automáticos en PRs.
```

### Ejemplo 2 — Sesión productiva

```markdown
## 2026-04-22 · Sesión 3 (miércoles 09:00-13:00)

**Sprint**: 1.1 · **Trabajé con**: Daniel
**Tasks cerradas**: S1.1-4 (Navbar), S1.1-5 (Footer), S1.1-6 (WhatsAppFloatingButton)
**Commits**:

- `m1n2o3p` feat(web): add scroll-aware navbar with mobile drawer
- `q4r5s6t` feat(web): add footer with 4 columns and newsletter stub
- `u7v8w9x` feat(web): add floating whatsapp button with pulse animation
  **Preview deploy**: https://mobbitrips-pr-12.vercel.app
  **Métricas**: Lighthouse 92/98/100/100 en /
  **Decisiones tomadas**:
- Usamos altura 72px → 64px al scroll (no 80→64 como el prompt original), se veía más proporcionado.
- El drawer mobile usa `x: 100% → 0` con duration 300ms (Framer Motion default cubic bezier).
  **Bloqueos**: Ninguno.
  **Próximo paso**: S1.1-7 HeroSection con buscador integrado. Es la task más grande del sprint (5 story points), probablemente toma toda una sesión.
  **Notas**: El logo-white.png todavía no está en public/, usamos un filtro CSS `brightness(0) invert(1)` mientras tanto en el footer. Daniel va a subir el PNG definitivo.
```

### Ejemplo 3 — Sesión con bloqueo

```markdown
## 2026-04-28 · Sesión 8 (lunes 14:00-15:30)

**Sprint**: 1.2 · **Trabajé con**: Daniel
**Tasks cerradas**: Ninguna (sesión bloqueada).
**Tasks en progreso**: S1.2-1 (cliente Hostex)
**Commits**: Ninguno.
**Decisiones tomadas**: Ninguna.
**Bloqueos**:

- El token HOSTEX_API_TOKEN está inválido, devuelve 401. Daniel va a regenerar en el panel de Hostex.
- Sin token no podemos avanzar con tasks S1.2-1 a S1.2-7.
  **Próximo paso**: Daniel regenera token, lo guarda en .env.local y en Vercel env vars, siguiente sesión retomamos S1.2-1.
  **Notas**: Mientras tanto avancé con mocks.ts (S1.2-5) de forma especulativa, no commiteado. Está en WIP local.
```

---

## 📝 Registro de sesiones

<!--
INSTRUCCIONES:
- Agregar nuevas entradas AL INICIO de esta sección (debajo de esta línea).
- Mantener las más antiguas abajo.
- Formato idéntico al de los ejemplos.
- Si la sesión fue muy corta (<30min) o solo fue revisión, puedes anotarla como "check-in" sin tasks.
- Si hubo emergencia o hotfix en producción, marcar con 🚨 al inicio del título.
-->

## 2026-04-17 · Sesión 2 (jueves)

**Sprint**: 1.1 · **Trabajé con**: Emilio
**Tasks cerradas**: S1.1-1 (Button), S1.1-2 (Badge/Input/Skeleton/StarRating), S1.1-3 (AnimatedSection), S1.1-4 (Navbar), S1.1-5 (Footer), S1.1-6 (WhatsAppFloatingButton), S1.1-7 (HeroSection), S1.1-8 (FeaturedProperties), S1.1-9 (WhyBookDirect), S1.1-10 (StorySection), S1.1-11 (TestimonialsSection), S1.1-12 (OwnerTeaser), S1.1-13 (NewsletterCTA), S1.1-14 (FinalCTA + montar home)
**Tasks en progreso**: ninguna — Sprint 1.1 completo
**Commits**:

- `e773ca1` feat(ui): add design system base and layout components
- `bf986dc` feat(web): add HeroSection with search widget (S1.1-7)
- `6c262e6` feat(web): complete home page with all 8 sections (S1.1-8 to S1.1-14)
  **Preview deploy**: pendiente (Vercel no conectado aún)
  **Decisiones tomadas**:
- `packages/ui` creado como workspace package con `transpilePackages` en next.config.mjs.
- Tailwind content incluye `../../packages/ui/src/**` para que las clases del design system no se purguen.
- PropertyCard usa CSS hover (`hover:-translate-y-1`) en lugar de Framer Motion para evitar client component innecesario.
- `/api/newsletter` es stub — integración con Supabase queda para Sprint 1.2.
- Mocks en `apps/web/src/lib/mocks.ts` (no en packages todavía).
- Fondos de propiedades con gradientes CSS hasta tener fotos reales.
  **Bloqueos**: Imágenes reales de propiedades pendientes. Emilio debe proveerlas.
  **Próximo paso**: Sprint 1.2 — página `/propiedades` con filtros + página detalle `/propiedades/[slug]` + integración Hostex (requiere credenciales).
  **Notas**: Home completo visible en http://localhost:3000. El comando para levantar es `pnpm dev --filter=@mobbitrips/web`. Sprint 1.1 cerrado al 100%.

## 2026-04-17 · Sesión 1 (jueves)

**Sprint**: 1.0 · **Trabajé con**: Emilio
**Tasks cerradas**: S1.0-1 (monorepo), S1.0-2 (Next.js + TS), S1.0-3 (Tailwind), S1.0-4 (next/font), S1.0-5 (ESLint+Prettier+Husky), S1.0-9 (GTM stub), S1.0-12 (.env.example), S1.0-13 (Lenis), S1.0-14 (páginas esqueleto)
**Tasks en progreso**: S1.0-6 (Supabase), S1.0-7 (RLS), S1.0-8 (Sentry), S1.0-11 (Vercel), S1.0-15 (README)
**Commits**:

- `7ff2146` chore: initial project structure
- `91f0bb7` chore: add full Sprint 1.0 scaffolding and fix tooling
  **Preview deploy**: pendiente (Vercel no conectado aún)
  **Decisiones tomadas**:
- `next.config.ts` renombrado a `next.config.mjs` — Next.js 14.2 no soporta `.ts`.
- ESLint root config requiere `"plugins": ["@typescript-eslint"]` explícito en monorepo pnpm (no queda en PATH sin esto).
- lint-staged usa `pnpm exec eslint` para compatibilidad con Windows PATH.
- `eslint-config-next` + `@typescript-eslint` instalados en root para que lint-staged los resuelva.
  **Bloqueos**: Ninguno activo.
  **Próximo paso**: S1.0-6 crear proyecto Supabase + migraciones iniciales. S1.0-11 conectar repo a Vercel.
  **Notas**: El servidor corre en `http://localhost:3000`. Comando correcto: `pnpm dev --filter=@mobbitrips/web` (el paquete se llama `@mobbitrips/web`, no `web`).

<!-- Primera entrada real irá aquí cuando arranques Sprint 1.0 -->

---

## 📊 Resumen del proyecto

**Inicio del proyecto**: [fecha del primer commit]
**Fase actual**: Fase 1 - MVP Web
**Sprint actual**: 1.0 - Setup
**Tasks completadas totales**: 0 / ~192
**Última sesión productiva**: ninguna aún
**Preview más reciente**: —
**Producción**: no desplegada aún

---

## 🔗 Enlaces útiles

- **Repo**: [URL de GitHub]
- **Vercel**: [URL del proyecto]
- **Supabase**: [URL del dashboard]
- **ClickUp**: [URL del Space Mobbitrips]
- **Master prompt**: `docs/MASTER.md`
- **Sprint actual**: `docs/SPRINT_ACTUAL.md`
- **Cómo trabajar**: `docs/COMO_TRABAJAR.md`
