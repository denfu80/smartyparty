import { collection, doc, getDoc, getDocs, addDoc, updateDoc, onSnapshot, query, where, Timestamp } from 'firebase/firestore';
import { db, functions } from '@/lib/firebase/config';
import { httpsCallable } from 'firebase/functions';
import type { Game, RoundState } from '@/lib/types/game';

export async function createGame(name: string, createdBy: string, maxPlayers: number = 4): Promise<string> {
  const docRef = await addDoc(collection(db, 'games'), {
    name,
    createdBy,
    maxPlayers,
    status: 'lobby',
    currentRound: 0,
    roundState: {
      currentPhase: 'waiting_for_players',
      playersReady: [],
      allPlayersReady: false,
      actionsThisRound: 0,
    } as RoundState,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

export async function getGame(gameId: string): Promise<Game | null> {
  const snapshot = await getDoc(doc(db, 'games', gameId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Game : null;
}

export async function listGames(userId?: string): Promise<Game[]> {
  let q = query(collection(db, 'games'));

  if (userId) {
    q = query(collection(db, 'games'), where('createdBy', '==', userId));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game));
}

/**
 * Mark a player as ready for the next round
 */
export async function markPlayerReady(gameId: string, playerId: string): Promise<void> {
  const playerRef = doc(db, 'games', gameId, 'players', playerId);
  await updateDoc(playerRef, {
    isReady: true,
    readyAt: Timestamp.now(),
  });
}

/**
 * Get current game state
 */
export async function getGameState(gameId: string): Promise<Game | null> {
  return getGame(gameId);
}

/**
 * Subscribe to round state changes (real-time listener)
 */
export function subscribeToRoundState(
  gameId: string,
  callback: (roundState: RoundState | null, currentRound: number) => void
): () => void {
  const gameRef = doc(db, 'games', gameId);

  const unsubscribe = onSnapshot(gameRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as Game;
      callback(data.roundState || null, data.currentRound);
    } else {
      callback(null, 0);
    }
  });

  return unsubscribe;
}

/**
 * Manually trigger round end processing (callable function)
 */
export async function processRoundEnd(gameId: string): Promise<{ success: boolean; message: string; newRound: number }> {
  const processRoundEndFn = httpsCallable(functions, 'processRoundEnd');
  const result = await processRoundEndFn({ gameId });
  return result.data as { success: boolean; message: string; newRound: number };
}
