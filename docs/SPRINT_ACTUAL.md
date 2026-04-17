# 🚀 Sprint Actual — Sprint 1.0: Setup

> Este archivo muestra **solo el sprint activo**. Al cerrarlo, se archiva en `docs/sprints/completados/` y se crea uno nuevo.

---

## 📌 Info del sprint

- **Sprint**: 1.0 — Setup y fundaciones
- **Fase**: 1 — MVP Web
- **Fecha inicio**: [definir al arrancar]
- **Fecha objetivo**: 2 semanas después del inicio (calibrado para ~15h/semana)
- **Objetivo**: Base sólida del monorepo para trabajar sin fricción. Al cerrar el sprint, todas las rutas responden 200, preview deploy verde en Vercel, tooling completo.

---

## 📊 Progreso

**0 / 15 tasks completadas (0%)**

---

## ✅ Completadas

*(ninguna aún)*

---

## 🔄 En progreso

*(ninguna aún — arrancaremos con S1.0-1)*

---

## 📋 Backlog del sprint

### Infraestructura base

- [ ] **S1.0-1** Crear monorepo Turborepo con pnpm workspaces `[3 pts]`
  - Inicializar con `pnpm dlx create-turbo@latest`.
  - Estructura inicial: `apps/web` (placeholder), `packages/` (vacío).
  - `pnpm-workspace.yaml` apuntando a `apps/*` y `packages/*`.

- [ ] **S1.0-2** Configurar Next.js 14 con TypeScript estricto `[2 pts]`
  - `pnpm create next-app` dentro de `apps/web` con App Router.
  - `tsconfig.json` con `"strict": true`, `"noUncheckedIndexedAccess": true`.
  - Eliminar boilerplate innecesario.

- [ ] **S1.0-3** Configurar Tailwind CSS con paleta Mobbitrips `[2 pts]`
  - `tailwind.config.ts` con extend:colors completo (primary, brand, status).
  - Ver paleta exacta en `CLAUDE.md` o `docs/MASTER.md` sección 6.
  - Purgar clases no usadas en build.

- [ ] **S1.0-4** Configurar next/font con Comfortaa e Inter `[1 pt]`
  - Importar desde `next/font/google`.
  - Comfortaa weights: 300, 400, 600, 700.
  - Inter weights: 300, 400, 500, 600.
  - `display: 'swap'` en ambas.
  - Variables CSS `--font-comfortaa` y `--font-inter` en `<html>`.

- [ ] **S1.0-5** Configurar ESLint + Prettier + Husky `[2 pts]`
  - ESLint config compartida en `packages/config/eslint`.
  - Prettier con `.prettierrc` (singleQuote, trailingComma all, printWidth 100).
  - Husky pre-commit: lint-staged corre `eslint --fix` + `prettier --write`.
  - Husky commit-msg: valida formato de commits (commitlint con Conventional Commits).

### Backend y servicios

- [ ] **S1.0-6** Crear proyecto Supabase y tablas iniciales `[3 pts]`
  - Nuevo proyecto en supabase.com (región us-east-1 o us-west-1).
  - Crear migrations iniciales con las tablas de `docs/MASTER.md` sección 13.
  - Tablas prioritarias para Sprint 1.0: `reservation_leads`, `owner_leads`, `contact_messages`, `newsletter_subscribers`, `properties_cache`, `events`.
  - Resto de tablas (payments, whatsapp, brindon) se crean en sprints posteriores.

- [ ] **S1.0-7** Configurar RLS policies en Supabase `[2 pts]`
  - RLS activo en TODAS las tablas.
  - Policies iniciales: deny-all por defecto, writes solo service_role.
  - Newsletter subscribers: allow insert con validación en API Route.
  - Properties cache: allow read público.

- [ ] **S1.0-8** Integrar Sentry en frontend y backend `[2 pts]`
  - `@sentry/nextjs` con wizard automático.
  - Sourcemaps upload en build.
  - Tags: `environment` (dev/preview/prod), `release` (commit hash).
  - Filtrar errores sensibles (no loggear payloads con datos personales).

### Web base

- [ ] **S1.0-9** Configurar GTM stub en layout `[1 pt]`
  - Container GTM vacío (sin configurar GA4/Meta todavía, eso es Fase 2).
  - Componente `<GoogleTagManager />` que solo carga si `NEXT_PUBLIC_GTM_ID` está definido.

- [ ] **S1.0-10** Crear CLAUDE.md en raíz del repo `[1 pt]`
  - Copiar el `CLAUDE.md` del kit.
  - Ajustar enlaces si es necesario.

- [ ] **S1.0-11** Configurar Vercel con preview deploys `[2 pts]`
  - Conectar repo GitHub con Vercel.
  - Framework preset: Next.js.
  - Build command: `pnpm build --filter=web`.
  - Output directory: `apps/web/.next`.
  - Preview deploys automáticos en todas las PRs.
  - Dominio temporal: `mobbitrips.vercel.app` (el dominio final se configura en Sprint 1.5).

- [ ] **S1.0-12** Crear .env.example con todas las variables `[1 pt]`
  - Incluir todas las env vars de `docs/MASTER.md` sección 17.
  - Con comentarios cortos de qué es cada una.
  - Valores vacíos, solo documentación de estructura.

- [ ] **S1.0-13** Configurar Lenis smooth scroll `[1 pt]`
  - Wrapper `<SmoothScroll>` en `app/layout.tsx`.
  - Solo en client component.
  - Respetar `prefers-reduced-motion`.

- [ ] **S1.0-14** Crear páginas esqueleto de todas las rutas `[2 pts]`
  - Archivos `page.tsx` vacíos para: `/`, `/propiedades`, `/propiedades/[slug]`, `/nosotros`, `/servicios`, `/contacto`, `/faq`, `/blog`, `/experiencias`, páginas legales.
  - También: `/reserva/[id]/pagar`, `/reserva/[id]/exito`, `/reserva/[id]/pendiente`.
  - Cada una con `<h1>` indicando qué ruta es (para testing).
  - `/not-found.tsx` y `/error.tsx` básicos.

- [ ] **S1.0-15** Documentar convenciones en README principal `[1 pt]`
  - Crear `README.md` en raíz con:
    - Qué es Mobbitrips (1 párrafo).
    - Stack técnico.
    - Cómo correr localmente.
    - Cómo contribuir.
    - Enlaces a `CLAUDE.md`, `docs/MASTER.md`, `docs/COMO_TRABAJAR.md`.

---

## 🎯 Criterios de cierre del sprint

El sprint se cierra cuando:

- [x] `pnpm dev` arranca sin errores desde raíz.
- [x] `pnpm build` completa exitosamente.
- [x] `pnpm lint` y `pnpm type-check` pasan limpios.
- [x] Todas las rutas esqueleto responden 200 en local.
- [x] Preview deploy en Vercel verde.
- [x] Sentry captura un error de prueba correctamente.
- [x] Supabase conectado y tablas iniciales creadas.
- [x] `CLAUDE.md`, `docs/MASTER.md` y demás docs en su lugar.
- [x] Git history limpio (sin commits monstruosos, mensajes claros).

---

## 🚨 Bloqueos

*(ninguno aún)*

---

## 📝 Notas del sprint

<!-- Espacio para observaciones que surjan durante el sprint -->

- [ ] Decidir región de Supabase antes de crear el proyecto (us-east-1 recomendado por latencia con México).
- [ ] Confirmar si Vercel team plan es necesario o Hobby alcanza para MVP.
- [ ] Tener a mano las credenciales vacías de Hostex, Stripe, PayU, Zoho para poblar `.env.example` correctamente.

---

## 🔗 Próximo sprint

**Sprint 1.1 — Design System + Home** (2 semanas calibradas para 15h/semana)

Objetivo: Home pública impecable con componentes reutilizables listos para ser usados en toda la web.

Tasks principales: 15 tasks cubriendo componentes UI base, Navbar, Footer, WhatsAppFloatingButton, y las 9 secciones del Home.

Se cargarán al archivo `SPRINT_ACTUAL.md` al cerrar el actual.

---

**Sprint anterior**: (ninguno, este es el primero)
**Ver todos los sprints completados**: `docs/sprints/completados/`
