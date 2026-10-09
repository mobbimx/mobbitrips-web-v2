import type { Metadata } from 'next';
import { comfortaa, inter, caveat } from '@/lib/fonts';
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from '@/components/analytics/GoogleTagManager';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ViewTransitions } from 'next-view-transitions';
import { t, tLista } from '@/textos/t';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: t('meta.tituloPorDefecto'),
    template: t('meta.plantillaTitulo'),
  },
  description: t('meta.descripcion'),
  keywords: [...tLista('meta.palabrasClave')],
  authors: [{ name: t('meta.autor') }],
  creator: t('meta.autor'),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mobbitrips.com'),
  openGraph: {
    type: 'website',
    locale: t('idioma.openGraph'),
    siteName: t('marca.nombre'),
  },
  robots: { index: true, follow: true },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang={t('idioma.html')}
        className={`${comfortaa.variable} ${inter.variable} ${caveat.variable}`}
      >
        <body className="bg-brand-cream text-brand-charcoal antialiased">
          {gtmId && <GoogleTagManagerScript gtmId={gtmId} />}
          {gtmId && <GoogleTagManagerNoscript gtmId={gtmId} />}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-brand-charcoal focus:px-4 focus:py-2 focus:text-white"
          >
            {t('accesibilidad.irAlContenido')}
          </a>
          <Navbar />
          <main id="main-content" className="pt-[72px]">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
