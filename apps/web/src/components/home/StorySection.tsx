import Link from 'next/link';
import { ArrowRight, MapPin, Heart, Home } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';

const highlights = [
  { icon: MapPin, text: 'Xalapa, Veracruz — la ciudad más verde de México' },
  { icon: Heart, text: 'Propiedades seleccionadas con cariño y criterio' },
  { icon: Home, text: 'La filosofía: que te sientas como en tu propia casa' },
];

export function StorySection() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="story-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Texto */}
          <AnimatedSection direction="right">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Nuestra historia
            </p>
            <h2
              id="story-heading"
              className="font-comfortaa text-3xl font-bold text-brand-charcoal sm:text-4xl"
            >
              Nacimos del amor a Xalapa
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-gray">
              Mobbitrips nació de una idea sencilla: Xalapa merece que sus visitantes la vivan de
              verdad, no desde un hotel cualquiera. Empezamos administrando una sola propiedad con
              todo el cuidado del mundo, y hoy llevamos cada casa como si fuera la nuestra.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-gray">
              Cada propiedad tiene su historia, su personalidad, su rincón favorito. Nuestro trabajo
              es que la descubras y que, cuando te vayas, sientas que dejaste algo tuyo ahí.
            </p>

            <ul className="mt-8 flex flex-col gap-3" role="list">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft">
                    <Icon size={15} className="text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-brand-charcoal">{text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/nosotros"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:underline"
            >
              Conócenos más
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </AnimatedSection>

          {/* Imagen placeholder */}
          <AnimatedSection direction="left" delay={0.15}>
            <div className="relative">
              {/* Tarjeta principal */}
              <div
                className="h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A7C59] via-[#2E9E6E] to-[#A8D5B5] sm:h-96 lg:h-[440px]"
                role="img"
                aria-label="Imagen de propiedad en Xalapa"
              >
                <div className="flex h-full items-end p-6">
                  <div className="rounded-xl bg-white/90 p-4 backdrop-blur-sm">
                    <p className="font-comfortaa text-sm font-semibold text-brand-charcoal">
                      Xalapa, Ver.
                    </p>
                    <p className="text-xs text-brand-gray">La ciudad de las flores 🌺</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta flotante */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-lg sm:block">
                <p className="font-comfortaa text-2xl font-bold text-primary">+50</p>
                <p className="text-xs text-brand-gray">estancias felices</p>
              </div>
              <div className="absolute -right-4 top-8 hidden rounded-2xl bg-primary p-4 text-white shadow-lg sm:block">
                <p className="font-comfortaa text-2xl font-bold">4.9★</p>
                <p className="text-xs text-white/80">calificación promedio</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
