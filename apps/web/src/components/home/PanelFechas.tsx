'use client';

import { DayPicker, type DateRange } from 'react-day-picker';
import { es } from 'react-day-picker/locale/es';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { t } from '@/textos/t';

type ActiveField = 'checkin' | 'checkout';

/** `AAAA-MM-DD` → «5 oct» (es-MX). */
function formatDisplay(iso: string): string {
  if (!iso) return '';
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return '';
  return new Date(year, month - 1, day).toLocaleDateString(t('idioma.fechas'), {
    day: 'numeric',
    month: 'short',
  });
}

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

/**
 * Panel del calendario. Vive aparte para que `react-day-picker` + `date-fns` no entren al primer
 * JS de la portada: `HeroDatePicker` lo trae con `next/dynamic` al acercarse al campo o abrirlo.
 */
interface PanelFechasProps {
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

export default function PanelFechas({
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
}: PanelFechasProps) {
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
                background: isActive ? 'var(--coral-950)' : 'rgba(237,104,100,0.07)',
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
