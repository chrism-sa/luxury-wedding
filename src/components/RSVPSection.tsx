import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

export const RSVPSection: React.FC<{ defaultGuestName: string }> = ({ defaultGuestName }) => {
  const [name, setName] = useState(defaultGuestName === 'Tamu Undangan Terhormat' ? '' : defaultGuestName);
  const [status, setStatus] = useState<'Hadir' | 'Tidak Hadir'>('Hadir');
  const [guestsCount, setGuestsCount] = useState('1');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submittedPreview, setSubmittedPreview] = useState<null | {
    name: string;
    status: string;
    guestsCount: string;
    notes: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Mohon masukkan nama lengkap Anda.');
      return;
    }
    setError('');

    const payload = { name: name.trim(), status, guestsCount, notes: notes.trim() };
    setSubmittedPreview(payload);

    if (weddingConfig.rsvp.mode === 'whatsapp' && weddingConfig.rsvp.whatsappNumber) {
      const text = [
        `Halo ${weddingConfig.couple.groom.nickname} & ${weddingConfig.couple.bride.nickname},`,
        `Saya *${payload.name}* ingin mengonfirmasi kehadiran pernikahan:`,
        `- Status: *${payload.status}*`,
        `- Jumlah Tamu: *${payload.guestsCount} Orang*`,
        payload.notes ? `- Pesan/Doa: "${payload.notes}"` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const waUrl = `https://wa.me/${weddingConfig.rsvp.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="rsvp" className="py-20 md:py-28 px-6 bg-[#FFFFFF] border-y border-[#B8AA98]/30">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C6A76A] mb-2">RSVP</p>
          <h2 className="font-editorial text-4xl md:text-5xl">Konfirmasi Kehadiran</h2>
          <p className="text-sm text-[#29231F]/75 mt-3">
            {weddingConfig.rsvp.mode === 'whatsapp' && weddingConfig.rsvp.whatsappNumber
              ? 'Formulir ini akan mengarahkan Anda ke WhatsApp untuk mengirim konfirmasi secara langsung.'
              : 'Mode Pratinjau Lokal aktif. Ringkasan konfirmasi akan ditampilkan langsung di layar browser Anda.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-[#F8F5EF] p-6 md:p-10 border border-[#B8AA98]/40">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-800 bg-red-100/80 p-3 border border-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="rsvp-name" className="block text-xs uppercase tracking-widest mb-2 font-medium">
              Nama Lengkap *
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="w-full bg-[#FFFFFF] border border-[#B8AA98] px-4 py-3 text-sm focus:outline-none focus:border-[#C6A76A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rsvp-status" className="block text-xs uppercase tracking-widest mb-2 font-medium">
                Konfirmasi Kehadiran
              </label>
              <select
                id="rsvp-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Hadir' | 'Tidak Hadir')}
                className="w-full bg-[#FFFFFF] border border-[#B8AA98] px-4 py-3 text-sm focus:outline-none focus:border-[#C6A76A]"
              >
                <option value="Hadir">Ya, Saya Akan Hadir</option>
                <option value="Tidak Hadir">Maaf, Belum Bisa Hadir</option>
              </select>
            </div>

            <div>
              <label htmlFor="rsvp-count" className="block text-xs uppercase tracking-widest mb-2 font-medium">
                Jumlah Tamu
              </label>
              <select
                id="rsvp-count"
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                disabled={status === 'Tidak Hadir'}
                className="w-full bg-[#FFFFFF] border border-[#B8AA98] px-4 py-3 text-sm focus:outline-none focus:border-[#C6A76A] disabled:opacity-50"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="rsvp-notes" className="block text-xs uppercase tracking-widest mb-2 font-medium">
              Pesan atau Doa Tambahan
            </label>
            <textarea
              id="rsvp-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tuliskan pesan singkat atau ucapan doa..."
              className="w-full bg-[#FFFFFF] border border-[#B8AA98] px-4 py-3 text-sm focus:outline-none focus:border-[#C6A76A]"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#29231F] text-[#F8F5EF] py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A76A] hover:text-[#29231F] transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {weddingConfig.rsvp.mode === 'whatsapp' && weddingConfig.rsvp.whatsappNumber
              ? 'Lanjutkan ke WhatsApp'
              : 'Tampilkan Ringkasan RSVP'}
          </button>
        </form>

        {submittedPreview && (
          <div className="mt-6 p-6 border border-[#C6A76A] bg-[#F8F5EF]">
            <div className="flex items-center gap-2 text-[#29231F] font-semibold text-sm mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#C6A76A]" />
              <span>Ringkasan Konfirmasi Anda (Pratinjau Browser Lokal):</span>
            </div>
            <p className="text-xs text-[#29231F]/80 leading-relaxed">
              Nama: <strong>{submittedPreview.name}</strong> | Status: <strong>{submittedPreview.status}</strong> ({submittedPreview.guestsCount} Tamu)
              {submittedPreview.notes && <span className="block mt-1 italic">"{submittedPreview.notes}"</span>}
            </p>
            {!weddingConfig.rsvp.whatsappNumber && (
              <p className="text-[11px] text-[#29231F]/60 mt-3 border-t border-[#B8AA98]/30 pt-2">
                Catatan: Isi properti <code>rsvp.whatsappNumber</code> pada <code>src/config/wedding.ts</code> untuk mengaktifkan pengiriman langsung ke WhatsApp.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};