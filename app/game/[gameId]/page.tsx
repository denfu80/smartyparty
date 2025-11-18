'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GameLayout } from '@/components/layout/GameLayout';
import { ResourceInventory } from '@/components/game/ResourceInventory';
import { ProductionSummary } from '@/components/game/ProductionSummary';
import { GameMap } from '@/components/game/GameMap';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRoundState } from '@/lib/hooks/useRoundState';
import { getGame, addPlayerToGame } from '@/lib/services/gameService';
import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import type { Game, Player, Station } from '@/lib/types/game';

// For static export: This page is client-side only, no pre-rendering needed
export function generateStaticParams() {
  return [];
}

export default function GamePage() {
  const params = useParams();
  const gameId = params?.gameId as string;
  const { user } = useAuth();

  const [game, setGame] = useState<Game | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentRound } = useRoundState(gameId);

  // Load game data
  useEffect(() => {
    if (!gameId || !user) return;

    const loadGameData = async () => {
      try {
        setLoading(true);

        // Load game
        const gameData = await getGame(gameId);
        if (!gameData) {
          setError('Spiel nicht gefunden');
          setLoading(false);
          return;
        }
        setGame(gameData);

        // Check if player exists in this game
        const playersRef = collection(db, 'games', gameId, 'players');
        const playerQuery = query(playersRef, where('userId', '==', user.uid));
        const playerSnapshot = await getDocs(playerQuery);

        if (playerSnapshot.empty) {
          // Add player to game
          console.log('Adding player to game...');
          await addPlayerToGame(gameId, user.uid, user.displayName || 'Player');

          // Reload player data
          const newPlayerSnapshot = await getDocs(playerQuery);
          if (!newPlayerSnapshot.empty) {
            setPlayer({ id: newPlayerSnapshot.docs[0].id, ...newPlayerSnapshot.docs[0].data() } as Player);
          }
        } else {
          setPlayer({ id: playerSnapshot.docs[0].id, ...playerSnapshot.docs[0].data() } as Player);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading game data:', err);
        setError('Fehler beim Laden des Spiels');
        setLoading(false);
      }
    };

    loadGameData();
  }, [gameId, user]);

  // Subscribe to player changes
  useEffect(() => {
    if (!gameId || !user) return;

    const playersRef = collection(db, 'games', gameId, 'players');
    const playerQuery = query(playersRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(playerQuery, (snapshot) => {
      if (!snapshot.empty) {
        setPlayer({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Player);
      }
    });

    return () => unsubscribe();
  }, [gameId, user]);

  // Subscribe to stations
  useEffect(() => {
    if (!gameId) return;

    const stationsRef = collection(db, 'games', gameId, 'stations');

    const unsubscribe = onSnapshot(stationsRef, (snapshot) => {
      const stationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Station));
      setStations(stationsData);
    });

    return () => unsubscribe();
  }, [gameId]);

  if (loading) {
    return (
      <GameLayout gameId={gameId}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Lade Spiel...</p>
          </div>
        </div>
      </GameLayout>
    );
  }

  if (error || !game || !player) {
    return (
      <GameLayout gameId={gameId}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Spiel nicht gefunden'}</p>
            <a href="/dashboard" className="text-primary hover:underline">
              Zurück zum Dashboard
            </a>
          </div>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      gameId={gameId}
      playerStats={{
        credits: player.credits,
        influence: player.influence,
        reputation: 0, // TODO: Implement reputation
      }}
    >
      <div className="space-y-6">
        {/* Game Header */}
        <div className="bg-card border rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Runde: {currentRound}</span>
            <span>Status: {game.status}</span>
            <span>Spieler: {player.displayName}</span>
          </div>
        </div>

        {/* Game Map */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Karte</h2>
          <GameMap
            stations={stations}
            currentPlayer={player}
          />
        </div>

        {/* Resources */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Ressourcen</h2>
          <ResourceInventory player={player} />
        </div>

        {/* Production */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Produktion</h2>
          <ProductionSummary
            player={player}
            stations={stations}
          />
        </div>
      </div>
    </GameLayout>
  );
}
