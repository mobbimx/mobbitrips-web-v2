import { es, type Textos } from './es';

/**
 * Ayudante mínimo de textos (sin librería de idiomas: decisión 17 del PIVOTE).
 * Hoy solo hay español; para sumar inglés se crea `en.ts` (tipo `Textos`) y aquí se elige cuál usar.
 *
 * Peso: `t()` importa el diccionario completo. Mientras sea el cascarón y el Hero es mínimo; cuando
 * crezca, repartirlo por secciones antes de que llegue al paquete del navegador (decisión 4).
 */
const diccionario: Textos = es;

/** Rutas con punto hacia los valores del diccionario cuyo tipo es `V`: `'nav.enlaces.inicio'`. */
type Rutas<T, V, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends V
    ? `${P}${K}`
    : T[K] extends string | readonly string[]
      ? never
      : Rutas<T[K], V, `${P}${K}.`>;
}[keyof T & string];

/** Clave de un texto suelto. Si no existe en `es.ts`, no compila. */
export type ClaveTexto = Rutas<Textos, string>;
/** Clave de una lista de textos. */
export type ClaveLista = Rutas<Textos, string[]>;

type Variables = Record<string, string | number>;

function buscar(clave: string): unknown {
  let valor: unknown = diccionario;
  for (const parte of clave.split('.')) {
    if (typeof valor !== 'object' || valor === null) return undefined;
    valor = (valor as Record<string, unknown>)[parte];
  }
  return valor;
}

/** Devuelve un texto; las `{variables}` se reemplazan con `variables`. */
export function t(clave: ClaveTexto, variables?: Variables): string {
  const valor = buscar(clave);
  if (typeof valor !== 'string') return clave;
  return valor.replace(/\{(\w+)\}/g, (marca: string, nombre: string) => {
    const dato = variables?.[nombre];
    return dato === undefined ? marca : String(dato);
  });
}

/** Devuelve una lista de textos (por ejemplo, las palabras clave del sitio). */
export function tLista(clave: ClaveLista): readonly string[] {
  const valor = buscar(clave);
  return Array.isArray(valor) ? (valor as string[]) : [];
}
