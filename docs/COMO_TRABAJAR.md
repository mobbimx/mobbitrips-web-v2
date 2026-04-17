# 🧭 Cómo trabajar con Claude Code en este proyecto

> Esta es tu guía de uso. Léela **una vez completa** antes de arrancar. Después consúltala solo cuando dudes sobre un ritual específico.

---

## 🎯 Filosofía

El proyecto tiene mucha información. No intentes tenerla toda en la cabeza. **Deja que el sistema la tenga por ti.** Tu trabajo es dirigir, aprobar y revisar, no memorizar.

**Los tres archivos vivos** que usas constantemente:

1. `docs/BITACORA.md` → dónde quedamos la última vez
2. `docs/SPRINT_ACTUAL.md` → qué toca hoy
3. `CLAUDE.md` → reglas y contexto mínimo

Todo lo demás es referencia que consultas cuando necesites profundidad.

---

## 📅 Ritual de sesión (el corazón del sistema)

### 🟢 1. Abrir sesión (2 minutos)

Abre terminal, navega al repo, ejecuta:

```bash
cd mobbitrips
claude
```

Tu primer mensaje, **siempre el mismo**:

```
Continuamos. Lee CLAUDE.md, docs/BITACORA.md y docs/SPRINT_ACTUAL.md.
Dame un resumen en 3 líneas: último avance, próximo paso y bloqueos.
```

Claude leerá los tres archivos y te dará el estado del proyecto. Tú decides si continuar o cambiar de rumbo.

### 🔵 2. Arrancar una task

```
Procedamos con la siguiente task del sprint. Antes de escribir código:
1. Muéstrame tu plan en bullets.
2. Lista archivos a crear o modificar.
3. Lista integraciones o eventos que toca.
4. Espera mi OK.
```

Claude propone. Tú apruebas, rechazas o ajustas.

**Si quieres elegir tú mismo qué task**:

```
Dame las 3 siguientes tasks pendientes del sprint y elijo.
```

### 🟡 3. Durante la task

Claude va construyendo. Tú revisas. Es normal interrumpir si:

- Se está yendo por un camino que no te gusta.
- Propone algo que no entiendes.
- Quieres agregar una consideración.

**No hay castigo por interrumpir.** Es mejor corregir temprano que tarde.

### 🟣 4. Cerrar una task

```
Task terminada. Ejecuta:
1. pnpm lint
2. pnpm type-check
3. Valida los criterios de aceptación de CLAUDE.md.
4. Dime qué cumple y qué no.
```

Si todo está verde:

```
Haz commit con mensaje convencional y actualiza SPRINT_ACTUAL.md marcando la task como completada.
```

### 🔴 5. Cerrar la sesión

**Siempre**, antes de cerrar terminal:

```
Cerramos sesión. Actualiza docs/BITACORA.md con una nueva entrada al inicio del registro.
Incluye: fecha, tasks cerradas, commits, preview URL si aplica, decisiones, bloqueos, próximo paso.
```

Claude escribe la entrada. Tú la revisas rápido. Commit.

```
git add docs/BITACORA.md docs/SPRINT_ACTUAL.md
git commit -m "docs: session update $(date +%Y-%m-%d)"
git push
```

Y cierras. Mañana retomas sin drama.

---

## 🧰 Frases estándar (copy-paste friendly)

### Para avanzar

| Situación | Frase |
|---|---|
| Abrir sesión | `Continuamos. Lee CLAUDE.md, docs/BITACORA.md y docs/SPRINT_ACTUAL.md. Dame un resumen en 3 líneas.` |
| Siguiente task | `Procedamos con la siguiente task del sprint. Propón plan, archivos y eventos. Espera OK.` |
| Elegir task | `Dame las 3 siguientes tasks pendientes y elijo.` |
| Task específica | `Trabajemos la task [ID]. Propón plan primero.` |
| Cerrar task | `Task terminada. Corre lint y type-check. Valida criterios. Dime qué falta.` |
| Commit | `Haz commit atómico con mensaje convencional y actualiza SPRINT_ACTUAL.md.` |
| Cerrar sesión | `Cerramos. Actualiza BITACORA.md con entrada nueva al inicio.` |

### Para resolver dudas

| Situación | Frase |
|---|---|
| No entiendo algo | `Explícame qué está haciendo [X] y por qué lo eliges así.` |
| Validar decisión | `Antes de implementar, ¿hay otra forma de hacerlo? Dame 2-3 opciones con pros y contras.` |
| Cuestionar scope | `Esta task se siente grande. ¿La dividimos en subtasks más pequeñas?` |
| Rechazar propuesta | `No me convence ese approach. Propón otro.` |
| Pedir ejemplo | `Muéstrame un ejemplo concreto de cómo quedaría el código antes de escribirlo.` |

### Para debugging

| Situación | Frase |
|---|---|
| Error inesperado | `Obtuve este error: [pega error]. ¿Qué lo causa y cómo lo arreglamos?` |
| Tests rojos | `Los tests fallaron. Analiza y propón fix.` |
| Performance mala | `Lighthouse bajó a [score] en [métrica]. Investiga y propón mejora.` |
| Bloqueo externo | `Estoy bloqueado con [servicio externo] porque [razón]. Regístralo en BITACORA.md como bloqueo activo.` |

### Para gestión del proyecto

| Situación | Frase |
|---|---|
| Cerrar sprint | `Cerramos Sprint [X.Y]. Archiva SPRINT_ACTUAL.md en docs/sprints/completados/ y crea el siguiente con las tasks del próximo sprint.` |
| Decisión arquitectónica | `Decidí [X]. Crea un ADR en docs/decisiones/ con justificación e impacto.` |
| Nueva dependencia | `Propongo agregar [paquete]. Justifícalo en el contexto del proyecto antes de instalar.` |

---

## 🚦 Cuándo sí intervenir, cuándo no

### ✅ Intervén siempre si:

- Claude propone algo que contradice `CLAUDE.md` o `docs/MASTER.md`.
- No entiendes lo que está haciendo.
- Sientes que está sobre-ingenieriando (archivos innecesarios, capas de abstracción).
- Los tiempos se están inflando (una task de 2pts lleva 3h).
- Está por tocar algo de producción sin avisar.

### 🟢 Deja que fluya si:

- Está escribiendo código rutinario (componentes, tests, tipos).
- Está siguiendo un patrón establecido del proyecto.
- Está refactorizando algo previamente aprobado.
- Está corriendo validaciones (lint, tests, type-check).

### 🔴 Para todo si:

- Está por ejecutar `rm -rf`, `DROP TABLE`, `git push --force`.
- Está por borrar archivos o carpetas que no son claramente temporales.
- Va a commitear archivos `.env*` o secrets.
- Va a modificar `docs/MASTER.md` sin tu visto bueno.

---

## 📊 Manejo del tiempo

Este proyecto está calibrado para **~15 horas/semana**. Eso significa:

- Sprints de 1 semana del prompt maestro = **2 semanas reales** para ti.
- Una sesión típica es de **1.5 a 3 horas**.
- En 15h/semana caben **5-8 sesiones** cortas o **3-5 sesiones** largas.
- Fase 1 completa (6 sprints maestros) → **12 semanas tuyas** ≈ 3 meses.

**No te obsesiones con "ir atrasado"**. El sistema está diseñado para tu ritmo real. La velocidad viene después, cuando el stack esté afinado y tú tengas reflejos con Claude Code.

### Señales de que vas bien

- Cierras al menos 1 task por sesión.
- La bitácora se actualiza consistentemente.
- Preview deploys se ven bonitos.
- Cada vez dudas menos en los rituales.

### Señales de que algo anda mal

- Pasaste 3 sesiones sin cerrar ninguna task.
- La bitácora tiene días sin actualizarse.
- Tienes más bloqueos que tasks cerradas.
- Te sientes perdido al abrir el repo.

Si ves señales de alarma, haz una **sesión de reset**: solo lee BITACORA y SPRINT_ACTUAL, identifica qué te traba, y si es necesario renegocia el scope o reorganiza el sprint.

---

## 📚 Decisiones arquitectónicas (ADRs)

Cuando tomes una decisión que cambia la arquitectura (cambiar una librería, agregar un servicio, modificar un flujo), **documéntala** como ADR.

```
Decidí [qué]. Crea un ADR en docs/decisiones/ con este template:
- Título
- Fecha
- Contexto (por qué se planteó esto)
- Opciones evaluadas
- Decisión tomada
- Consecuencias (positivas y negativas)
- Alternativas descartadas
```

Esto vale la pena especialmente para decisiones irreversibles o caras de revertir. Ejemplos de ADRs ya tomados viven en `docs/decisiones/`.

---

## 🛟 Cuando te sientas perdido

**Respira.** Hay tres escaleras de emergencia:

### Escalera 1: Releer el estado

```
Lee docs/BITACORA.md completo y hazme un resumen de los últimos 7 días.
¿Qué logramos, qué se bloqueó, qué decisiones tomamos?
```

### Escalera 2: Replanear el sprint

```
Estoy desorientado. Revisa SPRINT_ACTUAL.md y propón:
1. ¿Qué tasks son realmente críticas esta semana?
2. ¿Podemos posponer alguna al siguiente sprint?
3. ¿Hay bloqueos que no están documentados?
```

### Escalera 3: Volver a la visión

Abre `docs/MASTER.md` (sí, el largo) y lee la sección 1 "Visión de ecosistema". Te recuerda por qué estás haciendo esto y cómo encaja cada pieza.

Si sigues perdido después de eso, **toma un descanso**. El proyecto va a estar mañana. Tu claridad mental es más importante que avanzar un día más.

---

## 🎨 Cuando cambies de rumbo

Es normal y hasta saludable replantearse el plan. Para cambios grandes:

1. **Documenta el "por qué"** en `docs/BITACORA.md`.
2. **Actualiza el MASTER** si la visión cambió (sección apropiada + bitácora de decisiones).
3. **Reorganiza el SPRINT_ACTUAL** con las nuevas prioridades.
4. **Avisa al equipo** si hay equipo.

**Lo que NO debes hacer**: cambiar sobre la marcha sin documentar. En 2 semanas no vas a recordar por qué tomaste esa decisión, y Claude tampoco.

---

## 💡 Tips que aprendí a la mala

1. **Commits pequeños ganan**. Un commit por task (o subtask) es mejor que un mega-commit de "todo el día". Te permite hacer rollback quirúrgico.

2. **Preview deploys son tu amigo**. Cada PR debe tener preview. Compartir URL con socios/clientes es 10x más efectivo que describir lo que hiciste.

3. **`.env.local` es sagrado**. Jamás lo commitees. Si por error lo haces, rotate todas las credenciales inmediatamente.

4. **Branch por feature**. `main` siempre verde. Feature branches con nombres claros: `feat/hero-section`, `fix/booking-widget-price`.

5. **Pide code review a Claude mismo**. Antes de mergear: `Revisa este PR como senior engineer, busca bugs, mejoras, code smells.`

6. **El lunes es para planear**. Reserva 30min los lunes para leer bitácora de la semana anterior y ajustar SPRINT_ACTUAL.md.

7. **El viernes es para cerrar**. Reserva 30min los viernes para cerrar commits abiertos, actualizar bitácora y no dejar cosas a medias.

8. **Duerme la decisión**. Para decisiones grandes (cambiar stack, dropear feature), duerme una noche antes de ejecutar.

---

## 🔌 Herramientas complementarias útiles

Además de Claude Code y el repo, te van a servir:

| Herramienta | Para qué |
|---|---|
| **ClickUp** | Tracking visual de todas las tasks (complementa el SPRINT_ACTUAL.md) |
| **Vercel dashboard** | Ver deploys, logs, analytics |
| **Supabase dashboard** | Inspeccionar DB, ver queries, gestionar auth |
| **GitHub mobile app** | Revisar PRs y commits desde el teléfono |
| **Cal.com o Google Calendar** | Bloquear sesiones de trabajo recurrentes |

---

## 🎬 Ejemplo de primera sesión

Para que tengas idea concreta de cómo se ve el primer día:

```
Tú: Continuamos. Lee CLAUDE.md, docs/BITACORA.md y docs/SPRINT_ACTUAL.md.
    Dame un resumen en 3 líneas.

Claude: Hola. Sprint 1.0 (Setup) recién arrancado, 0/15 tasks cerradas.
        Próximo paso: S1.0-1 Crear monorepo Turborepo con pnpm workspaces.
        Sin bloqueos. ¿Arrancamos?

Tú: Procedamos con S1.0-1. Propón plan, archivos y eventos. Espera OK.

Claude: Plan:
        1. Ejecutar `pnpm dlx create-turbo@latest` en directorio raíz.
        2. Seleccionar template básico con apps/web.
        3. Configurar pnpm-workspace.yaml.
        4. Agregar packages/ vacío.
        5. Primer commit: "chore: init turborepo with pnpm workspaces".

        Archivos creados: package.json, turbo.json, pnpm-workspace.yaml,
        apps/web/package.json, .gitignore.
        Eventos tocados: ninguno (setup inicial).

        ¿OK para proceder?

Tú: OK.

Claude: [ejecuta comandos, crea archivos, hace commit]
        S1.0-1 completada. Commit a1b2c3d.
        ¿Continuamos con S1.0-2 o cerramos sesión?

Tú: Continuamos con S1.0-2. Mismo protocolo.

...

[al final del día]

Tú: Cerramos. Actualiza BITACORA.md con entrada nueva al inicio.

Claude: [escribe entrada con fecha, tasks cerradas, commits, próximo paso]
        ¿Reviso y commit?

Tú: Dale.

Claude: [commit "docs: session update 2026-04-20"]
        Listo. Hasta mañana.
```

Literal así es el flujo. Lo vas a tener dominado en 3-4 sesiones.

---

## ❓ FAQ rápido

**¿Y si me salto la bitácora un día?**
No pasa nada. La siguiente sesión le pides a Claude que revise los commits recientes (`git log --oneline -20`) y reconstruya. Pero trata de no volverlo hábito.

**¿Puedo saltarme sprints?**
No recomendado. Los sprints construyen sobre el anterior. Si una task te da flojera, renegocia su scope, no la brinques.

**¿Cómo sé si voy a buen ritmo?**
15h/semana + cerrar 1-2 tasks por sesión = vas bien. Si cierras menos, no te autoflageles, solo ajusta el scope.

**¿Qué hago si Claude propone algo y no sé si es buena idea?**
Pide alternativas: `Dame 2-3 opciones más con pros y contras`. O duerme la decisión si es grande.

**¿Qué hago si se rompe algo en producción?**
Primero, revertir (rollback del último deploy en Vercel, toma 1 click). Después, sesión de post-mortem: qué falló, por qué, cómo prevenir. Registra el incidente en un runbook en `docs/runbooks/`.

---

**Última actualización**: abril 2026 · **Versión**: 1.0

*Este documento es vivo. Si descubres un ritual nuevo que funciona, agrégalo.*
