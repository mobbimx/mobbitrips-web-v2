# Sprint 1.0 — Setup y fundaciones ✅ CERRADO

- **Fechas**: 2026-04-17 (sesión única de arranque)
- **Fase**: 1 — MVP Web
- **Resultado**: Base del monorepo lista para desarrollar.

## Tasks completadas

- [x] **S1.0-1** Monorepo Turborepo + pnpm workspaces
- [x] **S1.0-2** Next.js 14 con TypeScript estricto
- [x] **S1.0-3** Tailwind CSS con paleta Mobbitrips
- [x] **S1.0-4** next/font con Comfortaa e Inter
- [x] **S1.0-5** ESLint + Prettier + Husky + commitlint
- [x] **S1.0-9** GTM stub en layout
- [x] **S1.0-12** .env.example con todas las variables
- [x] **S1.0-13** Lenis smooth scroll
- [x] **S1.0-14** Páginas esqueleto de todas las rutas

## Tasks diferidas (sin credenciales externas)

- [ ] **S1.0-6** Supabase — pendiente crear proyecto en supabase.com
- [ ] **S1.0-7** RLS policies — depende de S1.0-6
- [ ] **S1.0-8** Sentry — pendiente cuenta
- [ ] **S1.0-11** Vercel preview deploys — pendiente conectar repo
- [ ] **S1.0-15** README principal — diferido a Sprint 1.1

## Commits

- `7ff2146` chore: initial project structure
- `91f0bb7` chore: add full Sprint 1.0 scaffolding and fix tooling

## Decisiones técnicas

- `next.config.ts` → `next.config.mjs` (Next.js 14.2 no soporta `.ts`)
- lint-staged usa `pnpm exec` para compatibilidad con Windows PATH
- `@typescript-eslint` plugin registrado explícitamente en ESLint configs (pnpm monorepo)
- Comando correcto: `pnpm dev --filter=@mobbitrips/web` (paquete es `@mobbitrips/web`)
