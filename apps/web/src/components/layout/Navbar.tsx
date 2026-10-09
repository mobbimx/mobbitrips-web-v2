'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { t } from '@/textos/t';
import { MobbitripsLogo } from './MobbitripsLogo';

/** Página pública de Mobbilink (canónica en su repo). La ruta exacta de planes queda por confirmar. */
const URL_MOBBILINK = 'https://mobbilink.com';

/** Alto fijo de la barra: `layout.tsx` (`pt-[72px]`) y el Hero (`globals.css`) dependen de él. */
const ALTO = 72;
/** Píxeles que hay que mover el scroll en un mismo sentido para esconder o enseñar la barra. */
const UMBRAL = 6;

/**
 * Barra de arriba: logo y «Anuncia tu casa». Fondo sólido (sin `backdrop-filter`).
 * Se esconde al bajar y reaparece al subir. El movimiento es solo CSS (`transform`); el listener
 * pasivo únicamente cambia dos atributos `data-` en el DOM, sin re-renderizar React.
 * Con el foco dentro (teclado) siempre se ve.
 */
export function Navbar() {
  const barra = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = barra.current;
    if (!el) return;

    let ultimo = window.scrollY;
    let cuadro = 0;

    const revisar = () => {
      cuadro = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - ultimo;
      el.dataset.bajado = y > 0 ? 'si' : 'no';
      if (y <= ALTO) {
        el.dataset.oculta = 'no';
        ultimo = y;
      } else if (Math.abs(delta) >= UMBRAL) {
        el.dataset.oculta = delta > 0 ? 'si' : 'no';
        ultimo = y;
      }
    };

    const alMover = () => {
      if (!cuadro) cuadro = requestAnimationFrame(revisar);
    };

    revisar();
    window.addEventListener('scroll', alMover, { passive: true });
    return () => {
      window.removeEventListener('scroll', alMover);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <header
      ref={barra}
      data-oculta="no"
      data-bajado="no"
      className="fixed inset-x-0 top-0 z-40 h-[72px] border-b border-brand-border bg-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none data-[bajado=si]:shadow-sm [&[data-oculta=si]:not(:focus-within)]:-translate-y-full"
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
        aria-label={t('nav.aria')}
      >
        <Link
          href="/"
          aria-label={t('nav.inicioAria')}
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <MobbitripsLogo
            size={36}
            decorativo
            className="transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="font-comfortaa text-xl font-bold text-brand-charcoal">
            {t('marca.inicio')}
            <span className="text-primary">{t('marca.fin')}</span>
          </span>
        </Link>

        <a
          href={URL_MOBBILINK}
          className="inline-flex h-11 shrink-0 items-center rounded-full border border-brand-border bg-white px-4 text-sm font-semibold text-brand-charcoal transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-5"
        >
          {t('nav.anunciaTuCasa')}
        </a>
      </nav>
    </header>
  );
}
