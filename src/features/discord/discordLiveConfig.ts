/**
 * Configurações e Padrões Oficiais do Ambiente de Live no Discord
 * Guilda: IVEXI | Streamer: VulgoManiaco | Albion Online
 */

export const DISCORD_CATEGORY_NAME = '╭── ✦ 🎙️ QG DA LIVE';

export interface DiscordChannelSpec {
  id: string;
  name: string;
  type: 'text' | 'voice';
  isRestricted?: boolean;
  description: string;
  permissionsSummary: string;
}

export const DISCORD_LIVE_CHANNELS: DiscordChannelSpec[] = [
  {
    id: 'bate-papo',
    name: '💬 | bate-papo',
    type: 'text',
    description: 'Chat aberto para a comunidade interagir com a live em tempo real.',
    permissionsSummary: 'Aberto para todos (@everyone) • Slowmode de 5s',
  },
  {
    id: 'clips-e-momentos',
    name: '🎬 | clips-e-momentos',
    type: 'text',
    description: 'Envio de links de clipes da Twitch, jogadas da guilda e memes.',
    permissionsSummary: 'Aberto para envio de links e anexos',
  },
  {
    id: 'call-da-live',
    name: '🔒 🔴 | call-da-live',
    type: 'voice',
    isRestricted: true,
    description: 'Call oficial da transmissão. Totalmente blindada contra entradas não autorizadas.',
    permissionsSummary: 'Conectar: ❌ NEGADO • Falar: ✅ PERMITIDO • Entrada exclusiva por puxão do streamer',
  },
  {
    id: 'sala-de-espera',
    name: '⏳ | sala-de-espera',
    type: 'voice',
    description: 'Fila silenciosa para membros que aguardam para ser puxados para a call da live.',
    permissionsSummary: 'Conectar: ✅ PERMITIDO • Falar: ❌ NEGADO (Mutados na fila)',
  },
];

export const DISCORD_STREAMKIT_URL = 'https://streamkit.discord.com/overlay';

export const DISCORD_STREAMKIT_CUSTOM_CSS = `/* ========================================================
   IVEXI GUILD - DISCORD STREAMKIT OVERLAY THEME
   Streamer: VulgoManiaco | Cores: #140A1F, #732EB8, #D6D65C
   ======================================================== */
body {
  background-color: transparent !important;
  overflow: hidden;
  font-family: 'Rajdhani', 'Inter', sans-serif !important;
}

/* Card de cada participante na call */
.voice-state {
  margin-bottom: 10px !important;
  display: flex !important;
  align-items: center !important;
  background: rgba(20, 10, 31, 0.85) !important;
  padding: 6px 14px !important;
  border-radius: 12px !important;
  border: 1px solid rgba(115, 46, 184, 0.5) !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(6px) !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Avatar circular */
.avatar {
  border-radius: 50% !important;
  border: 2px solid #30184A !important;
  transition: all 0.2s ease-in-out !important;
}

/* Estado de quem está FALANDO */
.speaking {
  border: 1px solid #D6D65C !important;
  box-shadow: 0 0 16px rgba(214, 214, 92, 0.65), inset 0 0 8px rgba(115, 46, 184, 0.4) !important;
  background: rgba(45, 15, 75, 0.95) !important;
  transform: translateX(4px) !important;
}

.avatar.speaking {
  border: 2px solid #D6D65C !important;
  box-shadow: 0 0 12px #D6D65C !important;
  transform: scale(1.1) !important;
}

/* Nome do participante */
.user {
  color: #FAFAFA !important;
  font-weight: 700 !important;
  font-size: 15px !important;
  text-shadow: 1px 1px 3px #000000 !important;
  letter-spacing: 0.6px !important;
  margin-left: 10px !important;
}

.speaking .user {
  color: #D6D65C !important;
}`;
