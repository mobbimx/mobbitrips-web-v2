'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

function getMinDate() {
  return new Date().toISOString().split('T')[0] ?? '';
}

function getDefaultCheckout(checkin: string) {
  if (!checkin) return '';
  const d = new Date(checkin);
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0] ?? '';
}

const stagger = 80;
const line1 = ['Descansa,', 'vive', 'y', 'sueña'];
const line2 = ['como', 'si', 'estuvieras'];
const line1Start = 200;
const line2Start = line1Start + line1.length * stagger + 120;
const scriptDelay = line2Start + line2.length * stagger + 300;

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(1, Math.max(0, y / vh));
        const isMobile = window.innerWidth < 768;
        if (shapesRef.current) {
          shapesRef.current.style.transform = `translate3d(0, ${-y * (isMobile ? 0.075 : 0.15)}px, 0)`;
        }
        if (contentRef.current) {
          contentRef.current.style.filter = `blur(${progress * 10}px)`;
          contentRef.current.style.opacity = String(1 - progress * 0.7);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams({ guests: String(guests) });
      if (checkin) params.set('from', checkin);
      if (checkout) params.set('to', checkout);
      router.push(`/propiedades?${params.toString()}`);
    },
    [checkin, checkout, guests, router],
  );

  const today = getMinDate();

  return (
    <section className="hero-section" aria-label="Bienvenida">
      <div className="hero-gradient" aria-hidden="true" />

      <div className="hero-shapes" ref={shapesRef} aria-hidden="true">
        <div className="hero-shape hero-shape-arc1">
          <svg viewBox="0 0 600 800" preserveAspectRatio="none">
            <path
              d="M 100 780 Q 100 200 380 200 Q 560 200 560 420 Q 560 780 560 780"
              fill="none"
              stroke="#F9CFCC"
              strokeWidth="180"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>
        <div className="hero-shape hero-shape-circle1" />
        <div className="hero-shape hero-shape-arc2">
          <svg viewBox="0 0 350 450" preserveAspectRatio="none">
            <path
              d="M 60 440 Q 60 80 190 80 Q 310 80 310 240 Q 310 440 310 440"
              fill="none"
              stroke="#E8B547"
              strokeWidth="120"
              strokeLinecap="round"
              opacity="0.15"
            />
          </svg>
        </div>
        <div className="hero-shape hero-shape-glass" />
      </div>

      <div className="hero-content" ref={contentRef}>
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          Casa en todas partes · Hospedaje humano
        </span>

        <h1 className="hero-headline">
          <span className="hero-hl-line">
            <span className="hero-hl-words">
              {line1.map((word, i) => (
                <span
                  key={word}
                  className="hero-hl-word"
                  style={{ animationDelay: `${line1Start + i * stagger}ms` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
          <span className="hero-hl-line">
            <span className="hero-hl-words">
              {line2.map((word, i) => (
                <span
                  key={word}
                  className="hero-hl-word"
                  style={{ animationDelay: `${line2Start + i * stagger}ms` }}
                >
                  {word}
                </span>
              ))}
            </span>{' '}
            <span className="hero-hl-script-wrap">
              <span className="hero-hl-script" style={{ animationDelay: `${scriptDelay}ms` }}>
                en casa
                <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 4 6 Q 50 2 100 5 T 196 4" strokeWidth="2.2" />
                </svg>
              </span>
            </span>
          </span>
        </h1>

        <p className="hero-lede">
          Propiedades únicas en México. Curadas para sentirse como hogar, no como hotel.
        </p>

        <form className="hero-search" onSubmit={handleSearch} aria-label="Buscar hospedajes">
          {/* Destino */}
          <div className="hero-search-section">
            <span className="hero-search-label">¿A dónde?</span>
            <span className="hero-search-value">México</span>
          </div>
          <div className="hero-search-divider" aria-hidden="true" />

          {/* Llegada */}
          <div className="hero-search-section">
            <label htmlFor="hero-checkin" className="hero-search-label">
              Llegada
            </label>
            <input
              id="hero-checkin"
              type="date"
              value={checkin}
              min={today}
              onChange={(e) => {
                setCheckin(e.target.value);
                if (!checkout || checkout <= e.target.value) {
                  setCheckout(getDefaultCheckout(e.target.value));
                }
              }}
              className="hero-search-date"
              aria-label="Fecha de llegada"
              placeholder="Agrega fecha"
            />
          </div>
          <div className="hero-search-divider" aria-hidden="true" />

          {/* Salida */}
          <div className="hero-search-section">
            <label htmlFor="hero-checkout" className="hero-search-label">
              Salida
            </label>
            <input
              id="hero-checkout"
              type="date"
              value={checkout}
              min={checkin || today}
              onChange={(e) => setCheckout(e.target.value)}
              className="hero-search-date"
              aria-label="Fecha de salida"
              placeholder="Agrega fecha"
            />
          </div>
          <div className="hero-search-divider" aria-hidden="true" />

          {/* Huéspedes */}
          <div
            className="hero-search-section"
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              <span className="hero-search-label">Huéspedes</span>
              <span className="hero-search-value">
                {guests} {guests === 1 ? 'persona' : 'personas'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                aria-label="Reducir huéspedes"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: '1px solid rgba(45,45,45,0.2)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 16,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#706F6F',
                }}
              >
                −
              </button>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(16, g + 1))}
                aria-label="Aumentar huéspedes"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: '1px solid rgba(45,45,45,0.2)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 16,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#706F6F',
                }}
              >
                +
              </button>
            </div>
          </div>

          <button type="submit" className="hero-search-btn" aria-label="Buscar propiedades">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Buscar</span>
          </button>
        </form>

        <div className="hero-ctas">
          <Link
            href="/propiedades"
            className="hero-cta hero-cta-primary"
            style={{ animationDelay: '2400ms' }}
          >
            <span>Ver propiedades</span>
          </Link>
          <Link
            href="/nosotros"
            className="hero-cta hero-cta-secondary"
            style={{ animationDelay: '2500ms' }}
          >
            <span>Conoce más</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <a href="#featured-properties" className="hero-scroll" aria-label="Descubre más">
        <span className="hero-scroll-label">Descubre más</span>
        <span className="hero-scroll-ind" aria-hidden="true" />
      </a>
    </section>
  );
}
