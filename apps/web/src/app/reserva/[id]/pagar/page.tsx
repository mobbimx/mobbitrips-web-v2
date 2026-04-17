import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pagar reserva',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { id: string };
}

export default function PagarPage({ params }: PageProps) {
  return (
    <main id="main-content">
      <h1>Pagar reserva: {params.id}</h1>
    </main>
  );
}
