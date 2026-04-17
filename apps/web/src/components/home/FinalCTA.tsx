import Link from 'next/link';
import { Search, MessageCircle } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';
const WA_MESSAGE = encodeURIComponent(
  '¡Hola! Me gustaría información sobre sus propiedades vacacionales.',
);

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="final-cta-heading"
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-[#E05C58] to-[#D4504C]"
        aria-hidden="true"
      />
      {/* Círculo decorativo */}
      <div
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white opacity-5"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white opacity-5"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/70">
            ¿Listo para tu próxima escapada?
          </p>
          <h2
            id="final-cta-heading"
            className="font-comfortaa text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Tu hogar lejos de casa te espera en Xalapa
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Reserva hoy y empieza a contar los días. Sin complicaciones, sin intermediarios, con
            toda la calidez de Mobbitrips.
          </p>
        </AnimatedSection>

        <AnimatedSection
          direction="up"
          delay={0.15}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-brand-cream hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Search size={18} aria-hidden="true" />
            Ver propiedades disponibles
          </Link>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Hablar por WhatsApp
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
