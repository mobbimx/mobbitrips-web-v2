'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ManchasLigeras } from '@/components/ambient/ManchasLigeras';
import { t } from '@/textos/t';
import { HeroDatePicker } from './HeroDatePicker';

function getDefaultCheckout(checkin: string) {
  if (!checkin) return '';
  const d = new Date(checkin);
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0] ?? '';
}

const stagger = 50;
const line1Start = 100;

export function HeroSection() {
  const line1 = t('hero.titulo.linea1').split(' ');
  const line2 = t('hero.titulo.linea2').split(' ');
  const line2Start = line1Start + line1.length * stagger + 80;
  const scriptDelay = line2Start + line2.length * stagger + 200;
  const contentRef = useRef<HTMLDivElement>(null);
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
        if (window.innerWidth < 768) {
          const start = vh * 0.65;
          const range = vh * 0.35;
          const progress = Math.min(1, Math.max(0, (y - start) / range));
          if (contentRef.current) {
            contentRef.current.style.filter = progress > 0 ? `blur(${progress * 8}px)` : '';
            contentRef.current.style.opacity = progress > 0 ? String(1 - progress * 0.7) : '';
          }
          return;
        }
        const progress = Math.min(1, Math.max(0, y / vh));
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

  return (
    <section className="hero-section" aria-label={t('hero.aria')}>
      <ManchasLigeras />
      <div className="hero-gradient" aria-hidden="true" />

      <div className="hero-content" ref={contentRef}>
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          {t('hero.etiqueta')}
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
                {t('hero.titulo.destacado')}
                <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 4 6 Q 50 2 100 5 T 196 4" strokeWidth="2.2" />
                </svg>
              </span>
            </span>
          </span>
        </h1>

        <p className="hero-lede">{t('hero.subtitulo')}</p>

        <form className="hero-search" onSubmit={handleSearch} aria-label={t('hero.buscador.aria')}>
          {/* Destino */}
          <div className="hero-search-section">
            <span className="hero-search-label">{t('hero.buscador.destinoEtiqueta')}</span>
            <span className="hero-search-value">{t('hero.buscador.destinoValor')}</span>
          </div>
          <div className="hero-search-divider" aria-hidden="true" />

          {/* Llegada + Salida — custom date picker */}
          <HeroDatePicker
            checkin={checkin}
            checkout={checkout}
            onCheckinChange={(val) => {
              setCheckin(val);
              if (!checkout || checkout <= val) {
                setCheckout(getDefaultCheckout(val));
              }
            }}
            onCheckoutChange={setCheckout}
          />
          <div className="hero-search-divider" aria-hidden="true" />

          {/* Huéspedes */}
          <div
            className="hero-search-section"
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              <span className="hero-search-label">{t('hero.buscador.huespedesEtiqueta')}</span>
              <span className="hero-search-value">
                {guests === 1
                  ? t('hero.buscador.unaPersona', { n: guests })
                  : t('hero.buscador.variasPersonas', { n: guests })}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                aria-label={t('hero.buscador.reducirHuespedes')}
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
                aria-label={t('hero.buscador.aumentarHuespedes')}
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

          <button
            type="submit"
            className="hero-search-btn"
            aria-label={t('hero.buscador.botonAria')}
          >
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
            <span>{t('hero.buscador.boton')}</span>
          </button>
        </form>

        <div className="hero-ctas">
          <Link
            href="/propiedades"
            className="hero-cta hero-cta-primary"
            style={{ animationDelay: '1300ms' }}
          >
            <span>{t('hero.cta.verPropiedades')}</span>
          </Link>
          <Link
            href="/nosotros"
            className="hero-cta hero-cta-secondary"
            style={{ animationDelay: '1400ms' }}
          >
            <span>{t('hero.cta.conocerMas')}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <a href="#featured-properties" className="hero-scroll" aria-label={t('hero.descubreMas')}>
        <span className="hero-scroll-label">{t('hero.descubreMas')}</span>
        <span className="hero-scroll-ind" aria-hidden="true" />
      </a>
    </section>
  );
}
