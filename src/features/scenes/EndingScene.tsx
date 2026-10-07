import React from 'react';

export const EndingScene: React.FC = () => {
  return (
    <div className="w-[1920px] h-[1080px] bg-ivexi-dark text-ivexi-light flex flex-col items-center justify-between p-16 relative overflow-hidden select-none">
      {/* Luzes de fundo atmosféricas */}
      <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-ivexi-purple/25 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-ivexi-surface/50 blur-[150px] pointer-events-none" />

      {/* Cabeçalho */}
      <header className="z-10 text-center space-y-2">
        <h1 className="font-rajdhani text-6xl font-bold tracking-wider text-ivexi-neon drop-shadow-neon-yellow uppercase">
          Transmissão Encerrada
        </h1>
        <p className="font-inter text-2xl text-ivexi-light">
          Obrigado por assistir e jogar junto!
        </p>
      </header>

      {/* Centro: Logotipo Oficial e Bloco de Créditos Tático */}
      <main className="z-10 flex items-center justify-center gap-14 my-auto">
        <div className="w-72 h-84 flex items-center justify-center filter drop-shadow-[0_10px_25px_rgba(115,46,184,0.7)]">
          <div className="absolute inset-4 rounded-full bg-ivexi-purple/30 blur-2xl pointer-events-none" />
          <img
            src="/src/assets/images/logo-streamer-vulgomaniaco-badge.png"
            alt="Corvo Streamer Agradecendo"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_4px_16px_rgba(214,214,92,0.4)]"
          />
        </div>

        {/* Bloco de Créditos Tático */}
        <div
          data-testid="ending-credits"
          className="w-[520px] p-7 clip-tactical-md bg-ivexi-surface/90 border-2 border-ivexi-purple/80 shadow-neon-border space-y-4 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-ivexi-purple/50 pb-2.5">
            <h2 className="font-rajdhani text-2xl font-bold text-ivexi-neon uppercase tracking-wider">
              Agradecimentos Especiais
            </h2>
            <span className="px-2.5 py-0.5 clip-tactical-sm bg-ivexi-dark border border-ivexi-neon text-[10px] font-rajdhani font-bold text-ivexi-neon uppercase">
              IVEXI GUILD
            </span>
          </div>

          <div className="space-y-2.5 text-sm font-inter text-ivexi-light/90">
            <p>⚔️ A todos que colaram no chat, mandaram energia e jogaram junto com o <strong>Clã IVEXI</strong></p>
            <p>🏆 Inscritos, VIPs, apoiadores no Pix e doadores de bits que fortalecem o canal</p>
            <p>💬 Comunidade do Discord e espectadores da Twitch, YouTube e Kick</p>
          </div>

          <div className="pt-3 text-xs text-ivexi-neon font-rajdhani font-bold tracking-wider uppercase border-t border-ivexi-purple/30 flex items-center justify-between">
            <span>⚔️ PRÓXIMA LIVE: AMANHÃ ÀS 19H</span>
            <span className="text-white">DISCORD.GG/IVEXI</span>
          </div>
        </div>
      </main>

      {/* Rodapé com links de apoio */}
      <footer className="z-10 flex items-center gap-6 text-sm font-inter text-ivexi-muted">
        <span className="text-ivexi-neon font-bold">discord.gg/ivexi</span>
        <span>•</span>
        <span>twitch.tv/VulgoManiaco</span>
        <span>•</span>
        <span>youtube.com/@VulgoManiaco</span>
        <span>•</span>
        <span>kick.com/VulgoManiaco</span>
      </footer>
    </div>
  );
};

export default EndingScene;
