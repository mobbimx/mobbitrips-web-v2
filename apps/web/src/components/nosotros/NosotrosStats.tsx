'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const STATS = [
  { prefix: '', end: 9, decimals: 0, suffix: '', label: 'propiedades' },
  { prefix: '', end: 4.9, decimals: 1, suffix: '★', label: 'calificación promedio' },
  { prefix: '+', end: 50, decimals: 0, suffix: '', label: 'estancias felices' },
  { prefix: '', end: 100, decimals: 0, suffix: '%', label: 'reserva directa' },
];

function fmt(s: (typeof STATS)[number], val: number): string {
  return `${s.prefix}${s.decimals ? val.toFixed(s.decimals) : Math.round(val)}${s.suffix}`;
}

export function NosotrosStats() {
  const ref = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      if (reduce) {
        STATS.forEach((s, i) => {
          const el = numRefs.current[i];
          if (el) el.textContent = fmt(s, s.end);
        });
        return;
      }

      const labels = root.querySelectorAll<HTMLElement>('[data-stat-label]');
      gsap.set(labels, { y: 14, opacity: 0 });

      let entered = false;
      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 82%',
        onEnter: () => {
          if (entered) return;
          entered = true;

          STATS.forEach((s, i) => {
            const el = numRefs.current[i];
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: s.end,
              duration: 1.8,
              ease: 'power2.out',
              delay: i * 0.08,
              onUpdate() {
                el.textContent = fmt(s, obj.val);
              },
              onComplete() {
                el.textContent = fmt(s, s.end);
              },
            });
          });

          gsap.to(labels, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'expo.out',
            delay: 0.15,
          });
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="nos-stats" aria-label="Cifras de Mobbitrips">
      <div className="nos-stats__inner">
        <div className="nos-stats__grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="nos-stats__item">
              <span
                className="nos-stats__value"
                ref={(el) => {
                  numRefs.current[i] = el;
                }}
                aria-label={`${s.prefix}${s.end}${s.suffix}`}
              >
                {fmt(s, 0)}
              </span>
              <span className="nos-stats__label" data-stat-label>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
