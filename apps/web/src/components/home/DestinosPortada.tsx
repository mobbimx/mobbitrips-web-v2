import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { DESTINOS } from '@/config/destinos';
import { rutaBuscar } from '@/lib/buscar';
import { t } from '@/textos/t';

/**
 * Destinos de la portada: una tarjeta lisa por destino (sin fotos ni conteos todavía) que lleva a
 * `/buscar?destino=`. En cel van de dos en dos y la última ocupa el ancho completo. Sin animación.
 */
export function DestinosPortada() {
  return (
    <section
      aria-labelledby="destinos-titulo"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <h2
        id="destinos-titulo"
        className="font-comfortaa text-2xl font-bold text-brand-charcoal sm:text-3xl"
      >
        {t('inicio.destinos.titulo')}
      </h2>

      <ul
        role="list"
        className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
      >
        {DESTINOS.map(({ nombre }) => (
          <li key={nombre} className="last:odd:col-span-2 sm:last:odd:col-span-1">
            <Link
              href={rutaBuscar({ destino: nombre })}
              prefetch={false}
              className="group flex h-full min-h-[132px] flex-col justify-between gap-6 rounded-2xl border border-brand-border bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md foco-portada motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-primary-soft text-primary"
              >
                <MapPin size={20} />
              </span>
              <span className="flex items-end justify-between gap-2">
                <span className="font-comfortaa text-base font-bold leading-tight text-brand-charcoal min-[360px]:text-lg">
                  {nombre}
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
