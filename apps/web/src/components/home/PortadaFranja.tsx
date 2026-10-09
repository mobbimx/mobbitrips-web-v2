import { ManchasLigeras } from '@/components/ambient/ManchasLigeras';
import { t } from '@/textos/t';
import { BuscadorPortada } from './BuscadorPortada';

/**
 * Franja alta de la portada (opción A «Aire»): título de 2 líneas, una línea de apoyo y el buscador
 * en píldora al centro, con las manchas ligeras detrás.
 *
 * - El título (h1) NO se anima: es el elemento más grande y de él depende el LCP.
 * - Entrada de una sola vez (600 ms, retraso ≤ 200 ms) solo en el apoyo y el buscador; quieta con
 *   «reducir movimiento» (`motion-safe:`).
 * - El degradado de abajo funde las manchas con el crema para que la franja no termine en corte seco.
 * - `z-10`: la lista de sugerencias del buscador baja más allá de la franja y debe quedar por encima
 *   de las secciones siguientes.
 */
export function PortadaFranja() {
  return (
    <section aria-labelledby="portada-titulo" className="relative isolate z-10">
      <ManchasLigeras />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-brand-cream"
      />

      <div className="relative mx-auto flex max-w-5xl md:min-h-[clamp(520px,calc(100svh-184px),760px)] flex-col items-center justify-center px-4 py-14 text-center sm:px-6 sm:py-16">
        <h1
          id="portada-titulo"
          className="text-balance font-comfortaa text-[clamp(1.875rem,4vw+0.9rem,3.75rem)] font-bold leading-[1.12] tracking-[-0.01em] text-brand-charcoal"
        >
          <span className="block">{t('inicio.franja.titulo.linea1')}</span>
          <span className="block">{t('inicio.franja.titulo.linea2')}</span>
        </h1>

        <p className="mt-4 max-w-xl text-balance text-base text-brand-charcoal motion-safe:animate-entra sm:text-lg">
          {t('inicio.franja.apoyo')}
        </p>

        <div className="flex w-full justify-center motion-safe:animate-entra motion-safe:[animation-delay:120ms]">
          <BuscadorPortada />
        </div>
      </div>
    </section>
  );
}
