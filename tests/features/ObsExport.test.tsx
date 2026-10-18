import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { generateObsSceneCollection } from '@/features/obs/generateObsCollection';
import { ControlDashboard } from '@/features/control/ControlDashboard';

describe('Exportador de Coleção de Cenas do OBS Studio', () => {
  it('deve gerar a coleção OBS com as 6 cenas oficiais na ordem correta', () => {
    const collection = generateObsSceneCollection();

    expect(collection.name).toBe('VulgoManiaco - Albion Online Stream Pack');
    expect(collection.current_scene).toBe('🎮 02 - GAMEPLAY (Albion Online)');
    expect(collection.scene_order).toHaveLength(6);

    const sceneNames = collection.scene_order.map((s) => s.name);
    expect(sceneNames).toEqual([
      '⏳ 01 - ABERTURA (Starting Soon)',
      '🎮 02 - GAMEPLAY (Albion Online)',
      '☕ 03 - INTERVALO (Pausa / BRB)',
      '💬 04 - JUST CHATTING (Conversa & Reunião)',
      '🛑 05 - ENCERRAMENTO (Ending Stream)',
      '🎬 06 - REACT & VOD REVIEW (Review de Lutas & Vídeos)',
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

  it('deve calibrar a webcam de gameplay pixel-perfect para a moldura (388x244 na posição x:28, y:706)', () => {
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
    expect(webcamItem?.pos).toEqual({ x: 28.0, y: 706.0 });
    expect(webcamItem?.bounds).toEqual({ x: 388.0, y: 244.0 });
    expect(webcamItem?.bounds_type).toBe(2); // OBS_BOUNDS_SCALE_INNER
  });

  it('deve renderizar a seção de exportação do OBS no ControlDashboard com input e botão de download', () => {
    render(<ControlDashboard />);

    expect(screen.getByText(/Exportar Coleção OBS Studio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Baixar Coleção de Cenas OBS/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://vulgomaniaco-stream-pack.vercel.app')).toBeInTheDocument();
  });

  it('deve calibrar a cena de React com captura de conteúdo (1380x776) e webcam lateral (440x248)', () => {
    const collection = generateObsSceneCollection();

    const reactScene = collection.sources.find(
      (s) => s.id === 'scene' && s.name === '🎬 06 - REACT & VOD REVIEW (Review de Lutas & Vídeos)'
    );
    expect(reactScene).toBeDefined();

    const items = (reactScene?.settings as any)?.items || [];
    const contentItem = items.find(
      (item: any) => item.name === '🎬 Captura de Conteúdo (Vídeo / YouTube / Review)'
    );
    expect(contentItem).toBeDefined();
    expect(contentItem?.bounds).toEqual({ x: 1380.0, y: 776.0 });

    const webcamItem = items.find(
      (item: any) => item.name === '📷 Webcam do Streamer (React Lateral)'
    );
    expect(webcamItem).toBeDefined();
    expect(webcamItem?.bounds).toEqual({ x: 440.0, y: 248.0 });
  });

  it('deve renderizar a seção de configuração do widget de chat no ControlDashboard com botões de cópia', () => {
    render(<ControlDashboard />);

    expect(screen.getByText(/Configuração do Widget de Chat no OBS Studio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copiar URL do Chat Twitch/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copiar Estilo Transparente OBS/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copiar Link StreamElements/i })).toBeInTheDocument();
  });
});
