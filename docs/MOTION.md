# 🎬 Motion — Reglas Maestras de Animación

> **Fuente única de verdad para animaciones en Mobbitrips.**
> Si otro doc dice algo distinto, este gana.
>
> **Rumbo vigente (pivote del 2-oct-2026, Fase 0A):** Mobbitrips es el escaparate de las casas de los
> anfitriones de Mobbilink. El rendimiento manda sobre la animación. La regla anterior de mayo
> («toda sección debe tener animación; una página estática es fallo») **quedó sustituida** por la Regla #1.

---

## 🔴 Regla #1 (no negociable): el rendimiento manda sobre la animación

Decisión de Emilio (2-oct-2026), tras preguntar si tanta animación más un catálogo de alojamientos haría la
página pesada.

1. **Condición para publicar:** Lighthouse móvil ≥ 90 (rendimiento) medido sobre un build de producción o la
   vista previa de Vercel. Si una animación lo baja, se simplifica o se quita; no se publica por encima de eso.
2. **Presupuesto de peso:** cada fase lo respeta y lo mide con el antes/después de su cambio. Nada nuevo entra
   si empeora el peso o el Lighthouse móvil de la página.
3. **Animación solo donde aporte:** guiar la atención, confirmar una acción, dar continuidad entre estados.
   Una sección sin animación **no es un fallo**; una animación que no aporta y cuesta CPU sí lo es.
4. **Dónde vive el movimiento (decisión 13):** la portada lleva las manchas ligeras
   (`components/ambient/ManchasLigeras.tsx`) solo detrás del buscador. Las páginas de resultados, ficha y
   reserva son **lisas**: sin manchas ni fondo animado.
5. **Lo que ya se fue y no vuelve:** la lámpara de lava (`AmbientCanvas`, 10 capas con `filter: blur`
   grandes y un bucle que medía las manchas en cada cuadro) y el scroll suave global (Lenis).

El sitio ya no compite en «movimiento de agencia»: compite en que el huésped encuentre y reserve rápido,
también en un celular con mala señal.

---

## 🧰 Stack disponible

| Librería              | Cuándo usar                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| GSAP + ScrollTrigger  | Timelines complejas, animaciones disparadas por scroll, parallax, animaciones de hero coordinadas           |
| split-type            | Reveals de texto por palabra/letra (como el Hero existente)                                                 |
| Framer Motion         | Gestos (hover/tap), AnimatePresence (mount/unmount), layout animations, drag                                |
| Lottie (no instalado) | Loaders, empty states, success animations. Se desinstaló en la 0A.4; reinstalar solo si una sección lo pide |
| Rive (no instalado)   | Botones con state machines. Se desinstaló en la 0A.4; reinstalar solo si una sección lo pide                |

> El scroll es el nativo del navegador: Lenis se quitó en la 0A.4 y ScrollTrigger escucha el scroll nativo.
>
> GSAP, split-type y Framer Motion **se quedan por ahora**: viven en secciones que las fases 1A, 3A y 4A van
> a rehacer. Al rehacer una sección, si CSS (`transform`/`opacity`, `IntersectionObserver`) alcanza, se usa
> CSS y no se suma una librería.

---

## 📐 Decisión rápida — qué usar para cada caso

| Caso                                                  | Herramienta                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| Texto que aparece letra por letra al cargar           | GSAP timeline + split-type (patrón del Hero existente)       |
| Sección que aparece al hacer scroll hasta ella        | GSAP ScrollTrigger con `scrollTrigger: { start: 'top 80%' }` |
| Hover en card / botón / link                          | Framer Motion con `whileHover` + spring transition           |
| Modal / drawer que abre y cierra                      | Framer Motion AnimatePresence                                |
| Imagen con parallax al scroll                         | Framer Motion `useScroll` + `useTransform`                   |
| Loader cuando se está cargando algo                   | Lottie (.lottie file) o Rive (hay que reinstalarlos)         |
| Empty state ilustrativo                               | Lottie (hay que reinstalarlo)                                |
| Botón que cambia de estado (idle → loading → success) | Rive con state machine (hay que reinstalarlo)                |
| Scroll global                                         | Nativo del navegador (Lenis se quitó en la 0A.4)             |

---

## 🎨 Easings oficiales del Design System

```css
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1) /* reveals */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1) /* hovers con rebote sutil */
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1) /* transiciones */;
```

Estos están en `apps/web/src/app/globals.css` como CSS variables y son
los oficiales del design system Mobbitrips. NO usar otros sin justificación.

NOTA sobre conflicto histórico: el skill `.agents/skills/animate/SKILL.md`
marca `cubic-bezier(0.34, 1.56, 0.64, 1)` como "avoid". Esto se resuelve
a favor del design system: la curva ES correcta para Mobbitrips porque
da rebote cálido que refuerza la personalidad de marca. Ignora el skill
en este punto.

---

## ⏱️ Duraciones por tipo

| Caso                                   | Duración                                                     | Easing            |
| -------------------------------------- | ------------------------------------------------------------ | ----------------- |
| Hover button/card                      | 200-300ms                                                    | ease-out-back     |
| Click feedback                         | 100-200ms                                                    | ease-out          |
| Reveal de sección                      | 600-800ms                                                    | ease-out-expo     |
| Reveal de hero (entrance choreography) | 800-1200ms con stagger                                       | ease-out-expo     |
| Page transition                        | 300-500ms                                                    | ease-in-out-cubic |
| Stagger entre elementos                | 50-150ms (chars: 30-50ms, words: 80-120ms, items: 100-150ms) | —                 |

---

## 🎭 Patrones de referencia (copiar y adaptar)

### Patrón A — Hero con split text reveal (referencia: HeroSection.tsx)

```tsx
'use client';
import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function HeroLikeSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !ref.current) return;

      const headline = ref.current.querySelector('h1');
      if (!headline) return;

      const split = new SplitType(headline, { types: 'words' });

      gsap.from(split.words, {
        opacity: 0,
        y: 80,
        stagger: 0.08,
        duration: 1.0,
        ease: 'expo.out',
        delay: 0.2,
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref}>
      <h1>Texto que aparece palabra por palabra</h1>
    </section>
  );
}
```

### Patrón B — Sección reveal al hacer scroll

```tsx
'use client';
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ScrollRevealSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !ref.current) return;

      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === ref.current) st.kill();
        });
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref}>
      <h2 data-reveal>Título</h2>
      <p data-reveal>Párrafo 1</p>
      <p data-reveal>Párrafo 2</p>
    </section>
  );
}
```

### Patrón C — Card con hover lift + image zoom

```tsx
'use client';
import { motion } from 'framer-motion';

export function HoverCard() {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* image */}
      </motion.div>
    </motion.article>
  );
}
```

### Patrón D — Parallax sutil en imagen

```tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }}>{/* image */}</motion.div>
    </div>
  );
}
```

### Patrón E — Loader Lottie

> Referencia: `@lottiefiles/dotlottie-react` no está instalado desde la 0A.4.

```tsx
'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function LoadingState() {
  return (
    <DotLottieReact
      src="https://lottie.host/[id]/[name].lottie"
      loop
      autoplay
      style={{ width: 120, height: 120 }}
    />
  );
}
```

### Patrón F — Botón Rive con estados

> Referencia: `@rive-app/react-canvas` no está instalado desde la 0A.4.

```tsx
'use client';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export function InteractiveButton() {
  const { rive, RiveComponent } = useRive({
    src: '/rive/button.riv',
    stateMachines: 'main',
    autoplay: true,
  });

  const hoverInput = useStateMachineInput(rive, 'main', 'isHovered');

  return (
    <button
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => hoverInput && (hoverInput.value = false)}
    >
      <RiveComponent style={{ width: 200, height: 60 }} />
    </button>
  );
}
```

---

## ♿ Reduced motion (obligatorio en todo componente animado)

### CSS global (ya está en globals.css)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### En componentes con GSAP

Usa el hook `useReducedMotion` y haz early return:

```tsx
const reduce = useReducedMotion()
useGSAP(() => {
  if (reduce) return  // No anima
  gsap.from(...)
}, { scope: ref, dependencies: [reduce] })
```

### En componentes con Framer Motion

Framer Motion respeta automáticamente. También puedes usar:

```tsx
import { useReducedMotion } from 'framer-motion';
const reduce = useReducedMotion();
```

---

## ❌ Lo que NO se hace en Mobbitrips

- ❌ Fondos animados globales o a pantalla completa (la lámpara de lava se fue en la 0A.4)
- ❌ `filter: blur` grande animado, ni bucles que midan el DOM en cada cuadro
- ❌ Scroll suave global (Lenis se quitó; pelea con el scroll nativo, el mapa y las listas)
- ❌ Publicar una página con Lighthouse móvil < 90 por una animación
- ❌ Cursor custom global (rompe el aire premium hospitality)
- ❌ Animaciones agresivas o con overshoot fuerte (no es agencia, es cálido)
- ❌ Animar `width`/`height`/`top`/`left` (siempre `transform` y `opacity`)
- ❌ Animaciones sin cleanup (memory leaks)
- ❌ Componentes server-side con animaciones (siempre `'use client'`)
- ❌ Más de 3 niveles de stagger anidado (sobrecarga visual)
- ❌ Easings genéricos como `ease` o `linear` (excepto rotaciones infinitas)

---

## ✅ Cómo validar que una sección cumple

1. **Lighthouse móvil ≥ 90** sobre el build de producción o la vista previa de Vercel. Si falla, se arregla
   o se quita la animación antes de seguir. Esto manda sobre los demás puntos.
2. ¿Cada animación aporta algo (guía, confirma, da continuidad)? Si no, se quita.
3. Scroll nativo fluido: ¿las secciones que sí se animan aparecen al entrar al viewport sin trabarse?
4. Activar `prefers-reduced-motion`: ¿el contenido sigue legible y visible (no se queda invisible)?
5. Performance en celular: ¿corre sin tirones? (DevTools → Performance, con la CPU limitada).

Si cualquiera de los 5 falla, la sección no está lista.

---

## 🎯 Techo de complejidad por sección (es un máximo, no un mínimo)

| Tipo de sección              | Techo                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------- |
| Hero / portada               | A (entrada del texto + manchas ligeras detrás del buscador)                      |
| Sección "destacados" / cards | B (aparición al scroll + hover)                                                  |
| Sección de texto editorial   | C (aparición del texto al scroll)                                                |
| Sección de testimonios       | C                                                                                |
| CTA final                    | B                                                                                |
| Footer                       | D (sin animación o fade-in suave)                                                |
| Modal / drawer               | B (AnimatePresence + spring)                                                     |
| Resultados, ficha y reserva  | Lisas: solo respuestas a la interacción (hover, abrir/cerrar), sin fondo animado |

Niveles A-D = complejidad descendente. Una sección puede quedarse sin animación; lo que no se hace es pasar
el techo ni gastar presupuesto de rendimiento en algo que no aporte.

---

_Última actualización: 2026-10-08 · Versión: 2.0 (rumbo portal, Fase 0A · sustituye la regla de mayo)_
