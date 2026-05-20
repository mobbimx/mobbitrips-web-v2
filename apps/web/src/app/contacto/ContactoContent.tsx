'use client';

import { useRef } from 'react';
import { MessageCircle, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ContactoForm } from './ContactoForm';

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';

export function ContactoContent() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const kickerLeft = q('[data-cc="kicker-left"]');
      const channels = q('[data-cc="channel"]');
      const kickerRight = q('[data-cc="kicker-right"]');
      const formCard = q('[data-cc="form-card"]');

      if (reduce) {
        gsap.set([kickerLeft, channels, kickerRight, formCard], {
          clearProps: 'all',
          opacity: 1,
        });
        return;
      }

      gsap.set([kickerLeft, ...channels], { x: -40, opacity: 0 });
      gsap.set([kickerRight, ...formCard], { x: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.to(kickerLeft, { x: 0, opacity: 1, duration: 0.5 }, 0);
      tl.to(channels, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 0.12);
      tl.to(kickerRight, { x: 0, opacity: 1, duration: 0.5 }, 0);
      tl.to(formCard, { x: 0, opacity: 1, duration: 0.65 }, 0.1);

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === root) st.kill();
        });
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="ctc-content">
      <div className="ctc-content__inner">
        {/* Left: channels */}
        <div className="ctc-content__col">
          <p className="ctc-content__kicker" data-cc="kicker-left">
            Canales directos
          </p>
          <div className="ctc-channels">
            <motion.a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ctc-channel ctc-channel--wa"
              data-cc="channel"
              whileHover={reduce ? {} : { y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              aria-label="WhatsApp de Mobbitrips"
            >
              <div className="ctc-channel__icon-wrap ctc-channel__icon-wrap--wa">
                <MessageCircle size={22} aria-hidden="true" />
              </div>
              <div className="ctc-channel__body">
                <p className="ctc-channel__title">WhatsApp</p>
                <p className="ctc-channel__value">+52 228 252 5244</p>
              </div>
              <span className="ctc-channel__arrow" aria-hidden="true">
                →
              </span>
            </motion.a>

            <motion.a
              href="mailto:hola@mobbitrips.com"
              className="ctc-channel ctc-channel--email"
              data-cc="channel"
              whileHover={reduce ? {} : { y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              aria-label="Correo de Mobbitrips"
            >
              <div className="ctc-channel__icon-wrap ctc-channel__icon-wrap--email">
                <Mail size={22} aria-hidden="true" />
              </div>
              <div className="ctc-channel__body">
                <p className="ctc-channel__title">Correo</p>
                <p className="ctc-channel__value">hola@mobbitrips.com</p>
              </div>
              <span className="ctc-channel__arrow" aria-hidden="true">
                →
              </span>
            </motion.a>

            <div className="ctc-channel ctc-channel--info" data-cc="channel">
              <div className="ctc-channel__icon-wrap ctc-channel__icon-wrap--info">
                <Clock size={22} aria-hidden="true" />
              </div>
              <div className="ctc-channel__body">
                <p className="ctc-channel__title">Tiempo de respuesta</p>
                <p className="ctc-channel__value">Menos de 2 horas en horario normal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="ctc-content__col">
          <p className="ctc-content__kicker" data-cc="kicker-right">
            Envíanos un mensaje
          </p>
          <div className="ctc-form-card" data-cc="form-card">
            <ContactoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
