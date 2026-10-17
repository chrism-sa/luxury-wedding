import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { Title, fade } from './ui';

export default function Rsvp({ guest }: { guest: string }) {
  const { groom, bride } = weddingConfig.couple;
  const num = weddingConfig.rsvp.whatsappNumber;
  const [name, setName] = useState(guest);
  const [attending, setAttending] = useState(true);
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [prepared, setPrepared] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setPrepared(true);
    if (!num) return;
    const text = [
      `Halo ${groom.nickname} & ${bride.nickname},`,
      `Saya *${name}* mengonfirmasi kehadiran:`,
      `- Status: *${attending ? 'Hadir' : 'Tidak hadir'}*`,
      attending ? `- Jumlah: *${count} orang*` : '',
      notes ? `- Pesan: "${notes}"` : '',
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const round = 'flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ivory)] text-[var(--olive)]';
  return (
    <section id="rsvp" className="scroll-mt-16 bg-[var(--olive)] px-6 py-24 text-[var(--ivory)] md:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Title>Konfirmasi <i className="text-[var(--champ)]">kehadiran</i></Title>
          <motion.p {...fade} className="mt-6 max-w-sm leading-relaxed text-[var(--ivory)]/85">
            Formulir ini menyiapkan pesan WhatsApp untuk mempelai. Konfirmasi baru terkirim setelah Anda menekan kirim di WhatsApp.
          </motion.p>
        </div>
        <motion.form {...fade} onSubmit={submit} className="space-y-5 md:col-span-7">
          <div>
            <label htmlFor="rsvp-name" className="mb-2 block text-sm">Nama tamu</label>
            <input id="rsvp-name" required value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="Nama lengkap Anda" autoComplete="name" />
          </div>
          <fieldset>
            <legend className="mb-2 text-sm">Apakah Anda hadir?</legend>
            <div className="grid grid-cols-2 gap-1 rounded-full bg-[var(--ivory)]/10 p-1">
              {([[true, 'Hadir'], [false, 'Tidak hadir']] as const).map(([v, l]) => (
                <button type="button" key={l} aria-pressed={attending === v} onClick={() => setAttending(v)} className={`min-h-[48px] rounded-full text-sm font-medium transition ${attending === v ? 'bg-[var(--ivory)] text-[var(--olive)]' : ''}`}>{l}</button>
              ))}
            </div>
          </fieldset>
          {attending && (
            <div>
              <span className="mb-2 block text-sm">Jumlah tamu</span>
              <div className="flex items-center justify-between rounded-full bg-[var(--ivory)]/10 p-1">
                <button type="button" aria-label="Kurangi jumlah" onClick={() => setCount((c) => Math.max(1, c - 1))} className={round}><Minus className="h-4 w-4" /></button>
                <span className="font-editorial text-2xl" aria-live="polite">{count} orang</span>
                <button type="button" aria-label="Tambah jumlah" onClick={() => setCount((c) => Math.min(5, c + 1))} className={round}><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="rsvp-notes" className="mb-2 block text-sm">Pesan untuk mempelai (opsional)</label>
            <textarea id="rsvp-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="field resize-none" placeholder="Tuliskan ucapan atau doa..." />
          </div>
          <button type="submit" className="btn w-full bg-[var(--champ)] text-[var(--ink)] hover:bg-[var(--ivory)]"><Send className="h-4 w-4" /> Siapkan pesan WhatsApp</button>
          {prepared && (
            <p role="status" className="flex items-start gap-2 text-sm text-[var(--champ)]">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              {num ? 'WhatsApp terbuka dengan pesan siap kirim. Tekan kirim di sana untuk menyelesaikan.' : 'Nomor WhatsApp belum diatur di konfigurasi.'}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
