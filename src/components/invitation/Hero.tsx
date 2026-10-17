import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding';
import { useCountdown } from '../../hooks/useCountdown';
import { Photo, fade, up } from './ui';
import { ARCH, DATE_LABEL } from './constants';

export function Hero() {
  const { groom, bride } = weddingConfig.couple;
  return (
    <section id="hero" className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-6 pb-16 pt-28 md:grid-cols-12 md:gap-10">
      <div className="order-2 md:order-1 md:col-span-7">
        <motion.p {...up(0.1)} className="text-sm text-[var(--cocoa)]">{DATE_LABEL}</motion.p>
        <motion.h1 {...up(0.25)} className="mt-3 font-editorial text-[clamp(4.5rem,18vw,12rem)] font-light leading-[0.86] text-[var(--olive)]">
          {groom.nickname}
          <span className="block pl-[0.5em] italic text-[var(--cocoa)]">&amp; {bride.nickname}</span>
        </motion.h1>
        <motion.p {...up(0.5)} className="mt-8 max-w-md font-editorial text-xl italic leading-relaxed text-[var(--cocoa)]">“{weddingConfig.tagline}”</motion.p>
      </div>
      <motion.div {...up(0.2)} className="relative order-1 mx-auto w-full max-w-[17rem] sm:max-w-sm md:order-2 md:col-span-5 md:max-w-none md:translate-y-10">
        <div className="absolute -left-6 top-1/3 h-40 w-40 rounded-full bg-[var(--rose)]/50 blur-2xl" />
        <div className={`relative aspect-[3/4] overflow-hidden ${ARCH} border border-[var(--olive)]/30 p-2`}>
          <Photo src={weddingConfig.heroImage} label={`${groom.nickname} & ${bride.nickname}`} className={`h-full w-full ${ARCH}`} />
        </div>
        <div className="absolute -bottom-5 -left-3 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[var(--champ)] text-[var(--olive)] sm:-left-8 sm:h-28 sm:w-28">
          <span className="font-editorial text-3xl leading-none">12</span>
          <span className="text-xs">Des 2026</span>
        </div>
      </motion.div>
    </section>
  );
}

export function Countdown() {
  const cd = useCountdown(weddingConfig.weddingDate);
  const items = [['Hari', cd.days], ['Jam', cd.hours], ['Menit', cd.mins], ['Detik', cd.secs]] as const;
  return (
    <section aria-label="Hitung mundur" className="border-y border-[var(--cocoa)]/20 bg-[var(--cream)]/60 px-4 py-12">
      {cd.done ? (
        <p className="text-center font-editorial text-3xl italic text-[var(--olive)]">Hari bahagia itu telah tiba</p>
      ) : (
        <motion.div {...fade} role="timer" className="mx-auto flex max-w-3xl items-start justify-center divide-x divide-[var(--cocoa)]/25">
          {items.map(([l, v]) => (
            <div key={l} className="flex-1 px-1 text-center">
              <span className="block font-editorial text-[clamp(2.2rem,9vw,5rem)] font-light tabular-nums leading-none text-[var(--olive)]">{String(v).padStart(2, '0')}</span>
              <span className="mt-2 block text-xs text-[var(--cocoa)] sm:text-sm">{l}</span>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
