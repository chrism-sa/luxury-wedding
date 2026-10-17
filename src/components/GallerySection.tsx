import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { SmartImage } from './ui/SmartImage';

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const photos = weddingConfig.gallery;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev! + 1) % photos.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev! - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  return (
    <section id="gallery" className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A76A] mb-2">Momen Berharga</p>
        <h2 className="font-editorial text-4xl md:text-5xl">Galeri Editorial</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group text-left focus:outline-none focus:ring-2 focus:ring-[#C6A76A] cursor-pointer"
          >
            <div className="overflow-hidden border border-[#B8AA98]/40 bg-[#FFFFFF] aspect-[3/4]">
              <SmartImage
                src={photo.src}
                alt={photo.alt}
                fallbackLabel={photo.caption || photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {photo.caption && (
              <p className="font-editorial italic text-sm text-[#29231F]/80 mt-2">{photo.caption}</p>
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#29231F]/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Tutup Galeri"
            className="absolute top-6 right-6 text-[#F8F5EF] hover:text-[#C6A76A] p-2 cursor-pointer"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={() => setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)}
            aria-label="Foto Sebelumnya"
            className="absolute left-4 md:left-8 text-[#F8F5EF] hover:text-[#C6A76A] p-3 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-3xl w-full max-h-[80vh] flex flex-col items-center">
            <SmartImage
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt}
              fallbackLabel={photos[selectedIndex].caption}
              className="max-h-[70vh] w-auto object-contain border border-[#C6A76A]/40"
            />
            {photos[selectedIndex].caption && (
              <p className="font-editorial italic text-xl text-[#F8F5EF] mt-4">
                {photos[selectedIndex].caption}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSelectedIndex((selectedIndex + 1) % photos.length)}
            aria-label="Foto Selanjutnya"
            className="absolute right-4 md:right-8 text-[#F8F5EF] hover:text-[#C6A76A] p-3 cursor-pointer"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
};