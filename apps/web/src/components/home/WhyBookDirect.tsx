import { AnimatedSection } from '@mobbitrips/ui';

const reasons = [
  {
    num: '01',
    title: 'Mejor precio garantizado',
    desc: 'Sin comisiones de plataformas intermediarias. Reservar directo siempre es más barato.',
  },
  {
    num: '02',
    title: 'Atención directa y humana',
    desc: 'Hablas con nosotros, no con un bot. Resolvemos cualquier duda antes, durante y después.',
  },
  {
    num: '03',
    title: 'Confirmación inmediata',
    desc: 'Tu reserva se confirma en minutos. Sin esperas, sin incertidumbre, sin sorpresas.',
  },
  {
    num: '04',
    title: 'Pago 100% seguro',
    desc: 'Stripe y PayU con cifrado bancario. Nunca tocamos los datos de tu tarjeta.',
  },
];

export function WhyBookDirect() {
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="why__blob why__blob--1" aria-hidden="true" />
      <div className="why__blob why__blob--2" aria-hidden="true" />
      <div className="why__inner">
        <AnimatedSection direction="up">
          <span className="why__kicker">¿Por qué reservar directo?</span>
          <h2 id="why-title" className="why__title">
            Sin intermediarios, <span className="script-inline">mejor precio.</span>
          </h2>
        </AnimatedSection>
        <div className="why__grid">
          {reasons.map(({ num, title, desc }, i) => (
            <AnimatedSection key={num} direction="up" delay={i * 0.08}>
              <div className="why__item">
                <span className="why__num" aria-hidden="true">
                  {num}
                </span>
                <h3 className="why__item-title">{title}</h3>
                <p className="why__item-desc">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
