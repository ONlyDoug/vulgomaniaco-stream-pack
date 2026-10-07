import React, { useState, useEffect } from 'react';
import { FacecamFrame } from './FacecamFrame';
import { AntiSnipeShield } from './AntiSnipeShield';

export interface GameplayOverlayProps {
  channelName?: string;
  antiSnipeActive?: boolean;
}

export const GameplayOverlay: React.FC<GameplayOverlayProps> = ({
  channelName = 'VulgoManiaco',
  antiSnipeActive: initialAntiSnipe = true,
}) => {
  const [isAntiSnipeActive, setIsAntiSnipeActive] = useState<boolean>(initialAntiSnipe);

  // Sincroniza caso a prop mude
  useEffect(() => {
    setIsAntiSnipeActive(initialAntiSnipe);
  }, [initialAntiSnipe]);

  // Sincronização via BroadcastChannel para comandos vindos do /control
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('vulgomaniaco_obs_channel');
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'TOGGLE_ANTI_SNIPE') {
          setIsAntiSnipeActive((prev) => (event.data.payload !== undefined ? event.data.payload : !prev));
        }
      };
      channel.addEventListener('message', handleMessage);
      return () => {
        channel.removeEventListener('message', handleMessage);
        channel.close();
      };
    }
  }, []);

  return (
    <div className="obs-canvas-1080p select-none pointer-events-none">
      {/* Escudo Anti-Snipe no Minimapa de Albion Online (Canto Inferior Direito) */}
      <AntiSnipeShield active={isAntiSnipeActive} />

      {/* Conjunto Facecam + Identificação do Canal (Canto Inferior Esquerdo) */}
      <div className="absolute bottom-[88px] left-[28px] flex flex-col items-start w-[388px] filter drop-shadow-[0_10px_25px_rgba(20,10,31,0.9)]">
        {/* Moldura de Webcam 16:9 Limpa e Perfeitamente Simétrica */}
        <FacecamFrame />

        {/* Placa Tática de Identificação (Pedestal Perfeitamente Alinhado e Simétrico) */}
        <div className="w-full -mt-[2px] flex items-center justify-between px-4 py-2 bg-ivexi-dark/95 border-b-2 border-l-2 border-r-2 border-ivexi-purple/80 rounded-b-md shadow-card-glow backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <span className="font-rajdhani text-2xl font-bold tracking-wider uppercase text-ivexi-neon drop-shadow-neon-yellow">
              {channelName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-ivexi-neon animate-ping" />
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-ivexi-surface border border-ivexi-purple text-[10px] font-rajdhani font-bold tracking-wider text-ivexi-light uppercase">
            ALBION ONLINE <span className="text-ivexi-neon">•</span> GUILDA IVEXI
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameplayOverlay;
