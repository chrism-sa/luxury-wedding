import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Muncul saat di-scroll (dipakai: <motion.div {...fade}>). */
export const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -8% 0px' },
  transition: { duration: 0.9, ease },
};

/** Muncul saat mount, dengan jeda. */
export const up = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease },
});

export function Photo({ src, label, className = '', pos = '50% 30%' }: { src: string; label: string; className?: string; pos?: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div role="img" aria-label={label} className={`flex items-center justify-center bg-gradient-to-br from-[var(--champ)] via-[var(--cream)] to-[var(--rose)]/60 p-4 text-center ${className}`}>
        <span className="font-editorial text-lg italic text-[var(--cocoa)]">
          {label}
          {import.meta.env.DEV && <small className="mt-2 block text-xs not-italic opacity-70">public{src}</small>}
        </span>
      </div>
    );
  }
  return <img src={src} alt={label} loading="lazy" decoding="async" onError={() => setErr(true)} style={{ objectPosition: pos }} className={`object-cover ${className}`} />;
}

export function Title({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.h2 {...fade} className={`font-editorial font-light leading-[0.95] text-[clamp(2.6rem,8vw,5.5rem)] ${className}`}>{children}</motion.h2>;
}
