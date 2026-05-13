# 📓 Bitácora Mobbitrips

> Log cronológico de sesiones de trabajo. **Las entradas más recientes van arriba.**
> Claude Code actualiza este archivo al cierre de cada sesión.

---

## 2026-05-13 · Sesión 13 — AmbientCanvas: fondo vivo tipo lámpara de lava

**Sprint**: chore/design-tooling · Trabajó con: Emilio · Máquina: escritorio

**Objetivo:** reemplazar el patchwork de fondos por sección (oscuro/coral/cream) con una sola capa de fondo animado que cubre todo el Home — blobs orgánicos que flotan autónomamente y reaccionan al cursor como una lámpara de lava.

**Tasks cerradas:**

- `AmbientCanvas.tsx` creado en `apps/web/src/components/ambient/` — capa `position: fixed; inset: 0; z-index: -1` con 10 blobs de radial-gradient blureados. Arquitectura de dos divs anidados por blob: outer (drift/deflexión) + inner (ripple sutil). Cleanup via `gsap.context()`.
- **Drift autónomo**: cada blob elige un destino aleatorio dentro de su rango (400-700px), glide con `sine.inOut`, al llegar elige otro. Nunca vuelve a un punto fijo — libre flotación permanente. Blobs arrancan en posición aleatoria dispersa (no desde 0,0).
- **Deflexión de dirección por cursor**: cuando el cursor entra en la zona de influencia, se interrumpe el drift actual y se lanza un nuevo tween en dirección contraria. El blob sigue flotando desde la nueva posición — cambia de camino, no cede y regresa. Cooldown de 1.5s por blob evita jitter.
- **Ripple líquido (inner div)**: `quickTo` con `duration: 1.6, ease: 'power1.out'` — respuesta lenta y suave al cursor (20% del push). Sustituye el force-field agresivo anterior.
- **Fondos unificados**: todas las secciones del Home pasaron a `background: transparent`. Colores de texto corregidos en secciones que antes eran oscuras (`.why`, `.newsletter`, `.finalcta`).
- **Blobs por sección eliminados**: removidos los divs de blob individuales de `HeroSection`, `FeaturedProperties`, `WhyBookDirect`, `StorySection`, `TestimonialsSection`, `OwnerTeaser`, `NewsletterCTA`, `FinalCTA`.
- **Distribución de color**: 50% coral `#ED6864`, 20% rosa `#F4A09E`, 30% dorado `#E8B547` (subido desde 20% por petición de Emilio).

**Commits:**

- `69d6c56` — feat(home): unified ambient canvas with lava-lamp drift and cursor deflection

**Decisiones tomadas:**

- Arquitectura nested div en lugar de CSS custom properties + `calc()` — la primera implementación usaba `transform: translate3d(calc(var(--dx) + var(--fx)), ...)` y GSAP escribía valores sin unidad, rompiendo el calc. Con divs anidados los transforms se suman naturalmente.
- `gsap.context()` para cleanup en lugar de arrays de tweens manuales — más robusto y el patrón oficial de GSAP para React.
- Deflexión en el div exterior (drift) en lugar de force field cosmético en el interior — el blob genuinamente cambia de destino, como lava que choca. El inner div quedó solo para el ripple sutil.
- `noUncheckedIndexedAccess: true` en tsconfig obliga a `?? 0` en lecturas de arrays — corregido.
- El warning de ESLint `react-hooks/exhaustive-deps` sobre `driftRefs.current` en cleanup — corregido capturando snapshot (`driftRefs.current.slice()`) al inicio del effect.
- Duraciones de drift: 5-13s (era 12-28s). A 20+ segundos el movimiento era invisible; a 5-13s se ve como lámpara de lava.
- Rangos de drift: 400-700px (era 240-380px) para que los blobs crucen zonas amplias de la pantalla.

**Bloqueos activos:** ninguno.

**Próximo paso sugerido:** validación visual completa del Home en mobile (375px) — verificar que los blobs no causen layout shift visible y que el cream de fondo se vea correcto en iOS Safari.

---

## 2026-05-11 · Sesión 12 — Elevación de StorySection al nivel del Hero

**Sprint**: chore/design-tooling · Trabajó con: Emilio · Máquina: escritorio

**Contexto:** primera sesión usando el agente `design-director` end-to-end. Objetivo: cerrar el gap visual entre `StorySection` (plana, estática) y `HeroSection` (orgánica, animada, jerárquica).

**Tasks cerradas:**

- `StoryShapes.tsx` creado (server component) — SVG arc coral light + círculo difuminado con `data-story-parallax="shapes"`.
- `StorySection.client.tsx` creado (`'use client'`) — wrapper con `useGSAP` scope, master timeline (ScrollTrigger `top 75%`, `toggleActions: 'play none none reverse'`) + 3 scrubs parallax independientes (watermark, shapes, panel).
- `StorySection.tsx` refactor — removidos los dos `<AnimatedSection>`, headline split en spans con `overflow:hidden` lines + `data-story-reveal="word"`, "Mobi." con underline SVG (stroke-draw vía `strokeDashoffset` + `getTotalLength()`), CTA pill outline coral con flecha hover, `aria-label` accesible + `aria-hidden` en words splitteadas.
- `StoryBadges.tsx` — añadido `data-story-reveal="badge"` (CountUp + scrollSpyOnce intacto).
- `globals.css` — grid asimétrico `5fr 6fr` con `align-items: start`, panel `translateY(40px)` en desktop (reset en `<=1024px`), watermark `rgba(255,255,255,0.04)` → `0.08`, transición dark→cream del `::before` suavizada (180px → 260px con stops curvados), nuevos estilos `.story__shapes`, `.story__shape-arc/circle`, `.story__title-line/words/word/script/script-underline`, `.story__cta/cta-arrow`, `.story__motion-root`, fallback `prefers-reduced-motion` específico.

**Commits:**

- `269551d` — feat(home): add StoryShapes and client motion wrapper for Story section
- `ef8402b` — feat(home): elevate StorySection with split headline, scroll choreography and asymmetric grid

**Decisiones tomadas:**

- Spans manuales para split del headline (mismo patrón que Hero) en vez de instalar `split-type`. 0kb extra, SSR-friendly.
- GSAP timeline + ScrollTrigger para coreografía orquestada; CSS transitions clásicas para hovers (no Framer aquí). Si los hovers se sienten flojos en validación visual, escalar a Framer en iteración siguiente.
- Conservar transición oscura del `::before` (Why→Story) — NO es residuo: `WhyBookDirect` tiene fondo `#1f1f1f` y la transición es legítima. Lo que se hizo fue suavizarla, no eliminarla.
- Watermark "Mobi" del panel: opacidad `0.04` era invisible en muchos monitores → subida a `0.08` + `will-change: transform` para parallax.
- CTA "Conócenos más" pasa de link textual minúsculo a **pill outline coral** — jerarquía editorial (no comercial; el sólido es para "Ver propiedades" del Hero).
- Asimetría 5fr/6fr + `translateY(40px)` al panel rompe el "PowerPoint" simétrico sin sacrificar lectura. En `<1024px` colapsa a 1fr y se quita el translateY.
- Cast `as unknown as SVGPathElement[]` en el query del underline path (genérico de `gsap.utils.selector` no acepta `SVGPathElement` directo — preferí cast tipado a silenciar con `@ts-expect-error`).
- StorySection sigue siendo server component; solo el wrapper interno es `'use client'`. Patrón coherente con `StoryBadges`.
- Easings respetados: `expo.out` reveals, `back.out(1.4/1.6)` script + badges, scrub linear para parallax.
- Mobile (`<640px`): badges siguen `display:none`, asimetría off, grid colapsa.
- `prefers-reduced-motion`: early return en `useGSAP` + `clearProps` + fallback CSS específico al final de la sección Story.

**Validación:**

- `pnpm lint`: ✅ No ESLint warnings or errors
- `pnpm type-check`: ✅ pass
- `pnpm dev`: ✅ Ready in 6s, `GET / 200` en 15.8s, sin errores de compilación

**Validación visual pendiente (Emil debe revisar en localhost:3000):**

Sección Story (después de Featured Properties y Why Book Direct):

- [ ] Headline "Nacimos del amor a Mobi." entra palabra por palabra al hacer scroll
- [ ] "Mobi." con rebote `back.out` + subrayado coral dibujándose con `strokeDashoffset`
- [ ] Panel oscuro entra desde abajo con `scale 0.97 → 1`
- [ ] Watermark "Mobi" con clip-path reveal de abajo hacia arriba
- [ ] Badges (50+ estancias / 4.9★) con stagger 140ms `back.out(1.6)`
- [ ] CTA "Conócenos más" como pill outline coral, flecha que se mueve al hover
- [ ] Parallax scrub: shapes/panel/watermark a velocidades distintas mientras se scrollea
- [ ] Mobile 375px: layout colapsa, asimetría off, badges ocultos
- [ ] DevTools → Emulate `prefers-reduced-motion: reduce`: todo visible sin animar

**NO se tocó en esta sesión:**

- `WhyBookDirect`, `HeroSection`, `FeaturedProperties`, `TestimonialsSection` (fuera de scope).
- `AnimatedSection` en `packages/ui` (sigue intacto — lo usan otras secciones).
- `scripts/migrate-newsletter.mjs` (modificado desde antes de la sesión, no es nuestro) y `lighthouse-report.json` (untracked desde antes, no es nuestro).

**Referencia visual abierta:**

Emil mencionó `lumiereautomata.com` como ejemplo de animaciones que le gustaron. WebFetch no puede leer las animaciones (renderizan client-side y los assets no se exponen al fetch estático). **Pendiente al retomar**: Emil va a pasar video/screen recording o frames del momento específico que le flechó para que el design-director lo traduzca al motion de Mobbitrips. Sugerido guardar los assets en `design/refs/lumiere/`.

**Próximo paso sugerido (al retomar desde casa):**

1. Arrancar `pnpm dev` y validar visualmente la elevación de Story (checklist arriba).
2. Si Emil ya tiene el video/frames de Lumière Automata, ponerlos en `design/refs/lumiere/` y pedirle al design-director que los analice e identifique qué patrones aplicar.
3. Próxima sección candidata para elevar: `TestimonialsSection` (sigue al Story en el orden del Home y todavía está en nivel básico) o `OwnerTeaser`.

**Bloqueos activos:**

Ninguno.

---

## 2026-05-05 · Sesión 11 — Setup tooling de animación + agente design-director

**Sprint**: chore/design-tooling · Trabajó con: Emilio

**Tasks cerradas:**

- Stack de animación instalado: `gsap` `@gsap/react` `split-type` `@lottiefiles/dotlottie-react` `@rive-app/react-canvas`
- `apps/web/src/lib/gsap.ts` creado (registro centralizado de plugins)
- `apps/web/src/hooks/use-reduced-motion.ts` creado
- `SmoothScrollProvider` modificado: Lenis sincronizado con GSAP ScrollTrigger
- `docs/MOTION.md` creado (fuente única de verdad para animación)
- `.claude/agents/design-director.md` creado (agente director de diseño)
- `.claude/settings.json`: SessionStart hook agrega recordatorio sobre design-director
- `CLAUDE.md` raíz: stack técnico actualizado, protocolo de sesión añade punto sobre agente
- `apps/web/CLAUDE.md`: sección de animación reemplazada por referencia a `docs/MOTION.md`
- `.gitignore`: añadido `!.claude/agents` para que los agentes entren al repo

**Commits:**

- `fe7bf39` — feat(web): install animation stack (gsap split-type lottie rive)
- `ff1cc11` — feat(web): add lib/gsap.ts with centralized plugin registration
- `5447977` — feat(web): add useReducedMotion hook
- `e94b9a3` — feat(web): sync Lenis with GSAP ScrollTrigger
- `3957cd8` — docs: add MOTION.md as single source of truth for animation
- `4bde1d4` — feat(claude): add design-director agent for UI/UX work
- `1abd8d8` — chore(claude): SessionStart hook reminds about design-director
- `d8e8eb5` — docs: update CLAUDE.md stack and protocol for animation
- `efc65be` — docs: replace web/CLAUDE.md animation section with MOTION.md reference

**Decisiones tomadas:**

- Stack final: GSAP (timelines + ScrollTrigger) + Framer Motion (gestos/AnimatePresence) + Lenis (smooth scroll) + split-type (text reveal) + Lottie (loaders) + Rive (botones interactivos). Coexisten — cada uno se usa para lo suyo.
- Three.js / curtains.js NO se instalan ahora. Se agregarán solo si surge una sección que los justifique.
- El conflicto de `cubic-bezier(0.34, 1.56, 0.64, 1)` entre design system y skill `/animate` se resuelve a favor del design system: la curva es oficial de Mobbitrips para hovers.
- El agente `design-director` es OBLIGATORIO para todo trabajo de UI/UX. El SessionStart hook lo recuerda automáticamente.
- Fix en `lib/gsap.ts`: `gsap.core.globals()` no existe en tipos GSAP — se reemplazó por variable de módulo `let registered = false`.

**Validación:**

- `pnpm lint`: ✅ pass
- `pnpm type-check`: ✅ pass (tras fix de tipos en gsap.ts)
- `pnpm dev`: ✅ arranca sin errores en 2.1s

**NO se tocó en esta sesión:**

- `HeroSection.tsx`, `FeaturedProperties.tsx` (ya están bien)
- `packages/*` (intacto)
- `supabase/*` (intacto)
- Skills antiguos en `.agents/skills/` (queda como referencia histórica, el agente design-director es el que manda)

**Próximo paso sugerido:**

Sesión nueva: invocar al agente `design-director` para implementar la primera sección posterior al Hero/FeaturedProperties (probablemente StorySection, WhyBookDirect o lo que indique SPRINT_ACTUAL).

Ejemplo de prompt: _"Usa el agente design-director. Lee la sección StorySection actual y elévala al nivel del Hero."_

---

## 2026-04-28 · Sesión 10 — Fix crítico animaciones de scroll

**Sprint**: fix/animated-section · Trabajó con: Emilio

**Tasks cerradas:**

- Fix AnimatedSection: animaciones de scroll que nunca ejecutaban

**Commits:**

- `a3dd955` — fix(ui): reemplaza Framer Motion en AnimatedSection por IntersectionObserver
- `0344b3f` — fix(ui): integra fix AnimatedSection + sync con origin/main (push a GitHub)

**Problema identificado:**

`AnimatedSection.tsx` usaba `motion(Tag)` dentro del cuerpo del componente → cada render creaba un nuevo tipo de componente → React hacía unmount/remount → Framer Motion perdía estado de animación. Además, el `initial: { opacity: 0 }` se renderizaba en SSR dejando secciones invisibles si JS fallaba o tardaba.

**Solución aplicada:**

Reescritura completa de `AnimatedSection` usando `IntersectionObserver + CSS transitions` (mismo patrón probado de FeaturedProperties):

- Contenido visible por defecto en SSR (sin opacity:0 en HTML)
- `useEffect` aplica la animación SOLO a elementos fuera del viewport al montar
- `rootMargin: -60px` (menos agresivo que -100px, mejor en mobile)
- `prefers-reduced-motion` respetado
- Sin dependencia de Framer Motion
- Agregado `AnimatedSection` a `FinalCTA` (única sección sin animaciones de scroll)

**Decisiones:**

- Se eliminó Framer Motion de AnimatedSection (la dependencia queda en package.json por si se usa en otro componente futuro)
- FinalCTA ahora tiene animaciones: título + descripción entran primero, botones con 150ms de delay

**Estado:**

- `pnpm lint` ✅ `pnpm type-check` ✅ Push a main ✅ Vercel building...

**Próximo paso:**

- Verificar en el sitio live que todas las secciones animan al hacer scroll
- Continuar con Sprint 1.5 (Stripe webhook en producción)

---

## 2026-04-27 · Sesión 9 — 6 secciones restantes del Home

**Sprint**: design/hero-polish (mergeado en main) · Trabajó con: Emilio

**Tasks cerradas:**

- Implementación completa de WhyBookDirect, StorySection, TestimonialsSection, OwnerTeaser, NewsletterCTA, FinalCTA

**Commits:**

- `e36168c` — feat(home): implementa 6 secciones restantes con sistema CSS de clases

**Lo que se hizo:**

- 6 secciones convertidas al sistema CSS de clases (igual que Hero y FeaturedProperties)
- Transiciones graduales entre secciones (cream→dark y dark→cream vía `::before`)
- Caveat script inline en h2 de cada sección (`.script-inline`)
- Blobs animados en secciones oscuras y cream con opacidad sutil
- FinalCTA: sunset gradient `#1f1f1f → #c14744 → #ed6864 → #f08884`
- tailwind.config.ts: agregada `font-caveat` como utility class
- `pnpm lint` ✅ `pnpm type-check` ✅

**Decisiones:**

- Empezamos en `main` (el `git pull --rebase origin design/hero-polish` del inicio fusionó la rama)
- CSS siempre append al final de globals.css, nunca modificar bloques existentes
- AnimatedSection (Framer Motion) se mantiene para reveals — misma API que el resto del proyecto

**Bloqueos:** ninguno

**Próximo paso:** Abrir `http://localhost:3000` y revisar el home completo. Si hay ajustes visuales → sesión de fine-tuning. Si todo OK → merge a main / Vercel deploy.

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
