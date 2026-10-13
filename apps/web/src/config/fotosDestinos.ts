import type { StaticImageData } from 'next/image';
import type { NombreDestino } from '@/config/destinos';
import xalapa from '@/assets/destinos/xalapa.jpg';
import coatepec from '@/assets/destinos/coatepec.jpg';
import veracruz from '@/assets/destinos/veracruz.jpg';
import xico from '@/assets/destinos/xico.jpg';
import cdmx from '@/assets/destinos/cdmx.jpg';

/**
 * Fotos de las tarjetas de «Destinos» (decisión 32 del PIVOTE). Son libres, de Wikimedia Commons
 * (copia de 1280 px de ancho); sus licencias piden dar crédito, y por eso cada una trae autor,
 * licencia y la página del archivo, que se muestran bajo las tarjetas.
 *
 * Vive aparte de `destinos.ts` porque el buscador (componente del navegador) también lee la lista
 * de destinos: así las fotos y sus créditos no viajan en su paquete. Si se cambia una foto, se
 * cambian aquí también sus créditos.
 */
export interface FotoDestino {
  foto: StaticImageData;
  autor: string;
  licencia: string;
  licenciaUrl: string;
  /** Página del archivo en Wikimedia Commons. */
  fuente: string;
}

const CC_BY_SA_4 = 'https://creativecommons.org/licenses/by-sa/4.0/deed.es';

export const FOTOS_DESTINOS: Readonly<Record<NombreDestino, FotoDestino>> = {
  Xalapa: {
    foto: xalapa,
    autor: 'Koffer',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: CC_BY_SA_4,
    fuente: 'https://commons.wikimedia.org/wiki/File:Catedral_de_Xalapa_bajo_la_lluvia.jpg',
  },
  Coatepec: {
    foto: coatepec,
    autor: 'Adam Jones',
    licencia: 'CC BY 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/deed.es',
    fuente:
      'https://commons.wikimedia.org/wiki/File:Street_Scene_with_Fruit_Stall_-_Coatepec_-_Veracruz_-_Mexico.jpg',
  },
  Veracruz: {
    foto: veracruz,
    autor: 'Tonahgarfias',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: CC_BY_SA_4,
    fuente: 'https://commons.wikimedia.org/wiki/File:Amanecer_desde_el_Faro_de_Veracruz_Puerto.jpg',
  },
  Xico: {
    foto: xico,
    autor: 'Lyzy30',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: CC_BY_SA_4,
    fuente:
      'https://commons.wikimedia.org/wiki/File:Parroquia_de_Santa_Mar%C3%ADa_Magdalena_Xico_(Veracruz).jpg',
  },
  'Ciudad de México': {
    foto: cdmx,
    autor: 'Jeses',
    licencia: 'CC BY-SA 2.5',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/2.5/deed.es',
    fuente: 'https://commons.wikimedia.org/wiki/File:Mexico_City_Palacio_de_bellas_artes.jpg',
  },
};
