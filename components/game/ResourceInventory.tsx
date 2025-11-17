/**
 * ResourceInventory Component
 * Displays a player's resource inventory
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

interface ResourceInventoryProps {
  resources: Record<string, number>;
  title?: string;
  description?: string;
}

export function ResourceInventory({
  resources,
  title = 'Ressourcen',
  description = 'Dein aktueller Bestand',
}: ResourceInventoryProps) {
  const resourceEntries = Object.entries(resources);

  if (resourceEntries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Keine Ressourcen vorhanden
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {resourceEntries.map(([resourceName, amount]) => (
            <div
              key={resourceName}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <span className="text-sm font-medium capitalize">
                {resourceName}
              </span>
              <Badge variant="secondary">
                {amount.toLocaleString()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
