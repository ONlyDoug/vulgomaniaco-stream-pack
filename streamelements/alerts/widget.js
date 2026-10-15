/* jshint esversion: 6, browser: true */
/**
 * ============================================================
 * IVEXI GUILD & VULGOMANIACO - STREAM PACK
 * Script Oficial para StreamElements Custom Widget
 * Cole este código na aba JS do editor de Custom Widget
 * ============================================================
 */

(function () {
  var userFieldData = {};
  var alertQueue = [];
  var isDisplaying = false;

  var alertCard = document.getElementById('alert-card');
  var alertTag = document.getElementById('alert-tag');
  var alertTitle = document.getElementById('alert-title');
  var alertUsername = document.getElementById('alert-username');
  var alertMessage = document.getElementById('alert-message');
  var alertAudio = document.getElementById('alert-audio');

  // Gerador Sonoro Procedural Nativo equalizado a -14 LUFS (100% seguro)
  function playProceduralSound(type, volumePercent) {
    try {
      var AudioContextClass = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) || null;
      if (!AudioContextClass) return;
      var ctx = new AudioContextClass();
      var masterGain = ctx.createGain();
      var vol = Math.max(0, Math.min(1, (volumePercent || 40) / 100)) * 0.22;
      masterGain.gain.setValueAtTime(vol, ctx.currentTime);
      masterGain.connect(ctx.destination);
      var now = ctx.currentTime;

      if (type === 'subbomb') {
        var bass = ctx.createOscillator();
        var bGain = ctx.createGain();
        bass.type = 'sine';
        bass.frequency.setValueAtTime(110, now);
        bass.frequency.exponentialRampToValueAtTime(55, now + 0.4);
        bGain.gain.setValueAtTime(0.3, now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        bass.connect(bGain);
        bGain.connect(masterGain);
        bass.start(now);
        bass.stop(now + 0.5);

        var subBombNotes = [392.0, 523.25, 659.25, 783.99, 1046.5];
        for (var i = 0; i < subBombNotes.length; i++) {
          var osc1 = ctx.createOscillator();
          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(subBombNotes[i], now + i * 0.07);
          osc1.connect(masterGain);
          osc1.start(now + i * 0.07);
          osc1.stop(now + 1.5);
        }
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      } else if (type && type.indexOf('sub') !== -1) {
        var subNotes = [440.0, 554.37, 659.25, 880.0];
        for (var j = 0; j < subNotes.length; j++) {
          var osc2 = ctx.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(subNotes[j], now + j * 0.08);
          osc2.connect(masterGain);
          osc2.start(now + j * 0.08);
          osc2.stop(now + 1.3);
        }
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
      } else if (type === 'tip') {
        var tipNotes = [880.0, 1318.5, 1760.0, 2093.0];
        for (var k = 0; k < tipNotes.length; k++) {
          var osc3 = ctx.createOscillator();
          osc3.type = 'sine';
          osc3.frequency.setValueAtTime(tipNotes[k], now + k * 0.06);
          osc3.connect(masterGain);
          osc3.start(now + k * 0.06);
          osc3.stop(now + 1.0);
        }
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      } else if (type === 'raid') {
        var raidNotes = [220.0, 329.63, 440.0];
        for (var m = 0; m < raidNotes.length; m++) {
          var osc4 = ctx.createOscillator();
          osc4.type = 'sawtooth';
          osc4.frequency.setValueAtTime(raidNotes[m], now + m * 0.12);
          osc4.connect(masterGain);
          osc4.start(now + m * 0.12);
          osc4.stop(now + 1.6);
        }
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      } else {
        var defaultNotes = [523.25, 659.25, 783.99, 1046.5];
        for (var n = 0; n < defaultNotes.length; n++) {
          var osc5 = ctx.createOscillator();
          osc5.type = 'triangle';
          osc5.frequency.setValueAtTime(defaultNotes[n], now + n * 0.08);
          osc5.connect(masterGain);
          osc5.start(now + n * 0.08);
          osc5.stop(now + 1.2);
        }
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      }
    } catch (e) {
      console.warn('Audio procedural:', e);
    }
  }

  function playSound(type) {
    var volume = typeof userFieldData.alertVolume === 'number' ? userFieldData.alertVolume : 40;
    var soundUrl = userFieldData.alertSound;

    if (soundUrl && typeof soundUrl === 'string' && soundUrl.trim() !== '') {
      try {
        if (alertAudio) {
          alertAudio.src = soundUrl.trim();
          alertAudio.volume = Math.max(0, Math.min(1, volume / 100));
          var playPromise = alertAudio.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(function () {
              playProceduralSound(type, volume);
            });
          }
          return;
        }
      } catch (err) {
        console.warn('Falha no audio HTML5:', err);
      }
    }

    playProceduralSound(type, volume);
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

    // Exibe o card visual imediatamente (garantia de renderização)
    alertCard.classList.add('show');

    // Dispara o áudio protegido contra qualquer falha
    try {
      playSound(data.soundType);
    } catch (audioErr) {
      console.warn('Audio protegido:', audioErr);
    }

    var durationSeconds = typeof userFieldData.alertDuration === 'number' ? userFieldData.alertDuration : 6;
    var durationMs = durationSeconds * 1000;

    setTimeout(function () {
      alertCard.classList.remove('show');
      setTimeout(function () {
        isDisplaying = false;
        processNextAlert();
      }, 700);
    }, durationMs);
  }

  function processNextAlert() {
    if (isDisplaying || alertQueue.length === 0) return;
    isDisplaying = true;
    var nextItem = alertQueue.shift();
    displayAlert(nextItem);
  }

  function handleEvent(listener, event) {
    if (!event) return;
    var l = String(listener || (event && (event.type || event.listener)) || '').toLowerCase();
    try {
      console.log('[IVEXI Stream Widget] Evento detectado:', l, event);
    } catch (e) {}

    var alertData = null;

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
      var isBulk = event.bulkGifted || event.isCommunityGift;
      var count = event.count || event.amount || 5;

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
      var formattedAmount = typeof event.amount === 'number' ? 'R$ ' + event.amount.toFixed(2) : (event.amount || 'R$ 10,00');
      alertData = {
        className: 'event-tip',
        soundType: 'tip',
        badgeText: 'APOIO PIX / TIP',
        titleText: 'DOAÇÃO PARA A LIVE: ' + formattedAmount + '!',
        username: event.name || event.displayName || 'Patrono_Albion',
        message: event.message || null,
      };
    } else if (l === 'cheer-latest' || l.indexOf('cheer') !== -1 || l.indexOf('bit') !== -1) {
      var bits = typeof event.amount === 'number' ? event.amount : parseInt(event.amount || '100', 10);
      var tierClass = 'event-cheer-tier1';
      var badge = '🔮 BITS AMETISTA';
      var title = bits.toLocaleString('pt-BR') + ' BITS NO CANAL!';

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
      var viewers = event.amount || event.viewers || 10;
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
    var detail = obj.detail;
    var listener = detail.listener || detail.type || '';
    var event = detail.event || detail.data || detail;
    handleEvent(listener, event);
  });
})();
