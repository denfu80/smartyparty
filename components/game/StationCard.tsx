/**
 * StationCard Component - US-020, US-101
 * Displays information about a space station with resource production
 */

'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Coins, Shield } from 'lucide-react';
import { Station, Player } from '@/lib/types/game';
import { RESOURCE_CONFIG } from '@/lib/config/resources';
import { calculateStationPrice } from '@/lib/seeders/stationSeeder';

interface StationCardProps {
  station: Station;
  currentPlayer?: Player;
  onPurchaseClick?: (stationId: string) => void;
  onDetailsClick?: (stationId: string) => void;
  showActions?: boolean;
}

export function StationCard({
  station,
  currentPlayer,
  onPurchaseClick,
  onDetailsClick,
  showActions = true,
}: StationCardProps) {
  const isOwnStation = currentPlayer && station.controlledBy === currentPlayer.id;
  const isNeutral = !station.controlledBy;
  const canPurchase = currentPlayer && !isOwnStation && (isNeutral || station.controlledBy !== currentPlayer.id);
  const purchasePrice = calculateStationPrice(station.strategicValue);
  const hasEnoughCredits = currentPlayer && currentPlayer.credits >= purchasePrice;

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isOwnStation ? 'border-green-500' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {station.name}
              {isOwnStation && (
                <Badge variant="default" className="bg-green-500">
                  Deine Station
                </Badge>
              )}
              {isNeutral && (
                <Badge variant="secondary">
                  Neutral
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              Position: ({station.position.x}, {station.position.y})
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Strategic Value & Defense */}
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-sm">
            <Badge variant="outline">
              Wert: {station.strategicValue}/10
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Shield className="h-4 w-4" />
            <span>Verteidigung: {station.defenseLevel}</span>
          </div>
        </div>

        {/* Owner */}
        {station.controlledBy && !isOwnStation && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Kontrolliert von: <span className="font-medium">{station.controlledBy}</span></span>
          </div>
        )}

        {/* Resource Production */}
        {station.resourceProduction && Object.keys(station.resourceProduction).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Produziert:</h4>
            <div className="space-y-1">
              {Object.entries(station.resourceProduction).map(([resourceType, production]) => {
                const config = RESOURCE_CONFIG[resourceType as keyof typeof RESOURCE_CONFIG];
                return (
                  <div key={resourceType} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <span>{config.icon}</span>
                      <span>{config.name}</span>
                    </span>
                    <Badge variant="secondary">
                      {production.amountPerRound}/Runde
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Purchase Price */}
        {canPurchase && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Coins className="h-4 w-4" />
                <span>Kaufpreis:</span>
              </span>
              <Badge variant={hasEnoughCredits ? 'default' : 'destructive'}>
                {purchasePrice.toLocaleString()} Credits
              </Badge>
            </div>
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="flex gap-2">
          {canPurchase && onPurchaseClick && (
            <Button
              variant={hasEnoughCredits ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => onPurchaseClick(station.id)}
              disabled={!hasEnoughCredits}
            >
              {hasEnoughCredits ? 'Kaufen' : 'Nicht genug Credits'}
            </Button>
          )}
          {onDetailsClick && (
            <Button
              variant="outline"
              className={canPurchase ? 'flex-1' : 'w-full'}
              onClick={() => onDetailsClick(station.id)}
            >
              Details
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
