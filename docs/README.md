# 📚 Documentación Mobbitrips

Esta carpeta contiene toda la documentación viva del proyecto.

## Archivos principales

| Archivo | Propósito | Quién lo actualiza |
|---|---|---|
| `MASTER.md` | Visión estratégica completa del ecosistema. La biblia del proyecto. | Tú (manualmente, cuando hay cambios arquitectónicos grandes). |
| `BITACORA.md` | Log cronológico de sesiones de trabajo. | Claude Code (al cierre de cada sesión). |
| `SPRINT_ACTUAL.md` | Tasks del sprint en curso. | Claude Code (al avanzar tasks) + tú (al planear). |
| `COMO_TRABAJAR.md` | Guía de rituales y frases para trabajar con Claude Code. | Ocasionalmente, cuando descubras nuevos rituales. |

## Subcarpetas

### `decisiones/` — ADRs (Architecture Decision Records)

Aquí viven las decisiones arquitectónicas importantes con su justificación. Formato estándar: título, contexto, opciones, decisión, consecuencias, alternativas descartadas.

Ejemplos ya presentes:
- `001-stripe-payu-dual.md`
- `002-zoho-one-erp.md`
- `003-mxn-only.md`

Cuando tomes una decisión grande, crea un ADR nuevo numerado consecutivamente.

### `runbooks/` — Procedimientos operativos

Guías paso a paso para operaciones recurrentes o de emergencia. Ejemplos futuros:
- `emitir-cfdi.md`
- `rollback-deploy.md`
- `agregar-propiedad.md`
- `onboarding-propietario.md`
- `responder-incidente-pago.md`

### `sprints/completados/` — Archivo histórico

Cuando un sprint cierra, `SPRINT_ACTUAL.md` se mueve aquí con nombre como `sprint-1.0.md`. Así puedes ver cómo evolucionaron los sprints a lo largo del proyecto.

## Cómo usar esta carpeta

### Para arrancar tu día

1. Lee `BITACORA.md` (últimas 2-3 entradas).
2. Lee `SPRINT_ACTUAL.md` completo.
3. ¡Listo para trabajar!

### Para planear

1. Relee sección relevante de `MASTER.md` (si aplica).
2. Ajusta `SPRINT_ACTUAL.md` si cambias prioridades.
3. Si tomas decisión grande, crea ADR en `decisiones/`.

### Para orientarse cuando estás perdido

1. `COMO_TRABAJAR.md` sección "Cuando te sientas perdido".
2. Relee sección 1 de `MASTER.md` (visión).
3. Respira y no te autoflagelies.

---

**Principio**: documenta lo suficiente para no perderte, pero no tanto que no avances.
