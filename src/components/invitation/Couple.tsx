import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding';
import { Photo, Title, fade } from './ui';
import { ARCH } from './constants';

type Person = typeof weddingConfig.couple.groom;

function PersonBlock({ p, className = '' }: { p: Person; className?: string }) {
  return (
    <motion.div {...fade} className={className}>
      <h3 className="font-editorial text-3xl leading-tight sm:text-4xl">{p.fullName}</h3>
      <p className="mt-1 text-sm text-[var(--cocoa)]">{p.parents}</p>
      <p className="mt-3 max-w-sm font-editorial text-lg italic leading-relaxed text-[var(--cocoa)]">{p.bio}</p>
    </motion.div>
  );
}

export function Couple() {
  const { groom, bride } = weddingConfig.couple;
  return (
    <section id="couple" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24 md:py-32">
      <Title className="max-w-xl text-[var(--olive)]">Dua jiwa,<br /><i className="text-[var(--cocoa)]">satu tujuan</i></Title>
      <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <motion.div {...fade} className={`aspect-[3/4] w-full max-w-md overflow-hidden ${ARCH}`}>
            <Photo src={groom.photo} label={`Foto ${groom.nickname}`} className={`h-full w-full ${ARCH}`} />
          </motion.div>
          <PersonBlock p={groom} className="mt-6" />
        </div>
        <div className="md:col-span-5 md:col-start-8 md:mt-40">
          <motion.div {...fade} className={`ml-auto aspect-[4/5] w-4/5 overflow-hidden ${ARCH} md:ml-0 md:w-full`}>
            <Photo src={bride.photo} label={`Foto ${bride.nickname}`} className={`h-full w-full ${ARCH}`} />
          </motion.div>
          <PersonBlock p={bride} className="mt-6 text-right md:text-left [&_p]:ml-auto md:[&_p]:ml-0" />
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section id="story" className="scroll-mt-16 bg-[var(--sage)]/25 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Title className="text-[var(--olive)]">Kisah kami</Title>
        <ol className="mt-14 border-l border-[var(--olive)]/40">
          {weddingConfig.loveStory.map((s) => (
            <motion.li key={s.id} {...fade} className="relative pb-14 pl-8 last:pb-0 md:pl-14">
              <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-[var(--olive)] ring-4 ring-[var(--cream)]" />
              <p className="text-sm font-medium text-[var(--cocoa)]">{s.date}</p>
              <h3 className="mt-1 font-editorial text-3xl sm:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-xl font-editorial text-lg italic leading-relaxed text-[var(--cocoa)]">{s.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
