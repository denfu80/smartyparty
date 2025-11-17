import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { User } from '@/lib/types/user';

export async function createUser(userId: string, data: Partial<User>): Promise<void> {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    createdAt: Timestamp.now(),
    stats: { gamesPlayed: 0, gamesWon: 0 },
    settings: { language: 'de', theme: 'light' }
  });
}

export async function getUser(userId: string): Promise<User | null> {
  const snapshot = await getDoc(doc(db, 'users', userId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as User : null;
}

export async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  await updateDoc(doc(db, 'users', userId), data);
}
