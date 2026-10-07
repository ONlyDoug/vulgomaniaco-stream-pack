import React from 'react';

export interface FacecamFrameProps {
  children?: React.ReactNode;
}

export const FacecamFrame: React.FC<FacecamFrameProps> = ({ children }) => {
  return (
    <div
      data-testid="facecam-frame"
      className="relative w-[384px] h-[216px] bg-[#140A1F]/30 backdrop-blur-[2px] rounded-t-sm shadow-card-glow overflow-visible border-2 border-ivexi-purple/80"
    >
      {/* Cantoneiras e-sports 100% simétricas nos 4 cantos */}
      <div className="absolute -top-[3px] -left-[3px] w-4 h-4 border-t-2 border-l-2 border-ivexi-neon pointer-events-none" />
      <div className="absolute -top-[3px] -right-[3px] w-4 h-4 border-t-2 border-r-2 border-ivexi-neon pointer-events-none" />
      <div className="absolute -bottom-[3px] -left-[3px] w-4 h-4 border-b-2 border-l-2 border-ivexi-neon pointer-events-none" />
      <div className="absolute -bottom-[3px] -right-[3px] w-4 h-4 border-b-2 border-r-2 border-ivexi-neon pointer-events-none" />

      {/* Linhas de reflexo sutis e perfeitamente simétricas */}
      <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-ivexi-neon/90 to-transparent pointer-events-none" />
      <div className="absolute -bottom-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-ivexi-purple/90 to-transparent pointer-events-none" />

      {/* Indicador LED CAM LIVE no topo direito */}
      <div className="absolute top-2.5 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-ivexi-dark/90 border border-ivexi-purple/70 text-[9px] font-rajdhani font-bold text-ivexi-neon tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-ivexi-neon animate-pulse" />
        CAM LIVE
      </div>

      {/* Área vazada transparente para a captura de câmera 16:9 */}
      <div className="w-full h-full bg-transparent" />

      {children}
    </div>
  );
};
