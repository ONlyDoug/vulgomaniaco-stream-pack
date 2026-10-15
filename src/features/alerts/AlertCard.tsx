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
        switch (alert.subType) {
          case 'tier1':
            return 'NOVO INSCRITO TIER 1!';
          case 'tier2':
            return 'NOVO INSCRITO TIER 2 (SOLDADO)!';
          case 'tier3':
            return 'NOVO INSCRITO TIER 3 (IMPERADOR)!';
          case 'prime':
            return 'INSCRIÇÃO PRIME GAMING!';
          case 'resub':
            return 'RENOVAÇÃO DE INSCRIÇÃO!';
          case 'gift':
            return 'SUB DE PRESENTE!';
          case 'subbomb':
            return alert.giftCount
              ? `COMBO DE ${alert.giftCount} SUBS!`
              : 'COMBO DE SUBS DA GUILDA!';
          default:
            return 'NOVO INSCRITO NO CANAL!';
        }
      case 'donation':
        return `DOAÇÃO DE ${alert.amount || 'R$ 10,00'}!`;
      case 'cheer': {
        const bits = alert.bitsAmount || (alert.amount ? parseInt(alert.amount, 10) : 100);
        if (bits >= 5000) {
          return `OVERCHARGE DE ${bits.toLocaleString('pt-BR')} BITS!`;
        }
        return `${bits.toLocaleString('pt-BR')} BITS NO CANAL!`;
      }
      case 'raid':
        return 'RAID NO CANAL VULGOMANIACO!';
      case 'hypetrain':
        if (alert.hypeStatus === 'complete') {
          return 'TREM DO HYPE CONCLUÍDO!';
        }
        if (alert.hypeStatus === 'levelup') {
          return `TREM DO HYPE SUBIU PARA NÍVEL ${alert.hypeLevel || 2}!`;
        }
        return `TREM DO HYPE INICIADO (NÍVEL ${alert.hypeLevel || 1})!`;
      default:
        return 'NOTIFICAÇÃO!';
    }
  };

  const getTagText = () => {
    switch (alert.type) {
      case 'follow':
        return 'NOVO SEGUIDOR';
      case 'sub':
        switch (alert.subType) {
          case 'tier1':
            return 'INSCRITO T1';
          case 'tier2':
            return 'INSCRITO T2';
          case 'tier3':
            return 'INSCRITO T3';
          case 'prime':
            return 'PRIME GAMING';
          case 'resub':
            return alert.months ? `${alert.months} MESES DE GUILDA` : 'RENOVAÇÃO';
          case 'gift':
            return 'PRESENTE DA GUILDA';
          case 'subbomb':
            return alert.giftCount ? `💣 ${alert.giftCount} SUBS EM LOTE` : '💣 SUB BOMB';
          default:
            return 'NOVO INSCRITO';
        }
      case 'donation':
        return 'APOIO PIX / TIP';
      case 'cheer': {
        const bits = alert.bitsAmount || (alert.amount ? parseInt(alert.amount, 10) : 100);
        if (bits >= 5000) return '⚡ BITS OVERCHARGE';
        if (bits >= 1000) return '⭐ BITS OURO';
        if (bits >= 500) return '💎 BITS CIANO';
        return '🔮 BITS AMETISTA';
      }
      case 'raid':
        return alert.viewersCount ? `⚔️ RAID • ${alert.viewersCount} GUERREIROS` : '⚔️ INVASÃO / RAID';
      case 'hypetrain':
        return alert.hypeStatus === 'complete'
          ? '🚂 HYPE TRAIN • VITÓRIA'
          : `🚂 HYPE TRAIN • NÍVEL ${alert.hypeLevel || 1}`;
      default:
        return 'ALERTA AO VIVO';
    }
  };

  const getBorderColor = () => {
    switch (alert.type) {
      case 'sub':
        if (alert.subType === 'subbomb') {
          return 'border-[#FF3B30] shadow-[0_0_35px_rgba(255,59,48,0.85)]';
        }
        if (alert.subType === 'tier3') {
          return 'border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.75)]';
        }
        if (alert.subType === 'tier2') {
          return 'border-[#5CE1E6] shadow-[0_0_25px_rgba(92,225,230,0.65)]';
        }
        if (alert.subType === 'prime') {
          return 'border-[#9146FF] shadow-[0_0_25px_rgba(145,70,255,0.7)]';
        }
        return 'border-ivexi-neon shadow-neon-border';

      case 'donation':
        return 'border-[#00F5A0] shadow-[0_0_25px_rgba(0,245,160,0.65)]';

      case 'cheer': {
        const bits = alert.bitsAmount || (alert.amount ? parseInt(alert.amount, 10) : 100);
        if (bits >= 5000) return 'border-[#FF007F] shadow-[0_0_35px_rgba(255,0,127,0.85)]';
        if (bits >= 1000) return 'border-[#D6D65C] shadow-neon-border';
        if (bits >= 500) return 'border-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.65)]';
        return 'border-[#9E82B8] shadow-card-glow';
      }

      case 'raid':
        return 'border-[#FF3B30] shadow-[0_0_30px_rgba(255,59,48,0.75)]';

      case 'hypetrain':
        return 'border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.85)]';

      case 'follow':
      default:
        return 'border-ivexi-purple shadow-card-glow';
    }
  };

  const getTagColor = () => {
    switch (alert.type) {
      case 'sub':
        if (alert.subType === 'subbomb') return 'bg-[#FF3B30] text-white';
        if (alert.subType === 'tier3') return 'bg-[#FFD700] text-black';
        if (alert.subType === 'tier2') return 'bg-[#5CE1E6] text-black';
        if (alert.subType === 'prime') return 'bg-[#9146FF] text-white';
        return 'bg-ivexi-neon text-ivexi-dark';

      case 'donation':
        return 'bg-[#00F5A0] text-black';

      case 'cheer': {
        const bits = alert.bitsAmount || (alert.amount ? parseInt(alert.amount, 10) : 100);
        if (bits >= 5000) return 'bg-[#FF007F] text-white';
        if (bits >= 1000) return 'bg-[#D6D65C] text-black';
        if (bits >= 500) return 'bg-[#00E5FF] text-black';
        return 'bg-[#732EB8] text-white';
      }

      case 'raid':
        return 'bg-[#FF3B30] text-white';

      case 'hypetrain':
        return 'bg-[#FFD700] text-black';

      case 'follow':
      default:
        return 'bg-ivexi-purple text-white';
    }
  };

  const getPrimaryUserText = () => {
    if (alert.type === 'sub' && alert.subType === 'gift' && alert.recipient) {
      return (
        <span>
          <span className="text-white font-bold">{alert.username}</span> presenteou{' '}
          <span className="text-ivexi-neon font-bold">{alert.recipient}</span>!
        </span>
      );
    }

    if (alert.type === 'sub' && alert.subType === 'subbomb') {
      return (
        <span>
          <span className="text-white font-bold">{alert.username}</span> doou um pacote de{' '}
          <span className="text-ivexi-neon font-bold">{alert.giftCount || 5} subs</span> para a guilda!
        </span>
      );
    }

    if (alert.type === 'raid') {
      const count = alert.viewersCount || alert.amount || 'uma tropa de';
      return (
        <span>
          <span className="text-white font-bold">{alert.username}</span> com{' '}
          <span className="text-[#FF3B30] font-bold">{count} espectadores</span>!
        </span>
      );
    }

    return <span className="text-white font-bold">{alert.username}</span>;
  };

  return (
    <div
      data-testid="alert-card"
      className={`w-full max-w-[560px] clip-tactical-md bg-ivexi-dark/95 border-2 ${getBorderColor()} p-5 flex items-center gap-5 backdrop-blur-md animate-bounce duration-700`}
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

      {/* Conteúdo textual do alerta com min-w-0 contra overflow */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] uppercase font-rajdhani font-bold tracking-widest px-2.5 py-0.5 clip-tactical-sm ${getTagColor()}`}>
            {getTagText()}
          </span>
          <span className="text-[10px] uppercase font-rajdhani font-semibold text-ivexi-muted tracking-wider">
            CANAL VULGOMANIACO • GUILDA IVEXI
          </span>
        </div>
        <h2 className="font-rajdhani text-2xl font-bold tracking-wide text-ivexi-neon drop-shadow-neon-yellow uppercase">
          {getTitle()}
        </h2>
        <p className="font-rajdhani text-xl tracking-wide">
          {getPrimaryUserText()}
        </p>
        {alert.message && (
          <p className="font-inter text-xs text-ivexi-light/80 italic line-clamp-2 bg-ivexi-surface/60 px-2 py-1 rounded border-l-2 border-ivexi-neon break-words">
            "{alert.message}"
          </p>
        )}
      </div>
    </div>
  );
};

