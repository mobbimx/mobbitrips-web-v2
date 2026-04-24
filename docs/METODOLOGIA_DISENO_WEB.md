# Metodología de Diseño Web — Claude Design ↔ Claude Code

> **Documento replicable.** Diseñado para copiarse a cualquier proyecto de diseño
> web (Mobbitrips, Medusssa, futuros clientes). Solo cambian los nombres de secciones,
> el design system y el repo.

---

## 🖥️ Visualizador canónico (ÚNICO, idéntico en toda máquina)

**Antes de cualquier filosofía, una regla operativa dura:**

```bash
pnpm dev --filter=web            # (o el comando equivalente del framework del cliente)
# Abrir: http://localhost:3000
```

Este es el ÚNICO visualizador del proyecto. Misma máquina del operador, máquina
de su casa, máquina de cualquier colaborador → `http://localhost:3000`.

**Prohibido:**

- ❌ Abrir archivos `.html` del repo con `file:///...` como forma de "ver el diseño".
- ❌ Live Server de VS Code, `http-server`, `serve`, `npx serve`, o cualquier otro
  servidor estático apuntando al repo.
- ❌ "Preview" de IDE, extensión o herramienta de terceros.
- ❌ Cualquier URL distinta del dev server oficial para ver trabajo en curso.

**Permitido:**

- ✅ Puerto alternativo si 3000 está ocupado (`-p 3001`), avisando al equipo.
- ✅ Preview de Vercel (URLs `*.vercel.app`) para revisión de ramas ya pusheadas,
  NUNCA para trabajo activo.
- ✅ Abrir `design/exports/*.html` SOLO como referencia puntual de diseño
  (no como visualizador de trabajo).

Ver el archivo de reglas inmutables del proyecto (`docs/REGLAS_INMUTABLES.md`) para el detalle.

---

## 0. Filosofía

Dos herramientas, dos roles, un source of truth.

- **Claude Design** (app.claude.ai con subagentes de diseño): genera y rediseña
  **secciones completas** como HTML standalone. Es donde nace y muere el diseño.
- **Claude Code** (CLI, este repo): adapta el HTML a código de producción, pule
  detalles pequeños, conecta datos reales, mantiene la calidad técnica.
- **GitHub `main`**: source of truth. Nadie trabaja en "su copia local". Todas las
  máquinas parten del mismo punto al iniciar cada sesión.

**Regla base:** si una pieza de trabajo no está pusheada, no existe.

---

## 1. Setup inicial del proyecto (una sola vez por cliente)

### 1.1 Estructura de carpetas

```
<repo-cliente>/
├── CLAUDE.md                          ← contexto de proyecto para Claude Code
├── docs/
│   ├── METODOLOGIA_DISENO_WEB.md      ← este archivo, copiado del template
│   ├── BITACORA.md                    ← log cronológico de sesiones
│   └── SPRINT_ACTUAL.md               ← qué toca hoy
├── design/
│   ├── WORKFLOW.md                    ← flujo específico de este proyecto
│   └── exports/                       ← HTMLs de Claude Design (inmutables)
│       ├── hero-v1.html
│       ├── hero-v2.html
│       └── ...
├── .claude/
│   └── settings.json                  ← hooks compartidos del equipo
└── apps/web/src/components/sections/  ← componentes resultantes
```

### 1.2 Archivos a copiar del template

1. `docs/METODOLOGIA_DISENO_WEB.md` — este archivo, sin cambios.
2. `design/WORKFLOW.md` — ajustar lista de secciones y design tokens del cliente.
3. `.claude/settings.json` — hooks de `SessionStart` y `Stop` (ver sección 5).
4. `CLAUDE.md` — reglas del proyecto (marca, paleta, anti-patrones, stack).

### 1.3 Memoria del equipo

Cada operador guarda en su memoria local de Claude Code:

- **Regla feedback:** "Antes de editar: `git fetch && git status`. Antes de cerrar
  sesión: `git add && commit && push` aunque sea WIP."
- **Proyecto referencia:** contexto del cliente (stack, paleta, responsables).
- **Referencia:** URL del repo + branch principal.

Opcional pero recomendado: repo privado `<equipo>-claude-memory` con un clone de
la carpeta `~/.claude/projects/.../memory/` compartida entre máquinas del mismo
operador para que las reglas viajen automáticamente.

---

## 2. Roles claros

### Claude Design genera

- Secciones completas: Hero, Features, CTA, Footer, Landings nuevas.
- Rediseños grandes: cambio de layout, composición, variante visual.
- Design system visual coherente (paleta, tipografía, spacing, motion).
- Salida: **HTML standalone** con CSS y JS embebidos.

### Claude Code pule

- Extracción de JSX/CSS del HTML a componentes TypeScript.
- Adaptación a framework (Next.js, Astro, Remix, etc.): `Link`, `Image`, Server
  Components, hooks reales.
- Conexión a datos reales (CMS, APIs, formularios funcionales).
- Detalles finos: responsive edge cases, accesibilidad, performance, timings de
  animación, spacing fino, a11y.
- Validación técnica: `lint`, `type-check`, Lighthouse.

### GitHub orquesta

- `main` = lo último aprobado.
- Ramas de trabajo por sección/feature.
- Merges solo cuando la sección pasa QA visual + técnico.
- **No se trabaja en `main` directo.**

---

## 3. Preflight checklist (al iniciar cualquier sesión)

```bash
cd <repo>
git fetch --all
git status
git pull --rebase origin main
git log --oneline -10       # mirar qué pasó desde la última vez
git branch -a               # ¿hay ramas de diseño activas?
```

**Decisión tree:**

- ¿Cambios locales sin commitear? → evaluar: `git stash` o commit inmediato,
  NUNCA descartar sin revisar.
- ¿Hay ramas `design/*` abiertas sin mergear? → continuar ahí, no abrir una nueva.
- ¿Todo limpio y sincronizado? → crear rama nueva para el trabajo de hoy.

---

## 4. Flujo por tipo de tarea

### Tarea grande (nueva sección o rediseño)

```
1. Claude Design genera HTML standalone.
2. Descargar y guardar en design/exports/<seccion>-v<n>.html (NUNCA sobreescribir).
3. git checkout -b design/<seccion>-v<n>
4. Claude Code crea apps/web/src/components/sections/<Seccion>.tsx extrayendo
   JSX + CSS del HTML.
5. Validar en localhost en mobile (375px) y desktop (1440px).
6. Commit, push, PR, merge a main.
```

### Tarea pequeña (pulir detalles)

```
1. git checkout -b design/<seccion>-polish
2. Claude Code edita directamente el componente existente.
3. Cambios: copy, timings, spacing, animaciones, responsive.
4. Si los cambios afectan composición general → volver a Claude Design.
5. Commit, push, PR, merge a main.
6. Opcional: exportar HTML resultante para Claude Design como nueva referencia.
```

### Iteración (feedback de cliente)

```
1. Screenshot del estado actual + lista de feedback.
2. Decidir: ¿ajustes pequeños (Code) o rediseño (Design)?
3. Si Design: pasar screenshot + feedback como contexto → export v(n+1).html.
4. Si Code: rama design/<seccion>-polish + ajustes directos.
```

---

## 5. Hooks automáticos (`.claude/settings.json`)

Hooks que se activan en cualquier máquina que clone el repo. Viven con el código,
no en la memoria local.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "git fetch --all --quiet 2>/dev/null; git status --short; echo '---'; git log --oneline -5"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "if [ -n \"$(git status --porcelain)\" ]; then echo 'AVISO: hay cambios sin commitear. Ejecuta git add && git commit && git push antes de cerrar.'; fi"
          }
        ]
      }
    ]
  }
}
```

Cada operador aprueba los hooks la primera vez que el repo se abre en su máquina.

---

## 6. End-of-session ritual (NUNCA saltarse)

```bash
# 1. Validar técnicamente
pnpm lint
pnpm type-check

# 2. Capturar trabajo
git add -A
git commit -m "<type>(<scope>): <resumen>"

# 3. Publicar (aunque sea WIP)
git push -u origin <rama>

# 4. Actualizar bitácora
# Editar docs/BITACORA.md con una entrada nueva al inicio:
#   - Fecha, tasks cerradas, commits (hashes), decisiones, bloqueos, próximo paso

# 5. Commit final de bitácora
git add docs/BITACORA.md
git commit -m "chore: bitacora sesion <n>"
git push
```

**Si se están acabando los créditos:** commit WIP + push inmediato. Mejor un commit
"wip: a medias" pusheado que trabajo limpio perdido.

---

## 7. Naming conventions

### Ramas

- `design/<seccion>-v<n>` → sección nueva o rediseño grande
- `design/<seccion>-polish` → pulir detalles
- `content/<area>` → solo cambios de copy
- `fix/<scope>` → bugs

### Commits

- `feat(<scope>): <descripción>` → feature nueva
- `fix(<scope>): <descripción>` → bug fix
- `design(<scope>): <descripción>` → ajuste visual
- `chore(<scope>): <descripción>` → tareas mantenimiento
- `wip(<scope>): <descripción>` → trabajo a medias (solo en ramas, nunca en main)

### Exports de Claude Design

- `design/exports/<seccion>-v<n>.html` → versión aprobada
- `design/exports/<seccion>-v<n>-editable.html` → versión editable si Design la provee
- **Nunca** sobreescribir un `-v<n>` aprobado. Siempre incrementar.

### Componentes

- `PascalCase.tsx` un componente por archivo
- Secciones en `src/components/sections/`
- Compartidos en `src/components/ui/` o package `@<org>/ui`

---

## 8. Anti-patrones (confirmados por incidentes reales)

| Anti-patrón                     | Qué pasa                                                       | Regla                     |
| ------------------------------- | -------------------------------------------------------------- | ------------------------- |
| Editar sin `git pull` al inicio | Se pisan cambios de otra máquina                               | **Preflight obligatorio** |
| Cerrar sesión sin push          | Trabajo perdido si la otra máquina hace pull primero           | **Hook `Stop` que avisa** |
| Sobreescribir HTML exportado    | Se pierde la versión anterior, no hay historial de iteraciones | **Versionar `-v<n>`**     |
| Editar `main` directo           | Bloquea otras ramas, no hay review                             | **Siempre rama**          |
| Rediseño grande desde Code      | Se rompe la coherencia del design system                       | **Usar Claude Design**    |
| Pulir detalles en Claude Design | Desperdicia tokens, re-genera todo                             | **Pulir en Code**         |

---

## 9. Checklist de replicación a nuevo cliente

Copiar este documento a un repo nuevo requiere solo:

- [ ] Copiar `docs/METODOLOGIA_DISENO_WEB.md` tal cual.
- [ ] Copiar `design/WORKFLOW.md` y ajustar: - Lista de secciones esperadas - Design tokens del cliente (paleta, fuentes, spacing)
- [ ] Copiar `.claude/settings.json` con los hooks (sección 5).
- [ ] Crear `CLAUDE.md` raíz con: - Identidad de marca del cliente - Stack técnico - Reglas de oro - Anti-patrones visuales del cliente
- [ ] Crear `docs/BITACORA.md` vacía con plantilla de entrada.
- [ ] Primera sesión: operador aprueba hooks al ejecutarse `SessionStart` por primera vez.
- [ ] Confirmar que `git fetch` inicial no muestra divergencia.

---

## 10. Casos borde

**"Trabajé ayer en casa y no sé si pusheé."**
→ `git fetch origin && git log HEAD..origin/<rama>` para ver si hay commits remotos
que no tienes local. Si los hay: pull. Si no: revisar `git log <rama>@{1.day.ago}..HEAD`
para ver qué hiciste que no está en remoto.

**"Dos máquinas editaron el mismo archivo sin sync."**
→ Git lo detecta en pull. Resolver conflictos manualmente, nunca usar `--ours`/`--theirs`
ciegamente. Si el archivo es un export de Design, conservar ambas versiones como
`-v<n>` y `-v<n+1>`.

**"Corrí `rm` o `git reset --hard` y perdí trabajo."**
→ `git reflog` muestra el HEAD de los últimos días, casi siempre se puede recuperar.
Nunca correr `git gc --prune=now` inmediatamente después.

**"Cliente pide cambio a última hora en demo."**
→ Rama `fix/demo-<fecha>`, commit aislado, merge y deploy. No mezclar con trabajo en curso.

---

**Versión:** 1.0 · **Última actualización:** 2026-04-24

_Feedback y mejoras a esta metodología: editar este archivo, commit, push. Todas las
máquinas y proyectos que la usen se benefician al siguiente `git pull`._
