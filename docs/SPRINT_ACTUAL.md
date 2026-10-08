# 🚀 Sprint Actual — Fase 0A: Base ligera

> Este archivo muestra **solo el sprint activo**. Al cerrarlo, se archiva en `docs/sprints/completados/` y se crea uno nuevo.
> El sprint anterior (1.5, del modelo de reservas directas) quedó archivado sin completar:
> `docs/sprints/completados/sprint-1.5-archivado-por-pivote.md`.

---

## 📌 Info del sprint

- **Fase**: 0A — Base ligera (primera del pivote del 2-oct-2026)
- **Inicio**: 2026-10-07
- **Rama / PR**: `wip/base-ligera-mac` → `portal` (PR #1, Draft = EN USO). Nunca a `main` (intocable hasta la Fase 9).
- **Objetivo**: partir de un sitio más ligero y ordenado antes de rehacer las pantallas. Sin lámpara de lava ni scroll suave global, con manchas ligeras solo detrás del buscador, textos en un solo archivo (listo para sumar inglés) y las guías del repo alineadas al rumbo nuevo.
- **Se ve al terminar**: la vista previa de `portal` en Vercel, más ligera, con la tabla antes/después de Lighthouse.
- **Regla que manda** (`docs/MOTION.md`): el rendimiento manda sobre la animación; Lighthouse móvil ≥ 90 para publicar.

---

## 📊 Progreso

**9 / 10 tareas listas** (0A.0, 0A.2 a 0A.9). Queda pendiente la vista previa de Vercel (0A.1: falta que Emilio apruebe el acceso); pasa a la siguiente fase.

---

## ✅ Hechas

- [x] **0A.0** Inventario de qué librería pesada usa cada archivo y qué sección muere en 1A.
- [x] **0A.2** Rama `portal`, protocolo de sesiones (`AGENTS.md`), candado pre-push, `scripts/merge-si-verde.sh` y CI (`lint` + `type-check` + `build`) — `74fc60d`.
- [x] **0A.3** Medición «antes» (build de producción local sobre `07b1687`, medianas de 3 corridas): Lighthouse móvil `/` **85** (LCP 4.2 s, TBT 110 ms) y `/propiedades` **86**; escritorio **99** en ambas. Tabla final en `docs/rendimiento/2026-10-0A.md`.
- [x] **0A.4** Peso global fuera: `AmbientCanvas` y Lenis salen del layout y se borran; se desinstalan `lenis`, `@rive-app/react-canvas` y `@lottiefiles/dotlottie-react` — `b3a2d74`.
- [x] **0A.5** Manchas ligeras solo detrás del buscador (`components/ambient/ManchasLigeras.tsx`) — `fdb5886`.
- [x] **0A.6** Textos del cascarón (metadatos, Navbar, Footer, botón flotante, 404) y del Hero en `apps/web/src/textos/es.ts` con `t()` — `9e613b5`.
- [x] **0A.7** Docs al rumbo nuevo: `docs/MOTION.md`, `docs/REGLAS_INMUTABLES.md`, hook de `.claude/settings.json`, `CLAUDE.md`, este archivo y la bitácora; se retira el agente `design-director` (ahora `disenador` + maquetación en vivo con opciones).

---

## 📋 Pendiente

- [ ] **0A.1** Confirmar la **vista previa de Vercel por rama**: acceso de escritura al repo ya funciona (hay PR #1), pero al 2026-10-08 el repo muestra 0 despliegues de Vercel. Sin esto no hay «lo que Emilio ve».
- [x] **0A.8** Medición «después» (local, alternando con «antes»; la primera corrida se descartó por método): compu 99 → 100, cel 85 → 87. Tabla en `docs/rendimiento/2026-10-0A.md`. Repetir sobre la vista previa cuando exista.
- [ ] **0A.9** Cierre: escaneo de secretos antes del push, PR listo (`scripts/mobbitrips-sesion.sh listo`), CI verde, `scripts/merge-si-verde.sh` a `portal`, link de la vista previa + tabla para Emilio.

---

## 🎯 Criterios de cierre de la fase

- [ ] Lighthouse móvil de la portada ≥ 90 (85 → 87; pasa a 1A: Hero con animaciones infinitas y vidrio esmerilado, LCP = texto del logo).
- [ ] Vista previa de `portal` funcionando en Vercel.
- [x] Tabla antes/después en `docs/rendimiento/`.
- [x] Sin `AmbientCanvas` ni Lenis; manchas ligeras solo detrás del buscador.
- [x] Textos del cascarón y del Hero fuera de los componentes (`apps/web/src/textos/es.ts`).
- [x] `pnpm lint`, `pnpm type-check` y `pnpm build` pasan; CI verde.

---

## 🚨 Bloqueos activos

- **0A.1 / 0A.8**: la medición «después» y lo que Emilio ve dependen de la vista previa de Vercel.

---

## 📝 Notas de la fase

- GSAP, split-type y Framer Motion **se quedan por ahora**: viven en secciones que 1A, 3A y 4A rehacen. 0A quita solo el peso global.
- Hostex sigue hasta 3A (resultados con mapa).
- Los textos de las demás secciones se mueven a `es.ts` cuando cada una se rehaga en su fase.

---

## 🔗 Fases

**Siguiente**: 1A — portada nueva (la maqueta hecha real, con opciones en vivo para elegir acomodo y detalles).
