import type { Metadata } from 'next';
import Link from 'next/link';
import { t } from '@/textos/t';

export const metadata: Metadata = {
  title: t('buscar.meta.titulo'),
  // Página provisional que repite lo buscado: no se indexa hasta que tenga resultados (3A).
  robots: { index: false, follow: true },
};

type Parametros = Record<string, string | string[] | undefined>;

/** Contrato con el buscador (lo respeta 3A): `?destino=&llegada=AAAA-MM-DD&salida=AAAA-MM-DD&huespedes=N`. */
function leer(parametros: Parametros, clave: string): string {
  const valor = parametros[clave];
  return (Array.isArray(valor) ? valor[0] : valor)?.trim() ?? '';
}

/** Fecha `AAAA-MM-DD` válida → «1 de noviembre de 2026»; cualquier otra cosa → vacío. */
function fechaLegible(iso: string): string {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!partes) return '';
  const [anio, mes, dia] = [Number(partes[1]), Number(partes[2]), Number(partes[3])];
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  if (fecha.getUTCMonth() !== mes - 1 || fecha.getUTCDate() !== dia) return '';
  return fecha.toLocaleDateString(t('idioma.fechas'), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function huespedesLegible(valor: string): string {
  if (!/^\d{1,2}$/.test(valor)) return '';
  const n = Number(valor);
  if (n < 1) return '';
  return t(n === 1 ? 'buscar.unHuesped' : 'buscar.variosHuespedes', { n });
}

export default function BuscarPage({ searchParams }: { searchParams: Parametros }) {
  const destino = leer(searchParams, 'destino').slice(0, 80);
  const llegada = fechaLegible(leer(searchParams, 'llegada'));
  const salida = fechaLegible(leer(searchParams, 'salida'));
  const huespedes = huespedesLegible(leer(searchParams, 'huespedes'));

  const datos = [
    { etiqueta: t('buscar.destino'), valor: destino },
    { etiqueta: t('buscar.llegada'), valor: llegada },
    { etiqueta: t('buscar.salida'), valor: salida },
    { etiqueta: t('buscar.huespedes'), valor: huespedes },
  ];

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-comfortaa text-3xl font-bold leading-tight text-brand-charcoal sm:text-4xl">
        {destino ? t('buscar.titulo', { destino }) : t('buscar.tituloSinDestino')}
      </h1>
      <p className="mt-4 text-base text-brand-gray">{t('buscar.apoyo')}</p>

      <dl className="mt-8 divide-y divide-brand-border rounded-2xl border border-brand-border bg-white">
        {datos.map(({ etiqueta, valor }) => (
          <div key={etiqueta} className="flex items-baseline justify-between gap-4 px-5 py-4">
            <dt className="text-sm text-brand-gray">{etiqueta}</dt>
            <dd className="text-right font-semibold text-brand-charcoal">
              {valor || t('buscar.sinDato')}
            </dd>
          </div>
        ))}
      </dl>

      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center rounded-full border border-brand-border bg-white px-6 text-sm font-semibold text-brand-charcoal transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {t('buscar.volver')}
      </Link>
    </section>
  );
}
