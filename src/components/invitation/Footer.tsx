import { Heart, Share2, ArrowUp } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';

export default function Footer({ onShare }: { onShare: () => void }) {
  const { groom, bride } = weddingConfig.couple;
  return (
    <footer className="bg-[var(--cream)] px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-24 text-center">
      <Heart className="mx-auto h-5 w-5 fill-[var(--rose)] text-[var(--rose)]" />
      <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[var(--cocoa)]">Terima kasih atas doa dan kehadiran Anda. Itu sangat berarti bagi kami.</p>
      <p className="mt-6 font-editorial text-[clamp(3rem,12vw,6.5rem)] font-light leading-none text-[var(--olive)]">{groom.nickname} <i className="text-[var(--cocoa)]">&amp;</i> {bride.nickname}</p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button className="btn line" onClick={onShare}><Share2 className="h-4 w-4" /> Bagikan undangan</button>
        <button className="btn line" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp className="h-4 w-4" /> Kembali ke atas</button>
      </div>
    </footer>
  );
}
