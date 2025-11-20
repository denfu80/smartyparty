'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GameLayout } from '@/components/layout/GameLayout';
import { useAuth } from '@/lib/hooks/useAuth';
import { getGame } from '@/lib/services/gameService';
import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { Game, Player } from '@/lib/types/game';

export default function TradePage() {
  const pathname = usePathname();
  const gameId = pathname.split('/game/')[1]?.split('/')[0] || '';
  const { user } = useAuth();

  const [game, setGame] = useState<Game | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId || !user) return;

    const loadData = async () => {
      try {
        const gameData = await getGame(gameId);
        setGame(gameData);

        const playersRef = collection(db, 'games', gameId, 'players');
        const playerQuery = query(playersRef, where('userId', '==', user.uid));
        const playerSnapshot = await getDocs(playerQuery);

        if (!playerSnapshot.empty) {
          setPlayer({ id: playerSnapshot.docs[0].id, ...playerSnapshot.docs[0].data() } as Player);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading game data:', err);
        setLoading(false);
      }
    };

    loadData();
  }, [gameId, user]);

  if (loading) {
    return (
      <GameLayout gameId={gameId}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      gameId={gameId}
      playerStats={player ? {
        credits: player.credits,
        influence: player.influence,
        reputation: 0,
      } : undefined}
    >
      <div className="space-y-6">
        <div className="bg-card border rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">Handel</h1>
          <p className="text-muted-foreground">
            Handelsseite wird bald verfügbar sein.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Geplante Features:</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Ressourcen kaufen und verkaufen</li>
            <li>Handelsrouten etablieren</li>
            <li>Preise zwischen Stationen vergleichen</li>
            <li>Handelsverträge mit NPCs abschließen</li>
          </ul>
        </div>
      </div>
    </GameLayout>
  );
}
