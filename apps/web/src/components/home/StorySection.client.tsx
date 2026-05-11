'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface StorySectionClientProps {
  children: ReactNode;
}

/**
 * Wrapper client que monta la coreografía de la Story:
 *  - Master timeline disparado por ScrollTrigger (start: 'top 75%')
 *  - Parallax scrub independiente para shapes, panel y watermark
 *  - Respeta prefers-reduced-motion con early return + clearProps
 *
 * El JSX (server) marca los elementos con [data-story-reveal="..."]
 * y [data-story-parallax="..."]; aquí solo nos toca animar.
 */
export function StorySectionClient({ children }: StorySectionClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      const kicker = q('[data-story-reveal="kicker"]');
      const words = q('[data-story-reveal="word"]');
      const script = q('[data-story-reveal="script"]');
      const underlinePath = q('[data-story-reveal="underline"]') as unknown as SVGPathElement[];
      const body = q('[data-story-reveal="body"]');
      const listItems = q('[data-story-reveal="list-item"]');
      const cta = q('[data-story-reveal="cta"]');
      const panel = q('[data-story-reveal="panel"]');
      const watermark = q('[data-story-reveal="watermark"]');
      const badges = q('[data-story-reveal="badge"]');

      const parallaxWatermark = q('[data-story-parallax="watermark"]');
      const parallaxShapes = q('[data-story-parallax="shapes"]');
      const parallaxPanel = q('[data-story-parallax="panel"]');

      const allReveals = [
        ...kicker,
        ...words,
        ...script,
        ...body,
        ...listItems,
        ...cta,
        ...panel,
        ...watermark,
        ...badges,
      ];

      // Reduced motion: asegurar visibilidad y abortar
      if (reduce) {
        gsap.set(allReveals, { clearProps: 'all', opacity: 1 });
        if (underlinePath[0]) {
          gsap.set(underlinePath, { strokeDashoffset: 0, clearProps: 'all' });
        }
        return;
      }

      // Estados iniciales (antes de la timeline, evita flash)
      gsap.set(kicker, { y: 16, opacity: 0 });
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(script, { scale: 0.85, rotate: -3, opacity: 0, transformOrigin: '0% 100%' });
      gsap.set(body, { y: 24, opacity: 0 });
      gsap.set(listItems, { x: -12, opacity: 0 });
      gsap.set(listItems.map((li) => li.querySelector('.story__list-dot')).filter(Boolean), {
        scale: 0,
        transformOrigin: '50% 50%',
      });
      gsap.set(cta, { y: 20, opacity: 0 });
      gsap.set(panel, { y: 60, scale: 0.97, opacity: 0, transformOrigin: '50% 50%' });
      gsap.set(watermark, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(badges, { y: 32, scale: 0.92, opacity: 0, transformOrigin: '50% 50%' });

      // Underline: calcular longitud real para strokeDashoffset
      const path = underlinePath[0];
      let totalLength = 220;
      if (path && typeof path.getTotalLength === 'function') {
        totalLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });
      }

      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.to(kicker, { y: 0, opacity: 1, duration: 0.6 }, 0)
        .to(
          words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.09,
          },
          0.08,
        )
        .to(
          script,
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
          },
          '>-0.1',
        );

      if (path) {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.7,
          },
          '>+0.1',
        );
      }

      tl.to(
        body,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
        },
        0.5,
      )
        .to(
          listItems,
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
          },
          '>-0.3',
        )
        .to(
          listItems.map((li) => li.querySelector('.story__list-dot')).filter(Boolean),
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.8)',
            stagger: 0.08,
          },
          '<',
        )
        .to(
          cta,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '>-0.2',
        );

      // Panel + watermark + badges en paralelo con el bloque izquierdo
      tl.to(
        panel,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
        },
        0.2,
      )
        .to(
          watermark,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
          },
          '>-0.3',
        )
        .to(
          badges,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'back.out(1.6)',
            stagger: 0.14,
          },
          '>-0.4',
        );

      // Parallax scrub independiente
      if (parallaxWatermark.length) {
        gsap.to(parallaxWatermark, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
      if (parallaxShapes.length) {
        gsap.to(parallaxShapes, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
      if (parallaxPanel.length) {
        gsap.to(parallaxPanel, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Cleanup explícito de los ScrollTriggers creados aquí
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === root) st.kill();
        });
      };
    },
    { scope: containerRef, dependencies: [reduce] },
  );

  return (
    <div ref={containerRef} className="story__motion-root">
      {children}
    </div>
  );
}
