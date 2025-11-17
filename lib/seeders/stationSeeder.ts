/**
 * Station Seeding Configuration - US-020, US-101
 * Predefined stations and resource distributions for game initialization
 */

import { ResourceType } from '@/lib/config/resources';
import { Station, ResourceProduction } from '@/lib/types/game';

interface StationTemplate {
  id: string;
  name: string;
  position: { x: number; y: number };
  strategicValue: number;
  resourceProduction: Partial<Record<ResourceType, Omit<ResourceProduction, 'currentStock'>>>;
}

// Predefined stations with resource distributions (US-101)
export const STATION_TEMPLATES: StationTemplate[] = [
  {
    id: 'station-1',
    name: 'Alpha Station',
    position: { x: 2, y: 2 },
    strategicValue: 5,
    resourceProduction: {
      [ResourceType.METALS]: { amountPerRound: 10 },
      [ResourceType.ENERGY]: { amountPerRound: 5 }
    }
  },
  {
    id: 'station-2',
    name: 'Beta Outpost',
    position: { x: 5, y: 1 },
    strategicValue: 3,
    resourceProduction: {
      [ResourceType.FOOD]: { amountPerRound: 15 }
    }
  },
  {
    id: 'station-3',
    name: 'Gamma Hub',
    position: { x: 7, y: 4 },
    strategicValue: 7,
    resourceProduction: {
      [ResourceType.COMPONENTS]: { amountPerRound: 8 },
      [ResourceType.METALS]: { amountPerRound: 5 }
    }
  },
  {
    id: 'station-4',
    name: 'Delta Station',
    position: { x: 3, y: 6 },
    strategicValue: 4,
    resourceProduction: {
      [ResourceType.ENERGY]: { amountPerRound: 10 },
      [ResourceType.FOOD]: { amountPerRound: 8 }
    }
  },
  {
    id: 'station-5',
    name: 'Epsilon Base',
    position: { x: 8, y: 7 },
    strategicValue: 6,
    resourceProduction: {
      [ResourceType.METALS]: { amountPerRound: 12 },
      [ResourceType.COMPONENTS]: { amountPerRound: 6 }
    }
  },
  {
    id: 'station-6',
    name: 'Zeta Mining',
    position: { x: 1, y: 8 },
    strategicValue: 8,
    resourceProduction: {
      [ResourceType.LUXURY_GOODS]: { amountPerRound: 3 }, // RARE!
      [ResourceType.METALS]: { amountPerRound: 8 }
    }
  },
  {
    id: 'station-7',
    name: 'Eta Trade Post',
    position: { x: 6, y: 5 },
    strategicValue: 5,
    resourceProduction: {
      [ResourceType.FOOD]: { amountPerRound: 12 },
      [ResourceType.ENERGY]: { amountPerRound: 8 }
    }
  },
  {
    id: 'station-8',
    name: 'Theta Research',
    position: { x: 4, y: 3 },
    strategicValue: 9,
    resourceProduction: {
      [ResourceType.COMPONENTS]: { amountPerRound: 10 },
      [ResourceType.LUXURY_GOODS]: { amountPerRound: 2 } // RARE!
    }
  }
];

/**
 * Create stations for a new game
 * @param gameId - The game ID to create stations for
 * @param firstPlayerId - The ID of the first player (gets station-1)
 * @returns Array of stations ready to be written to Firestore
 */
export function createGameStations(gameId: string, firstPlayerId?: string): Station[] {
  return STATION_TEMPLATES.map((template, index) => {
    // Convert template production to full ResourceProduction with currentStock
    const resourceProduction: Record<ResourceType, ResourceProduction> = {} as any;

    if (template.resourceProduction) {
      for (const [resourceType, prod] of Object.entries(template.resourceProduction)) {
        resourceProduction[resourceType as ResourceType] = {
          amountPerRound: prod.amountPerRound,
          currentStock: 0
        };
      }
    }

    return {
      id: template.id,
      gameId,
      name: template.name,
      position: template.position,
      strategicValue: template.strategicValue,
      defenseLevel: 1, // Default defense level
      // First station (Alpha) is controlled by first player, others are neutral
      controlledBy: index === 0 && firstPlayerId ? firstPlayerId : undefined,
      resourceProduction: Object.keys(resourceProduction).length > 0 ? resourceProduction : undefined
    };
  });
}

/**
 * Calculate station purchase price
 * @param strategicValue - Strategic value of the station (1-10)
 * @returns Purchase price in credits
 */
export function calculateStationPrice(strategicValue: number): number {
  return strategicValue * 1000;
}
