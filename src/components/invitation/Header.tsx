import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music, Share2, Menu, X } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { DATE_LABEL, LINKS } from './constants';

type Props = { playing: boolean; onMusic: () => void; onShare: () => void; shareMsg: string };

export default function Header({ playing, onMusic, onShare, shareMsg }: Props) {
  const [menu, setMenu] = useState(false);
  const { groom, bride } = weddingConfig.couple;

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };
  const icon = 'flex h-11 w-11 items-center justify-center rounded-full';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--cocoa)]/10 bg-[var(--ivory)]/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#hero" className="font-editorial text-2xl text-[var(--olive)]">{groom.nickname[0]} <i className="text-[var(--cocoa)]">&amp;</i> {bride.nickname[0]}</a>
          <nav aria-label="Utama" className="hidden gap-9 text-sm md:flex">
            {LINKS.map(([id, l]) => <button key={id} onClick={() => go(id)} className="text-[var(--cocoa)] transition hover:text-[var(--olive)]">{l}</button>)}
          </nav>
          <div className="flex items-center gap-1">
            <button onClick={onMusic} aria-pressed={playing} aria-label={playing ? 'Jeda musik' : 'Putar musik'} className={`${icon} ${playing ? 'bg-[var(--champ)]' : ''}`}><Music className="h-5 w-5" /></button>
            <button onClick={onShare} aria-label="Bagikan undangan" className={icon}><Share2 className="h-5 w-5" /></button>
            <button onClick={() => setMenu(true)} aria-label="Buka menu" className={`${icon} md:hidden`}><Menu className="h-6 w-6" /></button>
          </div>
        </div>
        {shareMsg && <p role="status" className="absolute right-5 top-[calc(4rem+env(safe-area-inset-top))] rounded-full bg-[var(--olive)] px-4 py-2 text-sm text-[var(--ivory)]">{shareMsg}</p>}
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-[var(--cream)] px-8 pt-[max(1rem,env(safe-area-inset-top))]"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }} animate={{ clipPath: 'circle(150% at 92% 4%)' }} exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
          >
            <button onClick={() => setMenu(false)} aria-label="Tutup menu" className={`${icon} ml-auto`}><X className="h-7 w-7" /></button>
            <ul className="my-auto space-y-5">
              {LINKS.map(([id, l], i) => (
                <motion.li key={id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07 }}>
                  <button onClick={() => go(id)} className="font-editorial text-5xl font-light text-[var(--olive)]">{l}</button>
                </motion.li>
              ))}
            </ul>
            <p className="pb-10 text-sm text-[var(--cocoa)]">{DATE_LABEL}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
