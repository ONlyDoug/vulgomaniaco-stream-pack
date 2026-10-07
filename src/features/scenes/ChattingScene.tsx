import React from 'react';
import logoHorizontalImg from '@/assets/images/logo-streamer-vulgomaniaco-horizontal.png';

export const ChattingScene: React.FC = () => {
  return (
    <div
      data-testid="chatting-scene-container"
      className="w-[1920px] h-[1080px] bg-ivexi-dark text-ivexi-light p-10 relative overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Luzes de fundo atmosféricas */}
      <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] rounded-full bg-ivexi-purple/20 blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-ivexi-surface/50 blur-[150px] pointer-events-none" />

      {/* Cabeçalho com Logotipo Horizontal e Status da Sessão */}
      <header className="z-10 flex items-center justify-between border-b border-ivexi-purple/50 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={logoHorizontalImg}
            alt="VulgoManiaco Logo Horizontal"
            className="h-16 object-contain filter drop-shadow-neon-yellow"
          />
          <div className="h-8 w-[1px] bg-ivexi-purple/60" />
          <span className="font-rajdhani text-lg font-bold uppercase tracking-widest text-ivexi-neon">
            JUST CHATTING & ESTRATÉGIA DE GUILDA
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 clip-tactical-sm bg-ivexi-surface border border-ivexi-purple text-xs font-rajdhani font-bold text-white uppercase">
            <span>⚔️ ZvZ & BLACK ZONE REVIEW</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 clip-tactical-sm bg-ivexi-dark border border-ivexi-neon text-xs font-rajdhani font-bold text-ivexi-neon uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-ivexi-neon animate-pulse" />
            DISCORD.GG/S246XDGP7Q
          </div>
        </div>
      </header>

      {/* Grade Principal: Moldura Facecam Grande + Janela de Navegador/Albion + Caixa de Chat */}
      <main className="z-10 grid grid-cols-12 gap-8 my-auto h-[780px]">
        {/* Lado Esquerdo: Câmera Principal do Streamer (Col 8) */}
        <div className="col-span-8 flex flex-col justify-between">
          {/* Moldura de Câmera Principal 16:9 */}
          <div
            data-testid="chatting-webcam-frame"
            className="relative w-full h-[640px] clip-tactical-md bg-[#140A1F]/50 border-2 border-ivexi-purple/90 shadow-card-glow overflow-hidden"
          >
            {/* Cantoneiras neon */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-ivexi-neon" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-ivexi-neon" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-ivexi-purple" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-ivexi-purple" />

            {/* Tag do Streamer */}
            <div className="absolute bottom-4 left-6 px-4 py-1.5 clip-tactical-pedestal bg-ivexi-dark/90 border border-ivexi-neon text-sm font-rajdhani font-bold text-ivexi-neon uppercase">
              VULGOMANIACO • AO VIVO
            </div>

            {/* Área transparente para fonte de câmera OBS */}
            <div className="w-full h-full bg-transparent flex items-center justify-center text-ivexi-muted/40 font-rajdhani text-2xl tracking-widest">
              [ ÁREA DE CAPTURA WEBCAM OBS ]
            </div>
          </div>

          {/* Barra de Ticker de Eventos Recentes */}
          <div className="mt-4 px-6 py-2.5 clip-tactical-sm bg-ivexi-surface/90 border border-ivexi-purple/80 shadow-card-glow flex items-center justify-between text-xs font-inter">
            <div className="flex items-center gap-2 text-ivexi-light">
              <span className="text-ivexi-neon font-bold">ÚLTIMO SUB:</span>
              <span>Lord_Blackzone (Tier 8)</span>
            </div>
            <div className="flex items-center gap-2 text-ivexi-light">
              <span className="text-ivexi-neon font-bold">MAIOR DOAÇÃO:</span>
              <span>GuerreiroPvP (R$ 100,00)</span>
            </div>
            <div className="flex items-center gap-2 text-ivexi-light">
              <span className="text-ivexi-neon font-bold">META DA LIVE:</span>
              <span>45 / 50 Guerreiros</span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Caixa de Chat da Live (Col 4) */}
        <div className="col-span-4 flex flex-col">
          <div
            data-testid="chatting-chat-box"
            className="w-full h-full clip-tactical-md bg-ivexi-surface/80 border-2 border-ivexi-purple/90 shadow-card-glow p-5 flex flex-col justify-between backdrop-blur-md"
          >
            {/* Cabeçalho da Caixa de Chat */}
            <div className="flex items-center justify-between border-b border-ivexi-purple/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <span className="font-rajdhani text-lg font-bold text-ivexi-neon uppercase tracking-wider">
                  CHAT DA TRANSMISSÃO
                </span>
              </div>
              <span className="text-[10px] uppercase font-inter text-ivexi-muted bg-ivexi-dark px-2 py-0.5 rounded">
                AO VIVO
              </span>
            </div>

            {/* Espaço transparente para widget de chat do OBS */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-ivexi-muted/50 font-rajdhani text-lg space-y-2">
              <div className="w-12 h-12 rounded-full border border-ivexi-purple/40 flex items-center justify-center text-ivexi-neon">
                💬
              </div>
              <span>[ WIDGET DE CHAT DA TWITCH ]</span>
              <span className="text-xs font-inter text-ivexi-muted/40">
                Alinhe a fonte de navegador do chat da Twitch nesta janela
              </span>
            </div>

            {/* Rodapé da Caixa de Chat */}
            <div className="pt-3 border-t border-ivexi-purple/40 text-center text-xs font-inter text-ivexi-muted">
              Digite no chat da Twitch e participe das raids da guilda!
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé Geral da Cena */}
      <footer className="z-10 flex items-center justify-between text-xs font-inter text-ivexi-muted border-t border-ivexi-purple/40 pt-3">
        <span>Albion Online MMORPG • Transmissão Oficial VulgoManiaco</span>
        <div className="flex items-center gap-6">
          <span className="text-ivexi-neon font-bold">twitch.tv/vulgoomaniaco</span>
          <span>•</span>
          <span className="text-white font-bold">discord.gg/s246XdGp7q</span>
          <span>•</span>
          <span className="text-ivexi-light/80">GUILDA IVEXI</span>
        </div>
      </footer>
    </div>
  );
};

export default ChattingScene;
