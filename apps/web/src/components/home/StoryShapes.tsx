import { cn } from '@mobbitrips/ui';

interface StoryShapesProps {
  className?: string;
}

/**
 * Composición de formas decorativas para anclar visualmente la Story.
 *
 * - Arc coral light por la izquierda-abajo, debajo del bloque de texto.
 * - Círculo coral difuminado por arriba-derecha, cerca del panel oscuro.
 * - Ambos pintados con baja opacidad para no competir con el panel.
 *
 * Server component: SVG inline, sin JS. El parallax lo aplica el wrapper
 * client buscando `[data-story-parallax="..."]`.
 */
export function StoryShapes({ className }: StoryShapesProps) {
  return (
    <div className={cn('story__shapes', className)} aria-hidden="true" data-story-parallax="shapes">
      <div className="story__shape story__shape-arc">
        <svg viewBox="0 0 600 800" preserveAspectRatio="none">
          <path
            d="M 80 760 Q 80 240 340 240 Q 520 240 520 440 Q 520 760 520 760"
            fill="none"
            stroke="var(--coral-300)"
            strokeWidth="150"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>
      <div className="story__shape story__shape-circle" />
    </div>
  );
}
