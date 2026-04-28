const { useState: useStateC } = React;

// ============================================================
// Property Card — full tile with image, badge, heart, meta
// ============================================================
window.PropertyCard = function PropertyCard({ data }) {
  const [fav, setFav] = useStateC(data.fav || false);
  return (
    <article className="card-property">
      <div className="card-property__media" style={{ background: data.bg }}>
        {data.badge && <span className="prop-badge">{data.badge}</span>}
        <button className={`prop-heart ${fav ? 'prop-heart--on' : ''}`} onClick={(e) => { e.stopPropagation(); setFav(!fav); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z"/>
          </svg>
        </button>
        <div className="prop-gradient-overlay" />
      </div>
      <div className="card-property__body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <h3 className="card-property__title">{data.title}</h3>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-900)', fontWeight: 600, display: 'flex', gap: 4, alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--coral-900)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>
            {data.rating}
          </div>
        </div>
        <p className="card-property__meta">{data.location} · {data.guests}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 12 }}>
          <div className="card-property__price">${data.price} <span>/ noche</span></div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-700)' }}>{data.reviews} reseñas</span>
        </div>
      </div>
    </article>
  );
};

// ============================================================
// Destination Card — larger editorial tile
// ============================================================
window.DestinationCard = function DestinationCard({ name, region, count, bg, script }) {
  return (
    <article className="dest-card" style={{ background: bg }}>
      <div className="dest-card__overlay" />
      <div className="dest-card__body">
        {script && <span className="dest-card__script">{script}</span>}
        <h3 className="dest-card__name">{name}</h3>
        <div className="dest-card__meta">
          <span>{region}</span>
          <span className="dot">·</span>
          <span>{count} propiedades</span>
        </div>
      </div>
    </article>
  );
};

// ============================================================
// Amenity chip with lucide icon
// ============================================================
window.AmenityChip = function AmenityChip({ icon, label }) {
  return (
    <div className="amenity-chip">
      <i data-lucide={icon} />
      <span>{label}</span>
    </div>
  );
};

// ============================================================
// Footer
// ============================================================
window.Footer = function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <div className="footer__brand">
            <img src="../../assets/logo-coral.png" alt="" />
            <span>MobbiTrips</span>
          </div>
          <p className="footer__tag">Casa en todas partes.</p>
          <p className="footer__script">hospedaje humano</p>
        </div>
        <div className="footer__cols">
          <div>
            <div className="footer__label">Marca</div>
            <a>Historia</a><a>Manifiesto</a><a>Prensa</a>
          </div>
          <div>
            <div className="footer__label">Explorar</div>
            <a>Propiedades</a><a>Destinos</a><a>Experiencias</a>
          </div>
          <div>
            <div className="footer__label">Ayuda</div>
            <a>Centro de ayuda</a><a>Contacto</a><a>Anfitriones</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 MobbiTrips · Xalapa → el mundo</span>
        <span>Hecho con calidez</span>
      </div>
    </footer>
  );
};
