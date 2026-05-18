'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const reasons = [
  {
    num: '01',
    title: 'Mejor precio garantizado',
    desc: 'Sin comisiones de plataformas intermediarias. Reservar directo siempre es más barato.',
  },
  {
    num: '02',
    title: 'Atención directa y humana',
    desc: 'Hablas con nosotros, no con un bot. Resolvemos cualquier duda antes, durante y después.',
  },
  {
    num: '03',
    title: 'Confirmación inmediata',
    desc: 'Tu reserva se confirma en minutos. Sin esperas, sin incertidumbre, sin sorpresas.',
  },
  {
    num: '04',
    title: 'Pago 100% seguro',
    desc: 'Stripe y PayU con cifrado bancario. Nunca tocamos los datos de tu tarjeta.',
  },
];

export function WhyBookDirect() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      const kicker = q('[data-why="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-why="title"]');
      const divider = q('[data-why="divider"]');
      const items = q('[data-why="item"]');
      const nums = q('[data-why="num"]');

      // Reduced motion: asegurar visibilidad y abortar
      if (reduce) {
        gsap.set([kicker, divider, items], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        gsap.set(nums, { clearProps: 'all' });
        return;
      }

      // Split headline por palabras
      let split: SplitType | null = null;
      if (titleEl) {
        split = new SplitType(titleEl, { types: 'words' });
      }
      const words = split?.words ?? [];

      // Estados iniciales
      gsap.set(kicker, { y: 20, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 40, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 30, opacity: 0 });
      }
      gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(items, { y: 40, opacity: 0 });
      gsap.set(nums, { clipPath: 'inset(100% 0% 0% 0%)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      // Kicker
      tl.to(kicker, { y: 0, opacity: 1, duration: 0.6 }, 0);

      // Headline
      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.85, stagger: 0.07 }, 0.1);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.85 }, 0.1);
      }

      // Línea divisoria dibuja de izquierda a derecha
      tl.to(divider, { scaleX: 1, duration: 0.55 }, '>-0.15');

      // Items suben con stagger
      tl.to(items, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, '>-0.2');

      // Números revelan con efecto sello desde abajo
      tl.to(
        nums,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.5,
          ease: 'back.out(1.4)',
          stagger: 0.12,
        },
        '<0.08',
      );

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
    <section ref={ref} className="why" aria-labelledby="why-title">
      <div className="why__inner">
        <span className="why__kicker" data-why="kicker">
          ¿Por qué reservar directo?
        </span>
        <h2 id="why-title" className="why__title" data-why="title">
          Sin intermediarios, <span className="script-inline">mejor precio.</span>
        </h2>
        <div className="why__divider" data-why="divider" aria-hidden="true" />
        <div className="why__grid">
          {reasons.map(({ num, title, desc }) => (
            <motion.div
              key={num}
              className="why__item"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.26, ease: [0.34, 1.56, 0.64, 1] }}
              data-why="item"
            >
              <span className="why__num" aria-hidden="true" data-why="num">
                {num}
              </span>
              <h3 className="why__item-title">{title}</h3>
              <p className="why__item-desc">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
