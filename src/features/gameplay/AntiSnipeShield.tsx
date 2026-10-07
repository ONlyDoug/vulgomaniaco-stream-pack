import React from 'react';
import { MascotBadge } from './MascotBadge';
import { DISCORD_QR_DATA_URI } from './discordQrDataUri';

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
      className="absolute bottom-3.5 right-3.5 w-[404px] h-[388px] bg-ivexi-dark/95 clip-tactical-md border-2 border-ivexi-purple/90 shadow-card-glow p-4 flex flex-col items-center justify-between text-center z-50 backdrop-blur-md overflow-hidden"
    >
      {/* 1. Tag de Status Discreta no Topo */}
      <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivexi-surface border border-ivexi-neon/80 text-[11px] font-rajdhani font-bold text-ivexi-neon tracking-wider uppercase">
        <span className="w-2 h-2 rounded-full bg-ivexi-neon animate-ping" />
        ANTI-SNIPE ATIVO • MINIMAPA DE ALBION
      </div>

      {/* 2. Logotipo Master Oficial no Centro */}
      <div className="my-auto flex items-center justify-center">
        <MascotBadge className="relative w-48 h-52 flex items-center justify-center filter drop-shadow-[0_6px_20px_rgba(214,214,92,0.5)]" />
      </div>

      {/* 3. QR Code e Informações Essenciais em Bloco Único Abaixo do Logo */}
      <div
        data-testid="anti-snipe-qr"
        className="w-full px-4 py-2.5 rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/80 shadow-card-glow flex items-center gap-3.5"
      >
        {/* QR Code com borda e alto contraste embutido em Base64 (0ms latência) */}
        <div className="relative w-14 h-14 p-1 bg-white rounded-lg flex-shrink-0 flex items-center justify-center shadow">
          <img
            src={DISCORD_QR_DATA_URI}
            alt="QR Code Discord"
            className="w-full h-full object-contain"
          />
          <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-ivexi-neon" />
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-ivexi-neon" />
        </div>

        {/* Informações diretas e link curto */}
        <div className="flex-1 text-left space-y-0.5 overflow-hidden">
          <span className="text-[11px] font-rajdhani font-bold text-ivexi-neon tracking-wider uppercase block truncate">
            DISCORD OFICIAL DO CLÃ
          </span>
          <p className="font-inter text-[11px] text-white/90 leading-tight truncate">
            Aponte a câmera e entre na call da guilda!
          </p>
          <span className="font-rajdhani text-[13px] font-bold text-ivexi-light tracking-wide block truncate">
            DISCORD.GG/IVEXI
          </span>
        </div>
      </div>
    </div>
  );
};
