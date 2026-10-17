import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

export const MusicPlayer: React.FC<{ shouldAutoPlay: boolean }> = ({ shouldAutoPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    if (shouldAutoPlay && audioRef.current && !audioError) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [shouldAutoPlay, audioError]);

  if (!weddingConfig.music.enabled || audioError) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setAudioError(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#29231F] text-[#F8F5EF] border border-[#C6A76A]/50 px-3 py-2 shadow-lg">
      <audio
        ref={audioRef}
        src={weddingConfig.music.src}
        loop
        onError={() => setAudioError(true)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        className="p-1.5 hover:text-[#C6A76A] transition-colors cursor-pointer"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
        className="p-1.5 hover:text-[#C6A76A] transition-colors cursor-pointer"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};