import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StartingScene } from '@/features/scenes/StartingScene';
import { BrbScene } from '@/features/scenes/BrbScene';
import { EndingScene } from '@/features/scenes/EndingScene';
import { ChattingScene } from '@/features/scenes/ChattingScene';

describe('US-002: Cenas Completas de Transmissão', () => {
  // SPECSFY: US-002 FR-003 FR-004 NFR-001 AC-004
  it('AC-004: deve inicializar cena de início com contagem regressiva e carrossel de redes', () => {
    render(<StartingScene />);

    const timer = screen.getByTestId('countdown-timer');
    expect(timer).toBeInTheDocument();
    expect(timer.textContent).toMatch(/\d{2}:\d{2}/);

    const socials = screen.getByTestId('socials-carousel');
    expect(socials).toBeInTheDocument();
  });

  // SPECSFY: US-002 FR-003 FR-004 NFR-001 AC-005
  it('AC-005: deve renderizar tela de intervalo BRB com animação do corvo e texto de pausa', () => {
    render(<BrbScene />);

    const mascotLoop = screen.getByTestId('brb-mascot-animation');
    expect(mascotLoop).toBeInTheDocument();

    const brbText = screen.getByText(/Já Voltamos/i);
    expect(brbText).toBeInTheDocument();
  });

  // SPECSFY: US-002 FR-003 FR-004 NFR-001 AC-006
  it('AC-006: deve exibir créditos, agradecimentos e comunidade ivexi na cena de encerramento', () => {
    render(<EndingScene />);

    const credits = screen.getByTestId('ending-credits');
    expect(credits).toBeInTheDocument();

    const thanksText = screen.getByText(/Obrigado por assistir/i);
    expect(thanksText).toBeInTheDocument();
  });

  // SPECSFY: US-002 FR-003 FR-004 NFR-001 AC-013
  it('AC-013: deve renderizar a cena de Just Chatting com moldura de webcam e chat box integrada', () => {
    render(<ChattingScene />);

    const container = screen.getByTestId('chatting-scene-container');
    expect(container).toBeInTheDocument();

    const webcamFrame = screen.getByTestId('chatting-webcam-frame');
    expect(webcamFrame).toBeInTheDocument();

    const chatBox = screen.getByTestId('chatting-chat-box');
    expect(chatBox).toBeInTheDocument();
    expect(screen.getByText(/Chat da Transmissão/i)).toBeInTheDocument();
  });
});

