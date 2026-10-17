import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { Photo, Title, fade } from './ui';

const ratios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[2/3]'];
const { gallery } = weddingConfig;

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const g = gallery[index];

  useEffect(() => {
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [onClose, onStep]);

  const nav = 'absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white sm:flex';
  return (
    <motion.div
      role="dialog" aria-modal="true" aria-label="Galeri foto"
      className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-[var(--ink)]/95 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button ref={closeBtn} onClick={onClose} aria-label="Tutup galeri" className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"><X className="h-6 w-6" /></button>
      <motion.div key={index} onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex max-h-[78dvh] max-w-full justify-center">
        <Photo src={g.src} label={g.caption || `Foto ${index + 1}`} className="max-h-[78dvh] max-w-full rounded-lg !object-contain" />
      </motion.div>
      {g.caption && <p className="mt-5 font-editorial text-xl italic text-white">{g.caption}</p>}
      <p className="mt-1 text-sm text-white/70" aria-live="polite">{index + 1} / {gallery.length}</p>
      <button onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Foto sebelumnya" className={`${nav} left-3`}><ChevronLeft className="h-6 w-6" /></button>
      <button onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Foto berikutnya" className={`${nav} right-3`}><ChevronRight className="h-6 w-6" /></button>
    </motion.div>
  );
}

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);

  return (
    <section id="gallery" className="scroll-mt-16 bg-[var(--cream)]/70 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Title className="mb-12 px-2 text-[var(--olive)]">Momen <i className="text-[var(--cocoa)]">kami</i></Title>
        <div className="columns-2 gap-3 md:columns-3 md:gap-4">
          {gallery.map((g, i) => (
            <motion.button key={g.id} {...fade} onClick={() => setIdx(i)} aria-label={`Perbesar foto: ${g.caption || i + 1}`} className="group mb-3 block w-full overflow-hidden rounded-t-[2rem] rounded-b-md md:mb-4">
              <Photo src={g.src} label={g.caption} className={`w-full transition duration-700 group-hover:scale-105 ${ratios[i % 4]}`} />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>{idx !== null && <Lightbox index={idx} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  );
}
