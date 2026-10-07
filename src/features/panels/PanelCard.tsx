import React from 'react';

export interface PanelCardProps {
  id: string;
  title: string;
  icon?: string;
  description: string;
}

export const PanelCard: React.FC<PanelCardProps> = ({ id, title, description }) => {
  const [copied, setCopied] = React.useState(false);

  const markdownSnippet = `## ${title}\n\n${description}\n\n*VulgoManiaco • Albion Online*`;

  const copyMarkdown = () => {
    navigator.clipboard?.writeText(markdownSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="channel-panel-card"
      className="w-[320px] rounded-2xl bg-ivexi-dark border-2 border-ivexi-purple/80 shadow-card-glow overflow-hidden flex flex-col transition hover:border-ivexi-neon duration-200"
    >
      {/* Banner Gráfico Real 320x120 gerado no padrão Twitch/Kick com o ícone compacto oficial */}
      <div className="relative w-[320px] h-[120px] bg-[#140A1F] border-b border-ivexi-purple/50 overflow-hidden">
        <img
          src={`/src/assets/panels/painel-${id}.png`}
          alt={`Banner ${title}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Se a imagem falhar, fallback gracioso
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Corpo com descrição e regras */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-ivexi-surface/50">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-rajdhani text-lg font-bold uppercase text-ivexi-neon flex items-center gap-2">
              <img
                src="/src/assets/images/streamer-vulgomaniaco-compact-512w.png"
                alt="VulgoManiaco Ícone"
                className="w-5 h-5 object-contain"
                data-testid="panel-compact-logo"
              />
              <span>{title}</span>
            </span>
            <span className="text-[10px] text-ivexi-neon bg-ivexi-dark px-2 py-0.5 rounded border border-ivexi-purple/40 font-bold uppercase">
              320px Twitch
            </span>
          </div>
          <p className="font-inter text-xs text-ivexi-light/90 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Botões de Ação para o Streamer */}
        <div className="space-y-2 pt-2 border-t border-ivexi-purple/30">
          <div className="flex items-center gap-2">
            <a
              href={`/src/assets/panels/painel-${id}.png`}
              download={`painel-${id}.png`}
              className="flex-1 py-1.5 px-2 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/60 border border-ivexi-purple/60 text-center font-rajdhani text-xs font-bold uppercase text-white transition"
            >
              Baixar PNG
            </a>
            <a
              href={`/src/assets/panels/painel-${id}.svg`}
              download={`painel-${id}.svg`}
              className="py-1.5 px-3 rounded-lg bg-ivexi-dark hover:bg-ivexi-purple/60 border border-ivexi-purple/60 text-center font-rajdhani text-xs font-bold uppercase text-ivexi-neon transition"
            >
              SVG
            </a>
          </div>

          <button
            onClick={copyMarkdown}
            className="w-full py-1.5 px-2 rounded-lg bg-ivexi-purple/40 hover:bg-ivexi-purple/70 border border-ivexi-purple text-xs font-inter font-medium text-ivexi-light transition flex items-center justify-center gap-1 cursor-pointer"
          >
            {copied ? '✓ Markdown Copiado!' : '📋 Copiar Texto Markdown'}
          </button>
        </div>

        <div className="pt-2 border-t border-ivexi-purple/20 flex items-center justify-between text-[11px] text-ivexi-muted">
          <span className="font-rajdhani font-semibold text-ivexi-purple">VulgoManiaco Stream Pack</span>
          <span className="text-[10px] text-ivexi-neon font-bold uppercase">WCAG AAA</span>
        </div>
      </div>
    </div>
  );
};

export default PanelCard;
