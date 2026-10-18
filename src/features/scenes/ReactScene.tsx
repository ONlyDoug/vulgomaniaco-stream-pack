import React from 'react';
import logoHorizontalImg from '@/assets/images/logo-streamer-vulgomaniaco-horizontal.png';

export const ReactScene: React.FC = () => {
  return (
    <div
      data-testid="react-scene-container"
      className="w-[1920px] h-[1080px] bg-ivexi-dark text-ivexi-light p-8 relative overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Luzes de fundo atmosféricas */}
      <div className="absolute -top-40 left-1/4 w-[750px] h-[750px] rounded-full bg-ivexi-purple/20 blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[650px] h-[650px] rounded-full bg-ivexi-surface/50 blur-[160px] pointer-events-none" />

      {/* Cabeçalho Oficial (h ~ 75px) */}
      <header className="z-10 flex items-center justify-between border-b border-ivexi-purple/50 pb-3">
        <div className="flex items-center gap-4">
          <img
            src={logoHorizontalImg}
            alt="VulgoManiaco Logo Horizontal"
            className="h-14 object-contain filter drop-shadow-neon-yellow"
          />
          <div className="h-7 w-[1px] bg-ivexi-purple/60" />
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <span className="font-rajdhani text-xl font-bold uppercase tracking-wider text-ivexi-neon">
              REACT & VOD REVIEW • ANÁLISE TÁTICA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 clip-tactical-sm bg-ivexi-surface border border-ivexi-purple text-xs font-rajdhani font-bold text-white uppercase tracking-wider">
            <span>⚔️ ZvZ & BLACK ZONE REVIEW</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 clip-tactical-sm bg-ivexi-dark border border-ivexi-neon text-xs font-rajdhani font-bold text-ivexi-neon uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-ivexi-neon animate-pulse" />
            DISCORD.GG/S246XDGP7Q
          </div>
        </div>
      </header>

      {/* Corpo Principal (Layout Cinema: Vídeo 1380x776 à esquerda + Coluna lateral 440px à direita) */}
      <main className="z-10 flex items-start justify-between gap-6 my-auto h-[860px]">
        {/* Lado Esquerdo: Área Principal de Vídeo / Conteúdo (1380 × 776 px) */}
        <div className="flex flex-col justify-between h-full w-[1380px]">
          {/* Moldura Tática de Vídeo 16:9 */}
          <div
            data-testid="react-content-frame"
            className="relative w-[1380px] h-[776px] clip-tactical-md bg-[#140A1F]/40 border-2 border-ivexi-purple/90 shadow-card-glow overflow-hidden"
          >
            {/* Cantoneiras neon */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-ivexi-neon" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-ivexi-neon" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-ivexi-purple" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-ivexi-purple" />

            {/* Tag Superior de Análise */}
            <div className="absolute top-4 left-6 px-3 py-1 clip-tactical-sm bg-ivexi-dark/90 border border-ivexi-purple text-xs font-rajdhani font-bold text-ivexi-light uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-ivexi-neon">ANALISANDO CONTEÚDO</span>
              <span className="text-ivexi-muted">• 1080p 60 FPS</span>
            </div>

            {/* Marcador transparente para fonte de janela/vídeo do OBS */}
            <div className="w-full h-full bg-transparent flex flex-col items-center justify-center text-ivexi-muted/30 font-rajdhani text-2xl tracking-widest space-y-2 pointer-events-none">
              <div className="w-16 h-16 rounded-full border border-ivexi-purple/30 flex items-center justify-center text-3xl text-ivexi-neon/40">
                ▶
              </div>
              <span>[ ÁREA DE CAPTURA DO VÍDEO / YOUTUBE / NAVEGADOR ]</span>
              <span className="text-xs font-inter text-ivexi-muted/30 tracking-normal">
                Alinhe a janela de exibição de lutas e vídeos exatamente nesta moldura (1380 × 776 px)
              </span>
            </div>
          </div>

          {/* Ticker de Eventos Recentes abaixo do vídeo */}
          <div className="mt-3 px-6 py-2.5 clip-tactical-sm bg-ivexi-surface/90 border border-ivexi-purple/80 shadow-card-glow flex items-center justify-between text-xs font-inter">
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

        {/* Lado Direito: Coluna Lateral (440px) com Câmera no topo e Chat abaixo */}
        <div className="flex flex-col justify-between h-full w-[440px]">
          {/* 1. Moldura da Webcam do Streamer 16:9 (440 × 248 px) */}
          <div
            data-testid="react-webcam-frame"
            className="relative w-[440px] h-[248px] clip-tactical-md bg-[#140A1F]/50 border-2 border-ivexi-purple/90 shadow-card-glow overflow-hidden"
          >
            {/* Cantoneiras neon */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-ivexi-neon" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-ivexi-neon" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-ivexi-purple" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-ivexi-purple" />

            {/* Pedestal do Streamer */}
            <div className="absolute bottom-3 left-4 px-3 py-1 clip-tactical-pedestal bg-ivexi-dark/95 border border-ivexi-neon text-xs font-rajdhani font-bold text-ivexi-neon uppercase tracking-wider">
              VULGOMANIACO • AO VIVO
            </div>

            {/* Área transparente para a câmera do OBS */}
            <div className="w-full h-full bg-transparent flex items-center justify-center text-ivexi-muted/40 font-rajdhani text-sm tracking-widest">
              [ WEBCAM OBS 16:9 ]
            </div>
          </div>

          {/* 2. Caixa de Chat da Live (440 × 580 px) */}
          <div
            data-testid="react-chat-box"
            className="w-[440px] h-[585px] clip-tactical-md bg-ivexi-surface/85 border-2 border-ivexi-purple/90 shadow-card-glow p-4 flex flex-col justify-between backdrop-blur-md"
          >
            {/* Cabeçalho do Chat */}
            <div className="flex items-center justify-between border-b border-ivexi-purple/60 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">💬</span>
                <span className="font-rajdhani text-base font-bold text-ivexi-neon uppercase tracking-wider">
                  CHAT DA LIVE
                </span>
              </div>
              <span className="text-[10px] uppercase font-inter text-ivexi-neon bg-ivexi-dark/90 px-2 py-0.5 rounded border border-ivexi-neon/30">
                REACT AO VIVO
              </span>
            </div>

            {/* Espaço transparente para o widget de chat do OBS/Twitch */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-ivexi-muted/50 font-rajdhani text-base space-y-2">
              <div className="w-10 h-10 rounded-full border border-ivexi-purple/40 flex items-center justify-center text-ivexi-neon text-lg">
                💬
              </div>
              <span>[ WIDGET DE CHAT DA TWITCH ]</span>
              <span className="text-[11px] font-inter text-ivexi-muted/40 leading-relaxed">
                Adicione a fonte de navegador do chat da Twitch alinhada nesta janela
              </span>
            </div>

            {/* Rodapé do Chat */}
            <div className="pt-2.5 border-t border-ivexi-purple/40 text-center text-[11px] font-inter text-ivexi-muted">
              Mande suas opiniões no chat e envie jogadas em <span className="text-ivexi-neon">#🎬-clips-e-momentos</span>!
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé Geral da Cena (h ~ 45px) */}
      <footer className="z-10 flex items-center justify-between text-xs font-inter text-ivexi-muted border-t border-ivexi-purple/40 pt-2.5">
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

export default ReactScene;
