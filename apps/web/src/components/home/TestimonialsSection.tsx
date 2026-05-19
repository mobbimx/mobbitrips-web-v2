'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { StarRating } from '@mobbitrips/ui';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { MOCK_TESTIMONIALS } from '@/lib/mocks';

const ROW1 = [...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS];
const ROW2 = [...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS];

function TestiCard({ t }: { t: (typeof MOCK_TESTIMONIALS)[number] }) {
  return (
    <>
      <StarRating value={t.rating} size="sm" />
      <blockquote className="testi__card-text">&ldquo;{t.text}&rdquo;</blockquote>
      <footer className="testi__card-footer">
        <div className={`testi__avatar ${t.color}`} aria-hidden="true">
          {t.initials}
        </div>
        <div>
          <p className="testi__card-name">{t.name}</p>
          <p className="testi__card-loc">{t.location}</p>
        </div>
      </footer>
    </>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const kicker = q('[data-testi="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-testi="title"]');
      const subtitle = q('[data-testi="subtitle"]');

      if (reduce) {
        gsap.set([kicker, subtitle], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) {
        split = new SplitType(titleEl, { types: 'words' });
      }
      const words = split?.words ?? [];

      gsap.set(kicker, { y: 20, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 40, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 30, opacity: 0 });
      }
      gsap.set(subtitle, { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.to(kicker, { y: 0, opacity: 1, duration: 0.6 }, 0);

      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.85, stagger: 0.07 }, 0.1);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.85 }, 0.1);
      }

      tl.to(subtitle, { y: 0, opacity: 1, duration: 0.6 }, '>-0.3');

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
    <section ref={ref} className="testi" aria-labelledby="testi-title">
      <div className="testi__header">
        <span className="testi__kicker" data-testi="kicker">
          Huéspedes
        </span>
        <h2 id="testi-title" className="testi__title" data-testi="title">
          Lo que dicen <span className="script-inline">nuestros huéspedes.</span>
        </h2>
        <p className="testi__subtitle" data-testi="subtitle">
          Opiniones reales de quienes ya vivieron la experiencia Mobbitrips.
        </p>
        <ul className="sr-only" aria-label="Testimonios">
          {MOCK_TESTIMONIALS.map((t) => (
            <li key={t.id}>
              <strong>{t.name}</strong> — {t.location}: {t.text}
            </li>
          ))}
        </ul>
      </div>

      {reduce ? (
        <div className="testi__reduced-grid">
          {MOCK_TESTIMONIALS.map((t) => (
            <article key={t.id} className="testi__card">
              <TestiCard t={t} />
            </article>
          ))}
        </div>
      ) : (
        <div className="testi__marquee-wrap" aria-hidden="true">
          <div className="testi-track testi-track--left">
            <div className="testi-track__inner">
              {ROW1.map((t, i) => (
                <motion.article
                  key={`r1-${i}`}
                  className="testi__card"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <TestiCard t={t} />
                </motion.article>
              ))}
            </div>
          </div>

          <div className="testi-track testi-track--right">
            <div className="testi-track__inner">
              {ROW2.map((t, i) => (
                <motion.article
                  key={`r2-${i}`}
                  className="testi__card"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <TestiCard t={t} />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
