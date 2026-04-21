'use client';

import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button, Input, AnimatedSection } from '@mobbitrips/ui';

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
      if (!res.ok) throw new Error('Error al suscribirse');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      className="py-20 sm:py-28"
      style={{ background: '#1C1C1C' }}
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Newsletter</p>
          </div>
          <h2
            id="newsletter-heading"
            className="font-comfortaa font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
          >
            ¿Quieres las mejores
            <br />
            ofertas?
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Suscríbete y sé el primero en conocer disponibilidades especiales, guías de destino y
            descuentos para reservas directas.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.15} className="mt-8">
          {status === 'success' ? (
            <div
              className="flex flex-col gap-3 rounded-2xl p-8"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <CheckCircle2 size={28} className="text-primary" aria-hidden="true" />
              <p className="font-comfortaa text-lg font-semibold text-white">
                ¡Listo, ya estás suscrito!
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Pronto recibirás noticias y ofertas en tu correo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                    if (status === 'error') setStatus('idle');
                  }}
                  error={error}
                  aria-label="Correo electrónico"
                  autoComplete="email"
                  disabled={status === 'loading'}
                />
              </div>
              <Button type="submit" size="md" loading={status === 'loading'} className="shrink-0">
                Suscribirme
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-status-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              Ocurrió un error. Por favor intenta de nuevo.
            </p>
          )}

          <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
