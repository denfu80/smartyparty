/**
 * NPC Configuration - Story #2
 * Defines NPCs for the game
 */

import { NPC } from '@/lib/types/game';

/**
 * Händler Marcus - The greedy merchant
 * Story #2: First NPC implementation
 */
export const MARCUS: NPC = {
  id: 'npc-marcus',
  name: 'Händler Marcus',
  personality: ['gierig', 'geschäftstüchtig'],
  greeting: 'Was willst du? Ich hab keine Zeit.',
  description: 'Ein gieriger Händler, der immer auf seinen Vorteil bedacht ist.',
};

/**
 * All available NPCs
 * Quick & Dirty: Only Marcus for now, more NPCs in Story #14
 */
export const NPCS: Record<string, NPC> = {
  marcus: MARCUS,
};

/**
 * Get NPC by ID
 */
export function getNpcById(id: string): NPC | undefined {
  return Object.values(NPCS).find((npc) => npc.id === id);
}
