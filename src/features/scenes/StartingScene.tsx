import React, { useState, useEffect } from 'react';
import logoBadgeImg from '@/assets/images/logo-streamer-vulgomaniaco-badge.png';

const SOCIAL_LINKS = [
  { platform: 'Twitch Oficial', handle: 'twitch.tv/vulgoomaniaco', color: '#9146FF', icon: '🟣' },
  { platform: 'Guilda IVEXI', handle: 'discord.gg/s246XdGp7q (Discord Oficial)', color: '#732EB8', icon: '🦅' },
  { platform: 'Transmissão Ao Vivo', handle: 'twitch.tv/vulgoomaniaco • Siga o canal!', color: '#9146FF', icon: '⚡' },
];

export const StartingScene: React.FC = () => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300); // 5 minutos padrão
  const [currentSocialIndex, setCurrentSocialIndex] = useState<number>(0);

  // Contagem regressiva do timer segundo a segundo
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Alternância do carrossel a cada 8 segundos
  useEffect(() => {
    const socialInterval = setInterval(() => {
      setCurrentSocialIndex((prev) => (prev + 1) % SOCIAL_LINKS.length);
    }, 8000);
    return () => clearInterval(socialInterval);
  }, []);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const currentSocial = SOCIAL_LINKS[currentSocialIndex];

  return (
    <div className="w-[1920px] h-[1080px] bg-ivexi-dark text-ivexi-light flex flex-col items-center justify-between p-16 relative overflow-hidden select-none">
      {/* Luzes de fundo atmosféricas em roxo corvo e preto blackzone */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-ivexi-purple/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-ivexi-surface/40 blur-[140px] pointer-events-none" />

      {/* Cabeçalho com identificação da transmissão */}
      <header className="z-10 flex flex-col items-center space-y-2">
        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-ivexi-surface/80 border border-ivexi-purple/50 text-xs font-inter tracking-widest uppercase text-ivexi-muted">
          <span>ALBION ONLINE</span>
          <span className="text-ivexi-neon">•</span>
          <span>VULGOMANIACO & GUILDA IVEXI</span>
        </div>
        <h1 className="font-rajdhani text-6xl font-bold tracking-wider text-ivexi-neon drop-shadow-neon-yellow uppercase">
          A Transmissão Começará Em Breve
        </h1>
        <p className="font-inter text-lg text-ivexi-light/90">
          Chega mais, pega sua água e se ajeita na cadeira que a live já vai começar!
        </p>
      </header>

      {/* Centro: Escudo Tático Oficial de VulgoManiaco e Temporizador */}
      <main className="z-10 flex flex-col items-center my-auto space-y-6">
        {/* Logotipo Master Badge Oficial com Aura Neon */}
        <div className="relative w-80 h-96 flex items-center justify-center filter drop-shadow-[0_10px_30px_rgba(115,46,184,0.7)]">
          <div className="absolute inset-4 rounded-full bg-ivexi-purple/30 blur-2xl pointer-events-none animate-pulse" />
          <img
            src={logoBadgeImg}
            alt="Logotipo Oficial VulgoManiaco"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_4px_16px_rgba(214,214,92,0.5)]"
          />
        </div>

        {/* Banner do Tópico de Albion da Live */}
        <div className="px-6 py-1.5 clip-tactical-sm bg-ivexi-surface/90 border border-ivexi-neon/80 text-xs font-rajdhani font-bold tracking-widest text-ivexi-neon uppercase shadow-card-glow">
          ⚔️ COMBATE BLACK ZONE & ROAMING • RESENHA COM A GUILDA
        </div>

        {/* Temporizador Regressivo MM:SS em Moldura Tática */}
        <div className="flex flex-col items-center px-8 py-3 clip-tactical-md bg-ivexi-dark/90 border-2 border-ivexi-purple shadow-neon-border backdrop-blur-md">
          <div
            data-testid="countdown-timer"
            className="font-rajdhani text-7xl font-bold tracking-widest text-ivexi-light drop-shadow-neon-yellow"
          >
            {formatTime(secondsRemaining)}
          </div>
          <span className="text-[11px] uppercase tracking-widest text-ivexi-muted font-inter mt-0.5">
            TEMPO RESTANTE PARA O INÍCIO DA LIVE
          </span>
        </div>
      </main>

      {/* Rodapé: Carrossel de Redes Sociais */}
      <footer className="z-10 w-full max-w-2xl flex flex-col items-center space-y-3">
        <div
          data-testid="socials-carousel"
          className="w-full py-3 px-6 rounded-2xl bg-ivexi-surface/90 border border-ivexi-purple/60 shadow-card-glow flex items-center justify-between transition-all duration-500"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentSocial.icon}</span>
            <span className="font-rajdhani text-lg font-bold uppercase text-ivexi-neon">
              {currentSocial.platform}
            </span>
          </div>
          <span className="font-inter text-base font-medium text-ivexi-light">
            {currentSocial.handle}
          </span>
        </div>

        {/* Indicadores de slide do carrossel */}
        <div className="flex gap-2">
          {SOCIAL_LINKS.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSocialIndex ? 'w-6 bg-ivexi-neon' : 'w-2 bg-ivexi-muted/40'
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default StartingScene;
