import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { generateObsSceneCollection } from '@/features/obs/generateObsCollection';
import { ControlDashboard } from '@/features/control/ControlDashboard';

describe('Exportador de Coleção de Cenas do OBS Studio', () => {
  it('deve gerar a coleção OBS com as 5 cenas oficiais na ordem correta', () => {
    const collection = generateObsSceneCollection();

    expect(collection.name).toBe('VulgoManiaco - Albion Online Stream Pack');
    expect(collection.current_scene).toBe('🎮 02 - GAMEPLAY (Albion Online)');
    expect(collection.scene_order).toHaveLength(5);

    const sceneNames = collection.scene_order.map((s) => s.name);
    expect(sceneNames).toEqual([
      '⏳ 01 - ABERTURA (Starting Soon)',
      '🎮 02 - GAMEPLAY (Albion Online)',
      '☕ 03 - INTERVALO (Pausa / BRB)',
      '💬 04 - JUST CHATTING (Conversa & Reunião)',
      '🛑 05 - ENCERRAMENTO (Ending Stream)',
    ]);
  });

  it('deve configurar todas as fontes de navegador em 1080p a 60 FPS com URL base customizável', () => {
    const customUrl = 'http://192.168.1.150:5173';
    const collection = generateObsSceneCollection({ baseUrl: customUrl });

    const browserSources = collection.sources.filter((s) => s.id === 'browser_source');
    expect(browserSources.length).toBeGreaterThanOrEqual(6);

    for (const source of browserSources) {
      expect(source.settings.width).toBe(1920);
      expect(source.settings.height).toBe(1080);
      expect(source.settings.fps).toBe(60);
      expect(source.settings.url).toContain(customUrl);
      expect(source.settings.css).toContain('rgba(0, 0, 0, 0)');
    }
  });

  it('deve calibrar a webcam de gameplay pixel-perfect para a moldura 16:9 (384x216 na posição x:32, y:824)', () => {
    const collection = generateObsSceneCollection();

    const gameplayScene = collection.sources.find(
      (s) => s.id === 'scene' && s.name === '🎮 02 - GAMEPLAY (Albion Online)'
    );
    expect(gameplayScene).toBeDefined();

    const items = (gameplayScene?.settings as any)?.items || [];
    const webcamItem = items.find(
      (item: any) => item.name === '📷 Webcam do Streamer (Facecam Gameplay)'
    );
    expect(webcamItem).toBeDefined();
    expect(webcamItem?.pos).toEqual({ x: 32.0, y: 824.0 });
    expect(webcamItem?.bounds).toEqual({ x: 384.0, y: 216.0 });
    expect(webcamItem?.bounds_type).toBe(2); // OBS_BOUNDS_SCALE_INNER
  });

  it('deve renderizar a seção de exportação do OBS no ControlDashboard com input e botão de download', () => {
    render(<ControlDashboard />);

    expect(screen.getByText(/Exportar Coleção OBS Studio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Baixar Coleção de Cenas OBS/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('http://localhost:5173')).toBeInTheDocument();
  });
});
