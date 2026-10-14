import Link from 'next/link';
import { DESTINOS } from '@/config/destinos';
import { rutaBuscar } from '@/lib/buscar';
import { t } from '@/textos/t';

/** Búsquedas populares: ligas lisas a `/buscar`, una por destino. Sin animación. */
export function BusquedasPopulares() {
  return (
    <section
      aria-labelledby="populares-titulo"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
    >
      <h2
        id="populares-titulo"
        className="font-comfortaa text-xl font-bold text-brand-charcoal sm:text-2xl"
      >
        {t('inicio.populares.titulo')}
      </h2>

      <ul role="list" className="mt-4 flex flex-wrap gap-2">
        {DESTINOS.map(({ nombre }) => (
          <li key={nombre}>
            <Link
              href={rutaBuscar({ destino: nombre })}
              prefetch={false}
              className="inline-flex min-h-[44px] items-center rounded-full border border-brand-border bg-white px-4 text-sm font-medium text-brand-charcoal transition-colors hover:border-primary hover:bg-primary-soft foco-portada motion-reduce:transition-none"
            >
              {t('inicio.populares.enlace', { destino: nombre })}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
