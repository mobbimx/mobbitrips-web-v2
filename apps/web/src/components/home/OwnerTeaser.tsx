'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { TrendingUp, Wrench, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Maximiza tus ingresos',
    desc: 'Gestión profesional con precios dinámicos para llenar tu calendario.',
  },
  {
    icon: Wrench,
    title: 'Sin preocupaciones',
    desc: 'Nos encargamos de todo: limpieza, mantenimiento y atención a huéspedes.',
  },
  {
    icon: Users,
    title: 'Huéspedes verificados',
    desc: 'Solo aceptamos reservas de viajeros con perfil verificado y buen historial.',
  },
];

export function OwnerTeaser() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const kicker = q('[data-ot="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-ot="title"]');
      const body = q('[data-ot="body"]');
      const cta = q('[data-ot="cta"]');
      const benefitItems = q('[data-ot="benefit"]');

      if (reduce) {
        gsap.set([kicker, body, cta, benefitItems], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) split = new SplitType(titleEl, { types: 'words' });
      const words = split?.words ?? [];

      gsap.set(kicker, { y: 16, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 28, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 20, opacity: 0 });
      }
      gsap.set(body, { y: 16, opacity: 0 });
      gsap.set(cta, { y: 12, opacity: 0 });
      gsap.set(benefitItems, { x: 32, opacity: 0 });

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
        tl.to(words, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 }, 0.15);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.7 }, 0.15);
      }
      tl.to(body, { y: 0, opacity: 1, duration: 0.5 }, '>-0.3');
      tl.to(cta, { y: 0, opacity: 1, duration: 0.4 }, '>-0.2');
      tl.to(benefitItems, { x: 0, opacity: 1, duration: 0.55, stagger: 0.1 }, 0.2);

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
    <section ref={ref} className="owner" aria-labelledby="owner-title">
      <div className="owner__inner">
        <div className="owner__copy">
          <span className="owner__kicker" data-ot="kicker">
            Para propietarios
          </span>
          <h2 id="owner-title" className="owner__title" data-ot="title">
            ¿Tienes una propiedad <span className="script-inline">vacacional?</span>
          </h2>
          <p className="owner__body" data-ot="body">
            Únete a la red de propietarios Mobbitrips y convierte tu propiedad en una fuente de
            ingresos sin complicaciones. Nosotros gestionamos todo, tú descansas y cobras.
          </p>
          <Link href="/servicios" className="owner__cta" data-ot="cta">
            Quiero listar mi propiedad
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="owner__benefits">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              className="owner__benefit"
              data-ot="benefit"
              whileHover={reduce ? {} : { x: 5 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            >
              <div className="owner__benefit-icon">
                <Icon size={18} color="var(--coral-900)" aria-hidden="true" />
              </div>
              <div>
                <h3 className="owner__benefit-title">{title}</h3>
                <p className="owner__benefit-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
