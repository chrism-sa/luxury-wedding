import { motion } from 'framer-motion';
import { MapPin, CalendarPlus } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { createGoogleMapsUrl, downloadEventICS } from '../../utils/helpers';
import { Title, fade } from './ui';
import { DATE_LABEL } from './constants';

type Ev = (typeof weddingConfig.events)[number];

function EventRow({ ev }: { ev: Ev }) {
  const { groom, bride } = weddingConfig.couple;
  return (
    <motion.article {...fade} className="grid gap-6 border-t border-[var(--cocoa)]/25 py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-14">
      <div className="md:col-span-5">
        <p className="font-editorial text-[clamp(3.5rem,13vw,7.5rem)] font-light leading-none text-[var(--olive)]">{ev.startTime}</p>
        <p className="mt-2 text-sm text-[var(--cocoa)]">sampai {ev.endTime} WIB · {DATE_LABEL}</p>
      </div>
      <div className="md:col-span-4">
        <h3 className="font-editorial text-3xl sm:text-4xl">{ev.title}</h3>
        <p className="mt-2 font-editorial text-xl italic text-[var(--cocoa)]">{ev.venue}</p>
        <p className="mt-1 max-w-xs text-sm leading-relaxed">{ev.address}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row md:col-span-3 md:flex-col">
        <a className="btn line" href={createGoogleMapsUrl(ev.venue, ev.address)} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4" /> Buka peta</a>
        <button className="btn solid" onClick={() => downloadEventICS(ev, `${groom.nickname} & ${bride.nickname}`)}><CalendarPlus className="h-4 w-4" /> Simpan ke kalender</button>
      </div>
    </motion.article>
  );
}

export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24 md:py-32">
      <Title className="mb-12 text-[var(--olive)]">Waktu <i className="text-[var(--cocoa)]">&amp; tempat</i></Title>
      {weddingConfig.events.map((ev) => <EventRow key={ev.id} ev={ev} />)}
      <div className="border-t border-[var(--cocoa)]/25" />
    </section>
  );
}
