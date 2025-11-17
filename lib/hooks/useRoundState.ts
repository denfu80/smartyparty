/**
 * Custom Hook: useRoundState
 * Real-time listener for round state changes
 */

import { useState, useEffect } from 'react';
import { subscribeToRoundState } from '@/lib/services/gameService';
import type { RoundState } from '@/lib/types/game';

interface UseRoundStateReturn {
  currentRound: number;
  roundPhase: string | null;
  playersReady: string[];
  isAllReady: boolean;
  loading: boolean;
  error: string | null;
}

export function useRoundState(gameId: string | null): UseRoundStateReturn {
  const [currentRound, setCurrentRound] = useState(0);
  const [roundState, setRoundState] = useState<RoundState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const unsubscribe = subscribeToRoundState(gameId, (state, round) => {
        setRoundState(state);
        setCurrentRound(round);
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe to round state');
      setLoading(false);
    }
  }, [gameId]);

  return {
    currentRound,
    roundPhase: roundState?.currentPhase || null,
    playersReady: roundState?.playersReady || [],
    isAllReady: roundState?.allPlayersReady || false,
    loading,
    error,
  };
}
