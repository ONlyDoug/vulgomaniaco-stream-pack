import { useState, useEffect, useCallback } from 'react';
import { playProceduralAlertSound } from './alertSound';

export interface StreamAlert {
  id: string;
  type: 'follow' | 'sub' | 'donation' | 'raid';
  username: string;
  amount?: string;
  message?: string;
  durationMs?: number;
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

      // Toca chime sonoro procedural nativo (calibrado em -15dB)
      try {
        playProceduralAlertSound(40);
      } catch (e) {
        // Ignora silenciosamente se o navegador bloquear autoplay
      }

      const timer = setTimeout(() => {
        setCurrentAlert(null);
      }, (nextAlert.durationMs || 5000) + 1000); // Exibição + 1s de intervalo limpo

      return () => clearTimeout(timer);
    }
  }, [queue, currentAlert]);

  // Escuta canal BroadcastChannel para sincronização remota
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
