import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, Zap } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

export const metadata: Metadata = {
  title: 'Nosotros — Mobbitrips',
  description:
    'Conoce la historia y el equipo detrás de Mobbitrips. Hacemos que cada viaje se sienta como en casa.',
};

const values = [
  {
    icon: Heart,
    title: 'Calidez primero',
    description:
      'Cada propiedad es seleccionada y cuidada como si fuera nuestra propia casa. Porque eso es exactamente lo que es.',
  },
  {
    icon: Shield,
    title: 'Transparencia total',
    description:
      'Sin comisiones escondidas, sin sorpresas. El precio que ves es el que pagas. Así de simple.',
  },
  {
    icon: Zap,
    title: 'Respuesta inmediata',
    description:
      'Nuestro equipo está siempre disponible. Porque cuando viajas, el tiempo no puede esperar.',
  },
];

const stats = [
  { value: '9', label: 'propiedades' },
  { value: '4.9★', label: 'calificación promedio' },
  { value: '+50', label: 'estancias felices' },
  { value: '100%', label: 'reserva directa' },
];

export default function NosotrosPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="py-24 sm:py-32"
        style={{ background: '#1C1C1C' }}
        aria-labelledby="nosotros-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Quiénes somos
              </p>
            </div>
            <h1
              id="nosotros-heading"
              className="font-comfortaa font-bold text-white"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Hacemos que cada
              <br />
              viaje se sienta
              <br />
              <em className="not-italic text-primary">como en casa.</em>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="bg-brand-cream py-20 sm:py-28" aria-labelledby="story-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection direction="right">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Nuestra historia
                </p>
              </div>
              <h2
                id="story-heading"
                className="font-comfortaa font-bold text-brand-charcoal"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
              >
                Empezamos con
                <br />
                una sola propiedad.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-gray">
                Mobbitrips nació de una idea simple: que cada viajero merece hospedarse en un lugar
                que se sienta verdaderamente suyo. No un cuarto de hotel impersonal, sino un hogar
                con personalidad, historia y calidez.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-gray">
                Empezamos administrando una sola propiedad con toda la dedicación del mundo. Hoy
                gestionamos un portafolio de propiedades seleccionadas, cada una con su propio
                carácter, todas con el mismo nivel de cuidado.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-gray">
                La diferencia está en los detalles: en la atención directa, en el precio justo, en
                que siempre hay alguien al otro lado cuando nos necesitas.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.15}>
              <div
                className="flex w-full flex-col justify-between overflow-hidden rounded-2xl p-8"
                style={{ background: '#1C1C1C', minHeight: '360px' }}
                role="img"
                aria-label="Nuestra filosofía"
              >
                <p
                  className="font-comfortaa font-bold leading-none"
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                    color: 'rgba(255,255,255,0.04)',
                    letterSpacing: '-0.04em',
                  }}
                  aria-hidden="true"
                >
                  Mobi
                </p>
                <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="font-comfortaa text-xl font-bold text-white">
                    &ldquo;Que te sientas en casa.&rdquo;
                  </p>
                  <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Nuestra filosofía desde el día uno.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#1C1C1C' }} className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map(({ value, label }, i) => (
              <AnimatedSection key={label} direction="up" delay={i * 0.08}>
                <div className="flex flex-col gap-1">
                  <span
                    className="font-comfortaa font-bold"
                    style={{
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      color: '#ED6864',
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {label}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Lo que nos mueve
              </p>
            </div>
            <h2
              id="values-heading"
              className="font-comfortaa font-bold text-brand-charcoal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              Nuestros valores.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 divide-y divide-brand-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {values.map(({ icon: Icon, title, description }, i) => (
              <AnimatedSection key={title} direction="up" delay={i * 0.1}>
                <div className="flex flex-col gap-5 py-10 sm:px-10 sm:py-0 sm:first:pl-0 sm:last:pr-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                    <Icon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-comfortaa text-lg font-bold text-brand-charcoal">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-gray">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #ED6864 0%, #C94540 100%)' }}
        aria-labelledby="nosotros-cta-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <h2
              id="nosotros-cta-heading"
              className="font-comfortaa font-bold text-white"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              ¿Listo para vivir
              <br />
              la experiencia Mobbitrips?
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              Reserva directo, sin intermediarios, y descubre por qué nuestros huéspedes siempre
              vuelven.
            </p>
            <Link
              href="/propiedades"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-primary shadow-xl transition-all hover:bg-brand-cream hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Ver propiedades
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
