'use client';

import { useRef } from 'react';
import { Heart, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const values = [
  {
    icon: Heart,
    title: 'Calidez primero',
    description:
      'Cada propiedad es seleccionada y cuidada como si fuera nuestra propia casa. Porque eso es exactamente lo que es.',
  },
  {
    icon: Shield,
    title: 'Transparencia total',
    description:
      'Sin comisiones escondidas, sin sorpresas. El precio que ves es el que pagas. Así de simple.',
  },
  {
    icon: Zap,
    title: 'Respuesta inmediata',
    description:
      'Nuestro equipo está siempre disponible. Porque cuando viajas, el tiempo no puede esperar.',
  },
];

export function NosotrosValues() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const kicker = q('[data-nv="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-nv="title"]');
      const items = q('[data-nv="item"]');

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
      tl.to(items, { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 }, 0.3);

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
    <section ref={ref} className="nos-values" aria-labelledby="nos-values-heading">
      <div className="nos-values__inner">
        <div className="nos-values__header">
          <span className="nos-values__kicker" data-nv="kicker">
            Lo que nos mueve
          </span>
          <h2 id="nos-values-heading" className="nos-values__heading" data-nv="title">
            Nuestros valores.
          </h2>
        </div>

        <div className="nos-values__grid">
          {values.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              className="nos-values__item"
              data-nv="item"
              whileHover={reduce ? {} : { y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <div className="nos-values__icon">
                <Icon size={20} color="var(--coral-900)" aria-hidden="true" />
              </div>
              <h3 className="nos-values__name">{title}</h3>
              <p className="nos-values__desc">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
