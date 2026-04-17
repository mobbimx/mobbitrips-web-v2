# 📓 Bitácora Mobbitrips

> Log cronológico de sesiones de trabajo. **Las entradas más recientes van arriba.**
> Claude Code actualiza este archivo al cierre de cada sesión.

---

## 📋 Formato de entrada

```markdown
## YYYY-MM-DD · Sesión N (día HH:MM-HH:MM)
**Sprint**: X.Y · **Trabajé con**: [nombre]
**Tasks cerradas**: [IDs]
**Tasks en progreso**: [IDs]
**Commits**: [hash corto] "mensaje"
**Preview deploy**: [URL si aplica]
**Métricas**: [Lighthouse, tests, etc. si aplica]
**Decisiones tomadas**: [descripción breve, o "Ninguna"]
**Bloqueos**: [descripción, o "Ninguno"]
**Próximo paso**: [qué sigue]
**Notas**: [contexto adicional útil para la siguiente sesión]
```

---

## 🎬 Ejemplos de entradas (borrar cuando arranques)

### Ejemplo 1 — Sesión de setup

```markdown
## 2026-04-20 · Sesión 1 (lunes 10:00-12:30)
**Sprint**: 1.0 · **Trabajé con**: Daniel
**Tasks cerradas**: S1.0-1, S1.0-2, S1.0-3
**Tasks en progreso**: S1.0-4 (config next/font)
**Commits**:
- `a1b2c3d` chore: init turborepo with pnpm workspaces
- `e4f5g6h` chore: setup next.js 14 with typescript strict
- `i7j8k9l` chore: configure tailwind with mobbitrips palette
**Preview deploy**: https://mobbitrips.vercel.app (setup inicial, solo healthcheck)
**Decisiones tomadas**: Ninguna nueva, seguimos master.
**Bloqueos**: Ninguno.
**Próximo paso**: S1.0-4 configurar next/font con Comfortaa+Inter. Después S1.0-5 ESLint+Prettier+Husky.
**Notas**: El warning de Tailwind v3 sobre "content" array era falso positivo, ya tiene paths correctos. Vercel connected al repo con preview deploys automáticos en PRs.
```

### Ejemplo 2 — Sesión productiva

```markdown
## 2026-04-22 · Sesión 3 (miércoles 09:00-13:00)
**Sprint**: 1.1 · **Trabajé con**: Daniel
**Tasks cerradas**: S1.1-4 (Navbar), S1.1-5 (Footer), S1.1-6 (WhatsAppFloatingButton)
**Commits**:
- `m1n2o3p` feat(web): add scroll-aware navbar with mobile drawer
- `q4r5s6t` feat(web): add footer with 4 columns and newsletter stub
- `u7v8w9x` feat(web): add floating whatsapp button with pulse animation
**Preview deploy**: https://mobbitrips-pr-12.vercel.app
**Métricas**: Lighthouse 92/98/100/100 en /
**Decisiones tomadas**:
- Usamos altura 72px → 64px al scroll (no 80→64 como el prompt original), se veía más proporcionado.
- El drawer mobile usa `x: 100% → 0` con duration 300ms (Framer Motion default cubic bezier).
**Bloqueos**: Ninguno.
**Próximo paso**: S1.1-7 HeroSection con buscador integrado. Es la task más grande del sprint (5 story points), probablemente toma toda una sesión.
**Notas**: El logo-white.png todavía no está en public/, usamos un filtro CSS `brightness(0) invert(1)` mientras tanto en el footer. Daniel va a subir el PNG definitivo.
```

### Ejemplo 3 — Sesión con bloqueo

```markdown
## 2026-04-28 · Sesión 8 (lunes 14:00-15:30)
**Sprint**: 1.2 · **Trabajé con**: Daniel
**Tasks cerradas**: Ninguna (sesión bloqueada).
**Tasks en progreso**: S1.2-1 (cliente Hostex)
**Commits**: Ninguno.
**Decisiones tomadas**: Ninguna.
**Bloqueos**:
- El token HOSTEX_API_TOKEN está inválido, devuelve 401. Daniel va a regenerar en el panel de Hostex.
- Sin token no podemos avanzar con tasks S1.2-1 a S1.2-7.
**Próximo paso**: Daniel regenera token, lo guarda en .env.local y en Vercel env vars, siguiente sesión retomamos S1.2-1.
**Notas**: Mientras tanto avancé con mocks.ts (S1.2-5) de forma especulativa, no commiteado. Está en WIP local.
```

---

## 📝 Registro de sesiones

<!--
INSTRUCCIONES:
- Agregar nuevas entradas AL INICIO de esta sección (debajo de esta línea).
- Mantener las más antiguas abajo.
- Formato idéntico al de los ejemplos.
- Si la sesión fue muy corta (<30min) o solo fue revisión, puedes anotarla como "check-in" sin tasks.
- Si hubo emergencia o hotfix en producción, marcar con 🚨 al inicio del título.
-->

<!-- Primera entrada real irá aquí cuando arranques Sprint 1.0 -->

---

## 📊 Resumen del proyecto

**Inicio del proyecto**: [fecha del primer commit]
**Fase actual**: Fase 1 - MVP Web
**Sprint actual**: 1.0 - Setup
**Tasks completadas totales**: 0 / ~192
**Última sesión productiva**: ninguna aún
**Preview más reciente**: —
**Producción**: no desplegada aún

---

## 🔗 Enlaces útiles

- **Repo**: [URL de GitHub]
- **Vercel**: [URL del proyecto]
- **Supabase**: [URL del dashboard]
- **ClickUp**: [URL del Space Mobbitrips]
- **Master prompt**: `docs/MASTER.md`
- **Sprint actual**: `docs/SPRINT_ACTUAL.md`
- **Cómo trabajar**: `docs/COMO_TRABAJAR.md`
