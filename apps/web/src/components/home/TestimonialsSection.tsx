import { AnimatedSection, StarRating } from '@mobbitrips/ui';
import { MOCK_TESTIMONIALS } from '@/lib/mocks';
import { cn } from '@mobbitrips/ui';

export function TestimonialsSection() {
  return (
    <section className="bg-brand-cream py-20 sm:py-28" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Lo que dicen nuestros huéspedes
          </p>
          <h2
            id="testimonials-heading"
            className="font-comfortaa text-3xl font-bold text-brand-charcoal sm:text-4xl"
          >
            Experiencias que hablan por sí solas
          </h2>
        </AnimatedSection>

        {/* Grid desktop / scroll horizontal mobile */}
        <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <AnimatedSection
              key={t.id}
              direction="up"
              delay={i * 0.1}
              className="min-w-[280px] sm:min-w-0"
            >
              <article className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
                {/* Stars */}
                <StarRating value={t.rating} size="sm" />

                {/* Texto */}
                <blockquote className="flex-1 text-sm leading-relaxed text-brand-gray">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Autor */}
                <footer className="flex items-center gap-3 border-t border-brand-border pt-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
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
    </section>
  );
}
