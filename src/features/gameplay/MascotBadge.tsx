import React, { useState } from 'react';
import defaultBadgeImg from '@/assets/images/logo-streamer-vulgomaniaco-badge.png';

export interface MascotBadgeProps {
  imageSrc?: string;
  className?: string;
}

export const MascotBadge: React.FC<MascotBadgeProps> = ({
  imageSrc = defaultBadgeImg,
  className = 'relative w-44 h-52 flex items-center justify-center filter drop-shadow-[0_4px_16px_rgba(214,214,92,0.6)]',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      data-testid="mascot-badge"
      className={`${className} pointer-events-none select-none`}
    >
      {!hasError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Brilho de fundo místico pulsante */}
          <div className="absolute inset-2 rounded-full bg-ivexi-purple/40 blur-md pointer-events-none animate-pulse" />
          <img
            src={imageSrc}
            alt="Corvo Streamer Mascote"
            onError={() => setHasError(true)}
            className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(115,46,184,0.9)]"
          />
        </div>
      ) : (
        <div
          data-testid="mascot-fallback-svg"
          className="relative w-full h-full flex flex-col items-center justify-center p-2 rounded-xl bg-ivexi-surface/80 border-2 border-ivexi-purple"
        >
          {/* Emblema Tático Oficial de Alta Fidelidade */}
          <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-neon-yellow">
            <polygon points="60,10 105,35 95,95 60,115 25,95 15,35" fill="#140A1F" stroke="#732EB8" strokeWidth="3" />
            <polygon points="60,18 97,40 88,90 60,107 32,90 23,40" fill="#241037" stroke="#D6D65C" strokeWidth="1.5" />
            <path d="M60,30 L75,55 L45,55 Z" fill="#D6D65C" />
            <circle cx="60" cy="70" r="14" fill="#732EB8" stroke="#D6D65C" strokeWidth="2" />
            <path d="M52,70 L68,70 M60,62 L60,78" stroke="#D6D65C" strokeWidth="2" />
          </svg>
          <span className="font-rajdhani text-xs font-bold text-ivexi-neon uppercase tracking-widest mt-1">
            IVEXI GUILD
          </span>
        </div>
      )}
    </div>
  );
};
