const { useState: useStateS } = React;

// ============================================================
// Properties section — grid of PropertyCards with filter chips
// ============================================================
window.PropertiesSection = function PropertiesSection() {
  const [active, setActive] = useStateS('Todas');
  const filters = ['Todas', 'Casas', 'Estudios', 'Con alberca', 'Pet friendly', 'Centro histórico', 'Montaña'];

  const properties = [
    { title: 'Casa Los Cedros', location: 'Xalapa, Veracruz', guests: '4 huéspedes', price: '1,480', rating: '4.96', reviews: 128, badge: 'Favorito', bg: 'linear-gradient(135deg, #F5B0AD 0%, #F08884 60%, #ED6864 100%)', fav: true },
    { title: 'Estudio Niebla', location: 'Coatepec', guests: '2 huéspedes', price: '960', rating: '5.00', reviews: 42, badge: 'Superanfitrión', bg: 'linear-gradient(135deg, #FDE8E6 0%, #F5B0AD 70%)' },
    { title: 'Casa del Café', location: 'Xico, Veracruz', guests: '6 huéspedes', price: '2,100', rating: '4.88', reviews: 87, bg: 'linear-gradient(135deg, #E8B547 0%, #F08884 100%)' },
    { title: 'Jardín Interior', location: 'Xalapa, Centro', guests: '3 huéspedes', price: '1,180', rating: '4.92', reviews: 64, badge: 'Nuevo', bg: 'linear-gradient(135deg, #8FA68E 0%, #FDE8E6 100%)' },
    { title: 'Loft Pacho', location: 'Xalapa, La Pitaya', guests: '2 huéspedes', price: '890', rating: '4.81', reviews: 29, bg: 'linear-gradient(135deg, #B5CDD6 0%, #F9CFCC 100%)' },
    { title: 'Casa Arcos', location: 'Naolinco', guests: '8 huéspedes', price: '2,640', rating: '4.97', reviews: 112, badge: 'Favorito', bg: 'linear-gradient(135deg, #F08884 0%, #C14744 100%)' },
  ];

  return (
    <section className="section section--properties">
      <div className="container">
        <header className="section__header">
          <div>
            <span className="section__kicker">Propiedades destacadas</span>
            <h2 className="section__title">Casas con alma, <span className="script-inline">no hoteles</span></h2>
          </div>
          <a className="section__link">Ver todas →</a>
        </header>

        <div className="filter-row">
          {filters.map(f => (
            <button key={f} className={`filter-chip ${active === f ? 'filter-chip--active' : ''}`} onClick={() => setActive(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid-properties">
          {properties.map((p, i) => <window.PropertyCard key={i} data={p} />)}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Destinations — editorial tiles
// ============================================================
window.DestinationsSection = function DestinationsSection() {
  const destinations = [
    { name: 'Xalapa', region: 'Veracruz, México', count: 42, script: 'niebla y café', bg: 'linear-gradient(160deg, #F9CFCC 0%, #F08884 100%)' },
    { name: 'Coatepec', region: 'Pueblo Mágico', count: 18, bg: 'linear-gradient(160deg, #8FA68E 0%, #F5B0AD 100%)' },
    { name: 'Xico', region: 'Veracruz', count: 12, bg: 'linear-gradient(160deg, #E8B547 0%, #ED6864 100%)' },
    { name: 'Próximamente', region: 'CDMX · Oaxaca · Mérida', count: 0, script: 'en camino', bg: 'linear-gradient(160deg, #B5CDD6 0%, #2D2D2D 100%)' },
  ];

  return (
    <section className="section section--destinations">
      <div className="container">
        <header className="section__header">
          <div>
            <span className="section__kicker">Destinos</span>
            <h2 className="section__title">Empezamos en Xalapa. <br/>Vamos por el mundo.</h2>
          </div>
        </header>
        <div className="grid-destinations">
          {destinations.map((d, i) => <window.DestinationCard key={i} {...d} />)}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Manifesto / Editorial section
// ============================================================
window.ManifestoSection = function ManifestoSection() {
  return (
    <section className="section section--manifesto">
      <div className="manifesto__bg">
        <div className="manifesto__blob" />
      </div>
      <div className="container manifesto__content">
        <span className="section__kicker">Filosofía</span>
        <h2 className="manifesto__title">
          No competimos siendo más grandes.<br />
          Competimos siendo <span className="script-inline script-inline--lg">más humanos.</span>
        </h2>
        <div className="manifesto__grid">
          <div className="manifesto__pillar">
            <i data-lucide="home" className="manifesto__icon" />
            <h4>Casa, no hotel</h4>
            <p>Cada propiedad se curó para sentirse como hogar desde el primer minuto. Cero recepción fría.</p>
          </div>
          <div className="manifesto__pillar">
            <i data-lucide="heart" className="manifesto__icon" />
            <h4>Promesa emocional</h4>
            <p>No vendemos noches, ofrecemos descanso. No rentamos espacios, abrimos casas.</p>
          </div>
          <div className="manifesto__pillar">
            <i data-lucide="globe" className="manifesto__icon" />
            <h4>Globales de raíz</h4>
            <p>Xalapa es donde empezamos. La marca está diseñada para cualquier ciudad del mundo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// CTA band — sunset gradient with script accent
// ============================================================
window.CTABand = function CTABand() {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">Tu casa, <span className="script-inline">en todas partes.</span></h2>
          <p className="cta-band__lede">Reserva tu primera estadía con MobbiTrips y recibe un detalle de bienvenida.</p>
        </div>
        <div className="cta-band__actions">
          <button className="btn btn-primary btn-lg">Empieza tu estadía</button>
          <button className="btn btn-glass btn-lg">Ver propiedades</button>
        </div>
      </div>
    </section>
  );
};
