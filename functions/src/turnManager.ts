/**
 * Turn Management System - E-004
 * Handles round-based gameplay logic
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Round State Machine States
 * - waiting_for_players: Initial state, waiting for all players to join
 * - in_progress: Round is active, players can submit actions
 * - round_ending: All players ready, processing round end
 * - next_round_starting: Transitioning to next round
 */
type RoundPhase = 'waiting_for_players' | 'in_progress' | 'round_ending' | 'next_round_starting';

interface RoundState {
  currentPhase: RoundPhase;
  playersReady: string[];
  allPlayersReady: boolean;
  actionsThisRound: number;
  nextRoundStartsAt?: admin.firestore.Timestamp;
}

interface PlayerAction {
  id: string;
  gameId: string;
  playerId: string;
  round: number;
  timestamp: admin.firestore.Timestamp;
  type: string;
  data: any;
  status: 'pending' | 'validated' | 'executed' | 'failed';
  validationError?: string;
}

/**
 * Helper: Check if all players in a game are ready
 */
async function checkAllPlayersReady(gameId: string): Promise<boolean> {
  const playersSnapshot = await db
    .collection('games')
    .doc(gameId)
    .collection('players')
    .get();

  if (playersSnapshot.empty) {
    return false;
  }

  const allReady = playersSnapshot.docs.every((doc) => {
    const data = doc.data();
    return data.isReady === true;
  });

  return allReady;
}

/**
 * Helper: Collect all player actions from the current round
 */
async function collectPlayerActions(gameId: string, currentRound: number): Promise<PlayerAction[]> {
  const actionsSnapshot = await db
    .collection('games')
    .doc(gameId)
    .collection('actions')
    .where('round', '==', currentRound)
    .where('status', '==', 'pending')
    .get();

  return actionsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PlayerAction[];
}

/**
 * Helper: Validate actions (Placeholder for Sprint 2)
 * TODO: Implement actual game logic validation in later sprints
 */
async function validateActions(actions: PlayerAction[]): Promise<PlayerAction[]> {
  // Placeholder validation - just check format
  return actions.map((action) => {
    if (!action.type || !action.playerId) {
      return {
        ...action,
        status: 'failed' as const,
        validationError: 'Invalid action format',
      };
    }
    return {
      ...action,
      status: 'validated' as const,
    };
  });
}

/**
 * Helper: Execute validated actions (Placeholder for Sprint 2)
 * TODO: Implement actual game state changes in later sprints
 */
async function executeActions(gameId: string, actions: PlayerAction[]): Promise<void> {
  // Placeholder - just mark actions as executed
  const batch = db.batch();

  actions.forEach((action) => {
    if (action.status === 'validated') {
      const actionRef = db
        .collection('games')
        .doc(gameId)
        .collection('actions')
        .doc(action.id);

      batch.update(actionRef, {
        status: 'executed',
        executedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });

  await batch.commit();
  functions.logger.info(`Executed ${actions.length} actions for game ${gameId}`);
}

/**
 * Helper: Start next round
 */
async function startNextRound(gameId: string): Promise<void> {
  const gameRef = db.collection('games').doc(gameId);

  await gameRef.update({
    currentRound: admin.firestore.FieldValue.increment(1),
    'roundState.currentPhase': 'in_progress',
    'roundState.playersReady': [],
    'roundState.allPlayersReady': false,
    'roundState.actionsThisRound': 0,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Reset all players to not ready
  const playersSnapshot = await gameRef.collection('players').get();
  const batch = db.batch();

  playersSnapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {
      isReady: false,
    });
  });

  await batch.commit();

  functions.logger.info(`Started next round for game ${gameId}`);
}

/**
 * Firestore Trigger: onPlayerReady
 * Triggered when a player updates their ready status
 */
export const onPlayerReady = functions.firestore
  .document('games/{gameId}/players/{playerId}')
  .onWrite(async (change, context) => {
    const gameId = context.params.gameId;
    const after = change.after.data();

    // Only proceed if player is now ready
    if (!after || !after.isReady) {
      return;
    }

    functions.logger.info(`Player ${context.params.playerId} marked ready in game ${gameId}`);

    // Use transaction to avoid race conditions
    const gameRef = db.collection('games').doc(gameId);

    try {
      await db.runTransaction(async (transaction) => {
        const gameDoc = await transaction.get(gameRef);

        if (!gameDoc.exists) {
          throw new Error(`Game ${gameId} not found`);
        }

        const game = gameDoc.data()!;
        const roundState = game.roundState as RoundState;

        // Only process if we're in 'in_progress' state
        if (roundState.currentPhase !== 'in_progress') {
          functions.logger.info(`Game ${gameId} not in progress, skipping`);
          return;
        }

        // Check if all players are ready
        const allReady = await checkAllPlayersReady(gameId);

        if (allReady) {
          functions.logger.info(`All players ready in game ${gameId}, ending round`);

          // Transition to round_ending
          transaction.update(gameRef, {
            'roundState.allPlayersReady': true,
            'roundState.currentPhase': 'round_ending',
          });
        }
      });

      // After transaction, check if we need to process round end
      const gameDoc = await gameRef.get();
      const game = gameDoc.data()!;

      if (game.roundState.currentPhase === 'round_ending') {
        // Trigger round end processing
        await processRoundEndLogic(gameId, game.currentRound);
      }
    } catch (error) {
      functions.logger.error(`Error in onPlayerReady for game ${gameId}:`, error);
      throw error;
    }
  });

/**
 * Internal: Process round end logic
 */
async function processRoundEndLogic(gameId: string, currentRound: number): Promise<void> {
  const gameRef = db.collection('games').doc(gameId);

  try {
    functions.logger.info(`Processing round end for game ${gameId}, round ${currentRound}`);

    // 1. Collect all player actions
    const actions = await collectPlayerActions(gameId, currentRound);
    functions.logger.info(`Collected ${actions.length} actions`);

    // 2. Validate actions
    const validatedActions = await validateActions(actions);
    functions.logger.info(`Validated ${validatedActions.length} actions`);

    // 3. Execute actions
    await executeActions(gameId, validatedActions);

    // 4. Transition to next_round_starting
    await gameRef.update({
      'roundState.currentPhase': 'next_round_starting',
    });

    // 5. Start next round
    await startNextRound(gameId);

    functions.logger.info(`Successfully completed round ${currentRound} for game ${gameId}`);
  } catch (error) {
    functions.logger.error(`Error processing round end for game ${gameId}:`, error);

    // Rollback to in_progress on error
    await gameRef.update({
      'roundState.currentPhase': 'in_progress',
      'roundState.allPlayersReady': false,
    });

    throw error;
  }
}

/**
 * Callable Function: processRoundEnd
 * Manually trigger round end processing (for testing/admin purposes)
 */
export const processRoundEnd = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to process round end'
    );
  }

  const { gameId } = data;

  if (!gameId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'gameId is required'
    );
  }

  // Verify user is part of the game
  const gameRef = db.collection('games').doc(gameId);
  const gameDoc = await gameRef.get();

  if (!gameDoc.exists) {
    throw new functions.https.HttpsError(
      'not-found',
      `Game ${gameId} not found`
    );
  }

  const game = gameDoc.data()!;

  // Check if user is a player in this game
  const playerDoc = await gameRef
    .collection('players')
    .doc(context.auth.uid)
    .get();

  if (!playerDoc.exists) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'User is not a player in this game'
    );
  }

  // Process round end
  try {
    await processRoundEndLogic(gameId, game.currentRound);

    return {
      success: true,
      message: `Round ${game.currentRound} processed successfully`,
      newRound: game.currentRound + 1,
    };
  } catch (error) {
    functions.logger.error(`Error in processRoundEnd callable:`, error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to process round end'
    );
  }
});
