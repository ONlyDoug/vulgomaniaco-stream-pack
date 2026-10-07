import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameplayOverlay } from '@/features/gameplay/GameplayOverlay';

describe('US-001: Gameplay Overlay e Proteção Tática', () => {
  // SPECSFY: US-001 FR-001 FR-002 NFR-001 AC-001
  it('AC-001: deve renderizar a moldura de Facecam 16:9 limpa e o nome VulgoManiaco sem mascote na câmera', () => {
    render(<GameplayOverlay channelName="VulgoManiaco" />);

    const facecam = screen.getByTestId('facecam-frame');
    expect(facecam).toBeInTheDocument();

    // A moldura da facecam é limpa e não possui mascote acoplado
    expect(facecam.querySelector('[data-testid="mascot-badge"]')).toBeNull();

    const channelTitle = screen.getByText(/VulgoManiaco/i);
    expect(channelTitle).toBeInTheDocument();
  });

  // SPECSFY: US-001 FR-001 FR-002 NFR-001 AC-002
  it('AC-002: deve manter o escudo anti-snipe ativo por padrão para Albion Online e permitir desativar via prop', () => {
    // Por padrão (sem props), o anti-snipe já nasce ativo para Albion Online
    const { rerender } = render(<GameplayOverlay />);
    const shield = screen.getByTestId('anti-snipe-shield');
    expect(shield).toBeInTheDocument();
    expect(shield).toHaveTextContent(/anti-snipe/i);

    // O logotipo mestre oficial do mascote e o QR Code do Discord são exibidos no escudo anti-snipe
    const mascot = screen.getByTestId('mascot-badge');
    expect(mascot).toBeInTheDocument();

    const qrCard = screen.getByTestId('anti-snipe-qr');
    expect(qrCard).toBeInTheDocument();

    // Quando desativado explicitamente, o escudo é ocultado
    rerender(<GameplayOverlay antiSnipeActive={false} />);
    expect(screen.queryByTestId('anti-snipe-shield')).not.toBeInTheDocument();
  });

  // SPECSFY: US-001 FR-001 FR-002 NFR-001 AC-003
  it('AC-003: deve acionar fallback SVG em caso de falha de carregamento da imagem do mascote no anti-snipe', () => {
    render(<GameplayOverlay channelName="VulgoManiaco" antiSnipeActive={true} />);

    const mascotImg = screen.queryByRole('img', { name: /corvo streamer/i });
    if (mascotImg) {
      fireEvent.error(mascotImg);
    }

    const fallbackSvg = screen.getByTestId('mascot-fallback-svg');
    expect(fallbackSvg).toBeInTheDocument();
  });
});
