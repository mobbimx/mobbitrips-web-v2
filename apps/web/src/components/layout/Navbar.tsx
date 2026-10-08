'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mobbitrips/ui';
import { cn } from '@mobbitrips/ui';
import { t, type ClaveTexto } from '@/textos/t';
import { MobbitripsLogo } from './MobbitripsLogo';

const links: { href: string; texto: ClaveTexto }[] = [
  { href: '/', texto: 'nav.enlaces.inicio' },
  { href: '/propiedades', texto: 'nav.enlaces.propiedades' },
  { href: '/nosotros', texto: 'nav.enlaces.nosotros' },
  { href: '/servicios', texto: 'nav.enlaces.servicios' },
  { href: '/contacto', texto: 'nav.enlaces.contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'h-16 border-b border-white/50 shadow-sm' : 'h-[72px] bg-transparent',
        )}
        style={
          scrolled
            ? {
                background: 'rgba(250,247,242,0.82)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              }
            : undefined
        }
      >
        <nav
          className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label={t('nav.aria')}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
          >
            <MobbitripsLogo size={36} />
            <span className="font-comfortaa text-xl font-bold text-brand-charcoal">
              {t('marca.inicio')}
              <span className="text-primary">{t('marca.fin')}</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {links.map(({ href, texto }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="px-3 py-2 text-sm font-medium text-brand-gray rounded-lg transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                >
                  {t(texto)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Link href="/propiedades" tabIndex={-1}>
              <Button size="sm">{t('nav.reservar')}</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-brand-charcoal transition-colors hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
            onClick={() => setOpen(true)}
            aria-label={t('nav.abrirMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menuMovil')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-brand-border px-6 py-5">
                <div className="flex items-center gap-2.5">
                  <MobbitripsLogo size={32} />
                  <span className="font-comfortaa text-xl font-bold text-brand-charcoal">
                    {t('marca.inicio')}
                    <span className="text-primary">{t('marca.fin')}</span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-brand-gray hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={t('nav.cerrarMenu')}
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {links.map(({ href, texto }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-brand-charcoal transition-colors hover:bg-brand-cream hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {t(texto)}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-brand-border p-6">
                <Link href="/propiedades" onClick={() => setOpen(false)} tabIndex={-1}>
                  <Button className="w-full" size="lg">
                    {t('nav.reservar')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
