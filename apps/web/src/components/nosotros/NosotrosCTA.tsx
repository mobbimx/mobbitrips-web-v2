'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function NosotrosCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const titleEl = root.querySelector<HTMLElement>('[data-nc="title"]');
      const sub = q('[data-nc="sub"]');
      const btn = q('[data-nc="btn"]');

      if (reduce) {
        gsap.set([sub, btn], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) split = new SplitType(titleEl, { types: 'words' });
      const words = split?.words ?? [];

      if (words.length) {
        gsap.set(words, { y: 32, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 28, opacity: 0 });
      }
      gsap.set(sub, { y: 16, opacity: 0 });
      gsap.set(btn, { y: 12, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.75, stagger: 0.05 }, 0);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.75 }, 0);
      }
      tl.to(sub, { y: 0, opacity: 1, duration: 0.5 }, '>-0.3');
      tl.to(btn, { y: 0, opacity: 1, duration: 0.45 }, '>-0.2');

      return () => {
        split?.revert();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === root) st.kill();
        });
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="nos-cta" aria-labelledby="nos-cta-heading">
      <div className="nos-cta__inner">
        <h2 id="nos-cta-heading" className="nos-cta__heading" data-nc="title">
          ¿Listo para vivir la experiencia <span className="script-inline">Mobbitrips?</span>
        </h2>
        <p className="nos-cta__sub" data-nc="sub">
          Reserva directo, sin intermediarios, y descubre por qué nuestros huéspedes siempre
          vuelven.
        </p>
        <Link href="/propiedades" className="nos-cta__btn" data-nc="btn">
          Ver propiedades
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
