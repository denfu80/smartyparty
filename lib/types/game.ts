import { Timestamp } from 'firebase/firestore';

export type RoundPhase = 'waiting_for_players' | 'in_progress' | 'round_ending' | 'next_round_starting';

export interface RoundState {
  currentPhase: RoundPhase;
  playersReady: string[];
  allPlayersReady: boolean;
  actionsThisRound: number;
  nextRoundStartsAt?: Timestamp;
}

export interface Game {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Timestamp;
  status: 'lobby' | 'active' | 'finished';
  maxPlayers: number;
  currentRound: number;
  roundState?: RoundState;
}

export interface PlayerAction {
  id: string;
  gameId: string;
  playerId: string;
  round: number;
  timestamp: Timestamp;
  type: string;
  data: any;
  status: 'pending' | 'validated' | 'executed' | 'failed';
  validationError?: string;
}
