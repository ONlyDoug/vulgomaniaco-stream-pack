import React from 'react';
import { GoalBar } from './GoalBar';

export interface SubGoalProps {
  current?: number;
  target?: number;
  title?: string;
}

export const SubGoal: React.FC<SubGoalProps> = (props) => {
  // Lê parâmetros da URL para pré-visualização direta e customização sem rebuild
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const current = props.current ?? (urlParams?.get('current') ? parseInt(urlParams.get('current')!, 10) : 24);
  const target = props.target ?? (urlParams?.get('target') ? parseInt(urlParams.get('target')!, 10) : 50);
  const title = props.title ?? (urlParams?.get('title') || 'META DE SUBS');

  return (
    <GoalBar
      icon="⭐"
      title={title}
      current={current}
      target={target}
      unitSuffix=" Subs"
      barGradient="from-ivexi-purple via-[#9E82B8] to-ivexi-neon"
      borderGlow="border-ivexi-neon shadow-neon-border"
      subtitle="COMUNIDADE VULGOMANIACO • GUILDA IVEXI"
      testId="sub-goal-widget"
    />
  );
};
