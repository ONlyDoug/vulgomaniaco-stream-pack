import React, { useState, useEffect } from 'react';

export interface PreviewWrapperProps {
  title: string;
  obsPath: string;
  children: React.ReactNode;
  onNavigateHome?: () => void;
  controls?: React.ReactNode;
  enableGameBackdropToggle?: boolean;
}

export const PreviewWrapper: React.FC<PreviewWrapperProps> = ({
  title,
  obsPath,
  children,
  onNavigateHome,
  controls,
  enableGameBackdropToggle = false,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [showGameBackdrop, setShowGameBackdrop] = useState<boolean>(enableGameBackdropToggle);
  const [copied, setCopied] = useState<boolean>(false);

  const isObs = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('obs') === '1' ||
    (navigator.userAgent && navigator.userAgent.includes('OBS/'))
  );

  useEffect(() => {
    if (isObs) {
      document.documentElement.classList.add('obs-transparent');
      document.body.classList.add('obs-transparent');
    } else {
      document.documentElement.classList.remove('obs-transparent');
      document.body.classList.remove('obs-transparent');
    }

    return () => {
      document.documentElement.classList.remove('obs-transparent');
      document.body.classList.remove('obs-transparent');
    };
  }, [isObs]);

  useEffect(() => {
    if (isObs) return;

    const updateScale = () => {
      const paddingX = 32;
      const paddingY = 96; // barra superior + margens
      const availableW = Math.max(window.innerWidth - paddingX, 320);
      const availableH = Math.max(window.innerHeight - paddingY, 240);

      const scaleX = availableW / 1920;
      const scaleY = availableH / 1080;
      const calculated = Math.min(scaleX, scaleY, 1);
      setScale(calculated);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isObs]);

  const handleCopyObsUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}${obsPath}?obs=1`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // fallback
      prompt('Copie a URL para o OBS:', fullUrl);
    });
  };

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  // Se executado dentro do OBS Studio ou com flag ?obs=1, renderiza sem moldura nem barras
  if (isObs) {
    return (
      <div className="w-[1920px] h-[1080px] relative overflow-hidden bg-transparent select-none">
        {children}
      </div>
    );
  }

  // Modo Navegador (Prévia interativa responsiva)
  return (
    <div className="min-h-screen bg-ivexi-dark text-ivexi-light font-inter flex flex-col items-center justify-start p-3 sm:p-4 select-none">
      {/* Barra de Ferramentas da Prévia */}
      <header className="w-full max-w-7xl flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 mb-3 rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 shadow-card-glow backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={handleGoHome}
            className="px-3 py-1.5 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/40 border border-ivexi-purple/60 text-xs font-rajdhani font-bold uppercase text-ivexi-light transition"
          >
            ← Voltar ao Hub
          </button>
          <div className="flex items-center gap-2">
            <h1 className="font-rajdhani text-lg sm:text-xl font-bold uppercase text-ivexi-neon">
              {title}
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-ivexi-dark border border-ivexi-neon/40 text-ivexi-neon">
              1080p ({Math.round(scale * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {enableGameBackdropToggle && (
            <button
              onClick={() => setShowGameBackdrop((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-rajdhani font-bold uppercase transition border ${
                showGameBackdrop
                  ? 'bg-ivexi-purple text-white border-ivexi-neon'
                  : 'bg-ivexi-dark text-ivexi-muted border-ivexi-purple/40 hover:text-white'
              }`}
            >
              {showGameBackdrop ? '🎮 Fundo: Simulação Jogo' : '⬛ Fundo: Escuro Puro'}
            </button>
          )}

          {controls}

          <button
            onClick={handleCopyObsUrl}
            className="px-3 py-1.5 rounded-lg bg-ivexi-neon hover:bg-ivexi-neon/90 text-ivexi-dark text-xs font-rajdhani font-bold uppercase transition shadow-neon-border"
          >
            {copied ? '✓ Link OBS Copiado!' : '📋 Copiar Link OBS (?obs=1)'}
          </button>
        </div>
      </header>

      {/* Área da Tela 1920x1080 com Escalonamento Responsivo */}
      <main
        style={{
          width: `${1920 * scale}px`,
          height: `${1080 * scale}px`,
        }}
        className="relative overflow-hidden rounded-xl border border-ivexi-purple/60 shadow-card-glow transition-all duration-150"
      >
        {/* Fundo simulado de jogo ou grade escura para prévia */}
        {showGameBackdrop ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#12081d] via-[#1b0d2a] to-[#0c0514] pointer-events-none">
            {/* Grade tática sutil */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(#732EB8 1px, transparent 1px), radial-gradient(#D6D65C 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
              }}
            />
            {/* Simulação de interface tática do Albion no fundo da prévia */}
            <div className="absolute top-4 left-6 text-xs text-ivexi-muted/40 font-mono">
              [Albion Online • Prévia de Transmissão 1920x1080]
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-ivexi-dark pointer-events-none" />
        )}

        {/* Canvas 1920x1080 escalado */}
        <div
          style={{
            width: '1920px',
            height: '1080px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="relative pointer-events-auto"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default PreviewWrapper;
