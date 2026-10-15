import React, { useState } from 'react';
import { SubGoal } from './SubGoal';
import { FollowerGoal } from './FollowerGoal';
import { TipGoal } from './TipGoal';

export const GoalsShowcase: React.FC = () => {
  const [subCurrent, setSubCurrent] = useState<number>(24);
  const subTarget = 50;

  const [followCurrent, setFollowCurrent] = useState<number>(340);
  const followTarget = 500;

  const [tipCurrent, setTipCurrent] = useState<number>(175);
  const tipTarget = 500;

  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const copyUrl = (path: string) => {
    const full = `${origin}${path}?obs=1`;
    navigator.clipboard.writeText(full).then(() => {
      setCopiedLink(path);
      setTimeout(() => setCopiedLink(null), 2500);
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6 text-white font-inter">
      <header className="border-b border-ivexi-purple/40 pb-4">
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-ivexi-neon tracking-wide">
          Widgets de Metas (Goals) OBS
        </h2>
        <p className="text-sm text-ivexi-muted">
          Barras de progresso táticas estilizáveis em tempo real para a transmissão do canal VulgoManiaco.
        </p>
      </header>

      {/* Grid de Metas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Meta de Subs */}
        <div className="space-y-3 bg-ivexi-surface/50 p-4 rounded-xl border border-ivexi-purple/40">
          <SubGoal current={subCurrent} target={subTarget} />
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setSubCurrent((prev) => Math.min(subTarget, prev + 1))}
              className="flex-1 py-1.5 px-2 bg-ivexi-dark hover:bg-ivexi-purple text-xs font-rajdhani font-bold uppercase rounded border border-ivexi-purple transition"
            >
              +1 Sub
            </button>
            <button
              onClick={() => setSubCurrent((prev) => Math.max(0, prev - 1))}
              className="flex-1 py-1.5 px-2 bg-ivexi-dark hover:bg-ivexi-purple text-xs font-rajdhani font-bold uppercase rounded border border-ivexi-purple transition"
            >
              -1 Sub
            </button>
          </div>
          <button
            onClick={() => copyUrl('/goals/subs')}
            className="w-full py-2 px-3 bg-ivexi-neon hover:bg-yellow-400 text-ivexi-dark text-xs font-rajdhani font-bold uppercase rounded transition shadow-neon-border"
          >
            {copiedLink === '/goals/subs' ? '✓ Link OBS Copiado!' : 'Copiar URL OBS (Subs)'}
          </button>
        </div>

        {/* Meta de Seguidores */}
        <div className="space-y-3 bg-ivexi-surface/50 p-4 rounded-xl border border-ivexi-purple/40">
          <FollowerGoal current={followCurrent} target={followTarget} />
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setFollowCurrent((prev) => Math.min(followTarget, prev + 5))}
              className="flex-1 py-1.5 px-2 bg-ivexi-dark hover:bg-ivexi-purple text-xs font-rajdhani font-bold uppercase rounded border border-ivexi-purple transition"
            >
              +5 Segs
            </button>
            <button
              onClick={() => setFollowCurrent((prev) => Math.max(0, prev - 5))}
              className="flex-1 py-1.5 px-2 bg-ivexi-dark hover:bg-ivexi-purple text-xs font-rajdhani font-bold uppercase rounded border border-ivexi-purple transition"
            >
              -5 Segs
            </button>
          </div>
          <button
            onClick={() => copyUrl('/goals/followers')}
            className="w-full py-2 px-3 bg-[#00E5FF] hover:bg-cyan-300 text-black text-xs font-rajdhani font-bold uppercase rounded transition shadow-[0_0_15px_rgba(0,229,255,0.6)]"
          >
            {copiedLink === '/goals/followers' ? '✓ Link OBS Copiado!' : 'Copiar URL OBS (Segs)'}
          </button>
        </div>

        {/* Meta de Pix / Doações */}
        <div className="space-y-3 bg-ivexi-surface/50 p-4 rounded-xl border border-ivexi-purple/40">
          <TipGoal current={tipCurrent} target={tipTarget} />
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setTipCurrent((prev) => Math.min(tipTarget, prev + 25))}
              className="flex-1 py-1.5 px-2 bg-ivexi-dark hover:bg-ivexi-purple text-xs font-rajdhani font-bold uppercase rounded border border-ivexi-purple transition"
            >
              +R$ 25
            </button>
            <button
              onClick={() => setTipCurrent((prev) => Math.max(0, prev - 25))}
              className="flex-1 py-1.5 px-2 bg-ivexi-dark hover:bg-ivexi-purple text-xs font-rajdhani font-bold uppercase rounded border border-ivexi-purple transition"
            >
              -R$ 25
            </button>
          </div>
          <button
            onClick={() => copyUrl('/goals/tips')}
            className="w-full py-2 px-3 bg-[#00F5A0] hover:bg-emerald-300 text-black text-xs font-rajdhani font-bold uppercase rounded transition shadow-[0_0_15px_rgba(0,245,160,0.65)]"
          >
            {copiedLink === '/goals/tips' ? '✓ Link OBS Copiado!' : 'Copiar URL OBS (Pix)'}
          </button>
        </div>
      </div>
    </div>
  );
};
