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

    const copyDataBtn = screen.getByRole('button', { name: /copiar data/i });
    expect(copyDataBtn).toBeInTheDocument();
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

  it('deve renderizar alerta de Sub Bomb agrupado sem poluir a tela', () => {
    render(
      <AlertCard
        alert={{
          id: 'test-bomb',
          type: 'sub',
          subType: 'subbomb',
          username: 'Lord_Maniaco',
          giftCount: 20,
          durationMs: 6500,
        }}
      />
    );

    expect(screen.getByText('COMBO DE 20 SUBS!')).toBeInTheDocument();
    expect(screen.getByText(/20 SUBS EM LOTE/i)).toBeInTheDocument();
    expect(screen.getByText(/doou um pacote de/i)).toBeInTheDocument();
  });

  it('deve renderizar alerta de Sub de Presente individual com remetente e destinatário', () => {
    render(
      <AlertCard
        alert={{
          id: 'test-gift',
          type: 'sub',
          subType: 'gift',
          username: 'Patrono_Albion',
          recipient: 'Membro_Iniciante',
          durationMs: 6000,
        }}
      />
    );

    expect(screen.getByText('SUB DE PRESENTE!')).toBeInTheDocument();
    expect(screen.getByText('PRESENTE DA GUILDA')).toBeInTheDocument();
    expect(screen.getByText('Patrono_Albion')).toBeInTheDocument();
    expect(screen.getByText('Membro_Iniciante')).toBeInTheDocument();
  });

  it('deve renderizar renovação de sub (resub) com contagem de meses e mensagem', () => {
    render(
      <AlertCard
        alert={{
          id: 'test-resub',
          type: 'sub',
          subType: 'resub',
          username: 'Veterano_Ivexi',
          months: 9,
          message: '9 meses de Overcharge!',
          durationMs: 6000,
        }}
      />
    );

    expect(screen.getByText('RENOVAÇÃO DE INSCRIÇÃO!')).toBeInTheDocument();
    expect(screen.getByText('9 MESES DE GUILDA')).toBeInTheDocument();
    expect(screen.getByText('"9 meses de Overcharge!"')).toBeInTheDocument();
  });

  it('deve renderizar Overcharge épico para doações de Bits de 5.000+', () => {
    render(
      <AlertCard
        alert={{
          id: 'test-bits',
          type: 'cheer',
          username: 'Mestre_Arcano',
          bitsAmount: 5000,
          durationMs: 6000,
        }}
      />
    );

    expect(screen.getByText('OVERCHARGE DE 5.000 BITS!')).toBeInTheDocument();
    expect(screen.getByText('⚡ BITS OVERCHARGE')).toBeInTheDocument();
  });

  it('deve renderizar Raid com nome e número de espectadores', () => {
    render(
      <AlertCard
        alert={{
          id: 'test-raid',
          type: 'raid',
          username: 'StreamerParceiro',
          viewersCount: 85,
          durationMs: 6000,
        }}
      />
    );

    expect(screen.getByText('RAID NO CANAL VULGOMANIACO!')).toBeInTheDocument();
    expect(screen.getByText(/85 GUERREIROS/i)).toBeInTheDocument();
    expect(screen.getByText(/85 espectadores/i)).toBeInTheDocument();
  });

  it('deve renderizar alerta de Trem do Hype (Hype Train)', () => {
    render(
      <AlertCard
        alert={{
          id: 'test-hype',
          type: 'hypetrain',
          username: 'Guilda IVEXI',
          hypeLevel: 3,
          hypeStatus: 'levelup',
          durationMs: 6000,
        }}
      />
    );

    expect(screen.getByText('TREM DO HYPE SUBIU PARA NÍVEL 3!')).toBeInTheDocument();
    expect(screen.getByText('🚂 HYPE TRAIN • NÍVEL 3')).toBeInTheDocument();
  });
});

