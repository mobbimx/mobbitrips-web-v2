'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';
const WA_MESSAGE = encodeURIComponent(
  '¡Hola! Me interesa información sobre sus propiedades vacacionales en Xalapa.',
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(true);
  const footerRef = useRef<Element | null>(null);

  useEffect(() => {
    footerRef.current = document.querySelector('footer');
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry?.isIntersecting), {
      threshold: 0.1,
    });

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-30"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-25" />

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir WhatsApp"
            className="group relative flex items-center gap-2.5 rounded-full bg-primary px-4 py-3 text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-5"
          >
            <MessageCircle size={22} aria-hidden="true" />
            <span className="hidden text-sm font-medium sm:inline">Escríbenos</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
