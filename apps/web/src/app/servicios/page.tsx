import type { Metadata } from 'next';
import { ServiciosHero } from '@/components/servicios/ServiciosHero';
import { ServiciosBenefits } from '@/components/servicios/ServiciosBenefits';
import { ServicioProceso } from '@/components/servicios/ServicioProceso';
import { ServiciosCTA } from '@/components/servicios/ServiciosCTA';

export const metadata: Metadata = {
  title: 'Para propietarios — Mobbitrips',
  description:
    'Convierte tu propiedad en una fuente de ingresos sin complicaciones. Mobbitrips gestiona todo.',
  openGraph: {
    title: 'Tu propiedad trabaja. Tú descansas. — Mobbitrips',
    description:
      'Gestionamos tu propiedad vacacional de principio a fin: fotografía, limpieza, huéspedes y depósito mensual.',
    url: '/servicios',
  },
};

export default function ServiciosPage() {
  return (
    <>
      <ServiciosHero />
      <ServiciosBenefits />
      <ServicioProceso />
      <ServiciosCTA />
    </>
  );
}
