'use client';

import { useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Minus, Plus, Search } from 'lucide-react';
import { DESTINOS } from '@/config/destinos';
import { rutaBuscar } from '@/lib/buscar';
import { t } from '@/textos/t';
import { HeroDatePicker } from './HeroDatePicker';
import estilos from './BuscadorPortada.module.css';

const MIN_HUESPEDES = 1;
const MAX_HUESPEDES = 16;
const HUESPEDES_INICIALES = 2;

/** Sin acentos y en minúsculas, para que «mexico» encuentre «Ciudad de México». */
function plano(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/** Destinos que coinciden con lo escrito; primero los que empiezan igual. Sin texto: todos. */
function sugerir(escrito: string): string[] {
  const buscado = plano(escrito);
  const nombres = DESTINOS.map((d) => d.nombre);
  if (!buscado) return nombres;
  const coinciden = nombres.filter((n) => plano(n).includes(buscado));
  return [
    ...coinciden.filter((n) => plano(n).startsWith(buscado)),
    ...coinciden.filter((n) => !plano(n).startsWith(buscado)),
  ];
}

/**
 * Buscador de la portada: Destino (con sugerencias) · Fechas · Huéspedes · Buscar.
 * Manda a `/buscar?destino=&llegada=&salida=&huespedes=` (contrato en `lib/buscar.ts`).
 *
 * Accesibilidad: destino = combobox con lista (flechas, Enter, Escape; el foco no sale del campo),
 * huéspedes anunciados con `aria-live`, el formulario también funciona como GET sin JavaScript.
 * Sin animaciones propias: solo transiciones de hover (ver el módulo CSS).
 */
export function BuscadorPortada() {
  const router = useRouter();
  const idEntrada = useId();
  const idLista = useId();
  const idHuespedes = useId();
  const campoDestino = useRef<HTMLDivElement>(null);

  const [destino, setDestino] = useState('');
  const [llegada, setLlegada] = useState('');
  const [salida, setSalida] = useState('');
  const [huespedes, setHuespedes] = useState(HUESPEDES_INICIALES);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(-1);

  const sugerencias = useMemo(() => sugerir(destino), [destino]);
  // Si lo escrito ya es, tal cual, la única sugerencia, la lista sobra (y taparía las fechas en cel).
  const yaEscrito = sugerencias.length === 1 && plano(sugerencias[0] ?? '') === plano(destino);
  const listaVisible = abierto && sugerencias.length > 0 && !yaEscrito;

  /** Mensaje para lectores de pantalla (la lista aparece sin que el foco se mueva). */
  const anuncio =
    !abierto || yaEscrito
      ? ''
      : sugerencias.length === 0
        ? t('inicio.buscador.destino.sinSugerencias')
        : sugerencias.length === 1
          ? t('inicio.buscador.destino.unaSugerencia')
          : t('inicio.buscador.destino.variasSugerencias', { n: sugerencias.length });

  function elegir(nombre: string) {
    setDestino(nombre);
    setAbierto(false);
    setActivo(-1);
  }

  function alEscribir(valor: string) {
    setDestino(valor);
    setAbierto(true);
    setActivo(-1);
  }

  function alTeclear(e: KeyboardEvent<HTMLInputElement>) {
    const total = sugerencias.length;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!total) return;
        setAbierto(true);
        setActivo((a) => (abierto ? (a + 1) % total : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!total) return;
        setAbierto(true);
        setActivo((a) => (abierto ? (a <= 0 ? total - 1 : a - 1) : total - 1));
        break;
      case 'Enter': {
        const elegida = listaVisible ? sugerencias[activo] : undefined;
        if (elegida) {
          e.preventDefault();
          elegir(elegida);
        }
        break;
      }
      case 'Escape':
        if (abierto) {
          e.preventDefault();
          setAbierto(false);
          setActivo(-1);
        }
        break;
    }
  }

  /** Cierra la lista cuando el foco sale del campo (Tab o clic fuera). */
  function alSalirDelCampo(e: React.FocusEvent<HTMLDivElement>) {
    if (!campoDestino.current?.contains(e.relatedTarget as Node | null)) {
      setAbierto(false);
      setActivo(-1);
    }
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const escrito = destino.trim();
    // «xalapa» → «Xalapa»: si coincide con un destino conocido se manda su nombre exacto.
    const conocido = DESTINOS.find((d) => plano(d.nombre) === plano(escrito));
    router.push(rutaBuscar({ destino: conocido?.nombre ?? escrito, llegada, salida, huespedes }));
  }

  return (
    <form
      role="search"
      aria-label={t('inicio.buscador.aria')}
      action="/buscar"
      method="get"
      onSubmit={enviar}
      className={estilos.buscador}
    >
      {/* Destino */}
      <div
        ref={campoDestino}
        className={`${estilos.campo} ${estilos.destino}`}
        onBlur={alSalirDelCampo}
      >
        <label htmlFor={idEntrada} className={estilos.etiqueta}>
          {t('inicio.buscador.destino.etiqueta')}
        </label>
        <input
          id={idEntrada}
          name="destino"
          type="text"
          role="combobox"
          aria-expanded={listaVisible}
          aria-controls={idLista}
          aria-autocomplete="list"
          aria-activedescendant={listaVisible && activo >= 0 ? `${idLista}-${activo}` : undefined}
          autoComplete="off"
          maxLength={80}
          placeholder={t('inicio.buscador.destino.placeholder')}
          value={destino}
          onChange={(e) => alEscribir(e.target.value)}
          onFocus={() => setAbierto(true)}
          onKeyDown={alTeclear}
          className={estilos.entrada}
        />
        {listaVisible && (
          <ul
            id={idLista}
            role="listbox"
            aria-label={t('inicio.buscador.destino.sugerencias')}
            className={estilos.lista}
          >
            {sugerencias.map((nombre, i) => (
              <li
                key={nombre}
                id={`${idLista}-${i}`}
                role="option"
                aria-selected={i === activo}
                className={estilos.opcion}
                // El campo conserva el foco: sin esto, el clic lo quitaría y la lista se cerraría antes de elegir.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => elegir(nombre)}
              >
                <span className={estilos.opcionIcono} aria-hidden="true">
                  <MapPin size={16} />
                </span>
                {nombre}
              </li>
            ))}
          </ul>
        )}
        <span className="sr-only" role="status" aria-live="polite">
          {anuncio}
        </span>
      </div>

      <span className={estilos.sep} aria-hidden="true" />

      {/* Fechas (selector de fechas en español) */}
      <div className={estilos.fechas}>
        <HeroDatePicker
          checkin={llegada}
          checkout={salida}
          onCheckinChange={setLlegada}
          onCheckoutChange={setSalida}
        />
      </div>

      <span className={estilos.sep} aria-hidden="true" />

      {/* Huéspedes */}
      <div
        className={`${estilos.campo} ${estilos.huespedes}`}
        role="group"
        aria-labelledby={idHuespedes}
      >
        <div className={estilos.huespedesTexto}>
          <span id={idHuespedes} className={estilos.etiqueta}>
            {t('inicio.buscador.huespedes.etiqueta')}
          </span>
          <span className={estilos.valor} aria-live="polite" aria-atomic="true">
            {t(
              huespedes === 1
                ? 'inicio.buscador.huespedes.uno'
                : 'inicio.buscador.huespedes.varios',
              {
                n: huespedes,
              },
            )}
          </span>
        </div>
        <div className={estilos.contador}>
          <button
            type="button"
            className={estilos.paso}
            onClick={() => setHuespedes((n) => Math.max(MIN_HUESPEDES, n - 1))}
            disabled={huespedes <= MIN_HUESPEDES}
            aria-label={t('inicio.buscador.huespedes.quitar')}
          >
            <Minus size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={estilos.paso}
            onClick={() => setHuespedes((n) => Math.min(MAX_HUESPEDES, n + 1))}
            disabled={huespedes >= MAX_HUESPEDES}
            aria-label={t('inicio.buscador.huespedes.agregar')}
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Sin JavaScript el formulario se envía como GET con estos campos. */}
      <input type="hidden" name="llegada" value={llegada} />
      <input type="hidden" name="salida" value={salida} />
      <input type="hidden" name="huespedes" value={huespedes} />

      <button type="submit" className={estilos.boton}>
        <Search size={18} strokeWidth={2.4} aria-hidden="true" />
        {t('inicio.buscador.boton')}
      </button>
    </form>
  );
}
