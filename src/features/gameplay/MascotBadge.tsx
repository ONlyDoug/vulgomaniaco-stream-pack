import React, { useState } from 'react';

export interface MascotBadgeProps {
  imageSrc?: string;
  className?: string;
}

export const MascotBadge: React.FC<MascotBadgeProps> = ({
  imageSrc = '/src/assets/images/logo-streamer-vulgomaniaco-badge.png',
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
        <svg
          data-testid="mascot-fallback-svg"
          viewBox="0 0 100 100"
          className="w-full h-full fill-current text-ivexi-purple drop-shadow-neon-yellow"
        >
          {/* Silhueta estilizada do corvo com olho neon */}
          <polygon points="50,10 80,40 70,75 30,75 20,40" fill="#241037" stroke="#732EB8" strokeWidth="3" />
          <path d="M50,15 L75,40 L65,70 L35,70 L25,40 Z" fill="#140A1F" />
          {/* Bico afiado */}
          <polygon points="50,45 65,55 50,65" fill="#D6D65C" />
          {/* Olho com brilho neon */}
          <circle cx="42" cy="38" r="4" fill="#FAFAFA" />
          <circle cx="43" cy="38" r="2" fill="#D6D65C" />
          {/* Emblema ivexi gravado */}
          <path d="M50,28 L56,38 L44,38 Z" fill="#732EB8" />
        </svg>
      )}
    </div>
  );
};
