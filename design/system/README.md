# MobbiTrips Design System

**MobbiTrips** — marca global de hospedaje humano. Plataforma de renta vacacional con propiedades únicas alrededor del mundo. Editorial moderno con alma coral, liquid glass y motion fluido. Vibra **Arc Browser + Bellroy** — cálido con personalidad, sofisticado sin ser corporativo.

Actualmente opera en **Xalapa, México**, pero la marca está diseñada para escalar globalmente a cualquier ciudad o destino.

**Tagline oficial** — _"Descansa, vive y sueña como si estuvieras en casa"_

**Posicionamiento** — MobbiTrips no compite con Airbnb siendo más grande. Compite siendo **más humano, cálido y memorable**. Cada propiedad se siente como casa, no como hotel. La promesa es emocional, no transaccional.

---

## Fuentes de este sistema

- `uploads/LOGO ROSA 1.png` → copiado a `assets/logo-coral.png`
- `uploads/MOBI.png` → copiado a `assets/logo-mark-block.png`
- Manual de marca entregado directo en el prompt (paleta, tipografía, componentes, motion). El PDF `MOBBITRIPS IMAGEN CORP.pdf` mencionado en el brief **no estaba presente** en uploads — el sistema se construyó sobre las especificaciones textuales detalladas del brief.

---

## Content fundamentals · tono y copy

- **Tuteo siempre, nunca "usted"**. Inclusivo y humano.
- **Frases cortas, ritmo conversacional.** Emocional sin cursi. Específico sin corporativo.
- **Español primero.** CTAs en español (nunca "Book now"):
  - "Reserva ahora", "Ver propiedades", "Conoce más", "Empieza tu estadía"
- **Empty states con calidez**: "Aún no hay resultados por aquí", "Tu próxima casa todavía no aparece…"
- **Loading con personalidad**: "Preparando tu hospedaje…", "Un momento, estamos haciendo la cama…"
- **Cero emoji en headlines.** Cero jerga corporativa ("inventory", "properties listed", "book now").
- **Casing**: sentence case en headlines y UI. Labels pequeños en UPPERCASE con letter-spacing 0.04–0.08em.
- **Acentos manuscritos puntuales**: frases cortas en Caveat coral-900 ("como en casa", "en todas partes") máximo una por sección — son firma emocional, no relleno.

---

## Visual foundations

### Color

- **Alma coral** (#ED6864) es el color más importante. Todo lo demás lo rodea.
- **Cream** (#FAF7F2) es el fondo base — **nunca blanco puro**. Blanco se reserva para cards y paneles sobre cream.
- **Gray cálido** (no frío) para texto y estructura.
- **Acentos muy moderados**: mustard, sage, sky-warm. Nunca compiten con el coral.
- **Anochecer**: charcoal #1F1F1F para footer y secciones oscuras.
- **Gradientes clave**: `warm` (cream→coral-100), `coral-soft`, `sunset` (cream→coral-700), `dusk` (coral→charcoal).

### Tipografía

- **Display**: Comfortaa — redondeada, amigable, nunca rígida. 300/400/500/600/700. Letter-spacing negativo en display XL (-0.03em) y L (-0.02em).
- **Body / UI**: Inter. Line-height 1.6 en cuerpo, 1.4 en UI, 1.2 en botones.
- **Script accent**: Caveat — manuscrito. **Máximo una frase por sección**, 1.5× del body circundante, coral-900. Es firma, no ornamento continuo.

### Fondos, imagery, textura

- Fondo base cream en cada vista. Blanco solo en cards.
- Hero con **sunset gradient** + blobs difusos coral/mustard con blur agresivo (60–80px).
- **Arcos sutiles del logo** flotan como elementos ambientales (stroke 2px coral-300, opacity 30–45%, a veces con blur).
- Las imágenes de propiedades deben sentirse **cálidas y editoriales** — nunca stock frío. (En el UI kit se usan gradientes coral como placeholders intencionales hasta que llegue la fotografía real.)
- Cero patrones repetitivos. Cero texturas granuladas.

### Motion

- **Todo animable** usa `transform`/`opacity` — nunca width/height/top/left.
- **Easings**:
  - `ease-out-expo` `cubic-bezier(0.19, 1, 0.22, 1)` — reveals
  - `ease-out-back` `cubic-bezier(0.34, 1.56, 0.64, 1)` — hovers con rebote sutil
  - `ease-in-out-cubic` `cubic-bezier(0.645, 0.045, 0.355, 1)` — transiciones
- **Duraciones**: 200–300 ms micro · 300–400 ms hover · 600–800 ms sección · 800–1200 ms reveal.
- **Scroll reveals** con IntersectionObserver. Parallax multicapa (30% / 60% / 100%). Blur-to-focus en entrada. Texto palabra por palabra con stagger 80ms.
- **Zoom match cut** al abrir propiedad — sin "cortes", solo disolución.
- `prefers-reduced-motion` → degradar a fades simples.

### Hover / press states

- **Botón primary**: `scale(1.02)` + sombra coral más intensa + gradient liquid fill.
- **Botón secondary**: fondo se invierte (transparent → dark).
- **Botón glass**: opacity del fondo sube de 0.55 a 0.75.
- **Card property**: `translateY(-4px)` + sombra coral + shimmer diagonal que pasa una vez.
- **Active**: `scale(0.98)` en todo clicable.
- **Link hover**: color → coral-900.

### Borders

- Delgados: 1px default, 1.5px en estados focus.
- Color: `gray-200` / `gray-100` para estructura; `rgba(255,255,255,0.4–0.6)` en elementos glass.
- Focus ring: `outline: 3px solid rgba(237,104,100,0.15)` + border coral-900.

### Shadows

- Sistema suave, cálido — sombras en gray-900 a 4–10% opacity, nunca negro puro.
- `shadow-coral` (0 8px 24px rgba(237,104,100,0.25)) para CTAs — sombra con alma.
- `shadow-glass` incluye inset highlight blanco para realzar profundidad del liquid glass.

### Transparency & blur (liquid glass)

- **Cuándo**: navbar scrolled, search pill del hero, botones flotantes sobre imagen, cards sobre fondos de color.
- **Receta**: `background: rgba(250,247,242,0.65)` (o white a 0.55) + `backdrop-filter: blur(24–32px) saturate(180%)` + borde `rgba(255,255,255,0.4–0.6)`.
- **Nunca sobre cream plano** — el glass necesita color debajo para activarse.

### Corner radii

- `sm 8px` inputs · `md 12px` botones secundarios/tags · `lg 20px` cards de contenido · `xl 24px` cards principales · `2xl 32px` paneles grandes · `full 999px` pills y botones primarios.

### Cards

- **Card property**: white, radius 24, shadow sutil, imagen full-bleed arriba, padding 24 en body. Hover lift + shimmer.
- **Card glass**: cream translúcido con blur agresivo, inset highlight, borde blanco translúcido.
- **Card content**: white sólido, radius 20, padding 32, shadow-sm. Para bloques editoriales.

### Layout rules

- Container `max-width 1280px`, padding inline `clamp(20px, 5vw, 80px)`.
- Section padding vertical: 64 mobile / 80 tablet / 128 desktop.
- Grid: 1 col mobile · 2 tablet (768+) · hasta 4 desktop (1280+). Gap 24 → 32.
- Navbar fixed top, smart-hide al scroll down / aparece al scroll up.

---

## Iconography

- **Lucide Icons** (CDN) — trazo redondeado, stroke 1.75, heredan el ADN del logo (líneas redondeadas, formas orgánicas pero geométricas).
- **No emojis en UI**. Cero excepciones.
- **No ilustraciones figurativas** — ni personajes 3D Pixar, ni mascotas, ni cartoon.
- Los arcos del logo se usan como **ornamentos ambientales** — flotan sutiles en fondos, a veces con blur, nunca protagonistas.
- Ilustraciones line-art ocasionales (2px stroke, coral-900 o gray-900) solo para amenidades abstractas (ventana, taza, llave) — nunca personas ni paisajes literales.

**Sustitución activa**: el set Lucide (CDN) cubre el 95% de necesidades con el stroke correcto. Si se requiere consistencia pixel-perfect con el logo, se puede pasar a un set custom (flag: pendiente de feedback del equipo).

---

## Index · manifiesto de archivos

```
.
├── README.md                ← este archivo
├── SKILL.md                 ← instrucciones para uso como skill
├── colors_and_type.css      ← tokens (colores, tipografía, spacing, radius, shadows, motion)
├── components.css           ← classes para botones, cards, inputs, tags, navbar
├── assets/
│   ├── logo-coral.png       ← logo horizontal coral sobre cream
│   └── logo-mark-block.png  ← mark block coral (icon, favicon)
├── preview/                 ← cards del Design System tab
│   ├── colors-coral.html
│   ├── colors-gray.html
│   ├── colors-bg-accents.html
│   ├── colors-gradients.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-script.html
│   ├── spacing-scale.html
│   ├── radius.html
│   ├── shadows.html
│   ├── motion.html
│   ├── buttons.html
│   ├── inputs.html
│   ├── tags.html
│   ├── card-property.html
│   ├── card-glass-content.html
│   ├── navbar.html
│   ├── iconography.html
│   ├── logo.html
│   ├── moodboard.html
│   └── voice.html
└── ui_kits/
    └── website/
        ├── README.md
        ├── index.html       ← home armada (prototipo navegable)
        ├── NavHero.jsx
        ├── Cards.jsx
        ├── Sections.jsx
        └── website.css
```

### UI kits disponibles

- **website** — marketing home: navbar (transparent → glass), hero con sunset gradient + glass search pill, properties grid con filter chips, manifiesto oscuro, destinations editoriales, CTA band, footer charcoal.
