/**
 * ResourceInventory Component - US-100
 * Displays a player's resource inventory with icons, prices, and capacity
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Coins } from 'lucide-react';
import { RESOURCE_CONFIG, INVENTORY_CAPACITY, ResourceType } from '@/lib/config/resources';
import { Player } from '@/lib/types/game';

interface ResourceInventoryProps {
  player: Player;
  title?: string;
  description?: string;
  showPrices?: boolean;
}

export function ResourceInventory({
  player,
  title = 'Ressourcen-Inventar',
  description = 'Dein aktueller Bestand',
  showPrices = true,
}: ResourceInventoryProps) {
  // Calculate total used capacity
  const totalUsed = Object.values(player.resources).reduce((sum, qty) => sum + qty, 0);
  const capacityPercentage = (totalUsed / INVENTORY_CAPACITY) * 100;

  // Calculate total value
  const totalValue = Object.entries(player.resources).reduce((sum, [type, qty]) => {
    const config = RESOURCE_CONFIG[type as ResourceType];
    return sum + (config?.basePrice || 0) * qty;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resources List */}
        <div className="space-y-2">
          {Object.values(ResourceType).map((resourceType) => {
            const config = RESOURCE_CONFIG[resourceType];
            const quantity = player.resources[resourceType] || 0;
            const value = config.basePrice * quantity;

            return (
              <div
                key={resourceType}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{config.name}</div>
                    {showPrices && (
                      <div className="text-xs text-muted-foreground">
                        {config.basePrice} Credits/Einheit
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="font-mono">
                    {quantity.toLocaleString()}
                  </Badge>
                  {showPrices && quantity > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      ≈ {value.toLocaleString()} Credits
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Capacity Bar */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Lagerkapazität:</span>
            <span className="font-mono">
              {totalUsed.toLocaleString()} / {INVENTORY_CAPACITY.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`h-2.5 rounded-full transition-all ${
                capacityPercentage >= 90
                  ? 'bg-red-500'
                  : capacityPercentage >= 70
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
            />
          </div>
          {capacityPercentage >= 90 && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400">
              ⚠️ Inventar fast voll! Überschuss bei Produktion geht verloren.
            </p>
          )}
        </div>

        {/* Total Value */}
        {showPrices && totalValue > 0 && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm font-medium flex items-center gap-1">
              <Coins className="h-4 w-4" />
              Gesamtwert:
            </span>
            <Badge variant="default">
              {totalValue.toLocaleString()} Credits
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
