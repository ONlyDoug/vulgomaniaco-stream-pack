/**
 * Gerador sonoro procedural via Web Audio API
 * Toca um chime harmônico estilo RPG/Fantasia tática calibrado em -15dB
 * Não depende de arquivos de áudio externos, evitando erros de carregamento no OBS.
 */

export function playProceduralAlertSound(volumePercent = 40) {
  if (typeof window === 'undefined') return;

  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const gainNode = ctx.createGain();

    // Volume seguro calibrado em -15dB (~0.18 max gain)
    const normalizedVol = Math.max(0, Math.min(1, volumePercent / 100)) * 0.25;
    gainNode.gain.setValueAtTime(normalizedVol, ctx.currentTime);
    gainNode.connect(ctx.destination);

    // Arpeggio C Maior pentatônico límpido (523Hz C5 -> 659Hz E5 -> 784Hz G5 -> 1046Hz C6)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      osc.connect(gainNode);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + 1.2);
    });

    // Decaimento suave sem corte abrupto
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
  } catch (err) {
    // Falha silenciosa em navegadores com restrições severas de autoplay
    console.warn('Audio procedual não pôde ser reproduzido:', err);
  }
}
