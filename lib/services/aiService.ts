/**
 * AI Service (Frontend)
 * Calls Cloud Functions for AI-powered content generation
 */

import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase/config';

export interface NpcDialogResponse {
  dialog: string;
  cached: boolean;
}

export interface BackstoryResponse {
  backstory: string;
  modifiers: {
    startingCredits: number;
    reputation: Record<string, number>;
  };
}

export interface GameEventResponse {
  id: string;
  title: string;
  description: string;
  effects: {
    resources: Record<string, number>;
    reputation: Record<string, number>;
  };
}

/**
 * Generate NPC dialog using AI
 */
export async function generateNpcDialog(
  gameId: string,
  npcId: string,
  playerId: string,
  context: string
): Promise<NpcDialogResponse> {
  const generateNpcDialogFn = httpsCallable<
    { gameId: string; npcId: string; playerId: string; contextString: string },
    NpcDialogResponse
  >(functions, 'generateNpcDialog');

  const result = await generateNpcDialogFn({
    gameId,
    npcId,
    playerId,
    contextString: context,
  });

  return result.data;
}

/**
 * Generate player backstory using AI
 */
export async function generateBackstory(
  preferences: Record<string, any>
): Promise<BackstoryResponse> {
  const generateBackstoryFn = httpsCallable<
    { preferences: Record<string, any> },
    BackstoryResponse
  >(functions, 'generateBackstory');

  const result = await generateBackstoryFn({ preferences });

  return result.data;
}

/**
 * Generate dynamic game event using AI
 */
export async function generateGameEvent(
  gameId: string,
  eventType: string,
  eventContext: string
): Promise<GameEventResponse> {
  const generateGameEventFn = httpsCallable<
    { gameId: string; eventType: string; eventContext: string },
    GameEventResponse
  >(functions, 'generateGameEvent');

  const result = await generateGameEventFn({
    gameId,
    eventType,
    eventContext,
  });

  return result.data;
}
