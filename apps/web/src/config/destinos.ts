/**
 * Destinos de la portada: lista estática, sin conteos (los números llegan con los datos, 2B/3A).
 * Alimenta las sugerencias del buscador, los destinos y las búsquedas populares.
 * Los nombres son nombres propios de lugares (datos, no textos de pantalla): se mandan tal cual
 * en `?destino=`. El orden es el de aparición en pantalla.
 */
export interface Destino {
  nombre: string;
}

export const DESTINOS: readonly Destino[] = [
  { nombre: 'Xalapa' },
  { nombre: 'Coatepec' },
  { nombre: 'Veracruz' },
  { nombre: 'Xico' },
  { nombre: 'Ciudad de México' },
];
