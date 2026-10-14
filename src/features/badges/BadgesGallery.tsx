import React, { useState } from 'react';
import {
  SUB_BADGES_DATA,
  EMOTES_DATA,
  CHANNEL_POINTS_DATA,
  BIT_BADGES_DATA,
  ZIP_DOWNLOAD_URL,
  SubBadgeItem,
  EmoteItem,
} from './twitchAffiliateData';

type PreviewTheme = 'twitch-dark' | 'twitch-light' | 'ivexi-dark';

export const BadgesGallery: React.FC = () => {
  const [theme, setTheme] = useState<PreviewTheme>('twitch-dark');
  const [selectedSubBadge, setSelectedSubBadge] = useState<SubBadgeItem>(SUB_BADGES_DATA[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const getThemeBg = () => {
    switch (theme) {
      case 'twitch-dark':
        return 'bg-[#18181B] text-[#EFEFF1] border-[#303036]';
      case 'twitch-light':
        return 'bg-[#F7F7F8] text-[#0E0E10] border-[#E5E5E8] shadow-sm';
      case 'ivexi-dark':
      default:
        return 'bg-[#0B0512] text-ivexi-light border-ivexi-purple/50';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div
      data-testid="badges-gallery-container"
      data-contrast-wcag="AAA"
      className="min-h-screen bg-ivexi-dark text-ivexi-light font-inter p-4 sm:p-8"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Cabeçalho */}
        <header className="text-center space-y-3 border-b border-ivexi-purple/40 pb-6">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-ivexi-neon/20 border border-ivexi-neon/50 text-xs font-rajdhani font-bold text-ivexi-neon uppercase tracking-wider">
              ⭐ Afiliado Twitch Desbloqueado
            </span>
            <span className="px-3 py-1 rounded-full bg-ivexi-surface border border-ivexi-purple text-xs font-rajdhani font-bold text-purple-300 uppercase tracking-wider">
              Guilda IVEXI • VulgoManiaco
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-rajdhani font-bold text-ivexi-neon tracking-wide uppercase drop-shadow-neon-yellow">
            Pack de Afiliado Twitch
          </h1>
          <p className="text-ivexi-muted max-w-2xl mx-auto text-sm sm:text-base">
            Distintivos de inscrito, emotes de chat, moeda da live e badges de bits otimizados
            com transparência alfa real e dimensões oficiais da Twitch.
          </p>

          {/* Alternador de Tema de Visualização */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs text-ivexi-muted font-rajdhani font-semibold uppercase mr-2">
              Fundo de Teste:
            </span>
            <button
              onClick={() => setTheme('twitch-dark')}
              className={`px-3 py-1 rounded-lg text-xs font-rajdhani font-bold uppercase transition border ${
                theme === 'twitch-dark'
                  ? 'bg-[#18181B] text-white border-purple-500 shadow-neon-border'
                  : 'bg-ivexi-surface text-ivexi-muted border-ivexi-purple/30 hover:text-white'
              }`}
            >
              Twitch Dark (#18181B)
            </button>
            <button
              onClick={() => setTheme('twitch-light')}
              className={`px-3 py-1 rounded-lg text-xs font-rajdhani font-bold uppercase transition border ${
                theme === 'twitch-light'
                  ? 'bg-white text-gray-900 border-yellow-500 shadow-neon-border'
                  : 'bg-ivexi-surface text-ivexi-muted border-ivexi-purple/30 hover:text-white'
              }`}
            >
              Twitch Light (#F7F7F8)
            </button>
            <button
              onClick={() => setTheme('ivexi-dark')}
              className={`px-3 py-1 rounded-lg text-xs font-rajdhani font-bold uppercase transition border ${
                theme === 'ivexi-dark'
                  ? 'bg-ivexi-surface text-ivexi-neon border-ivexi-neon shadow-neon-border'
                  : 'bg-ivexi-surface text-ivexi-muted border-ivexi-purple/30 hover:text-white'
              }`}
            >
              IVEXI Deep Purple
            </button>
          </div>
        </header>

        {/* Banner de Download do ZIP Completo */}
        <section className="p-6 rounded-2xl bg-ivexi-surface/90 border-2 border-ivexi-neon/70 shadow-neon-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl">📦</span>
              <h2 className="font-rajdhani text-2xl font-bold uppercase text-ivexi-neon">
                Baixar Pack de Afiliado Completo (.ZIP)
              </h2>
              <span className="px-2 py-0.5 rounded bg-ivexi-dark text-[10px] font-bold text-ivexi-neon border border-ivexi-neon uppercase">
                1-Clique
              </span>
            </div>
            <p className="text-sm text-ivexi-light/90 max-w-2xl">
              Inclui todos os 76 arquivos PNG em 4 resoluções cada (18px, 28px, 36px, 56px, 72px, 112px e Master 512px)
              organizados em pastas prontas + Guia de Instruções de Upload.
            </p>
          </div>

          <a
            href={ZIP_DOWNLOAD_URL}
            download="pack-afiliado-twitch-vulgomaniaco.zip"
            className="px-6 py-3.5 rounded-xl font-rajdhani text-base font-bold uppercase bg-ivexi-neon hover:bg-yellow-400 text-ivexi-dark shadow-neon-border transition duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>⬇️</span> Baixar Pack (.ZIP)
          </a>
        </section>

        {/* Simulador de Chat da Twitch */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-rajdhani font-bold text-ivexi-neon uppercase flex items-center gap-2">
                <span>💬</span> Simulador de Chat da Twitch (Escala Real de Chat)
              </h2>
              <p className="text-xs text-ivexi-muted">
                Veja como o distintivo (18px) e os emotes (28px) se comportam na linha real do chat ao vivo.
              </p>
            </div>

            {/* Seletor de distintivo no simulador */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-ivexi-muted font-rajdhani">Distintivo Ativo:</span>
              <select
                value={selectedSubBadge.id}
                onChange={(e) => {
                  const b = SUB_BADGES_DATA.find((item) => item.id === e.target.value);
                  if (b) setSelectedSubBadge(b);
                }}
                className="bg-ivexi-surface text-xs text-ivexi-light border border-ivexi-purple rounded px-2 py-1 font-rajdhani font-semibold"
              >
                {SUB_BADGES_DATA.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.duration} - {b.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors ${getThemeBg()}`}
            data-testid="twitch-chat-simulator"
          >
            <div className="space-y-3 font-inter text-xs sm:text-sm">
              {/* Linha 1: A Piada Interna em Ação */}
              <div className="flex items-start gap-2 leading-relaxed">
                <span className="text-[11px] opacity-40 font-mono">19:42</span>
                <div className="inline-flex items-center gap-1.5 flex-wrap">
                  {/* Badge 18px */}
                  <img
                    src={selectedSubBadge.size18Url}
                    alt={selectedSubBadge.title}
                    width={18}
                    height={18}
                    className="inline-block object-contain"
                  />
                  <span className="font-bold text-[#A970FF] hover:underline cursor-pointer">
                    Cavaleiro_Albion
                  </span>
                  <span>:</span>
                  <span>Bota pra fora, energiza e monta rapaziada!!</span>
                  <img
                    src="/assets/twitch/emotes/vulgoENERGIZA_28x28.png"
                    alt="vulgoENERGIZA"
                    width={28}
                    height={28}
                    className="inline-block object-contain align-middle ml-1"
                    title="vulgoENERGIZA"
                  />
                  <img
                    src="/assets/twitch/emotes/vulgoGG_28x28.png"
                    alt="vulgoGG"
                    width={28}
                    height={28}
                    className="inline-block object-contain align-middle ml-1"
                    title="vulgoGG"
                  />
                </div>
              </div>

              {/* Linha 2: Monta e Hype */}
              <div className="flex items-start gap-2 leading-relaxed">
                <span className="text-[11px] opacity-40 font-mono">19:43</span>
                <div className="inline-flex items-center gap-1.5 flex-wrap">
                  <img
                    src="/assets/twitch/sub_badges/sub_6m_18x18.png"
                    alt="Sub 6m"
                    width={18}
                    height={18}
                    className="inline-block object-contain"
                  />
                  <span className="font-bold text-[#E91E63] hover:underline cursor-pointer">
                    GankMaster_IVEXI
                  </span>
                  <span>:</span>
                  <span>OC ativado na Black Zone, bora dropar o blob!</span>
                  <img
                    src="/assets/twitch/emotes/vulgoMONTA_28x28.png"
                    alt="vulgoMONTA"
                    width={28}
                    height={28}
                    className="inline-block object-contain align-middle ml-1"
                    title="vulgoMONTA"
                  />
                  <img
                    src="/assets/twitch/emotes/vulgoHYPE_28x28.png"
                    alt="vulgoHYPE"
                    width={28}
                    height={28}
                    className="inline-block object-contain align-middle ml-1"
                    title="vulgoHYPE"
                  />
                </div>
              </div>

              {/* Linha 3: Rage e Perdeu o Set */}
              <div className="flex items-start gap-2 leading-relaxed">
                <span className="text-[11px] opacity-40 font-mono">19:44</span>
                <div className="inline-flex items-center gap-1.5 flex-wrap">
                  <img
                    src="/assets/twitch/sub_badges/sub_1m_18x18.png"
                    alt="Sub 1m"
                    width={18}
                    height={18}
                    className="inline-block object-contain"
                  />
                  <span className="font-bold text-[#00E5FF] hover:underline cursor-pointer">
                    NovatoGamer
                  </span>
                  <span>:</span>
                  <span>Mano veio 15 nego me gankar, perdi meu set 8.3 kkkkk</span>
                  <img
                    src="/assets/twitch/emotes/vulgoRAGE_28x28.png"
                    alt="vulgoRAGE"
                    width={28}
                    height={28}
                    className="inline-block object-contain align-middle ml-1"
                    title="vulgoRAGE"
                  />
                  <img
                    src="/assets/twitch/emotes/vulgoRIP_28x28.png"
                    alt="vulgoRIP"
                    width={28}
                    height={28}
                    className="inline-block object-contain align-middle ml-1"
                    title="vulgoRIP"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 1: Distintivos de Inscrito (Sub Loyalty Badges) */}
        <section className="space-y-4">
          <div className="border-b border-ivexi-purple/40 pb-2">
            <h2 className="text-2xl font-rajdhani font-bold text-ivexi-neon uppercase flex items-center gap-2">
              <span>🛡️</span> Distintivos de Inscrito (Sub Badges • 6 Níveis)
            </h2>
            <p className="text-xs text-ivexi-muted">
              Progressão tática de prestígio e lealdade inspirada na Guilda IVEXI e nos Tiers de Albion Online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUB_BADGES_DATA.map((badge) => (
              <div
                key={badge.id}
                data-testid="sub-badge-card"
                className="p-5 rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 hover:border-ivexi-neon transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-ivexi-dark border border-ivexi-neon/50 text-[11px] font-rajdhani font-bold text-ivexi-neon uppercase">
                      {badge.duration}
                    </span>
                    <span className="text-[10px] text-ivexi-muted font-rajdhani uppercase">
                      Sub Loyalty Badge
                    </span>
                  </div>

                  <h3 className="font-rajdhani text-lg font-bold text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-ivexi-muted leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Box de Prévia Visual nos 3 Formatos da Twitch */}
                <div className={`p-4 rounded-lg border flex items-center justify-around gap-4 ${getThemeBg()}`}>
                  {/* Master 72px */}
                  <div className="text-center space-y-1">
                    <img
                      src={badge.size72Url}
                      alt={`${badge.title} 72px`}
                      width={48}
                      height={48}
                      className="mx-auto object-contain drop-shadow"
                    />
                    <span className="block text-[10px] opacity-60">72×72</span>
                  </div>

                  {/* 36px */}
                  <div className="text-center space-y-1">
                    <img
                      src={badge.size36Url}
                      alt={`${badge.title} 36px`}
                      width={36}
                      height={36}
                      className="mx-auto object-contain"
                    />
                    <span className="block text-[10px] opacity-60">36×36</span>
                  </div>

                  {/* 18px (Chat real) */}
                  <div className="text-center space-y-1">
                    <img
                      src={badge.size18Url}
                      alt={`${badge.title} 18px`}
                      width={18}
                      height={18}
                      className="mx-auto object-contain"
                    />
                    <span className="block text-[10px] opacity-60">18×18</span>
                  </div>
                </div>

                {/* Botões de Download */}
                <div className="pt-2 border-t border-ivexi-purple/30 flex items-center justify-between gap-2 flex-wrap">
                  <a
                    href={badge.masterUrl}
                    download
                    className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple/60 border border-ivexi-purple text-ivexi-neon font-rajdhani font-bold transition"
                  >
                    Master (512px)
                  </a>
                  <div className="flex gap-1.5">
                    <a
                      href={badge.size72Url}
                      download
                      className="text-[11px] px-2 py-0.5 rounded bg-ivexi-surface hover:bg-ivexi-dark border border-ivexi-purple/40 text-ivexi-light"
                    >
                      72p
                    </a>
                    <a
                      href={badge.size36Url}
                      download
                      className="text-[11px] px-2 py-0.5 rounded bg-ivexi-surface hover:bg-ivexi-dark border border-ivexi-purple/40 text-ivexi-light"
                    >
                      36p
                    </a>
                    <a
                      href={badge.size18Url}
                      download
                      className="text-[11px] px-2 py-0.5 rounded bg-ivexi-surface hover:bg-ivexi-dark border border-ivexi-purple/40 text-ivexi-light"
                    >
                      18p
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção 2: Emotes de Canal */}
        <section className="space-y-4">
          <div className="border-b border-ivexi-purple/40 pb-2">
            <h2 className="text-2xl font-rajdhani font-bold text-ivexi-neon uppercase flex items-center gap-2">
              <span>🎭</span> Emotes da Live (7 Emotes • Tier 1 & Seguidores)
            </h2>
            <p className="text-xs text-ivexi-muted">
              Inclui o emote exclusivo da piada interna e chamada de combate de Albion: "Bota pra fora, energiza e monta, GG!".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMOTES_DATA.map((emote: EmoteItem) => (
              <div
                key={emote.id}
                data-testid="emote-card"
                className={`p-5 rounded-xl bg-ivexi-surface/90 border transition flex flex-col justify-between space-y-4 ${
                  emote.isInsideJoke
                    ? 'border-ivexi-neon shadow-[0_0_15px_rgba(214,214,92,0.25)]'
                    : 'border-ivexi-purple/50 hover:border-ivexi-purple'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-rajdhani font-bold uppercase ${
                        emote.isInsideJoke
                          ? 'bg-ivexi-neon text-ivexi-dark'
                          : 'bg-ivexi-dark border border-ivexi-purple text-purple-300'
                      }`}
                    >
                      {emote.isInsideJoke ? '⚡ Piada Interna Oficial' : emote.category}
                    </span>

                    <button
                      onClick={() => copyToClipboard(emote.code)}
                      className="text-[10px] text-ivexi-muted hover:text-ivexi-neon font-rajdhani uppercase transition"
                    >
                      {copiedCode === emote.code ? '✓ Copiado!' : 'Copiar Código'}
                    </button>
                  </div>

                  <h3 className="font-rajdhani text-lg font-bold text-white mb-1 flex items-center justify-between">
                    <span>{emote.name}</span>
                    <span className="font-mono text-xs text-ivexi-neon bg-ivexi-dark px-2 py-0.5 rounded border border-ivexi-purple/40">
                      {emote.code}
                    </span>
                  </h3>
                  <p className="text-xs text-ivexi-muted leading-relaxed">
                    {emote.description}
                  </p>
                  <p className="text-[11px] text-ivexi-light/70 italic mt-1">
                    👉 {emote.contextUsage}
                  </p>
                </div>

                {/* Box de Prévia Visual nos 3 Formatos da Twitch */}
                <div className={`p-4 rounded-lg border flex items-center justify-around gap-4 ${getThemeBg()}`}>
                  {/* 112px */}
                  <div className="text-center space-y-1">
                    <img
                      src={emote.size112Url}
                      alt={`${emote.code} 112px`}
                      width={56}
                      height={56}
                      className="mx-auto object-contain drop-shadow"
                    />
                    <span className="block text-[10px] opacity-60">112×112</span>
                  </div>

                  {/* 56px */}
                  <div className="text-center space-y-1">
                    <img
                      src={emote.size56Url}
                      alt={`${emote.code} 56px`}
                      width={40}
                      height={40}
                      className="mx-auto object-contain"
                    />
                    <span className="block text-[10px] opacity-60">56×56</span>
                  </div>

                  {/* 28px (Chat real) */}
                  <div className="text-center space-y-1">
                    <img
                      src={emote.size28Url}
                      alt={`${emote.code} 28px`}
                      width={28}
                      height={28}
                      className="mx-auto object-contain"
                    />
                    <span className="block text-[10px] opacity-60">28×28</span>
                  </div>
                </div>

                {/* Botões de Download */}
                <div className="pt-2 border-t border-ivexi-purple/30 flex items-center justify-between gap-2 flex-wrap">
                  <a
                    href={emote.masterUrl}
                    download
                    className="text-xs px-2.5 py-1 rounded bg-ivexi-dark hover:bg-ivexi-purple/60 border border-ivexi-purple text-ivexi-neon font-rajdhani font-bold transition"
                  >
                    Master (512px)
                  </a>
                  <div className="flex gap-1.5">
                    <a
                      href={emote.size112Url}
                      download
                      className="text-[11px] px-2 py-0.5 rounded bg-ivexi-surface hover:bg-ivexi-dark border border-ivexi-purple/40 text-ivexi-light"
                    >
                      112p
                    </a>
                    <a
                      href={emote.size56Url}
                      download
                      className="text-[11px] px-2 py-0.5 rounded bg-ivexi-surface hover:bg-ivexi-dark border border-ivexi-purple/40 text-ivexi-light"
                    >
                      56p
                    </a>
                    <a
                      href={emote.size28Url}
                      download
                      className="text-[11px] px-2 py-0.5 rounded bg-ivexi-surface hover:bg-ivexi-dark border border-ivexi-purple/40 text-ivexi-light"
                    >
                      28p
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção 3: Pontos do Canal e Distintivos de Bits */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pontos do Canal */}
          <div className="p-6 rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded bg-ivexi-neon/20 border border-ivexi-neon/40 text-[11px] font-rajdhani font-bold text-ivexi-neon uppercase">
                  🪙 Channel Points
                </span>
                <span className="text-xs text-ivexi-muted font-rajdhani">28px • 56px • 112px</span>
              </div>
              <h3 className="font-rajdhani text-xl font-bold text-white mb-1">
                {CHANNEL_POINTS_DATA.name}
              </h3>
              <p className="text-xs text-ivexi-muted mb-2">
                {CHANNEL_POINTS_DATA.description}
              </p>
              <p className="text-xs text-ivexi-neon">
                Nome sugerido para a live: <strong>{CHANNEL_POINTS_DATA.suggestedName}</strong>
              </p>
            </div>

            <div className={`p-4 rounded-lg border flex items-center justify-around gap-4 ${getThemeBg()}`}>
              <div className="text-center space-y-1">
                <img
                  src={CHANNEL_POINTS_DATA.size112Url}
                  alt="Moeda IVEXI 112px"
                  width={56}
                  height={56}
                  className="mx-auto object-contain drop-shadow"
                />
                <span className="block text-[10px] opacity-60">112×112</span>
              </div>
              <div className="text-center space-y-1">
                <img
                  src={CHANNEL_POINTS_DATA.size56Url}
                  alt="Moeda IVEXI 56px"
                  width={40}
                  height={40}
                  className="mx-auto object-contain"
                />
                <span className="block text-[10px] opacity-60">56×56</span>
              </div>
              <div className="text-center space-y-1">
                <img
                  src={CHANNEL_POINTS_DATA.size28Url}
                  alt="Moeda IVEXI 28px"
                  width={28}
                  height={28}
                  className="mx-auto object-contain"
                />
                <span className="block text-[10px] opacity-60">28×28</span>
              </div>
            </div>

            <div className="pt-2 border-t border-ivexi-purple/30 flex items-center justify-between">
              <a
                href={CHANNEL_POINTS_DATA.masterUrl}
                download
                className="text-xs px-3 py-1.5 rounded bg-ivexi-dark hover:bg-ivexi-purple/60 border border-ivexi-purple text-ivexi-neon font-rajdhani font-bold transition"
              >
                Baixar Master (512px)
              </a>
              <a
                href={CHANNEL_POINTS_DATA.size112Url}
                download
                className="text-xs px-3 py-1.5 rounded bg-ivexi-neon hover:bg-yellow-400 text-ivexi-dark font-rajdhani font-bold transition"
              >
                Baixar PNG (112px)
              </a>
            </div>
          </div>

          {/* Badges de Bits */}
          <div className="p-6 rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-[11px] font-rajdhani font-bold text-purple-300 uppercase">
                  💎 Cheering & Bits
                </span>
                <span className="text-xs text-ivexi-muted font-rajdhani">5 Níveis Iniciais</span>
              </div>
              <h3 className="font-rajdhani text-xl font-bold text-white mb-1">
                Distintivos de Torcida (Bits)
              </h3>
              <p className="text-xs text-ivexi-muted">
                Para espectadores que enviam bits durante a transmissão (1, 100, 1.000, 5.000 e 10.000 bits).
              </p>
            </div>

            <div className={`p-3 rounded-lg border grid grid-cols-5 gap-2 text-center ${getThemeBg()}`}>
              {BIT_BADGES_DATA.map((bit) => (
                <div key={bit.id} className="space-y-1">
                  <img
                    src={bit.size36Url}
                    alt={bit.name}
                    width={32}
                    height={32}
                    className="mx-auto object-contain drop-shadow"
                  />
                  <span className="block text-[10px] font-bold text-ivexi-neon">
                    {bit.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-ivexi-purple/30 flex items-center justify-between">
              <span className="text-xs text-ivexi-muted">
                18×18, 36×36, 72×72 e Master 512px inclusos no ZIP
              </span>
              <a
                href={ZIP_DOWNLOAD_URL}
                download
                className="text-xs px-3 py-1.5 rounded bg-ivexi-dark hover:bg-ivexi-purple/60 border border-ivexi-purple text-ivexi-light font-rajdhani font-bold transition"
              >
                Baixar no ZIP →
              </a>
            </div>
          </div>
        </section>

        {/* Guia Rápido de Upload na Twitch */}
        <section className="p-6 rounded-2xl bg-ivexi-surface/70 border border-ivexi-purple/40 space-y-4">
          <h2 className="text-xl font-rajdhani font-bold text-ivexi-neon uppercase flex items-center gap-2">
            <span>📋</span> Como Subir no Painel de Criador da Twitch (Passo a Passo)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ivexi-muted leading-relaxed">
            <div className="p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/30 space-y-2">
              <h3 className="font-rajdhani text-sm font-bold text-white uppercase flex items-center gap-1.5">
                <span>1.</span> Distintivos de Inscrito
              </h3>
              <p>
                Acesse o <strong>Twitch Creator Dashboard</strong> &gt; <em>Recompensas de Espectador</em> &gt; <em>Inscrições</em> &gt; <em>Distintivos de Fidelidade</em>.
              </p>
              <p className="text-ivexi-neon">
                Dica: Arraste o arquivo da pasta <code>512_master/</code> de cada tier com o modo automático ativado.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/30 space-y-2">
              <h3 className="font-rajdhani text-sm font-bold text-white uppercase flex items-center gap-1.5">
                <span>2.</span> Emotes do Canal
              </h3>
              <p>
                Vá em <em>Recompensas de Espectador</em> &gt; <em>Emoticons</em> &gt; <em>Emotes de Assinante</em> (Tier 1).
              </p>
              <p className="text-ivexi-neon">
                Adicione <code>vulgoENERGIZA</code>, <code>vulgoHYPE</code>, <code>vulgoGG</code>, <code>vulgoRAGE</code> e <code>vulgoLURK</code> nos 5 slots iniciais!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivexi-dark/80 border border-ivexi-purple/30 space-y-2">
              <h3 className="font-rajdhani text-sm font-bold text-white uppercase flex items-center gap-1.5">
                <span>3.</span> Pontos do Canal
              </h3>
              <p>
                Vá em <em>Recompensas de Espectador</em> &gt; <em>Pontos do Canal</em> &gt; <em>Personalizar Exibição de Pontos</em>.
              </p>
              <p className="text-ivexi-neon">
                Faça upload do arquivo <code>moeda_ivexi</code> e defina o nome como "Prata de Albion".
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BadgesGallery;
