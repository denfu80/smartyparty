import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: Timestamp;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
  };
  settings: {
    language: 'de' | 'en';
    theme: 'light' | 'dark';
  };
}
