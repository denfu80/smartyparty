import { collection, doc, getDoc, getDocs, addDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Game } from '@/lib/types/game';

export async function createGame(name: string, createdBy: string, maxPlayers: number = 4): Promise<string> {
  const docRef = await addDoc(collection(db, 'games'), {
    name,
    createdBy,
    maxPlayers,
    status: 'lobby',
    currentRound: 0,
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
