'use client';

import { useRef } from 'react';
import { TrendingUp, Wrench, Users, BarChart3, Shield, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Más ingresos',
    description:
      'Precios dinámicos calibrados al mercado para maximizar tu ocupación y ganancias cada mes.',
  },
  {
    icon: Wrench,
    title: 'Gestión completa',
    description:
      'Limpieza profesional, mantenimiento preventivo y atención a huéspedes. Tú solo cobras.',
  },
  {
    icon: Users,
    title: 'Huéspedes verificados',
    description:
      'Filtramos y verificamos cada reserva. Solo aceptamos viajeros con perfil y buen historial.',
  },
  {
    icon: BarChart3,
    title: 'Reportes mensuales',
    description:
      'Transparencia total: ingresos, ocupación, reseñas y estado de tu propiedad cada mes.',
  },
  {
    icon: Shield,
    title: 'Tu propiedad protegida',
    description:
      'Protocolo de revisión antes y después de cada estancia. Tu inversión, bien cuidada.',
  },
  {
    icon: Headphones,
    title: 'Soporte directo',
    description:
      'Un equipo real disponible para ti y tus huéspedes. Sin bots, sin tickets, sin esperas.',
  },
];

export function ServiciosBenefits() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const kicker = q('[data-sb="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-sb="title"]');
      const cards = q('[data-sb="card"]');

      if (reduce) {
        gsap.set([kicker, cards], { clearProps: 'all', opacity: 1 });
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
      gsap.set(cards, { y: 30, opacity: 0 });

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
      tl.to(cards, { y: 0, opacity: 1, duration: 0.55, stagger: 0.07 }, 0.3);

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
    <section ref={ref} className="srv-benefits" aria-labelledby="srv-benefits-heading">
      <div className="srv-benefits__inner">
        <div className="srv-benefits__header">
          <span className="srv-benefits__kicker" data-sb="kicker">
            Qué incluye
          </span>
          <h2 id="srv-benefits-heading" className="srv-benefits__heading" data-sb="title">
            Todo lo que necesitas, <span className="script-inline">sin hacer nada.</span>
          </h2>
        </div>

        <div className="srv-benefits__grid">
          {benefits.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              className="srv-benefits__card"
              data-sb="card"
              whileHover={reduce ? {} : { y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <div className="srv-benefits__icon">
                <Icon size={18} color="var(--coral-900)" aria-hidden="true" />
              </div>
              <h3 className="srv-benefits__name">{title}</h3>
              <p className="srv-benefits__desc">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
