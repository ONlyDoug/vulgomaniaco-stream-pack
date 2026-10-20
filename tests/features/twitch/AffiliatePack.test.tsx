import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { BadgesGallery } from '@/features/badges/BadgesGallery';

const mockMotion = (matches = false) => vi.stubGlobal('matchMedia', vi.fn(() => ({
  matches, addEventListener: vi.fn(), removeEventListener: vi.fn(),
})));
afterEach(() => vi.unstubAllGlobals());

describe('SPEC-0003 — pacote Twitch v2', () => {
  it('SPECSFY: US-001 FR-001 NFR-001 AC-001 — preserva seis Sub Badges e organiza as 38 peças novas', () => {
    mockMotion();
    render(<BadgesGallery />);
    expect(screen.getAllByTestId('sub-badge-card')).toHaveLength(6);
    expect(screen.getAllByTestId('v2-asset-card')).toHaveLength(38);
    expect(screen.getAllByTestId('emote-card')).toHaveLength(20);
    ['Seguidores', 'Tier 1 estático', 'Tier 1 animado', 'Tier 2', 'Tier 3', 'Recompensas de Bits', 'Flairs', 'Bit Badges', 'Moeda do canal', 'Resgates'].forEach(name =>
      expect(screen.getByRole('heading', { name })).toBeInTheDocument());
    expect(screen.getByText('100.000 Bits')).toBeInTheDocument();
    expect(screen.getByText('Imperador Supremo')).toBeInTheDocument();
  });

  it('SPECSFY: US-001 FR-001 NFR-001 AC-002 — oferece 114 downloads, tamanhos reais e documentos separados', () => {
    mockMotion();
    render(<BadgesGallery />);
    const cards = screen.getAllByTestId('v2-asset-card');
    expect(cards.flatMap(card => within(card).getAllByRole('link'))).toHaveLength(114);
    for (const card of cards) for (const img of within(card).getAllByRole('img')) {
      const size = img.getAttribute('width');
      expect(img.getAttribute('height')).toBe(size);
      expect(img.getAttribute('src')).toContain(`${size}x${size}`);
    }
    expect(screen.getByRole('link', { name: /Baixar emotes e ícones v2/ })).toHaveAttribute('href', '/assets/twitch/v2/pack-twitch-vulgomaniaco-v2.zip');
    expect(screen.getByRole('link', { name: /Manual PDF/ })).toHaveAttribute('href', '/assets/twitch/v2/manual.pdf');
    expect(screen.getByRole('link', { name: /Sub Badges.*ZIP/ })).toHaveAttribute('download');
  });

  it('SPECSFY: US-001 FR-001 NFR-001 AC-003 — alterna fundos e pausa GIFs no primeiro frame sem alterar downloads', () => {
    mockMotion();
    render(<BadgesGallery />);
    const simulator = screen.getByTestId('twitch-chat-simulator');
    fireEvent.click(screen.getByRole('button', { name: /Twitch Light/ }));
    expect(simulator).toHaveClass('bg-[#F7F7F8]');
    fireEvent.click(screen.getByRole('button', { name: /IVEXI Deep Purple/ }));
    expect(simulator).toHaveClass('bg-[#0B0512]');
    expect(document.querySelectorAll('img[src$=".gif"]').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: /Pausar animações/ }));
    expect(document.querySelectorAll('img[src$=".gif"]')).toHaveLength(0);
    expect(document.querySelectorAll('img[src*="/stills/"]').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('a[download][href$=".gif"]')).toHaveLength(15);
    fireEvent.change(screen.getByLabelText('Flair no chat'), { target: { value: 'flair_tier3' } });
    within(simulator).getAllByAltText('Flair Tier 3').forEach(img => expect(img).toHaveAttribute('width', '18'));
  });

  it('respeita movimento reduzido inclusive após mudar a preferência do sistema', () => {
    const listeners: Array<(event: { matches: boolean }) => void> = [];
    vi.stubGlobal('matchMedia', () => ({ matches: true,
      addEventListener: (_: string, listener: typeof listeners[number]) => listeners.push(listener),
      removeEventListener: vi.fn() }));
    render(<BadgesGallery />);
    expect(document.querySelectorAll('img[src$=".gif"]')).toHaveLength(0);
    expect(screen.getByRole('button', { name: /Reproduzir animações/ })).toBeDisabled();
  });
});
