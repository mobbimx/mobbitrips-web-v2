# 🏠 Mobbitrips — Contexto para Claude Code

> Este archivo es tu GPS. Léelo al inicio de cada sesión. La visión completa vive en `docs/MASTER.md`.

---

## 🔒 REGLAS INMUTABLES (leer ANTES de cualquier otra cosa)

**Ver `docs/REGLAS_INMUTABLES.md` para el detalle completo.** Resumen crítico:

1. **Visualizador canónico ÚNICO** en cualquier máquina (escritorio, casa, Medusssa):

   ```bash
   pnpm dev --filter=web          # luego abrir http://localhost:3000
   ```

   **NUNCA** abrir `design/exports/*.html` con `file:///` como visualizador.
   **NUNCA** usar Live Server, http-server, serve, o cualquier otro preview.

2. **Preflight obligatorio** al iniciar sesión (cualquier máquina):

   ```bash
   git fetch --all && git status && git pull --rebase origin main && git log --oneline -5
   ```

3. **Push obligatorio** al cerrar sesión (aunque sea WIP):

   ```bash
   git add -A && git commit -m "..." && git push -u origin <rama>
   ```

4. **Nunca editar `main` directo.** Siempre rama: `design/*`, `content/*`, `fix/*`.

5. **División de herramientas:** Claude Design genera secciones → Claude Code pule detalles. No al revés.

6. **Exports versionados:** `design/exports/<seccion>-v<n>.html`, nunca sobreescribir.

Si cualquiera de estas reglas no se puede cumplir en una sesión → **parar y avisar a Emilio antes de editar**.

---

## 🎯 Qué estamos construyendo

**Mobbitrips** es una plataforma operativa completa para una empresa administradora de propiedades vacacionales en **Xalapa, Veracruz, México**.

No es solo un sitio web. Es un ecosistema de 5 capas:

1. **Captación**: Web Next.js + WhatsApp Biz + Blog + Ads
2. **Operación**: Hostex (PMS) + Supabase + Stripe + PayU
3. **Negocio**: Zoho One (CRM + Books + Desk + Analytics + Sign)
4. **Orquestación**: n8n workflows
5. **Inteligencia**: Brindon 2.0 (Claude) + Agentes Claude Code autohospedados

**Tagline**: _"Descansa, vive y sueña como si estuvieras en casa."_

Para el detalle completo de arquitectura, decisiones, flujos y plan de fases, consulta **`docs/MASTER.md`**.

---

## 📌 Protocolo de sesión

### Al iniciar cualquier sesión

1. **Ejecutar preflight** (ver REGLA 2 arriba): `git fetch && git status && git pull --rebase && git log --oneline -5`.
2. Lee este archivo (`CLAUDE.md`).
3. Lee `docs/REGLAS_INMUTABLES.md` — reglas no negociables.
4. Lee `docs/BITACORA.md` — ahí está el log de la última sesión y dónde quedamos.
5. Lee `docs/SPRINT_ACTUAL.md` — ahí está qué toca hoy.
6. Saluda con un resumen en 3 líneas: último avance, próximo paso sugerido, bloqueos si hay.

### Durante la sesión

1. Trabaja **una task a la vez**.
2. Antes de escribir código, propón: (a) plan en bullets, (b) archivos a modificar, (c) eventos que toca. Espera OK.
3. Al terminar una task: corre `pnpm lint` y `pnpm type-check`. Valida criterios de aceptación.
4. Haz commits atómicos con formato: `feat(scope): descripción` · `fix(scope): ...` · `chore: ...`.

### Al cerrar la sesión

Actualiza `docs/BITACORA.md` con una entrada nueva al inicio del archivo que contenga:

- Fecha y hora.
- Tasks cerradas.
- Commits hechos (hashes cortos).
- URL de preview de Vercel si aplica.
- Decisiones tomadas.
- Bloqueos activos.
- Próximo paso sugerido.

---

## 🧱 Stack técnico

| Capa          | Tecnología                                       |
| ------------- | ------------------------------------------------ |
| Framework     | Next.js 14 (App Router, Server Components)       |
| Lenguaje      | TypeScript estricto                              |
| Estilos       | Tailwind CSS (sin CSS-in-JS)                     |
| Animación     | Framer Motion (solo en client components)        |
| Smooth scroll | Lenis                                            |
| Íconos        | Lucide React                                     |
| HTTP          | Axios (clientes tipados en `packages/*-client/`) |
| Forms         | React Hook Form + Zod                            |
| Fechas        | date-fns + react-day-picker                      |
| Fuentes       | next/font (Comfortaa + Inter)                    |
| Pagos         | Stripe Elements + PayU Hosted Page               |
| DB            | Supabase (Postgres + Auth + Storage + pgvector)  |
| Email         | Resend                                           |
| Deploy        | Vercel                                           |
| Monitoreo     | Sentry                                           |
| Monorepo      | Turborepo + pnpm workspaces                      |

---

## 🎨 Identidad de marca (resumen)

- **Coral primario**: `#ED6864` (Pantone 7416) → CTAs, acentos.
- **Gris cálido**: `#706F6F` (Pantone 404) → texto secundario.
- **Charcoal**: `#3D3D3D` → texto principal.
- **Cream**: `#FAF8F5` → fondo global cálido.
- **Headings**: Comfortaa. **Body**: Inter.
- **Tono**: cálido, cercano, humano. Nunca corporativo. Tuteo mexicano.
- **Anti-patrones**: ❌ oscuro lujo misterioso · ❌ minimalismo frío startup · ❌ rosa fucsia · ❌ Playfair serif · ❌ exclusividad elitista.

Detalle completo de diseño en `apps/web/CLAUDE.md`.

---

## 🔐 Reglas de oro (no negociables)

1. **Secretos solo en `process.env.*`**. Nunca hardcodear tokens, keys, secrets.
2. **Moneda única: MXN**. Todo se cobra en pesos mexicanos. FX solo informativo.
3. **Nunca tocar datos de tarjeta**. Siempre Stripe Elements o PayU Hosted Page (PCI SAQ-A).
4. **Idempotencia**: todo webhook y workflow debe poder reprocesarse sin duplicar datos.
5. **Single source of truth por dominio**: Hostex=propiedades · Zoho CRM=leads · Zoho Books=finanzas · Supabase=operacional.
6. **Server Components por defecto**, `'use client'` solo cuando haya interactividad real.
7. **Validación doble capa**: Zod en cliente Y en servidor, mismo schema.
8. **Rate limiting + Turnstile** en todo endpoint público.
9. **Nunca inventar endpoints** de Hostex, Zoho, Stripe, PayU, etc. Si no está documentado, pregúntame.
10. **RLS activo** en todas las tablas Supabase.
11. **Server-only APIs**: llamadas a Hostex, Zoho, Stripe, PayU solo desde API Routes, nunca del cliente.
12. **Registrar eventos** críticos en tabla `events` de Supabase para audit trail.
13. **Proponer antes de ejecutar** cambios que afecten >3 archivos o cross-package.
14. **No romper contratos**: si cambias endpoint consumido por n8n, versionar o coordinar.
15. **Accesibilidad obligatoria**: WCAG AA mínimo, keyboard nav, focus ring coral, aria-labels.

---

## 📂 Estructura del monorepo

```
mobbitrips/
├── CLAUDE.md                    ← este archivo
├── README.md                    ← para humanos que clonan el repo
├── docs/
│   ├── MASTER.md                ← visión completa y arquitectura detallada
│   ├── BITACORA.md              ← log cronológico de sesiones ⭐
│   ├── SPRINT_ACTUAL.md         ← qué toca hoy
│   ├── COMO_TRABAJAR.md         ← guía de rituales con Claude Code
│   ├── decisiones/              ← ADRs (Architecture Decision Records)
│   ├── runbooks/                ← procedimientos operativos
│   └── sprints/completados/     ← archivo de sprints cerrados
├── apps/
│   ├── web/                     ← Next.js mobbitrips.com
│   │   └── CLAUDE.md            ← detalles específicos de la web
│   ├── admin/                   ← Fase 3
│   └── brindon/                 ← Fase 3
│       └── CLAUDE.md
├── packages/
│   ├── ui/
│   ├── hostex-client/
│   ├── zoho-client/
│   ├── stripe-client/
│   ├── payu-client/
│   ├── whatsapp-client/
│   ├── supabase-client/
│   ├── currency/
│   ├── types/
│   └── utils/
├── n8n/workflows/               ← exports JSON de workflows n8n
├── mcp-servers/                 ← Fase 4
└── supabase/migrations/
```

---

## 🔄 Eventos del sistema (resumen)

Eventos publicados en tabla `events` de Supabase + consumidos por n8n:

| Evento                     | Origen         | Consumidores principales            |
| -------------------------- | -------------- | ----------------------------------- |
| `lead.created`             | Web            | Zoho CRM, Brindon, GA4, Meta CAPI   |
| `reservation.requested`    | Web            | Hostex, Zoho CRM                    |
| `reservation.confirmed`    | Hostex         | Zoho Books, WhatsApp                |
| `payment.stripe.succeeded` | Stripe webhook | Hostex, Zoho Books (CFDI), WhatsApp |
| `payment.payu.succeeded`   | PayU webhook   | Hostex, Zoho Books, WhatsApp        |
| `payment.oxxo.pending`     | PayU webhook   | WhatsApp (voucher)                  |
| `payment.oxxo.expired`     | Cron           | Cancelar reserva, liberar fechas    |
| `guest.checked_out`        | Hostex         | WhatsApp (review), Campaigns        |
| `owner_lead.created`       | Web B2B        | Zoho CRM, WhatsApp, Slack           |
| `property.created`         | Hostex         | Supabase cache, revalidate ISR      |

Detalle completo en `docs/MASTER.md` sección 3.

---

## 🧰 Comandos frecuentes

```bash
# Desarrollo
pnpm dev                           # todos los apps
pnpm dev --filter=web              # solo web
pnpm dev --filter=brindon          # solo brindon

# Validaciones (correr ANTES de cerrar una task)
pnpm lint
pnpm type-check
pnpm test

# Build
pnpm build

# Base de datos
pnpm supabase migration new [nombre]
pnpm supabase db push

# Stripe local webhooks (Sprint 2.3+)
stripe listen --forward-to localhost:3000/api/payments/stripe/webhook

# n8n (Sprint 2.1+)
cd n8n && ./export-workflows.sh
```

---

## 🗺️ Plan de fases

| Fase                                | Semanas  | Foco                                            |
| ----------------------------------- | -------- | ----------------------------------------------- |
| **Fase 1 — MVP Web**                | 1-6      | Web pública con reservas directas + WA básico   |
| **Fase 2 — Automatización + Pagos** | 7-11     | n8n + Zoho CRM + WA Cloud API + Stripe + PayU   |
| **Fase 3 — Contabilidad y Brindon** | 12-16    | Zoho Books + PAC + CFDI + Brindon 2.0           |
| **Fase 4 — Agentes y portal**       | 17-20    | Agentes Claude + MCP Zoho + Portal propietarios |
| **Fase 5**                          | Continua | Optimización, SEO, iteración                    |

Timeline está calibrado para ~15h/semana de trabajo. Cada sprint de 1 semana de Fase 1 equivale a ~2 semanas reales.

Detalle completo en `docs/MASTER.md` sección 18.

---

## 📞 Contactos clave del proyecto

- **WhatsApp Business**: +52 228 252 5244
- **Dominio**: mobbitrips.com
- **Hostex workspace**: [a definir]
- **Zoho organization**: [a definir]
- **Vercel team**: [a definir]
- **Supabase project**: [a definir]

---

## ⚠️ Qué NO hacer

- ❌ No hagas cambios grandes sin proponer primero.
- ❌ No inventes endpoints o APIs que no conozcas.
- ❌ No hagas commits monstruosos (1 task = 1-3 commits atómicos).
- ❌ No mezcles Server y Client components en el mismo archivo.
- ❌ No hagas llamadas a APIs externas desde el cliente.
- ❌ No uses colores fuera de la paleta de marca.
- ❌ No uses tipografías fuera de Comfortaa/Inter.
- ❌ No dejes `console.log` en commits que vayan a main.
- ❌ No toques workflows n8n de producción desde dev.
- ❌ No generes CFDIs reales en sandbox.

---

**Última actualización**: abril 2026 · **Versión**: 1.0
