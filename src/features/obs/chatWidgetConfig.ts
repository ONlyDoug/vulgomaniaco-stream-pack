/**
 * Configuração oficial do Widget de Chat para OBS Studio
 * Suporta Twitch Popout nativo e StreamElements Chat Box com tema da Guilda IVEXI
 */

export const TWITCH_CHAT_POPOUT_URL = 'https://www.twitch.tv/popout/vulgoomaniaco/chat?popout=';

export const TWITCH_CHAT_OBS_CSS = `/* CSS Tático Guilda IVEXI para Chat Transparente no OBS */
body {
  background-color: transparent !important;
  margin: 0px auto;
  overflow: hidden !important;
  color: #FAFAFA !important;
  font-family: 'Inter', -apple-system, sans-serif !important;
}
.chat-room, .stream-chat {
  background: transparent !important;
}
.chat-input,
.stream-chat-header,
.community-points-summary,
.channel-leaderboard {
  display: none !important;
}
.chat-line__message {
  padding: 4px 6px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9) !important;
  font-size: 14px !important;
  line-height: 1.35 !important;
}
.chat-author__display-name {
  font-weight: 700 !important;
}`;

export const CHAT_OBS_CALIBRATION = {
  reactScene: {
    width: 420,
    height: 500,
    x: 1458,
    y: 486,
    label: '🎬 Cena 06 - React & VOD Review',
  },
  chattingScene: {
    width: 600,
    height: 800,
    x: 1280,
    y: 110,
    label: '💬 Cena 04 - Just Chatting',
  },
};
