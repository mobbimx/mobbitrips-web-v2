import type { Metadata } from 'next';
import { NosotrosHero } from '@/components/nosotros/NosotrosHero';
import { NosotrosStory } from '@/components/nosotros/NosotrosStory';
import { NosotrosStats } from '@/components/nosotros/NosotrosStats';
import { NosotrosValues } from '@/components/nosotros/NosotrosValues';
import { NosotrosCTA } from '@/components/nosotros/NosotrosCTA';

export const metadata: Metadata = {
  title: 'Nosotros — Mobbitrips',
  description:
    'Conoce la historia y el equipo detrás de Mobbitrips. Hacemos que cada viaje se sienta como en casa.',
  openGraph: {
    title: 'Nosotros — Mobbitrips',
    description:
      'Conoce la historia y el equipo detrás de Mobbitrips. Hacemos que cada viaje se sienta como en casa.',
    url: '/nosotros',
  },
};

export default function NosotrosPage() {
  return (
    <>
      <NosotrosHero />
      <NosotrosStory />
      <NosotrosStats />
      <NosotrosValues />
      <NosotrosCTA />
    </>
  );
}
