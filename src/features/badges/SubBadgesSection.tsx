import { SUB_BADGES_DATA } from './twitchAffiliateData';

export const SubBadgesSection = ({ themeClass }: { themeClass: string }) => (
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
                <div className={`p-4 rounded-lg border flex items-center justify-around gap-4 ${themeClass}`}>
                  {/* Master 72px */}
                  <div className="text-center space-y-1">
                    <img
                      src={badge.size72Url}
                      alt={`${badge.title} 72px`}
                      width={72}
                      height={72}
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


);
