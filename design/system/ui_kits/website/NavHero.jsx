const { useState: useStateNH, useEffect: useEffectNH } = React;

// ============================================================
// Navbar — transparent at top, glass on scroll
// ============================================================
window.Navbar = function Navbar() {
  const [scrolled, setScrolled] = useStateNH(false);
  useEffectNH(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a className="navbar__brand" href="#">
        <img src="../../assets/logo-coral.png" alt="MobbiTrips" />
        <span className="navbar__wordmark">MobbiTrips</span>
      </a>
      <div className="navbar__links">
        <a href="#">Propiedades</a>
        <a href="#">Destinos</a>
        <a href="#">Experiencias</a>
        <a href="#">Anfitriones</a>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a href="#" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15, color: 'var(--gray-900)', textDecoration: 'none' }}>Entrar</a>
        <button className="btn btn-primary btn-sm">Reserva</button>
      </div>
    </nav>
  );
};

// ============================================================
// Hero — full bleed sunset gradient + glass search
// ============================================================
window.Hero = function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__arc" />
      </div>
      <div className="hero__content">
        <span className="hero__kicker">Casa en todas partes · Hospedaje humano</span>
        <h1 className="hero__title">
          Descansa, vive y sueña
          <span className="hero__title-line2">
            <span className="hero__title-script">como si estuvieras en casa</span>
          </span>
        </h1>
        <p className="hero__lede">
          Propiedades únicas alrededor del mundo. Curadas para sentirse como hogar, no como hotel.
        </p>
        <div className="hero__search">
          <div className="hero__search-field">
            <span className="hero__search-label">¿A dónde?</span>
            <input placeholder="Xalapa, Coatepec, cualquier lugar…" defaultValue="Xalapa, México" />
          </div>
          <div className="hero__search-div" />
          <div className="hero__search-field">
            <span className="hero__search-label">Llegada</span>
            <input placeholder="Cuándo" defaultValue="24 abr" />
          </div>
          <div className="hero__search-div" />
          <div className="hero__search-field">
            <span className="hero__search-label">Huéspedes</span>
            <input placeholder="¿Cuántos?" defaultValue="2 personas" />
          </div>
          <button className="btn btn-primary hero__search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
};
