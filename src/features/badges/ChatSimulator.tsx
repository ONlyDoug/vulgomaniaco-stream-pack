import { useState } from 'react';
import { SUB_BADGES_DATA } from './twitchAffiliateData';
import { ASSETS, assetName } from './twitchV2Data';
import { AssetImage } from './AssetCard';

export const ChatSimulator = ({ themeClass, paused }: { themeClass: string; paused: boolean }) => {
  const [badgeId, setBadgeId] = useState(SUB_BADGES_DATA[0].id);
  const [flairId, setFlairId] = useState('');
  const badge = SUB_BADGES_DATA.find(item => item.id === badgeId) ?? SUB_BADGES_DATA[0];
  const flairs = ASSETS.filter(asset => asset.category === 'badge_flairs');
  const flair = flairs.find(item => item.id === flairId);
  return <section className="space-y-4" aria-labelledby="chat-heading">
    <h2 id="chat-heading" className="text-2xl font-rajdhani font-bold text-ivexi-neon">Simulador de Chat da Twitch</h2>
    <p className="text-sm text-ivexi-muted">Sub Badge e flair em 18px; emotes em 28px. Os flairs preservam o centro da badge.</p>
    <div className="flex flex-wrap gap-4 text-sm">
      <label className="flex flex-col gap-1">Distintivo no chat
        <select value={badgeId} onChange={event => setBadgeId(event.target.value)} className="bg-ivexi-surface border border-ivexi-purple rounded p-2 max-w-full">
          {SUB_BADGES_DATA.map(item => <option key={item.id} value={item.id}>{item.duration} — {item.title}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1">Flair no chat
        <select value={flairId} onChange={event => setFlairId(event.target.value)} className="bg-ivexi-surface border border-ivexi-purple rounded p-2">
          <option value="">Sem flair</option>
          {flairs.map(item => <option key={item.id} value={item.id}>{assetName(item)}</option>)}
        </select>
      </label>
    </div>
    <div data-testid="twitch-chat-simulator" className={`p-4 rounded-xl border space-y-4 text-sm ${themeClass}`}>
      {[
        { name: 'Cavaleiro_Albion', text: 'Bota pra fora, energiza e monta!', ids: ['botaprafora', 'energiza_anim', 'monta'] },
        { name: 'GankMaster_IVEXI', text: 'Bate food genti! Bora pra Black Zone!', ids: ['batefood', 'hype_anim', 'gg'] },
      ].map(row => <div key={row.name} className="flex flex-wrap items-center gap-2 leading-relaxed">
        <span className="relative inline-block shrink-0 w-[18px] h-[18px]" data-testid="chat-badge-composition">
          <img src={badge.size18Url} alt={badge.title} width={18} height={18} />
          {flair && <span className="absolute inset-0"><AssetImage asset={flair} file={flair.files.find(f => f.width === 18)!} paused={paused} alt={assetName(flair)} /></span>}
        </span>
        <strong>{row.name}:</strong><span>{row.text}</span>
        {row.ids.map(id => {
          const asset = ASSETS.find(item => item.id === id)!;
          return <AssetImage key={id} asset={asset} file={asset.files.find(file => file.width === 28)!} paused={paused} />;
        })}
      </div>)}
    </div>
  </section>;
};
