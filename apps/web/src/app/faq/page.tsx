import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description: 'Respuestas a las preguntas más comunes sobre reservas y estancias en Mobbitrips.',
};

export default function FaqPage() {
  return (
    <main id="main-content">
      <h1>Preguntas frecuentes — Mobbitrips</h1>
    </main>
  );
}
