/**
 * Contrato de la búsqueda con `/buscar` (lo respeta 3A):
 * `/buscar?destino=&llegada=AAAA-MM-DD&salida=AAAA-MM-DD&huespedes=N`.
 * Solo se mandan los datos que existen; `/buscar` trata un dato ausente como «sin elegir».
 */
export interface Busqueda {
  destino?: string;
  /** Fecha `AAAA-MM-DD`. */
  llegada?: string;
  /** Fecha `AAAA-MM-DD`. */
  salida?: string;
  huespedes?: number;
}

export function rutaBuscar({ destino, llegada, salida, huespedes }: Busqueda = {}): string {
  const parametros = new URLSearchParams();
  if (destino) parametros.set('destino', destino);
  if (llegada) parametros.set('llegada', llegada);
  if (salida) parametros.set('salida', salida);
  if (huespedes) parametros.set('huespedes', String(huespedes));
  const consulta = parametros.toString();
  return consulta ? `/buscar?${consulta}` : '/buscar';
}
