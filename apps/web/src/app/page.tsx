import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { WhyBookDirect } from '@/components/home/WhyBookDirect';
import { StorySection } from '@/components/home/StorySection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { OwnerTeaser } from '@/components/home/OwnerTeaser';
import { NewsletterCTA } from '@/components/home/NewsletterCTA';
import { FinalCTA } from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Mobbitrips — Descansa, vive y sueña como si estuvieras en casa',
  description:
    'Propiedades vacacionales en Xalapa, Veracruz. Reserva directo, sin intermediarios y al mejor precio.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <WhyBookDirect />
      <StorySection />
      <TestimonialsSection />
      <OwnerTeaser />
      <NewsletterCTA />
      <FinalCTA />
    </>
  );
}
