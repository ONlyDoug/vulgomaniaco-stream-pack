import React, { useState, useEffect } from 'react';
import { StreamAlert } from '../alerts/useAlertQueue';
import { downloadObsSceneCollection } from '../obs/generateObsCollection';

export const ControlDashboard: React.FC = () => {
  const [antiSnipeState, setAntiSnipeState] = useState<boolean>(false);
  const [lastDispatched, setLastDispatched] = useState<string>('Nenhum');
  const [obsBaseUrl, setObsBaseUrl] = useState<string>('https://vulgomaniaco-stream-pack.vercel.app');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setObsBaseUrl(window.location.origin);
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
      message: 'Começou a seguir o canal!',
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
      message: 'Inscrito na guilda Tier 8!',
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
      message: 'Para comprar o set 8.3 e dominar o mapa!',
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
      message: 'Invadiu a live com 48 guerreiros da Black Zone!',
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
              className="py-3 px-3 rounded-xl bg-ivexi-dark border border-red-500/60 hover:border-red-400 hover:text-red-400 font-rajdhani font-bold text-xs uppercase transition"
            >
              Testar Raid
            </button>
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

          <p className="text-[11px] text-center text-ivexi-muted">
            Para instalar: Abra o OBS &gt; <strong>Coleção de Cenas</strong> &gt; <strong>Importar</strong> &gt; selecione este arquivo baixado.
            Guia completo disponível em <code className="text-ivexi-neon">obs/COMO_IMPORTAR_NO_OBS.md</code>.
          </p>
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
