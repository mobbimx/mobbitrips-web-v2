import { AnimatedSection } from '@mobbitrips/ui';

const reasons = [
  {
    num: '01',
    title: 'Mejor precio garantizado',
    description:
      'Sin comisiones de plataformas intermediarias. Reservar directo siempre es más barato.',
  },
  {
    num: '02',
    title: 'Atención directa y humana',
    description:
      'Hablas con nosotros, no con un bot. Resolvemos cualquier duda antes, durante y después.',
  },
  {
    num: '03',
    title: 'Confirmación inmediata',
    description:
      'Tu reserva se confirma en minutos. Sin esperas, sin incertidumbre, sin sorpresas.',
  },
  {
    num: '04',
    title: 'Pago 100% seguro',
    description:
      'Stripe y PayU con cifrado de nivel bancario. Nunca tocamos los datos de tu tarjeta.',
  },
];

export function WhyBookDirect() {
  return (
    <section
      className="py-20 sm:py-28"
      style={{ background: '#1C1C1C' }}
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              ¿Por qué reservar directo?
            </p>
          </div>
          <h2
            id="why-heading"
            className="font-comfortaa font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
          >
            Sin intermediarios,
            <br />
            mejor experiencia.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ num, title, description }, i) => (
            <AnimatedSection key={num} direction="up" delay={i * 0.08}>
              <div
                className="flex flex-col gap-5 border-t py-10 sm:py-0 lg:border-l lg:border-t-0 lg:px-8 lg:py-4 lg:first:border-l-0 lg:first:pl-0"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span
                  className="font-comfortaa text-5xl font-bold leading-none"
                  style={{ color: '#ED6864', opacity: 0.35 }}
                  aria-hidden="true"
                >
                  {num}
                </span>
                <h3 className="font-comfortaa text-base font-bold leading-snug text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
