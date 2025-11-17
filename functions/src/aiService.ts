/**
 * AI Integration Foundation - E-005
 * Handles AI-powered content generation using Google Gemini
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as crypto from 'crypto';

const db = admin.firestore();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || functions.config().gemini?.api_key || ''
);

/**
 * AI Cache Entry Interface
 */
interface AICacheEntry {
  id: string;
  prompt: string;
  response: string;
  model: string;
  createdAt: admin.firestore.Timestamp;
  expiresAt: admin.firestore.Timestamp;
  hitCount: number;
  lastUsedAt: admin.firestore.Timestamp;
}

/**
 * Rate limiting state (in-memory, per function instance)
 */
const rateLimitMap = new Map<string, number[]>();

/**
 * Helper: Generate cache key from input
 */
function generateCacheKey(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Helper: Check AI response cache
 */
async function checkAICache(cacheKey: string): Promise<string | null> {
  try {
    const cacheRef = db.collection('ai-cache').doc(cacheKey);
    const cacheDoc = await cacheRef.get();

    if (!cacheDoc.exists) {
      functions.logger.info(`Cache MISS: ${cacheKey}`);
      return null;
    }

    const cache = cacheDoc.data() as AICacheEntry;

    // Check if expired
    const now = admin.firestore.Timestamp.now();
    if (cache.expiresAt.toMillis() < now.toMillis()) {
      functions.logger.info(`Cache EXPIRED: ${cacheKey}`);
      // Delete expired cache
      await cacheRef.delete();
      return null;
    }

    // Update hit count and last used
    await cacheRef.update({
      hitCount: admin.firestore.FieldValue.increment(1),
      lastUsedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    functions.logger.info(`Cache HIT: ${cacheKey} (hits: ${cache.hitCount + 1})`);
    return cache.response;
  } catch (error) {
    functions.logger.error('Error checking cache:', error);
    return null;
  }
}

/**
 * Helper: Cache AI response
 */
async function cacheAIResponse(
  cacheKey: string,
  prompt: string,
  response: string,
  ttlHours: number
): Promise<void> {
  try {
    const now = admin.firestore.Timestamp.now();
    const expiresAt = admin.firestore.Timestamp.fromMillis(
      now.toMillis() + ttlHours * 60 * 60 * 1000
    );

    const cacheEntry: AICacheEntry = {
      id: cacheKey,
      prompt,
      response,
      model: 'gemini-1.5-flash',
      createdAt: now,
      expiresAt,
      hitCount: 0,
      lastUsedAt: now,
    };

    await db.collection('ai-cache').doc(cacheKey).set(cacheEntry);
    functions.logger.info(`Cached response: ${cacheKey} (TTL: ${ttlHours}h)`);
  } catch (error) {
    functions.logger.error('Error caching response:', error);
  }
}

/**
 * Helper: Check rate limit
 */
function checkRateLimit(userId: string, maxRequests: number = 10, windowMinutes: number = 1): boolean {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;

  // Get user's request timestamps
  let timestamps = rateLimitMap.get(userId) || [];

  // Filter out timestamps outside the window
  timestamps = timestamps.filter((ts) => now - ts < windowMs);

  // Check if limit exceeded
  if (timestamps.length >= maxRequests) {
    return false;
  }

  // Add current timestamp
  timestamps.push(now);
  rateLimitMap.set(userId, timestamps);

  return true;
}

/**
 * Helper: Call Gemini API
 */
async function callGeminiAPI(prompt: string, options?: { temperature?: number }): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: 2048,
      },
    });

    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    return text;
  } catch (error) {
    functions.logger.error('Gemini API Error:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to generate AI response'
    );
  }
}

/**
 * Prompt Templates
 */
const PROMPT_TEMPLATES = {
  npcDialog: (npcName: string, personality: string, context: string) => `
You are ${npcName}, a character in a space trading game with the following personality: ${personality}.

Context: ${context}

Generate a short dialog response (2-3 sentences) that fits your personality and the current situation.
Stay in character and make the response engaging and relevant to the context.

Response:`,

  backstory: (preferences: any) => `
Generate a unique backstory for a space trader character with these preferences:
${JSON.stringify(preferences, null, 2)}

Return a JSON object with the following structure:
{
  "backstory": "A compelling 2-3 sentence backstory",
  "modifiers": {
    "startingCredits": 0,
    "reputation": {}
  }
}

Make the backstory unique and interesting. Only return valid JSON, no additional text.`,

  gameEvent: (eventType: string, context: string) => `
Generate a dynamic game event for a space trading game.

Event Type: ${eventType}
Context: ${context}

Return a JSON object with the following structure:
{
  "title": "Event title",
  "description": "Event description (2-3 sentences)",
  "effects": {
    "resources": {},
    "reputation": {}
  }
}

Make it interesting and impactful. Only return valid JSON, no additional text.`,
};

/**
 * Fallback Responses (used when AI fails)
 */
const FALLBACK_RESPONSES = {
  dialog: "Greetings, traveler. How can I assist you today?",
  backstory: {
    backstory: "Du bist ein aufstrebender Händler im Weltraum mit großen Ambitionen.",
    modifiers: {
      startingCredits: 0,
      reputation: {},
    },
  },
  gameEvent: {
    title: "Routine Day",
    description: "Nothing unusual happens today in the sector.",
    effects: {
      resources: {},
      reputation: {},
    },
  },
};

/**
 * Callable Function: generateNpcDialog
 * Generate AI-powered NPC dialog
 */
export const generateNpcDialog = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  // Rate limiting
  if (!checkRateLimit(context.auth.uid, 10, 1)) {
    throw new functions.https.HttpsError(
      'resource-exhausted',
      'Rate limit exceeded. Please try again later.'
    );
  }

  const { gameId, npcId, playerId, contextString } = data;

  if (!gameId || !npcId || !playerId || !contextString) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'gameId, npcId, playerId, and contextString are required'
    );
  }

  try {
    // Generate cache key
    const cacheKey = generateCacheKey(`dialog_${npcId}_${contextString}`);

    // Check cache first
    const cached = await checkAICache(cacheKey);
    if (cached) {
      return {
        dialog: cached,
        cached: true,
      };
    }

    // Cache miss - load NPC data (placeholder for now)
    // TODO: Load actual NPC data from Firestore in later sprints
    const npcName = 'Merchant';
    const personality = 'friendly and helpful';

    // Generate prompt
    const prompt = PROMPT_TEMPLATES.npcDialog(npcName, personality, contextString);

    // Call Gemini API
    let dialog: string;
    try {
      dialog = await callGeminiAPI(prompt);
    } catch (error) {
      functions.logger.error('AI generation failed, using fallback:', error);
      dialog = FALLBACK_RESPONSES.dialog;
    }

    // Cache response for 24 hours
    await cacheAIResponse(cacheKey, prompt, dialog, 24);

    return {
      dialog,
      cached: false,
    };
  } catch (error) {
    functions.logger.error('Error in generateNpcDialog:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to generate NPC dialog'
    );
  }
});

/**
 * Callable Function: generateBackstory
 * Generate unique player backstory (NOT cached)
 */
export const generateBackstory = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  // Rate limiting
  if (!checkRateLimit(context.auth.uid, 5, 1)) {
    throw new functions.https.HttpsError(
      'resource-exhausted',
      'Rate limit exceeded. Please try again later.'
    );
  }

  const { preferences } = data;

  if (!preferences) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'preferences are required'
    );
  }

  try {
    // Generate prompt
    const prompt = PROMPT_TEMPLATES.backstory(preferences);

    // Call Gemini API
    let responseText: string;
    try {
      responseText = await callGeminiAPI(prompt, { temperature: 0.9 });
    } catch (error) {
      functions.logger.error('AI generation failed, using fallback:', error);
      return FALLBACK_RESPONSES.backstory;
    }

    // Parse JSON response
    try {
      // Extract JSON from response (AI might add extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    } catch (error) {
      functions.logger.error('JSON parsing failed, using fallback:', error);
      return FALLBACK_RESPONSES.backstory;
    }
  } catch (error) {
    functions.logger.error('Error in generateBackstory:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to generate backstory'
    );
  }
});

/**
 * Callable Function: generateGameEvent
 * Generate dynamic game events
 */
export const generateGameEvent = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  // Rate limiting
  if (!checkRateLimit(context.auth.uid, 10, 1)) {
    throw new functions.https.HttpsError(
      'resource-exhausted',
      'Rate limit exceeded. Please try again later.'
    );
  }

  const { gameId, eventType, eventContext } = data;

  if (!gameId || !eventType || !eventContext) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'gameId, eventType, and eventContext are required'
    );
  }

  try {
    // Generate prompt
    const prompt = PROMPT_TEMPLATES.gameEvent(eventType, eventContext);

    // Call Gemini API
    let responseText: string;
    try {
      responseText = await callGeminiAPI(prompt);
    } catch (error) {
      functions.logger.error('AI generation failed, using fallback:', error);
      return FALLBACK_RESPONSES.gameEvent;
    }

    // Parse JSON response
    let eventData;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      eventData = JSON.parse(jsonMatch[0]);
    } catch (error) {
      functions.logger.error('JSON parsing failed, using fallback:', error);
      eventData = FALLBACK_RESPONSES.gameEvent;
    }

    // Store event in Firestore
    const eventRef = await db
      .collection('games')
      .doc(gameId)
      .collection('events')
      .add({
        ...eventData,
        type: eventType,
        context: eventContext,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: 'ai',
      });

    return {
      id: eventRef.id,
      ...eventData,
    };
  } catch (error) {
    functions.logger.error('Error in generateGameEvent:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to generate game event'
    );
  }
});
