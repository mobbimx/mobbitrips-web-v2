import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/experiencias', label: 'Experiencias en Xalapa' },
];

const serviceLinks = [
  { href: '/servicios', label: 'Para propietarios' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/faq', label: 'Preguntas frecuentes' },
];

const legalLinks = [
  { href: '/(legal)/privacidad', label: 'Privacidad' },
  { href: '/(legal)/terminos', label: 'Términos' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ background: '#181818' }} aria-label="Pie de página">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1 — Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-charcoal"
            >
              <span className="font-comfortaa text-2xl font-bold">
                mobbi<span className="text-primary">trips</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-light">
              Descansa, vive y sueña como si estuvieras en casa.
            </p>
            <p className="text-xs text-brand-light">
              Propiedades vacacionales en Xalapa, Veracruz.
            </p>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-light">
              Navegación
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Servicios */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-light">
              Servicios
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto + RRSS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-light">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                  aria-label="WhatsApp de Mobbitrips"
                >
                  <Phone size={14} aria-hidden="true" />
                  +52 228 252 5244
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@mobbitrips.com"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                >
                  <Mail size={14} aria-hidden="true" />
                  hola@mobbitrips.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                Xalapa, Veracruz, México
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com/mobbitrips"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Instagram de Mobbitrips"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com/mobbitrips"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Facebook de Mobbitrips"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-brand-light">
            © {year} Mobbitrips. Todos los derechos reservados.
          </p>
          <ul className="flex gap-4" role="list">
            {legalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-xs text-brand-light transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
