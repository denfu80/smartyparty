import { Timestamp } from 'firebase/firestore';

export interface Game {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Timestamp;
  status: 'lobby' | 'active' | 'finished';
  maxPlayers: number;
  currentRound: number;
}
