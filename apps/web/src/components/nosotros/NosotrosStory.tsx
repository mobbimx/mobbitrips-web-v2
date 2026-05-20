'use client';

import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function NosotrosStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const copy = q('[data-ns="copy"]');
      const card = q('[data-ns="card"]');
      const titleEl = root.querySelector<HTMLElement>('[data-ns="heading"]');
      const paras = q('[data-ns="para"]');

      if (reduce) {
        gsap.set([copy, card, paras], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) split = new SplitType(titleEl, { types: 'words' });
      const words = split?.words ?? [];

      gsap.set(copy, { x: -40, opacity: 0 });
      gsap.set(card, { x: 40, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 24, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 20, opacity: 0 });
      }
      gsap.set(paras, { y: 16, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.to(copy, { x: 0, opacity: 1, duration: 0.7 }, 0);
      tl.to(card, { x: 0, opacity: 1, duration: 0.7 }, 0.1);
      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.65, stagger: 0.06 }, 0.2);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.65 }, 0.2);
      }
      tl.to(paras, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '>-0.3');

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
    <section ref={ref} className="nos-story" aria-labelledby="nos-story-heading">
      <div className="nos-story__inner">
        <div className="nos-story__copy" data-ns="copy">
          <span className="nos-story__kicker">Nuestra historia</span>
          <h2 id="nos-story-heading" className="nos-story__heading" data-ns="heading">
            Empezamos con
            <br />
            una sola propiedad.
          </h2>
          <p className="nos-story__body" data-ns="para">
            Mobbitrips nació de una idea simple: que cada viajero merece hospedarse en un lugar que
            se sienta verdaderamente suyo. No un cuarto de hotel impersonal, sino un hogar con
            personalidad, historia y calidez.
          </p>
          <p className="nos-story__body" data-ns="para">
            Empezamos administrando una sola propiedad con toda la dedicación del mundo. Hoy
            gestionamos un portafolio de propiedades seleccionadas, cada una con su propio carácter,
            todas con el mismo nivel de cuidado.
          </p>
          <p className="nos-story__body" data-ns="para">
            La diferencia está en los detalles: en la atención directa, en el precio justo, en que
            siempre hay alguien al otro lado cuando nos necesitas.
          </p>
        </div>

        <div
          className="nos-story__card"
          data-ns="card"
          role="img"
          aria-label="Nuestra filosofía: Que te sientas en casa"
        >
          <div className="nos-story__card-accent" aria-hidden="true" />
          <blockquote className="nos-story__quote">
            &ldquo;Que te sientas en casa.&rdquo;
          </blockquote>
          <p className="nos-story__quote-attr">— Nuestra filosofía desde el primer día</p>
        </div>
      </div>
    </section>
  );
}
