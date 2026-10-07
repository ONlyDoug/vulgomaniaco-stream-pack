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

  it('AC-014: deve exibir o link real verificado do Discord (discord.gg/s246XdGp7q) nas cenas e não conter discord.gg/ivexi', () => {
    const { container: brbContainer } = render(<BrbScene />);
    expect(brbContainer.textContent).toContain('DISCORD.GG/S246XDGP7Q');
    expect(brbContainer.textContent).not.toContain('discord.gg/ivexi');
    expect(brbContainer.textContent).not.toContain('DISCORD.GG/IVEXI');

    const { container: endingContainer } = render(<EndingScene />);
    expect(endingContainer.textContent).toContain('discord.gg/s246XdGp7q');
    expect(endingContainer.textContent).not.toContain('discord.gg/ivexi');
    expect(endingContainer.textContent).not.toContain('DISCORD.GG/IVEXI');

    const { container: chattingContainer } = render(<ChattingScene />);
    expect(chattingContainer.textContent).toContain('discord.gg/s246XdGp7q');
    expect(chattingContainer.textContent).not.toContain('discord.gg/ivexi');
    expect(chattingContainer.textContent).not.toContain('DISCORD.GG/IVEXI');
  });
});

