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
      className="relative overflow-hidden py-24 sm:py-36"
      aria-labelledby="final-cta-heading"
      style={{ background: 'linear-gradient(135deg, #ED6864 0%, #C94540 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0L40 20L20 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <p
            className="mb-5 text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            ¿Listo para tu próxima escapada?
          </p>
          <h2
            id="final-cta-heading"
            className="font-comfortaa font-bold text-white"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Tu hogar lejos
            <br />
            de casa te espera.
          </h2>
          <p
            className="mx-auto mt-6 max-w-md text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
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
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-primary shadow-xl transition-all duration-200 hover:bg-brand-cream hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Search size={18} aria-hidden="true" />
            Ver propiedades
          </Link>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            style={{ borderColor: 'rgba(255,255,255,0.45)' }}
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
