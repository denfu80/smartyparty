/**
 * Resource System Configuration - US-100
 * Defines resource types, base prices, and inventory limits
 */

export enum ResourceType {
  METALS = 'metals',
  ENERGY = 'energy',
  FOOD = 'food',
  COMPONENTS = 'components',
  LUXURY_GOODS = 'luxury_goods'
}

export interface ResourceConfig {
  name: string;
  icon: string;
  basePrice: number;
  description: string;
}

export const RESOURCE_CONFIG: Record<ResourceType, ResourceConfig> = {
  [ResourceType.METALS]: {
    name: 'Metalle',
    icon: '⚙️',
    basePrice: 50,
    description: 'Grundlegendes Baumaterial für Schiffe und Stationen'
  },
  [ResourceType.ENERGY]: {
    name: 'Energie',
    icon: '⚡',
    basePrice: 30,
    description: 'Treibstoff für Schiffe und Stationen'
  },
  [ResourceType.FOOD]: {
    name: 'Nahrung',
    icon: '🌾',
    basePrice: 20,
    description: 'Lebenserhaltung für Crews'
  },
  [ResourceType.COMPONENTS]: {
    name: 'Komponenten',
    icon: '🔧',
    basePrice: 100,
    description: 'Elektronik und High-Tech-Bauteile'
  },
  [ResourceType.LUXURY_GOODS]: {
    name: 'Luxusgüter',
    icon: '💎',
    basePrice: 200,
    description: 'Seltene und wertvolle Handelswaren'
  }
};

// Inventory capacity limit
export const INVENTORY_CAPACITY = 500;

// Initial resources for new players
export const INITIAL_RESOURCES: Record<ResourceType, number> = {
  [ResourceType.METALS]: 10,
  [ResourceType.ENERGY]: 20,
  [ResourceType.FOOD]: 30,
  [ResourceType.COMPONENTS]: 5,
  [ResourceType.LUXURY_GOODS]: 0
};
