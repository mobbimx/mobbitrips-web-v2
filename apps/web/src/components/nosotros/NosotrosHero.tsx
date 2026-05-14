'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function NosotrosHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: 'expo.out',
        delay: 0.1,
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={ref} className="py-24 sm:py-32" aria-labelledby="nosotros-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <p
            data-reveal
            className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            <span className="inline-block h-px w-8 bg-primary" aria-hidden="true" />
            Quiénes somos
          </p>
        </div>
        <h1
          id="nosotros-heading"
          className="font-comfortaa font-bold text-brand-charcoal"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          <span className="block overflow-hidden">
            <span data-reveal className="block">
              Hacemos que cada
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal className="block">
              viaje se sienta
            </span>
          </span>
          <span className="block overflow-hidden">
            <em data-reveal className="not-italic text-primary block">
              como en casa.
            </em>
          </span>
        </h1>
      </div>
    </section>
  );
}
