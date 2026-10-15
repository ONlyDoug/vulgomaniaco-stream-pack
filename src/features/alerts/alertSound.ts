/**
 * Gerador sonoro procedural via Web Audio API
 * Toca chimes harmônicos no estilo RPG Albion/Fantasia tática calibrados em -14 LUFS
 * Não depende de arquivos de áudio externos, garantindo reprodução instantânea no OBS.
 */

export type AlertSoundType = 'follow' | 'sub' | 'subbomb' | 'donation' | 'cheer' | 'raid' | 'hypetrain';

export function playProceduralAlertSound(soundType: AlertSoundType = 'follow', volumePercent = 40) {
  if (typeof window === 'undefined') return;

  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();

    // Volume seguro equalizado a -14 LUFS (~0.22 max gain) para evitar clipagem no OBS
    const normalizedVol = Math.max(0, Math.min(1, volumePercent / 100)) * 0.22;
    masterGain.gain.setValueAtTime(normalizedVol, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (soundType) {
      case 'subbomb': {
        // Impacto épico com sub-grave e arpeggio duplo de comemoração
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(110, now);
        bassOsc.frequency.exponentialRampToValueAtTime(55, now + 0.4);
        bassGain.gain.setValueAtTime(0.3, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        bassOsc.connect(bassGain);
        bassGain.connect(masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + 0.5);

        // Arpeggio heróico com fanfarra de trompetes arcanos
        const notes = [392.0, 523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          osc.connect(masterGain);
          osc.start(now + idx * 0.07);
          osc.stop(now + 1.5);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
        break;
      }

      case 'sub': {
        // Fanfarra triunfante medieval (Acorde vitorioso de Albion)
        const notes = [440.0, 554.37, 659.25, 880.0];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          osc.connect(masterGain);
          osc.start(now + idx * 0.08);
          osc.stop(now + 1.3);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
        break;
      }

      case 'donation': {
        // Chime cristalino de moedas de prata e ouro caindo em baú
        const coinFreqs = [880.0, 1318.5, 1760.0, 2093.0];
        coinFreqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          osc.connect(masterGain);
          osc.start(now + idx * 0.06);
          osc.stop(now + 1.0);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
        break;
      }

      case 'cheer': {
        // Faíscas elétricas de alta frequência (Energia Sifada / Bits)
        const bitFreqs = [659.25, 783.99, 987.77, 1318.5];
        bitFreqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          osc.connect(masterGain);
          osc.start(now + idx * 0.05);
          osc.stop(now + 0.9);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
        break;
      }

      case 'raid': {
        // Trompa de guerra tática (Invasão ZvZ na Black Zone)
        const hornFreqs = [220.0, 329.63, 440.0];
        hornFreqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, now);
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          osc.connect(filter);
          filter.connect(masterGain);
          osc.start(now + idx * 0.12);
          osc.stop(now + 1.6);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
        break;
      }

      case 'hypetrain': {
        // Alarme acelerador de Hype com tom subindo
        const hypeOsc = ctx.createOscillator();
        hypeOsc.type = 'triangle';
        hypeOsc.frequency.setValueAtTime(440, now);
        hypeOsc.frequency.exponentialRampToValueAtTime(880, now + 0.6);
        hypeOsc.connect(masterGain);
        hypeOsc.start(now);
        hypeOsc.stop(now + 1.2);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        break;
      }

      case 'follow':
      default: {
        // Arpeggio C Maior pentatônico límpido e amigável
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          osc.connect(masterGain);
          osc.start(now + idx * 0.08);
          osc.stop(now + 1.2);
        });
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        break;
      }
    }
  } catch (err) {
    console.warn('Audio procedural não pôde ser reproduzido:', err);
  }
}

