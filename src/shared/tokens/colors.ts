/**
 * Tokens de cores oficiais da Guilda IVEXI e Streamer Pack VulgoManiaco
 * Baseado em BRAND.md, CHROMATIC.md e spec.md
 */

export const IVEXI_COLORS = {
  // Primária da Guilda: Roxo Corvo místico e de destaque
  roxoCorvo: '#732EB8',
  
  // Fundo Imersivo: Preto Blackzone (camuflagem tática em Albion)
  pretoBlackzone: '#140A1F',
  
  // Superfície / Contêiner: Roxo Noturno profundo
  roxoNoturno: '#241037',
  
  // Acento / Alertas / CTA: Amarelo Neon de alta visibilidade e energia
  amareloNeon: '#D6D65C',
  
  // Texto / Alto Contraste: Branco Puro
  brancoPuro: '#FAFAFA',
  
  // Cores secundárias de status e apoio
  cinzaSuave: '#A19DA8',
  verdeKick: '#53FC18',
  vermelhoYoutube: '#FF0000',
  roxoTwitch: '#9146FF',
} as const;

export const THEME_TOKENS = {
  colors: IVEXI_COLORS,
  fonts: {
    title: 'Rajdhani, sans-serif',
    body: 'Inter, sans-serif',
  },
  glows: {
    neonYellow: '0 0 12px rgba(214, 214, 92, 0.55)',
    neonPurple: '0 0 16px rgba(115, 46, 184, 0.55)',
  },
  borders: {
    frame: '2px solid rgba(115, 46, 184, 0.8)',
    neon: '2px solid #D6D65C',
  },
} as const;

export default IVEXI_COLORS;
