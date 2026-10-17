import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import '../styles/invitation.css';
import { weddingConfig } from '../config/wedding';
import { useGuestName, DEFAULT_GUEST } from '../utils/guest';
import { useShare } from '../hooks/useShare';
import IntroSplash from './invitation/IntroSplash';
import BookCover from './invitation/BookCover';
import Header from './invitation/Header';
import { Hero, Countdown } from './invitation/Hero';
import { Couple, Story } from './invitation/Couple';
import Events from './invitation/Events';
import Gallery from './invitation/Gallery';
import Rsvp from './invitation/Rsvp';
import GiftWishes from './invitation/GiftWishes';
import Footer from './invitation/Footer';

type Stage = 'intro' | 'book' | 'site';

/** Alur: IntroSplash (logo) -> BookCover (buku terbuka) -> undangan lengkap. */
export default function WeddingInvitation() {
  const [stage, setStage] = useState<Stage>('intro');
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const guest = useGuestName();
  const { share, msg } = useShare();

  useEffect(() => {
    document.body.style.overflow = stage === 'site' ? '' : 'hidden';
    if (stage === 'site') window.scrollTo(0, 0);
  }, [stage]);

  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="inv min-h-screen overflow-x-clip">
        <audio ref={audio} src={weddingConfig.music.src} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />

        <AnimatePresence mode="wait">
          {stage === 'intro' && <IntroSplash key="intro" onDone={() => setStage('book')} />}
          {stage === 'book' && (
            <BookCover key="book" guest={guest} onStart={() => audio.current?.play().catch(() => {})} onDone={() => setStage('site')} />
          )}
        </AnimatePresence>

        {stage === 'site' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Header playing={playing} onMusic={toggleMusic} onShare={share} shareMsg={msg} />
            <main>
              <Hero />
              <Countdown />
              <Couple />
              <Story />
              <Events />
              <Gallery />
              <Rsvp guest={guest === DEFAULT_GUEST ? '' : guest} />
              <GiftWishes />
            </main>
            <Footer onShare={share} />
          </motion.div>
        )}
      </div>
    </MotionConfig>
  );
}
