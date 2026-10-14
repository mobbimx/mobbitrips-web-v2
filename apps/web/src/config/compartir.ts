import imagen from '@/assets/compartir/mobbitrips.jpg';
import { t } from '@/textos/t';

/**
 * Imagen que sale al compartir el link (Open Graph, 1200×630; decisión 33 del PIVOTE): crema con las
 * manchas de la portada y el logo oficial del Drive. Su fuente y cómo regenerarla están en
 * `planeacion/proyectos/mobbitrips/fases/salidas/1A6-og/`.
 *
 * La usan el layout y la portada: el `openGraph` de una página reemplaza al del layout (no se
 * mezclan), así que la que declare el suyo debe repetir esta imagen. La URL sale absoluta con el
 * `metadataBase` del layout.
 */
export const IMAGEN_COMPARTIR = {
  url: imagen.src,
  width: imagen.width,
  height: imagen.height,
  alt: t('meta.imagenCompartir'),
};
