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
    <section className="bg-primary-soft py-20 sm:py-28" aria-labelledby="owner-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <AnimatedSection direction="right">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Para propietarios
            </p>
            <h2
              id="owner-heading"
              className="font-comfortaa text-3xl font-bold text-brand-charcoal sm:text-4xl"
            >
              ¿Tienes una propiedad en Xalapa?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-gray">
              Únete a la red de propietarios Mobbitrips y convierte tu propiedad en una fuente de
              ingresos sin complicaciones. Nosotros gestionamos todo, tú cobras.
            </p>
            <Link
              href="/servicios"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Quiero listar mi propiedad
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </AnimatedSection>

          {/* Beneficios */}
          <div className="flex flex-col gap-4">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <AnimatedSection key={title} direction="left" delay={i * 0.1}>
                <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
                    <Icon size={22} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-comfortaa text-sm font-semibold text-brand-charcoal">
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
