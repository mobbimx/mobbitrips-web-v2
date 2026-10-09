import { URL_MOBBILINK } from '@/config/enlaces';
import { t } from '@/textos/t';

/**
 * Franja «Anuncia tu casa»: lleva a Mobbilink. Lleva «Un servicio de Mobbilink» (decisión 14).
 * Fondo coral oscuro (`--coral-950`) para que el texto blanco pase AA; el coral de marca queda para
 * decorar. Botón blanco con letra de carbón.
 */
export function AnunciaTuCasa() {
  return (
    <section aria-labelledby="anuncia-titulo" className="bg-[var(--coral-950)] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:px-6 sm:py-14 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 id="anuncia-titulo" className="font-comfortaa text-2xl font-bold sm:text-3xl">
            {t('inicio.anuncia.titulo')}
          </h2>
          <p className="mt-2 text-base font-medium">{t('marca.servicioMobbilink')}</p>
        </div>
        <a
          href={URL_MOBBILINK}
          className="inline-flex h-12 shrink-0 items-center rounded-full bg-white px-7 text-base font-semibold text-brand-charcoal transition-colors hover:bg-primary-soft foco-portada-claro motion-reduce:transition-none"
        >
          {t('nav.anunciaTuCasa')}
        </a>
      </div>
    </section>
  );
}
