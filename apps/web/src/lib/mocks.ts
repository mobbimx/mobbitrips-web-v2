export interface MockProperty {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  gradient: string;
}

export const MOCK_PROPERTIES: MockProperty[] = [
  {
    id: 'prop-001',
    slug: 'casa-el-cafe',
    name: 'Casa El Café',
    shortDescription: 'Acogedora casa en zona cafetalera con jardín privado y vistas al cerro.',
    location: 'Colonia Lomas del Valle, Xalapa',
    pricePerNight: 1_450,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.9,
    reviewCount: 38,
    amenities: ['WiFi', 'Cocina completa', 'Jardín', 'Estacionamiento'],
    gradient: 'from-[#8B6914] via-[#C4922A] to-[#E8B86D]',
  },
  {
    id: 'prop-002',
    slug: 'villa-los-tecajetes',
    name: 'Villa Los Tecajetes',
    shortDescription: 'Villa moderna a pasos del Parque Los Tecajetes, ideal para familias.',
    location: 'Zona Tecnológica, Xalapa',
    pricePerNight: 2_200,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.8,
    reviewCount: 24,
    amenities: ['WiFi', 'Alberca', 'Cocina', 'Terraza', 'BBQ'],
    gradient: 'from-[#1A6B4A] via-[#2E9E6E] to-[#7ECBA8]',
  },
  {
    id: 'prop-003',
    slug: 'casa-colonial-centro',
    name: 'Casa Colonial Centro',
    shortDescription: 'Casa colonial restaurada en el corazón histórico, a minutos de todo.',
    location: 'Centro Histórico, Xalapa',
    pricePerNight: 1_800,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    rating: 5.0,
    reviewCount: 17,
    amenities: ['WiFi', 'Cocina gourmet', 'Sala con chimenea', 'Patio'],
    gradient: 'from-[#6B3A1A] via-[#C47A3E] to-[#E8B87A]',
  },
];

export interface MockTestimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
}

export const MOCK_TESTIMONIALS: MockTestimonial[] = [
  {
    id: 'test-001',
    name: 'Mariana G.',
    location: 'CDMX',
    rating: 5,
    text: 'Increíble experiencia. La casa estaba impecable y la atención fue personalísima. Ya quiero volver con toda la familia. Sin duda reservar directo vale la pena.',
    initials: 'MG',
    color: 'bg-primary',
  },
  {
    id: 'test-002',
    name: 'Rodrigo V.',
    location: 'Monterrey',
    rating: 5,
    text: 'Xalapa es una ciudad mágica y hospedarse en Casa El Café lo hace aún mejor. El jardín privado, el clima fresco... todo perfecto. El equipo de Mobbitrips respondió al instante.',
    initials: 'RV',
    color: 'bg-status-success',
  },
  {
    id: 'test-003',
    name: 'Sofía y Luis',
    location: 'Puebla',
    rating: 5,
    text: 'Fue nuestra escapada de aniversario y superó todas las expectativas. Nos dejaron una bienvenida especial y el proceso de reserva fue muy sencillo y seguro.',
    initials: 'SL',
    color: 'bg-status-info',
  },
];
