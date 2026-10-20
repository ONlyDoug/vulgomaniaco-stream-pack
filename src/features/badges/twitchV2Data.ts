import rawManifest from '../../../brand/twitch/v2/manifest.json';

export type SlotCategory = 'follower' | 'tier1_static' | 'tier1_animated' | 'tier2_static' |
  'tier3_static' | 'bits_emotes' | 'badge_flairs' | 'bit_badges' | 'channel_points' | 'rewards';
export interface AssetFile {
  path: string; width: number; height: number; bytes: number; sha256: string;
}
export interface TwitchAsset {
  id: string; code: string; category: SlotCategory; milestone: number | null;
  extension: 'png' | 'gif'; files: AssetFile[];
}
const isCategory = (category: string): category is SlotCategory => category in CATEGORIES;
export const CATEGORIES = {
  follower: 'Seguidores', tier1_static: 'Tier 1 estático', tier1_animated: 'Tier 1 animado',
  tier2_static: 'Tier 2', tier3_static: 'Tier 3', bits_emotes: 'Recompensas de Bits',
  badge_flairs: 'Flairs', bit_badges: 'Bit Badges', channel_points: 'Moeda do canal', rewards: 'Resgates',
} satisfies Record<SlotCategory, string>;
export const ASSETS: TwitchAsset[] = rawManifest.assets.map(asset => {
  if (!isCategory(asset.category) || (asset.extension !== 'png' && asset.extension !== 'gif')) {
    throw new Error(`Ativo Twitch inválido: ${asset.id}`);
  }
  return { ...asset, category: asset.category, extension: asset.extension };
});
export const ASSET_GROUPS = (Object.keys(CATEGORIES) as SlotCategory[]).map(category => ({
  category, title: CATEGORIES[category], assets: ASSETS.filter(asset => asset.category === category),
}));
export const V2_BASE = '/assets/twitch/v2/';
export const assetUrl = (file: AssetFile) => V2_BASE + file.path;
export const stillUrl = (asset: TwitchAsset, file: AssetFile) =>
  `${V2_BASE}previews/stills/${asset.id}_${file.width}x${file.height}.png`;
export const isEmote = (asset: TwitchAsset) => !['badge_flairs', 'bit_badges', 'channel_points', 'rewards'].includes(asset.category);
export const assetName = (asset: TwitchAsset) => {
  if (asset.category === 'badge_flairs') return asset.id === 'flair_tier2' ? 'Flair Tier 2' : 'Flair Tier 3';
  if (asset.category === 'bit_badges') return `${asset.milestone?.toLocaleString('pt-BR')} Bits`;
  const names: Record<string, string> = {
    moeda_ivexi: 'Moeda IVEXI', hidratar: 'Hidratar', alongar: 'Alongar', destacar_mensagem: 'Destacar mensagem',
    escolher_musica: 'Escolher música', resgate_batefood: 'Bate food', resgate_energiza: 'Energiza',
  };
  return names[asset.id] ?? asset.code;
};
