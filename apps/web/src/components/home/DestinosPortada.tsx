import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DESTINOS } from '@/config/destinos';
import { FOTOS_DESTINOS } from '@/config/fotosDestinos';
import { rutaBuscar } from '@/lib/buscar';
import { t } from '@/textos/t';

/**
 * Ancho con el que se pinta cada foto, para que el navegador baje la medida justa: cinco columnas
 * en compu (~232 px), tres en tableta y dos en cel. La última, si queda sola, va a todo lo ancho en cel.
 */
const ANCHO_FOTO = '(min-width: 1024px) 232px, (min-width: 640px) 33vw, 50vw';
const ANCHO_FOTO_SOLA = '(min-width: 1024px) 232px, (min-width: 640px) 33vw, 100vw';

/**
 * Destinos de la portada: una tarjeta con foto por destino (decisión 32 del PIVOTE) que lleva a
 * `/buscar?destino=`. En cel van de dos en dos y la última ocupa el ancho completo. Las fotos se
 * cargan al acercarse a la pantalla, así no le quitan velocidad a la franja de arriba; el nombre va
 * en blanco sobre un velo de carbón para que se lea con cualquier foto. Bajo las tarjetas van,
 * plegados, los créditos que piden las licencias. Sin animación de entrada.
 */
export function DestinosPortada() {
  const ultimaSola = DESTINOS.length % 2 === 1;

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
        {DESTINOS.map(({ nombre }, i) => (
          <li key={nombre} className="last:odd:col-span-2 sm:last:odd:col-span-1">
            {/* `isolate`: sin él, Safari no recorta la foto con las esquinas redondas al hacer zoom. */}
            <Link
              href={rutaBuscar({ destino: nombre })}
              prefetch={false}
              className="group relative isolate flex h-full min-h-[150px] items-end overflow-hidden rounded-2xl bg-brand-charcoal p-4 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md foco-portada motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-[170px]"
            >
              {/* Decorativa (`alt` vacío): el nombre del destino ya es el texto de la liga. */}
              <Image
                src={FOTOS_DESTINOS[nombre].foto}
                alt=""
                fill
                sizes={ultimaSola && i === DESTINOS.length - 1 ? ANCHO_FOTO_SOLA : ANCHO_FOTO}
                placeholder="blur"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {/* Velo medido con las cinco fotos: el blanco da ≥ 4.6:1 aun en el punto más claro detrás del nombre (AA). */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/60 via-40% to-transparent to-80%"
              />
              <span className="relative flex w-full items-end justify-between gap-2 font-comfortaa text-base font-bold leading-tight text-white min-[360px]:text-lg">
                {nombre}
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <details className="mt-4 text-xs text-brand-gray">
        <summary className="w-fit cursor-pointer rounded py-1 foco-portada">
          {t('inicio.destinos.creditos.titulo')}
        </summary>
        <ul role="list" className="mt-1 space-y-1">
          {DESTINOS.map(({ nombre }) => {
            const { autor, fuente, licencia, licenciaUrl } = FOTOS_DESTINOS[nombre];
            return (
              <li key={nombre}>
                {nombre}:{' '}
                <a
                  href={fuente}
                  className="underline underline-offset-2 hover:text-brand-charcoal foco-portada"
                >
                  {autor}
                </a>
                ,{' '}
                <a
                  href={licenciaUrl}
                  rel="license"
                  className="underline underline-offset-2 hover:text-brand-charcoal foco-portada"
                >
                  {licencia}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-1">{t('inicio.destinos.creditos.nota')}</p>
      </details>
    </section>
  );
}
