import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobbitrips — Descansa, vive y sueña como si estuvieras en casa',
};

export default function HomePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-4xl font-comfortaa font-bold text-brand-charcoal">
        Bienvenido a <span className="text-primary">Mobbitrips</span>
      </h1>
      <p className="text-brand-gray">
        Sprint 1.1 en construcción — secciones del home llegando pronto.
      </p>
    </div>
  );
}
