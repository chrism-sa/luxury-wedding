import React, { useState, useEffect } from 'react';
import { differenceInSeconds, parseISO, isValid } from 'date-fns';
import { weddingConfig } from '../config/wedding';

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, isInvalid: false });

  useEffect(() => {
    const target = parseISO(weddingConfig.weddingDate);
    if (!isValid(target)) {
      setTimeLeft((prev) => ({ ...prev, isInvalid: true }));
      return;
    }

    const updateCountdown = () => {
      const diff = differenceInSeconds(target, new Date());
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isInvalid: false });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (3600 * 24)),
        hours: Math.floor((diff % (3600 * 24)) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
        isExpired: false,
        isInvalid: false,
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isInvalid) return null;

  return (
    <section className="py-16 px-6 border-y border-[#C6A76A]/30 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C6A76A] mb-3">Menuju Hari Bahagia</p>
        <h2 className="font-editorial text-3xl md:text-4xl mb-10">{weddingConfig.displayDate}</h2>

        {timeLeft.isExpired ? (
          <p className="font-editorial italic text-2xl text-[#C6A76A]">Acara Pernikahan Telah Berlangsung</p>
        ) : (
          <div className="grid grid-cols-4 gap-3 md:gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="border border-[#B8AA98]/40 bg-[#F8F5EF] py-5 px-2">
                <span className="block font-editorial text-3xl md:text-5xl font-semibold text-[#29231F]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#29231F]/70 mt-2 block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};