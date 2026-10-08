'use client';

import { useEffect, useRef } from 'react';

/**
 * Manchas ligeras: fondo vivo SOLO para la franja del buscador del Hero (no va en otras páginas).
 *
 * Por qué es ligero (la versión de mayo usaba 10 capas con filter: blur + GSAP y gastaba ~4 veces más CPU):
 *  - 4 manchas con degradado radial en un <canvas> 8 veces más chico que lo que el navegador estira.
 *    El lienzo NO se multiplica por devicePixelRatio a propósito: las manchas son suaves y un lienzo
 *    mayor solo subiría el costo sin que se note. El DPR lo resuelve el navegador al estirar.
 *  - 20 cuadros por segundo.
 *  - Se detiene sola cuando la franja no se ve (IntersectionObserver) o la pestaña está oculta.
 *  - Con «reducir movimiento» se pinta un solo cuadro y queda quieta.
 *  - Sin seguir al mouse, sin filter: blur, sin librerías de animación.
 *
 * Se monta dentro de un contenedor con position: relative; ocupa todo el contenedor (absolute, inset 0)
 * y va detrás del contenido. Colores: coral / rosa / durazno sobre el crema de la marca.
 */

/** Crema de la marca (brand-cream); debe coincidir con el fondo global para que no se note el borde. */
const CREMA = '#FAF8F5';
/** Cuánto más chico es el lienzo que el espacio que ocupa en pantalla. */
const ESCALA = 8;
/** 20 cuadros por segundo (con 4 ms de holgura para pantallas de 60 Hz). */
const MS_POR_CUADRO = 50 - 4;
const T = Math.PI * 2;

interface Mancha {
  /** Color RGB «r,g,b». */
  c: string;
  /** Opacidad en el centro. */
  a: number;
  /** Radio relativo al lado mayor del lienzo. */
  r: number;
  /** Posición base (0..1) y amplitud del vaivén (0..1). */
  x: number;
  y: number;
  ax: number;
  ay: number;
  /** Periodo del vaivén en segundos y desfase. */
  fx: number;
  fy: number;
  p: number;
}

const MANCHAS: readonly Mancha[] = [
  { c: '237,104,100', a: 0.3, r: 0.36, x: 0.1, y: 0.1, ax: 0.3, ay: 0.3, fx: 19, fy: 23, p: 0 }, // coral
  {
    c: '244,160,158',
    a: 0.4,
    r: 0.32,
    x: 0.84,
    y: 0.3,
    ax: 0.26,
    ay: 0.34,
    fx: 23,
    fy: 17,
    p: 1.7,
  }, // rosa
  { c: '245,178,120', a: 0.26, r: 0.26, x: 0.46, y: 0.8, ax: 0.3, ay: 0.3, fx: 21, fy: 27, p: 3.1 }, // durazno
  {
    c: '237,104,100',
    a: 0.22,
    r: 0.24,
    x: 0.62,
    y: 0.12,
    ax: 0.22,
    ay: 0.3,
    fx: 17,
    fy: 21,
    p: 4.4,
  }, // coral
];

/** Colores del degradado de cada mancha, calculados una vez (no en cada cuadro). */
const COLORES = MANCHAS.map((m) => ({
  centro: `rgba(${m.c},${m.a})`,
  borde: `rgba(${m.c},0)`,
}));

export function ManchasLigeras() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const g = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !g) return;

    const quieta = window.matchMedia('(prefers-reduced-motion: reduce)');
    let w = 1;
    let h = 1;
    let raf = 0;
    let ultimo = 0;
    let enPantalla = true;

    /** Ajusta el lienzo al tamaño en pantalla; devuelve false si no cambió (asignar width/height lo borra). */
    const medir = () => {
      const nw = Math.max(1, Math.ceil(canvas.clientWidth / ESCALA));
      const nh = Math.max(1, Math.ceil(canvas.clientHeight / ESCALA));
      if (nw === w && nh === h && canvas.width === w) return false;
      w = canvas.width = nw;
      h = canvas.height = nh;
      return true;
    };

    const pintar = (ms: number) => {
      const s = ms / 1000;
      const lado = Math.max(w, h);
      g.fillStyle = CREMA;
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < MANCHAS.length; i++) {
        const b = MANCHAS[i]!;
        const col = COLORES[i]!;
        const x = (b.x + b.ax * Math.sin((T * s) / b.fx + b.p)) * w;
        const y = (b.y + b.ay * Math.sin((T * s) / b.fy + b.p * 1.3)) * h;
        const R = b.r * lado * (1 + 0.12 * Math.sin((T * s) / (b.fx * 0.7) + b.p));
        const gr = g.createRadialGradient(x, y, 0, x, y, R);
        gr.addColorStop(0, col.centro);
        gr.addColorStop(0.7, col.borde);
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
      }
    };

    const debeCorrer = () => enPantalla && !document.hidden && !quieta.matches;

    const cuadro = (t: number) => {
      raf = requestAnimationFrame(cuadro);
      if (t - ultimo < MS_POR_CUADRO) return;
      ultimo = t;
      pintar(t);
    };

    const arrancar = () => {
      if (!raf && debeCorrer()) raf = requestAnimationFrame(cuadro);
    };
    const detener = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    /** Reevalúa si toca correr o parar (visibilidad, pestaña, «reducir movimiento»). */
    const actualizar = () => {
      if (debeCorrer()) arrancar();
      else detener();
    };

    medir();
    pintar(performance.now());

    // Si cambia el tamaño (giro del cel, ventana), se re-mide y se pinta en el acto para no dejar el lienzo en blanco.
    const tamano = new ResizeObserver(() => {
      if (medir()) pintar(performance.now());
    });
    tamano.observe(canvas);

    const vista = new IntersectionObserver(([e]) => {
      enPantalla = !!e?.isIntersecting;
      actualizar();
    });
    vista.observe(canvas);

    document.addEventListener('visibilitychange', actualizar);
    quieta.addEventListener('change', actualizar);
    actualizar();

    return () => {
      detener();
      tamano.disconnect();
      vista.disconnect();
      document.removeEventListener('visibilitychange', actualizar);
      quieta.removeEventListener('change', actualizar);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
