'use client';

import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function NosotrosHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const kicker = root.querySelector<HTMLElement>('[data-nh="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-nh="title"]');

      if (reduce) {
        if (kicker) gsap.set(kicker, { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
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

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(kicker, { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.3);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.8 }, 0.3);
      }

      return () => {
        split?.revert();
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="nosotros-hero" aria-labelledby="nosotros-heading">
      <div className="nosotros-hero__inner">
        <p className="nosotros-hero__kicker" data-nh="kicker">
          Quiénes somos
        </p>
        <h1 id="nosotros-heading" className="nosotros-hero__title" data-nh="title">
          Hacemos que cada viaje se sienta <em className="nosotros-hero__em">como en casa.</em>
        </h1>
      </div>
    </section>
  );
}
