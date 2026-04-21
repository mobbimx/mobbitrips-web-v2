import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MapPin, Clock, BedDouble, Bath, Users } from 'lucide-react';
import { getPropertyBySlug } from '@mobbitrips/hostex-client';
import { PropertyGallery } from '@/components/properties/PropertyGallery';
import { PropertyAmenities } from '@/components/properties/PropertyAmenities';
import { BookingWidget } from '@/components/properties/BookingWidget';

interface PageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return { title: 'Propiedad no encontrada' };

  return {
    title: `${property.name} — Mobbitrips`,
    description: property.shortDescription,
    openGraph: {
      title: property.name,
      description: property.shortDescription,
      images: property.coverImageUrl ? [{ url: property.coverImageUrl }] : [],
    },
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  const images = property.coverImageUrl ? [property.coverImageUrl] : [];

  return (
    <main id="main-content" className="bg-brand-cream min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-1.5 text-sm">
          <Link
            href="/"
            className="text-brand-gray hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Inicio
          </Link>
          <ChevronRight size={14} className="text-brand-light" aria-hidden="true" />
          <Link
            href="/propiedades"
            className="text-brand-gray hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Propiedades
          </Link>
          <ChevronRight size={14} className="text-brand-light" aria-hidden="true" />
          <span className="text-brand-charcoal font-medium" aria-current="page">
            {property.name}
          </span>
        </nav>

        {/* Title */}
        <h1 className="mb-2 font-comfortaa text-2xl font-bold text-brand-charcoal sm:text-3xl">
          {property.name}
        </h1>
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-brand-gray">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" />
            {property.location}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={14} aria-hidden="true" />
            {property.bedrooms} habitacione{property.bedrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={14} aria-hidden="true" />
            {property.bathrooms} baño{property.bathrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} aria-hidden="true" />
            Hasta {property.maxGuests} huéspedes
          </span>
        </div>

        {/* Gallery */}
        <PropertyGallery images={images} propertyName={property.name} />

        {/* Content + Widget */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Left column */}
          <div className="flex-1 space-y-8">
            {/* Description */}
            <section aria-labelledby="desc-heading">
              <h2
                id="desc-heading"
                className="mb-3 font-comfortaa text-xl font-semibold text-brand-charcoal"
              >
                Sobre esta propiedad
              </h2>
              <p className="leading-relaxed text-brand-gray">{property.description}</p>
            </section>

            {/* Amenities */}
            <PropertyAmenities amenities={property.amenities} />

            {/* Check-in info */}
            <section aria-labelledby="checkin-heading">
              <h2
                id="checkin-heading"
                className="mb-3 font-comfortaa text-xl font-semibold text-brand-charcoal"
              >
                Información de llegada
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-brand-border bg-white p-4 text-center">
                  <Clock size={20} className="mx-auto mb-2 text-primary" aria-hidden="true" />
                  <p className="text-xs text-brand-gray">Check-in</p>
                  <p className="mt-0.5 font-semibold text-brand-charcoal">{property.checkinTime}</p>
                </div>
                <div className="rounded-xl border border-brand-border bg-white p-4 text-center">
                  <Clock size={20} className="mx-auto mb-2 text-primary" aria-hidden="true" />
                  <p className="text-xs text-brand-gray">Check-out</p>
                  <p className="mt-0.5 font-semibold text-brand-charcoal">
                    {property.checkoutTime}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right column — Booking Widget */}
          <aside aria-label="Widget de reserva" className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <BookingWidget
                propertyId={property.id}
                propertySlug={property.slug}
                maxGuests={property.maxGuests}
                pricePerNight={property.pricePerNight}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
