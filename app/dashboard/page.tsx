'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGame, listGames, getGame } from '@/lib/services/gameService';
import { useAuth } from '@/lib/hooks/useAuth';
import type { Game } from '@/lib/types/game';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadGames();
    }
  }, [user]);

  async function loadGames() {
    try {
      setLoading(true);
      const gamesList = await listGames();
      setGames(gamesList);
      setError(null);
    } catch (err) {
      console.error('Error loading games:', err);
      setError('Fehler beim Laden der Spiele');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateGame() {
    if (!user) {
      alert('Du musst eingeloggt sein, um ein Spiel zu erstellen');
      return;
    }

    try {
      const gameId = await createGame('Test Game', user.uid, 4);
      console.log('Game created with ID:', gameId);

      // Navigate to the game page
      router.push(`/game/${gameId}`);
    } catch (err) {
      console.error('Error creating game:', err);
      alert('Fehler beim Erstellen des Spiels');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Meine Spiele</h2>
          {loading ? (
            <p className="text-muted-foreground">Laden...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : games.length === 0 ? (
            <>
              <p className="text-muted-foreground mb-4">
                Keine aktiven Spiele
              </p>
              <p className="text-sm text-muted-foreground">
                Erstelle ein neues Spiel um zu starten
              </p>
            </>
          ) : (
            <div className="space-y-2">
              {games.map((game) => (
                <div key={game.id} className="p-3 border rounded bg-accent/50">
                  <div className="font-semibold">{game.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Status: {game.status} | Runde: {game.currentRound}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Statistiken</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Spiele gespielt:</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Spiele gewonnen:</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Spiele gesamt:</span>
              <span className="font-semibold">{games.length}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Schnellstart</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Bereit loszulegen?
          </p>
          <div className="space-y-2">
            <button
              onClick={handleCreateGame}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Neues Spiel
            </button>
            <button className="w-full px-4 py-2 border rounded-md hover:bg-accent">
              Spiel beitreten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
