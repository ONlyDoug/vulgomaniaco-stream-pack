import { useEffect, useState } from 'react';
import { AssetCard } from './AssetCard';
import { ChatSimulator } from './ChatSimulator';
import { SubBadgesSection } from './SubBadgesSection';
import { ASSET_GROUPS, V2_BASE } from './twitchV2Data';

const THEMES = {
  'Twitch Dark (#18181B)': 'bg-[#18181B] text-[#EFEFF1] border-[#303036]',
  'Twitch Light (#F7F7F8)': 'bg-[#F7F7F8] text-[#0E0E10] border-[#E5E5E8]',
  'IVEXI Deep Purple': 'bg-[#0B0512] text-ivexi-light border-ivexi-purple/50',
};
const MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(() => window.matchMedia?.(MOTION_QUERY).matches ?? false);
  useEffect(() => {
    const query = window.matchMedia?.(MOTION_QUERY);
    if (!query) return;
    setReduced(query.matches);
    const update = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
};
const downloadClass = 'inline-flex items-center justify-center rounded-lg border border-ivexi-purple px-4 py-3 text-sm hover:bg-ivexi-purple/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivexi-neon';

export const BadgesGallery = () => {
  const [theme, setTheme] = useState<keyof typeof THEMES>('Twitch Dark (#18181B)');
  const [userPaused, setUserPaused] = useState(false);
  const reduced = useReducedMotion();
  const paused = userPaused || reduced;
  const themeClass = THEMES[theme];
  return <main data-testid="badges-gallery-container" className="min-h-screen bg-ivexi-dark text-ivexi-light font-inter p-4 sm:p-8">
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-4 border-b border-ivexi-purple/40 pb-6">
        <nav aria-label="Caminho da página" className="text-sm text-ivexi-muted"><a href="/" className="underline">IVEXI · Hub</a> / <span aria-current="page">Pack Twitch v2</span></nav>
        <p className="text-sm text-ivexi-neon font-rajdhani font-bold uppercase tracking-wider">VulgoManiaco · Guilda IVEXI</p>
        <h1 className="text-3xl sm:text-5xl font-rajdhani font-bold text-ivexi-neon uppercase">Pack Twitch v2</h1>
        <p className="text-ivexi-muted max-w-3xl">20 emotes, dois flairs, nove Bit Badges, moeda IVEXI e seis resgates: 38 artes novas em 114 arquivos. As seis Sub Badges originais continuam disponíveis.</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Fundo de teste">
          {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map(name => <button key={name} onClick={() => setTheme(name)} aria-pressed={theme === name}
            className={`px-3 py-2 rounded-lg text-xs border focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivexi-neon ${theme === name ? 'border-ivexi-neon text-ivexi-neon bg-ivexi-surface' : 'border-ivexi-purple text-ivexi-light'}`}>{name}</button>)}
        </div>
        <button onClick={() => setUserPaused(value => !value)} disabled={reduced} aria-pressed={paused}
          className="px-4 py-2 rounded-lg border border-ivexi-purple text-sm disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivexi-neon">
          {paused ? 'Reproduzir animações' : 'Pausar animações'}
        </button>
        {reduced && <p className="text-xs text-ivexi-muted">Movimento reduzido ativo: mostrando o primeiro frame. Downloads GIF preservados.</p>}
      </header>
      <section aria-label="Downloads do pacote" className="p-5 rounded-xl bg-ivexi-surface border border-ivexi-purple space-y-4">
        <h2 className="font-rajdhani text-2xl font-bold text-ivexi-neon">Emotes e ícones v2</h2>
        <p className="text-sm text-ivexi-muted">ZIP com os 114 arquivos para upload. Sub Badges em download separado. Códigos de emote são sugestões; confira o prefixo no painel do canal.</p>
        <div className="flex flex-wrap gap-3">
          <a className={`${downloadClass} text-ivexi-neon`} href={`${V2_BASE}pack-twitch-vulgomaniaco-v2.zip`} download>↓ Baixar emotes e ícones v2 (.ZIP)</a>
          <a className={downloadClass} href={`${V2_BASE}manual.pdf`} download>Manual PDF · 14 páginas</a>
          <a className={downloadClass} href="/assets/twitch/sub-badges-vulgomaniaco.zip" download>Sub Badges originais (.ZIP)</a>
          <a className={downloadClass} href={`${V2_BASE}previews/contact-sheet.png`} download>Prancha geral PNG</a>
          <a className={downloadClass} href={`${V2_BASE}previews/flairs.png`} download>Prancha de flairs PNG</a>
        </div>
      </section>
      <nav aria-label="Categorias do pacote" className="flex flex-wrap gap-x-4 gap-y-3 text-sm text-ivexi-neon">
        <a href="#sub-badges" className="underline">Sub Badges</a>
        {ASSET_GROUPS.map(group => <a key={group.category} href={`#${group.category}`} className="underline">{group.title} ({group.assets.length})</a>)}
      </nav>
      <ChatSimulator themeClass={themeClass} paused={paused} />
      <div id="sub-badges"><SubBadgesSection themeClass={themeClass} /></div>
      {ASSET_GROUPS.map(group => <section key={group.category} id={group.category} className="space-y-4" aria-labelledby={`heading-${group.category}`}>
        <div className="flex items-baseline gap-3 border-b border-ivexi-purple/40 pb-2">
          <h2 id={`heading-${group.category}`} className="text-2xl font-rajdhani font-bold text-ivexi-neon">{group.title}</h2>
          <span className="text-sm text-ivexi-muted">{group.assets.length} {group.assets.length === 1 ? 'arte' : 'artes'}</span>
        </div>
        {group.category === 'bits_emotes' && <p className="text-sm text-ivexi-muted">Emotes estáticos desbloqueáveis por Bits; não são Cheermotes.</p>}
        {group.category === 'rewards' && <p className="text-sm text-ivexi-muted">Ícones para resgates; configure as recompensas manualmente no canal.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {group.assets.map(asset => <AssetCard key={asset.id} asset={asset} paused={paused} themeClass={themeClass} />)}
        </div>
      </section>)}
      <footer className="text-sm text-ivexi-muted pb-4">A expansão para 50 emotes fica para uma próxima etapa.</footer>
    </div>
  </main>;
};
