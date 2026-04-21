import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Wrench, Users, BarChart3, Shield, Headphones } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

export const metadata: Metadata = {
  title: 'Para propietarios — Mobbitrips',
  description:
    'Convierte tu propiedad en una fuente de ingresos sin complicaciones. Mobbitrips gestiona todo.',
};

const benefits = [
  {
    icon: TrendingUp,
    title: 'Más ingresos',
    description:
      'Precios dinámicos calibrados al mercado para maximizar tu ocupación y ganancias cada mes.',
  },
  {
    icon: Wrench,
    title: 'Gestión completa',
    description:
      'Limpieza profesional, mantenimiento preventivo y atención a huéspedes. Tú solo cobras.',
  },
  {
    icon: Users,
    title: 'Huéspedes verificados',
    description:
      'Filtramos y verificamos cada reserva. Solo aceptamos viajeros con perfil y buen historial.',
  },
  {
    icon: BarChart3,
    title: 'Reportes mensuales',
    description:
      'Transparencia total: ingresos, ocupación, reseñas y estado de tu propiedad cada mes.',
  },
  {
    icon: Shield,
    title: 'Tu propiedad protegida',
    description:
      'Protocolo de revisión antes y después de cada estancia. Tu inversión, bien cuidada.',
  },
  {
    icon: Headphones,
    title: 'Soporte directo',
    description:
      'Un equipo real disponible para ti y tus huéspedes. Sin bots, sin tickets, sin esperas.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Nos contactas',
    description:
      'Cuéntanos sobre tu propiedad. Te respondemos en menos de 24 horas con una evaluación inicial sin compromiso.',
  },
  {
    num: '02',
    title: 'Visitamos y preparamos',
    description:
      'Nuestro equipo visita la propiedad, toma fotografías profesionales y la prepara para recibir huéspedes.',
  },
  {
    num: '03',
    title: 'Publicamos y gestionamos',
    description:
      'La propiedad aparece en nuestros canales. Nosotros manejamos todo — tú recibes los depósitos cada mes.',
  },
];

export default function ServiciosPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        style={{ background: '#1C1C1C' }}
        className="py-24 sm:py-32"
        aria-labelledby="servicios-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Para propietarios
              </p>
            </div>
            <h1
              id="servicios-heading"
              className="font-comfortaa font-bold text-white"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Tu propiedad trabaja.
              <br />
              <em className="not-italic text-primary">Tú descansas.</em>
            </h1>
            <p
              className="mt-8 max-w-xl text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Gestionamos tu propiedad vacacional de principio a fin: desde la fotografía hasta el
              depósito mensual. Sin complicaciones, sin sorpresas.
            </p>
            <div className="mt-10">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Quiero listar mi propiedad
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Qué incluye
              </p>
            </div>
            <h2
              id="benefits-heading"
              className="font-comfortaa font-bold text-brand-charcoal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              Todo lo que necesitas,
              <br />
              sin hacer nada.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <AnimatedSection key={title} direction="up" delay={i * 0.08}>
                <div className="flex flex-col gap-4 rounded-2xl bg-brand-cream p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Icon size={18} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-comfortaa text-base font-bold text-brand-charcoal">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-gray">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        style={{ background: '#1C1C1C' }}
        className="py-20 sm:py-28"
        aria-labelledby="process-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                El proceso
              </p>
            </div>
            <h2
              id="process-heading"
              className="font-comfortaa font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              Simple, rápido
              <br />y sin letra chica.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
            {steps.map(({ num, title, description }, i) => (
              <AnimatedSection key={num} direction="up" delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 border-t py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-4 lg:first:border-l-0 lg:first:pl-0"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <span
                    className="font-comfortaa text-5xl font-bold leading-none"
                    style={{ color: '#ED6864', opacity: 0.35 }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <h3 className="font-comfortaa text-lg font-bold text-white">{title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {description}
                  </p>
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
        aria-labelledby="servicios-cta-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <h2
              id="servicios-cta-heading"
              className="font-comfortaa font-bold text-white"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              ¿Listo para que tu
              <br />
              propiedad trabaje?
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              Cuéntanos sobre tu propiedad y te decimos cómo podemos ayudarte.
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-primary shadow-xl transition-all hover:bg-brand-cream hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Contáctanos
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
