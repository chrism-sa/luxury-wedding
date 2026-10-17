import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EBE5D9] text-[#29231F]/60 border border-[#C6A76A]/30 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="w-8 h-8 mb-2 text-[#C6A76A] stroke-[1.25]" />
        <span className="font-editorial italic text-base text-[#29231F]">{fallbackLabel || alt}</span>
        <span className="text-[11px] uppercase tracking-widest mt-1 opacity-75">
          Simpan foto di: public{src}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};