'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const cover = images[0] ?? null;
  const rest = images.slice(1, 5);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function prev() {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  function next() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') closeLightbox();
  }

  if (!cover) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-brand-border sm:h-80">
        <Images size={40} className="text-brand-light" aria-hidden="true" />
      </div>
    );
  }

  return (
    <>
      {/* Gallery grid */}
      <div
        className="grid h-64 grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:h-96 sm:grid-cols-4"
        role="region"
        aria-label={`Galería de ${propertyName}`}
      >
        {/* Large cover photo */}
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="relative col-span-2 row-span-2 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Ver foto 1 de ${propertyName}`}
        >
          <Image
            src={cover}
            alt={`${propertyName} — foto principal`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </button>

        {/* Thumbnail grid */}
        {rest.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openLightbox(i + 1)}
            className="relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`Ver foto ${i + 2} de ${propertyName}`}
          >
            <Image
              src={src}
              alt={`${propertyName} — foto ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <span className="font-semibold">+{images.length - 5}</span>
              </div>
            )}
          </button>
        ))}

        {/* Fill empty spots with placeholder */}
        {rest.length < 4 &&
          Array.from({ length: 4 - rest.length }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-brand-border" aria-hidden="true" />
          ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${lightboxIndex + 1} de ${images.length} — ${propertyName}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex] ?? cover}
              alt={`${propertyName} — foto ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Cerrar galería"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
