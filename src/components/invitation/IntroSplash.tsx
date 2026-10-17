import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding';
import { DATE_LABEL } from './constants';

/** Tahap 1: logo C & S + "Intimate Wedding" + tanggal. Otomatis lanjut, ketuk untuk lewati. */
export default function IntroSplash({ onDone }: { onDone: () => void }) {
  const cb = useRef(onDone);
  cb.current = onDone;
  const { groom, bride } = weddingConfig.couple;

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => cb.current(), reduced ? 1200 : 3400);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[var(--ivory)] px-6 text-center"
      style={{ height: '100dvh' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={() => cb.current()}
    >
      <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
          <motion.circle cx="50" cy="50" r="48.5" fill="none" stroke="var(--olive)" strokeWidth="0.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
        </svg>
        <motion.h1 className="font-editorial text-6xl font-light text-[var(--olive)] sm:text-7xl" aria-label={`${groom.nickname} dan ${bride.nickname}`}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }}>
          {groom.nickname[0]}<i className="px-1 text-4xl text-[var(--cocoa)] sm:text-5xl">&amp;</i>{bride.nickname[0]}
        </motion.h1>
      </div>
      <motion.p className="mt-10 font-editorial text-2xl italic text-[var(--cocoa)]"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.3 }}>
        Intimate Wedding
      </motion.p>
      <motion.p className="mt-2 text-sm text-[var(--cocoa)]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.7 }}>
        {DATE_LABEL}
      </motion.p>
    </motion.div>
  );
}
