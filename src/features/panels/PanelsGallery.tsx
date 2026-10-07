import React, { useState } from 'react';
import { PanelCard } from './PanelCard';
import { CHANNEL_PANELS_DATA, exportPanels } from './exportPanels';
import logoBadgeImg from '@/assets/images/logo-streamer-vulgomaniaco-badge.png';
import logoHorizontalImg from '@/assets/images/logo-streamer-vulgomaniaco-horizontal.png';
import logoAvatarImg from '@/assets/images/logo-streamer-vulgomaniaco-avatar.png';
import logoCompactImg from '@/assets/images/streamer-vulgomaniaco-compact-512w.png';

export const PanelsGallery: React.FC = () => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');

  const handleExportAll = async () => {
    setIsExporting(true);
    setExportMessage('Gerando painéis em PNG e SVG...');
    try {
      const result = await exportPanels();
      setExportMessage(`Sucesso! ${result.exportedCount} painéis exportados nos formatos PNG e SVG.`);
    } catch {
      setExportMessage('Erro ao exportar painéis.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      data-testid="panels-gallery-container"
      data-contrast-wcag="AAA"
      className="min-h-screen bg-ivexi-dark p-8 text-ivexi-light font-inter"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Cabeçalho da Galeria */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ivexi-purple/40 pb-6">
          <div>
            <h1 className="font-rajdhani text-4xl font-bold uppercase text-ivexi-neon drop-shadow-neon-yellow tracking-wide">
              Painéis do Canal (Twitch & Kick)
            </h1>
            <p className="text-sm text-ivexi-muted mt-1">
              6 painéis padronizados na largura nativa de 320px com identidade visual oficial do streamer VulgoManiaco
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleExportAll}
              disabled={isExporting}
              className="py-3 px-6 rounded-xl bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani text-lg font-bold uppercase shadow-card-glow transition duration-200 disabled:opacity-50"
            >
              {isExporting ? 'Exportando...' : 'Exportar Todos os Painéis'}
            </button>
          </div>
        </header>

        {exportMessage && (
          <div className="p-4 rounded-xl bg-ivexi-surface border border-ivexi-neon text-ivexi-neon text-sm font-semibold">
            {exportMessage}
          </div>
        )}

        {/* Seção dos Logotipos Oficiais do Streamer */}
        <section className="p-6 rounded-2xl bg-ivexi-surface/90 border border-ivexi-purple/60 shadow-card-glow space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ivexi-purple/40 pb-4">
            <div>
              <h2 className="font-rajdhani text-2xl font-bold uppercase text-ivexi-neon drop-shadow-neon-yellow">
                Identidade Visual e Logotipos Oficiais (Brandfy)
              </h2>
              <p className="text-xs text-ivexi-muted">
                Arquivos mestres oficiais com o Mascote Corvo Chibi e o banner tático VULGOMANIACO
              </p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-ivexi-dark border border-ivexi-neon text-xs font-rajdhani font-bold text-ivexi-neon uppercase">
              Brand Pack 1.0
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Card Badge Oficial */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/50 text-center space-y-3">
              <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase">Escudo Tático (Badge Principal)</span>
              <div className="w-full h-56 flex items-center justify-center p-2 rounded-lg bg-[#0e0716] border border-ivexi-purple/30">
                <img
                  src={logoBadgeImg}
                  alt="Logotipo Badge VulgoManiaco"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <a
                href="/assets/images/logo-streamer-vulgomaniaco-badge.png"
                download="logo-streamer-vulgomaniaco-badge.png"
                className="w-full py-2 px-3 rounded-lg bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani text-xs font-bold uppercase transition"
              >
                Baixar PNG Master
              </a>
            </div>

            {/* Card Horizontal */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/50 text-center space-y-3">
              <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase">Logotipo Horizontal (Headers)</span>
              <div className="w-full h-56 flex items-center justify-center p-2 rounded-lg bg-[#0e0716] border border-ivexi-purple/30">
                <img
                  src={logoHorizontalImg}
                  alt="Logotipo Horizontal VulgoManiaco"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <a
                href="/assets/images/logo-streamer-vulgomaniaco-horizontal.png"
                download="logo-streamer-vulgomaniaco-horizontal.png"
                className="w-full py-2 px-3 rounded-lg bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani text-xs font-bold uppercase transition"
              >
                Baixar PNG Horizontal
              </a>
            </div>

            {/* Card Avatar / Ícone Circular */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/50 text-center space-y-3">
              <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase">Avatar Circular (Discord & Perfis)</span>
              <div className="w-full h-56 flex items-center justify-center p-2 rounded-lg bg-[#0e0716] border border-ivexi-purple/30">
                <img
                  src={logoAvatarImg}
                  alt="Avatar Circular VulgoManiaco"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <a
                href="/assets/images/logo-streamer-vulgomaniaco-avatar.png"
                download="logo-streamer-vulgomaniaco-avatar.png"
                className="w-full py-2 px-3 rounded-lg bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani text-xs font-bold uppercase transition"
              >
                Baixar PNG Avatar
              </a>
            </div>

            {/* Card Ícone Compacto Oficial */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-neon/50 text-center space-y-3">
              <span className="font-rajdhani text-sm font-bold text-ivexi-neon uppercase">Ícone Compacto (Perfil & Painéis)</span>
              <div className="w-full h-56 flex items-center justify-center p-2 rounded-lg bg-[#0e0716] border border-ivexi-purple/30">
                <img
                  src={logoCompactImg}
                  alt="Ícone Compacto VulgoManiaco"
                  className="w-40 h-40 object-contain"
                  data-testid="compact-logo-showcase"
                />
              </div>
              <a
                href="/assets/images/streamer-vulgomaniaco-compact-512w.png"
                download="streamer-vulgomaniaco-compact-512w.png"
                className="w-full py-2 px-3 rounded-lg bg-ivexi-neon hover:bg-yellow-400 text-ivexi-dark font-rajdhani text-xs font-bold uppercase shadow-neon-border transition"
              >
                Baixar PNG Compacto
              </a>
            </div>
          </div>
        </section>

        {/* Seção Banners Sociais Oficiais (Twitch & YouTube) */}
        <section className="p-6 rounded-2xl bg-ivexi-surface/90 border border-ivexi-purple/60 shadow-card-glow space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ivexi-purple/40 pb-4">
            <div>
              <h2 className="font-rajdhani text-2xl font-bold uppercase text-ivexi-neon drop-shadow-neon-yellow">
                Banners de Canal & Redes Sociais
              </h2>
              <p className="text-xs text-ivexi-muted">
                Banners padronizados para tela de offline na Twitch/Kick e cabeçalhos oficiais
              </p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-ivexi-dark border border-ivexi-neon text-xs font-rajdhani font-bold text-ivexi-neon uppercase">
              Brandfy Channels
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offline Screen */}
            <div className="p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/50 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase">Tela Offline Twitch/Kick (1080p)</span>
                <p className="text-[11px] text-ivexi-muted mt-1">Exibida quando o canal estiver fora do ar</p>
              </div>
              <a
                href="/brand/social/twitch/twitch-offline-banner-1080p.png"
                download="twitch-offline-banner-1080p.png"
                className="w-full py-2 px-3 rounded-lg bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani text-xs font-bold uppercase text-center transition"
              >
                Baixar 1920x1080 PNG
              </a>
            </div>

            {/* Twitch Header */}
            <div className="p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/50 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase">Header Twitch Perfil (1200x480)</span>
                <p className="text-[11px] text-ivexi-muted mt-1">Banner superior de cabeçalho do perfil Twitch</p>
              </div>
              <a
                href="/brand/social/twitch/twitch-header-banner-1200x480.png"
                download="twitch-header-banner-1200x480.png"
                className="w-full py-2 px-3 rounded-lg bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani text-xs font-bold uppercase text-center transition"
              >
                Baixar 1200x480 PNG
              </a>
            </div>

            {/* YouTube Header */}
            <div className="p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/50 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-rajdhani text-sm font-bold text-ivexi-light uppercase">Banner YouTube Canal (2560x1440)</span>
                <p className="text-[11px] text-ivexi-muted mt-1">Com safe zone centralizada de 1546x423 px</p>
              </div>
              <a
                href="/brand/social/youtube/youtube-header-banner-2560x1440.png"
                download="youtube-header-banner-2560x1440.png"
                className="w-full py-2 px-3 rounded-lg bg-ivexi-purple hover:bg-ivexi-purple/80 text-white font-rajdhani text-xs font-bold uppercase text-center transition"
              >
                Baixar 2560x1440 PNG
              </a>
            </div>
          </div>
        </section>


        {/* Grade com os 6 Painéis de 320px */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {CHANNEL_PANELS_DATA.map((panel) => (
            <PanelCard
              key={panel.id}
              id={panel.id}
              title={panel.title}
              description={panel.description}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default PanelsGallery;
