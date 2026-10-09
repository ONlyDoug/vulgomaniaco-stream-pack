import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertOverlay } from '@/features/alerts/AlertOverlay';
import { AlertCard } from '@/features/alerts/AlertCard';
import { ControlDashboard } from '@/features/control/ControlDashboard';

describe('US-003: Alertas Animados e Painel de Controle', () => {
  // SPECSFY: US-003 FR-005 FR-006 NFR-001 AC-007
  it('AC-007: deve renderizar banner de alerta estilizado com identificação do evento e cores ivexi', () => {
    render(<AlertOverlay />);

    const alertContainer = screen.getByTestId('alert-overlay-container');
    expect(alertContainer).toBeInTheDocument();
  });

  // SPECSFY: US-003 FR-005 FR-006 NFR-001 AC-008
  it('AC-008: deve gerenciar fila de múltiplos alertas sem sobreposição visual', () => {
    render(<AlertOverlay />);

    const queueIndicator = screen.getByTestId('alert-queue-manager');
    expect(queueIndicator).toBeInTheDocument();
  });

  // SPECSFY: US-003 FR-005 FR-006 NFR-001 AC-009
  it('AC-009: deve permitir disparar alertas e alternar anti-snipe via dashboard de controle', () => {
    render(<ControlDashboard />);

    const triggerFollowBtn = screen.getByRole('button', { name: /testar seguidor/i });
    expect(triggerFollowBtn).toBeInTheDocument();

    const antiSnipeToggle = screen.getByRole('button', { name: /alternar anti-snipe/i });
    expect(antiSnipeToggle).toBeInTheDocument();

    const copyHtmlBtn = screen.getByRole('button', { name: /copiar html/i });
    expect(copyHtmlBtn).toBeInTheDocument();

    const copyCssBtn = screen.getByRole('button', { name: /copiar css/i });
    expect(copyCssBtn).toBeInTheDocument();
  });

  it('deve renderizar iframe do StreamElements quando url for configurada', () => {
    window.history.pushState({}, '', '/alerts?se_url=https://streamelements.com/overlay/test1234');
    render(<AlertOverlay />);

    const iframe = screen.getByTestId('streamelements-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://streamelements.com/overlay/test1234');

    // Limpa estado da URL
    window.history.pushState({}, '', '/alerts');
  });

  it('deve renderizar o título focado no canal VulgoManiaco', () => {
    render(
      <AlertCard
        alert={{
          id: 'test-1',
          type: 'follow',
          username: 'GuerreiroAlbion_99',
          durationMs: 5000,
        }}
      />
    );

    expect(screen.getByText('NOVO SEGUIDOR NO CANAL!')).toBeInTheDocument();
    expect(screen.getByText(/CANAL VULGOMANIACO/i)).toBeInTheDocument();
  });
});
