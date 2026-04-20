'use client';

import { useState } from 'react';
import {
  Wifi,
  UtensilsCrossed,
  Car,
  Tv,
  Waves,
  Flame,
  TreePine,
  Bath,
  Wind,
  Dumbbell,
  Coffee,
  ChefHat,
  Sofa,
  type LucideIcon,
} from 'lucide-react';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  WiFi: Wifi,
  'Cocina completa': UtensilsCrossed,
  'Cocina gourmet': ChefHat,
  Estacionamiento: Car,
  TV: Tv,
  Alberca: Waves,
  Piscina: Waves,
  'Zona BBQ': Flame,
  Jardín: TreePine,
  Terraza: TreePine,
  Baño: Bath,
  'Aire acondicionado': Wind,
  Gimnasio: Dumbbell,
  Café: Coffee,
  'Sala amplia': Sofa,
};

const DEFAULT_VISIBLE = 8;

interface PropertyAmenitiesProps {
  amenities: string[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? amenities : amenities.slice(0, DEFAULT_VISIBLE);

  return (
    <section aria-labelledby="amenities-heading">
      <h2
        id="amenities-heading"
        className="mb-4 font-comfortaa text-xl font-semibold text-brand-charcoal"
      >
        Amenidades
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {visible.map((amenity) => {
          const Icon = AMENITY_ICONS[amenity] ?? Wifi;
          return (
            <div
              key={amenity}
              className="flex items-center gap-2.5 rounded-xl border border-brand-border bg-white px-3 py-2.5"
            >
              <Icon size={16} className="flex-shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm text-brand-charcoal">{amenity}</span>
            </div>
          );
        })}
      </div>

      {amenities.length > DEFAULT_VISIBLE && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          aria-expanded={expanded}
        >
          {expanded
            ? 'Ver menos'
            : `Ver las ${amenities.length - DEFAULT_VISIBLE} amenidades restantes`}
        </button>
      )}
    </section>
  );
}
