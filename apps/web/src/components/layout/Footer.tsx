import Link from 'next/link';
import { t, type ClaveTexto } from '@/textos/t';

const legales: { href: string; texto: ClaveTexto }[] = [
  { href: '/terminos', texto: 'footer.terminos' },
  { href: '/privacidad', texto: 'footer.privacidad' },
];

/** Pie del sitio: derechos, «Un servicio de Mobbilink» y las páginas legales. Sin animación. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-sm text-brand-gray sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-center sm:text-left">{t('footer.derechos', { year })}</p>
        <nav aria-label={t('footer.legalAria')}>
          <ul className="flex items-center gap-2" role="list">
            {legales.map(({ href, texto }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-[44px] items-center rounded-lg px-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t(texto)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
