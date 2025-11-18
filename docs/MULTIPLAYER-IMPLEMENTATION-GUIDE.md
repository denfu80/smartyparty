# Multiplayer Implementation Guide - Story #11

**Purpose:** Template code and implementation patterns for completing Story #11

**Timeline:** Ready to implement in Sprint 7

---

## Phase 1: Backend Validation (2 hours)

### File: `/lib/services/gameService.ts`

Add this function to validate and join game:

```typescript
/**
 * Join an existing game (Story #11)
 * Validates game status and player count before adding player
 */
export async function joinGame(
  gameId: string,
  userId: string,
  displayName: string
): Promise<void> {
  // 1. Get the game
  const game = await getGame(gameId);
  if (!game) {
    throw new Error(`Game ${gameId} not found`);
  }

  // 2. Validate game is in lobby
  if (game.status !== 'lobby') {
    throw new Error(`Game is not accepting players (status: ${game.status})`);
  }

  // 3. Check if player already in game
  const playersSnapshot = await getDocs(
    query(
      collection(db, 'games', gameId, 'players'),
      where('userId', '==', userId)
    )
  );
  if (!playersSnapshot.empty) {
    throw new Error('You are already in this game');
  }

  // 4. Count current players
  const allPlayersSnapshot = await getDocs(
    collection(db, 'games', gameId, 'players')
  );
  const playerCount = allPlayersSnapshot.size;

  if (playerCount >= game.maxPlayers) {
    throw new Error(
      `Game is full (${playerCount}/${game.maxPlayers} players)`
    );
  }

  // 5. All checks passed - add player
  await addPlayerToGame(gameId, userId, displayName);
}
```

**Testing Scenario:**
```typescript
// Success case
await joinGame('game123', 'user456', 'Alice');

// Error cases
await joinGame('game123', 'user456', 'Alice'); // Throws: "already in game"
await joinGame('game-full', 'user789', 'Bob'); // Throws: "Game is full"
await joinGame('game-started', 'user999', 'Charlie'); // Throws: "not accepting"
```

---

## Phase 2: Real-time Lobby Hook (1.5 hours)

### File: `/lib/hooks/useGameLobby.ts` (CREATE NEW)

```typescript
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Game, Player } from '@/lib/types/game';
import { getGame } from '@/lib/services/gameService';

interface UseGameLobbyReturn {
  game: Game | null;
  players: Player[];
  playerCount: number;
  maxPlayers: number;
  canStart: boolean; // True if creator and all players ready
  isCreator: boolean;
  currentUserReady: boolean;
  loading: boolean;
  error: string | null;
}

export function useGameLobby(
  gameId: string | null,
  currentUserId: string | null
): UseGameLobbyReturn {
  const [game, setGame] = useState<Game | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId || !currentUserId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Subscribe to game changes
      const gameRef = collection(db, 'games').doc(gameId);
      const gameUnsubscribe = onSnapshot(
        gameRef,
        (doc) => {
          if (doc.exists()) {
            setGame({ id: doc.id, ...doc.data() } as Game);
          } else {
            setError('Game not found');
          }
        },
        (err) => setError(err.message)
      );

      // Subscribe to players in this game
      const playersRef = collection(db, 'games', gameId, 'players');
      const playersUnsubscribe = onSnapshot(
        playersRef,
        (snapshot) => {
          const playerList = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Player)
          );
          setPlayers(playerList);
          setLoading(false);
        },
        (err) => setError(err.message)
      );

      return () => {
        gameUnsubscribe();
        playersUnsubscribe();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, [gameId, currentUserId]);

  const currentPlayer = players.find((p) => p.userId === currentUserId);
  const allReady = players.length > 0 && players.every((p) => p.isReady);

  return {
    game,
    players,
    playerCount: players.length,
    maxPlayers: game?.maxPlayers || 0,
    canStart: game?.createdBy === currentUserId && allReady && players.length > 1,
    isCreator: game?.createdBy === currentUserId,
    currentUserReady: currentPlayer?.isReady || false,
    loading,
    error,
  };
}
```

**Usage Example:**
```typescript
function LobbyScreen({ gameId, userId }: { gameId: string; userId: string }) {
  const {
    game,
    players,
    playerCount,
    maxPlayers,
    canStart,
    loading,
    error,
  } = useGameLobby(gameId, userId);

  if (loading) return <div>Loading lobby...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{game?.name}</h2>
      <p>
        Players: {playerCount}/{maxPlayers}
      </p>
      <PlayerList players={players} />
      {canStart && <button>Start Game</button>}
    </div>
  );
}
```

---

## Phase 3: Lobby UI Components (3 hours)

### File: `/app/lobby/page.tsx` (CREATE NEW)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { createGame, listGames } from '@/lib/services/gameService';
import type { Game } from '@/lib/types/game';
import { GameListCard } from '@/components/lobby/GameListCard';
import { CreateGameModal } from '@/components/lobby/CreateGameModal';
import { Button } from '@/components/ui/button';

export default function LobbyPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      loadGames();
    }
  }, [user, authLoading, isAuthenticated, router]);

  async function loadGames() {
    try {
      setLoading(true);
      const gamesList = await listGames();
      // Filter to only lobby games
      const lobbyGames = gamesList.filter((g) => g.status === 'lobby');
      setGames(lobbyGames);
    } catch (err) {
      console.error('Failed to load games:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateGame(name: string, maxPlayers: number) {
    if (!user) return;

    try {
      const gameId = await createGame(name, user.uid, maxPlayers);
      setShowCreateModal(false);
      router.push(`/lobby/${gameId}`);
    } catch (err) {
      console.error('Failed to create game:', err);
    }
  }

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Lobby</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          Neues Spiel erstellen
        </Button>
      </div>

      {loading ? (
        <p>Lade Spiele...</p>
      ) : games.length === 0 ? (
        <p className="text-muted-foreground">
          Keine offenen Spiele. Erstelle ein neues Spiel!
        </p>
      ) : (
        <div className="grid gap-4">
          {games.map((game) => (
            <GameListCard
              key={game.id}
              game={game}
              onJoin={() => router.push(`/lobby/${game.id}`)}
            />
          ))}
        </div>
      )}

      <CreateGameModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreateGame={handleCreateGame}
      />
    </div>
  );
}
```

### File: `/components/lobby/CreateGameModal.tsx` (CREATE NEW)

```typescript
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGame: (name: string, maxPlayers: number) => Promise<void>;
}

export function CreateGameModal({
  open,
  onOpenChange,
  onCreateGame,
}: CreateGameModalProps) {
  const [name, setName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await onCreateGame(name, maxPlayers);
    } finally {
      setLoading(false);
      setName('');
      setMaxPlayers(2);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neues Spiel erstellen</DialogTitle>
          <DialogDescription>
            Gib einen Namen ein und wähle die maximale Spielerzahl
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Spielname</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. 'Handelsimpire'"
              required
            />
          </div>

          <div>
            <Label htmlFor="maxPlayers">Maximale Spieler</Label>
            <select
              id="maxPlayers"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={2}>2 Spieler</option>
              <option value={3}>3 Spieler</option>
              <option value={4}>4 Spieler</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Abbrechen
            </Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? 'Erstelle...' : 'Spiel erstellen'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### File: `/components/lobby/GameListCard.tsx` (CREATE NEW)

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Game } from '@/lib/types/game';

interface GameListCardProps {
  game: Game;
  playerCount?: number;
  onJoin: () => void;
}

export function GameListCard({
  game,
  playerCount = 0,
  onJoin,
}: GameListCardProps) {
  const spotsAvailable = game.maxPlayers - playerCount;
  const isFull = spotsAvailable <= 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{game.name}</CardTitle>
          <Badge variant={isFull ? 'destructive' : 'default'}>
            {playerCount}/{game.maxPlayers} Spieler
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {isFull
              ? 'Spiel voll'
              : `${spotsAvailable} Platz${spotsAvailable === 1 ? '' : 'e'} verfügbar`}
          </div>
          <Button onClick={onJoin} disabled={isFull}>
            {isFull ? 'Voll' : 'Beitreten'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## Phase 4: Game State Transitions (1.5 hours)

### File: `/functions/src/multiplayer.ts` (CREATE NEW)

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Start a game (all players ready, creator clicks start)
 * Transitions: 'lobby' → 'active'
 */
export const startGame = functions.https.onCall(async (data, context) => {
  const { gameId } = data;

  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be logged in'
    );
  }

  const gameRef = db.collection('games').doc(gameId);
  const gameDoc = await gameRef.get();

  if (!gameDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Game not found');
  }

  const game = gameDoc.data();

  // Verify user is creator
  if (game.createdBy !== context.auth.uid) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only creator can start game'
    );
  }

  // Check game status
  if (game.status !== 'lobby') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `Game must be in lobby status (current: ${game.status})`
    );
  }

  // Get players
  const playersSnapshot = await gameRef.collection('players').get();
  const players = playersSnapshot.docs.map((d) => d.data());

  // Check minimum players
  if (players.length < 2) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Need at least 2 players'
    );
  }

  // Check all ready
  const allReady = players.every((p) => p.isReady);
  if (!allReady) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'All players must be ready'
    );
  }

  // Update game status
  await gameRef.update({
    status: 'active',
    currentRound: 1,
    roundState: {
      currentPhase: 'in_progress',
      playersReady: [],
      allPlayersReady: false,
      actionsThisRound: 0,
    },
  });

  return {
    success: true,
    message: `Game ${gameId} started with ${players.length} players`,
  };
});
```

---

## Integration Checklist

When implementing Story #11, follow this checklist:

- [ ] Phase 1: Add joinGame() with validation to gameService.ts
- [ ] Phase 2: Create useGameLobby.ts hook
- [ ] Phase 3a: Create /app/lobby/page.tsx route
- [ ] Phase 3b: Create CreateGameModal component
- [ ] Phase 3c: Create GameListCard component
- [ ] Phase 3d: Create PlayerListComponent (optional)
- [ ] Phase 4: Create startGame() Cloud Function
- [ ] Update /functions/src/index.ts to export startGame
- [ ] Test: Create game → Join game → Ready → Start game
- [ ] Test: Error cases (full game, wrong status, etc.)
- [ ] Update dashboard to link to /lobby
- [ ] Remove hardcoded game creation from dashboard

---

## Expected Test Results

```typescript
// Scenario 1: Create and join game
const gameId = await createGame('Test', user.uid, 2);
await joinGame(gameId, user2.uid, 'Player 2');
// Result: Game in lobby with 2 players

// Scenario 2: Try to join full game
await joinGame(gameId, user3.uid, 'Player 3');
// Result: Error "Game is full"

// Scenario 3: Start game
await startGame(gameId);
// Result: Game.status = 'active', round 1 initialized

// Scenario 4: Real-time updates
const hook = useGameLobby(gameId, user.uid);
// Result: Players list updates in real-time as players join
```

---

**Timeline Estimate:** 6-8 hours of development time

**Dependencies:** Sprint 2 (Turn Management) ✅ - Already completed

**Next Step:** Begin Phase 1 implementation when Sprint 7 is scheduled.

