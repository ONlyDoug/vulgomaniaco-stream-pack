import React, { useState, useEffect } from 'react';
import { StreamAlert } from '../alerts/useAlertQueue';
import { downloadObsSceneCollection } from '../obs/generateObsCollection';
import {
  STREAM_ELEMENTS_WIDGET_HTML,
  STREAM_ELEMENTS_WIDGET_CSS,
  STREAM_ELEMENTS_WIDGET_JS,
  STREAM_ELEMENTS_WIDGET_FIELDS,
} from '../alerts/streamElementsWidgetCode';

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
      <div className="max-w-2xl mx-auto space-y-6">
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

        {/* Disparo de Alertas em Tempo Real */}
        <section className="p-5 rounded-2xl bg-ivexi-surface/80 border border-ivexi-purple/50 space-y-4">
          <h2 className="font-rajdhani text-xl font-bold uppercase text-ivexi-light">
            Testar Alertas Animados
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handleTestFollow}
              className="py-3 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
            >
              Testar Seguidor
            </button>

            <button
              onClick={handleTestSub}
              className="py-3 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
            >
              Testar Sub
            </button>

            <button
              onClick={handleTestDonation}
              className="py-3 px-3 rounded-xl bg-ivexi-dark border border-ivexi-purple/60 hover:border-ivexi-neon hover:text-ivexi-neon font-rajdhani font-bold text-xs uppercase transition"
            >
              Testar Doação
            </button>

            <button
              onClick={handleTestRaid}
              className="py-3 px-3 rounded-xl bg-ivexi-dark border border-red-500/60 hover:border-red-400 hover:text-red-400 font-rajdhani font-bold text-xs uppercase transition cursor-pointer"
            >
              Testar Raid
            </button>
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
              Copiar código para as 4 abas do editor do StreamElements:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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

        {/* Exportador Oficial OBS Studio */}
        <section className="p-5 rounded-2xl bg-ivexi-surface/80 border border-ivexi-purple/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-rajdhani text-xl font-bold uppercase text-ivexi-light flex items-center gap-2">
                <span>🎬</span> Exportar Coleção OBS Studio
              </h2>
              <p className="text-xs text-ivexi-muted">
                Arquivo .json completo com as 5 cenas em 1080p60, alertas e webcam 16:9 pré-calibrada
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
              <li>Pronto! Todas as 5 cenas em 1080p, Facecam bezel, Anti-Ghost e Alertas carregarão automaticamente.</li>
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
