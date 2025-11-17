/**
 * RoundControl Component
 * Controls for managing round state (ready button, round display)
 */

'use client';

import { useState } from 'react';
import { markPlayerReady } from '@/lib/services/gameService';
import { useRoundState } from '@/lib/hooks/useRoundState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, Circle } from 'lucide-react';

interface RoundControlProps {
  gameId: string;
  playerId: string;
  playerList?: Array<{ id: string; name: string }>;
}

export function RoundControl({ gameId, playerId, playerList = [] }: RoundControlProps) {
  const { currentRound, roundPhase, playersReady, isAllReady, loading } = useRoundState(gameId);
  const [isMarking, setIsMarking] = useState(false);

  const isPlayerReady = playersReady.includes(playerId);

  const handleMarkReady = async () => {
    try {
      setIsMarking(true);
      await markPlayerReady(gameId, playerId);
    } catch (error) {
      console.error('Failed to mark ready:', error);
    } finally {
      setIsMarking(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const getPhaseLabel = (phase: string | null) => {
    switch (phase) {
      case 'waiting_for_players':
        return 'Warte auf Spieler...';
      case 'in_progress':
        return 'Runde läuft';
      case 'round_ending':
        return 'Runde wird beendet...';
      case 'next_round_starting':
        return 'Neue Runde startet...';
      default:
        return 'Unbekannt';
    }
  };

  const getPhaseColor = (phase: string | null) => {
    switch (phase) {
      case 'in_progress':
        return 'bg-green-500';
      case 'round_ending':
      case 'next_round_starting':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Runde {currentRound}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${getPhaseColor(roundPhase)}`} />
              {getPhaseLabel(roundPhase)}
            </CardDescription>
          </div>
          {roundPhase === 'in_progress' && !isPlayerReady && (
            <Button
              onClick={handleMarkReady}
              disabled={isMarking}
              size="sm"
            >
              {isMarking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Runde beenden
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {roundPhase === 'round_ending' && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Warte auf andere Spieler...
            </p>
          </div>
        )}

        {playerList.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Spielerstatus:</h4>
            <div className="space-y-1">
              {playerList.map((player) => {
                const isReady = playersReady.includes(player.id);
                return (
                  <div
                    key={player.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{player.name}</span>
                    {isReady ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Bereit
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1">
                        <Circle className="h-3 w-3" />
                        Wartet
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isAllReady && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <p className="text-sm text-green-800 dark:text-green-200">
              Alle Spieler bereit! Runde wird verarbeitet...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
