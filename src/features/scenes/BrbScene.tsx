import React from 'react';
import logoBadgeImg from '@/assets/images/logo-streamer-vulgomaniaco-badge.png';

export const BrbScene: React.FC = () => {
  return (
    <div className="w-[1920px] h-[1080px] bg-ivexi-dark text-ivexi-light flex flex-col items-center justify-center p-16 relative overflow-hidden select-none">
      {/* Luzes de fundo atmosféricas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-ivexi-purple/20 blur-[160px] pointer-events-none" />

      {/* Logotipo Master Oficial em Dock Tático Chanfrado com Aura E-sports */}
      <div
        data-testid="brb-mascot-animation"
        className="relative w-96 h-[420px] clip-tactical-md bg-ivexi-surface/80 border-2 border-ivexi-purple shadow-neon-border flex flex-col items-center justify-center p-6 backdrop-blur-md animate-pulse duration-1000"
      >
        <div className="absolute inset-4 rounded-full bg-ivexi-purple/30 blur-2xl pointer-events-none" />
        
        {/* Tag Superior Tática */}
        <div className="absolute -top-3 px-5 py-1 clip-tactical-sm bg-ivexi-dark border border-ivexi-neon text-xs font-rajdhani font-bold text-ivexi-neon tracking-widest uppercase shadow">
          INTERVALO • PAUSA RÁPIDA
        </div>

        {/* Master Badge Oficial (Mascote + Pedestal VulgoManiaco + Fita IVEXI) */}
        <img
          src={logoBadgeImg}
          alt="Logotipo Oficial VulgoManiaco"
          className="w-80 h-80 object-contain relative z-10 filter drop-shadow-[0_8px_24px_rgba(115,46,184,0.9)]"
        />

        {/* Indicador LED de Pausa Ativa */}
        <div className="relative z-10 mt-1 flex items-center gap-2 text-[11px] font-rajdhani font-bold text-ivexi-neon uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-ivexi-neon animate-ping" />
          A TRANSMISSÃO RETOMA EM INSTANTES
        </div>
      </div>

      {/* Texto de Status Acolhedor e Humano */}
      <div className="mt-8 text-center space-y-3 max-w-2xl">
        <h1 className="font-rajdhani text-7xl font-bold tracking-wider text-ivexi-neon drop-shadow-neon-yellow uppercase animate-pulse">
          Já Voltamos!
        </h1>
        <p className="font-inter text-lg text-ivexi-light/95 leading-relaxed">
          Pausa rápida pra buscar uma água, recarga de café e esticar as pernas. O chat tá liberado, vai trocando uma ideia aí com a galera que já volto pro combate!
        </p>
      </div>

      {/* Bloco de Conexão com a Comunidade do Discord */}
      <div className="mt-6 flex items-center gap-4 px-6 py-3 clip-tactical-pedestal bg-ivexi-surface/90 border border-ivexi-purple/80 shadow-card-glow text-sm backdrop-blur-md">
        <span className="text-xl">🦅</span>
        <span className="font-rajdhani font-bold text-white text-base">COMUNIDADE & DISCORD DO CLÃ:</span>
        <span className="font-rajdhani font-bold text-ivexi-neon text-lg tracking-wider">DISCORD.GG/IVEXI</span>
        <span className="text-xs text-ivexi-light/70">• Cole na call e jogue junto!</span>
      </div>

      {/* Rodapé Sutil */}
      <div className="absolute bottom-8 flex items-center gap-4 text-xs text-ivexi-muted font-inter">
        <span>Albion Online MMORPG</span>
        <span>•</span>
        <span>VulgoManiaco Ao Vivo</span>
        <span>•</span>
        <span>Transmissão em Pausa</span>
      </div>
    </div>
  );
};

export default BrbScene;
