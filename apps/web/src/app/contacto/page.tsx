import type { Metadata } from 'next';
import { MessageCircle, Mail, Clock } from 'lucide-react';
import { AnimatedSection } from '@mobbitrips/ui';
import { ContactoForm } from './ContactoForm';

export const metadata: Metadata = {
  title: 'Contacto — Mobbitrips',
  description:
    'Contáctanos para reservas, dudas o información sobre nuestras propiedades. Te respondemos rápido.',
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';

export default function ContactoPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ background: '#1C1C1C' }} className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contacto</p>
            </div>
            <h1
              className="font-comfortaa font-bold text-white"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Estamos aquí
              <br />
              <em className="not-italic text-primary">para ayudarte.</em>
            </h1>
            <p
              className="mt-6 max-w-md text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Ya sea para una reserva, una duda o información sobre nuestras propiedades —
              escríbenos y te respondemos rápido.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact grid */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: channels */}
            <AnimatedSection direction="right">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Canales directos
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="WhatsApp de Mobbitrips"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10">
                    <MessageCircle size={22} className="text-[#25D366]" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="font-comfortaa text-base font-bold text-brand-charcoal">
                      WhatsApp
                    </p>
                    <p className="text-sm text-brand-gray">+52 228 252 5244</p>
                  </div>
                  <span className="text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                    Escribir →
                  </span>
                </a>

                <a
                  href="mailto:hola@mobbitrips.com"
                  className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Email de Mobbitrips"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
                    <Mail size={22} className="text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="font-comfortaa text-base font-bold text-brand-charcoal">Correo</p>
                    <p className="text-sm text-brand-gray">hola@mobbitrips.com</p>
                  </div>
                  <span className="text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                    Escribir →
                  </span>
                </a>

                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-cream">
                    <Clock size={22} className="text-brand-gray" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-comfortaa text-base font-bold text-brand-charcoal">
                      Tiempo de respuesta
                    </p>
                    <p className="text-sm text-brand-gray">Menos de 2 horas en horario normal</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: form */}
            <AnimatedSection direction="left" delay={0.15}>
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Envíanos un mensaje
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <ContactoForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
