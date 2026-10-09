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

  // Elementos do DOM
  const alertCard = document.getElementById('alert-card');
  const alertTag = document.getElementById('alert-tag');
  const alertTitle = document.getElementById('alert-title');
  const alertUsername = document.getElementById('alert-username');
  const alertMessage = document.getElementById('alert-message');
  const alertAudio = document.getElementById('alert-audio');

  /**
   * Toca um chime sonoro via Web Audio API (caso o StreamElements não tenha som configurado)
   */
  function playProceduralChime(volumePercent) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const gainNode = ctx.createGain();
      const vol = Math.max(0, Math.min(1, (volumePercent || 50) / 100)) * 0.25; // Calibrado em -15dB
      gainNode.gain.setValueAtTime(vol, ctx.currentTime);
      gainNode.connect(ctx.destination);

      // Acorde harmônico C Maior (RPG / Fantasia Medieval)
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

  /**
   * Toca o som do alerta
   */
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

  /**
   * Renderiza e exibe o alerta atual da fila
   */
  function displayAlert(data) {
    if (!alertCard) return;

    // Remove classes anteriores
    alertCard.className = 'alert-card';
    alertCard.classList.add(`event-${data.type}`);

    // Configura textos
    if (alertTag) alertTag.textContent = data.badgeText;
    if (alertTitle) alertTitle.textContent = data.titleText;
    if (alertUsername) alertUsername.textContent = data.username;

    if (alertMessage) {
      if (data.message && data.message.trim() !== '') {
        alertMessage.textContent = `"${data.message.trim()}"`;
        alertMessage.style.display = 'block';
      } else {
        alertMessage.style.display = 'none';
      }
    }

    // Toca o áudio de efeito
    playSound();

    // Ativa exibição visual com animação
    alertCard.classList.add('show');

    const durationSeconds = typeof userFieldData.alertDuration === 'number' ? userFieldData.alertDuration : 6;
    const durationMs = durationSeconds * 1000;

    // Temporizador para esconder e chamar o próximo
    setTimeout(() => {
      alertCard.classList.remove('show');

      // Intervalo limpo de 800ms antes do próximo alerta
      setTimeout(() => {
        isDisplaying = false;
        processNextAlert();
      }, 800);
    }, durationMs);
  }

  /**
   * Processa o próximo alerta da fila FIFO
   */
  function processNextAlert() {
    if (isDisplaying || alertQueue.length === 0) return;
    isDisplaying = true;
    const nextItem = alertQueue.shift();
    displayAlert(nextItem);
  }

  /**
   * Normaliza os eventos do StreamElements para a fila
   */
  function handleEvent(listener, event) {
    if (!event) return;

    let alertData = null;

    switch (listener) {
      case 'follower-latest':
        alertData = {
          type: 'follow',
          badgeText: 'NOVO SEGUIDOR',
          titleText: userFieldData.followTitle || 'NOVO SEGUIDOR NA GUILDA!',
          username: event.name || 'Guerreiro_Albion',
          message: null,
        };
        break;

      case 'subscriber-latest':
        const tier = event.tier === 'prime' ? 'Twitch Prime' : event.tier ? `Tier ${event.tier / 1000}` : '';
        const months = event.amount ? ` • ${event.amount} meses` : '';
        alertData = {
          type: 'sub',
          badgeText: 'NOVO INSCRITO',
          titleText: userFieldData.subTitle || 'HONRA DE GUILDA: SUB!',
          username: `${event.name || 'Guerreiro_Albion'} (${tier}${months})`,
          message: event.message || null,
        };
        break;

      case 'tip-latest':
        const formattedAmount = typeof event.amount === 'number' ? `R$ ${event.amount.toFixed(2)}` : event.amount || 'R$ 10,00';
        alertData = {
          type: 'tip',
          badgeText: 'DOAÇÃO PIX',
          titleText: `DOAÇÃO DE ${formattedAmount}!`,
          username: event.name || 'Patrono_Albion',
          message: event.message || null,
        };
        break;

      case 'cheer-latest':
        alertData = {
          type: 'cheer',
          badgeText: 'BITS RECEBIDOS',
          titleText: `${event.amount || 100} BITS DA TWITCH!`,
          username: event.name || 'Apoiador_Albion',
          message: event.message || null,
        };
        break;

      case 'raid-latest':
        alertData = {
          type: 'raid',
          badgeText: 'INVASÃO DE GUILDA',
          titleText: `RAID COM ${event.amount || 10} COMBATENTES!`,
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

  // Evento de Inicialização do StreamElements
  window.addEventListener('onWidgetLoad', function (obj) {
    if (obj && obj.detail && obj.detail.fieldData) {
      userFieldData = obj.detail.fieldData;
    }
  });

  // Evento de Recebimento de Alertas (Ao vivo e Simulações de Teste)
  window.addEventListener('onEventReceived', function (obj) {
    if (!obj || !obj.detail) return;
    const listener = obj.detail.listener;
    const event = obj.detail.event;
    handleEvent(listener, event);
  });
})();
