/**
 * StationCard Component
 * Displays information about a space station
 */

'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, User } from 'lucide-react';

export interface Station {
  id: string;
  name: string;
  sectorId: string;
  controlledBy?: string;
  type?: 'trade' | 'military' | 'research' | 'mining';
  level?: number;
}

interface StationCardProps {
  station: Station;
  onDetailsClick?: (stationId: string) => void;
  showActions?: boolean;
}

export function StationCard({
  station,
  onDetailsClick,
  showActions = true,
}: StationCardProps) {
  const getStationTypeColor = (type?: string) => {
    switch (type) {
      case 'trade':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'military':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'research':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'mining':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStationTypeLabel = (type?: string) => {
    switch (type) {
      case 'trade':
        return 'Handelsstation';
      case 'military':
        return 'Militärbasis';
      case 'research':
        return 'Forschungsstation';
      case 'mining':
        return 'Minenstation';
      default:
        return 'Station';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {station.name}
              {station.level && (
                <Badge variant="outline" className="ml-2">
                  Lvl {station.level}
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              Sektor {station.sectorId}
            </CardDescription>
          </div>
          {station.type && (
            <Badge className={getStationTypeColor(station.type)}>
              {getStationTypeLabel(station.type)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {station.controlledBy && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Kontrolliert von: <span className="font-medium">{station.controlledBy}</span></span>
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onDetailsClick?.(station.id)}
          >
            Details anzeigen
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
