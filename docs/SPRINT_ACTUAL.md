# 🚀 Sprint Actual — Fase 1A: Portada nueva (cerrada)

> Este archivo muestra **solo el sprint activo**. El de la Fase 0A quedó en
> `docs/sprints/completados/fase-0A-base-ligera.md`.
> Rumbo y decisiones: `planeacion/proyectos/mobbitrips/00-PIVOTE.md` · plan de la fase: `…/fases/1A.md`.

---

## 📌 Info del sprint

- **Fase**: 1A — Portada nueva (opción A «Aire», elegida por Emilio el 9-oct)
- **Rama / PR**: `wip/portada-mac` → `portal` (PR #3). Nunca a `main` (intocable hasta la Fase 9).
- **Objetivo**: la maqueta hecha real: buscador centrado con manchas, destinos, franja «Anuncia tu casa» y «Un servicio de Mobbilink», sin casas en la portada.
- **Se ve al terminar**: vista previa de Vercel (`vercel deploy` sin `--prod`) con los detalles que eligió Emilio.

---

## ✅ Hechas

- [x] **1A.5 / 1A.6** Portada A en la página real y detalles de Emilio, uno por uno (13-oct): botón «Buscar» en coral de marca (`1a98b04`), tarjetas de Destinos con foto y créditos (`258e32e`), imagen al compartir crema con el logo oficial (`ea97560`).
- [x] **1A.7** Limpieza de la portada de mayo (`a904f56`).
- [x] **1A.8** Accesibilidad y metadatos: axe 0, Lighthouse Accesibilidad 100 (`ee9e1bd`, `fa6ea73`).
- [x] **1A.9** Rendimiento: cel `/` 89 → 96, compu 100, First Load `/` 242 → 105 kB; con fotos en Destinos, cel 93 en vista previa (`docs/rendimiento/2026-10-1A.md`).
- [x] **1A.10** Visor y `aprendizajes-diseno/mobbitrips.md` al día. La pregunta «¿qué te resalta y qué es ad hoc?» quedó sin respuesta (⚪).
- [x] **1A.11** Cierre: `secrets-scanner` limpio (gitleaks + grep, 19 commits) y `reviewer` limpio; el `auditor` da el veredicto y entra a `portal` solo con CI verde (`scripts/merge-si-verde.sh 3`).

---

## ⏸️ Pendiente fuera de la fase

- Frase bajo el título y «Búsquedas populares»: en pausa, la revisa Emilio (decisión 31). Se cambian en `textos/es.ts`.
- Páginas del modelo viejo (`/contacto`, `/nosotros`, `/servicios`, `/propiedades`, `blog`, `experiencias`): textos y `openGraph` sin imagen; se rehacen en su fase.
- Título por omisión del layout (el viejo) y `NEXT_PUBLIC_SITE_URL` en producción por confirmar.
- Logo «trips» (`#ED6864` sobre blanco) da 3.1:1 en 320 px (los logos están exentos de WCAG; anotado).

---

## ➡️ Siguiente

- **3A — Resultados con mapa** (este repo). Necesita la API de canal de **2B** (repo Mobbilink), que espera el OK de José.
