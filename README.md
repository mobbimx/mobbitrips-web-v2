# 🏠 Mobbitrips

Plataforma operativa para empresa administradora de propiedades vacacionales en Xalapa, Veracruz.

> **Descansa, vive y sueña como si estuvieras en casa.**

---

## ¿Qué es esto?

Mobbitrips no es solo una página web. Es un ecosistema de 5 capas:

1. **Captación** — Web Next.js, blog, WhatsApp Business, campañas Meta/Google Ads.
2. **Operación** — Hostex (PMS), Supabase (DB), Stripe + PayU (pagos).
3. **Negocio** — Zoho One (CRM, contabilidad, soporte, analytics, firmas).
4. **Orquestación** — n8n (workflows automatizados).
5. **Inteligencia** — Brindon 2.0 (bot Claude) + agentes Claude Code autohospedados.

El proyecto se construye en **5 fases**, cada una con sprints de ~1 semana (calibrado para 15h/semana de trabajo real).

---

## Documentación

Antes de tocar código, lee esto en orden:

1. **`CLAUDE.md`** — Contexto mínimo. Lo lee Claude Code en cada sesión.
2. **`docs/MASTER.md`** — Visión estratégica completa del ecosistema. ⭐ La biblia del proyecto.
3. **`docs/COMO_TRABAJAR.md`** — Guía de rituales de trabajo con Claude Code.
4. **`docs/BITACORA.md`** — Log cronológico de sesiones. Aquí ves dónde quedaste.
5. **`docs/SPRINT_ACTUAL.md`** — Qué toca hoy.

---

## Stack

- **Next.js 14** (App Router, Server Components).
- **TypeScript** estricto.
- **Tailwind CSS** + **Framer Motion** + **Lenis** + **Lucide React**.
- **Supabase** (Postgres + Auth + Storage + pgvector).
- **Hostex** (PMS) + **Stripe** + **PayU México** (pagos).
- **Zoho One** (ERP completo) con **PAC** para CFDI 4.0.
- **WhatsApp Business Cloud API** (Meta).
- **Resend** (email transaccional).
- **n8n** (automatización).
- **Claude API** (Brindon + agentes).
- **Vercel** (deploy) + **Sentry** (monitoreo).
- **Turborepo** + **pnpm workspaces** (monorepo).

---

## Cómo correr localmente

### Prerrequisitos

- **Node.js** 20+ (recomendado 22 LTS).
- **pnpm** 9+ (`npm install -g pnpm`).
- **Git**.

### Setup inicial

```bash
# Clonar
git clone https://github.com/[tu-org]/mobbitrips.git
cd mobbitrips

# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales (ver docs/MASTER.md sección 17)

# Arrancar dev server
pnpm dev
```

La web estará en `http://localhost:3000`.

### Comandos útiles

```bash
pnpm dev                    # Arranca todos los apps
pnpm dev --filter=web       # Solo la web
pnpm build                  # Build de producción
pnpm lint                   # ESLint
pnpm type-check             # TypeScript check
pnpm test                   # Tests

# Base de datos (Supabase)
pnpm supabase migration new [nombre]
pnpm supabase db push
```

---

## Estructura del monorepo

```
mobbitrips/
├── CLAUDE.md                ← contexto para Claude Code
├── README.md                ← este archivo
├── docs/                    ← documentación del proyecto
├── apps/
│   ├── web/                 ← Next.js (mobbitrips.com)
│   ├── admin/               ← panel administrativo (Fase 3)
│   └── brindon/             ← servicio Brindon (Fase 3)
├── packages/
│   ├── ui/                  ← componentes UI compartidos
│   ├── hostex-client/       ← cliente Hostex tipado
│   ├── zoho-client/
│   ├── stripe-client/
│   ├── payu-client/
│   ├── whatsapp-client/
│   ├── supabase-client/
│   ├── currency/            ← FX rates + conversiones informativas
│   ├── types/               ← tipos compartidos
│   └── utils/
├── n8n/workflows/           ← exports JSON de workflows n8n
├── mcp-servers/             ← MCP servers custom (Fase 4)
└── supabase/migrations/     ← migrations de DB
```

---

## Convenciones

### Commits

Usamos **Conventional Commits**:

```
feat(web): add hero section with search
fix(payments): correct OXXO expiration calculation
chore: update dependencies
docs: update bitacora for session 12
refactor(hostex-client): simplify retry logic
```

### Branches

- `main` — siempre verde, deploy a producción.
- `feat/descripcion-corta` — features nuevas.
- `fix/descripcion-corta` — correcciones.
- `chore/descripcion-corta` — tareas de mantenimiento.

### PRs

Cada PR debe:
- Tener título con Conventional Commit.
- Referenciar task de ClickUp si aplica (`Closes S1.2-3`).
- Pasar preview deploy de Vercel.
- Pasar lint y type-check.
- Tener al menos 1 review (puede ser un agente Claude Code).

---

## Contribuir

Este proyecto se desarrolla principalmente con **Claude Code** como pair programmer. Si eres nuevo:

1. Lee `docs/COMO_TRABAJAR.md` antes de tocar código.
2. Familiarízate con `docs/MASTER.md` para entender arquitectura.
3. Revisa `docs/BITACORA.md` para ver dónde quedamos.
4. Agarra una task de `docs/SPRINT_ACTUAL.md`.

---

## Contacto

- **WhatsApp Business**: +52 228 252 5244
- **Email**: reservas@mobbitrips.com
- **Web**: https://mobbitrips.com

---

## Licencia

Propietaria. Todos los derechos reservados © Mobbitrips.
