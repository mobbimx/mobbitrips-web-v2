import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guías, tips y recomendaciones para disfrutar Xalapa y Veracruz al máximo.',
};

export default function BlogPage() {
  return (
    <main id="main-content">
      <h1>Blog — Mobbitrips</h1>
    </main>
  );
}
