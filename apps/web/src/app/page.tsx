import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';

export const metadata: Metadata = {
  title: 'Mobbitrips — Descansa, vive y sueña como si estuvieras en casa',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}
