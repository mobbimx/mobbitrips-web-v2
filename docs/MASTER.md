# 🏗️ MOBBITRIPS — Prompt Maestro v2.1
## Ecosistema operativo completo — Web + PMS + CRM + Contabilidad + Pagos + IA

> **Este documento es la fuente de verdad del proyecto completo.**
> Guárdalo como `CLAUDE.md` en la raíz del monorepo para que Claude Code lo tenga siempre en contexto.
> Cualquier decisión arquitectónica debe actualizar este archivo.

---

## 🆕 Changelog

### v2.1 (abril 2026) — Pagos + Zoho + MXN
- **Estrategia dual de pagos**: Stripe (primario) + PayU (secundario para OXXO/SPEI).
- **Zoho One confirmado como ERP único**. Brevo descartado por ahora (reevaluar en Fase 5 solo si Campaigns no rinde).
- **Política MXN-only**: se cobra siempre en pesos. UX con conversión informativa a USD/EUR/CAD.
- **MCP oficial de Zoho + Claude**: ya no se construye `mcp-zoho` custom, se usa el oficial de Zoho.
- Nuevos workflows n8n (WF-04a/b), nuevas plantillas WhatsApp (OXXO pay reference), nuevas variables de entorno.

### v2.0 (abril 2026) — Ecosistema completo
- Visión de 5 capas (captación, operación, negocio, orquestación, inteligencia).
- Zoho One + n8n + Brindon + agentes Claude autohospedados.
- Estructura de monorepo Turborepo.

### v1.0 (abril 2026) — Web como producto
- Next.js 14 + Hostex + WhatsApp + Supabase.

---

## 📑 Tabla de contenidos

1. [Visión de ecosistema](#1-visión-de-ecosistema)
2. [Rol y contexto de desarrollo](#2-rol-y-contexto-de-desarrollo)
3. [Arquitectura global](#3-arquitectura-global)
4. [Módulos del ecosistema](#4-módulos-del-ecosistema)
5. [Web — Mobbitrips.com](#5-web--mobbitripscom)
6. [Identidad de marca y diseño](#6-identidad-de-marca-y-diseño)
7. [Hostex (PMS) — integración](#7-hostex-pms--integración)
8. [Zoho One — suite de negocio](#8-zoho-one--suite-de-negocio)
9. [Pagos — Stripe + PayU](#9-pagos--stripe--payu)
10. [n8n — orquestador central](#10-n8n--orquestador-central)
11. [Brindon 2.0 — agente conversacional](#11-brindon-20--agente-conversacional)
12. [WhatsApp Business Platform](#12-whatsapp-business-platform)
13. [Supabase — DB operacional](#13-supabase--db-operacional)
14. [Agentes Claude autohospedados](#14-agentes-claude-autohospedados)
15. [Flujos de negocio end-to-end](#15-flujos-de-negocio-end-to-end)
16. [Seguridad, compliance, observabilidad](#16-seguridad-compliance-observabilidad)
17. [Variables de entorno y secretos](#17-variables-de-entorno-y-secretos)
18. [Plan de trabajo por fases](#18-plan-de-trabajo-por-fases)
19. [Estructura del monorepo](#19-estructura-del-monorepo)
20. [ClickUp — estructura de PM](#20-clickup--estructura-de-pm)
21. [Criterios de aceptación globales](#21-criterios-de-aceptación-globales)
22. [Guía de uso con Claude Code](#22-guía-de-uso-con-claude-code)
23. [Bitácora de decisiones](#23-bitácora-de-decisiones)

---

## 1. Visión de ecosistema

Mobbitrips **no está construyendo un sitio web**. Está construyendo una **plataforma operativa integral** donde cada parte del negocio (captación, operación, contabilidad, atención al cliente, gestión de propietarios) vive en un solo ecosistema conectado por automatizaciones y potenciado por agentes de IA.

### Las cinco capas del ecosistema

```
┌────────────────────────────────────────────────────────────────┐
│  CAPA 1 — CAPTACIÓN (Frontend público)                         │
│  Web Next.js · Blog · WhatsApp Biz · Meta/Google Ads           │
├────────────────────────────────────────────────────────────────┤
│  CAPA 2 — OPERACIÓN (Backend de producto)                      │
│  Hostex (PMS) · Supabase (DB) · Stripe + PayU (pagos)          │
├────────────────────────────────────────────────────────────────┤
│  CAPA 3 — NEGOCIO (Suite Zoho One)                             │
│  Zoho CRM · Zoho Books · Zoho Desk · Zoho Campaigns · Analytics│
├────────────────────────────────────────────────────────────────┤
│  CAPA 4 — ORQUESTACIÓN                                         │
│  n8n (workflows) · Webhooks · Cron jobs                        │
├────────────────────────────────────────────────────────────────┤
│  CAPA 5 — INTELIGENCIA                                         │
│  Brindon 2.0 (Claude) · Agentes Claude Code autohospedados     │
│  MCP oficial Zoho ↔ Claude                                     │
└────────────────────────────────────────────────────────────────┘
```

### Principios rectores

1. **Single source of truth por dominio**:
   - Propiedades y reservas → Hostex
   - Leads y CRM → Zoho CRM
   - Finanzas y CFDI → Zoho Books
   - Datos operativos/caché → Supabase
   - Conversaciones → WhatsApp Business + Brindon
   - Pagos → Stripe + PayU (reconciliados en Zoho Books)
2. **n8n es la columna vertebral**. Toda comunicación entre sistemas pasa por workflows versionados y monitoreados.
3. **La web es un frontend**, no un silo. Todo lo que captura debe propagarse al ecosistema.
4. **Diseño agent-friendly**. APIs internas documentadas, tareas atómicas, feedback loops. Los agentes Claude deben poder leer, ejecutar y auditarse.
5. **Idempotencia obligatoria**. Cada webhook y cada workflow debe poder reprocesarse sin duplicar datos.
6. **Trazabilidad de punta a punta**. Un lead se puede seguir desde que llega a la web hasta que se registra como ingreso en Zoho Books con CFDI emitido.
7. **MXN como moneda única de cobro**. Cero multi-currency pricing. Cero riesgo cambiario.

---

## 2. Rol y contexto de desarrollo

Actúa como **Senior Platform Engineer & Product Architect** con experiencia combinada en:

- **Hospitality tech** (Airbnb, Booking, Selina, boutique PMS).
- **Automation engineering** (n8n, Make, Zapier a escala empresarial).
- **ERP/CRM implementation** (Zoho, HubSpot, Salesforce).
- **Payment systems** (Stripe, PayU, conciliación contable).
- **AI agent engineering** (Claude, LangGraph, agent-friendly APIs, MCP).
- **Platform architecture** (monorepos, event-driven, microservicios pragmáticos).

Tu misión: construir el ecosistema Mobbitrips como una **plataforma coherente** donde cada pieza sirve al objetivo de negocio: **captar, cerrar y servir huéspedes + captar y retener propietarios**, con operación financiera limpia y capacidad de escalar a agentes autónomos.

---

## 3. Arquitectura global

### Diagrama de flujo de datos principal

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│  Visitante  │──────►│  Web Next   │──────►│  Supabase   │
│   (Huésped) │       │   API Route │       │  (lead raw) │
└─────────────┘       └─────┬───────┘       └─────────────┘
                            │
                            │ webhook
                            ▼
                      ┌─────────────┐
                      │     n8n     │ ← orquestador
                      │  workflow   │
                      └─────┬───────┘
                            │
     ┌──────────────┬───────┼────────┬────────────┬────────────┐
     ▼              ▼       ▼        ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐
│Zoho CRM  │ │ Hostex   │ │Stripe│ │  PayU   │ │WhatsApp  │ │ Brindon  │
│  (lead)  │ │(reserva) │ │ (pg) │ │  (pg)   │ │ Business │ │ (AI bot) │
└────┬─────┘ └────┬─────┘ └───┬──┘ └────┬────┘ └──────────┘ └──────────┘
     │            │           │         │
     │ convierte  │ confirmada│ pago ok │ pago ok
     ▼            ▼           ▼         ▼
┌─────────────────────────────────────────┐
│           Zoho Books                    │
│  (cliente + invoice + CFDI 4.0)         │
└─────────────────────────────────────────┘
```

### Event-driven contract

Todos los eventos críticos se publican en un "bus" lógico (implementado como webhook receiver en n8n con tabla `events` en Supabase para trazabilidad).

**Eventos del sistema:**

| Evento | Origen | Consumidores |
|---|---|---|
| `lead.created` | Web | n8n → Zoho CRM, Brindon (bienvenida), GA4, Meta CAPI |
| `lead.qualified` | Brindon/Equipo | n8n → Zoho CRM (etapa), WhatsApp (plantilla) |
| `reservation.requested` | Web | n8n → Hostex (disponibilidad), Zoho CRM (oportunidad), Resend |
| `reservation.confirmed` | Hostex | n8n → Zoho Books (invoice), WhatsApp (confirmación + link pago), Brindon |
| `reservation.cancelled` | Hostex | n8n → Zoho Books (credit note + CFDI de egreso), WhatsApp |
| `payment.stripe.succeeded` | Stripe webhook | n8n → Hostex (marcar pagado), Zoho Books (emitir CFDI), WhatsApp (recibo) |
| `payment.payu.succeeded` | PayU webhook | n8n → Hostex (marcar pagado), Zoho Books (CFDI), WhatsApp |
| `payment.oxxo.pending` | PayU webhook | n8n → WhatsApp (enviar referencia OXXO con QR y vencimiento) |
| `payment.oxxo.expired` | PayU webhook/cron | n8n → cancelar reserva, liberar fechas en Hostex |
| `guest.checked_in` | Hostex / Manual | n8n → Brindon (concierge), Zoho CRM |
| `guest.checked_out` | Hostex | n8n → WhatsApp (review), Campaign |
| `owner_lead.created` | Web B2B | n8n → Zoho CRM (deal), WhatsApp, email comercial |
| `property.created` | Hostex | n8n → Supabase (cache), web (revalidate) |
| `review.received` | Hostex | n8n → Supabase, Zoho CRM (nota) |

---

## 4. Módulos del ecosistema

| # | Módulo | Stack | Responsabilidad | Fase |
|---|---|---|---|---|
| 1 | **Web pública** | Next.js 14 + TS + Tailwind | Captación, reservas directas, blog, SEO | 1 |
| 2 | **API de reservas** | Next.js API Routes | Orquestador inicial de leads | 1 |
| 3 | **Supabase** | Postgres + Auth + Storage | DB operacional, logs, eventos | 1 |
| 4 | **Hostex** | API v3 | Propiedades, disponibilidad, reservas, reviews | 1 |
| 5 | **WhatsApp Business** | wa.me → Cloud API Meta | Canal conversacional principal | 1-2 |
| 6 | **Stripe** | Stripe Checkout + API | Pasarela primaria (tarjetas, Apple/Google Pay) | 2 |
| 7 | **PayU Mexico** | API REST + SDK | OXXO Pay + SPEI + tarjetas mexicanas | 2 |
| 8 | **n8n** | Selfhosted Docker | Workflows de integración | 2 |
| 9 | **Zoho CRM** | Zoho One | Pipeline de leads B2C y B2B | 2 |
| 10 | **Zoho Books** | Zoho One + PAC | Facturación CFDI 4.0, ingresos, gastos | 2-3 |
| 11 | **Brindon 2.0** | Claude API + n8n | Bot conversacional unificado | 3 |
| 12 | **Zoho Desk** | Zoho One | Soporte post-venta | 3 |
| 13 | **Zoho Campaigns** | Zoho One | Email marketing, newsletters | 3 |
| 14 | **Agentes Claude Code** | Servidor propio + Claude API | Agentes operativos autónomos | 4 |
| 15 | **Analytics stack** | GA4 + Meta Pixel + GTM + Hotjar + Zoho Analytics | Medición y reporting | 2 |
| 16 | **Admin panel** | Next.js (ruta `/admin`) | Dashboard interno | 3 |

---

## 5. Web — Mobbitrips.com

### Objetivos funcionales

1. Canal de **reservas directas** B2C (elimina comisiones OTA).
2. Canal de **captación de propietarios** B2B.
3. Motor de **SEO y contenido** (blog, guías Xalapa).
4. **Lead magnet** generator (PDF, newsletter, suscripciones).
5. Frontend **headless** conectado al ecosistema vía APIs y webhooks.

### Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript estricto |
| Estilos | Tailwind CSS |
| Animación | Framer Motion |
| Smooth scroll | Lenis |
| Íconos | Lucide React |
| HTTP | Axios (cliente tipado interno) |
| Forms | React Hook Form + Zod |
| Fechas | date-fns + react-day-picker |
| Fuentes | next/font (Comfortaa + Inter) |
| Imágenes | next/image (AVIF/WebP) |
| Email | Resend |
| Pagos cliente | Stripe Elements + PayU Hosted Page |
| FX rates | Frankfurter API (free, sin key) |
| Analytics | GTM (GA4, Meta Pixel, Hotjar) |
| Error tracking | Sentry |
| Deploy | Vercel (con preview deploys) |
| CMS blog | MDX local → Sanity (Fase 5) |
| Auth admin | Supabase Auth |

### Mapa de rutas

```
/                           Home
/propiedades                Listado + filtros
/propiedades/[slug]         Detalle + reserva
/reserva/solicitada         Confirmación post-submit
/reserva/[id]/pagar         Pasarela de pago (Stripe o PayU)
/reserva/[id]/exito         Pago exitoso
/reserva/[id]/pendiente     Pago pendiente (OXXO)
/nosotros
/servicios                  Landing B2B propietarios
/para-propietarios          Alias SEO de /servicios
/experiencias               Guía SEO local Xalapa
/experiencias/[slug]
/blog
/blog/[slug]
/contacto
/faq
/politica-privacidad
/terminos
/cookies
/admin                      Panel interno (protegido)
/admin/leads
/admin/reservas
/admin/pagos                Conciliación Stripe + PayU
/admin/whatsapp
/admin/propietarios         Portal propietarios (Fase 4)
```

---

## 6. Identidad de marca y diseño

### Logo y filosofía

El ícono son **dos arcos orgánicos con círculos en la punta**: personas bajo un techo, una familia llegando a casa. El ícono forma una **M** y evoca dos personas caminando juntas hacia un hogar. Es **cálido, humano, familiar**.

### Paleta oficial

| Color | HEX | Pantone | Uso |
|---|---|---|---|
| Coral primario | `#ED6864` | 7416 | CTAs, acentos, íconos |
| Gris cálido | `#706F6F` | 404 | Texto secundario |

### Paleta completa (Tailwind)

```ts
colors: {
  primary: {
    DEFAULT: "#ED6864",
    dark:    "#D4504C",
    light:   "#F4A09E",
    soft:    "#FDF0EF",
  },
  brand: {
    charcoal: "#3D3D3D",
    gray:     "#706F6F",
    light:    "#A8A8A8",
    cream:    "#FAF8F5",
    white:    "#FFFFFF",
    border:   "#EDE9E4",
    shadow:   "rgba(237,104,100,0.08)",
  },
  status: {
    success: "#4CAF82",
    warning: "#F5A623",
    error:   "#E05555",
    info:    "#5B9BD5",
  }
}
```

### Tipografía

- **Headings**: Comfortaa (300, 400, 600, 700).
- **Body**: Inter (300, 400, 500, 600).
- Escala: 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 px.
- Line-height: 1.6 body, 1.3 headings.

### Tagline

> **"Descansa, vive y sueña como si estuvieras en casa."**

### Tono de marca

Cálido, cercano, confiable, profesional sin ser distante. Como un amigo que te renta su propiedad con cariño. Español neutro mexicano. Usar "tú".

### Anti-patrones

- ❌ Oscuro estilo hotel de lujo misterioso.
- ❌ Frío/minimalista tipo tech startup.
- ❌ Rosa fucsia (`#E91E8C`).
- ❌ Serif tipo revista de lujo (Playfair Display).
- ❌ Copy corporativo genérico.
- ❌ Exclusividad elitista.

### Animaciones

Suaves, orgánicas, nunca bruscas. FadeInUp con stagger, hover con `translateY(-4px)`, scroll-triggered con `once: true`. Respetar `prefers-reduced-motion`.

### Accesibilidad

WCAG AA mínimo. Focus ring coral. Touch targets ≥ 44×44px. aria-labels correctos. No depender solo del color.

---

## 7. Hostex (PMS) — integración

### Rol en el ecosistema

**Hostex es el sistema de verdad** para:
- Catálogo de propiedades.
- Calendarios de disponibilidad.
- Reservas formales.
- Reseñas sincronizadas.
- Pricing dinámico.

La web y Supabase mantienen **cachés**, nunca la fuente primaria.

### Autenticación

- Header: `Access-Token: ${HOSTEX_API_TOKEN}`
- Base URL: `https://api.hostex.io/v3`
- **Todas las llamadas desde backend**, nunca del cliente.

### Endpoints consumidos

| Método | Endpoint | Uso | Cache (ISR) |
|---|---|---|---|
| GET | `/properties` | Listado de propiedades | 3600s |
| GET | `/properties/{id}` | Detalle | 1800s |
| GET | `/calendar` | Disponibilidad | 300s |
| GET | `/listings/{id}/pricing` | Precio dinámico | 600s |
| GET | `/reviews` | Reseñas | 86400s |
| POST | `/reservations` | Crear reserva | no-cache |
| GET | `/reservations/{id}` | Detalle reserva | no-cache |
| PATCH | `/reservations/{id}` | Marcar pagada/cancelada | no-cache |

### Cliente `packages/hostex-client/`

```
packages/hostex-client/src/
├── client.ts           # Axios con interceptors, retries exponenciales
├── properties.ts       # getProperties, getPropertyById, getPropertyBySlug
├── availability.ts     # checkAvailability
├── pricing.ts          # calculateTotalPrice
├── reservations.ts     # createReservation, getReservation, markPaid
├── reviews.ts          # getReviews
├── webhooks.ts         # handlers para webhooks de Hostex
├── types.ts            # Interfaces tipadas
├── mappers.ts          # Hostex → modelo interno
├── mocks.ts            # Dev/fallback
└── __tests__/
```

### Manejo de errores y resiliencia

- **Retries**: 3 intentos, backoff exponencial para 5xx.
- **Timeout**: 10s por call.
- **Fallback**: datos mock en dev, skeleton elegante en prod + log a Sentry.
- **Circuit breaker** (Fase 3): si Hostex cae >2min, servir solo desde caché.

### Webhooks de Hostex → Mobbitrips

Endpoint: `https://n8n.mobbitrips.com/webhook/hostex` (firmado con secret).

Eventos a procesar:
- Reserva creada/modificada/cancelada.
- Reseña recibida.
- Calendario modificado.

---

## 8. Zoho One — suite de negocio

**Zoho One es el ERP de Mobbitrips**. Aloja la operación comercial, financiera, de marketing y soporte.

### ¿Por qué Zoho One y no Brevo?

Decisión tomada en v2.1 tras evaluación:

- **CFDI 4.0 nativo mexicano**: Zoho Books conectado a PAC emite facturación fiscal mexicana. Brevo no tiene contabilidad.
- **Ecosistema unificado**: CRM + Books + Desk + Sign + Analytics + Campaigns + WorkDrive hablan el mismo idioma.
- **MCP oficial con Claude**: Zoho tiene MCP server oficial para que agentes Claude operen sobre toda la suite.
- **Zia embebida**: IA transversal en cada app (predictive scoring, sentiment, NLP, anomaly detection).
- **Precio equivalente**: $37-45 USD/usuario/mes vs armar un Frankenstein de 5-6 herramientas.

**Brevo queda en la reserva** para Fase 5 como posible reemplazo de Zoho Campaigns solo si las métricas de deliverability no alcanzan objetivo (≥98% inbox, <0.3% bounce).

### Módulos utilizados

| Módulo | Uso |
|---|---|
| **Zoho CRM** | Pipeline de leads (B2C y B2B), cuentas, contactos, deals, notas |
| **Zoho Books** | Facturación CFDI 4.0, ingresos, gastos, conciliación Stripe+PayU, reportes fiscales |
| **Zoho Desk** | Tickets de soporte de huéspedes y propietarios |
| **Zoho Campaigns** | Email marketing, newsletters, automatizaciones |
| **Zoho Analytics** | BI, dashboards consolidados (Hostex + Books + CRM + Pagos) |
| **Zoho Sign** | Contratos digitales con propietarios |
| **Zoho WorkDrive** | Documentos compartidos con propietarios |

### Estructura en Zoho CRM

**Módulos personalizados:**
- `Leads` — todos los contactos nuevos (B2C + B2B).
- `Accounts` — cuentas de propietarios.
- `Contacts` — personas físicas.
- `Deals` — oportunidades (reservas B2C como deals pequeños, contratos B2B como grandes).
- `Properties` (custom module) — espejo de Hostex con datos comerciales.
- `Reservations` (custom module) — espejo de Hostex para reporting.

**Pipelines:**

**Pipeline B2C (Reserva directa):**
```
Nuevo → Contactado → En conversación → Pago pendiente → Pago confirmado → Completada / Perdida
```

**Pipeline B2B (Propietario):**
```
Nuevo → Calificado → Llamada agendada → Propuesta → Contrato enviado → Firmado / Perdido
```

### Estructura en Zoho Books

**Clientes** sincronizados desde Zoho CRM (huéspedes) y desde contratos B2B (propietarios).

**Flujo de facturación B2C (en MXN):**
1. Reserva confirmada en Hostex → n8n crea **Sales Order** en Books (moneda MXN).
2. Al recibir pago (Stripe o PayU) → se emite **Invoice + CFDI 4.0 timbrado por PAC**.
3. Si hay cancelación con reembolso → **Credit Note + CFDI de egreso**.
4. Items: "Renta vacacional — [propiedad] — [fechas]".
5. Impuestos: IVA 16% + ISH (Impuesto al Hospedaje) según municipio/estado.
6. Numeración: serie Mobbitrips + consecutivo anual.

**Flujo de facturación B2B (propietarios, en MXN):**
1. Mensualmente, n8n genera reporte de ingresos brutos por propiedad desde Hostex.
2. Calcula comisión Mobbitrips (% negociado por contrato).
3. Genera **Bill** o **Invoice** según modelo:
   - Modelo A (pago a propietario): **Bill de egreso** por el neto a pagar.
   - Modelo B (cobro de comisión): **Invoice** por la comisión.
4. Envía reporte PDF al propietario.

**Gastos:**
- Servicios (Internet, agua, luz) por propiedad → centro de costos.
- Limpiezas → categoría operativa.
- Mantenimiento → capitalizable o gasto.
- Comisiones plataformas (cuando se usen Airbnb/Booking).
- Comisiones de Stripe (~3.6% + $3) y PayU (~3.49%) → gasto financiero.

### PAC para CFDI

- **PAC seleccionado**: Facturama o SW Sapien (a definir en Sprint 3.1).
- **Criterios**: API robusta, precio por timbre, soporte México, uptime.
- **Costo estimado**: $500-2000 MXN/mes según volumen.

### Integración técnica

Zoho ofrece APIs REST completas. Todas las integraciones pasan por **n8n** (nodes oficiales de Zoho CRM, Zoho Books).

**OAuth tokens**:
- Generar refresh tokens largos.
- Almacenar en n8n credentials (cifrado).
- Rotar cada 90 días.

### MCP oficial Zoho ↔ Claude

Zoho tiene **MCP server oficial** que se conecta directamente con agentes Claude (Fase 4).

**Esto simplifica radicalmente la arquitectura de agentes**: ya NO se construye `mcp-zoho` custom. Se usa el oficial.

**Capacidades via MCP oficial:**
- Leer/escribir CRM (leads, deals, contacts, accounts).
- Leer/escribir Books (invoices, customers, expenses).
- Consultar Analytics (dashboards, reports).
- Crear tickets en Desk.
- Ejecutar queries personalizadas.

**Configuración**:
- Activar MCP server en Zoho One admin panel.
- Generar token MCP con permisos scoped.
- Configurar en Claude Code (`~/.claude/mcp.json`).
- Aplicar permission controls y security audit log.

### Zoho Analytics (BI)

**Dashboards a construir:**
1. **Dashboard Ejecutivo**: ocupación, ingreso mensual, nuevos leads, conversión.
2. **Dashboard B2C**: funnel web → reserva, fuentes de tráfico, propiedades top.
3. **Dashboard B2B**: propietarios activos, nuevos deals, retención.
4. **Dashboard Operativo**: check-ins próximos, mantenimiento pendiente.
5. **Dashboard Pagos**: reconciliación Stripe + PayU, fees pagados, pagos pendientes OXXO.
6. **Dashboard Propietario** (por propietario): ingresos, ocupación, reseñas.

Fuentes: Zoho CRM + Zoho Books + Supabase (vía conector) + Hostex (vía n8n export).

---

## 9. Pagos — Stripe + PayU

### Estrategia dual

Mobbitrips usa **dos pasarelas complementarias**, no redundantes:

| Pasarela | Rol | Métodos cubiertos |
|---|---|---|
| **Stripe** | Primaria (default visible) | Visa, Mastercard, Amex, Apple Pay, Google Pay, Link |
| **PayU Mexico** | Secundaria (métodos locales) | OXXO Pay, SPEI (transferencia bancaria), tarjetas mexicanas |

**Razón del combo:**
- **Stripe**: DX superior, UX premium, mejor para huéspedes internacionales y tarjetas extranjeras.
- **PayU**: cobertura local mexicana (OXXO es clave — muchos huéspedes mexicanos pagan en efectivo).

### Política de moneda — MXN-only

**Decisión firme: todo se cobra en pesos mexicanos. Sin excepciones.**

**Razones:**
1. Cero riesgo cambiario para Mobbitrips.
2. Contabilidad y CFDI limpios en MXN.
3. Liquidación rápida a cuentas bancarias mexicanas.
4. SAT compliance simplificado.

**Para huéspedes extranjeros:**
- El precio se muestra en MXN en todo el sitio.
- En el checkout se muestra **conversión informativa** a USD, EUR, CAD (solo visual).
- Disclaimer: "La conversión final la determina tu banco. Cobro realizado en MXN."
- El cargo real en Stripe/PayU es 100% MXN.
- El banco del huésped aplica su propio FX rate + foreign transaction fee (esto lo absorbe el huésped, no Mobbitrips).

**Implementación del hint de conversión:**
- `packages/currency/src/converter.ts` — cliente de Frankfurter API (gratis, sin key).
- Caché 1h en Supabase tabla `fx_rates_cache`.
- Fallback a rate hardcoded si API cae.
- Componente `<CurrencyHint value={10500} base="MXN" targets={['USD','EUR','CAD']} />`.

### UX del checkout

```
┌─────────────────────────────────────────────┐
│  Tu reserva — Casa del Quetzal               │
│  3 noches · 2 huéspedes · Dic 15-18          │
│                                              │
│  Total: $10,500 MXN                          │
│  ≈ $595 USD · ≈ $545 EUR                     │
│  (La conversión final la determina tu banco) │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  Elige cómo pagar:                           │
│                                              │
│  ◉ Tarjeta (Visa, MC, Amex, Apple/Google Pay)│
│      → Procesado por Stripe                  │
│                                              │
│  ○ OXXO Pay (efectivo en tienda)             │
│      → Procesado por PayU                    │
│                                              │
│  ○ Transferencia SPEI                        │
│      → Procesado por PayU                    │
│                                              │
│         [ Proceder al pago → ]               │
└─────────────────────────────────────────────┘
```

### Integración Stripe

**Stack:**
- Stripe Node.js SDK (`stripe`).
- Stripe Elements en frontend (PCI DSS compliant out-of-the-box).
- Webhooks hacia n8n.

**Configuración:**
- Cuenta Stripe México.
- Currency: `mxn` hardcoded en PaymentIntents.
- Métodos habilitados: card, apple_pay, google_pay, link.
- 3DS obligatorio (CNBV regulatorio para México).

**Cliente `packages/stripe-client/`:**
```
packages/stripe-client/src/
├── client.ts               # Stripe SDK instance
├── payment-intents.ts      # create, retrieve, capture
├── webhooks.ts             # verify signature, parse events
├── types.ts
└── __tests__/
```

**Flujo de pago Stripe:**
1. `/reserva/[id]/pagar` crea PaymentIntent en backend con `amount` en centavos MXN.
2. Frontend monta Stripe Elements.
3. Usuario paga → 3DS → confirmación.
4. Webhook `payment_intent.succeeded` → n8n WF-04a.
5. n8n marca reserva en Hostex, crea CFDI en Zoho Books, manda WhatsApp con recibo.

**Fees Stripe Mexico:**
- Tarjeta nacional: 3.6% + $3 MXN.
- Tarjeta internacional: 4.4% + $3 MXN.
- Apple/Google Pay: mismo que tarjeta.

### Integración PayU Mexico

**Stack:**
- PayU API REST (no hay SDK oficial actualizado de Node).
- Cliente custom en `packages/payu-client/`.
- Hosted payment page (menos carga PCI que embedded).

**Credenciales necesarias:**
- `apiKey`, `apiLogin`, `merchantId`, `accountId` (específico MXN).
- Sandbox y producción separados.
- Signature MD5 por transacción.

**Métodos soportados en Mobbitrips:**
- **OXXO Pay**: genera referencia con QR, vigencia 48h.
- **SPEI**: genera CLABE virtual para transferencia.
- **Tarjetas**: fallback si Stripe rechaza.

**Cliente `packages/payu-client/`:**
```
packages/payu-client/src/
├── client.ts               # Axios instance con auth
├── payments.ts             # createOxxoPayment, createSpeiPayment, createCardPayment
├── signature.ts            # MD5 signature generation
├── webhooks.ts             # verify signature, parse confirmations
├── types.ts
└── __tests__/
```

**Flujo OXXO Pay:**
1. Usuario selecciona "OXXO Pay" en `/reserva/[id]/pagar`.
2. Backend llama PayU `PAYMENT_CREATION` con método `OXXO_PAY`.
3. PayU responde con:
   - URL del voucher PDF (referencia + código de barras).
   - Referencia alfanumérica.
   - Fecha de vencimiento (48h).
4. Redirección a `/reserva/[id]/pendiente` con:
   - Voucher embebido (iframe o PDF viewer).
   - Botón "Descargar voucher".
   - Botón "Enviar por WhatsApp" (dispara plantilla `oxxo_payment_reference`).
   - Countdown de vencimiento.
5. Reserva en Hostex queda en estado "Pending payment".
6. Cuando huésped paga en OXXO: PayU webhook → n8n WF-04b → marca pagada.
7. Si expira: cron job n8n cancela reserva, libera fechas.

**Flujo SPEI:**
1. Usuario selecciona "SPEI".
2. Backend llama PayU con método `BANK_REFERENCED_PAYMENT`.
3. PayU genera CLABE virtual única por transacción.
4. Usuario hace transferencia desde su banca en línea.
5. Confirmación 30min-4h (depende del banco emisor).
6. Webhook → procesamiento igual que OXXO.

**Fees PayU Mexico:**
- Contactar comercial (son dependientes de volumen).
- Benchmark: ~3.49% + $0.30 USD promedio.

### Reconciliación en Zoho Books

n8n corre diariamente WF-finanzas-conciliacion:
1. Pull de Stripe Balance + payments del día.
2. Pull de PayU transactions del día.
3. Match contra Invoices en Zoho Books por `reservation_id`.
4. Discrepancias → reporte en Slack + email.

### Seguridad de pagos

- Nunca tocar datos de tarjeta en Mobbitrips (PCI SAQ-A).
- Stripe Elements + PayU Hosted Page absorben PCI scope.
- Webhooks firmados siempre verificados (Stripe signature + PayU MD5).
- Supabase RLS en tabla `payments` (solo service role escribe).
- Audit log en tabla `payment_events`.

### Admin panel `/admin/pagos`

- Vista unificada de Stripe + PayU.
- Filtros: fecha, estado, pasarela, método.
- Acciones: ver detalle, descargar comprobante, reenviar WhatsApp.
- KPIs: tasa de conversión por pasarela, % OXXO vencidos, fees totales del mes.

### Testing

- Stripe: usar tarjetas de prueba oficiales.
- PayU: sandbox separado con referencias simuladas.
- n8n: workflows con bandera `ENV=test` que simula webhooks.

---

## 10. n8n — orquestador central

### Rol

**n8n es la columna vertebral del ecosistema**. Toda comunicación entre sistemas, todo workflow automatizado, toda lógica cross-servicio vive aquí.

### Hosting

- **Fase 2**: n8n cloud o selfhosted en un VPS (DigitalOcean/Hetzner).
- **Fase 4**: selfhosted en servidor propio junto a los agentes Claude.
- Dominio: `n8n.mobbitrips.com` con SSL.
- Backup automático de workflows (git push diario).

### Workflows a construir

#### Fase 2 — workflows fundacionales

**WF-01: Lead B2C recibido**
- Trigger: webhook desde `/api/reservations/create`.
- Pasos:
  1. Valida payload (respetando Zod schema).
  2. Crea Lead en Zoho CRM (con UTMs, property, fechas).
  3. Crea Deal asociado (etapa "Nuevo").
  4. Envía WhatsApp plantilla `reservation_received` al huésped.
  5. Envía email interno al equipo comercial.
  6. Publica evento `lead.created` en tabla `events` de Supabase.
- Idempotencia: dedupe por `lead_id`.
- Retry: 3 intentos con backoff.

**WF-02: Lead B2B (propietario) recibido**
- Trigger: webhook desde `/api/leads/owner`.
- Pasos:
  1. Valida.
  2. Crea Lead en Zoho CRM con tipo "Propietario".
  3. Crea Deal en pipeline B2B.
  4. Asigna a comercial según región.
  5. Envía WhatsApp plantilla `owner_lead_received`.
  6. Notifica en Slack interno.

**WF-03: Reserva confirmada en Hostex**
- Trigger: webhook de Hostex.
- Pasos:
  1. Actualiza Deal en Zoho CRM a etapa "Pago pendiente".
  2. Crea Customer en Zoho Books (si no existe).
  3. Crea Sales Order en Books (estado: awaiting payment).
  4. Genera URL de pago en `/reserva/[id]/pagar`.
  5. Envía WhatsApp plantilla `reservation_confirmed` con link de pago.
  6. Agenda en Google Calendar del equipo operativo.

**WF-04a: Pago recibido vía Stripe**
- Trigger: webhook Stripe `payment_intent.succeeded`.
- Pasos:
  1. Verifica firma de Stripe.
  2. Busca reserva asociada por `metadata.reservation_id`.
  3. Emite Invoice + CFDI 4.0 en Zoho Books (timbrado con PAC).
  4. Marca reserva como pagada en Hostex.
  5. Actualiza Deal en Zoho CRM a "Pago confirmado".
  6. Envía WhatsApp recibo + CFDI PDF + instrucciones de llegada.
  7. Crea tarea de preparación en ClickUp.
  8. Registra evento `payment.stripe.succeeded`.

**WF-04b: Pago recibido vía PayU**
- Trigger: webhook PayU confirmation URL.
- Pasos:
  1. Verifica firma MD5 de PayU.
  2. Mismo procesamiento que WF-04a pero con metadata PayU.
  3. Si es OXXO, registra evento `payment.oxxo.paid`.

**WF-04c: OXXO pendiente creado**
- Trigger: webhook PayU `PAYMENT_CREATION` confirmation con estado `PENDING`.
- Pasos:
  1. Guarda referencia OXXO en Supabase `payments`.
  2. Envía WhatsApp plantilla `oxxo_payment_reference` con voucher PDF.
  3. Programa recordatorio a las 24h (cron).

**WF-04d: OXXO expirado**
- Trigger: cron cada hora.
- Pasos:
  1. Busca pagos OXXO con `expires_at < now()` y status `pending`.
  2. Cancela reserva en Hostex (libera fechas).
  3. Actualiza Deal en CRM a "Perdido" con razón "Pago OXXO no completado".
  4. Envía WhatsApp plantilla `oxxo_expired` con opción de reintento.

**WF-05: Check-out completado**
- Trigger: fecha check-out + 1h (cron).
- Pasos:
  1. Marca reserva como completada en Hostex.
  2. Envía WhatsApp plantilla `review_request` (24h después).
  3. Dispara campaña email post-estancia en Zoho Campaigns.
  4. Crea tarea de limpieza en ClickUp.

**WF-06: Reporte mensual para propietario**
- Trigger: día 1 de cada mes 9am (cron).
- Pasos:
  1. Para cada propietario activo en Zoho CRM:
    a. Obtener reservas del mes anterior en Hostex.
    b. Calcular ingresos brutos y comisión.
    c. Generar PDF con reporte.
    d. Enviar por email y WhatsApp.
    e. Crear Invoice o Bill en Books (según modelo).

**WF-07: Sync propiedades Hostex → Supabase**
- Trigger: cada 6h (cron).
- Pasos:
  1. Fetch `/properties` de Hostex.
  2. Upsert en tabla `properties_cache` de Supabase.
  3. Dispara revalidación ISR en la web.

**WF-08: WhatsApp entrante → Brindon → ¿humano?**
- Trigger: webhook WhatsApp Business Cloud API.
- Pasos:
  1. Identifica si es lead conocido (busca en Zoho CRM por teléfono).
  2. Si no existe, crea Lead en CRM (origen "WhatsApp").
  3. Envía mensaje a Brindon 2.0 (API Claude).
  4. Si Brindon resuelve, responde y registra.
  5. Si detecta intención compleja o palabras clave, escala a humano.
  6. Log completo en Supabase `whatsapp_messages`.

**WF-09: Newsletter signup**
- Trigger: webhook desde `/api/newsletter`.
- Pasos:
  1. Añade a lista en Zoho Campaigns.
  2. Envía lead magnet (PDF) via Resend.
  3. Agrega tag "newsletter" en Zoho CRM.

**WF-10: Recordatorio pre check-in**
- Trigger: cron diario + reserva con check-in en 48h.
- Pasos:
  1. Envía WhatsApp plantilla con instrucciones de llegada.
  2. Incluye mapa, código de acceso, contacto emergencia.

**WF-11: Conciliación diaria pagos**
- Trigger: cron diario 7am.
- Pasos:
  1. Pull Stripe Balance + payments del día anterior.
  2. Pull PayU transactions del día anterior.
  3. Match contra Invoices en Zoho Books.
  4. Discrepancias → Slack + email a finanzas.

### Convenciones n8n

- Nomenclatura: `WF-XX_Nombre_Descriptivo`.
- Credenciales centralizadas, nunca hardcoded.
- Error handling: cada workflow crítico con nodo Error Trigger que notifica a Slack.
- Logging: eventos importantes en Supabase `n8n_events`.
- Versionado: export JSON + commit semanal a repo `mobbitrips-n8n`.
- Ambientes: `n8n-dev.mobbitrips.com` y `n8n.mobbitrips.com`.

---

## 11. Brindon 2.0 — agente conversacional

### Visión

**Brindon** es el asistente virtual de Mobbitrips. Vive principalmente en WhatsApp y en un widget web. Habla con **huéspedes, prospectos, propietarios y el equipo interno**. Es el primer punto de contacto 24/7.

### Migración técnica

| Aspecto | Brindon 1.0 (Gemini) | Brindon 2.0 (Claude) |
|---|---|---|
| Modelo | Gemini Pro | Claude Sonnet 4.6 (rutina) + Opus 4.7 (complejo) |
| Orquestador | Script suelto | n8n + API Routes |
| Memoria | Ninguna | Supabase + vector store (pgvector) |
| Herramientas | Ninguna | Tool use con Hostex, Zoho, Calendar |
| Prompt | Monolítico | Prompt system modular + skills |
| Evaluación | Manual | Evals automatizados (Fase 4) |

### Arquitectura

```
Usuario (WhatsApp / Web widget)
        │
        ▼
   n8n WF-08 ──► API Mobbitrips ──► Claude API (con tools)
        │                                │
        │                                ├─► tool: check_availability (Hostex)
        │                                ├─► tool: get_property_info (Supabase cache)
        │                                ├─► tool: create_lead (Zoho CRM)
        │                                ├─► tool: generate_payment_link (Stripe/PayU)
        │                                ├─► tool: schedule_call (Zoho Calendar)
        │                                ├─► tool: search_knowledge (pgvector)
        │                                └─► tool: escalate_to_human (Slack)
        │
        ▼
Memoria conversacional (Supabase)
```

### Capacidades de Brindon 2.0

**Para huéspedes:**
- Responde preguntas sobre propiedades (specs, amenidades, ubicación).
- Verifica disponibilidad en tiempo real.
- Sugiere propiedades según necesidades.
- Guía el flujo de reserva hasta derivar a humano.
- Envía link de pago (Stripe/PayU) si la conversación avanza.
- Responde preguntas de check-in, reglas, zona.

**Para propietarios (autenticados):**
- Muestra estado de ocupación.
- Resumen de ingresos del mes.
- Reporta incidencias.
- Agenda llamadas con su ejecutivo.

**Para equipo interno:**
- Resumen de reservas del día.
- Alertas de check-ins próximos.
- Búsqueda en base de conocimiento interna.
- Genera borradores de respuestas a reseñas.

### System prompt modular

Archivo `apps/brindon/prompts/system.md` (editable sin redeploy):

```markdown
# Identidad
Eres Brindon, asistente virtual de Mobbitrips, empresa de hospedaje vacacional en Xalapa, Veracruz.

# Personalidad
- Cálido, cercano, profesional sin ser distante.
- Usas "tú", tono mexicano neutro.
- Reflejas el tagline: "Descansa, vive y sueña como si estuvieras en casa."
- Nunca corporativo. Siempre humano.

# Capacidades
- [listado de tools disponibles]

# Reglas
1. Si no sabes algo, dilo y escala a humano.
2. Nunca inventes precios, fechas o propiedades.
3. Siempre verifica disponibilidad con la tool antes de confirmar.
4. Precios siempre en MXN. Si preguntan en USD, menciona conversión aproximada y que el cobro final es en MXN.
5. Para cerrar reservas, siempre deriva a un humano en horario hábil O envía link de pago seguro.
6. En emergencias (huésped sin acceso, problema urgente en propiedad), escala inmediato.

# Ejemplos
[few-shot examples...]
```

### Observabilidad

- Cada conversación logueada en Supabase.
- Métricas: tiempo de respuesta, % escalaciones, CSAT.
- Dashboards en Zoho Analytics.

---

## 12. WhatsApp Business Platform

### Dos niveles

| Nivel | Tecnología | Fase |
|---|---|---|
| **Básico** | `wa.me` links con mensaje pre-rellenado | 1 (MVP) |
| **Avanzado** | WhatsApp Business Cloud API (Meta) | 2 |

### Número oficial

- **+52 228 252 5244**
- Formato: `https://wa.me/5212282525244`

### Plantillas a aprobar en Meta

| Nombre | Categoría | Uso |
|---|---|---|
| `reservation_received` | UTILITY | "Recibimos tu solicitud, respondemos en 15min" |
| `reservation_confirmed` | UTILITY | Confirmación con link de pago |
| `payment_received` | UTILITY | Recibo + CFDI + instrucciones llegada |
| `oxxo_payment_reference` | UTILITY | Voucher OXXO con referencia + vencimiento |
| `oxxo_expired` | UTILITY | Pago OXXO venció, opción de reintento |
| `spei_pending` | UTILITY | CLABE para transferencia SPEI |
| `check_in_reminder` | UTILITY | 48h antes con detalles |
| `welcome_guest` | UTILITY | Día de llegada |
| `review_request` | MARKETING | Post-estancia |
| `owner_lead_received` | UTILITY | Confirmación propietarios |
| `monthly_report_owner` | UTILITY | Envío de reporte mensual |
| `generic_offer` | MARKETING | Campañas estacionales |

### Ventana de 24 horas

Reglas de WhatsApp:
- Fuera de ventana: solo plantillas aprobadas.
- Dentro de ventana (usuario escribió en últimas 24h): mensajes libres.
- n8n WF-08 lleva el estado de la sesión.

### Botón flotante

- Presente en todas las páginas (esquina inferior derecha, 64×64px).
- Animación de pulso cada 8s.
- Mensaje contextual en `/propiedades/[slug]`.
- Evento GA4 `click_whatsapp`.

---

## 13. Supabase — DB operacional

### Rol

Supabase **no es el CRM** (ese es Zoho). Supabase es la DB operacional del producto digital:
- Cachés de Hostex.
- Eventos del sistema (audit log).
- Leads crudos antes de sincronizar a Zoho.
- Historial de WhatsApp.
- Memoria de Brindon.
- Contenido custom (blog MDX metadata, lead magnets).
- **Estado de pagos** (Stripe + PayU).
- Caché de tipos de cambio (FX).

### Tablas principales

```sql
-- ═══════════════════════════════════════════════
-- LEADS (buffer antes de Zoho CRM)
-- ═══════════════════════════════════════════════
create table reservation_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  property_id text not null,
  property_name text not null,
  property_slug text,
  name text not null,
  email text not null,
  phone text not null,
  check_in date not null,
  check_out date not null,
  guests int not null,
  total_price_mxn numeric(10,2),
  notes text,
  status text default 'pending',
  source text default 'website',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text,
  ip_country text,
  hostex_reservation_id text,
  zoho_lead_id text,
  zoho_deal_id text,
  whatsapp_thread_id text,
  synced_to_zoho_at timestamptz,
  synced_to_hostex_at timestamptz
);

create table owner_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text not null,
  properties_count int,
  location text,
  availability text,
  estimated_revenue_mxn numeric(10,2),
  message text,
  status text default 'new',
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  zoho_lead_id text,
  zoho_deal_id text,
  synced_to_zoho_at timestamptz
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  zoho_ticket_id text,
  responded boolean default false
);

-- ═══════════════════════════════════════════════
-- PAGOS (Stripe + PayU)
-- ═══════════════════════════════════════════════
create table payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  reservation_id uuid references reservation_leads(id),
  hostex_reservation_id text,
  gateway text not null,           -- stripe | payu
  method text not null,            -- card | apple_pay | google_pay | oxxo | spei
  amount_mxn numeric(10,2) not null,
  fee_mxn numeric(10,2),
  net_mxn numeric(10,2),
  status text not null,            -- pending | processing | succeeded | failed | expired | refunded
  gateway_id text,                 -- stripe payment_intent_id o payu transaction_id
  gateway_reference text,          -- stripe charge_id o payu referenceCode
  oxxo_reference text,             -- referencia OXXO alfanumérica
  oxxo_voucher_url text,           -- URL del PDF del voucher
  expires_at timestamptz,          -- para OXXO y SPEI
  paid_at timestamptz,
  failed_reason text,
  zoho_invoice_id text,
  zoho_cfdi_uuid text,             -- UUID del CFDI timbrado
  metadata jsonb
);

create index idx_payments_reservation on payments(reservation_id);
create index idx_payments_status on payments(status);
create index idx_payments_gateway_id on payments(gateway_id);

create table payment_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  payment_id uuid references payments(id),
  event_type text not null,        -- created | updated | webhook_received | cfdi_issued | etc
  gateway text,
  payload jsonb,
  processed boolean default false
);

-- ═══════════════════════════════════════════════
-- FX RATES CACHE (tipos de cambio informativos)
-- ═══════════════════════════════════════════════
create table fx_rates_cache (
  id uuid primary key default gen_random_uuid(),
  base_currency text not null,      -- MXN
  target_currency text not null,    -- USD, EUR, CAD, etc
  rate numeric(12,6) not null,
  fetched_at timestamptz default now(),
  source text default 'frankfurter',
  unique(base_currency, target_currency, fetched_at)
);

-- ═══════════════════════════════════════════════
-- NEWSLETTER / LEAD MAGNETS
-- ═══════════════════════════════════════════════
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text unique not null,
  source text,
  tags text[],
  zoho_campaigns_id text,
  unsubscribed_at timestamptz
);

-- ═══════════════════════════════════════════════
-- CACHÉ DE HOSTEX
-- ═══════════════════════════════════════════════
create table properties_cache (
  id text primary key,
  slug text unique not null,
  data jsonb not null,
  last_synced_at timestamptz default now()
);

create table reviews_cache (
  id text primary key,
  property_id text not null,
  data jsonb not null,
  last_synced_at timestamptz default now()
);

-- ═══════════════════════════════════════════════
-- WHATSAPP
-- ═══════════════════════════════════════════════
create table whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  direction text not null,
  phone text not null,
  template_name text,
  body text,
  status text,
  lead_id uuid references reservation_leads(id),
  meta_message_id text,
  conversation_id text
);

create table whatsapp_sessions (
  id uuid primary key default gen_random_uuid(),
  phone text unique,
  last_inbound_at timestamptz,
  window_expires_at timestamptz,
  context jsonb
);

-- ═══════════════════════════════════════════════
-- BRINDON (memoria del agente)
-- ═══════════════════════════════════════════════
create table brindon_conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  user_identifier text not null,
  channel text not null,
  context jsonb,
  status text default 'active'
);

create table brindon_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  conversation_id uuid references brindon_conversations(id),
  role text not null,
  content text not null,
  tool_calls jsonb,
  tokens_input int,
  tokens_output int,
  model text,
  latency_ms int
);

create extension if not exists vector;

create table brindon_knowledge (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(1536),
  metadata jsonb,
  category text,
  updated_at timestamptz default now()
);

-- ═══════════════════════════════════════════════
-- EVENTOS (audit log global)
-- ═══════════════════════════════════════════════
create table events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_type text not null,
  entity_type text,
  entity_id text,
  payload jsonb,
  source text,
  processed_by text[],
  error text
);

create index idx_events_type_created on events(event_type, created_at desc);

-- ═══════════════════════════════════════════════
-- PANEL INTERNO / ADMIN
-- ═══════════════════════════════════════════════
create table admin_users (
  id uuid primary key references auth.users(id),
  email text unique not null,
  role text not null,
  created_at timestamptz default now()
);

create table owner_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  zoho_account_id text,
  name text not null,
  email text not null,
  phone text,
  properties_ids text[],
  commission_percentage numeric(5,2),
  contract_signed_at timestamptz,
  active boolean default true
);

-- ═══════════════════════════════════════════════
-- AGENT ACTIONS (Fase 4)
-- ═══════════════════════════════════════════════
create table agent_actions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  agent_name text not null,
  action_type text not null,
  target_entity text,
  target_id text,
  payload jsonb,
  status text default 'pending',    -- pending | approved | executed | rejected
  requires_approval boolean default false,
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  executed_at timestamptz,
  result jsonb,
  error text
);
```

### Políticas RLS

- RLS activo en todas las tablas.
- Writes públicos solo en `newsletter_subscribers` (tras validación servidor).
- Reads públicos solo en `properties_cache` y `reviews_cache`.
- `payments` y `payment_events` solo service role.
- Admin y owner reads requieren auth.

### Backups

- Backup diario automático de Supabase.
- Export semanal a S3/B2.
- Retention: 30 días.

---

## 14. Agentes Claude autohospedados

### Visión

Mobbitrips planea un **servidor dedicado con Claude Code** corriendo agentes que operan sobre el ecosistema. No es para reemplazar al equipo — es para **amplificar capacidades operativas**.

### Hardware

- Máquina Linux dedicada (Ubuntu Server).
- Conexión estable, IP pública o tunnel (Tailscale/Cloudflare).
- Backups automáticos.

### Agentes planeados

| Agente | Rol | Modelo |
|---|---|---|
| **Analista** | Reportes diarios de ocupación, ingresos, alertas | Opus 4.7 |
| **Reviewer** | Responde reseñas nuevas (borradores para aprobación humana) | Sonnet 4.6 |
| **Content** | Genera artículos de blog SEO + social posts | Sonnet 4.6 |
| **Ops** | Monitorea workflows n8n, detecta anomalías | Opus 4.7 |
| **Finanzas** | Conciliación diaria Stripe+PayU, detecta discrepancias | Opus 4.7 |
| **Soporte L1** | Brindon (ya cubierto arriba) | Sonnet 4.6 |
| **Developer** | Mantenimiento del repo (actualiza deps, escribe tests, PRs pequeños) | Opus 4.7 |

### Arquitectura

```
┌──────────────────────────────────────────────┐
│         Servidor Mobbitrips HQ               │
├──────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐     │
│  │  Orquestador de agentes (custom)    │     │
│  └──┬──────────┬──────────┬───────────┘     │
│     │          │          │                  │
│     ▼          ▼          ▼                  │
│  ┌─────┐   ┌─────┐   ┌─────┐                │
│  │Analyst│ │Review│ │Finance│               │
│  │ (CC)  │ │ (CC) │ │ (CC)  │               │
│  └──┬──┘   └──┬──┘   └──┬──┘                │
│     │         │         │                    │
│  ┌──▼─────────▼─────────▼──┐                │
│  │   MCP Servers            │                │
│  │  ✅ Zoho MCP (oficial)   │                │
│  │  • Hostex MCP (custom)   │                │
│  │  • Supabase MCP (custom) │                │
│  │  • Stripe MCP (custom)   │                │
│  │  • Filesystem MCP        │                │
│  └──────────────────────────┘                │
└──────────────────────────────────────────────┘
         │
         │ HTTPS / MCP
         ▼
  Ecosistema Mobbitrips
  (Hostex, Zoho, Supabase, Stripe, PayU, n8n)
```

### MCP Servers

**Oficial (ya existe, solo configurar):**
- `mcp-zoho` — MCP oficial de Zoho con Claude. Cubre CRM, Books, Desk, Analytics.

**Custom a desarrollar:**
- `mcp-hostex` — wrapper del cliente Hostex.
- `mcp-supabase` — wrapper de Supabase.
- `mcp-stripe` — wrapper de Stripe (con aprobación humana para refunds).
- `mcp-n8n` — control de workflows.
- `mcp-whatsapp` — envío y consulta.

Repo: `mobbitrips-mcp-servers`.

### Requisitos agent-friendly

1. **APIs internas documentadas** (OpenAPI/Swagger).
2. **Idempotencia** en todo endpoint mutativo.
3. **Rate limits razonables**.
4. **Audit log** en `agent_actions`.
5. **Approval workflows**: acciones críticas (refunds, envíos masivos WA, modificar CFDI) requieren confirmación humana.
6. **Rollback**: capacidad de deshacer acciones.

---

## 15. Flujos de negocio end-to-end

### Flujo 1 — Reserva directa B2C con pago Stripe (happy path)

```
1. Visitante llega a /propiedades/[slug] desde Google Ads.
   → GA4: view_property
   → Meta Pixel: ViewContent
   → UI muestra precio en MXN + hint USD/EUR

2. Completa formulario con fechas y datos.
   → GA4: submit_booking
   → Meta CAPI: Lead

3. API Route /api/reservations/create:
   a. Valida con Zod.
   b. Inserta en Supabase.reservation_leads.
   c. Dispara webhook a n8n WF-01.
   d. Devuelve URL de pago /reserva/[id]/pagar.

4. n8n WF-01:
   a. Crea Lead en Zoho CRM.
   b. Crea Deal (etapa "Nuevo").
   c. Envía WhatsApp template reservation_received.

5. Operador humano (o Brindon) confirma disponibilidad vía WhatsApp.

6. Si cierra: operador crea reservation en Hostex.
   a. Webhook de Hostex → n8n WF-03.
   b. Se crea Customer + Sales Order en Zoho Books.
   c. Se envía link /reserva/[id]/pagar por WhatsApp.

7. Huésped entra a /reserva/[id]/pagar.
   a. Ve total en MXN + hint USD/EUR.
   b. Elige "Tarjeta" (default Stripe).
   c. Stripe Elements carga.
   d. Paga con tarjeta + 3DS.
   → GA4: purchase
   → Meta CAPI: Purchase

8. Stripe webhook payment_intent.succeeded → n8n WF-04a.
   a. Emite CFDI 4.0 via Zoho Books + PAC.
   b. Marca reserva pagada en Hostex.
   c. Deal en CRM → "Pago confirmado".
   d. WhatsApp recibo + CFDI PDF + instrucciones.
   e. Tarea preparación en ClickUp.

9. 48h antes check-in: n8n WF-10 manda WhatsApp con instrucciones.

10. Check-out: n8n WF-05 manda review request + campaign.
```

### Flujo 2 — Reserva con pago OXXO (happy path)

```
1-6. Igual que Flujo 1.

7. Huésped entra a /reserva/[id]/pagar.
   a. Elige "OXXO Pay".
   b. Backend llama PayU → genera referencia + voucher.

8. PayU webhook PENDING → n8n WF-04c.
   a. Guarda voucher en Supabase.payments.
   b. WhatsApp plantilla oxxo_payment_reference con PDF.
   c. Programa recordatorio 24h.

9. Huésped va a OXXO y paga en ~24h.

10. PayU webhook APPROVED → n8n WF-04b.
    a. Emite CFDI via Zoho Books.
    b. Marca reserva pagada en Hostex.
    c. WhatsApp recibo.

11. Flujo normal de check-in continúa.
```

### Flujo 3 — OXXO expirado

```
1-8. Igual que Flujo 2 hasta WF-04c.

9. Pasan 48h sin pago → n8n WF-04d cron.
   a. Cancela reserva en Hostex (libera fechas).
   b. Deal en CRM → "Perdido" razón "OXXO vencido".
   c. WhatsApp plantilla oxxo_expired con link de reintento.
```

### Flujo 4 — Captación de propietario B2B

```
1. Propietario busca "administrar mi propiedad Xalapa" en Google.
2. Llega a /servicios.
3. Usa EarningsCalculator.
   → GA4: owner_calculator_used
4. Llena formulario B2B.
   → GA4: owner_lead
   → POST /api/leads/owner

5. n8n WF-02:
   a. Crea Lead en Zoho CRM (tipo Propietario).
   b. Crea Deal pipeline B2B.
   c. Asigna comercial según región.
   d. WhatsApp plantilla owner_lead_received.
   e. Notifica Slack.

6. Comercial contacta por WhatsApp / llamada.
7. Si califica: agenda en Zoho Calendar, Deal → "Llamada agendada".
8. En reunión: se define modelo comisión, Deal → "Propuesta".
9. Contrato via Zoho Sign → Deal "Firmado".
10. Alta propiedad en Hostex → fotografía profesional → publicación.
11. Mes 1: n8n WF-06 genera reporte automático.
```

---

## 16. Seguridad, compliance, observabilidad

### Seguridad

- ✅ Secretos en **Vercel env + Supabase vault + n8n credentials** (nunca en repo).
- ✅ HMAC/signature verification en todos los webhooks (Hostex, Stripe, PayU MD5, WhatsApp, Zoho).
- ✅ Rate limiting en endpoints públicos (`@upstash/ratelimit`).
- ✅ Cloudflare Turnstile en todos los formularios.
- ✅ Validación Zod doble capa (cliente + servidor).
- ✅ RLS en todas las tablas Supabase.
- ✅ CSP, HSTS, X-Frame-Options.
- ✅ 2FA obligatorio en Zoho, Vercel, GitHub, Supabase, Stripe, PayU.
- ✅ Rotación de tokens OAuth cada 90 días.
- ✅ PCI DSS: SAQ-A (nunca tocar datos de tarjeta, usar Stripe Elements + PayU Hosted Page).

### Compliance

- **LFPDPPP**: aviso de privacidad, consentimiento, derechos ARCO.
- **CFDI 4.0**: Zoho Books + PAC certificado.
- **CNBV 3DS** obligatorio en tarjetas México.
- **WhatsApp policies**: opt-in, plantillas aprobadas.
- **Cookies**: banner compliance.

### Observabilidad

- **Sentry**: errores frontend + backend.
- **Vercel Analytics**: performance + CWV.
- **n8n logs**: Supabase.
- **Uptime**: Better Uptime / UptimeRobot.
- **Alertas**: Slack `#alerts-mobbitrips`.
- **Dashboards**: Zoho Analytics consolidado.

---

## 17. Variables de entorno y secretos

```bash
# ═══════════ WEB (Next.js) ═══════════
NEXT_PUBLIC_SITE_URL=https://mobbitrips.com
NEXT_PUBLIC_SITE_NAME=Mobbitrips
NEXT_PUBLIC_DEFAULT_CURRENCY=MXN

# ═══════════ Hostex ═══════════
HOSTEX_API_TOKEN=
HOSTEX_BASE_URL=https://api.hostex.io/v3
HOSTEX_WEBHOOK_SECRET=

# ═══════════ WhatsApp Business ═══════════
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_APP_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=5212282525244

# ═══════════ Supabase ═══════════
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ═══════════ n8n ═══════════
N8N_WEBHOOK_SECRET=
N8N_BASE_URL=https://n8n.mobbitrips.com

# ═══════════ Zoho ═══════════
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_REGION=com
ZOHO_CRM_API_URL=https://www.zohoapis.com/crm/v5
ZOHO_BOOKS_API_URL=https://www.zohoapis.com/books/v3
ZOHO_BOOKS_ORGANIZATION_ID=
ZOHO_MCP_TOKEN=                    # Para agentes Claude (Fase 4)

# ═══════════ PAC (CFDI) ═══════════
PAC_PROVIDER=facturama              # facturama | sw_sapien
PAC_API_KEY=
PAC_API_SECRET=
PAC_ENVIRONMENT=production          # sandbox | production

# ═══════════ Brindon (Claude) ═══════════
ANTHROPIC_API_KEY=
BRINDON_MODEL_FAST=claude-sonnet-4-6
BRINDON_MODEL_SMART=claude-opus-4-7

# ═══════════ Stripe ═══════════
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_CURRENCY=mxn

# ═══════════ PayU Mexico ═══════════
PAYU_API_KEY=
PAYU_API_LOGIN=
PAYU_MERCHANT_ID=
PAYU_ACCOUNT_ID_MXN=
PAYU_PUBLIC_KEY=
PAYU_ENVIRONMENT=production         # sandbox | production
PAYU_WEBHOOK_SECRET=
PAYU_BASE_URL=https://api.payulatam.com/payments-api/4.0/service.cgi

# ═══════════ FX Rates ═══════════
FRANKFURTER_API_URL=https://api.frankfurter.app
FX_CACHE_TTL=3600

# ═══════════ Resend ═══════════
RESEND_API_KEY=
RESEND_FROM_EMAIL=reservas@mobbitrips.com

# ═══════════ Analytics ═══════════
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
NEXT_PUBLIC_HOTJAR_ID=

# ═══════════ Sentry ═══════════
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# ═══════════ Cloudflare ═══════════
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# ═══════════ Admin ═══════════
ADMIN_EMAILS=admin@mobbitrips.com,ops@mobbitrips.com
```

---

## 18. Plan de trabajo por fases

### 📅 Timeline general

| Fase | Duración | Foco | Entregable |
|---|---|---|---|
| **Fase 1 — MVP Web** | 6 semanas | Web pública con reservas directas + WA básico | mobbitrips.com lanzado |
| **Fase 2 — Automatización + Pagos** | 5 semanas | n8n + Zoho CRM + WhatsApp Cloud API + Stripe + PayU | Flujo lead→pago→CRM automatizado |
| **Fase 3 — Contabilidad y Brindon** | 5 semanas | Zoho Books + CFDI + Brindon 2.0 + admin panel | Facturación automática + bot IA |
| **Fase 4 — Agentes y portal** | 4 semanas | Agentes Claude + portal propietarios | Servidor propio operativo |
| **Fase 5 — Optimización** | Continua | Analytics, SEO, iteración | Crecimiento medible |

**Nota**: Fase 2 creció de 4 a 5 semanas por integración dual Stripe+PayU.

### 🟦 FASE 1 — MVP Web (Semanas 1-6)

Sprint 1.0 Setup · Sprint 1.1 Design System · Sprint 1.2 Hostex+Propiedades · Sprint 1.3 Reservas B2C · Sprint 1.4 Páginas secundarias · Sprint 1.5 QA y lanzamiento.

*(Detalle igual que v2.0 — sin cambios).*

### 🟦 FASE 2 — Automatización + Pagos (Semanas 7-11)

#### Sprint 2.1 — n8n setup + workflows básicos (Semana 7)

Setup Docker n8n, SSL, credenciales Zoho OAuth, WF-01, WF-02, WF-09, HMAC verification, error handling, backup a git.

#### Sprint 2.2 — WhatsApp Business Cloud API (Semana 8)

Migración número a Business Platform, aprobación plantillas Meta, `/api/whatsapp/*`, WF-08 inbound handler, dashboard admin, ventana 24h.

#### Sprint 2.3 — Stripe integration (Semana 9)

- Cuenta Stripe México activa con MXN.
- `packages/stripe-client/` con PaymentIntents, webhooks, types.
- Página `/reserva/[id]/pagar` con Stripe Elements.
- Página `/reserva/[id]/exito`.
- API `/api/payments/stripe/webhook` con verify signature.
- WF-04a Pago Stripe en n8n.
- Componente `<CurrencyHint />` con Frankfurter.
- Testing con tarjetas sandbox.

#### Sprint 2.4 — PayU integration (Semana 10)

- Cuenta PayU Mexico con accounts MXN.
- `packages/payu-client/` con createOxxoPayment, createSpeiPayment, signature MD5.
- Flujo OXXO: generación voucher, página `/reserva/[id]/pendiente`, WhatsApp template.
- Flujo SPEI.
- API `/api/payments/payu/webhook` con verify.
- WF-04b, WF-04c (OXXO pending), WF-04d (OXXO expired).
- Plantillas `oxxo_payment_reference`, `oxxo_expired`, `spei_pending` aprobadas en Meta.
- Admin panel `/admin/pagos` con vista unificada Stripe+PayU.

#### Sprint 2.5 — Analytics + integración Hostex↔Zoho (Semana 11)

- Módulos custom Zoho CRM (Properties, Reservations).
- WF-03 Reserva confirmada.
- WF-07 Sync Hostex → Supabase.
- GTM con GA4, Meta Pixel, Meta CAPI, Hotjar.
- Eventos custom + audiencias remarketing.
- Zoho Analytics dashboards básicos.

### 🟦 FASE 3 — Contabilidad y Brindon (Semanas 12-16)

#### Sprint 3.1 — Zoho Books + PAC + CFDI (Semana 12)

- Config completa Books: plan cuentas, impuestos (IVA 16% + ISH), CFDI, numeración.
- Selección y contratación de PAC (Facturama o SW Sapien).
- Integración PAC ↔ Zoho Books para timbrado automático.
- WF-04a/b extendido: crear Invoice + timbrar CFDI al recibir pago.
- Testing: emitir CFDI de prueba, validar con SAT.

#### Sprint 3.2 — Conciliación pagos (Semana 13)

- WF-11 Conciliación diaria Stripe+PayU vs Books.
- Reportes de discrepancias en Slack.
- WF-05 Check-out completo con review request.
- Credit notes + CFDI de egreso en cancelaciones con reembolso.
- Testing completo ciclo financiero: reserva → pago → factura → recibo → cancelación → nota crédito.

#### Sprint 3.3 — Brindon 2.0 (Semana 14)

Arquitectura skills+tools, migración Gemini→Claude, tools (check_availability, property_search, create_lead, generate_payment_link, schedule_call, escalate_to_human), memoria Supabase, pgvector, widget web.

#### Sprint 3.4 — Admin panel (Semana 15)

Auth Supabase, dashboards ejecutivo/leads/reservas/pagos/brindon.

#### Sprint 3.5 — Reportes propietarios (Semana 16)

WF-06 Reporte mensual, PDF generator, Zoho Sign para contratos.

### 🟦 FASE 4 — Agentes y portal (Semanas 17-20)

#### Sprint 4.1 — Servidor propio + Claude Code + MCP Zoho (Semana 17)

- Setup servidor Ubuntu dedicado.
- Claude Code instalado.
- Tailscale/Cloudflare tunnel.
- Backups automáticos.
- **Configuración MCP oficial Zoho** con Claude.

#### Sprint 4.2 — MCP servers custom (Semana 18)

`mcp-hostex`, `mcp-supabase`, `mcp-stripe` (con approval para refunds). Documentación OpenAPI.

#### Sprint 4.3 — Primeros agentes (Semana 19)

Agente Analista (reportes diarios), Reviewer (borradores reseñas), Finanzas (conciliación diaria). Approval workflows en admin.

#### Sprint 4.4 — Portal propietarios (Semana 20)

`/admin/propietarios/[id]` dashboard personalizado, mensajería interna, reportes self-service.

### 🟦 FASE 5 — Optimización continua

- SEO (5 artículos/mes).
- A/B testing landings.
- Iteración Brindon.
- Evaluación Brevo como reemplazo Campaigns si métricas no alcanzan objetivo.
- Expansión a otras ciudades (si aplica).

---

## 19. Estructura del monorepo

```
mobbitrips/
├── CLAUDE.md                          # Este archivo
├── README.md
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
│
├── apps/
│   ├── web/                           # Next.js (mobbitrips.com)
│   ├── admin/                         # Fase 3: ruta /admin o app separada
│   └── brindon/                       # Fase 3: servicio Brindon
│
├── packages/
│   ├── ui/                            # Componentes compartidos
│   ├── hostex-client/
│   ├── zoho-client/
│   ├── stripe-client/                 # NUEVO v2.1
│   ├── payu-client/                   # NUEVO v2.1
│   ├── currency/                      # NUEVO v2.1 (FX + hints)
│   ├── whatsapp-client/
│   ├── supabase-client/
│   ├── types/
│   ├── config/
│   └── utils/
│
├── n8n/
│   ├── workflows/
│   │   ├── WF-01_lead_b2c.json
│   │   ├── WF-02_lead_b2b.json
│   │   ├── WF-03_reservation_confirmed.json
│   │   ├── WF-04a_stripe_payment.json
│   │   ├── WF-04b_payu_payment.json
│   │   ├── WF-04c_oxxo_pending.json
│   │   ├── WF-04d_oxxo_expired.json
│   │   ├── WF-05_checkout.json
│   │   ├── WF-06_monthly_report.json
│   │   ├── WF-07_sync_properties.json
│   │   ├── WF-08_whatsapp_inbound.json
│   │   ├── WF-09_newsletter.json
│   │   ├── WF-10_checkin_reminder.json
│   │   └── WF-11_payment_reconciliation.json
│   └── README.md
│
├── mcp-servers/                       # Fase 4
│   ├── mcp-hostex/
│   ├── mcp-supabase/
│   └── mcp-stripe/
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
│
└── docs/
    ├── architecture.md
    ├── runbooks/
    ├── api-reference.md
    └── onboarding.md
```

---

## 20. ClickUp — estructura de PM

### Jerarquía (actualizada v2.1)

```
Space: MOBBITRIPS
├── Folder: 📐 Planeación
│   ├── List: Decisiones arquitectónicas (ADRs)
│   ├── List: Investigación
│   └── List: Requerimientos de negocio
│
├── Folder: 🏠 Fase 1 - MVP Web
│   ├── Sprint 1.0 - Setup
│   ├── Sprint 1.1 - Design System
│   ├── Sprint 1.2 - Hostex + Propiedades
│   ├── Sprint 1.3 - Reservas B2C básicas
│   ├── Sprint 1.4 - Páginas secundarias
│   └── Sprint 1.5 - QA y Lanzamiento
│
├── Folder: 🔗 Fase 2 - Automatización + Pagos
│   ├── Sprint 2.1 - n8n Setup
│   ├── Sprint 2.2 - WhatsApp Cloud API
│   ├── Sprint 2.3 - Stripe integration
│   ├── Sprint 2.4 - PayU integration
│   └── Sprint 2.5 - Analytics + Hostex↔Zoho
│
├── Folder: 💰 Fase 3 - Contabilidad y Brindon
│   ├── Sprint 3.1 - Zoho Books + PAC + CFDI
│   ├── Sprint 3.2 - Conciliación pagos
│   ├── Sprint 3.3 - Brindon 2.0
│   ├── Sprint 3.4 - Admin Panel
│   └── Sprint 3.5 - Reportes propietarios
│
├── Folder: 🤖 Fase 4 - Agentes
│   ├── Sprint 4.1 - Servidor propio + MCP Zoho
│   ├── Sprint 4.2 - MCP Servers custom
│   ├── Sprint 4.3 - Primeros agentes
│   └── Sprint 4.4 - Portal propietarios
│
├── Folder: 📈 Fase 5 - Optimización
├── Folder: 🔄 Operación continua
└── Folder: 📊 Marketing
```

*(Resto de estructura PM igual que v2.0: campos personalizados, estados, recurrencias, integraciones ClickUp).*

---

## 21. Criterios de aceptación globales

Cada task debe cumplir antes de cerrarse:

1. ✅ Funciona en móvil, tablet y desktop (375 / 768 / 1024 / 1440).
2. ✅ Sin errores ni warnings en consola.
3. ✅ TypeScript sin errores.
4. ✅ Lint limpio.
5. ✅ Accesible (keyboard nav, aria, contraste AA).
6. ✅ Performance sin regresiones (Lighthouse ≥ 85).
7. ✅ Respeta `prefers-reduced-motion`.
8. ✅ Estados: loading, success, error, empty.
9. ✅ SEO: metadata, semántica, alt texts.
10. ✅ Analytics: eventos disparados y verificados.
11. ✅ Integraciones: evento en `events` table, workflow n8n verde.
12. ✅ Pagos: tested en sandbox Stripe y PayU antes de prod.
13. ✅ CFDI: validado con SAT para tickets de Fase 3.
14. ✅ Tests unitarios donde aplique.
15. ✅ Documentación actualizada.
16. ✅ Preview deploy en Vercel verde.
17. ✅ Code review de al menos 1 persona o agente.

---

## 22. Guía de uso con Claude Code

### Setup inicial

1. Clona el monorepo.
2. Coloca este archivo como `/CLAUDE.md` en la raíz.
3. Crea `CLAUDE.md` por app:
   - `apps/web/CLAUDE.md`
   - `apps/brindon/CLAUDE.md`
4. Abre Claude Code: `claude` en terminal.

### Flujo por sprint

**Al iniciar**:
```
Vamos a arrancar Sprint [X.Y]. Lee CLAUDE.md sección 18 Fase [X],
revisa las tasks de ClickUp en la lista "Sprint [X.Y]",
propón el orden óptimo considerando dependencias.
```

**Por task**:
```
Implementa la task [ID]. Antes de escribir código:
1. Plan en bullets.
2. Archivos a crear/modificar.
3. Lista de eventos/workflows que toca.
4. Tests necesarios.
5. Espera OK.
```

### Reglas de oro

1. **Leer CLAUDE.md al inicio** de cada sesión.
2. **Nunca inventar endpoints** — si no está documentado, preguntar.
3. **Secretos solo en `process.env.*`**.
4. **Server/Client components separados**.
5. **Proponer antes de ejecutar** cambios >3 archivos.
6. **Correr lint+type-check** antes de cerrar.
7. **Commits atómicos**.
8. **Actualizar CLAUDE.md** ante decisiones arquitectónicas.
9. **Preguntar ante ambigüedad**.
10. **Mantenibilidad > cleverness**.
11. **Idempotencia**: todo webhook y workflow reentrante.
12. **Registrar eventos**: acciones importantes → tabla `events`.
13. **No romper contratos**: si cambias endpoint consumido por n8n, versionar.
14. **Pagos**: nunca tocar datos de tarjeta. Usar Stripe Elements / PayU Hosted Page.
15. **Moneda**: todo en MXN. FX solo informativo.

### Comandos frecuentes

```bash
pnpm dev                           # todos
pnpm dev --filter=web              # solo web
pnpm lint
pnpm type-check
pnpm test
pnpm build
pnpm supabase migration new [x]
pnpm supabase db push

# Stripe local webhooks
stripe listen --forward-to localhost:3000/api/payments/stripe/webhook

# PayU sandbox
# (las URLs de sandbox están en .env.local)
```

---

## 23. Bitácora de decisiones

> Registrar con fecha y contexto. Formato: `[YYYY-MM-DD] Decisión — Justificación — Impacto.`

- `[2026-04-XX]` **Pagos dual Stripe + PayU** — Stripe mejor DX y UX premium para tarjetas internacionales, PayU necesario para OXXO/SPEI que usa mayoría del mercado mexicano en efectivo. Impacto: +1 semana en Fase 2, +2 packages en monorepo, lógica de enrutamiento en checkout.
- `[2026-04-XX]` **Zoho One como ERP único** — CFDI nativo mexicano, ecosistema unificado, MCP oficial con Claude. Brevo no tiene contabilidad y requeriría Frankenstein de herramientas. Impacto: simplifica Fase 3, unifica agentes Claude.
- `[2026-04-XX]` **MXN-only como moneda de cobro** — Cero riesgo cambiario, CFDI limpios, SAT compliance, liquidación rápida. Hint informativo USD/EUR/CAD en checkout. Impacto: simplifica toda la capa financiera.
- `[2026-04-XX]` **MCP oficial Zoho en lugar de custom** — Anthropic + Zoho ya tienen integración oficial. Impacto: -1 sprint en Fase 4, menos código que mantener.

---

## 🎯 Checklist de arranque

- [ ] Validar acceso a Hostex API.
- [ ] Validar suscripción Zoho One.
- [ ] Validar cuenta Stripe México con KYC completo.
- [ ] Abrir cuenta PayU Mexico y solicitar credenciales sandbox + prod.
- [ ] Contratar PAC (Facturama o SW Sapien) para CFDI.
- [ ] Validar número WhatsApp disponible para migrar a Cloud API.
- [ ] Crear Space en ClickUp con estructura actualizada.
- [ ] Crear proyecto Supabase.
- [ ] Crear repo GitHub.
- [ ] Configurar Vercel.
- [ ] Generar `.env.local`.
- [ ] VPS para n8n (Fase 2).
- [ ] Guardar este archivo como `/CLAUDE.md`.
- [ ] 🚀 **Sprint 1.0 Setup**.

---

**Fin del documento v2.1.**
*Documento vivo. Toda decisión arquitectónica actualiza la sección correspondiente y se registra en §23.*
