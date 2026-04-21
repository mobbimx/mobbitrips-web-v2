import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';
import { HeroSearchWidget } from './HeroSearchWidget';

const stats = [
  { value: '9', label: 'propiedades' },
  { value: '4.9★', label: 'promedio' },
  { value: '+50', label: 'estancias felices' },
  { value: '0%', label: 'comisión extra' },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      aria-label="Bienvenida"
    >
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(140deg, #FDF2F0 0%, #FAF8F5 55%, #F3EBE7 100%)',
        }}
      />
      <div className="absolute left-0 top-0 -z-10 h-0.5 w-40 bg-primary" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={0} duration={0.5}>
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-primary" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Xalapa, Veracruz · Rentas vacacionales
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.08} duration={0.7}>
          <h1
            className="font-comfortaa font-bold text-brand-charcoal"
            style={{
              fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Descansa, <em className="not-italic text-primary">vive</em>
            <br />
            y sueña como
            <br />
            <span style={{ color: '#B8B0AC' }}>en casa.</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.18} duration={0.6}>
          <div className="mt-10 mb-10 flex flex-wrap items-center gap-8 border-t border-brand-border pt-6">
            {stats.map(({ value, label }, i) => (
              <div key={label} className="flex items-baseline gap-1.5">
                {i > 0 && (
                  <div
                    className="mr-4 hidden h-3 w-px bg-brand-border sm:block"
                    aria-hidden="true"
                  />
                )}
                <span className="font-comfortaa text-xl font-bold text-brand-charcoal sm:text-2xl">
                  {value}
                </span>
                <span className="text-xs text-brand-gray">{label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.28} duration={0.7} className="max-w-3xl">
          <HeroSearchWidget />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.38} duration={0.5} className="mt-6">
          <Link
            href="/propiedades"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand-gray transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
          >
            Explorar todas las propiedades
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
