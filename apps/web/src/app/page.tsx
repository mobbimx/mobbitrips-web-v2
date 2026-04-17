import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobbitrips — Descansa, vive y sueña como si estuvieras en casa',
};

export default function HomePage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-comfortaa text-brand-charcoal">Inicio — Mobbitrips</h1>
      <p className="mt-4 text-brand-gray">Sprint 1.0 — Setup completo ✓</p>
    </main>
  );
}
