/**
 * Gerador oficial da Coleção de Cenas do OBS Studio (.json)
 * Cria a estrutura compatível com OBS Studio (Scene Collection) com as 5 cenas completas,
 * fontes de navegador em 1080p60 e posicionamento pixel-perfect da webcam do streamer.
 */

export interface ObsSceneCollectionOptions {
  baseUrl?: string;
  collectionName?: string;
}

export function generateObsSceneCollection(options: ObsSceneCollectionOptions = {}) {
  const baseUrl = (options.baseUrl || 'http://localhost:5173').replace(/\/$/, '');
  const collectionName = options.collectionName || 'VulgoManiaco - Albion Online Stream Pack';

  // CSS padrão para garantir transparência absoluta e sem barras de rolagem no OBS
  const customCss = 'body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }';

  return {
    name: collectionName,
    current_scene: '🎮 02 - GAMEPLAY (Albion Online)',
    current_program_scene: '🎮 02 - GAMEPLAY (Albion Online)',
    scene_order: [
      { name: '⏳ 01 - ABERTURA (Starting Soon)' },
      { name: '🎮 02 - GAMEPLAY (Albion Online)' },
      { name: '☕ 03 - INTERVALO (Pausa / BRB)' },
      { name: '💬 04 - JUST CHATTING (Conversa & Reunião)' },
      { name: '🛑 05 - ENCERRAMENTO (Ending Stream)' },
    ],
    sources: [
      // 1. Fonte de Navegador Global de Alertas
      {
        id: 'browser_source',
        name: '🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)',
        muted: false,
        volume: 1.0,
        settings: {
          url: `${baseUrl}/alerts`,
          width: 1920,
          height: 1080,
          fps: 60,
          css: customCss,
          shutdown: false,
          restart_when_active: false,
        },
      },

      // 2. Fonte de Navegador: Cena de Abertura
      {
        id: 'browser_source',
        name: '⏳ HUD Abertura (Starting Soon)',
        muted: false,
        volume: 1.0,
        settings: {
          url: `${baseUrl}/scenes/starting`,
          width: 1920,
          height: 1080,
          fps: 60,
          css: customCss,
          shutdown: true,
          restart_when_active: true,
        },
      },

      // 3. Fonte de Navegador: Overlay de Gameplay (Facecam Bezel + Anti-Snipe)
      {
        id: 'browser_source',
        name: '🎮 Overlay de Gameplay (Facecam & Anti-Snipe)',
        muted: false,
        volume: 1.0,
        settings: {
          url: `${baseUrl}/overlay/gameplay`,
          width: 1920,
          height: 1080,
          fps: 60,
          css: customCss,
          shutdown: false,
          restart_when_active: false,
        },
      },

      // 4. Fonte de Navegador: Cena de Intervalo (BRB)
      {
        id: 'browser_source',
        name: '☕ HUD Intervalo (BRB)',
        muted: false,
        volume: 1.0,
        settings: {
          url: `${baseUrl}/scenes/brb`,
          width: 1920,
          height: 1080,
          fps: 60,
          css: customCss,
          shutdown: true,
          restart_when_active: true,
        },
      },

      // 5. Fonte de Navegador: Cena de Just Chatting
      {
        id: 'browser_source',
        name: '💬 HUD Just Chatting',
        muted: false,
        volume: 1.0,
        settings: {
          url: `${baseUrl}/scenes/chatting`,
          width: 1920,
          height: 1080,
          fps: 60,
          css: customCss,
          shutdown: true,
          restart_when_active: true,
        },
      },

      // 6. Fonte de Navegador: Cena de Encerramento
      {
        id: 'browser_source',
        name: '🛑 HUD Encerramento (Ending)',
        muted: false,
        volume: 1.0,
        settings: {
          url: `${baseUrl}/scenes/ending`,
          width: 1920,
          height: 1080,
          fps: 60,
          css: customCss,
          shutdown: true,
          restart_when_active: true,
        },
      },

      // 7. Captura de Jogo (Albion Online)
      {
        id: 'game_capture',
        name: '⚔️ Captura de Jogo (Albion Online)',
        muted: false,
        volume: 1.0,
        settings: {
          capture_mode: 'window',
          window: 'Albion-Online.exe:Albion-Online:Albion-Online',
          hook_rate: 1,
          cursor: true,
        },
      },

      // 8. Webcam do Streamer (Facecam Gameplay 16:9 - 384x216)
      {
        id: 'dshow_input',
        name: '📷 Webcam do Streamer (Facecam Gameplay)',
        muted: false,
        volume: 1.0,
        settings: {},
      },

      // 9. Webcam Grande (Just Chatting - 1224x640)
      {
        id: 'dshow_input',
        name: '📷 Webcam do Streamer (Just Chatting Grande)',
        muted: false,
        volume: 1.0,
        settings: {},
      },

      // ================= CENA 01: ABERTURA =================
      {
        id: 'scene',
        name: '⏳ 01 - ABERTURA (Starting Soon)',
        settings: {
          items: [
            {
              name: '⏳ HUD Abertura (Starting Soon)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
            {
              name: '🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
          ],
        },
      },

      // ================= CENA 02: GAMEPLAY (ALBION ONLINE) =================
      {
        id: 'scene',
        name: '🎮 02 - GAMEPLAY (Albion Online)',
        settings: {
          items: [
            // Camada 1 (Fundo): Jogo
            {
              name: '⚔️ Captura de Jogo (Albion Online)',
              visible: true,
              locked: false,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
            // Camada 2: Webcam (posicionada em x=32, y=824, largura 384, altura 216 - pixel-perfect dentro da moldura)
            {
              name: '📷 Webcam do Streamer (Facecam Gameplay)',
              visible: true,
              locked: false,
              pos: { x: 32.0, y: 824.0 },
              bounds: { x: 384.0, y: 216.0 },
              bounds_type: 2, // OBS_BOUNDS_SCALE_INNER
              scale: { x: 1.0, y: 1.0 },
            },
            // Camada 3: Overlay (Moldura Facecam + Escudo Anti-Snipe no minimapa)
            {
              name: '🎮 Overlay de Gameplay (Facecam & Anti-Snipe)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
            // Camada 4 (Topo): Alertas
            {
              name: '🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
          ],
        },
      },

      // ================= CENA 03: INTERVALO (BRB) =================
      {
        id: 'scene',
        name: '☕ 03 - INTERVALO (Pausa / BRB)',
        settings: {
          items: [
            {
              name: '☕ HUD Intervalo (BRB)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
            {
              name: '🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
          ],
        },
      },

      // ================= CENA 04: JUST CHATTING =================
      {
        id: 'scene',
        name: '💬 04 - JUST CHATTING (Conversa & Reunião)',
        settings: {
          items: [
            // Camada 1: Webcam Grande encaixada na janela
            {
              name: '📷 Webcam do Streamer (Just Chatting Grande)',
              visible: true,
              locked: false,
              pos: { x: 40.0, y: 106.0 },
              bounds: { x: 1224.0, y: 640.0 },
              bounds_type: 2,
              scale: { x: 1.0, y: 1.0 },
            },
            // Camada 2: Overlay da cena
            {
              name: '💬 HUD Just Chatting',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
            // Camada 3: Alertas
            {
              name: '🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
          ],
        },
      },

      // ================= CENA 05: ENCERRAMENTO =================
      {
        id: 'scene',
        name: '🛑 05 - ENCERRAMENTO (Ending Stream)',
        settings: {
          items: [
            {
              name: '🛑 HUD Encerramento (Ending)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
            {
              name: '🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)',
              visible: true,
              locked: true,
              pos: { x: 0.0, y: 0.0 },
              scale: { x: 1.0, y: 1.0 },
            },
          ],
        },
      },
    ],
  };
}

/**
 * Dispara o download direto do arquivo .json no navegador
 */
export function downloadObsSceneCollection(baseUrl?: string, fileName?: string) {
  const data = generateObsSceneCollection({ baseUrl });
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || 'VulgoManiaco-Albion-Scene-Collection.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
