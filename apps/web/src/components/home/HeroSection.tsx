import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';
import { HeroSearchWidget } from './HeroSearchWidget';

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
      aria-label="Bienvenida"
    >
      {/* Fondo degradado cálido */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, #FDF0EF 0%, #FAF8F5 50%, #F4E8E0 100%)',
        }}
      />

      {/* Círculos decorativos */}
      <div
        className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary opacity-[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-primary opacity-[0.08] blur-2xl"
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={0} duration={0.7} className="text-center">
          {/* Eyebrow */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Xalapa, Veracruz · Propiedades vacacionales
          </p>

          {/* Headline */}
          <h1 className="mb-6 font-comfortaa text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl lg:text-6xl">
            Descansa, vive y sueña{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-primary">como en casa</span>
              {/* Subrayado decorativo */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 C60 3, 120 11, 180 5 S260 2, 298 7"
                  stroke="#ED6864"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-brand-gray sm:text-xl">
            Reserva directo con nosotros y obtén el mejor precio. Propiedades cuidadas al detalle en
            los mejores rincones de Xalapa.
          </p>
        </AnimatedSection>

        {/* Search widget */}
        <AnimatedSection direction="up" delay={0.15} duration={0.7}>
          <HeroSearchWidget />
        </AnimatedSection>

        {/* CTA secundario */}
        <AnimatedSection direction="up" delay={0.25} duration={0.6} className="mt-8 text-center">
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
          >
            O explora todas nuestras propiedades
            <ChevronDown size={15} className="animate-bounce" aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </div>

      {/* Ola inferior */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 C240 60, 480 0, 720 30 S1200 60, 1440 30 L1440 60 L0 60 Z"
            fill="#FAF8F5"
          />
        </svg>
      </div>
    </section>
  );
}
