'use client';
/**
 * GSAP centralizado para Mobbitrips.
 *
 * Reglas:
 * - SIEMPRE importar gsap desde aquí, NUNCA desde 'gsap' directo.
 *   Esto evita doble registro de plugins entre rutas.
 * - SIEMPRE usar useGSAP en componentes (cleanup automático al desmontar).
 *
 * Para registrar plugins adicionales en el futuro:
 *   import { ScrollSmoother } from 'gsap/ScrollSmoother'
 *   gsap.registerPlugin(ScrollSmoother)
 *   export { ScrollSmoother }
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

let registered = false;

if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

export { gsap, ScrollTrigger, useGSAP };
