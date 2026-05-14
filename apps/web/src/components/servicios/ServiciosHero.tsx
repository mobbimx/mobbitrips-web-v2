'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ServiciosHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 64,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.15,
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={ref} className="py-24 sm:py-32" aria-labelledby="servicios-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <p
            data-reveal
            className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            <span className="inline-block h-px w-8 bg-primary" aria-hidden="true" />
            Para propietarios
          </p>
        </div>
        <h1
          id="servicios-heading"
          className="font-comfortaa font-bold text-brand-charcoal"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          <span className="block overflow-hidden">
            <span data-reveal className="block">
              Tu propiedad trabaja.
            </span>
          </span>
          <span className="block overflow-hidden">
            <em data-reveal className="not-italic text-primary block">
              Tú descansas.
            </em>
          </span>
        </h1>
        <div className="overflow-hidden">
          <p data-reveal className="mt-8 max-w-xl text-base leading-relaxed text-brand-gray">
            Gestionamos tu propiedad vacacional de principio a fin: desde la fotografía hasta el
            depósito mensual. Sin complicaciones, sin sorpresas.
          </p>
        </div>
        <div className="overflow-hidden">
          <div data-reveal className="mt-10">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Quiero listar mi propiedad
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
