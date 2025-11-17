/**
 * Cloud Functions for Sternenhaus/SmartParty
 * Sprint 2: Game Engine Basics
 * Sprint 3: Resource & Economy Foundation
 */

import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Export all functions
export { onPlayerReady, processRoundEnd } from './turnManager';
export { generateNpcDialog, generateBackstory, generateGameEvent } from './aiService';
export { purchaseStation } from './stationManagement';
