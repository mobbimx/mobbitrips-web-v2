# Sprint 1.1 — Design System + Home ✅ CERRADO

- **Fechas**: 2026-04-17
- **Fase**: 1 — MVP Web
- **Resultado**: Home pública completa con Design System base.

## Tasks completadas (14/14)

- [x] **S1.1-1** Button (4 variantes, 3 tamaños, loading state)
- [x] **S1.1-2** Badge, Input, Skeleton, StarRating
- [x] **S1.1-3** AnimatedSection con Framer Motion + prefers-reduced-motion
- [x] **S1.1-4** Navbar (scroll-aware 72→64px, drawer mobile)
- [x] **S1.1-5** Footer (4 columnas, fondo charcoal)
- [x] **S1.1-6** WhatsAppFloatingButton (pulso, se oculta en footer)
- [x] **S1.1-7** HeroSection con buscador fechas/huéspedes
- [x] **S1.1-8** FeaturedProperties con 3 property cards (mocks)
- [x] **S1.1-9** WhyBookDirect (4 razones en grid)
- [x] **S1.1-10** StorySection (dos columnas, tarjetas flotantes)
- [x] **S1.1-11** TestimonialsSection (3 reseñas, scroll horizontal mobile)
- [x] **S1.1-12** OwnerTeaser (B2B, fondo primary-soft)
- [x] **S1.1-13** NewsletterCTA (Zod, estados loading/success/error)
- [x] **S1.1-14** FinalCTA + montaje completo del home

## Commits

- `e773ca1` feat(ui): add design system base and layout components
- `bf986dc` feat(web): add HeroSection with search widget (S1.1-7)
- `6c262e6` feat(web): complete home page with all 8 sections (S1.1-8 to S1.1-14)
- `a6bfbf1` docs: update bitacora Sprint 1.1 complete

## Decisiones técnicas

- `packages/ui` como workspace package con `transpilePackages` en next.config.mjs
- Tailwind content incluye `../../packages/ui/src/**` para purge correcto
- PropertyCard con CSS hover, no Framer Motion (server-friendly)
- `/api/newsletter` es stub — Supabase se conecta en Sprint 1.2
- Imágenes de propiedades: gradientes CSS como placeholder
