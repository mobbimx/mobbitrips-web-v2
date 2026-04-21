import Link from 'next/link';
import { ArrowRight, MapPin, Heart, Home } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

const highlights = [
  { icon: MapPin, text: 'Xalapa, Veracruz — la ciudad más verde de México' },
  { icon: Heart, text: 'Propiedades seleccionadas con cariño y criterio' },
  { icon: Home, text: 'Que te sientas en tu propia casa, esa es la filosofía' },
];

export function StorySection() {
  return (
    <section className="bg-brand-cream py-20 sm:py-28" aria-labelledby="story-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
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
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              Nacimos del amor
              <br />a Xalapa.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-gray">
              Mobbitrips nació de una idea sencilla: Xalapa merece que sus visitantes la vivan de
              verdad, no desde un hotel cualquiera. Empezamos administrando una sola propiedad y hoy
              llevamos cada casa como si fuera la nuestra.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-gray">
              Cada propiedad tiene su historia, su personalidad, su rincón favorito. Nuestro trabajo
              es que la descubras.
            </p>

            <ul className="mt-8 flex flex-col gap-3" role="list">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-brand-charcoal">{text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/nosotros"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:underline"
            >
              Conócenos más
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </AnimatedSection>

          {/* Right: Dark editorial panel */}
          <AnimatedSection direction="left" delay={0.15}>
            <div className="relative">
              <div
                className="flex h-80 w-full flex-col justify-between overflow-hidden rounded-2xl p-8 sm:h-96 lg:h-[440px]"
                style={{ background: '#1C1C1C' }}
                role="img"
                aria-label="Xalapa, la ciudad de las flores, Veracruz"
              >
                <p
                  className="font-comfortaa font-bold leading-none"
                  style={{
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    color: 'rgba(255,255,255,0.04)',
                    letterSpacing: '-0.04em',
                  }}
                  aria-hidden="true"
                >
                  Xalapa
                </p>
                <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="font-comfortaa text-xl font-bold text-white sm:text-2xl">
                    &ldquo;La ciudad de las flores&rdquo;
                  </p>
                  <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Veracruz, México
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-white px-5 py-4 shadow-lg sm:block">
                <p className="font-comfortaa text-2xl font-bold text-primary">+50</p>
                <p className="text-xs text-brand-gray">estancias felices</p>
              </div>
              <div
                className="absolute -right-4 top-8 hidden rounded-xl px-5 py-4 shadow-lg sm:block"
                style={{ background: '#ED6864' }}
              >
                <p className="font-comfortaa text-2xl font-bold text-white">4.9★</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  calificación
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
