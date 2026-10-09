import React from 'react';
import { StreamAlert } from './useAlertQueue';
import avatarLogoImg from '@/assets/images/logo-streamer-vulgomaniaco-avatar.png';
import chibiMascotImg from '@/assets/images/corvo-streamer-chibi.png';

export interface AlertCardProps {
  alert: StreamAlert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const getTitle = () => {
    switch (alert.type) {
      case 'follow':
        return 'NOVO SEGUIDOR NO CANAL!';
      case 'sub':
        return 'NOVO INSCRITO NO CANAL!';
      case 'donation':
        return `DOAÇÃO DE ${alert.amount || 'R$ 10,00'}!`;
      case 'raid':
        return 'RAID NO CANAL VULGOMANIACO!';
      default:
        return 'NOTIFICAÇÃO!';
    }
  };

  const getBorderColor = () => {
    switch (alert.type) {
      case 'sub':
        return 'border-ivexi-neon shadow-neon-border';
      case 'donation':
        return 'border-[#F5A623] shadow-[0_0_20px_rgba(245,166,35,0.6)]';
      case 'raid':
        return 'border-[#FF3B30] shadow-[0_0_20px_rgba(255,59,48,0.6)]';
      case 'follow':
      default:
        return 'border-ivexi-purple shadow-card-glow';
    }
  };

  const getTagColor = () => {
    switch (alert.type) {
      case 'sub':
        return 'bg-ivexi-neon text-ivexi-dark';
      case 'donation':
        return 'bg-[#F5A623] text-black';
      case 'raid':
        return 'bg-[#FF3B30] text-white';
      case 'follow':
      default:
        return 'bg-ivexi-purple text-white';
    }
  };

  return (
    <div
      data-testid="alert-card"
      className={`w-[540px] clip-tactical-md bg-ivexi-dark/95 border-2 ${getBorderColor()} p-5 flex items-center gap-5 backdrop-blur-md animate-bounce duration-700`}
    >
      {/* Avatar do Mascote Chibi com Boné IVEXI */}
      <div className="relative w-20 h-20 clip-tactical-sm bg-ivexi-surface border-2 border-ivexi-purple flex items-center justify-center p-1.5 shadow-card-glow flex-shrink-0">
        <img
          src={avatarLogoImg}
          alt="Corvo Streamer"
          className="w-full h-full object-contain filter drop-shadow-neon-yellow"
          onError={(e) => {
            // Fallback para imagem base do chibi se necessário
            e.currentTarget.src = chibiMascotImg;
          }}
        />
      </div>

      {/* Conteúdo textual do alerta */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase font-rajdhani font-bold tracking-widest px-2.5 py-0.5 clip-tactical-sm ${getTagColor()}`}>
            ALERTA AO VIVO
          </span>
          <span className="text-[10px] uppercase font-rajdhani font-semibold text-ivexi-muted tracking-wider">
            CANAL VULGOMANIACO • GUILDA IVEXI
          </span>
        </div>
        <h2 className="font-rajdhani text-2xl font-bold tracking-wide text-ivexi-neon drop-shadow-neon-yellow uppercase">
          {getTitle()}
        </h2>
        <p className="font-rajdhani text-xl font-bold text-white tracking-wide">
          {alert.username}
        </p>
        {alert.message && (
          <p className="font-inter text-xs text-ivexi-light/80 italic line-clamp-2 bg-ivexi-surface/60 px-2 py-1 rounded border-l-2 border-ivexi-neon">
            "{alert.message}"
          </p>
        )}
      </div>
    </div>
  );
};
