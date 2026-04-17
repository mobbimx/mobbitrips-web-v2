import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4"
    >
      <h1 className="text-6xl font-comfortaa font-bold text-primary">404</h1>
      <p className="text-xl font-comfortaa text-brand-charcoal">
        Esta página no existe o fue movida
      </p>
      <Link
        href="/"
        className="rounded-xl bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
