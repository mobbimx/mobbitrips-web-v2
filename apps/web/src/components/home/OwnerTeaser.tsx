import Link from 'next/link';
import { TrendingUp, Wrench, Users } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Maximiza tus ingresos',
    desc: 'Gestión profesional con precios dinámicos para llenar tu calendario.',
  },
  {
    icon: Wrench,
    title: 'Sin preocupaciones',
    desc: 'Nos encargamos de todo: limpieza, mantenimiento y atención a huéspedes.',
  },
  {
    icon: Users,
    title: 'Huéspedes verificados',
    desc: 'Solo aceptamos reservas de viajeros con perfil verificado y buen historial.',
  },
];

export function OwnerTeaser() {
  return (
    <section className="owner" aria-labelledby="owner-title">
      <div className="owner__blob" aria-hidden="true" />
      <div className="owner__inner">
        <AnimatedSection direction="right">
          <span className="owner__kicker">Para propietarios</span>
          <h2 id="owner-title" className="owner__title">
            ¿Tienes una propiedad <span className="script-inline">vacacional?</span>
          </h2>
          <p className="owner__body">
            Únete a la red de propietarios Mobbitrips y convierte tu propiedad en una fuente de
            ingresos sin complicaciones. Nosotros gestionamos todo, tú descansas y cobras.
          </p>
          <Link href="/servicios" className="owner__cta">
            Quiero listar mi propiedad
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </AnimatedSection>

        <div className="owner__benefits">
          {benefits.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedSection key={title} direction="left" delay={i * 0.08}>
              <div className="owner__benefit">
                <div className="owner__benefit-icon">
                  <Icon size={18} color="var(--coral-900)" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="owner__benefit-title">{title}</h3>
                  <p className="owner__benefit-desc">{desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
