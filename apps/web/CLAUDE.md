# 🌐 Mobbitrips Web — Contexto específico

> Este archivo contiene **reglas específicas de la web** (`apps/web/`). Se lee en cascada junto al `CLAUDE.md` raíz cuando Claude Code trabaja en esta carpeta.

---

## ⚠️ Estado del documento

**Versión actual: Mínima viable (Sprint 1.0).**

Este archivo contiene únicamente lo indispensable para que Sprint 1.0 (setup) funcione. La **versión completa** con especificación detallada de cada sección del Home, componentes reutilizables, copy sugerido y patrones de UX **se expandirá en Sprint 1.1** cuando se arranque el diseño.

Para detalles completos de diseño, consulta temporalmente `docs/MASTER.md` secciones 5 y 6.

---

## 🎨 Identidad visual (resumen operativo)

### Paleta Tailwind

```ts
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "#ED6864",   // Coral Pantone 7416
    dark:    "#D4504C",   // Hover states
    light:   "#F4A09E",   // Backgrounds suaves
    soft:    "#FDF0EF",   // Fondos de sección cálidos
  },
  brand: {
    charcoal: "#3D3D3D",  // Texto principal
    gray:     "#706F6F",  // Texto secundario (Pantone 404)
    light:    "#A8A8A8",  // Placeholders, texto terciario
    cream:    "#FAF8F5",  // Fondo global
    white:    "#FFFFFF",
    border:   "#EDE9E4",  // Bordes cálidos suaves
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

- **Headings**: `Comfortaa` (300, 400, 600, 700) via `next/font/google`.
- **Body**: `Inter` (300, 400, 500, 600) via `next/font/google`.
- **Display: swap** en ambas.
- Variables CSS: `--font-comfortaa`, `--font-inter` aplicadas en `<html>`.

### Escala tipográfica

14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 px

- Line-height: 1.6 body, 1.3 headings.
- Letter-spacing: normal o ligeramente negativo (-0.01em) en displays ≥ 36px.

### Sombras (cálidas, no negras)

```css
--shadow-sm: 0 2px 8px rgba(237,104,100,0.06);
--shadow-md: 0 4px 16px rgba(237,104,100,0.10);
--shadow-lg: 0 12px 32px rgba(237,104,100,0.14);
--shadow-xl: 0 24px 48px rgba(237,104,100,0.18);
```

### Radios

- `rounded-2xl` (16px) → cards.
- `rounded-xl` (12px) → inputs, botones grandes.
- `rounded-full` → pills, badges.

---

## 🚫 Anti-patrones (no hacer nunca)

- ❌ Oscuro estilo hotel de lujo misterioso.
- ❌ Minimalismo frío tipo tech startup.
- ❌ Rosa fucsia (`#E91E8C`) — es incorrecto, no es la marca.
- ❌ Serif tipo revista (Playfair Display, Cormorant, Lora) — no es la marca.
- ❌ Copy corporativo ("excelencia", "calidad premium", "líderes en").
- ❌ Exclusividad elitista ("solo para pocos afortunados").
- ❌ Stock photos genéricas de ejecutivos felices.
- ❌ Sombras negras puras (siempre teñidas de coral).
- ❌ Bordes duros/angulosos en cards — siempre rounded.

---

## ✅ Principios de diseño

1. **Cálido > sofisticado**. Preferimos calidez humana sobre elegancia fría.
2. **Orgánico > geométrico**. Formas redondeadas, curvas, nada filoso.
3. **Familiar > aspiracional**. "Como en casa", no "como en hotel".
4. **Honesto > exagerado**. Copy directo, sin marketingese.
5. **Accesible > exclusivo**. Lujo accesible, no lujo elitista.

---

## 📱 Responsive

**Mobile-first siempre.**

Breakpoints Tailwind estándar:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Viewports de testing mínimos: 375 / 768 / 1024 / 1440.

Touch targets ≥ 44×44px en mobile.

---

## ♿ Accesibilidad

- WCAG AA mínimo (contraste 4.5:1 texto normal, 3:1 texto grande).
- `focus-visible` con ring coral: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`.
- Todos los botones e inputs con `aria-label` si no tienen texto visible.
- Navegación completa por teclado (Tab, Enter, Esc).
- `<html lang="es">`.
- Semántica HTML: `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- Skip link al contenido principal.
- `alt` descriptivos en todas las imágenes.
- No depender solo del color para comunicar estado (siempre ícono o texto también).

---

## ⚡ Performance

- **Server Components por defecto**, `'use client'` solo cuando haya interactividad.
- `next/image` con `priority` en above-the-fold, lazy en el resto.
- `next/font` con `display: 'swap'`.
- Targets Lighthouse: ≥ 90 en Performance, ≥ 95 en Accessibility, SEO y Best Practices.
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Imágenes AVIF/WebP automáticas vía next/image.

---

## 🧩 Patrón de componentes

Los componentes viven en estas ubicaciones:

```
apps/web/src/
├── app/                    ← rutas del App Router
├── components/
│   ├── layout/            ← Navbar, Footer, etc.
│   ├── ui/                ← Button, Badge, Input, etc. (o vienen de @mobbitrips/ui)
│   ├── sections/          ← ⭐ Secciones de página provenientes de Claude Design
│   ├── home/              ← secciones del Home (legacy, migrando a sections/)
│   ├── properties/        ← PropertyCard, PropertyGrid, etc.
│   ├── owners/            ← landing B2B
│   └── analytics/         ← GTM, Pixel, etc.
├── lib/                    ← utilidades específicas de la web
├── hooks/                  ← hooks React custom
├── types/                  ← tipos específicos de la web
└── content/                ← MDX de blog (Fase 2+)
```

### ⭐ Flujo Claude Design → Claude Code

Ver `design/WORKFLOW.md` para el flujo completo. En resumen:

1. **Claude Design** genera la sección (HTML standalone grande)
2. Se guarda en `design/exports/[seccion]-v[n].html` como referencia inmutable
3. **Claude Code** extrae JSX + CSS y lo adapta a Next.js/TypeScript
4. El componente resultante va en `apps/web/src/components/sections/[Seccion].tsx`
5. Se prueba en `localhost:3000`, se afinan detalles pequeños
6. Si necesita cambio de diseño grande → volver a Claude Design

**CSS Design Tokens**: todos los exports de Claude Design usan `var(--coral-900)`,
`var(--font-display)`, etc. Estos tokens están definidos en `globals.css > @layer base > :root`.
No hay que traducirlos — ya funcionan directamente.

### Convenciones

- **Componentes en PascalCase** (`PropertyCard.tsx`).
- **Hooks con prefijo `use`** (`useBookingForm.ts`).
- **Un componente por archivo**.
- **Export default** para componentes, **named exports** para utilidades.
- **Props tipadas** siempre con interfaces (no types).
- **Tailwind classes ordenadas** con plugin prettier (layout → spacing → typography → colors → effects).

---

## 🎬 Animaciones (Framer Motion)

### Principios

- **Suaves y orgánicas**, nunca bruscas.
- **Respetar `prefers-reduced-motion`** siempre.
- **Duration corta**: 200-400ms para hover, 500-700ms para entrada de secciones.
- **Easing**: default de Framer (cubic-bezier natural) o `easeOut`.

### Patrones comunes

```tsx
// Entrada de sección
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>

// Hover en card
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.3 }}
>

// Stagger de hijos
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
```

---

## 🔌 Integraciones (resumen)

Para detalles de cada una, ver `docs/MASTER.md`:

- **Hostex**: todo en `packages/hostex-client/`, llamadas desde API Routes.
- **WhatsApp**: `packages/whatsapp-client/`, nivel básico (wa.me) en Fase 1, Cloud API en Fase 2.
- **Supabase**: `packages/supabase-client/`, RLS activo, service_role solo server.
- **Stripe + PayU**: `packages/stripe-client/` y `packages/payu-client/`, ambos en Fase 2.
- **Zoho**: vía n8n, no directamente desde la web.

---

## 🎨 Componentes a construir (Sprint 1.1)

*(Esta sección se expandirá con detalles cuando arranquemos Sprint 1.1. Por ahora solo lista de nombres.)*

**Componentes UI base (packages/ui):**
- Button, Badge, Input, Skeleton, StarRating, AnimatedSection.

**Layout:**
- Navbar, Footer, WhatsAppFloatingButton, CookieBanner.

**Home (apps/web/src/components/home):**
- HeroSection, FeaturedProperties, WhyBookDirect, StorySection, AmenitiesSection, TestimonialsSection, OwnerTeaser, NewsletterCTA, FinalCTA.

**Properties:**
- PropertyCard, PropertyGrid, PropertyFilters, PropertyGallery, PropertyAmenities, PropertyReviews, PropertyMap, BookingWidget.

**Owners (B2B):**
- OwnerHero, OwnerBenefits, OwnerProcess, EarningsCalculator, OwnerTestimonials, OwnerContactForm.

Cada uno tendrá especificación completa en la próxima versión de este documento.

---

## 📦 Dependencias específicas de la web

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "framer-motion": "11.x",
    "lenis": "1.x",
    "lucide-react": "latest",
    "axios": "1.x",
    "react-hook-form": "7.x",
    "zod": "3.x",
    "@hookform/resolvers": "3.x",
    "date-fns": "3.x",
    "react-day-picker": "9.x",
    "clsx": "2.x",
    "tailwind-merge": "2.x"
  }
}
```

---

## 🚧 Notas de desarrollo

### Mocks en desarrollo

Mientras no haya credenciales reales de Hostex, usar `packages/hostex-client/src/mocks.ts` con datos de prueba realistas (3-5 propiedades ficticias en Xalapa).

### Variables de entorno

Lee `docs/MASTER.md` sección 17 para la lista completa. Para Sprint 1.0 solo necesitas:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=5212282525244
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

---

**Última actualización**: abril 2026 · **Versión**: 0.1 (mínima viable)

*Este documento se expandirá significativamente al arrancar Sprint 1.1.*
