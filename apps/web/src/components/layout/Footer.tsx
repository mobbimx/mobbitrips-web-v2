import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { t, type ClaveTexto } from '@/textos/t';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';

type Enlace = { href: string; texto: ClaveTexto };

const navLinks: Enlace[] = [
  { href: '/', texto: 'footer.navegacion.inicio' },
  { href: '/propiedades', texto: 'footer.navegacion.propiedades' },
  { href: '/nosotros', texto: 'footer.navegacion.nosotros' },
  { href: '/blog', texto: 'footer.navegacion.blog' },
  { href: '/experiencias', texto: 'footer.navegacion.experiencias' },
];

const serviceLinks: Enlace[] = [
  { href: '/servicios', texto: 'footer.servicios.propietarios' },
  { href: '/contacto', texto: 'footer.servicios.contacto' },
  { href: '/faq', texto: 'footer.servicios.faq' },
];

const legalLinks: Enlace[] = [
  { href: '/(legal)/privacidad', texto: 'footer.legal.privacidad' },
  { href: '/(legal)/terminos', texto: 'footer.legal.terminos' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ background: '#181818' }} aria-label={t('footer.aria')}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1 — Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-charcoal"
            >
              <span className="font-comfortaa text-2xl font-bold">
                {t('marca.inicio')}
                <span className="text-primary">{t('marca.fin')}</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-light">{t('footer.lema')}</p>
            <p className="text-xs text-brand-light">{t('footer.alcance')}</p>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-light">
              {t('footer.navegacion.titulo')}
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map(({ href, texto }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                  >
                    {t(texto)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Servicios */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-light">
              {t('footer.servicios.titulo')}
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {serviceLinks.map(({ href, texto }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                  >
                    {t(texto)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto + RRSS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-light">
              {t('footer.contacto.titulo')}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                  aria-label={t('footer.contacto.whatsappAria')}
                >
                  <Phone size={14} aria-hidden="true" />
                  {t('footer.contacto.telefono')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('footer.contacto.correo')}`}
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:underline"
                >
                  <Mail size={14} aria-hidden="true" />
                  {t('footer.contacto.correo')}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                {t('footer.contacto.ubicacion')}
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com/mobbitrips"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t('footer.contacto.instagramAria')}
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com/mobbitrips"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t('footer.contacto.facebookAria')}
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-brand-light">{t('footer.derechos', { year })}</p>
          <ul className="flex gap-4" role="list">
            {legalLinks.map(({ href, texto }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-xs text-brand-light transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  {t(texto)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
