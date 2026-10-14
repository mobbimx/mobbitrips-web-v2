import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { t } from '@/textos/t';

export const metadata: Metadata = {
  title: t('noEncontrada.titulo'),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-comfortaa text-8xl font-bold text-primary/20" aria-hidden="true">
        {t('noEncontrada.codigo')}
      </p>
      <h1 className="mt-4 font-comfortaa text-2xl font-bold text-brand-charcoal">
        {t('noEncontrada.encabezado')}
      </h1>
      <p className="mt-2 max-w-sm text-brand-gray">{t('noEncontrada.descripcion')}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/propiedades"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Search size={18} aria-hidden="true" />
          {t('noEncontrada.verPropiedades')}
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3 font-semibold text-brand-charcoal transition-colors hover:bg-brand-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Home size={18} aria-hidden="true" />
          {t('noEncontrada.irAlInicio')}
        </Link>
      </div>
    </div>
  );
}
