import { AnimatedSection, StarRating } from '@mobbitrips/ui';
import { MOCK_TESTIMONIALS } from '@/lib/mocks';

export function TestimonialsSection() {
  const [featured, ...rest] = MOCK_TESTIMONIALS;

  if (!featured) return null;

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials__blob" aria-hidden="true" />
      <div className="testimonials__inner">
        <AnimatedSection direction="up">
          <span className="testimonials__kicker">Huéspedes</span>
          <h2 id="testimonials-title" className="testimonials__title">
            Lo que dicen <span className="script-inline">nuestros huéspedes.</span>
          </h2>
        </AnimatedSection>

        <div className="testimonials__grid">
          <AnimatedSection direction="up" delay={0.05}>
            <article className="t-card t-card--featured">
              <p className="t-card__qmark" aria-hidden="true">
                &ldquo;
              </p>
              <blockquote className="t-card__text">{featured.text}</blockquote>
              <footer className="t-card__footer">
                <div className="t-card__author">
                  <div className={`t-card__avatar ${featured.color}`} aria-hidden="true">
                    {featured.initials}
                  </div>
                  <div>
                    <p className="t-card__name">{featured.name}</p>
                    <p className="t-card__loc">{featured.location}</p>
                  </div>
                </div>
                <StarRating value={featured.rating} size="sm" />
              </footer>
            </article>
          </AnimatedSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {rest.slice(0, 2).map((t, i) => (
              <AnimatedSection
                key={t.id}
                direction="up"
                delay={(i + 1) * 0.12}
                className="flex-1 flex flex-col"
              >
                <article className="t-card t-card--sm" style={{ flex: 1 }}>
                  <StarRating value={t.rating} size="sm" />
                  <blockquote className="t-card__text" style={{ marginTop: 12 }}>
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <footer className="t-card__footer">
                    <div className="t-card__author">
                      <div className={`t-card__avatar ${t.color}`} aria-hidden="true">
                        {t.initials}
                      </div>
                      <div>
                        <p className="t-card__name">{t.name}</p>
                        <p className="t-card__loc">{t.location}</p>
                      </div>
                    </div>
                  </footer>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
