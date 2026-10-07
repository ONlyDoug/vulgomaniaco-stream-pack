import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PanelsGallery } from '@/features/panels/PanelsGallery';
import { exportPanels } from '@/features/panels/exportPanels';

describe('US-004: Painéis de Perfil e Identidade do Canal', () => {
  // SPECSFY: US-004 FR-007 FR-008 NFR-002 AC-010
  it('AC-010: deve renderizar os 6 painéis temáticos padronizados de 320px com o logotipo compacto oficial da marca', () => {
    render(<PanelsGallery />);

    const panels = screen.getAllByTestId('channel-panel-card');
    expect(panels).toHaveLength(6);

    const titles = ['Sobre', 'Regras', 'Discord / Guilda', 'Setup', 'Pix / Apoio', 'Horários'];
    titles.forEach((title) => {
      expect(screen.getByText(new RegExp(title, 'i'))).toBeInTheDocument();
    });

    // Cada um dos 6 cards deve exibir o logotipo compacto oficial da marca
    const compactLogos = screen.getAllByTestId('panel-compact-logo');
    expect(compactLogos).toHaveLength(6);
    compactLogos.forEach((logo) => {
      expect(logo).toHaveAttribute('src', expect.stringContaining('streamer-vulgomaniaco-compact-512w.png'));
    });
  });

  it('deve disponibilizar o ícone compacto oficial para download na galeria de marcas', () => {
    render(<PanelsGallery />);

    const compactShowcase = screen.getByTestId('compact-logo-showcase');
    expect(compactShowcase).toBeInTheDocument();
    expect(compactShowcase).toHaveAttribute('src', expect.stringContaining('streamer-vulgomaniaco-compact-512w.png'));
  });

  // SPECSFY: US-004 FR-007 FR-008 NFR-002 AC-011
  it('AC-011: deve exportar os 6 painéis individuais nos formatos PNG e SVG', async () => {
    const result = await exportPanels();
    expect(result.exportedCount).toBe(6);
    expect(result.formats).toContain('png');
    expect(result.formats).toContain('svg');
  });

  // SPECSFY: US-004 FR-007 FR-008 NFR-002 AC-012
  it('AC-012: deve atender às diretrizes de contraste WCAG AAA (7:1) nos títulos e fundos', () => {
    render(<PanelsGallery />);

    const headerElement = screen.getByTestId('panels-gallery-container');
    expect(headerElement).toHaveAttribute('data-contrast-wcag', 'AAA');
  });
});
