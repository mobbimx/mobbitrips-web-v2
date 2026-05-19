'use client';

import { useState, useRef } from 'react';
import { z } from 'zod';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const emailSchema = z.string().email('Por favor ingresa un correo válido.');
type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const card = q('[data-nl="card"]');
      const kicker = q('[data-nl="kicker"]');
      const titleEl = root.querySelector<HTMLElement>('[data-nl="title"]');
      const sub = q('[data-nl="sub"]');
      const formCol = q('[data-nl="form-col"]');

      if (reduce) {
        gsap.set([card, kicker, sub, formCol], { clearProps: 'all', opacity: 1 });
        if (titleEl) gsap.set(titleEl, { clearProps: 'all', opacity: 1 });
        return;
      }

      let split: SplitType | null = null;
      if (titleEl) {
        split = new SplitType(titleEl, { types: 'words' });
      }
      const words = split?.words ?? [];

      gsap.set(card, { y: 50, opacity: 0 });
      gsap.set(kicker, { y: 16, opacity: 0 });
      if (words.length) {
        gsap.set(words, { y: 36, opacity: 0 });
      } else if (titleEl) {
        gsap.set(titleEl, { y: 24, opacity: 0 });
      }
      gsap.set(sub, { y: 16, opacity: 0 });
      gsap.set(formCol, { x: 24, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.to(card, { y: 0, opacity: 1, duration: 0.7 }, 0);
      tl.to(kicker, { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      if (words.length) {
        tl.to(words, { y: 0, opacity: 1, duration: 0.75, stagger: 0.06 }, 0.3);
      } else if (titleEl) {
        tl.to(titleEl, { y: 0, opacity: 1, duration: 0.75 }, 0.3);
      }
      tl.to(sub, { y: 0, opacity: 1, duration: 0.5 }, '>-0.25');
      tl.to(formCol, { x: 0, opacity: 1, duration: 0.65 }, 0.25);

      return () => {
        split?.revert();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === root) st.kill();
        });
      };
    },
    { scope: ref, dependencies: [reduce] },
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? 'Correo inválido');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section ref={ref} className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__outer">
        <div className="newsletter__card" data-nl="card">
          <div className="newsletter__card-deco" aria-hidden="true" />

          <div className="newsletter__copy">
            <span className="newsletter__kicker" data-nl="kicker">
              Newsletter
            </span>
            <h2 id="newsletter-title" className="newsletter__title" data-nl="title">
              Las mejores ofertas, <span className="script-inline">en tu correo.</span>
            </h2>
            <p className="newsletter__sub" data-nl="sub">
              Suscríbete y sé el primero en conocer disponibilidades especiales, guías de destino y
              descuentos para reservas directas.
            </p>
          </div>

          <div className="newsletter__form-col" data-nl="form-col">
            {status === 'success' ? (
              <div className="newsletter__success">
                <CheckCircle2 size={28} color="#ED6864" aria-hidden="true" />
                <p className="newsletter__success-title">¡Listo, ya estás suscrito!</p>
                <p className="newsletter__success-sub">
                  Pronto recibirás noticias y ofertas en tu correo.
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} noValidate className="newsletter__form">
                  <input
                    type="email"
                    className="newsletter__input"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                      if (status === 'error') setStatus('idle');
                    }}
                    aria-label="Correo electrónico"
                    autoComplete="email"
                    disabled={status === 'loading'}
                  />
                  <button type="submit" className="newsletter__btn" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
                  </button>
                </form>
                {error && (
                  <p className="newsletter__error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    {error}
                  </p>
                )}
                {status === 'error' && !error && (
                  <p className="newsletter__error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    Ocurrió un error. Por favor intenta de nuevo.
                  </p>
                )}
                <p className="newsletter__fine">Sin spam. Puedes darte de baja cuando quieras.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
