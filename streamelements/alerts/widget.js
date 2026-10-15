/**
 * ============================================================
 * IVEXI GUILD & VULGOMANIACO - STREAM PACK
 * Script Oficial para StreamElements Custom Widget
 * Cole este código na aba JS do editor de Custom Widget
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

    let alertData = null;

    switch (listener) {
      case 'follower-latest':
        alertData = {
          className: 'event-follow',
          soundType: 'follow',
          badgeText: 'NOVO SEGUIDOR',
          titleText: userFieldData.followTitle || 'NOVO SEGUIDOR NO CANAL!',
          username: event.name || 'Guerreiro_Albion',
          message: null,
        };
        break;

      case 'subscriber-latest': {
        const isBulk = event.bulkGifted || event.isCommunityGift;
        const count = event.count || event.amount || 5;

        if (isBulk) {
          alertData = {
            className: 'event-sub-bomb',
            soundType: 'subbomb',
            badgeText: '💣 ' + count + ' SUBS EM LOTE',
            titleText: 'COMBO DE ' + count + ' SUBS DA GUILDA!',
            usernameHtml: '<strong>' + (event.sender || event.name || 'Guerreiro') + '</strong> doou <strong>' + count + ' subs</strong> para a comunidade!',
            message: null,
          };
        } else if (event.gifted || event.sender) {
          alertData = {
            className: 'event-sub-gift',
            soundType: 'sub',
            badgeText: 'PRESENTE DA GUILDA',
            titleText: 'SUB DE PRESENTE NO CANAL!',
            usernameHtml: '<strong>' + (event.sender || 'Guerreiro') + '</strong> presenteou <strong>' + (event.name || 'um membro') + '</strong>!',
            message: null,
          };
        } else if (event.amount && event.amount > 1) {
          alertData = {
            className: 'event-sub-resub',
            soundType: 'sub',
            badgeText: event.amount + ' MESES DE GUILDA',
            titleText: 'RENOVAÇÃO DE INSCRIÇÃO!',
            username: (event.name || 'Guerreiro') + ' (' + event.amount + ' meses acumulados)',
            message: event.message || null,
          };
        } else if (event.tier === 'prime') {
          alertData = {
            className: 'event-sub-prime',
            soundType: 'sub',
            badgeText: 'PRIME GAMING',
            titleText: 'INSCRIÇÃO PRIME GAMING!',
            username: event.name || 'Guerreiro_Prime',
            message: event.message || null,
          };
        } else if (event.tier === '3000') {
          alertData = {
            className: 'event-sub-t3',
            soundType: 'sub',
            badgeText: 'INSCRITO TIER 3 (IMPERADOR)',
            titleText: 'NOVO INSCRITO TIER 3!',
            username: event.name || 'Imperador_Albion',
            message: event.message || null,
          };
        } else if (event.tier === '2000') {
          alertData = {
            className: 'event-sub-t2',
            soundType: 'sub',
            badgeText: 'INSCRITO TIER 2 (SOLDADO)',
            titleText: 'NOVO INSCRITO TIER 2!',
            username: event.name || 'Soldado_Albion',
            message: event.message || null,
          };
        } else {
          alertData = {
            className: 'event-sub-t1',
            soundType: 'sub',
            badgeText: 'NOVO INSCRITO T1',
            titleText: userFieldData.subTitle || 'NOVO INSCRITO NO CANAL!',
            username: event.name || 'Guerreiro_Albion',
            message: event.message || null,
          };
        }
        break;
      }

      case 'tip-latest': {
        const formattedAmount = typeof event.amount === 'number' ? 'R$ ' + event.amount.toFixed(2) : (event.amount || 'R$ 10,00');
        alertData = {
          className: 'event-tip',
          soundType: 'tip',
          badgeText: 'APOIO PIX / TIP',
          titleText: 'DOAÇÃO PARA A LIVE: ' + formattedAmount + '!',
          username: event.name || 'Patrono_Albion',
          message: event.message || null,
        };
        break;
      }

      case 'cheer-latest': {
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
          username: event.name || 'Apoiador_Albion',
          message: event.message || null,
        };
        break;
      }

      case 'raid-latest': {
        const viewers = event.amount || 10;
        alertData = {
          className: 'event-raid',
          soundType: 'raid',
          badgeText: '⚔️ RAID • ' + viewers + ' GUERREIROS',
          titleText: 'RAID NO CANAL VULGOMANIACO!',
          usernameHtml: '<strong>' + (event.name || 'Guilda Aliada') + '</strong> trouxe <strong>' + viewers + ' espectadores</strong>!',
          message: null,
        };
        break;
      }

      case 'hype-train-latest':
      case 'hypetrain-latest': {
        alertData = {
          className: 'event-hypetrain',
          soundType: 'hypetrain',
          badgeText: '🚂 HYPE TRAIN • NÍVEL ' + (event.level || 1),
          titleText: 'TREM DO HYPE NA LIVE!',
          username: 'Apoie para acelerar a carga de energia sifada!',
          message: null,
        };
        break;
      }
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
})();
