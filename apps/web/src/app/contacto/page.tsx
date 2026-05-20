import type { Metadata } from 'next';
import { ContactoHero } from '@/components/contacto/ContactoHero';
import { ContactoContent } from './ContactoContent';

export const metadata: Metadata = {
  title: 'Contacto — Mobbitrips',
  description:
    'Contáctanos para reservas, dudas o información sobre nuestras propiedades. Te respondemos rápido.',
  openGraph: {
    title: 'Contáctanos — Mobbitrips',
    description:
      'Escríbenos por WhatsApp o correo. Te respondemos en menos de 2 horas en horario normal.',
    url: '/contacto',
  },
};

export default function ContactoPage() {
  return (
    <>
      <ContactoHero />
      <ContactoContent />
    </>
  );
}
