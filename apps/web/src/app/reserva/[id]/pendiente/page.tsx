import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pago pendiente',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { id: string };
}

export default function PendientePage({ params }: PageProps) {
  return (
    <main id="main-content">
      <h1>Pago pendiente — reserva: {params.id}</h1>
    </main>
  );
}
