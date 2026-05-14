'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { DayPicker, type DateRange } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

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
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

// ─── Animation variants ───────────────────────────────────────────────────────

const variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.19, 1, 0.22, 1] as number[] },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.18, ease: [0.65, 0, 0.35, 1] as number[] },
  },
};

// Wraps the popup so it opens upward relative to the trigger
const ABOVE_STYLE: React.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  transform: 'translateY(calc(-100% - 12px))',
  transformOrigin: 'bottom center',
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
  panelRef: React.RefObject<HTMLDivElement>;
  checkin: string;
  checkout: string;
  activeField: ActiveField;
  from: Date | undefined;
  to: Date | undefined;
  onSelect: (range: DateRange | undefined) => void;
}

function PanelContent({
  panelRef,
  checkin,
  checkout,
  activeField,
  from,
  to,
  onSelect,
}: PanelContentProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Selecciona fechas de llegada y salida"
      style={{
        background: 'rgba(253, 240, 239, 0.90)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(237, 104, 100, 0.18)',
        boxShadow:
          '0 24px 64px rgba(237,104,100,0.18), 0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 20,
        minWidth: 320,
      }}
    >
      {/* Active field indicator — shows which date the user is picking */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['checkin', 'checkout'] as const).map((field) => {
          const isActive = activeField === field;
          const label = field === 'checkin' ? 'Llegada' : 'Salida';
          const value = field === 'checkin' ? checkin : checkout;
          return (
            <div
              key={field}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 10,
                background: isActive ? '#ED6864' : 'rgba(237,104,100,0.07)',
                transition: 'background 220ms ease',
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'rgba(255,255,255,0.75)' : '#9A9999',
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

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePos = useCallback(() => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setPos({ top: r.top, left: r.left });
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !containerRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown, { capture: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown, { capture: true });
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

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

  const from = parseLocalDate(checkin);
  const to = parseLocalDate(checkout);

  function handleSelect(range: DateRange | undefined): void {
    if (range?.from) {
      onCheckinChange(toISO(range.from));
    } else {
      onCheckinChange('');
    }
    if (range?.to) {
      onCheckoutChange(toISO(range.to));
      setOpen(false);
    } else {
      onCheckoutChange('');
      setActiveField('checkout');
    }
  }

  const panelContent = (
    <PanelContent
      panelRef={panelRef}
      checkin={checkin}
      checkout={checkout}
      activeField={activeField}
      from={from}
      to={to}
      onSelect={handleSelect}
    />
  );

  const fieldActive = (field: ActiveField) =>
    open && activeField === field
      ? ({
          background: 'rgba(237,104,100,0.08)',
          boxShadow: 'inset 0 0 0 1.5px rgba(237,104,100,0.28)',
          borderRadius: '999px',
        } as React.CSSProperties)
      : {};

  const labelColor = (field: ActiveField): React.CSSProperties =>
    open && activeField === field ? { color: '#ED6864' } : {};

  return (
    <>
      {/* DayPicker custom styles */}
      <style>{`
        .hdp-root { font-family: var(--font-inter, sans-serif); font-size: 14px; color: #3D3D3D; }
        .hdp-months { display: flex; gap: 16px; }
        .hdp-month { width: 280px; }
        .hdp-month-caption { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding: 0 4px; }
        .hdp-caption-label { font-family: var(--font-comfortaa, sans-serif); font-weight: 700; font-size: 15px; color: #3D3D3D; letter-spacing: -0.01em; }
        .hdp-nav { display: flex; gap: 4px; }
        .hdp-btn-nav { width: 30px; height: 30px; border-radius: 8px; border: 1px solid rgba(237,104,100,0.18); background: rgba(255,255,255,0.7); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: #ED6864; transition: background 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1); }
        .hdp-btn-nav:hover { background: rgba(237,104,100,0.08); transform: scale(1.08); }
        .hdp-month-grid { width: 100%; border-collapse: collapse; }
        .hdp-weekdays { display: grid; grid-template-columns: repeat(7,1fr); margin-bottom: 4px; }
        .hdp-weekday { text-align: center; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #9A9999; padding: 4px 0; }
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
        .hdp-range-start .hdp-day-btn, .hdp-range-end .hdp-day-btn { background: #ED6864; color: #fff; font-weight: 700; box-shadow: 0 4px 12px rgba(237,104,100,0.35); }
        .hdp-range-start .hdp-day-btn:hover, .hdp-range-end .hdp-day-btn:hover { background: #D4504C; transform: scale(1.08); }
        .hdp-outside .hdp-day-btn { opacity: 0; pointer-events: none; }
        .hdp-disabled .hdp-day-btn { opacity: 0.28; cursor: not-allowed; pointer-events: none; }
        .hdp-hidden { visibility: hidden; }
        @media (prefers-reduced-motion: reduce) {
          .hdp-day-btn, .hdp-btn-nav { transition: none !important; transform: none !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ position: 'relative', display: 'flex', alignItems: 'stretch', flex: '2 2 0' }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {/* Llegada */}
        <button
          type="button"
          className="hero-search-section"
          onClick={() => openFor('checkin')}
          aria-label={
            checkin ? `Llegada: ${formatDisplay(checkin)}` : 'Seleccionar fecha de llegada'
          }
          style={fieldActive('checkin')}
        >
          <span className="hero-search-label" style={labelColor('checkin')}>
            Llegada
          </span>
          <span
            className={checkin ? 'hero-search-value' : 'hero-search-value hero-search-value--muted'}
          >
            {checkin ? formatDisplay(checkin) : 'Agrega fecha'}
          </span>
        </button>

        <div className="hero-search-divider" aria-hidden="true" />

        {/* Salida */}
        <button
          type="button"
          className="hero-search-section"
          onClick={() => openFor('checkout')}
          aria-label={
            checkout ? `Salida: ${formatDisplay(checkout)}` : 'Seleccionar fecha de salida'
          }
          style={fieldActive('checkout')}
        >
          <span className="hero-search-label" style={labelColor('checkout')}>
            Salida
          </span>
          <span
            className={
              checkout ? 'hero-search-value' : 'hero-search-value hero-search-value--muted'
            }
          >
            {checkout ? formatDisplay(checkout) : 'Agrega fecha'}
          </span>
        </button>

        {/* Portal — escapes overflow:hidden of .hero-section */}
        {mounted &&
          createPortal(
            reduced ? (
              open && (
                <div style={{ ...ABOVE_STYLE, top: pos.top, left: pos.left }}>{panelContent}</div>
              )
            ) : (
              <AnimatePresence>
                {open && (
                  <div key="hdp-anchor" style={{ ...ABOVE_STYLE, top: pos.top, left: pos.left }}>
                    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit">
                      {panelContent}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            ),
            document.body,
          )}
      </div>
    </>
  );
}
