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
 * - En 0A solo está el cascarón (metadatos, Navbar, Footer, botón flotante, 404) y el Hero. El resto
 *   de las secciones se mueve aquí cuando se rehaga en su fase.
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
    enlaces: {
      inicio: 'Inicio',
      propiedades: 'Propiedades',
      nosotros: 'Nosotros',
      servicios: 'Servicios',
      contacto: 'Contacto',
    },
    reservar: 'Reservar ahora',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    menuMovil: 'Menú de navegación',
  },

  footer: {
    aria: 'Pie de página',
    lema: 'Descansa, vive y sueña como si estuvieras en casa.',
    alcance: 'Propiedades vacacionales en México.',
    navegacion: {
      titulo: 'Navegación',
      inicio: 'Inicio',
      propiedades: 'Propiedades',
      nosotros: 'Nosotros',
      blog: 'Blog',
      experiencias: 'Experiencias',
    },
    servicios: {
      titulo: 'Servicios',
      propietarios: 'Para propietarios',
      contacto: 'Contacto',
      faq: 'Preguntas frecuentes',
    },
    contacto: {
      titulo: 'Contacto',
      whatsappAria: 'WhatsApp de Mobbitrips',
      telefono: '+52 228 252 5244',
      correo: 'hola@mobbitrips.com',
      ubicacion: 'México',
      instagramAria: 'Instagram de Mobbitrips',
      facebookAria: 'Facebook de Mobbitrips',
    },
    derechos: '© {year} Mobbitrips. Todos los derechos reservados.',
    legal: {
      privacidad: 'Privacidad',
      terminos: 'Términos',
    },
  },

  whatsapp: {
    aria: 'Abrir WhatsApp',
    etiqueta: 'Escríbenos',
    mensaje: '¡Hola! Me interesa información sobre sus propiedades vacacionales en Xalapa.',
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
