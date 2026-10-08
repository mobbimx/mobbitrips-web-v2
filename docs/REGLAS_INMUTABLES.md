# 🔒 Reglas Inmutables — Mobbitrips Web v2

> **NO MODIFICAR, NO SOBREESCRIBIR, NO NEGOCIAR.**
>
> Este archivo contiene las reglas que NO se tocan entre sesiones, máquinas o
> personas. Si algo aquí parece mal, antes de cambiarlo habla con Emilio.
> Versionado en el repo (rama `portal`) → todas las máquinas y todas las cuentas
> de Claude que clonen el repo las ven iguales. El protocolo completo de ramas y
> sesiones vive en `AGENTS.md`; aquí está lo que no se negocia.

---

## 🖥️ REGLA 1 — Visualizador canónico (único, idéntico en toda máquina)

**SIEMPRE se usa este y SOLO este visualizador:**

```bash
# Desde la raíz del repo
pnpm dev
# Abrir en navegador: http://localhost:3000
```

Comando alternativo (equivalente, solo el app web):

```bash
pnpm --filter @mobbitrips/web dev
```

- Esta máquina (escritorio Emilio): `http://localhost:3000`
- Máquina de casa (Emilio): `http://localhost:3000`
- Máquina de Medusssa / cualquier otro cliente con esta metodología: `http://localhost:3000`

### ❌ Prohibido

- ❌ Abrir `design/exports/*.html` directamente en el navegador con `file:///C:/...` como "forma de ver el diseño". **Nunca.** Ese HTML es referencia inmutable, no visualización de trabajo.
- ❌ Usar Live Server de VS Code apuntando a cualquier HTML del repo.
- ❌ Usar `http-server`, `serve`, o cualquier otro servidor estático sobre el repo.
- ❌ "Preview" de IDE, extensión, o herramienta de terceros.
- ❌ Cualquier URL distinta de `http://localhost:3000` para ver el resultado del trabajo en curso.

### ✅ Permitido

- ✅ Dev server de Next.js: `pnpm dev` desde la raíz → `http://localhost:3000`.
- ✅ Puerto alternativo SOLO si 3000 está ocupado: Next.js sugerirá otro puerto automáticamente. Avisar si eso pasa.
- ✅ **La vista previa de Vercel (URL `*.vercel.app` del PR/rama) es lo que Emilio ve y aprueba.** Su navegador vive en otra máquina: tu `localhost:3000` no es el suyo. Para enseñarle algo: push a tu rama `wip/…` → compártele el link de la vista previa. El trabajo activo se sigue haciendo y revisando en `localhost:3000`; la vista previa solo sale de ramas ya subidas a GitHub, nunca de una carpeta local.
- ✅ Abrir el HTML de `design/exports/` en navegador SOLO como referencia puntual ("¿cómo era este detalle del diseño de Claude Design?"), **nunca como visualizador de trabajo en curso**.

### Why

El 2026-04-24 Emilio perdió tiempo porque en una máquina se le pidió visualizar en `localhost:3000` y en otra se le mandó al `file:///` del HTML exportado. Dos visualizadores = dos experiencias distintas = metodología rota. UN SOLO visualizador, punto.

---

## 🔄 REGLA 2 — Preflight obligatorio al iniciar sesión

Al abrir Claude Code en CUALQUIER máquina, antes de tocar un solo archivo, desde TU worktree
(`~/Desktop/mobbitrips-sesiones/<tema>`, nunca desde la carpeta base):

```bash
git fetch --all --prune
git status
git pull --rebase origin portal
git log --oneline -5
scripts/mobbitrips-sesion.sh lista    # qué hay EN USO (PRs abiertos y worktrees)
```

Si hay divergencia, cambios sin commit, o cualquier cosa rara → **parar, avisar a Emilio, no editar nada hasta resolver**.

---

## 📤 REGLA 3 — Push obligatorio al cerrar sesión

Antes de cerrar sesión, acabarse los créditos, o cambiar de máquina:

```bash
git add -A
git commit -m "<type>(<scope>): <resumen>"   # WIP está OK si es WIP
git push -u origin wip/<tema>-<maquina>
```

**Sin excepciones.** Si quedó a medias: commit `wip(scope): ...` + push. Mejor WIP pusheado que trabajo limpio perdido.

---

## 🌿 REGLA 4 — Nunca editar `portal` ni `main` directo: worktree + rama + PR

- **`portal`** es la rama de trabajo e integración (rediseño y base ligera). Solo recibe cambios por **Pull Request con CI verde** (`pnpm lint` + `pnpm type-check` + `pnpm build`), integrados con `scripts/merge-si-verde.sh`.
- **`main`** es lo que sirve mobbitrips.com y **no se toca** hasta la Fase 9, cuando `portal` pase a ser `main` por decisión expresa de Emilio y José (01-PLAN, Fase 9).
- Cada sesión trabaja en **su propio worktree** (`~/Desktop/mobbitrips-sesiones/<tema>`) con una rama `wip/<tema>-<maquina>` (`<maquina>` = `mac` o `laptop`) y su PR en Draft (`[EN USO]`) hacia `portal`. Atajo: `scripts/mobbitrips-sesion.sh nueva <tema>`.
- Antes de integrar, Emilio revisa en la **vista previa de Vercel** del PR (Regla 1).

Detalle y conflictos: `AGENTS.md`.

---

## 🎨 REGLA 5 — División de herramientas

| Herramienta                       | Qué hace                                                             |
| --------------------------------- | -------------------------------------------------------------------- |
| **Claude Design** (app.claude.ai) | Genera/rediseña secciones completas. Salida: HTML standalone.        |
| **Claude Code** (CLI, este repo)  | Extrae JSX + CSS, pule detalles pequeños (textos, timings, spacing). |
| **GitHub `main`**                 | Source of truth único.                                               |

Rediseño grande → Claude Design. Detalles pequeños → Claude Code. Nunca al revés.

**Decisiones visuales → maquetación en vivo con opciones.** Cuando haya que elegir colores, formas, acomodo
o movimiento, las opciones se montan en la página real (máximo 3 más «Hoy») con un selector flotante
**temporal**, y Emilio elige viéndolas en la vista previa. La ganadora pasa a las reglas normales, se borra
todo lo temporal y **nunca se publica con el selector**. Se hace con el agente `disenador`.

---

## 📦 REGLA 6 — Versionar exports, nunca sobreescribir

Los HTML de `design/exports/` son **inmutables**. Nuevo export de Claude Design → `-v<n+1>`, nunca sobre `-v<n>`.

---

## 📋 REGLA 7 — BITÁCORA actualizada al cerrar sesión

`docs/BITACORA.md` se actualiza al final de cada sesión con entrada nueva AL INICIO del archivo:

- Fecha + hora
- Tasks cerradas
- Commits (hashes cortos)
- Decisiones tomadas
- Bloqueos activos
- Próximo paso sugerido

---

## 🚨 Si una regla aquí se rompe en una sesión

1. Parar inmediatamente.
2. Documentar qué pasó en BITACORA.
3. Reforzar la regla (añadir anti-patrón, subir severidad).
4. Compartir con el otro operador / máquina.

---

**Versión:** 2.0 · **Última actualización:** 2026-10-08 (rumbo `portal`, Fase 0A) · **Estado:** INMUTABLE

_Cualquier edición a este archivo debe ir en commit separado con mensaje
`chore(rules): <cambio>` y notificación explícita a Emilio._
