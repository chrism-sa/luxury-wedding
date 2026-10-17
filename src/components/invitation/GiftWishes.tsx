import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { Title, fade } from './ui';

function Gift() {
  const [copied, setCopied] = useState<number | null>(null);
  const copy = async (n: string, i: number) => {
    try { await navigator.clipboard.writeText(n); setCopied(i); } catch { setCopied(-1); }
    setTimeout(() => setCopied(null), 2200);
  };
  return (
    <div>
      <Title className="text-[var(--olive)]">Tanda <i className="text-[var(--cocoa)]">kasih</i></Title>
      <motion.p {...fade} className="mt-5 max-w-sm font-editorial text-lg italic leading-relaxed text-[var(--cocoa)]">Doa restu Anda adalah hadiah terindah. Bila ingin berbagi, Anda dapat mengirimkannya ke rekening berikut.</motion.p>
      <div className="mt-8 space-y-6">
        {weddingConfig.gift.accounts.map((a, i) => (
          <motion.div key={i} {...fade} className="border-l-2 border-[var(--rose)] pl-5">
            <p className="text-sm font-medium text-[var(--cocoa)]">{a.bank} · a.n. {a.accountHolder}</p>
            <p className="my-1 break-all font-editorial text-3xl tracking-wide">{a.accountNumber}</p>
            <button onClick={() => copy(a.accountNumber, i)} className="btn line mt-2 !min-h-[44px]">
              {copied === i ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied === i ? 'Tersalin' : copied === -1 ? 'Salin manual' : 'Salin nomor'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Wishes() {
  const [wishes, setWishes] = useState(weddingConfig.staticWishes);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <div>
      <motion.h2 {...fade} className="font-editorial text-4xl font-light text-[var(--olive)]">Ucapan &amp; doa</motion.h2>
      <motion.form {...fade} className="mt-6 space-y-3" onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !msg.trim()) return;
        setWishes([{ id: `local-${wishes.length}-${name}`, name, relation: 'Tamu Undangan', message: msg, date: 'Pratinjau' }, ...wishes]);
        setName(''); setMsg('');
      }}>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="Nama Anda" aria-label="Nama Anda" />
        <textarea required rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} className="field resize-none" placeholder="Tuliskan ucapan..." aria-label="Ucapan" />
        <button type="submit" className="btn solid w-full">Lihat pratinjau ucapan</button>
        <p className="text-xs text-[var(--cocoa)]">Pratinjau di perangkat ini saja. Ucapan tidak disimpan dan tidak dilihat orang lain. Untuk mengirim doa, gunakan RSVP lewat WhatsApp.</p>
      </motion.form>
      <ul className="mt-8 max-h-[26rem] space-y-6 overflow-y-auto pr-2">
        {wishes.map((w) => (
          <li key={w.id} className="border-b border-[var(--cocoa)]/15 pb-5">
            <div className="flex items-baseline justify-between gap-3"><span className="font-editorial text-xl">{w.name}</span><span className="text-xs text-[var(--cocoa)]">{w.date}</span></div>
            <p className="mt-1 font-editorial text-lg italic leading-relaxed text-[var(--cocoa)]">“{w.message}”</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GiftWishes() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:gap-14"><Gift /><Wishes /></div>
    </section>
  );
}
