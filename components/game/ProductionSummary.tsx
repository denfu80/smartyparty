/**
 * ProductionSummary Component - US-102
 * Displays a preview of resource production for the next round
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Station, Player } from '@/lib/types/game';
import { RESOURCE_CONFIG, INVENTORY_CAPACITY, ResourceType } from '@/lib/config/resources';

interface ProductionSummaryProps {
  player: Player;
  stations: Station[];
  title?: string;
}

/**
 * Calculate production preview for controlled stations
 */
function calculateProductionPreview(
  player: Player,
  stations: Station[]
): Record<ResourceType, number> {
  const production: Partial<Record<ResourceType, number>> = {};

  // Filter stations controlled by this player
  const controlledStations = stations.filter(
    (station) => station.controlledBy === player.id
  );

  // Sum up production from all controlled stations
  controlledStations.forEach((station) => {
    if (station.resourceProduction) {
      Object.entries(station.resourceProduction).forEach(([resourceType, prod]) => {
        const type = resourceType as ResourceType;
        if (!production[type]) {
          production[type] = 0;
        }
        production[type]! += prod.amountPerRound;
      });
    }
  });

  return production as Record<ResourceType, number>;
}

export function ProductionSummary({
  player,
  stations,
  title = 'Nächste Runde',
}: ProductionSummaryProps) {
  const productionPreview = calculateProductionPreview(player, stations);
  const totalProduction = Object.values(productionPreview).reduce((sum, qty) => sum + qty, 0);

  // Calculate capacity warning
  const currentTotal = Object.values(player.resources).reduce((sum, qty) => sum + qty, 0);
  const afterProduction = currentTotal + totalProduction;
  const willOverflow = afterProduction > INVENTORY_CAPACITY;
  const willBeNearCapacity = afterProduction > INVENTORY_CAPACITY * 0.9;

  // No production to show
  if (totalProduction === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>Produktionsvorschau</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Keine Ressourcenproduktion. Erobere Stationen, um Ressourcen zu produzieren!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Produktionsvorschau ({totalProduction} Einheiten gesamt)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Production Preview */}
        <div className="space-y-2">
          {Object.entries(productionPreview)
            .filter(([, amount]) => amount > 0)
            .map(([resourceType, amount]) => {
              const config = RESOURCE_CONFIG[resourceType as ResourceType];
              const value = config.basePrice * amount;

              return (
                <div
                  key={resourceType}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{config.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{config.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ≈ {value.toLocaleString()} Credits
                      </div>
                    </div>
                  </div>
                  <Badge variant="default" className="font-mono">
                    +{amount.toLocaleString()}
                  </Badge>
                </div>
              );
            })}
        </div>

        {/* Capacity Warning */}
        {(willOverflow || willBeNearCapacity) && (
          <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              willOverflow
                ? 'bg-red-500/10 border-red-500/50'
                : 'bg-yellow-500/10 border-yellow-500/50'
            }`}
          >
            <AlertTriangle
              className={`h-5 w-5 mt-0.5 ${
                willOverflow ? 'text-red-500' : 'text-yellow-500'
              }`}
            />
            <div className="flex-1 text-sm">
              {willOverflow ? (
                <>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    Inventar wird überlaufen!
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Nach Produktion: {afterProduction.toLocaleString()} /{' '}
                    {INVENTORY_CAPACITY.toLocaleString()} Einheiten. Überschuss geht
                    verloren. Erweitere Lagerkapazität oder verkaufe Ressourcen.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-yellow-600 dark:text-yellow-400">
                    Inventar wird fast voll sein
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Nach Produktion: {afterProduction.toLocaleString()} /{' '}
                    {INVENTORY_CAPACITY.toLocaleString()} Einheiten (
                    {Math.round((afterProduction / INVENTORY_CAPACITY) * 100)}%)
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="pt-2 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Aktuell:</span>
            <span className="font-mono">{currentTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Produktion:</span>
            <span className="font-mono text-green-600">
              +{totalProduction.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Nach Runde:</span>
            <span className="font-mono">
              {Math.min(afterProduction, INVENTORY_CAPACITY).toLocaleString()} /{' '}
              {INVENTORY_CAPACITY.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
