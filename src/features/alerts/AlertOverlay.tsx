import React from 'react';
import { useAlertQueue, StreamAlert } from './useAlertQueue';
import { AlertCard } from './AlertCard';

export const AlertOverlay: React.FC = () => {
  const { currentAlert, queue, enqueueAlert } = useAlertQueue();

  const isObs = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('obs') === '1' ||
    (navigator.userAgent && navigator.userAgent.includes('OBS/'))
  );

  const handleTestAlert = (type: StreamAlert['type']) => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type,
      username:
        type === 'follow'
          ? 'GuerreiroAlbion_99'
          : type === 'sub'
          ? 'ManiacoT8_Prime'
          : type === 'donation'
          ? 'PatronoBlackzone'
          : 'GuildaAliada_Raid',
      amount: type === 'donation' ? 'R$ 50,00' : undefined,
      message:
        type === 'donation'
          ? 'Para financiar o set 8.3 na Black Zone!'
          : type === 'sub'
          ? 'Tier 8 na Guilda IVEXI!'
          : undefined,
      durationMs: 5000,
    };
    enqueueAlert(alert);
  };

  return (
    <div
      data-testid="alert-overlay-container"
      className="obs-canvas-1080p flex items-start justify-center pt-20 pointer-events-none select-none relative"
    >
      {/* Gerenciador de fila invisível para automação e testes */}
      <div
        data-testid="alert-queue-manager"
        data-queue-length={queue.length}
        data-has-active={Boolean(currentAlert)}
        className="hidden"
      />

      {/* Exibição centralizada do alerta ativo */}
      {currentAlert && <AlertCard alert={currentAlert} />}

      {/* Cartão de Ajuda Interativo na Prévia (Oculto no OBS e quando há alerta ativo) */}
      {!isObs && !currentAlert && (
        <div className="pointer-events-auto mt-16 max-w-lg p-6 rounded-2xl bg-ivexi-surface/90 border border-ivexi-purple/60 shadow-card-glow text-center backdrop-blur-md space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-ivexi-purple/40 border border-ivexi-neon flex items-center justify-center text-2xl text-ivexi-neon animate-pulse">
            🔔
          </div>
          <div>
            <h3 className="font-rajdhani text-2xl font-bold uppercase text-ivexi-neon tracking-wide">
              Camada de Alertas Ativa
            </h3>
            <p className="text-sm text-ivexi-muted mt-1">
              Esta tela fica transparente no OBS aguardando eventos. Teste os alertas instantaneamente abaixo:
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleTestAlert('follow')}
              className="py-2 px-3 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/50 border border-ivexi-purple text-xs font-rajdhani font-bold uppercase text-ivexi-light transition"
            >
              🔔 Testar Seguidor
            </button>
            <button
              onClick={() => handleTestAlert('sub')}
              className="py-2 px-3 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/50 border border-ivexi-purple text-xs font-rajdhani font-bold uppercase text-ivexi-neon transition"
            >
              ⭐ Testar Sub
            </button>
            <button
              onClick={() => handleTestAlert('donation')}
              className="py-2 px-3 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/50 border border-ivexi-purple text-xs font-rajdhani font-bold uppercase text-green-400 transition"
            >
              💎 Testar Doação
            </button>
            <button
              onClick={() => handleTestAlert('raid')}
              className="py-2 px-3 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/50 border border-ivexi-purple text-xs font-rajdhani font-bold uppercase text-purple-300 transition"
            >
              ⚔️ Testar Raid
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertOverlay;
