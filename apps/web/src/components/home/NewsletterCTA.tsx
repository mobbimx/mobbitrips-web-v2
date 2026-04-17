'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
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
    <section className="bg-white py-20 sm:py-28" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft">
            <Mail size={26} className="text-primary" aria-hidden="true" />
          </div>
          <h2
            id="newsletter-heading"
            className="font-comfortaa text-3xl font-bold text-brand-charcoal sm:text-4xl"
          >
            ¿Quieres las mejores ofertas?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-gray">
            Suscríbete y sé el primero en conocer disponibilidades especiales, guías de Xalapa y
            descuentos exclusivos para reservas directas.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.15} className="mt-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-green-50 p-8 text-center">
              <CheckCircle2 size={36} className="text-status-success" aria-hidden="true" />
              <p className="font-comfortaa text-lg font-semibold text-brand-charcoal">
                ¡Listo, ya estás suscrito!
              </p>
              <p className="text-sm text-brand-gray">
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
            <p
              className="mt-3 flex items-center justify-center gap-1.5 text-sm text-status-error"
              role="alert"
            >
              <AlertCircle size={14} aria-hidden="true" />
              Ocurrió un error. Por favor intenta de nuevo.
            </p>
          )}

          <p className="mt-4 text-center text-xs text-brand-light">
            Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
