import { BadgeCheck, BadgePercent, HandCoins, type LucideIcon } from 'lucide-react';
import { t, type ClaveTexto } from '@/textos/t';

const puntos: { clave: ClaveTexto; Icono: LucideIcon }[] = [
  { clave: 'inicio.confianza.sinComision', Icono: BadgePercent },
  { clave: 'inicio.confianza.pagasDirecto', Icono: HandCoins },
  { clave: 'marca.servicioMobbilink', Icono: BadgeCheck },
];

/**
 * Lo que ofrece Mobbitrips, en pastillas justo debajo del buscador (decisión 36, 14-oct): sin
 * comisión, pagas directo al anfitrión, un servicio de Mobbilink. Solo lo decidido.
 * El `mt-8` repite el aire que hay entre la línea de apoyo y el buscador, para que el ritmo sea parejo.
 * Íconos decorativos en coral oscuro; el texto va en carbón (contraste AA).
 */
export function TiraConfianza() {
  return (
    <ul
      role="list"
      aria-label={t('inicio.confianza.aria')}
      className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-2.5"
    >
      {puntos.map(({ clave, Icono }) => (
        <li
          key={clave}
          className="flex items-center gap-2 rounded-full border border-brand-border bg-white/75 py-2 pl-3 pr-4 text-sm font-semibold text-brand-charcoal"
        >
          <Icono
            aria-hidden="true"
            size={20}
            strokeWidth={1.75}
            className="shrink-0 text-primary-action"
          />
          {t(clave)}
        </li>
      ))}
    </ul>
  );
}
