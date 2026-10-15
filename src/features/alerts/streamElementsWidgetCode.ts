/**
 * Códigos prontos do Custom Widget da Guilda IVEXI para o StreamElements
 * Cobre 100% dos eventos: Follower, Subs (T1, T2, T3, Prime, Resub, Gift, Sub Bomb),
 * Tips/Pix, Bits (100, 500, 1k, 5k+), Raid e Hype Train.
 */

export const STREAM_ELEMENTS_WIDGET_HTML = `<!-- ============================================================
     IVEXI GUILD & VULGOMANIACO - STREAM PACK
     Custom Widget Oficial para StreamElements (Overlay 1080p)
     ============================================================ -->

<div id="alert-wrapper" class="alert-wrapper">
  <!-- Container do Card de Alerta -->
  <div id="alert-card" class="alert-card">
    <!-- Box Tático com o Mascote Oficial (Corvo Chibi Gamer) -->
    <div class="alert-avatar-box">
      <img
        id="alert-avatar-img"
        src="https://vulgomaniaco-stream-pack.vercel.app/assets/images/logo-streamer-vulgomaniaco-avatar.png"
        alt="Mascote Corvo Streamer IVEXI"
      />
    </div>

    <!-- Conteúdo Textual do Alerta -->
    <div class="alert-content">
      <div class="alert-badges">
        <span id="alert-tag" class="alert-badge-tag">ALERTA AO VIVO</span>
        <span class="alert-badge-guild">CANAL VULGOMANIACO • GUILDA IVEXI</span>
      </div>

      <h2 id="alert-title" class="alert-title">NOVO SEGUIDOR NO CANAL!</h2>
      <p id="alert-username" class="alert-username">Guerreiro_Albion</p>
      
      <p id="alert-message" class="alert-message" style="display: none;"></p>
    </div>
  </div>
</div>

<!-- Elemento de Áudio para o Efeito Sonoro Customizado -->
<audio id="alert-audio" preload="auto"></audio>`;

export const STREAM_ELEMENTS_WIDGET_CSS = `/* ============================================================
   IVEXI GUILD & VULGOMANIACO - STREAM PACK
   Folha de Estilos Oficial para StreamElements (Overlay 1080p)
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: visible;
  background-color: transparent !important;
  font-family: 'Rajdhani', sans-serif;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Container de Centralização Fluido e Responsivo */
.alert-wrapper {
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: 25px auto 0 auto;
  padding: 10px 14px;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

/* Card Principal Tático com Chanfros e Vidro Fumê */
.alert-card {
  width: 100%;
  max-width: 560px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(11, 5, 18, 0.96);
  border: 2px solid #732EB8;
  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  padding: 14px 18px;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 25px rgba(115, 46, 184, 0.45);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-30px) scale(0.96);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, visibility 0.4s;
}

/* Estado Visível Ativado */
.alert-card.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

/* Variações de Borda e Glow por Tipo de Evento */
.alert-card.event-follow {
  border-color: #732EB8;
  box-shadow: 0 0 30px rgba(115, 46, 184, 0.6);
}

.alert-card.event-sub-t1,
.alert-card.event-sub {
  border-color: #D6D65C;
  box-shadow: 0 0 35px rgba(214, 214, 92, 0.65);
}

.alert-card.event-sub-t2 {
  border-color: #5CE1E6;
  box-shadow: 0 0 35px rgba(92, 225, 230, 0.65);
}

.alert-card.event-sub-t3 {
  border-color: #FFD700;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.75);
}

.alert-card.event-sub-prime {
  border-color: #9146FF;
  box-shadow: 0 0 35px rgba(145, 70, 255, 0.75);
}

.alert-card.event-sub-resub {
  border-color: #D6D65C;
  box-shadow: 0 0 35px rgba(214, 214, 92, 0.7);
}

.alert-card.event-sub-gift {
  border-color: #D6D65C;
  box-shadow: 0 0 35px rgba(214, 214, 92, 0.65);
}

.alert-card.event-sub-bomb {
  border-color: #FF3B30;
  box-shadow: 0 0 45px rgba(255, 59, 48, 0.85);
  animation: pulseSubBomb 1.2s infinite alternate ease-in-out;
}

@keyframes pulseSubBomb {
  0% { transform: scale(1); }
  100% { transform: scale(1.02); }
}

.alert-card.event-tip {
  border-color: #00F5A0;
  box-shadow: 0 0 35px rgba(0, 245, 160, 0.65);
}

.alert-card.event-cheer-tier1 {
  border-color: #9E82B8;
  box-shadow: 0 0 30px rgba(158, 130, 184, 0.6);
}

.alert-card.event-cheer-tier2 {
  border-color: #00E5FF;
  box-shadow: 0 0 35px rgba(0, 229, 255, 0.7);
}

.alert-card.event-cheer-tier3 {
  border-color: #D6D65C;
  box-shadow: 0 0 35px rgba(214, 214, 92, 0.75);
}

.alert-card.event-cheer-tier4 {
  border-color: #FF007F;
  box-shadow: 0 0 45px rgba(255, 0, 127, 0.85);
}

.alert-card.event-raid {
  border-color: #FF3B30;
  box-shadow: 0 0 40px rgba(255, 59, 48, 0.8);
}

.alert-card.event-hypetrain {
  border-color: #FFD700;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
}

/* Box do Mascote Oficial Chibi */
.alert-avatar-box {
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  background: #140A1F;
  border: 2px solid #732EB8;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-shadow: inset 0 0 15px rgba(115, 46, 184, 0.3);
}

.alert-avatar-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(214, 214, 92, 0.6));
}

/* Conteúdo Textual com min-width: 0 para evitar estouro */
.alert-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

/* Badges de Cabeçalho */
.alert-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.alert-badge-tag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 2px 7px;
  border-radius: 4px;
  background: #732EB8;
  color: #FFFFFF;
  white-space: nowrap;
}

.event-sub-t1 .alert-badge-tag,
.event-sub .alert-badge-tag {
  background: #D6D65C;
  color: #0B0512;
}

.event-sub-t2 .alert-badge-tag {
  background: #5CE1E6;
  color: #0B0512;
}

.event-sub-t3 .alert-badge-tag {
  background: #FFD700;
  color: #000000;
}

.event-sub-prime .alert-badge-tag {
  background: #9146FF;
  color: #FFFFFF;
}

.event-sub-bomb .alert-badge-tag {
  background: #FF3B30;
  color: #FFFFFF;
}

.event-tip .alert-badge-tag {
  background: #00F5A0;
  color: #000000;
}

.event-cheer-tier2 .alert-badge-tag {
  background: #00E5FF;
  color: #000000;
}

.event-cheer-tier3 .alert-badge-tag {
  background: #D6D65C;
  color: #000000;
}

.event-cheer-tier4 .alert-badge-tag {
  background: #FF007F;
  color: #FFFFFF;
}

.event-raid .alert-badge-tag {
  background: #FF3B30;
  color: #FFFFFF;
}

.event-hypetrain .alert-badge-tag {
  background: #FFD700;
  color: #000000;
}

.alert-badge-guild {
  font-family: 'Rajdhani', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #9E82B8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Título do Evento */
.alert-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #D6D65C;
  text-shadow: 0 0 12px rgba(214, 214, 92, 0.5);
  line-height: 1.15;
  word-break: break-word;
}

/* Nome do Usuário / Detalhes */
.alert-username {
  font-family: 'Rajdhani', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.6px;
  line-height: 1.2;
  word-break: break-word;
}

/* Mensagem de Apoio (Doações/Subs) */
.alert-message {
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-style: italic;
  color: rgba(240, 235, 245, 0.9);
  background: rgba(20, 10, 31, 0.7);
  padding: 5px 9px;
  border-left: 3px solid #D6D65C;
  border-radius: 4px;
  margin-top: 3px;
  word-break: break-word;
  max-height: 52px;
  overflow: hidden;
}`;

export const STREAM_ELEMENTS_WIDGET_JS = `/* jshint esversion: 8, browser: true */
/**
 * ============================================================
 * IVEXI GUILD & VULGOMANIACO - STREAM PACK
 * Script Oficial para StreamElements Custom Widget
 * ============================================================
 */

(function () {
  let userFieldData = {};
  const alertQueue = [];
  let isDisplaying = false;

  const alertCard = document.getElementById('alert-card');
  const alertTag = document.getElementById('alert-tag');
  const alertTitle = document.getElementById('alert-title');
  const alertUsername = document.getElementById('alert-username');
  const alertMessage = document.getElementById('alert-message');
  const alertAudio = document.getElementById('alert-audio');

  // Gerador Sonoro Procedural Nativo equalizado a -14 LUFS
  function playProceduralSound(type, volumePercent) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      const vol = Math.max(0, Math.min(1, (volumePercent || 40) / 100)) * 0.22;
      masterGain.gain.setValueAtTime(vol, ctx.currentTime);
      masterGain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'subbomb') {
        const bass = ctx.createOscillator();
        const bGain = ctx.createGain();
        bass.type = 'sine';
        bass.frequency.setValueAtTime(110, now);
        bass.frequency.exponentialRampToValueAtTime(55, now + 0.4);
        bGain.gain.setValueAtTime(0.3, now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        bass.connect(bGain);
        bGain.connect(masterGain);
        bass.start(now);
        bass.stop(now + 0.5);

        [392.0, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          osc.connect(masterGain);
          osc.start(now + idx * 0.07);
          osc.stop(now + 1.5);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      } else if (type && type.indexOf('sub') !== -1) {
        [440.0, 554.37, 659.25, 880.0].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          osc.connect(masterGain);
          osc.start(now + idx * 0.08);
          osc.stop(now + 1.3);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
      } else if (type === 'tip') {
        [880.0, 1318.5, 1760.0, 2093.0].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          osc.connect(masterGain);
          osc.start(now + idx * 0.06);
          osc.stop(now + 1.0);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      } else if (type === 'raid') {
        [220.0, 329.63, 440.0].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          osc.connect(masterGain);
          osc.start(now + idx * 0.12);
          osc.stop(now + 1.6);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      } else {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          osc.connect(masterGain);
          osc.start(now + idx * 0.08);
          osc.stop(now + 1.2);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      }
    } catch (e) {
      console.warn('Audio procedural:', e);
    }
  }

  function playSound(type) {
    const soundUrl = userFieldData.alertSound;
    const volume = typeof userFieldData.alertVolume === 'number' ? userFieldData.alertVolume : 40;

    if (soundUrl && soundUrl.trim() !== '') {
      if (alertAudio) {
        alertAudio.src = soundUrl;
        alertAudio.volume = volume / 100;
        alertAudio.play().catch(() => playProceduralSound(type, volume));
      }
    } else {
      playProceduralSound(type, volume);
    }
  }

  function displayAlert(data) {
    if (!alertCard) return;

    alertCard.className = 'alert-card';
    alertCard.classList.add(data.className);

    if (alertTag) alertTag.textContent = data.badgeText;
    if (alertTitle) alertTitle.textContent = data.titleText;
    if (alertUsername) alertUsername.innerHTML = data.usernameHtml || data.username;

    if (alertMessage) {
      if (data.message && data.message.trim() !== '') {
        alertMessage.textContent = '"' + data.message.trim() + '"';
        alertMessage.style.display = 'block';
      } else {
        alertMessage.style.display = 'none';
      }
    }

    playSound(data.soundType);
    alertCard.classList.add('show');

    const durationSeconds = typeof userFieldData.alertDuration === 'number' ? userFieldData.alertDuration : 6;
    const durationMs = durationSeconds * 1000;

    setTimeout(() => {
      alertCard.classList.remove('show');
      setTimeout(() => {
        isDisplaying = false;
        processNextAlert();
      }, 700);
    }, durationMs);
  }

  function processNextAlert() {
    if (isDisplaying || alertQueue.length === 0) return;
    isDisplaying = true;
    const nextItem = alertQueue.shift();
    displayAlert(nextItem);
  }

  function handleEvent(listener, event) {
    if (!event) return;
    const l = String(listener || '').toLowerCase();

    let alertData = null;

    if (l === 'follower-latest' || l.indexOf('follower') !== -1 || l.indexOf('follow') !== -1) {
      alertData = {
        className: 'event-follow',
        soundType: 'follow',
        badgeText: 'NOVO SEGUIDOR',
        titleText: userFieldData.followTitle || 'NOVO SEGUIDOR NO CANAL!',
        username: event.name || event.displayName || 'Guerreiro_Albion',
        message: null,
      };
    } else if (l === 'subscriber-latest' || l.indexOf('sub') !== -1) {
      const isBulk = event.bulkGifted || event.isCommunityGift;
      const count = event.count || event.amount || 5;

      if (isBulk) {
        alertData = {
          className: 'event-sub-bomb',
          soundType: 'subbomb',
          badgeText: '💣 ' + count + ' SUBS EM LOTE',
          titleText: 'COMBO DE ' + count + ' SUBS DA GUILDA!',
          usernameHtml: '<strong>' + (event.sender || event.name || event.displayName || 'Guerreiro') + '</strong> doou <strong>' + count + ' subs</strong> para a comunidade!',
          message: null,
        };
      } else if (event.gifted || event.sender) {
        alertData = {
          className: 'event-sub-gift',
          soundType: 'sub',
          badgeText: 'PRESENTE DA GUILDA',
          titleText: 'SUB DE PRESENTE NO CANAL!',
          usernameHtml: '<strong>' + (event.sender || 'Guerreiro') + '</strong> presenteou <strong>' + (event.name || event.displayName || 'um membro') + '</strong>!',
          message: null,
        };
      } else if (event.amount && event.amount > 1) {
        alertData = {
          className: 'event-sub-resub',
          soundType: 'sub',
          badgeText: event.amount + ' MESES DE GUILDA',
          titleText: 'RENOVAÇÃO DE INSCRIÇÃO!',
          username: (event.name || event.displayName || 'Guerreiro') + ' (' + event.amount + ' meses acumulados)',
          message: event.message || null,
        };
      } else if (event.tier === 'prime') {
        alertData = {
          className: 'event-sub-prime',
          soundType: 'sub',
          badgeText: 'PRIME GAMING',
          titleText: 'INSCRIÇÃO PRIME GAMING!',
          username: event.name || event.displayName || 'Guerreiro_Prime',
          message: event.message || null,
        };
      } else if (event.tier === '3000') {
        alertData = {
          className: 'event-sub-t3',
          soundType: 'sub',
          badgeText: 'INSCRITO TIER 3 (IMPERADOR)',
          titleText: 'NOVO INSCRITO TIER 3!',
          username: event.name || event.displayName || 'Imperador_Albion',
          message: event.message || null,
        };
      } else if (event.tier === '2000') {
        alertData = {
          className: 'event-sub-t2',
          soundType: 'sub',
          badgeText: 'INSCRITO TIER 2 (SOLDADO)',
          titleText: 'NOVO INSCRITO TIER 2!',
          username: event.name || event.displayName || 'Soldado_Albion',
          message: event.message || null,
        };
      } else {
        alertData = {
          className: 'event-sub-t1',
          soundType: 'sub',
          badgeText: 'NOVO INSCRITO T1',
          titleText: userFieldData.subTitle || 'NOVO INSCRITO NO CANAL!',
          username: event.name || event.displayName || 'Guerreiro_Albion',
          message: event.message || null,
        };
      }
    } else if (l === 'tip-latest' || l.indexOf('tip') !== -1 || l.indexOf('donation') !== -1) {
      const formattedAmount = typeof event.amount === 'number' ? 'R$ ' + event.amount.toFixed(2) : (event.amount || 'R$ 10,00');
      alertData = {
        className: 'event-tip',
        soundType: 'tip',
        badgeText: 'APOIO PIX / TIP',
        titleText: 'DOAÇÃO PARA A LIVE: ' + formattedAmount + '!',
        username: event.name || event.displayName || 'Patrono_Albion',
        message: event.message || null,
      };
    } else if (l === 'cheer-latest' || l.indexOf('cheer') !== -1 || l.indexOf('bit') !== -1) {
      const bits = typeof event.amount === 'number' ? event.amount : parseInt(event.amount || '100', 10);
      let tierClass = 'event-cheer-tier1';
      let badge = '🔮 BITS AMETISTA';
      let title = bits.toLocaleString('pt-BR') + ' BITS NO CANAL!';

      if (bits >= 5000) {
        tierClass = 'event-cheer-tier4';
        badge = '⚡ BITS OVERCHARGE';
        title = 'OVERCHARGE DE ' + bits.toLocaleString('pt-BR') + ' BITS!';
      } else if (bits >= 1000) {
        tierClass = 'event-cheer-tier3';
        badge = '⭐ BITS OURO';
      } else if (bits >= 500) {
        tierClass = 'event-cheer-tier2';
        badge = '💎 BITS CIANO';
      }

      alertData = {
        className: tierClass,
        soundType: 'cheer',
        badgeText: badge,
        titleText: title,
        username: event.name || event.displayName || 'Apoiador_Albion',
        message: event.message || null,
      };
    } else if (l === 'raid-latest' || l.indexOf('raid') !== -1 || l.indexOf('host') !== -1) {
      const viewers = event.amount || event.viewers || 10;
      alertData = {
        className: 'event-raid',
        soundType: 'raid',
        badgeText: '⚔️ RAID • ' + viewers + ' GUERREIROS',
        titleText: 'RAID NO CANAL VULGOMANIACO!',
        usernameHtml: '<strong>' + (event.name || event.displayName || 'Guilda Aliada') + '</strong> trouxe <strong>' + viewers + ' espectadores</strong>!',
        message: null,
      };
    } else if (l.indexOf('hype') !== -1) {
      alertData = {
        className: 'event-hypetrain',
        soundType: 'hypetrain',
        badgeText: '🚂 HYPE TRAIN • NÍVEL ' + (event.level || 1),
        titleText: 'TREM DO HYPE NA LIVE!',
        username: 'Apoie para acelerar a carga de energia sifada!',
        message: null,
      };
    }

    if (alertData) {
      alertQueue.push(alertData);
      processNextAlert();
    }
  }

  window.addEventListener('onWidgetLoad', function (obj) {
    if (obj && obj.detail && obj.detail.fieldData) {
      userFieldData = obj.detail.fieldData;
    }
  });

  window.addEventListener('onEventReceived', function (obj) {
    if (!obj || !obj.detail) return;
    handleEvent(obj.detail.listener, obj.detail.event);
  });
})();`;

export const STREAM_ELEMENTS_WIDGET_FIELDS = `{
  "alertDuration": {
    "type": "number",
    "label": "Duração do Alerta na Tela (segundos)",
    "value": 6,
    "min": 3,
    "max": 15,
    "step": 1
  },
  "alertVolume": {
    "type": "slider",
    "label": "Volume do Som de Alerta (%)",
    "value": 40,
    "min": 0,
    "max": 100,
    "step": 5
  },
  "alertSound": {
    "type": "sound-input",
    "label": "Arquivo de Áudio do Alerta (Opcional)"
  },
  "followTitle": {
    "type": "text",
    "label": "Título para Novo Seguidor",
    "value": "NOVO SEGUIDOR NO CANAL!"
  },
  "subTitle": {
    "type": "text",
    "label": "Título para Novo Sub",
    "value": "NOVO INSCRITO NO CANAL!"
  }
};`;

export const STREAM_ELEMENTS_WIDGET_DATA = `{
  "alertDuration": 6,
  "alertVolume": 40,
  "alertSound": "",
  "followTitle": "NOVO SEGUIDOR NO CANAL!",
  "subTitle": "NOVO INSCRITO NO CANAL!"
};`;

