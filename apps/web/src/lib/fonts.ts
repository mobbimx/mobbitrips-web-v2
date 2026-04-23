import { Comfortaa, Inter, Caveat } from 'next/font/google';

export const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-caveat',
  display: 'swap',
});
