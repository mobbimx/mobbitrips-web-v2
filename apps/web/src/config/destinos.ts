/**
 * Destinos de la portada: lista estática, sin conteos (los números llegan con los datos, 2B/3A).
 * Alimenta las sugerencias del buscador, los destinos y las búsquedas populares.
 * Los nombres son nombres propios de lugares (datos, no textos de pantalla): se mandan tal cual
 * en `?destino=`. El orden es el de aparición en pantalla.
 */
export interface Destino {
  nombre: string;
}

export const DESTINOS = [
  { nombre: 'Xalapa' },
  { nombre: 'Coatepec' },
  { nombre: 'Veracruz' },
  { nombre: 'Xico' },
  { nombre: 'Ciudad de México' },
] as const satisfies readonly Destino[];

/** Nombre de un destino de la lista: si se suma uno, el compilador pide su foto (`fotosDestinos.ts`). */
export type NombreDestino = (typeof DESTINOS)[number]['nombre'];
