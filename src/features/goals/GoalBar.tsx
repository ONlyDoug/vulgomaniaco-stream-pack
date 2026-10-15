import React from 'react';

export interface GoalBarProps {
  icon: string;
  title: string;
  current: number;
  target: number;
  unitPrefix?: string;
  unitSuffix?: string;
  barGradient?: string;
  borderGlow?: string;
  subtitle?: string;
  testId?: string;
}

export const GoalBar: React.FC<GoalBarProps> = ({
  icon,
  title,
  current,
  target,
  unitPrefix = '',
  unitSuffix = '',
  barGradient = 'from-ivexi-purple via-[#9E82B8] to-ivexi-neon',
  borderGlow = 'border-ivexi-neon shadow-neon-border',
  subtitle = 'CANAL VULGOMANIACO • GUILDA IVEXI',
  testId = 'goal-bar',
}) => {
  const safeTarget = Math.max(1, target);
  const percentage = Math.min(100, Math.max(0, Math.round((current / safeTarget) * 100)));

  return (
    <div
      data-testid={testId}
      className={`w-full max-w-[480px] clip-tactical-md bg-ivexi-dark/95 border-2 ${borderGlow} p-4 backdrop-blur-md shadow-card-glow text-white font-inter select-none`}
    >
      {/* Cabeçalho com Ícone, Título e Meta */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl flex-shrink-0">{icon}</span>
          <div className="min-w-0">
            <h3 className="font-rajdhani text-lg font-bold uppercase tracking-wider text-ivexi-neon drop-shadow-neon-yellow truncate">
              {title}
            </h3>
            <p className="text-[10px] uppercase font-rajdhani font-semibold text-ivexi-muted tracking-widest truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Valores Numéricos */}
        <div className="text-right flex-shrink-0">
          <div className="font-rajdhani text-base font-bold text-white tracking-wide">
            <span className="text-ivexi-neon">{unitPrefix}{current.toLocaleString('pt-BR')}{unitSuffix}</span>
            <span className="text-ivexi-muted font-normal text-xs mx-1">/</span>
            <span>{unitPrefix}{target.toLocaleString('pt-BR')}{unitSuffix}</span>
          </div>
          <span className="text-[11px] font-rajdhani font-bold text-ivexi-neon">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Trilho e Barra de Progresso Tática */}
      <div className="relative w-full h-4 bg-ivexi-surface/90 clip-tactical-sm border border-ivexi-purple/60 overflow-hidden p-[2px]">
        {/* Preenchimento Dinâmico com Gradiente */}
        <div
          data-testid="goal-progress-fill"
          className={`h-full bg-gradient-to-r ${barGradient} clip-tactical-sm transition-all duration-700 ease-out flex items-center justify-end relative shadow-[0_0_12px_rgba(214,214,92,0.6)]`}
          style={{ width: `${percentage}%` }}
        >
          {/* Brilho da ponta avançada */}
          <div className="w-1.5 h-full bg-white opacity-80" />
        </div>
      </div>
    </div>
  );
};
