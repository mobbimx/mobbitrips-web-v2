# Mobbitrips — Design Workflow

## Flujo de trabajo: Claude Design ↔ Claude Code

```
Claude Design  →  Exporta HTML standalone
      ↓
design/exports/[seccion]-v[n].html   ← referencia de diseño (nunca editar manualmente)
      ↓
Claude Code extrae JSX + CSS
      ↓
apps/web/src/components/sections/[Seccion].tsx  ← componente Next.js adaptado
      ↓
localhost:3000  →  ajustes finos
      ↓
Si necesita cambio grande → volver a Claude Design con contexto actualizado
      ↓
Nuevo export → design/exports/[seccion]-v[n+1].html
```

---

## Responsabilidades de cada herramienta

### Claude Design
- Genera y itera **secciones completas** (Hero, Features, CTA, etc.)
- Mantiene el design system visual consistente
- Produce el HTML standalone como artefacto de referencia
- Se usa para cambios grandes de layout, composición o estilo global

### Claude Code (este repo)
- Extrae el JSX y CSS del HTML exportado
- Adapta a Next.js: `'use client'`, `Link`, `Image`, TypeScript, hooks reales
- Conecta con datos reales (Hostex, Supabase, formularios funcionales)
- Afina detalles pequeños: responsive edge cases, a11y, performance
- Agrega interactividad real (routing, estado, validaciones)

---

## Convenciones de naming

### Archivos HTML de referencia
```
design/exports/
├── hero-v1.html               ← primera versión aprobada
├── hero-v2.html               ← iteración con cambios grandes
├── featured-properties-v1.html
├── why-book-direct-v1.html
├── testimonials-v1.html
├── footer-v1.html
└── ...
```

Versionar con `-v[n]` — nunca sobreescribir una versión aprobada.

### Componentes Next.js resultantes
```
apps/web/src/components/sections/
├── HeroSection.tsx            ← desde hero-v1.html
├── FeaturedProperties.tsx     ← desde featured-properties-v1.html
├── WhyBookDirect.tsx
├── TestimonialsSection.tsx
├── OwnerTeaser.tsx
├── NewsletterCTA.tsx
├── FinalCTA.tsx
└── ...
```

---

## CSS: Design tokens

Todos los exports de Claude Design usan CSS custom properties definidas en:
```
apps/web/src/app/globals.css  →  @layer base > :root
```

Si Claude Design usa `var(--coral-900)`, ese token ya existe en globals.css.
Si aparece un token nuevo, agregarlo al bloque de design tokens en globals.css.

Los tokens del design system de Mobbitrips:
- `--coral-50` a `--coral-950` — paleta coral
- `--gray-100` a `--gray-950` — grises cálidos
- `--cream`, `--white`, `--charcoal` — fondos
- `--font-display` → Comfortaa | `--font-body` → Inter | `--font-script` → Caveat
- `--radius-sm` a `--radius-full` — bordes
- `--shadow-*`, `--ease-*`, `--dur-hover` — efectos
- `--container-max`, `--container-pad` — layout

---

## Checklist al convertir un export

- [ ] Copiar HTML a `design/exports/[seccion]-v[n].html`
- [ ] Extraer CSS y agregar a globals.css (si hay clases nuevas no en globals aún)
- [ ] Crear `apps/web/src/components/sections/[Seccion].tsx`
- [ ] Agregar `'use client'` si usa scroll, estado, o refs
- [ ] Reemplazar `<a href>` por `<Link href>` de Next.js
- [ ] Reemplazar `<img>` por `next/image` donde aplique
- [ ] Conectar interactividad real (routing, formularios, datos)
- [ ] Validar en localhost:3000 en mobile (375px) y desktop (1440px)
- [ ] Correr `pnpm lint && pnpm type-check`
- [ ] Commit atómico: `feat(sections): [nombre de la sección]`

---

## Cuándo volver a Claude Design

- El layout completo necesita rediseñarse
- Se quiere probar una variante visual diferente (colores, tipografía, composición)
- Se agrega una sección nueva desde cero
- El resultado en código se aleja demasiado de la intención del diseño

En esos casos, exportar el HTML resultante (o un screenshot) y usarlo como contexto
en Claude Design para que el design system se mantenga coherente.
