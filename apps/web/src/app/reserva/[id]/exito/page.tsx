import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '¡Reserva confirmada!',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { id: string };
}

export default function ExitoPage({ params }: PageProps) {
  return (
    <main id="main-content">
      <h1>¡Reserva confirmada! ID: {params.id}</h1>
    </main>
  );
}
