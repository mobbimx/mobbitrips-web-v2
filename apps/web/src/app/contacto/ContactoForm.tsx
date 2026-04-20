'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@mobbitrips/ui';

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  phone: z.string().max(20).optional(),
  message: z.string().min(5, 'Escribe tu mensaje').max(1000),
});

type FormValues = z.infer<typeof schema>;

export function ContactoForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, source: 'contact_form' }),
    });

    if (!res.ok) {
      setServerError('Ocurrió un error. Por favor intenta de nuevo.');
      return;
    }

    setSent(true);
  };

  const inputClass =
    'w-full rounded-xl border border-brand-border px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-status-success/10 py-10 text-center">
        <CheckCircle size={36} className="text-status-success" aria-hidden="true" />
        <p className="font-semibold text-brand-charcoal">¡Mensaje recibido!</p>
        <p className="text-sm text-brand-gray">Te responderemos pronto por correo o WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Nombre *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Tu nombre"
          className={inputClass}
          {...register('name')}
        />
        {errors.name && <p className="mt-1 text-xs text-status-error">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Correo electrónico *
        </label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          className={inputClass}
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-xs text-status-error">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Teléfono (opcional)
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="2281234567"
          className={inputClass}
          {...register('phone')}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Mensaje *
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="¿En qué te podemos ayudar?"
          className={`${inputClass} resize-none`}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-status-error">{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded-xl bg-status-error/10 px-4 py-3 text-sm text-status-error">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Enviando…
          </span>
        ) : (
          'Enviar mensaje'
        )}
      </Button>
    </form>
  );
}
