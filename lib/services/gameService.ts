import { collection, doc, getDoc, getDocs, addDoc, updateDoc, onSnapshot, query, where, Timestamp, writeBatch } from 'firebase/firestore';
import { db, functions } from '@/lib/firebase/config';
import { httpsCallable } from 'firebase/functions';
import type { Game, RoundState, Station, Player } from '@/lib/types/game';
import { createGameStations } from '@/lib/seeders/stationSeeder';
import { INITIAL_RESOURCES, ResourceType } from '@/lib/config/resources';

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

  const gameId = docRef.id;

  // US-020, US-101: Initialize stations for the new game
  try {
    await initializeGameStations(gameId);
    console.log(`✅ Stations initialized for game ${gameId}`);
  } catch (error) {
    console.error('⚠️ Failed to initialize stations (Firestore rules not deployed yet?):', error);
    // Don't fail game creation if stations can't be initialized
    // Stations can be initialized later when rules are deployed
  }

  return gameId;
}

/**
 * US-020, US-101: Initialize stations for a new game
 */
async function initializeGameStations(gameId: string): Promise<void> {
  const stations = createGameStations(gameId);
  const batch = writeBatch(db);

  stations.forEach((station) => {
    const stationRef = doc(db, 'games', gameId, 'stations', station.id);
    batch.set(stationRef, station);
  });

  await batch.commit();
}

/**
 * US-100: Initialize player with starting resources
 */
export async function addPlayerToGame(gameId: string, userId: string, displayName: string): Promise<void> {
  // Check if this is the first player
  const playersSnapshot = await getDocs(collection(db, 'games', gameId, 'players'));
  const isFirstPlayer = playersSnapshot.empty;

  const playerData: Partial<Player> = {
    id: userId,
    userId,
    gameId,
    displayName,
    credits: 10000, // Starting credits
    influence: 0,
    resources: {
      [ResourceType.METALS]: INITIAL_RESOURCES[ResourceType.METALS],
      [ResourceType.ENERGY]: INITIAL_RESOURCES[ResourceType.ENERGY],
      [ResourceType.FOOD]: INITIAL_RESOURCES[ResourceType.FOOD],
      [ResourceType.COMPONENTS]: INITIAL_RESOURCES[ResourceType.COMPONENTS],
      [ResourceType.LUXURY_GOODS]: INITIAL_RESOURCES[ResourceType.LUXURY_GOODS],
    },
    controlledStations: isFirstPlayer ? ['station-1'] : [], // First player gets Alpha Station
    isReady: false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await addDoc(collection(db, 'games', gameId, 'players'), playerData);

  // If first player, assign them control of station-1
  if (isFirstPlayer) {
    const stationRef = doc(db, 'games', gameId, 'stations', 'station-1');
    await updateDoc(stationRef, {
      controlledBy: userId,
    });
  }
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

/**
 * US-020: Purchase a station (callable function)
 */
export async function purchaseStation(
  gameId: string,
  stationId: string
): Promise<{ success: boolean; newCredits: number; stationName: string; price: number }> {
  const purchaseStationFn = httpsCallable(functions, 'purchaseStation');
  const result = await purchaseStationFn({ gameId, stationId });
  return result.data as { success: boolean; newCredits: number; stationName: string; price: number };
}
