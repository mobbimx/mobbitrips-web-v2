'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SplitType from 'split-type';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ServiciosHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const kicker = q('[data-sh="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-sh="title"]');
      const sub = q('[data-sh="sub"]');
      const cta = q('[data-sh="cta"]');

      if (reduce) {
        gsap.set([kicker, sub, cta], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) split = new SplitType(titleEl, { types: 'words' });
      const words = split?.words ?? [];

      gsap.set(kicker, { y: 20, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 40, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 32, opacity: 0 });
      }
      gsap.set(sub, { y: 16, opacity: 0 });
      gsap.set(cta, { y: 12, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(kicker, { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.28);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.8 }, 0.28);
      }
      tl.to(sub, { y: 0, opacity: 1, duration: 0.5 }, '>-0.3');
      tl.to(cta, { y: 0, opacity: 1, duration: 0.45 }, '>-0.2');

      return () => {
        split?.revert();
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="srv-hero" aria-labelledby="servicios-heading">
      <div className="srv-hero__inner">
        <p className="srv-hero__kicker" data-sh="kicker">
          Para propietarios
        </p>
        <h1 id="servicios-heading" className="srv-hero__title" data-sh="title">
          Tu propiedad trabaja. <em className="srv-hero__em">Tú descansas.</em>
        </h1>
        <p className="srv-hero__sub" data-sh="sub">
          Gestionamos tu propiedad vacacional de principio a fin: desde la fotografía hasta el
          depósito mensual. Sin complicaciones, sin sorpresas.
        </p>
        <Link href="/contacto" className="srv-hero__btn" data-sh="cta">
          Quiero listar mi propiedad
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
