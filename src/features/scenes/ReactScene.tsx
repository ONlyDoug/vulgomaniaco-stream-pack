import React from 'react';
import logoBadgeImg from '@/assets/images/logo-streamer-vulgomaniaco-badge.png';

export const ReactScene: React.FC = () => {
  return (
    <div
      data-testid="react-scene-container"
      className="w-[1920px] h-[1080px] bg-transparent text-ivexi-light p-8 relative overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Máscara de Fundo SVG: Recorta furos 100% transparentes para o Vídeo e a Webcam */}
      <svg
        className="absolute inset-0 w-[1920px] h-[1080px] pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="react-cutout-mask">
            {/* Branco = Fundo escuro opaco preenchido */}
            <rect width="1920" height="1080" fill="white" />
            {/* Preto = Furo 100% transparente para captura de vídeo/conteúdo (1380x776 em x:32, y:86) */}
            <rect x="32" y="86" width="1380" height="776" rx="8" fill="black" />
            {/* Preto = Furo 100% transparente para webcam lateral (440x248 em x:1448, y:86) */}
            <rect x="1448" y="86" width="440" height="248" rx="8" fill="black" />
          </mask>
        </defs>
        {/* Camada de fundo escuro da guilda com furos recortados */}
        <g mask="url(#react-cutout-mask)">
          <rect width="1920" height="1080" fill="#140A1F" />
          <circle cx="500" cy="0" r="550" fill="#732EB8" opacity="0.3" />
          <circle cx="1600" cy="1080" r="450" fill="#2E124D" opacity="0.45" />
        </g>
      </svg>

      {/* Cabeçalho Oficial (h ~ 80px) com o Escudo Principal (Corvo sobre VulgoManiaco) */}
      <header className="z-10 flex items-center justify-between border-b border-ivexi-purple/50 pb-3">
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-ivexi-purple/40 blur-lg pointer-events-none" />
            <img
              src={logoBadgeImg}
              alt="VulgoManiaco Logo Principal"
              className="h-20 w-auto object-contain relative z-10 filter drop-shadow-[0_4px_14px_rgba(214,214,92,0.45)]"
            />
          </div>
          <div className="h-12 w-[1px] bg-ivexi-purple/60" />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎬</span>
              <span className="font-rajdhani text-2xl font-bold uppercase tracking-wider text-ivexi-neon leading-none">
                REACT & VOD REVIEW
              </span>
            </div>
            <span className="text-xs font-rajdhani font-semibold text-ivexi-muted uppercase tracking-widest mt-1">
              ANÁLISE TÁTICA DE COMBATE & CONTEÚDO • GUILDA IVEXI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 clip-tactical-sm bg-ivexi-surface border border-ivexi-purple text-xs font-rajdhani font-bold text-white uppercase tracking-wider shadow-card-glow">
            <span>⚔️ ZvZ & BLACK ZONE REVIEW</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 clip-tactical-sm bg-ivexi-dark border border-ivexi-neon text-xs font-rajdhani font-bold text-ivexi-neon uppercase tracking-wider shadow-card-glow">
            <span className="w-2 h-2 rounded-full bg-ivexi-neon animate-pulse" />
            DISCORD.GG/S246XDGP7Q
          </div>
        </div>
      </header>

      {/* Corpo Principal (Layout Cinema: Vídeo 1380x776 à esquerda + Coluna lateral 440px à direita) */}
      <main className="z-10 flex items-start justify-between gap-6 my-auto h-[860px]">
        {/* Lado Esquerdo: Área Principal de Vídeo / Conteúdo (1380 × 776 px) */}
        <div className="flex flex-col justify-between h-full w-[1380px]">
          {/* Moldura Tática de Vídeo 16:9 (100% transparente para a janela de vídeo abaixo) */}
          <div
            data-testid="react-content-frame"
            className="relative w-[1380px] h-[776px] clip-tactical-md bg-transparent border-2 border-ivexi-purple/90 shadow-card-glow overflow-hidden pointer-events-none"
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
          {/* 1. Moldura da Webcam do Streamer 16:9 (440 × 248 px - 100% transparente para a câmera abaixo) */}
          <div
            data-testid="react-webcam-frame"
            className="relative w-[440px] h-[248px] clip-tactical-md bg-transparent border-2 border-ivexi-purple/90 shadow-card-glow overflow-hidden pointer-events-none"
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
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-ivexi-muted/25 font-rajdhani text-base space-y-1.5 pointer-events-none">
              <div className="w-9 h-9 rounded-full border border-ivexi-purple/30 flex items-center justify-center text-ivexi-neon/30 text-base">
                💬
              </div>
              <span className="text-sm font-bold tracking-wider">[ ÁREA DO CHAT DA TWITCH ]</span>
              <span className="text-[10px] font-inter text-ivexi-muted/30 leading-relaxed max-w-[280px]">
                Adicione a fonte de navegador do chat (Twitch Popout ou StreamElements) alinhada nesta janela
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
