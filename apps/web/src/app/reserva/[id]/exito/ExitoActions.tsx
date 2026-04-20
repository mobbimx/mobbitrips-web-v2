'use client';

import { useState } from 'react';
import { Loader2, MessageCircle, CreditCard } from 'lucide-react';
import { Button } from '@mobbitrips/ui';

interface ExitoActionsProps {
  reservationId: string;
  isPaid: boolean;
  waUrl: string;
}

export function ExitoActions({ reservationId, isPaid, waUrl }: ExitoActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePagar = async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservation_id: reservationId }),
    });

    const json = (await res.json()) as { url?: string; error?: string };

    if (!res.ok || !json.url) {
      setError('No se pudo iniciar el pago. Escríbenos por WhatsApp.');
      setLoading(false);
      return;
    }

    window.location.href = json.url;
  };

  return (
    <div className="space-y-3">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Escríbenos por WhatsApp
      </a>

      {!isPaid && (
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handlePagar}
          disabled={loading}
          aria-label="Pagar reserva con tarjeta"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Preparando pago…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <CreditCard size={16} aria-hidden="true" />
              Pagar con tarjeta
            </span>
          )}
        </Button>
      )}

      {error && (
        <p className="rounded-xl bg-status-error/10 px-4 py-3 text-center text-sm text-status-error">
          {error}
        </p>
      )}
    </div>
  );
}
