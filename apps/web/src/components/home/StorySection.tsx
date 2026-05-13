import Link from 'next/link';
import { StoryBadges } from './StoryBadges';
import { StorySectionClient } from './StorySection.client';

const highlights = [
  'Xalapa — la ciudad más verde de México',
  'Propiedades seleccionadas con cariño y criterio',
  'Que te sientas en tu propia casa, esa es la filosofía',
];

const titleLine1 = ['Nacimos', 'del', 'amor'];

export function StorySection() {
  return (
    <section className="story" aria-labelledby="story-title">
      <StorySectionClient>
        <div className="story__inner">
          <div className="story__text">
            <span className="story__kicker" data-story-reveal="kicker">
              Nuestra historia
            </span>
            <h2 id="story-title" className="story__title" aria-label="Nacimos del amor a Mobi.">
              <span className="story__title-line">
                <span className="story__title-words" aria-hidden="true">
                  {titleLine1.map((word) => (
                    <span key={word} className="story__title-word" data-story-reveal="word">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span className="story__title-line">
                <span className="story__title-words" aria-hidden="true">
                  <span className="story__title-word" data-story-reveal="word">
                    a
                  </span>
                </span>{' '}
                <span
                  className="script-inline story__title-script"
                  data-story-reveal="script"
                  aria-hidden="true"
                >
                  Mobi.
                  <svg
                    className="story__title-script-underline"
                    viewBox="0 0 200 10"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      data-story-reveal="underline"
                      d="M 4 6 Q 50 2 100 5 T 196 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h2>
            <p className="story__body" data-story-reveal="body">
              Mobbitrips nació de una idea sencilla: Mobi merece que sus visitantes la vivan de
              verdad, no desde un hotel cualquiera. Empezamos administrando una sola propiedad y hoy
              llevamos cada casa como si fuera la nuestra.
            </p>
            <p className="story__body" data-story-reveal="body">
              Cada propiedad tiene su historia, su personalidad, su rincón favorito. Nuestro trabajo
              es que la descubras.
            </p>
            <ul className="story__list" role="list">
              {highlights.map((text) => (
                <li key={text} className="story__list-item" data-story-reveal="list-item">
                  <span className="story__list-dot" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            <Link href="/nosotros" className="story__cta" data-story-reveal="cta">
              Conócenos más
              <span className="story__cta-arrow" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="story__panel" data-story-parallax="panel" data-story-reveal="panel">
            <div
              className="story__panel-bg"
              role="img"
              aria-label="Mobi, la ciudad de las flores, Veracruz"
            >
              <p
                className="story__panel-wm"
                aria-hidden="true"
                data-story-parallax="watermark"
                data-story-reveal="watermark"
              >
                Mobi
              </p>
              <div className="story__panel-footer">
                <p className="story__panel-quote">&ldquo;La ciudad de las flores&rdquo;</p>
                <p className="story__panel-sub">Veracruz, México</p>
              </div>
            </div>
            <StoryBadges />
          </div>
        </div>
      </StorySectionClient>
    </section>
  );
}
