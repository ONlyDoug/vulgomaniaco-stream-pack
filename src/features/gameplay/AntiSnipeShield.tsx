import React from 'react';
import { MascotBadge } from './MascotBadge';

export interface AntiSnipeShieldProps {
  active?: boolean;
}

export const AntiSnipeShield: React.FC<AntiSnipeShieldProps> = ({ active = false }) => {
  if (!active) {
    return null;
  }

  return (
    <div
      data-testid="anti-snipe-shield"
      className="absolute bottom-4 right-4 w-[280px] h-[330px] bg-ivexi-dark/95 clip-tactical-md border-2 border-ivexi-purple/90 shadow-card-glow p-3.5 flex flex-col items-center justify-between text-center z-50 backdrop-blur-md overflow-hidden"
    >
      {/* 1. Tag de Status Discreta no Topo */}
      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-ivexi-surface border border-ivexi-neon/80 text-[10px] font-rajdhani font-bold text-ivexi-neon tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-ivexi-neon animate-ping" />
        ANTI-SNIPE ATIVO • MINIMAPA
      </div>

      {/* 2. Logotipo Master Oficial no Centro */}
      <div className="my-auto flex items-center justify-center">
        <MascotBadge className="relative w-36 h-40 flex items-center justify-center filter drop-shadow-[0_4px_14px_rgba(214,214,92,0.5)]" />
      </div>

      {/* 3. QR Code e Informações Essenciais em Bloco Único Abaixo do Logo */}
      <div
        data-testid="anti-snipe-qr"
        className="w-full px-3 py-2 rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/80 shadow-card-glow flex items-center gap-3"
      >
        {/* QR Code com borda e alto contraste para leitura via smartphone */}
        <div className="relative w-12 h-12 p-1 bg-white rounded-lg flex-shrink-0 flex items-center justify-center shadow">
          <img
            src="/src/assets/images/discord-qr.png"
            alt="QR Code Discord"
            className="w-full h-full object-contain"
          />
          <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-ivexi-neon" />
          <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-ivexi-neon" />
        </div>

        {/* Informações diretas e link curto */}
        <div className="flex-1 text-left space-y-0.5 overflow-hidden">
          <span className="text-[10px] font-rajdhani font-bold text-ivexi-neon tracking-wider uppercase block truncate">
            DISCORD DO CLÃ
          </span>
          <p className="font-inter text-[10px] text-white/90 leading-tight truncate">
            Aponte a câmera e entre na call!
          </p>
          <span className="font-rajdhani text-[11px] font-bold text-ivexi-light tracking-wide block truncate">
            DISCORD.GG/IVEXI
          </span>
        </div>
      </div>
    </div>
  );
};
