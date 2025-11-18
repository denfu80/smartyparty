import { Timestamp } from 'firebase/firestore';
import { ResourceType } from '@/lib/config/resources';

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

// US-020: Station Control
export interface Position {
  x: number;
  y: number;
}

// US-101: Resource Production
export interface ResourceProduction {
  amountPerRound: number;
  currentStock: number;
}

export interface Station {
  id: string;
  gameId: string;
  name: string;
  controlledBy?: string; // playerId or "neutral"
  position: Position;
  strategicValue: number; // 1-10
  defenseLevel: number;
  resourceProduction?: Record<ResourceType, ResourceProduction>;
}

// US-100: Player with Resources
export interface Player {
  id: string;
  userId: string;
  gameId: string;
  displayName: string;
  avatar?: string;

  // Core Stats
  credits: number;
  influence: number;

  // US-100: Resources
  resources: Record<ResourceType, number>;

  // US-020: Controlled Territory
  controlledStations: string[]; // stationIds

  // Turn Management
  isReady: boolean;

  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// US-001, US-002: NPCs
export interface NPC {
  id: string;
  name: string;
  personality: string[];
  greeting: string;
  avatar?: string;
  description?: string;
}
