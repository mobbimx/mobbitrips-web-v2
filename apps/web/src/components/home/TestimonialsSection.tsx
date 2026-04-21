import { AnimatedSection, StarRating } from '@mobbitrips/ui';
import { MOCK_TESTIMONIALS } from '@/lib/mocks';
import { cn } from '@mobbitrips/ui';

export function TestimonialsSection() {
  const [featured, ...rest] = MOCK_TESTIMONIALS;

  if (!featured) return null;

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Huéspedes</p>
          </div>
          <h2
            id="testimonials-heading"
            className="font-comfortaa font-bold text-brand-charcoal"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
          >
            Experiencias que
            <br />
            hablan por sí solas.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Featured testimonial */}
          <AnimatedSection direction="up" className="lg:col-span-2">
            <article
              className="flex h-full flex-col justify-between rounded-2xl p-8 sm:p-10"
              style={{ background: '#1C1C1C' }}
            >
              <p
                className="font-comfortaa text-[6rem] font-bold leading-none text-primary"
                style={{ opacity: 0.25 }}
                aria-hidden="true"
              >
                &ldquo;
              </p>
              <div className="-mt-4 flex flex-1 flex-col justify-between gap-8">
                <blockquote className="font-comfortaa text-xl font-medium leading-relaxed text-white sm:text-2xl">
                  {featured.text}
                </blockquote>
                <footer
                  className="flex items-center justify-between border-t pt-6"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
                        featured.color,
                      )}
                      aria-hidden="true"
                    >
                      {featured.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{featured.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {featured.location}
                      </p>
                    </div>
                  </div>
                  <StarRating value={featured.rating} size="sm" />
                </footer>
              </div>
            </article>
          </AnimatedSection>

          {/* Supporting testimonials */}
          <div className="flex flex-col gap-5">
            {rest.slice(0, 2).map((t, i) => (
              <AnimatedSection key={t.id} direction="up" delay={(i + 1) * 0.1}>
                <article className="flex flex-1 flex-col gap-4 rounded-2xl bg-brand-cream p-6">
                  <StarRating value={t.rating} size="sm" />
                  <blockquote className="flex-1 text-sm leading-relaxed text-brand-gray">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <footer className="flex items-center gap-3 border-t border-brand-border pt-4">
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
                        t.color,
                      )}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-charcoal">{t.name}</p>
                      <p className="text-xs text-brand-light">{t.location}</p>
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
