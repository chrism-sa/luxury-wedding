import type { EventItem } from '../types/wedding';

// 1. Validasi & Sanitasi Nama Tamu dari URL (?to=Nama%20Tamu)
export function getGuestNameFromUrl(): string {
  if (typeof window === 'undefined') return 'Tamu Undangan Terhormat';
  const params = new URLSearchParams(window.location.search);
  const rawName = params.get('to');
  if (!rawName || !rawName.trim()) return 'Tamu Undangan Terhormat';
  
  // Hapus karakter tag HTML dan batasi maksimal 60 karakter
  const cleaned = rawName.replace(/[<>]/g, '').trim().slice(0, 60);
  return cleaned || 'Tamu Undangan Terhormat';
}

// 2. Buat URL Google Maps dari Alamat (Tanpa mengarang koordinat)
export function createGoogleMapsUrl(venue: string, address: string): string {
  const query = encodeURIComponent(`${venue}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// 3. Generator File Kalender .ics Lokal
export function downloadEventICS(event: EventItem, coupleNames: string): void {
  const cleanDate = event.date.replace(/-/g, '');
  const start = event.startTime.replace(':', '') + '00';
  const end = event.endTime.replace(':', '') + '00';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Modern Luxury Wedding//ID',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title} - ${coupleNames}`,
    `DTSTART;TZID=Asia/Jakarta:${cleanDate}T${start}`,
    `DTEND;TZID=Asia/Jakarta:${cleanDate}T${end}`,
    `LOCATION:${event.venue}, ${event.address}`,
    `DESCRIPTION:Undangan ${event.title} ${coupleNames} di ${event.venue}.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-${coupleNames.toLowerCase().replace(/\s+/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}