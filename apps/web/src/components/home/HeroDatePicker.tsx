'use client';

import { useEffect, useId, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { DayPicker, type DateRange } from 'react-day-picker';
import { es } from 'react-day-picker/locale/es';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { t } from '@/textos/t';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroDatePickerProps {
  checkin: string;
  checkout: string;
  onCheckinChange: (value: string) => void;
  onCheckoutChange: (value: string) => void;
}

type ActiveField = 'checkin' | 'checkout';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseLocalDate(iso: string): Date | undefined {
  if (!iso) return undefined;
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplay(iso: string): string {
  if (!iso) return '';
  const date = parseLocalDate(iso);
  if (!date) return '';
  return date.toLocaleDateString(t('idioma.fechas'), { day: 'numeric', month: 'short' });
}

/** Elementos del panel a los que llega el tabulador (los días usan «roving tabindex»: solo uno vale 0). */
function enfocables(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>('button, [tabindex]')).filter(
    (el) => el.tabIndex >= 0 && !el.hasAttribute('disabled'),
  );
}

// Wraps the popup so it opens upward relative to the trigger
const ABOVE_STYLE: React.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  transform: 'translateY(calc(-100% - 12px))',
};

// ─── DayPicker class names ────────────────────────────────────────────────────

const PICKER_CLASSES = {
  root: 'hdp-root',
  months: 'hdp-months',
  month: 'hdp-month',
  month_caption: 'hdp-month-caption',
  caption_label: 'hdp-caption-label',
  nav: 'hdp-nav',
  button_previous: 'hdp-btn-nav hdp-btn-prev',
  button_next: 'hdp-btn-nav hdp-btn-next',
  month_grid: 'hdp-month-grid',
  weekdays: 'hdp-weekdays',
  weekday: 'hdp-weekday',
  week: 'hdp-week',
  day: 'hdp-day',
  day_button: 'hdp-day-btn',
  today: 'hdp-today',
  selected: 'hdp-selected',
  range_start: 'hdp-range-start',
  range_end: 'hdp-range-end',
  range_middle: 'hdp-range-middle',
  outside: 'hdp-outside',
  disabled: 'hdp-disabled',
  hidden: 'hdp-hidden',
};

// ─── Panel content ────────────────────────────────────────────────────────────

interface PanelContentProps {
  id: string;
  panelRef: React.RefObject<HTMLDivElement>;
  checkin: string;
  checkout: string;
  activeField: ActiveField;
  from: Date | undefined;
  to: Date | undefined;
  onSelect: (range: DateRange | undefined, dia: Date) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  mobile?: boolean;
}

function PanelContent({
  id,
  panelRef,
  checkin,
  checkout,
  activeField,
  from,
  to,
  onSelect,
  onKeyDown,
  mobile,
}: PanelContentProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('hero.fechas.dialogo')}
      className={mobile ? 'hdp-panel hdp-panel--movil' : 'hdp-panel'}
      onKeyDown={onKeyDown}
    >
      {/* Active field indicator — shows which date the user is picking */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['checkin', 'checkout'] as const).map((field) => {
          const isActive = activeField === field;
          const label = field === 'checkin' ? t('hero.fechas.llegada') : t('hero.fechas.salida');
          const value = field === 'checkin' ? checkin : checkout;
          return (
            <div
              key={field}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 10,
                background: isActive ? '#C14744' : 'rgba(237,104,100,0.07)',
                transition: 'background 220ms ease',
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? '#fff' : '#706F6F',
                  marginBottom: 2,
                  fontFamily: 'var(--font-inter, sans-serif)',
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? '#fff' : '#3D3D3D',
                  fontFamily: 'var(--font-inter, sans-serif)',
                }}
              >
                {value ? formatDisplay(value) : '—'}
              </p>
            </div>
          );
        })}
      </div>

      <DayPicker
        mode="range"
        // Mínimo una noche: con 0 (el valor por omisión) el primer día elegido cerraba el rango
        // con llegada = salida y el panel se cerraba sin dejar escoger la salida.
        min={1}
        locale={es}
        autoFocus
        selected={{ from, to }}
        onSelect={onSelect}
        disabled={{ before: today }}
        numberOfMonths={1}
        showOutsideDays={false}
        components={{
          Chevron: ({ orientation }) =>
            orientation === 'left' ? (
              <ChevronLeft size={16} color="#ED6864" aria-hidden="true" />
            ) : (
              <ChevronRight size={16} color="#ED6864" aria-hidden="true" />
            ),
        }}
        classNames={PICKER_CLASSES}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Selector de fechas del buscador. Calendario en español (`react-day-picker/locale/es`).
 * Teclado: al abrir, el foco entra al calendario (flechas, Re Pág/Av Pág, Inicio/Fin); el tabulador
 * se queda dentro del panel; Escape cierra y regresa el foco al campo; al elegir la salida, el foco
 * vuelve al campo «Salida». Entrada con CSS de una sola vez (sin librerías), quieta con
 * «reducir movimiento».
 */
export function HeroDatePicker({
  checkin,
  checkout,
  onCheckinChange,
  onCheckoutChange,
}: HeroDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>('checkin');
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const llegadaRef = useRef<HTMLButtonElement>(null);
  const salidaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 480);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const updatePos = useCallback(() => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setPos({ top: r.top, left: r.left });
  }, []);

  const cerrarYVolver = useCallback((field: ActiveField) => {
    setOpen(false);
    (field === 'checkin' ? llegadaRef : salidaRef).current?.focus();
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const destino = e.target as Node;
      if (!panelRef.current?.contains(destino) && !containerRef.current?.contains(destino)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrarYVolver(activeField);
    };
    document.addEventListener('pointerdown', onDown, { capture: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown, { capture: true });
      document.removeEventListener('keydown', onKey);
    };
  }, [open, activeField, cerrarYVolver]);

  // Keep position synced on scroll / resize
  useEffect(() => {
    if (!open) return;
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos, { passive: true });
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos);
    };
  }, [open, updatePos]);

  function openFor(field: ActiveField) {
    if (open && activeField === field) {
      setOpen(false);
      return;
    }
    setActiveField(field);
    updatePos();
    setOpen(true);
  }

  /** El panel vive en un portal al final de `body`: sin esto, el tabulador se iría fuera del sitio. */
  function atraparTab(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const lista = enfocables(panelRef.current);
    const primero = lista[0];
    const ultimo = lista[lista.length - 1];
    if (!primero || !ultimo) return;
    const actual = document.activeElement;
    if (e.shiftKey && (actual === primero || !panelRef.current.contains(actual))) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && (actual === ultimo || !panelRef.current.contains(actual))) {
      e.preventDefault();
      primero.focus();
    }
  }

  const from = parseLocalDate(checkin);
  const to = parseLocalDate(checkout);

  /**
   * Decide con el día tocado y el campo activo (el rango que propone react-day-picker, con las dos
   * fechas ya puestas, movía la salida aunque se estuviera cambiando la llegada).
   * - «Llegada»: el día es la nueva llegada; si la salida quedó igual o antes, se borra. El panel
   *   sigue abierto, ahora en «Salida».
   * - «Salida»: un día después de la llegada es la salida y cierra; uno igual o antes (o sin llegada)
   *   pasa a ser la llegada, igual que arriba.
   * - Sin selección (se volvió a tocar la única fecha elegida): se borra todo y regresa a «Llegada».
   */
  function handleSelect(range: DateRange | undefined, dia: Date): void {
    if (!range) {
      onCheckinChange('');
      onCheckoutChange('');
      setActiveField('checkin');
      return;
    }
    const iso = toISO(dia);
    // Fechas `AAAA-MM-DD`: compararlas como texto respeta el orden del calendario.
    if (activeField === 'checkout' && checkin && iso > checkin) {
      onCheckoutChange(iso);
      cerrarYVolver('checkout');
      return;
    }
    onCheckinChange(iso);
    if (checkout && checkout <= iso) onCheckoutChange('');
    setActiveField('checkout');
  }

  const anchorStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        zIndex: 9999,
        top: 72,
        left: 8,
        right: 8,
        transform: 'none',
      }
    : { ...ABOVE_STYLE, top: pos.top, left: pos.left };

  const fieldActive = (field: ActiveField) =>
    open && activeField === field
      ? ({
          background: 'rgba(237,104,100,0.08)',
          boxShadow: 'inset 0 0 0 1.5px rgba(237,104,100,0.28)',
          borderRadius: '999px',
        } as React.CSSProperties)
      : {};

  const labelColor = (field: ActiveField): React.CSSProperties =>
    open && activeField === field ? { color: '#3D3D3D' } : {};

  return (
    <>
      {/* DayPicker custom styles */}
      <style>{`
        .hdp-panel { background: #fff; border: 1px solid rgba(237,104,100,0.18); box-shadow: 0 24px 64px rgba(237,104,100,0.18), 0 4px 20px rgba(0,0,0,0.06); border-radius: 20px; padding: 20px; min-width: 320px; animation: hdp-entrada 240ms cubic-bezier(0.19,1,0.22,1) both; }
        .hdp-panel--movil { padding: 16px; min-width: 0; width: 100%; }
        @keyframes hdp-entrada { from { opacity: 0; transform: translateY(6px) scale(0.98); } to { opacity: 1; transform: none; } }
        .hdp-root { font-family: var(--font-inter, sans-serif); font-size: 14px; color: #3D3D3D; }
        .hdp-months { position: relative; display: flex; gap: 16px; }
        .hdp-month { width: 280px; }
        .hdp-month-caption { display: flex; align-items: center; justify-content: space-between; min-height: 30px; margin-bottom: 12px; padding: 0 4px; }
        .hdp-caption-label { font-family: var(--font-comfortaa, sans-serif); font-weight: 700; font-size: 15px; color: #3D3D3D; letter-spacing: -0.01em; text-transform: capitalize; }
        /* react-day-picker 9 pone la botonera como hermana del mes: se ancla arriba a la derecha del título. */
        .hdp-nav { position: absolute; top: 0; right: 4px; display: flex; gap: 4px; }
        .hdp-btn-nav { width: 30px; height: 30px; border-radius: 8px; border: 1px solid rgba(237,104,100,0.18); background: rgba(255,255,255,0.7); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: #ED6864; transition: background 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1); }
        .hdp-btn-nav:hover { background: rgba(237,104,100,0.08); transform: scale(1.08); }
        .hdp-btn-nav:focus-visible, .hdp-day-btn:focus-visible { outline: 2px solid #ED6864; outline-offset: 2px; }
        .hdp-month-grid { width: 100%; border-collapse: collapse; }
        .hdp-weekdays { display: grid; grid-template-columns: repeat(7,1fr); margin-bottom: 4px; }
        .hdp-weekday { text-align: center; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #706F6F; padding: 4px 0; }
        .hdp-week { display: grid; grid-template-columns: repeat(7,1fr); }
        .hdp-day { position: relative; display: flex; align-items: center; justify-content: center; }
        .hdp-day-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; font-family: var(--font-inter, sans-serif); font-size: 14px; color: #3D3D3D; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 180ms ease, color 180ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1); position: relative; z-index: 1; }
        .hdp-day-btn:hover:not(:disabled) { background: rgba(237,104,100,0.12); transform: scale(1.08); }
        .hdp-today .hdp-day-btn { box-shadow: inset 0 0 0 1px rgba(237,104,100,0.4); font-weight: 600; }
        .hdp-range-middle { background: rgba(237,104,100,0.08); border-radius: 0; }
        .hdp-range-middle .hdp-day-btn { color: #3D3D3D; }
        .hdp-range-start, .hdp-range-end { background: rgba(237,104,100,0.08); }
        .hdp-range-start { border-radius: 50% 0 0 50%; }
        .hdp-range-end   { border-radius: 0 50% 50% 0; }
        .hdp-range-start.hdp-range-end { border-radius: 50%; }
        .hdp-range-start .hdp-day-btn, .hdp-range-end .hdp-day-btn { background: #C14744; color: #fff; font-weight: 700; box-shadow: 0 4px 12px rgba(237,104,100,0.35); }
        .hdp-range-start .hdp-day-btn:hover, .hdp-range-end .hdp-day-btn:hover { background: #A93B38; transform: scale(1.08); }
        .hdp-outside .hdp-day-btn { opacity: 0; pointer-events: none; }
        .hdp-disabled .hdp-day-btn { opacity: 0.28; cursor: not-allowed; pointer-events: none; }
        .hdp-hidden { visibility: hidden; }
        @media (max-width: 480px) {
          .hdp-month { width: 100%; }
          .hdp-day-btn { width: 32px; height: 32px; font-size: 13px; }
          .hdp-weekday { font-size: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hdp-panel { animation: none; }
          .hdp-day-btn, .hdp-btn-nav { transition: none !important; transform: none !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ position: 'relative', display: 'flex', alignItems: 'stretch', flex: '2 2 0' }}
      >
        {/* Llegada */}
        <button
          ref={llegadaRef}
          type="button"
          className="hero-search-section"
          onClick={() => openFor('checkin')}
          aria-haspopup="dialog"
          aria-expanded={open && activeField === 'checkin'}
          aria-controls={open ? panelId : undefined}
          aria-label={
            checkin
              ? t('hero.fechas.llegadaConFecha', { fecha: formatDisplay(checkin) })
              : t('hero.fechas.seleccionarLlegada')
          }
          style={fieldActive('checkin')}
        >
          <span className="hero-search-label" style={labelColor('checkin')}>
            {t('hero.fechas.llegada')}
          </span>
          <span
            className={checkin ? 'hero-search-value' : 'hero-search-value hero-search-value--muted'}
          >
            {checkin ? formatDisplay(checkin) : t('hero.fechas.agregarFecha')}
          </span>
        </button>

        <div className="hero-search-divider" aria-hidden="true" />

        {/* Salida */}
        <button
          ref={salidaRef}
          type="button"
          className="hero-search-section"
          onClick={() => openFor('checkout')}
          aria-haspopup="dialog"
          aria-expanded={open && activeField === 'checkout'}
          aria-controls={open ? panelId : undefined}
          aria-label={
            checkout
              ? t('hero.fechas.salidaConFecha', { fecha: formatDisplay(checkout) })
              : t('hero.fechas.seleccionarSalida')
          }
          style={fieldActive('checkout')}
        >
          <span className="hero-search-label" style={labelColor('checkout')}>
            {t('hero.fechas.salida')}
          </span>
          <span
            className={
              checkout ? 'hero-search-value' : 'hero-search-value hero-search-value--muted'
            }
          >
            {checkout ? formatDisplay(checkout) : t('hero.fechas.agregarFecha')}
          </span>
        </button>

        {/* Portal — escapes overflow:hidden of .hero-section */}
        {mounted &&
          open &&
          createPortal(
            <div style={anchorStyle}>
              <PanelContent
                id={panelId}
                panelRef={panelRef}
                checkin={checkin}
                checkout={checkout}
                activeField={activeField}
                from={from}
                to={to}
                onSelect={handleSelect}
                onKeyDown={atraparTab}
                mobile={isMobile}
              />
            </div>,
            document.body,
          )}
      </div>
    </>
  );
}
