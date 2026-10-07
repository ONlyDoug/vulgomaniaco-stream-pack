import React, { useState, useEffect } from 'react';
import { GameplayOverlay } from '@/features/gameplay/GameplayOverlay';
import { StartingScene } from '@/features/scenes/StartingScene';
import { BrbScene } from '@/features/scenes/BrbScene';
import { EndingScene } from '@/features/scenes/EndingScene';
import { ChattingScene } from '@/features/scenes/ChattingScene';
import { AlertOverlay } from '@/features/alerts/AlertOverlay';
import { ControlDashboard } from '@/features/control/ControlDashboard';
import { PanelsGallery } from '@/features/panels/PanelsGallery';
import { PreviewWrapper } from '@/shared/components/PreviewWrapper';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/$/, '') || '/';
    }
    return '/';
  });

  const [antiSnipePreview, setAntiSnipePreview] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.replace(/\/$/, '') || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.replace(/\/$/, '') || '/');
  };

  const copyObsLink = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}${path}?obs=1`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(path);
      setTimeout(() => setCopiedLink(null), 2000);
    }).catch(() => {
      prompt('Copie a URL para o OBS:', fullUrl);
    });
  };

  if (currentPath === '/overlay/gameplay') {
    return (
      <PreviewWrapper
        title="Overlay de Gameplay"
        obsPath="/overlay/gameplay"
        onNavigateHome={() => navigateTo('/')}
        enableGameBackdropToggle={true}
        controls={
          <button
            onClick={() => setAntiSnipePreview((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-rajdhani font-bold uppercase transition border ${
              antiSnipePreview
                ? 'bg-ivexi-neon text-ivexi-dark border-ivexi-neon shadow-neon-border'
                : 'bg-ivexi-dark text-ivexi-muted border-ivexi-purple/40 hover:text-white'
            }`}
          >
            {antiSnipePreview ? '🛡️ Anti-Snipe: ATIVADO' : '🛡️ Testar Anti-Snipe'}
          </button>
        }
      >
        <GameplayOverlay channelName="VulgoManiaco" antiSnipeActive={antiSnipePreview} />
      </PreviewWrapper>
    );
  }

  if (currentPath === '/scenes/starting') {
    return (
      <PreviewWrapper
        title="Cena de Início (Starting Soon)"
        obsPath="/scenes/starting"
        onNavigateHome={() => navigateTo('/')}
      >
        <StartingScene />
      </PreviewWrapper>
    );
  }

  if (currentPath === '/scenes/brb') {
    return (
      <PreviewWrapper
        title="Cena de Intervalo (BRB)"
        obsPath="/scenes/brb"
        onNavigateHome={() => navigateTo('/')}
      >
        <BrbScene />
      </PreviewWrapper>
    );
  }

  if (currentPath === '/scenes/ending') {
    return (
      <PreviewWrapper
        title="Cena de Encerramento"
        obsPath="/scenes/ending"
        onNavigateHome={() => navigateTo('/')}
      >
        <EndingScene />
      </PreviewWrapper>
    );
  }

  if (currentPath === '/scenes/chatting') {
    return (
      <PreviewWrapper
        title="Cena de Just Chatting / Reunião"
        obsPath="/scenes/chatting"
        onNavigateHome={() => navigateTo('/')}
      >
        <ChattingScene />
      </PreviewWrapper>
    );
  }

  if (currentPath === '/alerts') {
    return (
      <PreviewWrapper
        title="Camada de Alertas OBS"
        obsPath="/alerts"
        onNavigateHome={() => navigateTo('/')}
      >
        <AlertOverlay />
      </PreviewWrapper>
    );
  }

  if (currentPath === '/control') {
    return (
      <div className="relative min-h-screen bg-ivexi-dark">
        <div className="px-6 py-3 bg-ivexi-surface/80 border-b border-ivexi-purple/40 flex items-center justify-between">
          <button
            onClick={() => navigateTo('/')}
            className="px-3 py-1.5 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/50 border border-ivexi-purple/60 text-xs font-rajdhani font-bold uppercase text-ivexi-light transition"
          >
            ← Voltar ao Hub
          </button>
          <span className="text-xs text-ivexi-muted font-rajdhani font-semibold">
            Painel do Streamer (Controle em Tempo Real)
          </span>
        </div>
        <ControlDashboard />
      </div>
    );
  }

  if (currentPath === '/panels') {
    return (
      <div className="relative min-h-screen bg-ivexi-dark">
        <div className="px-6 py-3 bg-ivexi-surface/80 border-b border-ivexi-purple/40 flex items-center justify-between">
          <button
            onClick={() => navigateTo('/')}
            className="px-3 py-1.5 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/50 border border-ivexi-purple/60 text-xs font-rajdhani font-bold uppercase text-ivexi-light transition"
          >
            ← Voltar ao Hub
          </button>
          <span className="text-xs text-ivexi-muted font-rajdhani font-semibold">
            Galeria de Painéis 320px Twitch & Kick
          </span>
        </div>
        <PanelsGallery />
      </div>
    );
  }

  // Hub inicial de navegação e teste para o streamer
  return (
    <div className="min-h-screen bg-ivexi-dark p-6 sm:p-8 text-ivexi-light font-inter">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="border-b border-ivexi-purple/40 pb-6 text-center space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-ivexi-surface border border-ivexi-purple text-xs font-rajdhani font-bold text-ivexi-neon uppercase tracking-wider mb-2">
            Tailscale & Rede Local Habilitados
          </div>
          <h1 className="text-4xl sm:text-5xl font-rajdhani font-bold text-ivexi-neon tracking-wide uppercase drop-shadow-neon-yellow">
            Streamer Pack | VulgoManiaco
          </h1>
          <p className="text-ivexi-muted max-w-xl mx-auto text-sm sm:text-base">
            Identidade visual inspirada na Guilda IVEXI — Albion Online (PvP, ZvZ e Black Zone)
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card: Overlay de Gameplay */}
          <div
            onClick={() => navigateTo('/overlay/gameplay')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Overlay de Gameplay (1080p)</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-dark border border-ivexi-purple text-ivexi-muted">OBS</span>
              </div>
              <p className="text-sm text-ivexi-muted">Moldura Facecam 16:9, Mascote Chibi e Escudo Anti-Snipe comutável.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Abrir Prévia →</span>
              <button
                onClick={(e) => copyObsLink(e, '/overlay/gameplay')}
                className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple border border-ivexi-purple text-ivexi-light font-rajdhani font-semibold transition"
              >
                {copiedLink === '/overlay/gameplay' ? '✓ Copiado!' : 'Copiar URL OBS'}
              </button>
            </div>
          </div>

          {/* Card: Cena de Início */}
          <div
            onClick={() => navigateTo('/scenes/starting')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Cena de Início (Starting Soon)</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-dark border border-ivexi-purple text-ivexi-muted">OBS</span>
              </div>
              <p className="text-sm text-ivexi-muted">Timer regressivo de 5 minutos e carrossel rotativo Twitch/Kick/YouTube/Discord.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Abrir Prévia →</span>
              <button
                onClick={(e) => copyObsLink(e, '/scenes/starting')}
                className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple border border-ivexi-purple text-ivexi-light font-rajdhani font-semibold transition"
              >
                {copiedLink === '/scenes/starting' ? '✓ Copiado!' : 'Copiar URL OBS'}
              </button>
            </div>
          </div>

          {/* Card: Cena de Intervalo */}
          <div
            onClick={() => navigateTo('/scenes/brb')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Cena de Intervalo (BRB)</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-dark border border-ivexi-purple text-ivexi-muted">OBS</span>
              </div>
              <p className="text-sm text-ivexi-muted">Animação suave do Corvo Streamer, aviso de pausa tática e relógio.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Abrir Prévia →</span>
              <button
                onClick={(e) => copyObsLink(e, '/scenes/brb')}
                className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple border border-ivexi-purple text-ivexi-light font-rajdhani font-semibold transition"
              >
                {copiedLink === '/scenes/brb' ? '✓ Copiado!' : 'Copiar URL OBS'}
              </button>
            </div>
          </div>

          {/* Card: Cena de Encerramento */}
          <div
            onClick={() => navigateTo('/scenes/ending')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Cena de Encerramento</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-dark border border-ivexi-purple text-ivexi-muted">OBS</span>
              </div>
              <p className="text-sm text-ivexi-muted">Créditos finais, comunidade da guilda IVEXI e agradecimentos da live.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Abrir Prévia →</span>
              <button
                onClick={(e) => copyObsLink(e, '/scenes/ending')}
                className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple border border-ivexi-purple text-ivexi-light font-rajdhani font-semibold transition"
              >
                {copiedLink === '/scenes/ending' ? '✓ Copiado!' : 'Copiar URL OBS'}
              </button>
            </div>
          </div>

          {/* Card: Cena de Just Chatting */}
          <div
            onClick={() => navigateTo('/scenes/chatting')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Cena de Just Chatting (1080p)</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-dark border border-ivexi-purple text-ivexi-muted">OBS</span>
              </div>
              <p className="text-sm text-ivexi-muted">Moldura ampla de webcam, janela de chat do OBS e ticker da guilda IVEXI.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Abrir Prévia →</span>
              <button
                onClick={(e) => copyObsLink(e, '/scenes/chatting')}
                className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple border border-ivexi-purple text-ivexi-light font-rajdhani font-semibold transition"
              >
                {copiedLink === '/scenes/chatting' ? '✓ Copiado!' : 'Copiar URL OBS'}
              </button>
            </div>
          </div>


          {/* Card: Camada de Alertas OBS */}
          <div
            onClick={() => navigateTo('/alerts')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Camada de Alertas OBS</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-dark border border-ivexi-purple text-ivexi-muted">OBS</span>
              </div>
              <p className="text-sm text-ivexi-muted">Browser source com animações neon de seguidor, sub, doação e raid.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Abrir Prévia →</span>
              <button
                onClick={(e) => copyObsLink(e, '/alerts')}
                className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple border border-ivexi-purple text-ivexi-light font-rajdhani font-semibold transition"
              >
                {copiedLink === '/alerts' ? '✓ Copiado!' : 'Copiar URL OBS'}
              </button>
            </div>
          </div>

          {/* Card: Painel de Controle */}
          <div
            onClick={() => navigateTo('/control')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Painel de Controle (/control)</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-neon/20 border border-ivexi-neon/40 text-ivexi-neon">Streamer</span>
              </div>
              <p className="text-sm text-ivexi-muted">Dashboard interativo para disparar alertas e acionar o botão Anti-Snipe.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Abrir Painel →</span>
              <span className="text-xs text-ivexi-muted">Para celular ou monitor 2</span>
            </div>
          </div>

          {/* Card: Galeria de Painéis */}
          <div
            onClick={() => navigateTo('/panels')}
            className="cursor-pointer p-5 text-left rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon hover:shadow-card-glow transition duration-200 md:col-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-rajdhani text-xl font-bold text-ivexi-neon">Galeria e Exportador de Painéis</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-ivexi-neon/20 border border-ivexi-neon/40 text-ivexi-neon">Twitch & Kick</span>
              </div>
              <p className="text-sm text-ivexi-muted">6 painéis padronizados de 320px com botão de download individual e em lote em PNG e SVG.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-neon font-rajdhani font-bold uppercase">Ver e Baixar Painéis →</span>
              <span className="text-xs text-ivexi-muted">320px exatos para o canal</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
