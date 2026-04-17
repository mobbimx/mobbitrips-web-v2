import { BadgeDollarSign, Headphones, Zap, ShieldCheck } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

const reasons = [
  {
    icon: BadgeDollarSign,
    title: 'Mejor precio garantizado',
    description:
      'Sin comisiones de plataformas intermediarias. Reservar directo siempre es más barato.',
  },
  {
    icon: Headphones,
    title: 'Atención directa y humana',
    description:
      'Hablas con nosotros, no con un bot. Resolvemos cualquier duda antes, durante y después.',
  },
  {
    icon: Zap,
    title: 'Confirmación inmediata',
    description:
      'Tu reserva se confirma en minutos. Sin esperas, sin incertidumbre, sin sorpresas.',
  },
  {
    icon: ShieldCheck,
    title: 'Pago 100% seguro',
    description:
      'Stripe y PayU con cifrado de nivel bancario. Nunca tocamos los datos de tu tarjeta.',
  },
];

export function WhyBookDirect() {
  return (
    <section className="bg-brand-cream py-20 sm:py-28" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            ¿Por qué reservar directo?
          </p>
          <h2
            id="why-heading"
            className="font-comfortaa text-3xl font-bold text-brand-charcoal sm:text-4xl"
          >
            Sin intermediarios, mejor experiencia
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <AnimatedSection key={title} direction="up" delay={i * 0.1}>
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft">
                  <Icon size={24} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-comfortaa text-base font-semibold text-brand-charcoal">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-gray">{description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
