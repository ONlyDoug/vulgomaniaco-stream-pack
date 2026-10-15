import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SubGoal } from '@/features/goals/SubGoal';
import { FollowerGoal } from '@/features/goals/FollowerGoal';
import { TipGoal } from '@/features/goals/TipGoal';
import { GoalsShowcase } from '@/features/goals/GoalsShowcase';

describe('US-004: Widgets de Metas Visuais (Goals OBS)', () => {
  it('deve renderizar a meta de subs com progresso percentual e valores', () => {
    render(<SubGoal current={25} target={50} title="META DE SUBS" />);

    expect(screen.getByTestId('sub-goal-widget')).toBeInTheDocument();
    expect(screen.getByText('META DE SUBS')).toBeInTheDocument();
    expect(screen.getByText('25 Subs')).toBeInTheDocument();
    expect(screen.getByText('50 Subs')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('deve renderizar a meta de seguidores com valores customizados', () => {
    render(<FollowerGoal current={400} target={500} title="SEGUIDORES IVEXI" />);

    expect(screen.getByTestId('follower-goal-widget')).toBeInTheDocument();
    expect(screen.getByText('SEGUIDORES IVEXI')).toBeInTheDocument();
    expect(screen.getByText('400 Segs')).toBeInTheDocument();
    expect(screen.getByText('500 Segs')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('deve renderizar a meta de doações com prefixo em Reais (R$)', () => {
    render(<TipGoal current={250} target={500} title="META DO SET 8.3" />);

    expect(screen.getByTestId('tip-goal-widget')).toBeInTheDocument();
    expect(screen.getByText('META DO SET 8.3')).toBeInTheDocument();
    expect(screen.getByText('R$ 250')).toBeInTheDocument();
    expect(screen.getByText('R$ 500')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('deve renderizar o showcase completo de metas com os 3 widgets e botões de cópia', () => {
    render(<GoalsShowcase />);

    expect(screen.getByText(/Widgets de Metas \(Goals\) OBS/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copiar url obs \(subs\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copiar url obs \(segs\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copiar url obs \(pix\)/i })).toBeInTheDocument();
  });
});
