'use client';
import { useEffect, useState } from 'react';

/**
 * Hook para detectar prefers-reduced-motion.
 *
 * Uso en componentes que usan GSAP (no Motion):
 *   const reduce = useReducedMotion()
 *   useGSAP(() => {
 *     if (reduce) return
 *     gsap.from(...)
 *   }, { scope: ref, dependencies: [reduce] })
 *
 * Para componentes Motion también disponible vía:
 *   import { useReducedMotion } from 'framer-motion'
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
