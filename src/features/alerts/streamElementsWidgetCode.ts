/**
 * Códigos prontos do Custom Widget da Guilda IVEXI para o StreamElements
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

<!-- Elemento de Áudio para o Efeito Sonoro -->
<audio id="alert-audio" preload="auto"></audio>`;

export const STREAM_ELEMENTS_WIDGET_CSS = `/* ============================================================
   IVEXI GUILD & VULGOMANIACO - STREAM PACK
   Folha de Estilos Oficial para StreamElements (Overlay 1080p)
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@700;900&family=Rajdhani:wght@600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: transparent !important;
  font-family: 'Rajdhani', sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Container de Centralização no Topo (Zona Segura Albion Online) */
.alert-wrapper {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 580px;
  max-width: 90vw;
  pointer-events: none;
  z-index: 9999;
}

/* Card Principal Tático */
.alert-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(11, 5, 18, 0.95);
  border: 2px solid #732EB8;
  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  padding: 18px 24px;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 25px rgba(115, 46, 184, 0.45);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-40px) scale(0.95);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, visibility 0.45s;
}

/* Estado Visível Ativado */
.alert-card.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

/* Variantes de Cores e Glow por Tipo de Evento */
.alert-card.event-follow {
  border-color: #732EB8;
  box-shadow: 0 0 30px rgba(115, 46, 184, 0.6);
}

.alert-card.event-sub {
  border-color: #D6D65C;
  box-shadow: 0 0 35px rgba(214, 214, 92, 0.65);
}

.alert-card.event-tip {
  border-color: #F5A623;
  box-shadow: 0 0 35px rgba(245, 166, 35, 0.65);
}

.alert-card.event-cheer {
  border-color: #00E5FF;
  box-shadow: 0 0 35px rgba(0, 229, 255, 0.65);
}

.alert-card.event-raid {
  border-color: #FF3B30;
  box-shadow: 0 0 40px rgba(255, 59, 48, 0.75);
}

/* Box do Mascote Oficial Chibi */
.alert-avatar-box {
  width: 82px;
  height: 82px;
  flex-shrink: 0;
  background: #140A1F;
  border: 2px solid #732EB8;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  box-shadow: inset 0 0 15px rgba(115, 46, 184, 0.3);
}

.alert-avatar-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(214, 214, 92, 0.6));
}

/* Conteúdo Textual */
.alert-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Badges de Cabeçalho */
.alert-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert-badge-tag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 2px 8px;
  border-radius: 4px;
  background: #732EB8;
  color: #FFFFFF;
}

.alert-card.event-sub .alert-badge-tag {
  background: #D6D65C;
  color: #0B0512;
}

.alert-card.event-tip .alert-badge-tag {
  background: #F5A623;
  color: #000000;
}

.alert-card.event-cheer .alert-badge-tag {
  background: #00E5FF;
  color: #000000;
}

.alert-card.event-raid .alert-badge-tag {
  background: #FF3B30;
  color: #FFFFFF;
}

.alert-badge-guild {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #9E82B8;
}

/* Título do Evento */
.alert-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #D6D65C;
  text-shadow: 0 0 12px rgba(214, 214, 92, 0.5);
  line-height: 1.1;
}

/* Nome do Usuário */
.alert-username {
  font-family: 'Rajdhani', sans-serif;
  font-size: 21px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.8px;
  line-height: 1.2;
}

/* Mensagem de Apoio (Doações/Subs) */
.alert-message {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-style: italic;
  color: rgba(240, 235, 245, 0.9);
  background: rgba(20, 10, 31, 0.7);
  padding: 6px 10px;
  border-left: 3px solid #D6D65C;
  border-radius: 4px;
  margin-top: 4px;
  word-break: break-word;
  max-height: 52px;
  overflow: hidden;
}`;

export const STREAM_ELEMENTS_WIDGET_JS = `/**
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

  function playProceduralChime(volumePercent) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const gainNode = ctx.createGain();
      const vol = Math.max(0, Math.min(1, (volumePercent || 50) / 100)) * 0.25;
      gainNode.gain.setValueAtTime(vol, ctx.currentTime);
      gainNode.connect(ctx.destination);

      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        osc.connect(gainNode);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + 1.2);
      });

      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    } catch (e) {
      console.warn('Audio procedual não suportado:', e);
    }
  }

  function playSound() {
    const soundUrl = userFieldData.alertSound;
    const volume = typeof userFieldData.alertVolume === 'number' ? userFieldData.alertVolume : 50;

    if (soundUrl && soundUrl.trim() !== '') {
      if (alertAudio) {
        alertAudio.src = soundUrl;
        alertAudio.volume = volume / 100;
        alertAudio.play().catch(() => playProceduralChime(volume));
      }
    } else {
      playProceduralChime(volume);
    }
  }

  function displayAlert(data) {
    if (!alertCard) return;

    alertCard.className = 'alert-card';
    alertCard.classList.add('event-' + data.type);

    if (alertTag) alertTag.textContent = data.badgeText;
    if (alertTitle) alertTitle.textContent = data.titleText;
    if (alertUsername) alertUsername.textContent = data.username;

    if (alertMessage) {
      if (data.message && data.message.trim() !== '') {
        alertMessage.textContent = '"' + data.message.trim() + '"';
        alertMessage.style.display = 'block';
      } else {
        alertMessage.style.display = 'none';
      }
    }

    playSound();
    alertCard.classList.add('show');

    const durationSeconds = typeof userFieldData.alertDuration === 'number' ? userFieldData.alertDuration : 6;
    const durationMs = durationSeconds * 1000;

    setTimeout(() => {
      alertCard.classList.remove('show');
      setTimeout(() => {
        isDisplaying = false;
        processNextAlert();
      }, 800);
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

    let alertData = null;

    switch (listener) {
      case 'follower-latest':
        alertData = {
          type: 'follow',
          badgeText: 'NOVO SEGUIDOR',
          titleText: userFieldData.followTitle || 'NOVO SEGUIDOR NO CANAL!',
          username: event.name || 'Guerreiro_Albion',
          message: null,
        };
        break;

      case 'subscriber-latest':
        const tier = event.tier === 'prime' ? 'Twitch Prime' : event.tier ? 'Tier ' + (event.tier / 1000) : '';
        const months = event.amount ? ' • ' + event.amount + ' meses' : '';
        alertData = {
          type: 'sub',
          badgeText: 'NOVO INSCRITO',
          titleText: userFieldData.subTitle || 'NOVO INSCRITO NO CANAL!',
          username: (event.name || 'Guerreiro_Albion') + ' (' + tier + months + ')',
          message: event.message || null,
        };
        break;

      case 'tip-latest':
        const formattedAmount = typeof event.amount === 'number' ? 'R$ ' + event.amount.toFixed(2) : event.amount || 'R$ 10,00';
        alertData = {
          type: 'tip',
          badgeText: 'APOIO AO CANAL',
          titleText: 'DOAÇÃO PARA A LIVE: ' + formattedAmount + '!',
          username: event.name || 'Patrono_Albion',
          message: event.message || null,
        };
        break;

      case 'cheer-latest':
        alertData = {
          type: 'cheer',
          badgeText: 'BITS NO CANAL',
          titleText: (event.amount || 100) + ' BITS NO CANAL!',
          username: event.name || 'Apoiador_Albion',
          message: event.message || null,
        };
        break;

      case 'raid-latest':
        alertData = {
          type: 'raid',
          badgeText: 'INVASÃO / RAID',
          titleText: 'RAID NO CANAL COM ' + (event.amount || 10) + ' ESPECTADORES!',
          username: event.name || 'Guilda_Aliada',
          message: null,
        };
        break;
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
    "label": "Arquivo de Áudio do Alerta (Opcional)",
    "value": ""
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
