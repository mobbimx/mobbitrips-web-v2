# 🚀 Sprint Actual — Sprint 1.1: Design System + Home

> Este archivo muestra **solo el sprint activo**. Al cerrarlo, se archiva en `docs/sprints/completados/` y se crea uno nuevo.

---

## 📌 Info del sprint

- **Sprint**: 1.1 — Design System + Home
- **Fase**: 1 — MVP Web
- **Fecha inicio**: 2026-04-17
- **Fecha objetivo**: ~2026-05-01 (calibrado para ~15h/semana)
- **Objetivo**: Home pública impecable con Design System base. Al cerrar: `/` tiene las 9 secciones completas, Navbar y Footer funcionales, componentes UI reutilizables listos para el resto de la web.

---

## 📊 Progreso

**0 / 15 tasks completadas (0%)**

---

## ✅ Completadas

_(ninguna aún)_

---

## 🔄 En progreso

_(arrancamos con S1.1-1)_

---

## 📋 Backlog del sprint

### Componentes UI base (`packages/ui`)

- [ ] **S1.1-1** Button component `[2 pts]`
  - Variantes: `primary`, `secondary`, `outline`, `ghost`.
  - Tamaños: `sm`, `md`, `lg`.
  - Estados: `loading` (spinner), `disabled`.
  - Props: `asChild` (para usar con `<Link>`), `leftIcon`, `rightIcon`.
  - Accesible: `aria-disabled`, focus ring coral.

- [ ] **S1.1-2** Badge, Input, Skeleton, StarRating `[2 pts]`
  - **Badge**: variantes `default`, `success`, `warning`, `coral`. Pill shape.
  - **Input**: con label, helper text, error state. Integra con React Hook Form.
  - **Skeleton**: animación pulse coral suave. Props: `width`, `height`, `rounded`.
  - **StarRating**: display-only (para reviews). Props: `value`, `max`, `size`.

- [ ] **S1.1-3** AnimatedSection `[1 pt]`
  - Wrapper Framer Motion con `fadeInUp` por defecto.
  - Props: `delay`, `duration`, `direction` (`up`|`down`|`left`|`right`).
  - Respeta `prefers-reduced-motion`.
  - `viewport={{ once: true, margin: "-100px" }}`.

### Layout

- [ ] **S1.1-4** Navbar `[3 pts]`
  - Logo + links de navegación + CTA "Reservar".
  - Scroll-aware: altura 72px → 64px al hacer scroll, sombra aparece.
  - Mobile: hamburger → drawer lateral (Framer Motion, desde derecha).
  - Links: Inicio / Propiedades / Nosotros / Servicios / Contacto.
  - CTA coral en desktop, full-width en mobile drawer.
  - Server Component base, Client Component solo para estado de scroll/drawer.

- [ ] **S1.1-5** Footer `[2 pts]`
  - 4 columnas: Logo+tagline / Navegación / Servicios / Contacto+RRSS.
  - Logo blanco sobre fondo `brand-charcoal` (`#3D3D3D`).
  - WhatsApp link prominente.
  - Créditos + links legales abajo.
  - Fully responsive (stack en mobile).

- [ ] **S1.1-6** WhatsAppFloatingButton `[1 pt]`
  - Botón circular coral fijo bottom-right.
  - Ícono WhatsApp + texto "Escríbenos" en desktop.
  - Pulso animado cada 3s (Framer Motion).
  - Link a `https://wa.me/5212282525244` con mensaje pre-llenado.
  - Se oculta cuando el footer es visible (IntersectionObserver).
  - `aria-label="Abrir WhatsApp"`.

### Home — secciones

- [ ] **S1.1-7** HeroSection `[3 pts]`
  - Headline: "Descansa, vive y sueña como si estuvieras en casa".
  - Subheadline: propuesta de valor directa (2 líneas).
  - Imagen de fondo: propiedad con overlay cálido. Placeholder hasta tener foto real.
  - Buscador básico integrado: fecha entrada / fecha salida / huéspedes → botón "Ver disponibilidad" (redirige a `/propiedades` con query params).
  - CTA secundario: "Conoce nuestras propiedades".
  - Animación de entrada con Framer Motion.

- [ ] **S1.1-8** FeaturedProperties `[2 pts]`
  - Grid de 3 property cards (con mocks de `packages/hostex-client/mocks.ts`).
  - **PropertyCard**: imagen, nombre, badges (capacidad, habitaciones), precio/noche en MXN, rating.
  - Hover: card sube 4px, sombra coral.
  - CTA "Ver todas las propiedades" al final.
  - Server Component (datos en build time / ISR).

- [ ] **S1.1-9** WhyBookDirect `[1 pt]`
  - 4 razones para reservar directo (sin OTA): precio mejor, atención directa, flexibilidad, confianza.
  - Grid 2×2 en desktop, stack en mobile.
  - Íconos Lucide + título + descripción corta por card.

- [ ] **S1.1-10** StorySection `[1 pt]`
  - Historia de Mobbitrips: quiénes somos, Xalapa, filosofía "como en casa".
  - Layout: texto izquierda + imagen derecha (invertido en mobile).
  - Tono cálido y personal, no corporativo.
  - CTA "Conócenos más" → `/nosotros`.

- [ ] **S1.1-11** TestimonialsSection `[1 pt]`
  - 3 reseñas reales o mock con nombre, foto placeholder, texto y estrellas.
  - Layout: 3 cards en grid desktop, scroll horizontal en mobile.
  - StarRating component de S1.1-2.

- [ ] **S1.1-12** OwnerTeaser `[1 pt]`
  - Mini landing B2B: "¿Tienes una propiedad en Xalapa?" + 3 beneficios clave.
  - Background: `primary-soft` (`#FDF0EF`).
  - CTA: "Quiero listar mi propiedad" → `/servicios`.

- [ ] **S1.1-13** NewsletterCTA `[1 pt]`
  - Email input + botón suscribirse.
  - Texto: propuesta de valor del newsletter (ofertas, guías Xalapa).
  - Validación Zod en cliente.
  - POST a `/api/newsletter` (stub por ahora, sin Supabase aún).
  - Estado de éxito/error inline.

- [ ] **S1.1-14** FinalCTA + montar Home `[2 pts]`
  - **FinalCTA**: sección final con headline grande + 2 CTAs: "Ver propiedades" y "Hablar por WhatsApp".
  - **Montar `page.tsx`**: ensamblar todas las secciones en orden:
    `HeroSection → FeaturedProperties → WhyBookDirect → StorySection → TestimonialsSection → OwnerTeaser → NewsletterCTA → FinalCTA`
  - Verificar que el home carga en <3s, sin layout shift.
  - Pasar `pnpm lint` y `pnpm type-check`.

---

## 🎯 Criterios de cierre del sprint

- [ ] `/` muestra las 9 secciones completas y visualmente pulidas.
- [ ] Navbar funciona en desktop y mobile (drawer).
- [ ] Footer completo con todos los links.
- [ ] WhatsAppFloatingButton visible y funcional.
- [ ] `pnpm lint` y `pnpm type-check` pasan sin warnings.
- [ ] Mobile-first: se ve bien en 375px, 768px, 1280px.
- [ ] No hay `console.log` sin `// eslint-disable` justificado.
- [ ] Todos los componentes accesibles (tab-navigation, aria-labels).
- [ ] Animaciones respetan `prefers-reduced-motion`.

---

## 🚨 Bloqueos

- Imágenes reales de propiedades: usar placeholders (`/images/placeholder-property.jpg`) mientras Emilio las provee.
- Copy final: usar texto provisional coherente con el tono de marca.

---

## 📝 Notas del sprint

- Los mocks de propiedades van en `apps/web/src/lib/mocks.ts` por ahora (no en packages todavía, eso es Sprint 1.2).
- `packages/ui` se crea en este sprint con los componentes básicos.
- Instalar `pnpm add framer-motion` solo si no está ya en `apps/web`.

---

## 🔗 Próximo sprint

**Sprint 1.2 — Propiedades + Hostex client** (~2 semanas)

Objetivo: Página `/propiedades` con filtros, página detalle `/propiedades/[slug]`, integración real con Hostex API (con credenciales), BookingWidget básico.

---

**Sprint anterior**: 1.0 — `docs/sprints/completados/sprint-1.0.md`
**Ver todos los sprints completados**: `docs/sprints/completados/`
