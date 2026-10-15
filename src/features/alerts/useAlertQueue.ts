import { useState, useEffect, useCallback } from 'react';
import { playProceduralAlertSound, AlertSoundType } from './alertSound';

export interface StreamAlert {
  id: string;
  type: 'follow' | 'sub' | 'donation' | 'raid' | 'cheer' | 'hypetrain';
  subType?: 'tier1' | 'tier2' | 'tier3' | 'prime' | 'resub' | 'gift' | 'subbomb';
  username: string;
  amount?: string;
  message?: string;
  durationMs?: number;
  months?: number;
  recipient?: string;
  giftCount?: number;
  viewersCount?: number;
  bitsAmount?: number;
  hypeLevel?: number;
  hypeStatus?: 'start' | 'levelup' | 'complete';
}

export function useAlertQueue() {
  const [queue, setQueue] = useState<StreamAlert[]>([]);
  const [currentAlert, setCurrentAlert] = useState<StreamAlert | null>(null);

  const enqueueAlert = useCallback((alert: StreamAlert) => {
    setQueue((prev) => [...prev, alert]);
  }, []);

  useEffect(() => {
    // Processamento sequencial FIFO da fila de alertas
    if (!currentAlert && queue.length > 0) {
      const nextAlert = queue[0];
      setQueue((prev) => prev.slice(1));
      setCurrentAlert(nextAlert);

      // Determina a assinatura sonora equalizada a -14 LUFS para cada evento
      let soundType: AlertSoundType = 'follow';
      if (nextAlert.type === 'sub') {
        soundType = nextAlert.subType === 'subbomb' ? 'subbomb' : 'sub';
      } else if (nextAlert.type === 'donation') {
        soundType = 'donation';
      } else if (nextAlert.type === 'cheer') {
        soundType = 'cheer';
      } else if (nextAlert.type === 'raid') {
        soundType = 'raid';
      } else if (nextAlert.type === 'hypetrain') {
        soundType = 'hypetrain';
      }

      try {
        playProceduralAlertSound(soundType, 40);
      } catch (e) {
        // Ignora silenciosamente se o navegador bloquear autoplay
      }

      const timer = setTimeout(() => {
        setCurrentAlert(null);
      }, (nextAlert.durationMs || 5500) + 800); // Exibição + intervalo limpo

      return () => clearTimeout(timer);
    }
  }, [queue, currentAlert]);

  // Escuta canal BroadcastChannel para sincronização remota (OBS Studio & Control Dashboard)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('vulgomaniaco_obs_channel');
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'TRIGGER_ALERT' && event.data.payload) {
          enqueueAlert(event.data.payload);
        }
      };
      channel.addEventListener('message', handleMessage);
      return () => {
        channel.removeEventListener('message', handleMessage);
        channel.close();
      };
    }
  }, [enqueueAlert]);

  return {
    queue,
    currentAlert,
    enqueueAlert,
  };
}

