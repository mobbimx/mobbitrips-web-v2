import Link from 'next/link';
import { TrendingUp, Wrench, Users, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Maximiza tus ingresos',
    description: 'Gestión profesional con precios dinámicos para llenar tu calendario.',
  },
  {
    icon: Wrench,
    title: 'Sin preocupaciones',
    description: 'Nos encargamos de todo: limpieza, mantenimiento y atención a huéspedes.',
  },
  {
    icon: Users,
    title: 'Huéspedes verificados',
    description: 'Solo aceptamos reservas de viajeros con perfil verificado y buen historial.',
  },
];

export function OwnerTeaser() {
  return (
    <section className="bg-brand-cream py-20 sm:py-28" aria-labelledby="owner-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <AnimatedSection direction="right">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Para propietarios
              </p>
            </div>
            <h2
              id="owner-heading"
              className="font-comfortaa font-bold text-brand-charcoal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              ¿Tienes una propiedad
              <br />
              en Xalapa?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-gray">
              Únete a la red de propietarios Mobbitrips y convierte tu propiedad en una fuente de
              ingresos sin complicaciones. Nosotros gestionamos todo, tú cobras.
            </p>
            <Link
              href="/servicios"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Quiero listar mi propiedad
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </AnimatedSection>

          {/* Right: Benefits list */}
          <div className="flex flex-col divide-y divide-brand-border">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <AnimatedSection key={title} direction="left" delay={i * 0.08}>
                <div className="flex gap-5 py-6 first:pt-0 last:pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Icon size={18} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-comfortaa text-sm font-bold text-brand-charcoal">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-gray">{description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
