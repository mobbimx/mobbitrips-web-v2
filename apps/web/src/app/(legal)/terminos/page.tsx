import type { Metadata } from 'next';
import { t } from '@/textos/t';

export const metadata: Metadata = {
  title: t('legal.terminos.titulo'),
};

export default function TerminosPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-comfortaa text-3xl font-bold text-brand-charcoal">
        {t('legal.terminos.encabezado')}
      </h1>
    </article>
  );
}
