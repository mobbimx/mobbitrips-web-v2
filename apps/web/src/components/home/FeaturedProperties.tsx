'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface PropertyData {
  title: string;
  location: string;
  guests: string;
  price: string;
  rating: string;
  reviews: number;
  badge?: string;
  bg: string;
  fav?: boolean;
}

const PROPERTIES_DATA: PropertyData[] = [
  {
    title: 'Casa Los Cedros',
    location: 'Xalapa, Veracruz',
    guests: '4 huéspedes',
    price: '1,480',
    rating: '4.96',
    reviews: 128,
    badge: 'Favorito',
    bg: 'linear-gradient(135deg, #F5B0AD 0%, #F08884 60%, #ED6864 100%)',
    fav: true,
  },
  {
    title: 'Estudio Niebla',
    location: 'Coatepec',
    guests: '2 huéspedes',
    price: '960',
    rating: '5.00',
    reviews: 42,
    badge: 'Superanfitrión',
    bg: 'linear-gradient(135deg, #FDE8E6 0%, #F5B0AD 70%)',
  },
  {
    title: 'Casa del Café',
    location: 'Xico, Veracruz',
    guests: '6 huéspedes',
    price: '2,100',
    rating: '4.88',
    reviews: 87,
    bg: 'linear-gradient(135deg, #E8B547 0%, #F08884 100%)',
  },
  {
    title: 'Jardín Interior',
    location: 'Xalapa, Centro',
    guests: '3 huéspedes',
    price: '1,180',
    rating: '4.92',
    reviews: 64,
    badge: 'Nuevo',
    bg: 'linear-gradient(135deg, #8FA68E 0%, #FDE8E6 100%)',
  },
  {
    title: 'Loft Pacho',
    location: 'Xalapa, La Pitaya',
    guests: '2 huéspedes',
    price: '890',
    rating: '4.81',
    reviews: 29,
    bg: 'linear-gradient(135deg, #B5CDD6 0%, #F9CFCC 100%)',
  },
  {
    title: 'Casa Arcos',
    location: 'Naolinco',
    guests: '8 huéspedes',
    price: '2,640',
    rating: '4.97',
    reviews: 112,
    badge: 'Favorito',
    bg: 'linear-gradient(135deg, #F08884 0%, #C14744 100%)',
  },
];

const FILTERS = [
  'Todas',
  'Casas',
  'Estudios',
  'Con alberca',
  'Pet friendly',
  'Centro histórico',
  'Montaña',
];

// 3× los datos: [clones_previos | reales | clones_siguientes]
const N = PROPERTIES_DATA.length;
const EXTENDED_DATA = [...PROPERTIES_DATA, ...PROPERTIES_DATA, ...PROPERTIES_DATA];

function PropertyCard({
  data,
  index,
  revealed,
}: {
  data: PropertyData;
  index: number;
  revealed: boolean;
}) {
  const [fav, setFav] = useState(!!data.fav);

  return (
    <article
      className={`prop-card${revealed ? ' is-revealed' : ''}`}
      style={{ transitionDelay: revealed ? `${index * 120}ms` : '0ms' }}
    >
      <div className="prop-card__media">
        <div className="prop-card__media-bg" style={{ background: data.bg }} />
        {data.badge && <span className="prop-card__badge">{data.badge}</span>}
        <button
          type="button"
          className={`prop-card__heart${fav ? ' prop-card__heart--on' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setFav((v) => !v);
          }}
          aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg
            viewBox="0 0 24 24"
            fill={fav ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </button>
      </div>

      <div className="prop-card__body">
        <div className="prop-card__title-row">
          <h3 className="prop-card__title">{data.title}</h3>
          <span className="prop-card__rating">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
            {data.rating}
          </span>
        </div>
        <p className="prop-card__meta">
          {data.location} · {data.guests}
        </p>
        <div className="prop-card__price-row">
          <span className="prop-card__price">
            ${data.price} <small>/ noche</small>
          </span>
          <span className="prop-card__reviews">{data.reviews} reseñas</span>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProperties() {
  const [active, setActive] = useState('Todas');
  const [activeDot, setActiveDot] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Posicionar en el set del medio sin animación al montar
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    isJumping.current = true;
    requestAnimationFrame(() => {
      const cards = t.querySelectorAll<HTMLElement>('.prop-card');
      const firstReal = cards[N];
      if (firstReal) t.scrollLeft = firstReal.offsetLeft;
      setActiveDot(0);
      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    });
  }, []);

  // Reveal al hacer scroll hasta la sección
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: '-100px 0px -100px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Índice de la tarjeta más cercana al borde izquierdo del track
  const getClosestIndex = useCallback((): number => {
    const t = trackRef.current;
    if (!t) return N;
    const cards = t.querySelectorAll<HTMLElement>('.prop-card');
    let best = N;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - t.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }, []);

  // Tras detener el scroll: actualizar dot y teleportar si estamos en zona clon
  const handleScrollEnd = useCallback(() => {
    const t = trackRef.current;
    if (!t || isJumping.current) return;

    const idx = getClosestIndex();
    setActiveDot(idx % N);

    if (idx < N || idx >= 2 * N) {
      isJumping.current = true;
      const cards = t.querySelectorAll<HTMLElement>('.prop-card');
      // Equivalente en el set del medio: siempre en [N, 2N-1]
      const targetCard = cards[(idx % N) + N];
      if (targetCard) t.scrollLeft = targetCard.offsetLeft;
      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    }
  }, [getClosestIndex]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;

    const onScroll = () => {
      if (isJumping.current) return;
      setActiveDot(getClosestIndex() % N);
      // Timer de fallback para navegadores sin scrollend
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(handleScrollEnd, 150);
    };

    const onScrollEnd = () => {
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      handleScrollEnd();
    };

    const onResize = () => setActiveDot(getClosestIndex() % N);

    t.addEventListener('scroll', onScroll, { passive: true });
    t.addEventListener('scrollend', onScrollEnd);
    window.addEventListener('resize', onResize);

    return () => {
      t.removeEventListener('scroll', onScroll);
      t.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('resize', onResize);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, [handleScrollEnd, getClosestIndex]);

  const scrollByDir = (dir: number) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector<HTMLElement>('.prop-card');
    const step = card ? card.offsetWidth + 32 : t.clientWidth * 0.8;
    t.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const scrollToDot = (dotIndex: number) => {
    const t = trackRef.current;
    if (!t) return;
    const cards = t.querySelectorAll<HTMLElement>('.prop-card');
    // Siempre apunta al set del medio para evitar saltos inesperados
    const target = cards[N + dotIndex];
    if (target) {
      const left = target.offsetLeft - (t.clientWidth - target.offsetWidth) / 2;
      t.scrollTo({ left, behavior: 'smooth' });
    }
  };

  return (
    <section className="properties" id="propiedades" ref={sectionRef}>
      <div className="properties__container">
        <header className="properties__header">
          <div>
            <span className="properties__kicker">Propiedades destacadas</span>
            <h2 className="properties__title">
              Casas con alma, <span className="script-inline">no hoteles</span>
            </h2>
          </div>
          <a href="/propiedades" className="properties__see-all">
            Ver todas →
          </a>
        </header>

        <div className="properties__filters" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`props-chip${active === f ? ' props-chip--active' : ''}`}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          className="properties__carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Propiedades destacadas"
        >
          <button
            type="button"
            className="properties__nav properties__nav--prev"
            onClick={() => scrollByDir(-1)}
            aria-label="Anterior"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="properties__track" ref={trackRef}>
            {EXTENDED_DATA.map((p, i) => (
              <PropertyCard
                key={`${Math.floor(i / N)}-${i % N}`}
                data={p}
                index={i % N}
                revealed={revealed}
              />
            ))}
          </div>

          <button
            type="button"
            className="properties__nav properties__nav--next"
            onClick={() => scrollByDir(1)}
            aria-label="Siguiente"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="properties__dots" role="tablist" aria-label="Ir a propiedad">
          {PROPERTIES_DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`properties__dot${i === activeDot ? ' properties__dot--active' : ''}`}
              onClick={() => scrollToDot(i)}
              aria-label={`Ir a propiedad ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
