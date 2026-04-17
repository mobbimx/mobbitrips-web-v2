import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: params.slug,
  };
}

export default function PropertyPage({ params }: PageProps) {
  return (
    <main id="main-content">
      <h1>Propiedad: {params.slug}</h1>
    </main>
  );
}
