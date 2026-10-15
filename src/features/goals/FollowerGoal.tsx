import React from 'react';
import { GoalBar } from './GoalBar';

export interface FollowerGoalProps {
  current?: number;
  target?: number;
  title?: string;
}

export const FollowerGoal: React.FC<FollowerGoalProps> = (props) => {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const current = props.current ?? (urlParams?.get('current') ? parseInt(urlParams.get('current')!, 10) : 340);
  const target = props.target ?? (urlParams?.get('target') ? parseInt(urlParams.get('target')!, 10) : 500);
  const title = props.title ?? (urlParams?.get('title') || 'META DE SEGUIDORES');

  return (
    <GoalBar
      icon="👥"
      title={title}
      current={current}
      target={target}
      unitSuffix=" Segs"
      barGradient="from-[#4A154B] via-ivexi-purple to-[#00E5FF]"
      borderGlow="border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.6)]"
      subtitle="ENGAGAMENTO • GUILDA IVEXI"
      testId="follower-goal-widget"
    />
  );
};
