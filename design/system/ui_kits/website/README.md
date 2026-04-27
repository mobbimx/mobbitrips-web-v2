# MobbiTrips — Website UI kit

Recreación alta-fidelidad de la marketing home de MobbiTrips.

## Archivos

- `index.html` — página armada (navbar + hero + properties + manifesto + destinations + CTA + footer)
- `NavHero.jsx` — Navbar (sticky con glass al scroll) + Hero (sunset gradient + glass search)
- `Cards.jsx` — PropertyCard, DestinationCard, AmenityChip, Footer
- `Sections.jsx` — PropertiesSection (grid + filter chips), DestinationsSection, ManifestoSection, CTABand
- `website.css` — estilos específicos del site. Los tokens vienen de `/colors_and_type.css` y `/components.css`.

## Notas de fidelidad

- No existe codebase ni Figma; los componentes se construyeron desde el manual de marca entregado por el equipo.
- Imágenes reales de propiedades no están disponibles — se usan **gradientes con alma coral** como placeholders intencionales. Sustituir por fotografía editorial cuando esté lista.
- Iconos vía CDN de Lucide (rounded, stroke 1.75) — heredan el ADN del logo (líneas redondeadas, formas orgánicas geométricas).
