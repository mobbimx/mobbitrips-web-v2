# 🔒 Reglas Inmutables — Mobbitrips Web v2

> **NO MODIFICAR, NO SOBREESCRIBIR, NO NEGOCIAR.**
>
> Este archivo contiene las reglas que NO se tocan entre sesiones, máquinas o
> personas. Si algo aquí parece mal, antes de cambiarlo habla con Emilio.
> Versionado en `main` → todas las máquinas y todas las cuentas de Claude
> que clonen el repo las ven iguales.

---

## 🖥️ REGLA 1 — Visualizador canónico (único, idéntico en toda máquina)

**SIEMPRE se usa este y SOLO este visualizador:**

```bash
pnpm dev --filter=web
# Abrir en navegador: http://localhost:3000
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

- ✅ Dev server de Next.js: `pnpm dev --filter=web` → `http://localhost:3000`.
- ✅ Puerto alternativo SOLO si 3000 está ocupado: `pnpm dev --filter=web -- -p 3001` → `http://localhost:3001`. Avisar si eso pasa.
- ✅ Preview de Vercel (URLs `*.vercel.app`) SOLO para revisar ramas ya pusheadas — NO para trabajo activo.
- ✅ Abrir el HTML de `design/exports/` en navegador SOLO como referencia puntual ("¿cómo era este detalle del diseño de Claude Design?"), **nunca como visualizador de trabajo en curso**.

### Why

El 2026-04-24 Emilio perdió tiempo porque en una máquina se le pidió visualizar en `localhost:3000` y en otra se le mandó al `file:///` del HTML exportado. Dos visualizadores = dos experiencias distintas = metodología rota. UN SOLO visualizador, punto.

---

## 🔄 REGLA 2 — Preflight obligatorio al iniciar sesión

Al abrir Claude Code en CUALQUIER máquina, antes de tocar un solo archivo:

```bash
git fetch --all
git status
git pull --rebase origin main
git log --oneline -5
```

Si hay divergencia, cambios sin commit, o cualquier cosa rara → **parar, avisar a Emilio, no editar nada hasta resolver**.

---

## 📤 REGLA 3 — Push obligatorio al cerrar sesión

Antes de cerrar sesión, acabarse los créditos, o cambiar de máquina:

```bash
git add -A
git commit -m "<type>(<scope>): <resumen>"   # WIP está OK si es WIP
git push -u origin <rama>
```

**Sin excepciones.** Si quedó a medias: commit `wip(scope): ...` + push. Mejor WIP pusheado que trabajo limpio perdido.

---

## 🌿 REGLA 4 — Nunca editar `main` directo

Todo cambio va en rama:

- `design/<seccion>-v<n>` → rediseño grande
- `design/<seccion>-polish` → pulir detalles
- `content/<area>` → solo copy
- `fix/<scope>` → bugs

Merge a `main` solo con `lint` + `type-check` limpios y aprobación visual.

---

## 🎨 REGLA 5 — División de herramientas

| Herramienta                       | Qué hace                                                             |
| --------------------------------- | -------------------------------------------------------------------- |
| **Claude Design** (app.claude.ai) | Genera/rediseña secciones completas. Salida: HTML standalone.        |
| **Claude Code** (CLI, este repo)  | Extrae JSX + CSS, pule detalles pequeños (textos, timings, spacing). |
| **GitHub `main`**                 | Source of truth único.                                               |

Rediseño grande → Claude Design. Detalles pequeños → Claude Code. Nunca al revés.

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

**Versión:** 1.0 · **Última actualización:** 2026-04-24 · **Estado:** INMUTABLE

_Cualquier edición a este archivo debe ir en commit separado con mensaje
`chore(rules): <cambio>` y notificación explícita a Emilio._
