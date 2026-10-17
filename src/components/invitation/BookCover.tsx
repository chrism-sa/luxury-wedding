import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding';
import { DATE_LABEL } from './constants';

const ease = [0.7, 0, 0.2, 1] as const;
const hide = { backfaceVisibility: 'hidden' } as const;

type Props = { guest: string; onStart: () => void; onDone: () => void };

/** Tahap 2: halaman sambutan berupa buku undangan. Pita terlepas, sampul terbuka, lalu masuk ke undangan. */
export default function BookCover({ guest, onStart, onDone }: Props) {
  const [open, setOpen] = useState(false);
  const done = useRef(onDone);
  done.current = onDone;
  const { groom, bride } = weddingConfig.couple;

  const start = () => {
    if (open) return;
    setOpen(true);
    onStart(); // dipanggil langsung dari ketukan agar musik boleh diputar
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => done.current(), reduced ? 400 : 2700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ height: '100dvh', background: 'radial-gradient(60rem 40rem at 50% 35%, var(--champ), var(--ivory) 70%)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.15 }} transition={{ duration: 0.7 }}
    >
      <motion.div animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.4 }}>
        <p className="text-sm text-[var(--cocoa)]">Kepada Yth.</p>
        <p className="mb-8 mt-1 max-w-xs break-words font-editorial text-3xl text-[var(--olive)]">{guest}</p>
      </motion.div>

      <motion.div
        role="button" tabIndex={0} aria-label={`Buka undangan untuk ${guest}`}
        onClick={start} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && start()}
        className="relative aspect-[3/4] w-[min(72vw,18rem)] cursor-pointer"
        style={{ perspective: 1600 }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ opacity: 1, y: open ? 0 : [0, -6, 0] }}
        transition={open ? { duration: 0.4 } : { opacity: { duration: 0.8 }, y: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }}
        whileTap={{ scale: 0.98 }}
      >
        {/* halaman dalam (tetap di tempat) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-l-sm rounded-r-lg bg-[var(--ivory)] p-6 shadow-[6px_8px_0_-2px_#e8dcc4,14px_18px_32px_rgba(59,46,39,.28)]">
          <p className="text-xs leading-relaxed text-[var(--cocoa)]">Dengan penuh syukur,<br />kami mengundang Anda ke pernikahan</p>
          <div className="my-4 h-px w-10 bg-[var(--rose)]" />
          <p className="font-editorial text-4xl font-light leading-none text-[var(--olive)]">{groom.nickname}<br /><i className="text-2xl text-[var(--cocoa)]">&amp;</i><br />{bride.nickname}</p>
          <p className="mt-4 text-xs text-[var(--cocoa)]">{DATE_LABEL}</p>
        </div>

        {/* sampul: berputar pada punggung buku */}
        <motion.div className="absolute inset-0 origin-left" style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: open ? -178 : 0 }} transition={{ duration: 1.5, delay: 0.45, ease }}>
          <div className="absolute inset-0 overflow-hidden rounded-l-sm rounded-r-lg bg-[var(--olive)] text-[var(--ivory)] shadow-[10px_14px_30px_rgba(59,46,39,.35)]" style={hide}>
            <div className="absolute inset-3 rounded-t-[999px] border border-[var(--champ)]/50" />
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <p className="text-xs text-[var(--champ)]">The wedding of</p>
              <p className="mt-3 font-editorial text-5xl font-light leading-none">{groom.nickname[0]}<i className="px-1 text-3xl text-[var(--champ)]">&amp;</i>{bride.nickname[0]}</p>
              <p className="mt-4 font-editorial text-lg italic text-[var(--champ)]">Intimate Wedding</p>
            </div>
            {/* pita */}
            <motion.div className="absolute inset-y-0 left-[60%] w-5 bg-[var(--rose)]" animate={{ opacity: open ? 0 : 1, y: open ? -40 : 0 }} transition={{ duration: 0.45 }} />
            <motion.div className="absolute left-[60%] top-1/2 -ml-2 h-9 w-9 rotate-45 rounded-sm bg-[var(--champ)] shadow-md" animate={{ opacity: open ? 0 : 1, scale: open ? 0.4 : 1 }} transition={{ duration: 0.45 }} />
          </div>
          {/* sisi dalam sampul */}
          <div className="absolute inset-0 rounded-l-lg rounded-r-sm bg-[var(--cream)]" style={{ ...hide, transform: 'rotateY(180deg)' }} />
        </motion.div>
      </motion.div>

      <motion.p className="mt-10 text-sm text-[var(--cocoa)]" animate={{ opacity: open ? 0 : 1 }}>Ketuk buku untuk membuka</motion.p>
    </motion.div>
  );
}
