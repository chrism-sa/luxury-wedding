import { useState } from 'react';
import { weddingConfig } from '../config/wedding';

/** Web Share API; fallback: salin tautan (tanpa token tamu). */
export function useShare() {
  const [msg, setMsg] = useState('');
  const share = async () => {
    const { groom, bride } = weddingConfig.couple;
    const data = { title: `${groom.nickname} & ${bride.nickname}`, text: 'Anda diundang ke pernikahan kami.', url: window.location.origin };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(data.url);
      setMsg('Tautan disalin');
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setMsg('Salin tautan dari address bar');
    }
    setTimeout(() => setMsg(''), 2500);
  };
  return { share, msg };
}
