import React, { useState, useEffect } from 'react';
import { StreamAlert } from '../alerts/useAlertQueue';
import { downloadObsSceneCollection } from '../obs/generateObsCollection';
import {
  STREAM_ELEMENTS_WIDGET_HTML,
  STREAM_ELEMENTS_WIDGET_CSS,
  STREAM_ELEMENTS_WIDGET_JS,
  STREAM_ELEMENTS_WIDGET_FIELDS,
  STREAM_ELEMENTS_WIDGET_DATA,
} from '../alerts/streamElementsWidgetCode';
import {
  TWITCH_CHAT_POPOUT_URL,
  TWITCH_CHAT_OBS_CSS,
  CHAT_OBS_CALIBRATION,
} from '../obs/chatWidgetConfig';

export const ControlDashboard: React.FC = () => {
  const [antiSnipeState, setAntiSnipeState] = useState<boolean>(false);
  const [lastDispatched, setLastDispatched] = useState<string>('Nenhum');
  const [obsBaseUrl, setObsBaseUrl] = useState<string>('https://vulgomaniaco-stream-pack.vercel.app');
  const DEFAULT_SE_URL = 'https://streamelements.com/overlay/6ac87c7d8ff1dac0ef699fa4/vDEpqFuJcluqDlsaIs4sQ9uIjN7-Z1-_V8Tg79aqgzZ5OT_3';
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [seOverlayUrl, setSeOverlayUrl] = useState<string>(DEFAULT_SE_URL);
  const [seSavedSuccess, setSeSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setObsBaseUrl(window.location.origin);
      const storedSeUrl = localStorage.getItem('streamelements_overlay_url');
      if (storedSeUrl) {
        setSeOverlayUrl(storedSeUrl);
      } else {
        localStorage.setItem('streamelements_overlay_url', DEFAULT_SE_URL);
      }
    }
  }, []);

  const broadcastEvent = (type: string, payload?: any) => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('vulgomaniaco_obs_channel');
      channel.postMessage({ type, payload });
      channel.close();
    }
  };

  const handleTestFollow = () => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'follow',
      username: 'GuerreiroAlbion_' + Math.floor(Math.random() * 900 + 100),
      message: 'Começou a seguir o canal VulgoManiaco!',
      durationMs: 5000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Seguidor: ${alert.username}`);
  };

  const handleTestSub = () => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'sub',
      username: 'Lord_Ivexi_' + Math.floor(Math.random() * 900 + 100),
      message: 'Novo inscrito no canal VulgoManiaco!',
      durationMs: 5000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Sub: ${alert.username}`);
  };

  const handleTestDonation = () => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'donation',
      username: 'PatronoBlackzone',
      amount: 'R$ 50,00',
      message: 'Apoio para a live do VulgoManiaco e sets de Albion!',
      durationMs: 6000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Doação: ${alert.amount}`);
  };

  const handleTestRaid = () => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'raid',
      username: 'GuildaAliada_ZvZ',
      message: 'Invadiu a live do VulgoManiaco com 48 guerreiros da Black Zone!',
      durationMs: 6000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Raid: ${alert.username}`);
  };

  // Novos disparadores para cobertura completa do checklist
  const handleTestSubTier = (subType: 'tier1' | 'tier2' | 'tier3' | 'prime') => {
    const titles = {
      tier1: 'Tier 1 (Recruta)',
      tier2: 'Tier 2 (Soldado CTA)',
      tier3: 'Tier 3 (Imperador)',
      prime: 'Twitch Prime',
    };
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'sub',
      subType,
      username: 'Membro_' + subType.toUpperCase(),
      message: `Inscrito com sucesso no canal como ${titles[subType]}!`,
      durationMs: 5500,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Sub ${titles[subType]}: ${alert.username}`);
  };

  const handleTestResub = () => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'sub',
      subType: 'resub',
      username: 'Veterano_Ivexi',
      months: 6,
      message: '6 meses de guilda e honra na Black Zone de Albion!',
      durationMs: 6000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Resub 6 meses: ${alert.username}`);
  };

  const handleTestGiftSub = () => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'sub',
      subType: 'gift',
      username: 'Benfeitor_Albion',
      recipient: 'Recruta_Iniciante',
      message: 'Bem-vindo à guilda, bom proveito no sub!',
      durationMs: 6000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Gift Sub: ${alert.username} -> ${alert.recipient}`);
  };

  const handleTestSubBomb = (count = 10) => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'sub',
      subType: 'subbomb',
      username: 'Lord_Maniaco',
      giftCount: count,
      durationMs: 6500,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Sub Bomb (${count} subs): ${alert.username}`);
  };

  const handleTestBits = (bits: number) => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'cheer',
      username: 'Apoiador_Overcharge',
      bitsAmount: bits,
      amount: String(bits),
      message: bits >= 5000 ? 'OVERCHARGE TOTAL NA LIVE! BORA PRO PVP!' : 'Toma esses bits pra fortalecer a live!',
      durationMs: 6000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Bits (${bits}): ${alert.username}`);
  };

  const handleTestHypeTrain = (status: 'start' | 'complete') => {
    const alert: StreamAlert = {
      id: String(Date.now()),
      type: 'hypetrain',
      username: 'Guilda IVEXI',
      hypeLevel: status === 'complete' ? 5 : 1,
      hypeStatus: status,
      durationMs: 6000,
    };
    broadcastEvent('TRIGGER_ALERT', alert);
    setLastDispatched(`Trem do Hype (${status === 'complete' ? 'Vitória Nvl 5' : 'Início'}): ${alert.username}`);
  };

  const handleToggleAntiSnipe = () => {
    const nextState = !antiSnipeState;
    setAntiSnipeState(nextState);
    broadcastEvent('TOGGLE_ANTI_SNIPE', nextState);
    setLastDispatched(`Anti-Snipe: ${nextState ? 'ATIVADO' : 'DESATIVADO'}`);
  };

  const handleCopyCode = async (key: string, content: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(content);
        setCopiedKey(key);
        setLastDispatched(`Código ${key.toUpperCase()} copiado para a área de transferência!`);
        setTimeout(() => setCopiedKey(null), 3000);
      }
    } catch (e) {
      console.error('Falha ao copiar:', e);
    }
  };

  const handleSaveSeUrl = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('streamelements_overlay_url', seOverlayUrl.trim());
      setSeSavedSuccess(true);
      setLastDispatched(seOverlayUrl.trim() ? 'URL do StreamElements vinculada!' : 'URL do StreamElements removida.');
      setTimeout(() => setSeSavedSuccess(false), 3000);
    }
  };

  const handleDownloadObs = () => {
    downloadObsSceneCollection(obsBaseUrl, 'VulgoManiaco-Albion-Scene-Collection.json');
    setLastDispatched('Coleção OBS exportada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-ivexi-dark p-6 text-ivexi-light font-inter">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="border-b border-ivexi-purple/40 pb-4 flex items-center justify-between">
          <div>
            <h1 className="font-rajdhani text-3xl font-bold text-ivexi-neon uppercase drop-shadow-neon-yellow">
              Painel de Controle OBS
            </h1>
            <p className="text-sm text-ivexi-muted">Canal VulgoManiaco • Albion Online</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-ivexi-surface border border-ivexi-purple text-xs text-ivexi-neon">
            Ao Vivo
          </div>
        </header>

        {/* Status do Escudo Anti-Snipe */}
        <section className="p-5 rounded-2xl bg-ivexi-surface/80 border border-ivexi-purple/50 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-rajdhani text-xl font-bold uppercase text-ivexi-light">
                Proteção Tática Anti-Snipe
              </h2>
              <p className="text-xs text-ivexi-muted">Oculta as coordenadas do minimapa no topo direito</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                antiSnipeState
                  ? 'bg-ivexi-neon text-ivexi-dark shadow-neon-border'
                  : 'bg-ivexi-dark text-ivexi-muted border border-ivexi-purple/30'
              }`}
            >
              {antiSnipeState ? 'Ativo' : 'Inativo'}
            </span>
          </div>

          <button
            onClick={handleToggleAntiSnipe}
            className={`w-full py-3 rounded-xl font-rajdhani text-lg font-bold uppercase transition duration-200 ${
              antiSnipeState
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-ivexi-purple hover:bg-ivexi-purple/80 text-white shadow-card-glow'
            }`}
          >
            Alternar Anti-Snipe
          </button>
        </section>

        {/* Disparo de Alertas em Tempo Real - Checklist Completo */}
        <section className="p-5 rounded-2xl bg-ivexi-surface/80 border border-ivexi-purple/50 space-y-5">
          <div className="flex items-center justify-between border-b border-ivexi-purple/30 pb-3">
            <div>
              <h2 className="font-rajdhani text-xl font-bold uppercase text-ivexi-neon">
                Testar Alertas do Checklist (Ao Vivo)
              </h2>
              <p className="text-xs text-ivexi-muted">Dispara simulações em tempo real para a camada /alerts e OBS Studio</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-ivexi-dark border border-ivexi-neon/50 text-ivexi-neon font-bold uppercase">
              14 Eventos
            </span>
          </div>

          {/* Categoria 1: Engajamento & Comunidade */}
          <div className="space-y-2">
            <span className="text-xs font-rajdhani font-bold uppercase tracking-wider text-ivexi-muted">
              1. Engajamento & Comunidade:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={handleTestFollow}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
              >
                Testar Seguidor
              </button>
              <button
                onClick={handleTestRaid}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-red-500/60 hover:border-red-400 hover:text-red-400 font-rajdhani font-bold text-xs uppercase transition cursor-pointer"
              >
                Testar Raid
              </button>
            </div>
          </div>

          {/* Categoria 2: Inscrições & Apoio Recorrente */}
          <div className="space-y-2">
            <span className="text-xs font-rajdhani font-bold uppercase tracking-wider text-ivexi-muted">
              2. Inscrições & Apoio Recorrente (Subs):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={handleTestSub}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
              >
                Testar Sub
              </button>
              <button
                onClick={() => handleTestSubTier('tier2')}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#5CE1E6]/60 hover:border-[#5CE1E6] hover:text-[#5CE1E6] font-rajdhani font-bold text-xs uppercase transition"
              >
                Sub Tier 2
              </button>
              <button
                onClick={() => handleTestSubTier('tier3')}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#FFD700]/60 hover:border-[#FFD700] hover:text-[#FFD700] font-rajdhani font-bold text-xs uppercase transition"
              >
                Sub Tier 3
              </button>
              <button
                onClick={() => handleTestSubTier('prime')}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#9146FF]/60 hover:border-[#9146FF] hover:text-white font-rajdhani font-bold text-xs uppercase transition"
              >
                Sub Prime
              </button>
              <button
                onClick={handleTestResub}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-neon/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
              >
                Renovação (6m)
              </button>
              <button
                onClick={handleTestGiftSub}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
              >
                Gift Sub Indiv.
              </button>
              <button
                onClick={() => handleTestSubBomb(10)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-red-500/60 hover:border-red-400 hover:text-red-400 font-rajdhani font-bold text-xs uppercase transition col-span-2"
              >
                💣 Sub Bomb (10 Subs)
              </button>
            </div>
          </div>

          {/* Categoria 3: Apoio Financeiro & Moedas */}
          <div className="space-y-2">
            <span className="text-xs font-rajdhani font-bold uppercase tracking-wider text-ivexi-muted">
              3. Apoio Financeiro & Moedas (Pix / Bits):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <button
                onClick={handleTestDonation}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#00F5A0]/60 hover:border-[#00F5A0] hover:text-[#00F5A0] font-rajdhani font-bold text-xs uppercase transition"
              >
                Testar Doação
              </button>
              <button
                onClick={() => handleTestBits(100)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
              >
                Bits 100
              </button>
              <button
                onClick={() => handleTestBits(500)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#00E5FF]/60 hover:border-[#00E5FF] hover:text-[#00E5FF] font-rajdhani font-bold text-xs uppercase transition"
              >
                Bits 500
              </button>
              <button
                onClick={() => handleTestBits(1000)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-neon/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
              >
                Bits 1.000
              </button>
              <button
                onClick={() => handleTestBits(5000)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#FF007F]/60 hover:border-[#FF007F] hover:text-[#FF007F] font-rajdhani font-bold text-xs uppercase transition"
              >
                ⚡ Bits 5.000+
              </button>
            </div>
          </div>

          {/* Categoria 4: Eventos Especiais */}
          <div className="space-y-2">
            <span className="text-xs font-rajdhani font-bold uppercase tracking-wider text-ivexi-muted">
              4. Eventos Especiais & Metas:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => handleTestHypeTrain('start')}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#FFD700]/60 hover:border-[#FFD700] hover:text-[#FFD700] font-rajdhani font-bold text-xs uppercase transition"
              >
                🚂 Trem do Hype (Início)
              </button>
              <button
                onClick={() => handleTestHypeTrain('complete')}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-[#FFD700]/60 hover:border-[#FFD700] hover:text-[#FFD700] font-rajdhani font-bold text-xs uppercase transition"
              >
                🏆 Trem do Hype (Conclusão Nvl 5)
              </button>
            </div>
          </div>
        </section>


        {/* Seção Custom Widget StreamElements (Acesso Compartilhado) */}
        <section className="p-5 rounded-2xl bg-ivexi-surface/80 border border-ivexi-purple/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-rajdhani text-xl font-bold uppercase text-ivexi-neon flex items-center gap-2">
                <span>🛡️</span> Widget de Alertas StreamElements (Acesso Compartilhado)
              </h2>
              <p className="text-xs text-ivexi-muted">
                Copie o pacote oficial da IVEXI e cole nas abas do Custom Widget no canal <strong>vulgoomaniaco</strong>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-ivexi-purple/30 text-ivexi-neon border border-ivexi-purple">
              1080p nativo
            </span>
          </div>

          {/* Botões de Cópia Rápida 1-Clique */}
          <div className="space-y-2">
            <label className="text-xs text-ivexi-light/90 block font-semibold">
              Copiar código para as 5 abas do editor do StreamElements:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => handleCopyCode('html', STREAM_ELEMENTS_WIDGET_HTML)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'html' ? '✅ Copiado!' : '📋 Copiar HTML'}
              </button>

              <button
                onClick={() => handleCopyCode('css', STREAM_ELEMENTS_WIDGET_CSS)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'css' ? '✅ Copiado!' : '📋 Copiar CSS'}
              </button>

              <button
                onClick={() => handleCopyCode('js', STREAM_ELEMENTS_WIDGET_JS)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'js' ? '✅ Copiado!' : '📋 Copiar JS'}
              </button>

              <button
                onClick={() => handleCopyCode('fields', STREAM_ELEMENTS_WIDGET_FIELDS)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'fields' ? '✅ Copiado!' : '📋 Copiar Fields'}
              </button>

              <button
                onClick={() => handleCopyCode('data', STREAM_ELEMENTS_WIDGET_DATA)}
                className="py-2.5 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition flex items-center justify-center gap-1.5 cursor-pointer col-span-2 sm:col-span-1"
              >
                {copiedKey === 'data' ? '✅ Copiado!' : '📋 Copiar Data'}
              </button>
            </div>
          </div>

          {/* Vínculo opcional do Overlay Link */}
          <div className="pt-2 border-t border-ivexi-purple/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-ivexi-muted block font-semibold">
                Link do Overlay Gerado no StreamElements (opcional):
              </label>
              {seOverlayUrl.trim() && (
                <span className="text-[10px] text-green-400 font-bold uppercase flex items-center gap-1">
                  ● Conectado ao /alerts
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={seOverlayUrl}
                onChange={(e) => setSeOverlayUrl(e.target.value)}
                placeholder="https://streamelements.com/overlay/..."
                className="flex-1 px-3 py-2 rounded-xl bg-ivexi-dark border border-ivexi-purple/50 text-xs text-ivexi-light focus:outline-none focus:border-ivexi-neon font-mono"
              />
              <button
                onClick={handleSaveSeUrl}
                className="px-4 py-2 rounded-xl bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani font-bold text-xs uppercase transition cursor-pointer"
              >
                {seSavedSuccess ? 'Salvo!' : 'Salvar'}
              </button>
            </div>
            <p className="text-[11px] text-ivexi-muted">
              Ao salvar, a rota oficial <code>/alerts</code> exibirá automaticamente este overlay no OBS Studio.
            </p>
          </div>

          {/* Mini Passo a Passo */}
          <div className="p-3 rounded-xl bg-ivexi-dark/70 border border-ivexi-purple/30 text-xs space-y-1 text-ivexi-muted">
            <span className="font-bold text-ivexi-light flex items-center gap-1 text-[11px] uppercase">
              <span>💡</span> Resumo do Passo a Passo (Menos de 3 minutos):
            </span>
            <ol className="list-decimal list-inside space-y-0.5 text-[11px] leading-relaxed">
              <li>No StreamElements, troque para o canal <strong>vulgoomaniaco</strong>.</li>
              <li>Em <strong>Streaming Tools &gt; Overlays</strong>, crie um overlay em 1080p e adicione <strong>Custom Widget</strong>.</li>
              <li>Cole cada código acima nas abas <strong>HTML</strong>, <strong>CSS</strong>, <strong>JS</strong> e <strong>FIELDS</strong>.</li>
              <li>Clique em <strong>Done &gt; Save</strong>, copie o link do overlay e cole no OBS ou no campo acima.</li>
            </ol>
          </div>
        </section>

        {/* Seção Widget de Chat para OBS Studio */}
        <section className="p-5 rounded-2xl bg-ivexi-surface/80 border border-ivexi-purple/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-rajdhani text-xl font-bold uppercase text-ivexi-neon flex items-center gap-2">
                <span>💬</span> Configuração do Widget de Chat no OBS Studio
              </h2>
              <p className="text-xs text-ivexi-muted">
                Para as cenas <strong>🎬 06 - REACT & VOD REVIEW</strong> e <strong>💬 04 - JUST CHATTING</strong>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-ivexi-purple/30 text-ivexi-neon border border-ivexi-purple">
              Twitch & StreamElements
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Método 1: Twitch Popout Oficial */}
            <div className="p-4 rounded-xl bg-ivexi-dark/90 border border-ivexi-purple/50 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase flex items-center gap-1.5">
                    <span>⚡</span> Método 1: Chat Popout Nativo (Recomendado)
                  </span>
                  <span className="text-[10px] text-ivexi-neon font-bold uppercase bg-ivexi-purple/40 px-2 py-0.5 rounded">
                    Sem Cadastro
                  </span>
                </div>
                <p className="text-xs text-ivexi-muted leading-relaxed">
                  Adicione uma fonte de <strong>Navegador</strong> no OBS com a URL oficial da Twitch e aplique nosso CSS com fundo transparente e sem poluição.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-ivexi-purple/30">
                <button
                  onClick={() => handleCopyCode('chat-url', TWITCH_CHAT_POPOUT_URL)}
                  className="w-full py-2.5 px-3 rounded-xl bg-ivexi-surface border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'chat-url' ? '✅ URL Copiada!' : '📋 Copiar URL do Chat Twitch'}
                </button>

                <button
                  onClick={() => handleCopyCode('chat-css', TWITCH_CHAT_OBS_CSS)}
                  className="w-full py-2.5 px-3 rounded-xl bg-ivexi-surface border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'chat-css' ? '✅ Estilo Copiado!' : '📋 Copiar Estilo Transparente OBS'}
                </button>
              </div>
            </div>

            {/* Medidas Calibradas */}
            <div className="p-4 rounded-xl bg-ivexi-dark/90 border border-ivexi-purple/50 space-y-3 text-xs">
              <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase flex items-center gap-1.5">
                <span>📐</span> Medidas no OBS (Pixel-Perfect)
              </span>
              <ul className="space-y-2 text-ivexi-muted">
                <li className="p-2 rounded-lg bg-[#0e0716] border border-ivexi-purple/30">
                  <div className="font-bold text-ivexi-light text-[11px] uppercase text-ivexi-neon">
                    {CHAT_OBS_CALIBRATION.reactScene.label}
                  </div>
                  <div className="text-[11px] mt-0.5">
                    Largura: <strong>{CHAT_OBS_CALIBRATION.reactScene.width}px</strong> • Altura: <strong>{CHAT_OBS_CALIBRATION.reactScene.height}px</strong>
                  </div>
                  <div className="text-[10px] text-ivexi-muted/70">
                    Posição sugerida: X: {CHAT_OBS_CALIBRATION.reactScene.x}, Y: {CHAT_OBS_CALIBRATION.reactScene.y} (abaixo da webcam lateral)
                  </div>
                </li>
                <li className="p-2 rounded-lg bg-[#0e0716] border border-ivexi-purple/30">
                  <div className="font-bold text-ivexi-light text-[11px] uppercase text-ivexi-neon">
                    {CHAT_OBS_CALIBRATION.chattingScene.label}
                  </div>
                  <div className="text-[11px] mt-0.5">
                    Largura: <strong>{CHAT_OBS_CALIBRATION.chattingScene.width}px</strong> • Altura: <strong>{CHAT_OBS_CALIBRATION.chattingScene.height}px</strong>
                  </div>
                  <div className="text-[10px] text-ivexi-muted/70">
                    Posição sugerida: X: {CHAT_OBS_CALIBRATION.chattingScene.x}, Y: {CHAT_OBS_CALIBRATION.chattingScene.y} (coluna direita inteira)
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Exportador Oficial OBS Studio */}
        <section className="p-5 rounded-2xl bg-ivexi-surface/80 border border-ivexi-purple/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-rajdhani text-xl font-bold uppercase text-ivexi-light flex items-center gap-2">
                <span>🎬</span> Exportar Coleção OBS Studio
              </h2>
              <p className="text-xs text-ivexi-muted">
                Arquivo .json completo com as 6 cenas em 1080p60, alertas e webcam 16:9 pré-calibrada
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-ivexi-purple/30 text-ivexi-neon border border-ivexi-purple">
              OBS 30+
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-ivexi-muted block font-semibold">
              URL Base do Servidor (ajuste caso use IP de rede ou Tailscale):
            </label>
            <input
              type="text"
              value={obsBaseUrl}
              onChange={(e) => setObsBaseUrl(e.target.value)}
              placeholder="https://vulgomaniaco-stream-pack.vercel.app"
              className="w-full px-4 py-2 rounded-xl bg-ivexi-dark border border-ivexi-purple/50 text-sm text-ivexi-light focus:outline-none focus:border-ivexi-neon font-mono"
            />
          </div>

          <button
            onClick={handleDownloadObs}
            className="w-full py-3 rounded-xl font-rajdhani text-lg font-bold uppercase bg-ivexi-neon hover:bg-yellow-400 text-ivexi-dark shadow-neon-border transition duration-200 flex items-center justify-center gap-2 cursor-pointer font-bold"
          >
            <span>⬇️</span> Baixar Coleção de Cenas OBS (.json)
          </button>

          <div className="p-3.5 rounded-xl bg-ivexi-dark/90 border border-ivexi-neon/40 text-xs space-y-2">
            <div className="font-rajdhani font-bold text-ivexi-neon text-sm uppercase flex items-center gap-1.5">
              <span>⚠️</span> Passo essencial para ativar as cenas no OBS:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-ivexi-light/90 text-[11px] leading-relaxed">
              <li>No OBS, clique em <strong>Coleção de Cenas</strong> &gt; <strong>Importar</strong> &gt; selecione o arquivo baixado e clique em <strong>Importar</strong>.</li>
              <li className="text-ivexi-neon font-semibold">
                <strong>IMPORTANTE:</strong> Após importar, volte no menu superior <strong>Coleção de Cenas</strong> e <u>clique no nome da coleção</u>: <span className="underline">VulgoManiaco - Albion Online Stream Pack</span> para ativá-la (o OBS não troca sozinho).
              </li>
              <li>Pronto! Todas as 6 cenas em 1080p, Facecam bezel, Anti-Ghost e Alertas carregarão automaticamente.</li>
            </ol>
          </div>
        </section>

        {/* Registro de Último Comando Disparado */}
        <div className="p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/30 text-xs text-ivexi-muted flex items-center justify-between">
          <span>Último comando transmitido:</span>
          <span className="font-mono text-ivexi-neon font-semibold">{lastDispatched}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlDashboard;
