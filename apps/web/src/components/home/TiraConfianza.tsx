import { BadgeCheck, BadgePercent, HandCoins, type LucideIcon } from 'lucide-react';
import { t, type ClaveTexto } from '@/textos/t';

// TEMPORAL (opciones en vivo 14-oct): los íconos solo se ven con las opciones de la tira; «Hoy» = puntos.
export const puntosConfianza: { clave: ClaveTexto; Icono: LucideIcon }[] = [
  { clave: 'inicio.confianza.sinComision', Icono: BadgePercent },
  { clave: 'inicio.confianza.pagasDirecto', Icono: HandCoins },
  { clave: 'marca.servicioMobbilink', Icono: BadgeCheck },
];

/**
 * Tira de confianza: lo que ofrece Mobbitrips en un renglón (en cel baja a dos). Solo lo decidido:
 * sin comisión, pagas directo al anfitrión, un servicio de Mobbilink. Los puntos coral hacen eco de
 * los círculos del logo; son decorativos y el texto va en carbón (contraste AA).
 */
export function TiraConfianza() {
  return (
    <section
      aria-label={t('inicio.confianza.aria')}
      className="op-tira border-y border-brand-border bg-white"
    >
      <ul
        role="list"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-4 text-sm font-medium text-brand-charcoal sm:px-6 lg:px-8"
      >
        {puntosConfianza.map(({ clave, Icono }) => (
          <li key={clave} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="op-punto size-1.5 shrink-0 rounded-full bg-primary"
            />
            <span aria-hidden="true" className="op-ic hidden">
              <Icono size={20} strokeWidth={1.75} />
            </span>
            {t(clave)}
          </li>
        ))}
      </ul>
    </section>
  );
}
