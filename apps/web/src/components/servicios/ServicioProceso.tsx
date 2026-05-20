'use client';

import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const steps = [
  {
    num: '01',
    title: 'Nos contactas',
    description:
      'Cuéntanos sobre tu propiedad. Te respondemos en menos de 24 horas con una evaluación inicial sin compromiso.',
  },
  {
    num: '02',
    title: 'Visitamos y preparamos',
    description:
      'Nuestro equipo visita la propiedad, toma fotografías profesionales y la prepara para recibir huéspedes.',
  },
  {
    num: '03',
    title: 'Publicamos y gestionamos',
    description:
      'La propiedad aparece en nuestros canales. Nosotros manejamos todo — tú recibes los depósitos cada mes.',
  },
];

export function ServicioProceso() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const kicker = q('[data-sp="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-sp="title"]');
      const items = q('[data-sp="item"]');

      if (reduce) {
        gsap.set([kicker, items], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) split = new SplitType(titleEl, { types: 'words' });
      const words = split?.words ?? [];

      gsap.set(kicker, { y: 16, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 24, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 20, opacity: 0 });
      }
      gsap.set(items, { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.to(kicker, { y: 0, opacity: 1, duration: 0.5 }, 0);
      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.65, stagger: 0.06 }, 0.15);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.65 }, 0.15);
      }
      tl.to(items, { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 }, 0.3);

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
    <section ref={ref} className="srv-proceso" aria-labelledby="srv-proceso-heading">
      <div className="srv-proceso__inner">
        <div className="srv-proceso__header">
          <span className="srv-proceso__kicker" data-sp="kicker">
            El proceso
          </span>
          <h2 id="srv-proceso-heading" className="srv-proceso__heading" data-sp="title">
            Simple, rápido
            <br />y sin letra chica.
          </h2>
        </div>

        <div className="srv-proceso__grid">
          {steps.map(({ num, title, description }) => (
            <div key={num} className="srv-proceso__item" data-sp="item">
              <span className="srv-proceso__num" aria-hidden="true">
                {num}
              </span>
              <h3 className="srv-proceso__title">{title}</h3>
              <p className="srv-proceso__desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
