import Link from 'next/link';
import { StoryBadges } from './StoryBadges';
import { StorySectionClient } from './StorySection.client';

const highlights = [
  'Anfitriones tranquilos, huéspedes felices',
  'Propiedades seleccionadas con cuidado y criterio',
  'Que te sientas en casa, esa es la filosofía',
];

const titleLine1 = ['Nacimos', 'de', 'creer', 'que', 'se', 'puede', 'hacer'];

export function StorySection() {
  return (
    <section className="story" aria-labelledby="story-title">
      <StorySectionClient>
        <div className="story__inner">
          <div className="story__text">
            <span className="story__kicker" data-story-reveal="kicker">
              Nuestra historia
            </span>
            <h2
              id="story-title"
              className="story__title"
              aria-label="Nacimos de creer que se puede hacer mejor."
            >
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
                <span
                  className="script-inline story__title-script"
                  data-story-reveal="script"
                  aria-hidden="true"
                >
                  mejor.
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
              Mobbitrips nació de una idea simple: que administrar bien una propiedad lo cambia
              todo. Más tranquilidad para el anfitrión que la confía, mejor experiencia para el
              huésped que la habita.
            </p>
            <p className="story__body" data-story-reveal="body">
              Empezamos con una sola casa. Hoy gestionamos cada propiedad con los mismos estándares:
              cuidado, criterio y atención directa.
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
            <div className="story__panel-bg" role="img" aria-label="Propiedades Mobbitrips">
              <p
                className="story__panel-wm"
                aria-hidden="true"
                data-story-parallax="watermark"
                data-story-reveal="watermark"
              >
                Mobbi
              </p>
            </div>
            <StoryBadges />
          </div>
        </div>
      </StorySectionClient>
    </section>
  );
}
