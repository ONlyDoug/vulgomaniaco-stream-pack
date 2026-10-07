import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '@/App';

describe('Regressão e Integração do Streamer Pack', () => {
  it('deve renderizar o Hub de Navegação e rotas com sucesso', () => {
    render(<App />);
    expect(screen.getByText(/Streamer Pack \| VulgoManiaco/i)).toBeInTheDocument();
    expect(screen.getByText(/Overlay de Gameplay/i)).toBeInTheDocument();
    expect(screen.getByText(/Cena de Início/i)).toBeInTheDocument();
    expect(screen.getByText(/Cena de Intervalo/i)).toBeInTheDocument();
    expect(screen.getByText(/Cena de Encerramento/i)).toBeInTheDocument();
    expect(screen.getByText(/Cena de Just Chatting/i)).toBeInTheDocument();
    expect(screen.getByText(/Camada de Alertas OBS/i)).toBeInTheDocument();
    expect(screen.getByText(/Painel de Controle/i)).toBeInTheDocument();
    expect(screen.getByText(/Galeria e Exportador de Painéis/i)).toBeInTheDocument();
  });
});
