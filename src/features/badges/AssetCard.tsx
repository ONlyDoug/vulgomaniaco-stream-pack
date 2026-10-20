import { assetName, assetUrl, isEmote, stillUrl, type AssetFile, type TwitchAsset } from './twitchV2Data';

export const AssetImage = ({ asset, file, paused, alt }: {
  asset: TwitchAsset; file: AssetFile; paused: boolean; alt?: string;
}) => <img src={paused && asset.extension === 'gif' ? stillUrl(asset, file) : assetUrl(file)}
  alt={alt ?? `${assetName(asset)} ${file.width}px`} width={file.width} height={file.height}
  className="object-contain shrink-0" style={{ maxWidth: 'none' }} />;

export const AssetCard = ({ asset, paused, themeClass }: {
  asset: TwitchAsset; paused: boolean; themeClass: string;
}) => <article data-testid="v2-asset-card" className="p-4 sm:p-5 rounded-xl bg-ivexi-surface/90 border border-ivexi-purple/50 space-y-4 min-w-0">
  <div data-testid={isEmote(asset) ? 'emote-card' : undefined}>
    <div className="flex items-center justify-between gap-2">
      <h3 className="font-rajdhani text-lg font-bold break-all">{assetName(asset)}</h3>
      <span className="text-xs text-ivexi-neon">{asset.extension.toUpperCase()}</span>
    </div>
    {asset.category === 'bits_emotes' && <p className="text-xs text-ivexi-muted">Desbloqueável em {asset.milestone?.toLocaleString('pt-BR')} Bits</p>}
    {asset.category === 'badge_flairs' && <p className="text-xs text-ivexi-muted">Adorno vazado para aplicar sobre a Sub Badge.</p>}
  </div>
  <div className={`flex items-center justify-around gap-2 p-3 rounded-lg border ${themeClass}`}>
    {asset.files.map(file => <figure key={file.path} className="flex flex-col items-center gap-2">
      <AssetImage asset={asset} file={file} paused={paused} />
      <figcaption className="text-xs">{file.width}×{file.height}</figcaption>
    </figure>)}
  </div>
  <div className="flex flex-wrap gap-2" aria-label={`Downloads de ${assetName(asset)}`}>
    {asset.files.map(file => <a key={file.path} href={assetUrl(file)} download
      aria-label={`Baixar ${assetName(asset)} ${file.width}px ${asset.extension.toUpperCase()}`}
      className="rounded border border-ivexi-purple px-3 py-2 text-xs hover:bg-ivexi-purple/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivexi-neon">
      ↓ {file.width}px {asset.extension.toUpperCase()}
    </a>)}
  </div>
</article>;
