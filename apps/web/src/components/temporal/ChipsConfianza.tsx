import { t } from '@/textos/t';
import { puntosConfianza } from '@/components/home/TiraConfianza';

/** TEMPORAL (opciones en vivo 14-oct): la tira como pastillas bajo el buscador (opción C2). */
export function ChipsConfianza() {
  return (
    <ul role="list" className="op-chips mt-7 hidden flex-wrap justify-center gap-x-3 gap-y-2.5">
      {puntosConfianza.map(({ clave, Icono }) => (
        <li
          key={clave}
          className="flex items-center gap-2 rounded-full border border-brand-border bg-white/75 py-2 pl-3 pr-4 text-sm font-semibold text-brand-charcoal"
        >
          <Icono aria-hidden="true" size={20} strokeWidth={1.75} className="text-primary-action" />
          {t(clave)}
        </li>
      ))}
    </ul>
  );
}
