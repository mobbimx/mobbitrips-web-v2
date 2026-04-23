import type { Metadata } from 'next';
import { comfortaa, inter, caveat } from '@/lib/fonts';
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from '@/components/analytics/GoogleTagManager';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatingButton } from '@/components/layout/WhatsAppFloatingButton';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Mobbitrips — Descansa, vive y sueña como si estuvieras en casa',
    template: '%s | Mobbitrips',
  },
  description: 'Propiedades vacacionales en México. Reserva directo y sin intermediarios.',
  keywords: [
    'rentas vacacionales',
    'propiedades vacacionales',
    'México',
    'alojamiento',
    'casas vacacionales',
  ],
  authors: [{ name: 'Mobbitrips' }],
  creator: 'Mobbitrips',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mobbitrips.com'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Mobbitrips',
  },
  robots: { index: true, follow: true },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${comfortaa.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="bg-brand-cream text-brand-charcoal antialiased">
        {gtmId && <GoogleTagManagerScript gtmId={gtmId} />}
        {gtmId && <GoogleTagManagerNoscript gtmId={gtmId} />}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Ir al contenido principal
        </a>
        <SmoothScrollProvider>
          <Navbar />
          <main id="main-content" className="pt-[72px]">
            {children}
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
