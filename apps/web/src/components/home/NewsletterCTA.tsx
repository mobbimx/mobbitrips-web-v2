'use client';

import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

const emailSchema = z.string().email('Por favor ingresa un correo válido.');

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

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
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__blob" aria-hidden="true" />
      <div className="newsletter__inner">
        <AnimatedSection direction="up">
          <span className="newsletter__kicker">Newsletter</span>
          <h2 id="newsletter-title" className="newsletter__title">
            Las mejores ofertas, <span className="script-inline">en tu correo.</span>
          </h2>
          <p className="newsletter__sub">
            Suscríbete y sé el primero en conocer disponibilidades especiales, guías de destino y
            descuentos para reservas directas.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.15}>
          {status === 'success' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 16,
                padding: '28px 32px',
              }}
            >
              <CheckCircle2 size={28} color="var(--coral-900)" aria-hidden="true" />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                ¡Listo, ya estás suscrito!
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
                Pronto recibirás noticias y ofertas en tu correo.
              </p>
            </div>
          ) : (
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
          )}

          {error && (
            <p
              style={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.875rem',
                color: '#E05555',
              }}
              role="alert"
            >
              <AlertCircle size={14} aria-hidden="true" />
              {error}
            </p>
          )}
          {status === 'error' && !error && (
            <p
              style={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.875rem',
                color: '#E05555',
              }}
              role="alert"
            >
              <AlertCircle size={14} aria-hidden="true" />
              Ocurrió un error. Por favor intenta de nuevo.
            </p>
          )}

          <p className="newsletter__fine">Sin spam. Puedes darte de baja cuando quieras.</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
