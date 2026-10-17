import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { SmartImage } from './ui/SmartImage';

interface CoverScreenProps {
  isOpen: boolean;
  guestName: string;
  onOpen: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ isOpen, guestName, onOpen }) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#29231F] text-[#F8F5EF] p-6 md:p-14 overflow-hidden"
        >
          {/* Background Image & Luxury Overlay */}
          <div className="absolute inset-0 z-0 opacity-30">
            <SmartImage
              src={weddingConfig.coverImage}
              alt="Wedding Cover Portrait"
              fallbackLabel="Editorial Cover Portrait"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#29231F] via-[#29231F]/70 to-transparent" />
          </div>

          {/* Header */}
          <div className="relative z-10 text-center pt-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C6A76A]">
              The Wedding Of
            </p>
          </div>

          {/* Center Couple Names */}
          <div className="relative z-10 my-auto text-center max-w-2xl mx-auto">
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight leading-none text-[#F8F5EF]">
              {weddingConfig.couple.groom.nickname}
              <span className="block sm:inline font-editorial italic text-[#C6A76A] mx-4 text-4xl sm:text-6xl">
                &amp;
              </span>
              {weddingConfig.couple.bride.nickname}
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-[#B8AA98]">
              {weddingConfig.displayDate}
            </p>
          </div>

          {/* Bottom Guest Personalization & CTA */}
          <div className="relative z-10 text-center max-w-md mx-auto w-full pb-4">
            <div className="border border-[#C6A76A]/30 bg-[#29231F]/80 backdrop-blur-sm px-6 py-5 mb-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8AA98] mb-2">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="font-editorial text-2xl text-[#FFFFFF] font-semibold break-words">
                {guestName}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center justify-center gap-3 bg-[#C6A76A] text-[#29231F] px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-all hover:bg-[#d4b77d] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C6A76A] focus:ring-offset-2 focus:ring-offset-[#29231F] cursor-pointer"
            >
              <MailOpen className="w-4 h-4" />
              Buka Undangan
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};