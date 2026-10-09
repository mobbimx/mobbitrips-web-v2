import type { Metadata } from 'next';
import { PortadaFranja } from '@/components/home/PortadaFranja';
import { TiraConfianza } from '@/components/home/TiraConfianza';
import { DestinosPortada } from '@/components/home/DestinosPortada';
import { AnunciaTuCasa } from '@/components/home/AnunciaTuCasa';
import { BusquedasPopulares } from '@/components/home/BusquedasPopulares';
import { t } from '@/textos/t';

export const revalidate = 3600;

export const metadata: Metadata = {
  // `absolute`: la plantilla del layout («%s | Mobbitrips») repetiría la marca.
  title: { absolute: t('inicio.meta.titulo') },
  description: t('inicio.meta.descripcion'),
  // El `openGraph` de la página reemplaza al del layout (no se mezclan), por eso se repiten tipo, idioma y sitio.
  openGraph: {
    type: 'website',
    locale: t('idioma.openGraph'),
    siteName: t('marca.nombre'),
    title: t('inicio.meta.titulo'),
    description: t('inicio.meta.descripcion'),
    url: '/',
  },
};

/** Portada nueva (1A, opción A «Aire»): sin casas; franja del buscador, confianza, destinos y «Anuncia tu casa». */
export default function HomePage() {
  return (
    <>
      <PortadaFranja />
      <TiraConfianza />
      <DestinosPortada />
      <AnunciaTuCasa />
      <BusquedasPopulares />
    </>
  );
}
