'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@mobbitrips/ui';

const schema = z.object({
  guest_name: z.string().min(2, 'Ingresa tu nombre completo'),
  guest_email: z.string().email('Email inválido'),
  guest_phone: z.string().regex(/^(\+?52)?[ -]?[0-9]{10}$/, 'Teléfono de 10 dígitos'),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

interface ReservaFormProps {
  propertySlug: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalMxn: number;
}

export function ReservaForm({
  propertySlug,
  checkIn,
  checkOut,
  guests,
  totalMxn,
}: ReservaFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        property_slug: propertySlug,
        check_in_date: checkIn,
        check_out_date: checkOut,
        guests,
        total_mxn: totalMxn,
      }),
    });

    const json = (await res.json()) as { id?: string; error?: unknown };

    if (!res.ok) {
      setServerError('Ocurrió un error. Por favor intenta de nuevo.');
      return;
    }

    router.push(`/reserva/${json.id}/exito`);
  };

  const inputClass =
    'w-full rounded-xl border border-brand-border px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  const errorClass = 'mt-1 text-xs text-status-error';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="guest_name"
          className="mb-1.5 block text-sm font-medium text-brand-charcoal"
        >
          Nombre completo *
        </label>
        <input
          id="guest_name"
          type="text"
          placeholder="Nombre y apellido"
          className={inputClass}
          {...register('guest_name')}
        />
        {errors.guest_name && <p className={errorClass}>{errors.guest_name.message}</p>}
      </div>

      <div>
        <label
          htmlFor="guest_email"
          className="mb-1.5 block text-sm font-medium text-brand-charcoal"
        >
          Correo electrónico *
        </label>
        <input
          id="guest_email"
          type="email"
          placeholder="tu@email.com"
          className={inputClass}
          {...register('guest_email')}
        />
        {errors.guest_email && <p className={errorClass}>{errors.guest_email.message}</p>}
      </div>

      <div>
        <label
          htmlFor="guest_phone"
          className="mb-1.5 block text-sm font-medium text-brand-charcoal"
        >
          Teléfono (WhatsApp) *
        </label>
        <input
          id="guest_phone"
          type="tel"
          placeholder="2281234567"
          className={inputClass}
          {...register('guest_phone')}
        />
        {errors.guest_phone && <p className={errorClass}>{errors.guest_phone.message}</p>}
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Notas o comentarios
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="¿Hay algo que debamos saber? (opcional)"
          className={`${inputClass} resize-none`}
          {...register('notes')}
        />
        {errors.notes && <p className={errorClass}>{errors.notes.message}</p>}
      </div>

      {serverError && (
        <p className="rounded-xl bg-status-error/10 px-4 py-3 text-sm text-status-error">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        aria-label="Enviar solicitud de reserva"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Enviando solicitud…
          </span>
        ) : (
          'Solicitar reserva'
        )}
      </Button>

      <p className="text-center text-xs text-brand-light">
        No se realiza ningún cargo en este momento
      </p>
    </form>
  );
}
