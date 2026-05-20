'use client';

import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ContactoHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const kicker = root.querySelector<HTMLElement>('[data-ch="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-ch="title"]');
      const sub = root.querySelector<HTMLElement>('[data-ch="sub"]');

      if (reduce) {
        if (kicker) gsap.set(kicker, { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        if (sub) gsap.set(sub, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) split = new SplitType(titleEl, { types: 'words' });
      const words = split?.words ?? [];

      if (kicker) gsap.set(kicker, { y: 20, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 40, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 32, opacity: 0 });
      }
      if (sub) gsap.set(sub, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(kicker, { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.28);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.8 }, 0.28);
      }
      tl.to(sub, { y: 0, opacity: 1, duration: 0.5 }, '>-0.3');

      return () => {
        split?.revert();
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="ctc-hero" aria-labelledby="contacto-heading">
      <div className="ctc-hero__inner">
        <p className="ctc-hero__kicker" data-ch="kicker">
          Contacto
        </p>
        <h1 id="contacto-heading" className="ctc-hero__title" data-ch="title">
          Estamos aquí <em className="ctc-hero__em">para ayudarte.</em>
        </h1>
        <p className="ctc-hero__sub" data-ch="sub">
          Ya sea para una reserva, una duda o información sobre nuestras propiedades — escríbenos y
          te respondemos rápido.
        </p>
      </div>
    </section>
  );
}
