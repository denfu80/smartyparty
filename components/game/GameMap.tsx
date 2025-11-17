/**
 * GameMap Component - US-020
 * Displays an 8x8 grid map with stations
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Station, Player } from '@/lib/types/game';
import { RESOURCE_CONFIG } from '@/lib/config/resources';
import { MapPin } from 'lucide-react';

interface GameMapProps {
  stations: Station[];
  currentPlayer?: Player;
  onStationClick?: (station: Station) => void;
}

export function GameMap({ stations, currentPlayer, onStationClick }: GameMapProps) {
  const GRID_SIZE = 8;

  // Create a 2D array for the grid
  const grid: (Station | null)[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));

  // Place stations on the grid
  stations.forEach((station) => {
    const { x, y } = station.position;
    if (x >= 1 && x <= GRID_SIZE && y >= 1 && y <= GRID_SIZE) {
      grid[y - 1][x - 1] = station;
    }
  });

  const getStationColor = (station: Station): string => {
    if (!station.controlledBy) {
      return 'bg-gray-500/20 border-gray-500 hover:bg-gray-500/30';
    }
    if (currentPlayer && station.controlledBy === currentPlayer.id) {
      return 'bg-green-500/20 border-green-500 hover:bg-green-500/30';
    }
    return 'bg-red-500/20 border-red-500 hover:bg-red-500/30';
  };

  const getResourceIcons = (station: Station): string => {
    if (!station.resourceProduction) return '';

    return Object.keys(station.resourceProduction)
      .map((resourceType) => RESOURCE_CONFIG[resourceType as keyof typeof RESOURCE_CONFIG]?.icon || '')
      .filter(Boolean)
      .join('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Sternenkarte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-1 aspect-square">
          {grid.map((row, rowIndex) =>
            row.map((station, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  relative border-2 rounded-lg flex items-center justify-center
                  transition-all cursor-pointer
                  ${station ? getStationColor(station) : 'bg-gray-900/50 border-gray-800'}
                `}
                onClick={() => station && onStationClick?.(station)}
              >
                {station ? (
                  <div className="flex flex-col items-center justify-center p-1 text-center">
                    <div className="text-xs font-bold truncate w-full">
                      {station.name.split(' ')[0]}
                    </div>
                    <div className="text-xs opacity-70">
                      {getResourceIcons(station)}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700 text-xs">
                    {colIndex + 1},{rowIndex + 1}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500/20 border-2 border-green-500" />
            <span>Deine Stationen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500/20 border-2 border-red-500" />
            <span>Gegner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-500/20 border-2 border-gray-500" />
            <span>Neutral</span>
          </div>
        </div>

        {/* Station Count */}
        <div className="mt-4 flex gap-4 justify-center">
          <Badge variant="outline">
            Kontrollierte Stationen: {stations.filter(s => currentPlayer && s.controlledBy === currentPlayer.id).length}
          </Badge>
          <Badge variant="outline">
            Gesamt: {stations.length}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
