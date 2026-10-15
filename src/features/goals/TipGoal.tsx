import React from 'react';
import { GoalBar } from './GoalBar';

export interface TipGoalProps {
  current?: number;
  target?: number;
  title?: string;
}

export const TipGoal: React.FC<TipGoalProps> = (props) => {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const current = props.current ?? (urlParams?.get('current') ? parseInt(urlParams.get('current')!, 10) : 175);
  const target = props.target ?? (urlParams?.get('target') ? parseInt(urlParams.get('target')!, 10) : 500);
  const title = props.title ?? (urlParams?.get('title') || 'META DE DOAÇÕES (PIX)');

  return (
    <GoalBar
      icon="💎"
      title={title}
      current={current}
      target={target}
      unitPrefix="R$ "
      barGradient="from-[#0F382A] via-[#00F5A0] to-ivexi-neon"
      borderGlow="border-[#00F5A0] shadow-[0_0_20px_rgba(0,245,160,0.65)]"
      subtitle="APOIO À TRANSMISSÃO • ALBION ONLINE"
      testId="tip-goal-widget"
    />
  );
};
