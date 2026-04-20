import type { Metadata } from 'next';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { ContactoForm } from './ContactoForm';

export const metadata: Metadata = {
  title: 'Contacto — Mobbitrips',
  description:
    'Contáctanos para reservas, dudas o información sobre nuestras propiedades en Xalapa.',
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';

export default function ContactoPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-cream py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h1 className="font-comfortaa text-4xl font-bold text-brand-charcoal">Contáctanos</h1>
          <p className="mt-3 text-brand-gray">
            Estamos aquí para ayudarte. Escríbenos y te respondemos pronto.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-comfortaa text-lg font-semibold text-brand-charcoal">
                Canales de contacto
              </h2>
              <div className="space-y-4">
                <a
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 px-4 py-3 transition hover:bg-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  aria-label="WhatsApp de Mobbitrips"
                >
                  <MessageCircle size={20} className="text-[#25D366]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-brand-charcoal">WhatsApp</p>
                    <p className="text-xs text-brand-gray">+52 228 252 5244</p>
                  </div>
                </a>
                <a
                  href="mailto:hola@mobbitrips.com"
                  className="flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3 transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Email de Mobbitrips"
                >
                  <Mail size={20} className="text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-brand-charcoal">Correo</p>
                    <p className="text-xs text-brand-gray">hola@mobbitrips.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-xl bg-brand-cream px-4 py-3">
                  <Phone size={20} className="text-brand-gray" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-brand-charcoal">Ubicación</p>
                    <p className="text-xs text-brand-gray">Xalapa, Veracruz, México</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-comfortaa text-lg font-semibold text-brand-charcoal">
              Envíanos un mensaje
            </h2>
            <ContactoForm />
          </div>
        </div>
      </div>
    </main>
  );
}
