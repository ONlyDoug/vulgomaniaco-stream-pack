import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BadgesGallery } from '@/features/badges/BadgesGallery';
import { SUB_BADGES_DATA, EMOTES_DATA, CHANNEL_POINTS_DATA, BIT_BADGES_DATA, ZIP_DOWNLOAD_URL } from '@/features/badges/twitchAffiliateData';

describe('Pack Oficial de Afiliado Twitch (Distintivos e Emotes)', () => {
  it('deve renderizar os 6 distintivos de fidelidade de sub com títulos e durações oficiais', () => {
    render(<BadgesGallery />);

    const badgeCards = screen.getAllByTestId('sub-badge-card');
    expect(badgeCards).toHaveLength(6);

    expect(screen.getByText('Pena Mística de Corvo')).toBeInTheDocument();
    expect(screen.getByText('Garra de Aço Tática')).toBeInTheDocument();
    expect(screen.getByText('Escudo Tático IVEXI')).toBeInTheDocument();
    expect(screen.getByText('Elmo de Corvo Sombrio')).toBeInTheDocument();
    expect(screen.getByText('Cristal de Energia Sifada')).toBeInTheDocument();
    expect(screen.getByText('Coroa Imperial de Corvo')).toBeInTheDocument();

    const durations = ['1 Mês', '2 Meses', '3 Meses', '6 Meses', '9 Meses', '1 Ano'];
    durations.forEach((d) => {
      expect(screen.getByText(d)).toBeInTheDocument();
    });
  });

  it('deve renderizar os 7 emotes da live com destaque especial para a piada interna vulgoENERGIZA', () => {
    render(<BadgesGallery />);

    const emoteCards = screen.getAllByTestId('emote-card');
    expect(emoteCards).toHaveLength(7);

    // Verifica a presença e tag da piada interna oficial
    expect(screen.getByText(/Bota pra fora, energiza e monta!/i)).toBeInTheDocument();
    expect(screen.getAllByText('vulgoENERGIZA').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Piada Interna Oficial/i)).toHaveLength(2);

    // Verifica os outros emotes essenciais
    const codes = ['vulgoMONTA', 'vulgoHYPE', 'vulgoGG', 'vulgoRAGE', 'vulgoLURK', 'vulgoRIP'];
    codes.forEach((code) => {
      expect(screen.getAllByText(code).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('deve disponibilizar o botão de download 1-clique para o arquivo ZIP unificado', () => {
    render(<BadgesGallery />);

    const zipLinks = screen.getAllByRole('link', { name: /Baixar Pack \(\.ZIP\)/i });
    expect(zipLinks.length).toBeGreaterThanOrEqual(1);
    expect(zipLinks[0]).toHaveAttribute('href', ZIP_DOWNLOAD_URL);
    expect(zipLinks[0]).toHaveAttribute('download', 'pack-afiliado-twitch-vulgomaniaco.zip');
  });

  it('deve renderizar o simulador de chat da Twitch e permitir alternar o tema de fundo', () => {
    render(<BadgesGallery />);

    const simulator = screen.getByTestId('twitch-chat-simulator');
    expect(simulator).toBeInTheDocument();
    expect(simulator).toHaveClass('bg-[#18181B]'); // Default Twitch Dark

    // Alternar para Twitch Light
    const lightBtn = screen.getByRole('button', { name: /Twitch Light/i });
    fireEvent.click(lightBtn);
    expect(simulator).toHaveClass('bg-[#F7F7F8]');

    // Alternar para IVEXI Dark
    const ivexiBtn = screen.getByRole('button', { name: /IVEXI Deep Purple/i });
    fireEvent.click(ivexiBtn);
    expect(simulator).toHaveClass('bg-[#0B0512]');
  });

  it('deve conter metadados e arquivos válidos de pontos do canal e badges de bits', () => {
    expect(CHANNEL_POINTS_DATA.id).toBe('moeda-ivexi');
    expect(CHANNEL_POINTS_DATA.size112Url).toContain('112x112');

    expect(BIT_BADGES_DATA).toHaveLength(5);
    expect(BIT_BADGES_DATA.map((b) => b.bits)).toEqual([1, 100, 1000, 5000, 10000]);
    expect(SUB_BADGES_DATA).toHaveLength(6);
    expect(EMOTES_DATA).toHaveLength(7);
  });
});
