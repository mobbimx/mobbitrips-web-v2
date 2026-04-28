import Link from 'next/link';
import { AnimatedSection } from '@mobbitrips/ui';
import { StoryBadges } from './StoryBadges';

const highlights = [
  'Xalapa — la ciudad más verde de México',
  'Propiedades seleccionadas con cariño y criterio',
  'Que te sientas en tu propia casa, esa es la filosofía',
];

export function StorySection() {
  return (
    <section className="story" aria-labelledby="story-title">
      <div className="story__blob" aria-hidden="true" />
      <div className="story__inner">
        <AnimatedSection direction="right">
          <span className="story__kicker">Nuestra historia</span>
          <h2 id="story-title" className="story__title">
            Nacimos del amor
            <br />a <span className="script-inline">Mobi.</span>
          </h2>
          <p className="story__body">
            Mobbitrips nació de una idea sencilla: Mobi merece que sus visitantes la vivan de
            verdad, no desde un hotel cualquiera. Empezamos administrando una sola propiedad y hoy
            llevamos cada casa como si fuera la nuestra.
          </p>
          <p className="story__body">
            Cada propiedad tiene su historia, su personalidad, su rincón favorito. Nuestro trabajo
            es que la descubras.
          </p>
          <ul className="story__list" role="list">
            {highlights.map((text) => (
              <li key={text} className="story__list-item">
                <span className="story__list-dot" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <Link href="/nosotros" className="story__link">
            Conócenos más
            <svg
              width="14"
              height="14"
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

        <AnimatedSection direction="left" delay={0.15}>
          <div className="story__panel">
            <div
              className="story__panel-bg"
              role="img"
              aria-label="Mobi, la ciudad de las flores, Veracruz"
            >
              <p className="story__panel-wm" aria-hidden="true">
                Mobi
              </p>
              <div className="story__panel-footer">
                <p className="story__panel-quote">&ldquo;La ciudad de las flores&rdquo;</p>
                <p className="story__panel-sub">Veracruz, México</p>
              </div>
            </div>
            <StoryBadges />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
