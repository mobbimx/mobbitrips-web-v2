'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mobbitrips/ui';
import { cn } from '@mobbitrips/ui';
import { MobbitripsLogo } from './MobbitripsLogo';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastYRef = useRef(0);
  const accDownRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const delta = y - lastYRef.current;
      if (y < 80) {
        setHidden(false);
        accDownRef.current = 0;
      } else if (delta > 0) {
        accDownRef.current += delta;
        if (accDownRef.current > 80) setHidden(true);
      } else if (delta < 0) {
        setHidden(false);
        accDownRef.current = 0;
      }
      lastYRef.current = y;
    };
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
          'fixed top-0 left-0 right-0 z-40 transition-all duration-[400ms]',
          scrolled
            ? 'h-16 border-b border-white/50 shadow-sm'
            : 'h-[72px] bg-transparent',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
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
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
          >
            <MobbitripsLogo size={36} />
            <span className="font-comfortaa text-xl font-bold text-brand-charcoal">
              mobbi<span className="text-primary">trips</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="px-3 py-2 text-sm font-medium text-brand-gray transition-colors hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:rounded-lg"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Link href="/propiedades" tabIndex={-1}>
              <Button size="sm">Reservar ahora</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-brand-charcoal transition-colors hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
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
              aria-label="Menú de navegación"
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
                    mobbi<span className="text-primary">trips</span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-brand-gray hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-brand-charcoal transition-colors hover:bg-brand-cream hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-brand-border p-6">
                <Link href="/propiedades" onClick={() => setOpen(false)} tabIndex={-1}>
                  <Button className="w-full" size="lg">
                    Reservar ahora
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
