/**
 * Todos los textos visibles del sitio, en español (decisión 17 del PIVOTE: solo español al
 * arrancar, preparado para agregar inglés sin rehacer).
 *
 * Reglas:
 * - Aquí vive el TEXTO. Las rutas (href), URLs externas, clases y números siguen en el componente.
 * - Se lee con `t('grupo.clave')` (ver `./t.ts`); nunca importando este objeto directo en un componente.
 * - Variables dentro del texto con llaves: `'© {year} Mobbitrips'` → `t('footer.derechos', { year })`.
 * - Para sumar inglés: crear `en.ts` con `export const en: Textos = { ... }` (el tipo obliga a que
 *   tenga exactamente las mismas claves) y elegir el idioma en `t.ts`.
 * - Aquí está el cascarón (metadatos, Navbar, Footer, páginas legales, 404), `/buscar` y el Hero. El
 *   resto de las secciones se mueve aquí cuando se rehaga en su fase.
 */
export const es = {
  /** Configuración que depende del idioma (no es texto de pantalla, pero cambia con el idioma). */
  idioma: {
    html: 'es',
    openGraph: 'es_MX',
    fechas: 'es-MX',
  },

  marca: {
    nombre: 'Mobbitrips',
    /** El logotipo se escribe en dos tonos: «mobbi» + «trips». */
    inicio: 'mobbi',
    fin: 'trips',
  },

  meta: {
    tituloPorDefecto: 'Mobbitrips — Descansa, vive y sueña como si estuvieras en casa',
    plantillaTitulo: '%s | Mobbitrips',
    descripcion: 'Propiedades vacacionales en México. Reserva directo y sin intermediarios.',
    palabrasClave: [
      'rentas vacacionales',
      'propiedades vacacionales',
      'México',
      'alojamiento',
      'casas vacacionales',
    ],
    autor: 'Mobbitrips',
  },

  accesibilidad: {
    irAlContenido: 'Ir al contenido principal',
  },

  nav: {
    aria: 'Navegación principal',
    inicioAria: 'Mobbitrips: ir al inicio',
    anunciaTuCasa: 'Anuncia tu casa',
  },

  footer: {
    derechos: '© {year} Mobbitrips · Un servicio de Mobbilink',
    legalAria: 'Páginas legales',
    terminos: 'Términos',
    privacidad: 'Privacidad',
  },

  legal: {
    terminos: {
      titulo: 'Términos y condiciones',
      encabezado: 'Términos y condiciones — Mobbitrips',
    },
    privacidad: {
      titulo: 'Aviso de privacidad',
      encabezado: 'Aviso de privacidad — Mobbitrips',
    },
  },

  /** `/buscar`: página lisa mínima que repite lo buscado mientras llegan los resultados (Fase 3A). */
  buscar: {
    meta: {
      titulo: 'Buscar casas',
    },
    titulo: 'Pronto: casas en {destino}…',
    tituloSinDestino: 'Pronto: casas para tu viaje…',
    apoyo: 'Estamos preparando los resultados. Esto es lo que buscaste:',
    destino: 'Destino',
    llegada: 'Llegada',
    salida: 'Salida',
    huespedes: 'Huéspedes',
    sinDato: 'Sin elegir',
    unHuesped: '{n} huésped',
    variosHuespedes: '{n} huéspedes',
    volver: 'Volver al inicio',
  },

  noEncontrada: {
    titulo: 'Página no encontrada',
    codigo: '404',
    encabezado: 'Esta página no existe',
    descripcion:
      'La dirección que buscas no existe o fue movida. Puedes explorar nuestras propiedades o volver al inicio.',
    verPropiedades: 'Ver propiedades',
    irAlInicio: 'Ir al inicio',
  },

  hero: {
    aria: 'Bienvenida',
    etiqueta: 'Casa en todas partes · Hospedaje humano',
    titulo: {
      /** Cada línea se anima palabra por palabra (se separa por espacios). */
      linea1: 'Descansa, vive y sueña',
      linea2: 'como si estuvieras',
      destacado: 'en casa',
    },
    subtitulo: 'Propiedades únicas en México. Curadas para sentirse como hogar, no como hotel.',
    buscador: {
      aria: 'Buscar hospedajes',
      destinoEtiqueta: '¿A dónde?',
      destinoValor: 'México',
      huespedesEtiqueta: 'Huéspedes',
      unaPersona: '{n} persona',
      variasPersonas: '{n} personas',
      reducirHuespedes: 'Reducir huéspedes',
      aumentarHuespedes: 'Aumentar huéspedes',
      boton: 'Buscar',
      botonAria: 'Buscar propiedades',
    },
    fechas: {
      llegada: 'Llegada',
      salida: 'Salida',
      agregarFecha: 'Agrega fecha',
      seleccionarLlegada: 'Seleccionar fecha de llegada',
      seleccionarSalida: 'Seleccionar fecha de salida',
      llegadaConFecha: 'Llegada: {fecha}',
      salidaConFecha: 'Salida: {fecha}',
      dialogo: 'Selecciona fechas de llegada y salida',
    },
    cta: {
      verPropiedades: 'Ver propiedades',
      conocerMas: 'Conoce más',
    },
    descubreMas: 'Descubre más',
  },
};

/** Forma de un diccionario completo: cualquier idioma nuevo debe cumplirla. */
export type Textos = typeof es;
