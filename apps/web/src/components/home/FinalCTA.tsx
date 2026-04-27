import Link from 'next/link';
import { Search, MessageCircle } from 'lucide-react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';
const WA_MESSAGE = encodeURIComponent(
  '¡Hola! Me gustaría información sobre sus propiedades vacacionales.',
);

export function FinalCTA() {
  return (
    <section className="finalcta" aria-labelledby="finalcta-title">
      <div className="finalcta__blob finalcta__blob--1" aria-hidden="true" />
      <div className="finalcta__blob finalcta__blob--2" aria-hidden="true" />
      <div className="finalcta__inner">
        <p className="finalcta__kicker">¿Listo para tu próxima escapada?</p>
        <h2 id="finalcta-title" className="finalcta__title">
          Tu hogar lejos
          <br />
          <span className="script-inline">de casa</span> te espera.
        </h2>
        <p className="finalcta__sub">
          Reserva hoy y empieza a contar los días. Sin complicaciones, sin intermediarios, con toda
          la calidez de Mobbitrips.
        </p>
        <div className="finalcta__actions">
          <Link href="/propiedades" className="finalcta__btn-primary">
            <Search size={18} aria-hidden="true" />
            Ver propiedades
          </Link>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="finalcta__btn-secondary"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
