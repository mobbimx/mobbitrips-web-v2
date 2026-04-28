---
name: mobbitrips-design
description: Use this skill to generate well-branded interfaces and assets for MobbiTrips, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files:

- `colors_and_type.css` — all design tokens (colors, typography, spacing, radius, shadows, motion easings/durations). Import this first in any HTML artifact.
- `components.css` — ready-to-use classes for buttons (primary, secondary, glass), cards (property, glass, content), inputs (text, search), tags, and navbar (transparent + scrolled states).
- `assets/` — the official MobbiTrips logos. Copy them out when building.
- `preview/` — individual preview cards showing each part of the system in isolation. Useful as reference.
- `ui_kits/website/` — a navigable home mock with reusable JSX components (Navbar, Hero, PropertyCard, DestinationCard, ManifestoSection, CTABand, Footer).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Prefer importing `colors_and_type.css` + `components.css` from this skill over re-declaring tokens.

If working on production code, copy assets and use the rules in README.md as the source of truth for voice, motion, glass recipes, and component anatomy.

**Non-negotiables when designing with this brand:**

- Background is always `cream (#FAF7F2)` — never pure white.
- Coral (`#ED6864`) is the soul; every design must feature it meaningfully but never garishly.
- Comfortaa for display, Inter for body, Caveat for rare emotional accents (max one per section, 1.5× body size, coral-900).
- Spanish-first copy. Tuteo. Emotional without being corny. Never "Book now" — always "Reserva ahora".
- Never use emoji in UI. Never add 3D Pixar-style characters, mascots, cartoon folklore, or generic SaaS isometrics.
- Liquid glass (backdrop-blur + saturate 180%) lives on top of colored backgrounds, never on plain cream.
- Motion uses ease-out-expo for reveals, ease-out-back for hovers. Everything animates via transform/opacity only.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
