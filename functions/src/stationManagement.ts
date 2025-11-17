/**
 * Station Management Functions - US-020
 * Handles station purchase and control
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface Station {
  id: string;
  gameId: string;
  name: string;
  controlledBy?: string;
  strategicValue: number;
  position: { x: number; y: number };
  defenseLevel: number;
  resourceProduction?: Record<string, { amountPerRound: number; currentStock: number }>;
}

interface Player {
  id: string;
  userId: string;
  gameId: string;
  displayName: string;
  credits: number;
  resources: Record<string, number>;
  controlledStations: string[];
  isReady: boolean;
}

/**
 * Calculate station purchase price
 */
function calculateStationPrice(strategicValue: number): number {
  return strategicValue * 1000;
}

/**
 * Callable Function: purchaseStation
 * Allows a player to purchase a station
 */
export const purchaseStation = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to purchase stations'
    );
  }

  const { gameId, stationId } = data;

  if (!gameId || !stationId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'gameId and stationId are required'
    );
  }

  const playerId = context.auth.uid;

  try {
    // Use transaction to ensure atomicity
    const result = await db.runTransaction(async (transaction) => {
      const gameRef = db.collection('games').doc(gameId);
      const playerRef = gameRef.collection('players').doc(playerId);
      const stationRef = gameRef.collection('stations').doc(stationId);

      // Get player and station data
      const [playerDoc, stationDoc] = await Promise.all([
        transaction.get(playerRef),
        transaction.get(stationRef)
      ]);

      if (!playerDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'Player not found in this game'
        );
      }

      if (!stationDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'Station not found'
        );
      }

      const player = playerDoc.data() as Player;
      const station = stationDoc.data() as Station;

      // Validate purchase
      if (station.controlledBy === playerId) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'You already control this station'
        );
      }

      const price = calculateStationPrice(station.strategicValue);

      if (player.credits < price) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          `Not enough credits. Required: ${price}, Available: ${player.credits}`
        );
      }

      // Update player
      const newCredits = player.credits - price;
      const newControlledStations = [...(player.controlledStations || []), stationId];

      transaction.update(playerRef, {
        credits: newCredits,
        controlledStations: newControlledStations,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Update station
      transaction.update(stationRef, {
        controlledBy: playerId
      });

      functions.logger.info(
        `Player ${playerId} purchased station ${stationId} for ${price} credits`
      );

      return {
        success: true,
        newCredits,
        stationName: station.name,
        price
      };
    });

    return result;
  } catch (error) {
    functions.logger.error('Error in purchaseStation:', error);

    // Re-throw HttpsErrors as-is
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      'Failed to purchase station'
    );
  }
});
