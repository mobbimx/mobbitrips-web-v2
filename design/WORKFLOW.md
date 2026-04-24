# Mobbitrips — Design Workflow

> **Source of truth del diseño web:** `main` en GitHub. Nada vive solo en una máquina.
> Cualquier sesión (esta máquina, casa, otro equipo) empieza con pull y termina con push.

---

## 🛫 Preflight checklist (al iniciar sesión en cualquier máquina)

```bash
cd mobbitrips-web-v2
git fetch --all
git status                   # ¿hay cambios sin commitear de la sesión anterior?
git pull --rebase origin main
git log --oneline -5         # mirar los últimos commits antes de continuar
```

Reglas:

1. **Nunca editar `main` directo.** Crear rama por feature:
   - Diseño: `design/<seccion>-v<n>` (ej. `design/hero-polish`, `design/featured-v2`)
   - Contenido/ajustes: `content/<seccion>` o `fix/<scope>`
2. **Si `git status` muestra cambios sin commitear de ayer**, NO hacer pull con rebase
   ciegamente — revisar qué son primero (stash o commit).
3. **Si hay divergencia con `main`** (`git log HEAD..origin/main` no vacío), hacer pull
   antes de tocar archivos.

---

## 🛬 End-of-session ritual (antes de cerrar, SIEMPRE)

```bash
pnpm lint && pnpm type-check            # validar
git add -A
git commit -m "feat|fix|chore(scope): resumen"
git push -u origin <rama>               # push aunque sea WIP
```

Reglas:

1. **Ningún commit se queda local.** Si la sesión se corta por créditos o cierre,
   lo que no esté pusheado se pierde para la otra máquina.
2. **Commits atómicos:** `feat(hero): animación de entrada de headline`, no
   "cambios de la tarde".
3. **Si quedó a medias**, commit como `wip(hero): ajustes parciales, continuar desde X`
   y push igual. Mejor WIP pusheado que trabajo limpio perdido.
4. **Actualizar `docs/BITACORA.md`** con entrada nueva al inicio (fecha, tasks, commits,
   decisiones, próximo paso).

---

## 🔀 Branch policy para diseño

| Rama                      | Cuándo usarla                                                          |
| ------------------------- | ---------------------------------------------------------------------- |
| `main`                    | Solo merges aprobados de otras ramas. Nunca editar directo.            |
| `design/<seccion>-v<n>`   | Trabajo grande de sección (p.ej. `design/hero-v3`, `design/footer-v1`) |
| `design/<seccion>-polish` | Pulir detalles pequeños (textos, timings, spacing)                     |
| `content/<area>`          | Cambios de copy o contenido sin tocar estructura                       |
| `fix/<scope>`             | Bugs específicos                                                       |

Merge a `main` solo cuando la sección quedó aprobada visualmente y pasan `lint` + `type-check`.

---

## 🖥️ Diagrama multi-máquina

```
┌─────────────────┐        ┌─────────────────────┐        ┌─────────────────┐
│  Máquina: Code  │  pull  │   GitHub: origin    │  pull  │  Máquina: Casa  │
│                 │ ─────> │  mobbitrips-web-v2  │ <───── │                 │
│  Claude Code    │ <───── │       main          │ ─────> │  Claude Code    │
└─────────────────┘  push  └─────────────────────┘  push  └─────────────────┘
          │                          ▲                              │
          │ referencia               │ commit + push                │ referencia
          ▼                          │                              ▼
  design/exports/*.html    ─ ─ ─ ─ ─ ┘                   design/exports/*.html
  (inmutables, versionados)                              (mismos archivos)
```

**Regla de oro:** si las dos máquinas no tienen el mismo `git log` al inicio de la
sesión, hay un problema de sync. Siempre `git fetch && git status` antes de editar.

---

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

---

## 🚨 Anti-patrones confirmados (aprendidos en vivo)

- ❌ **Editar sin hacer `git pull` primero.** Causó pérdida de 1 día el 2026-04-24:
  se trabajó en casa, se pusheó, pero la otra máquina no hizo pull y re-editó encima.
- ❌ **Terminar sesión sin push.** Aunque la regla esté documentada, si el hook
  no está activo es fácil olvidarlo cuando se cortan los créditos.
- ❌ **Editar `main` directo para ajustes "rápidos".** Termina bloqueando merges
  de otras ramas.
- ❌ **Re-exportar desde Claude Design y sobreescribir el HTML anterior.** Siempre
  versionar `-v1`, `-v2`, `-v3`.

Ver `docs/METODOLOGIA_DISENO_WEB.md` para la versión genérica y replicable de
esta metodología (aplicable a cualquier proyecto de diseño web).
