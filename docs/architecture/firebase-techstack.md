# Sternenhaus - Firebase Tech-Stack & Architektur

**Version:** 1.0
**Datum:** 2025-11-17
**Status:** Architektur-Entscheidung
**Projekt-Typ:** Privates Webapp-Game (Kostenoptimiert)

---

## 🎯 Architektur-Übersicht

### Stack-Entscheidung: Firebase Ecosystem

```
Frontend:     React 18 + Next.js 14 (App Router)
Backend:      Firebase Cloud Functions (Gen 2)
Datenbank:    Cloud Firestore
Authentifizierung: Firebase Authentication
Hosting:      Firebase Hosting
Storage:      Firebase Storage (für Assets)
KI/LLM:       Google Gemini 1.5 Flash API
Real-time:    Firestore Real-time Listeners
Analytics:    Firebase Analytics (optional)
```

---

## 🏗️ System-Architektur-Diagramm

```
┌──────────────────────────────────────────────────────────────────┐
│                    Firebase Hosting                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Next.js 14 Web Application                    │ │
│  │  ┌─────────────────┐         ┌──────────────────┐         │ │
│  │  │   React Pages   │         │  Client Services │         │ │
│  │  │   - Dashboard   │◄───────►│  - Firestore SDK │         │ │
│  │  │   - Game View   │         │  - Auth SDK      │         │ │
│  │  │   - Lobby       │         │  - Real-time     │         │ │
│  │  └─────────────────┘         └──────────────────┘         │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/WSS
                              │
┌──────────────────────────────┼───────────────────────────────────┐
│                              ▼                                    │
│                    Firebase Project                               │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                  Cloud Firestore                            │ │
│  │  Collections:                                               │ │
│  │  - games/         (Game State)                              │ │
│  │  - players/       (Player Data)                             │ │
│  │  - npcs/          (NPC Personalities & Memory)              │ │
│  │  - stations/      (Territory Data)                          │ │
│  │  - transactions/  (Trade History)                           │ │
│  │  - events/        (Game Events)                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │            Firebase Cloud Functions (Gen 2)                 │ │
│  │                                                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │ │
│  │  │ Game Engine  │  │  AI Service  │  │  Turn Manager   │  │ │
│  │  │              │  │              │  │                 │  │ │
│  │  │ - Calculate  │  │ - Gemini API │  │ - Round Logic   │  │ │
│  │  │   Production │  │ - NPC Dialog │  │ - Event Trigger │  │ │
│  │  │ - Market     │  │ - Backstory  │  │ - Notifications │  │ │
│  │  │   Updates    │  │ - Events     │  │                 │  │ │
│  │  └──────────────┘  └──────────────┘  └─────────────────┘  │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │           Scheduled Functions (Cron)                   │ │ │
│  │  │  - Cleanup old games                                   │ │ │
│  │  │  - Daily AI cache invalidation                         │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              Firebase Authentication                        │ │
│  │  - Email/Password                                           │ │
│  │  - Google Sign-In (optional)                                │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              Firebase Storage                               │ │
│  │  - User Avatars                                             │ │
│  │  - Game Assets (optional)                                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
                              │
                              │ API Call
                              ▼
                    ┌─────────────────────┐
                    │   Google Gemini API │
                    │   (1.5 Flash)       │
                    │   - Free Tier       │
                    └─────────────────────┘
```

---

## 📁 Firestore Datenbank-Schema

### Collection Structure

```typescript
// /games/{gameId}
interface Game {
  id: string
  name: string
  createdAt: Timestamp
  createdBy: string // userId
  status: 'lobby' | 'active' | 'paused' | 'finished'
  currentRound: number
  maxPlayers: number
  settings: {
    turnTimeLimit?: number // Minuten (optional für spätere Ausbaustufe)
    startingCredits: number
    difficulty: 'easy' | 'normal' | 'hard'
  }
  roundState: {
    playersReady: string[] // userIds die fertig sind
    allPlayersReady: boolean
    nextRoundAt?: Timestamp
  }
}

// /games/{gameId}/players/{playerId}
interface Player {
  id: string
  userId: string
  gameId: string
  displayName: string
  avatar?: string

  // Core Stats
  credits: number
  influence: number

  // Reputation (pro Fraktion)
  reputation: {
    [factionId: string]: number // 0-100
  }

  // Progression
  status: 'trader' | 'minor_house' | 'major_house'
  title: string

  // Resources
  resources: {
    [resourceType: string]: number
  }

  // Controlled Territory
  controlledStations: string[] // stationIds
  controlledSectors: string[]  // sectorIds

  // Backstory (KI-generiert oder Template)
  backstory: {
    text: string
    isAiGenerated: boolean
    modifiers: {
      startingCredits: number
      startingReputation: { [factionId: string]: number }
      specialAbilities?: string[]
    }
  }

  // Game State
  isReady: boolean // für Rundenende
  lastActiveAt: Timestamp
  joinedAt: Timestamp
}

// /games/{gameId}/npcs/{npcId}
interface NPC {
  id: string
  gameId: string
  name: string
  type: 'trader' | 'station_commander' | 'spy' | 'official'

  // AI-generierte oder vordefinierte Persönlichkeit
  personality: {
    traits: string[] // z.B. ["gierig", "vorsichtig", "ehrenhaft"]
    alignment: number // -100 (böse) bis 100 (gut)
    loyalty?: string // factionId (Hausloyalität)
    isAiGenerated: boolean
  }

  // Memory System
  memory: {
    [playerId: string]: {
      interactions: Array<{
        round: number
        type: 'trade' | 'dialog' | 'quest' | 'betrayal' | 'favor'
        summary: string
        impact: number // -100 bis 100
      }>
      relationshipScore: number // -100 bis 100
      lastInteractionRound: number
    }
  }

  // Für Händler-NPCs
  inventory?: {
    [resourceType: string]: number
  }
  priceModifiers?: {
    [resourceType: string]: number // 0.8 = 20% günstiger
  }

  // Für Station-Commander
  stationId?: string
}

// /games/{gameId}/stations/{stationId}
interface Station {
  id: string
  gameId: string
  name: string
  sectorId: string

  // Besitz
  controlledBy?: string // playerId oder "neutral"

  // Produktion
  resourceProduction: {
    [resourceType: string]: {
      amountPerRound: number
      currentStock: number
    }
  }

  // Position auf Karte
  position: {
    x: number
    y: number
  }

  // Strategischer Wert
  strategicValue: number // 1-10
  defenseLevel: number
}

// /games/{gameId}/transactions/{transactionId}
interface Transaction {
  id: string
  gameId: string
  round: number
  timestamp: Timestamp
  type: 'trade' | 'production' | 'conquest' | 'gift'

  // Teilnehmer
  from?: string // playerId oder npcId
  to?: string   // playerId oder npcId

  // Trade Details
  itemsGiven?: { [resourceType: string]: number }
  itemsReceived?: { [resourceType: string]: number }
  credits?: number

  // Sichtbarkeit
  visibility: 'public' | 'semi_public' | 'secret'

  // Für Events/History
  description: string
}

// /games/{gameId}/events/{eventId}
interface GameEvent {
  id: string
  gameId: string
  round: number
  timestamp: Timestamp

  type: 'market_crisis' | 'npc_offer' | 'scandal' | 'tech_breakthrough' | 'war' | 'alliance'

  // KI-generierter Inhalt
  title: string
  description: string
  isAiGenerated: boolean

  // Betroffene Entitäten
  affectedPlayers?: string[]
  affectedNpcs?: string[]
  affectedResources?: string[]

  // Auswirkungen
  effects: {
    priceChanges?: { [resourceType: string]: number }
    reputationChanges?: { [playerId: string]: { [factionId: string]: number } }
    specialEffects?: any[]
  }

  // Spieler-Reaktionen möglich?
  requiresResponse: boolean
  responses?: {
    [playerId: string]: {
      choice: string
      timestamp: Timestamp
    }
  }
}

// /games/{gameId}/sectors/{sectorId}
interface Sector {
  id: string
  gameId: string
  name: string

  stationIds: string[]

  // Kontrolle
  controlledBy?: string // playerId mit Mehrheit der Stationen

  // Boni für Kontrolle
  bonuses: {
    influenceBonus: number
    specialAbility?: string
  }
}

// /ai-cache/{cacheKey} (für Kostenoptimierung)
interface AICache {
  id: string // hash von prompt + parameters
  prompt: string
  response: string
  model: string
  createdAt: Timestamp
  expiresAt: Timestamp // 24h später
  hitCount: number
  lastUsedAt: Timestamp
}

// /users/{userId}
interface User {
  id: string
  email: string
  displayName: string
  avatar?: string
  createdAt: Timestamp

  // Statistiken
  stats: {
    gamesPlayed: number
    gamesWon: number
    totalPlayTime: number // Minuten
    favoriteStrategy?: string
  }

  // Einstellungen
  settings: {
    language: 'de' | 'en'
    notifications: boolean
    theme: 'light' | 'dark'
  }
}
```

### Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper Functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    function isPlayerInGame(gameId) {
      return exists(/databases/$(database)/documents/games/$(gameId)/players/$(request.auth.uid));
    }

    // Users
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId);
    }

    // Games
    match /games/{gameId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isPlayerInGame(gameId);
      allow delete: if false; // Games werden nicht gelöscht

      // Players Sub-Collection
      match /players/{playerId} {
        allow read: if isPlayerInGame(gameId);
        allow write: if isOwner(playerId) && isPlayerInGame(gameId);
      }

      // NPCs (read-only für Clients, nur Functions schreiben)
      match /npcs/{npcId} {
        allow read: if isPlayerInGame(gameId);
        allow write: if false; // Nur Cloud Functions
      }

      // Stations
      match /stations/{stationId} {
        allow read: if isPlayerInGame(gameId);
        allow write: if false; // Nur Cloud Functions
      }

      // Transactions (History)
      match /transactions/{transactionId} {
        allow read: if isPlayerInGame(gameId);
        allow create: if isPlayerInGame(gameId);
        allow update, delete: if false;
      }

      // Events
      match /events/{eventId} {
        allow read: if isPlayerInGame(gameId);
        allow write: if false; // Nur Cloud Functions
      }

      // Sectors
      match /sectors/{sectorId} {
        allow read: if isPlayerInGame(gameId);
        allow write: if false; // Nur Cloud Functions
      }
    }

    // AI Cache (nur Cloud Functions)
    match /ai-cache/{cacheKey} {
      allow read, write: if false;
    }
  }
}
```

---

## ⚙️ Firebase Cloud Functions

### Function Structure

```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions/v2'
import { onCall, onRequest } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'

// ============================================
// 1. Game Engine Functions
// ============================================

/**
 * Wird aufgerufen wenn ein Spieler seine Runde beendet
 * Prüft ob alle Spieler ready sind und löst Rundenende aus
 */
export const onPlayerReady = onDocumentWritten(
  'games/{gameId}/players/{playerId}',
  async (event) => {
    const gameId = event.params.gameId
    const playerData = event.data?.after.data()

    if (!playerData?.isReady) return

    // Prüfe ob alle Spieler ready
    const allReady = await checkAllPlayersReady(gameId)

    if (allReady) {
      await processRoundEnd(gameId)
    }
  }
)

/**
 * Verarbeitet Rundenende:
 * - Ressourcenproduktion
 * - Marktaktualisierung
 * - NPC-Aktionen
 * - Event-Generierung
 */
export const processRoundEnd = onCall(async (request) => {
  const { gameId } = request.data

  // 1. Ressourcenproduktion für alle Spieler
  await calculateProduction(gameId)

  // 2. Marktpreise aktualisieren
  await updateMarketPrices(gameId)

  // 3. NPC-Aktionen ausführen
  await executeNpcActions(gameId)

  // 4. Random Events generieren (mit KI)
  await generateGameEvents(gameId)

  // 5. Runde erhöhen & Spieler zurücksetzen
  await startNextRound(gameId)

  return { success: true }
})

/**
 * Handel zwischen Spieler und NPC
 */
export const executeTrade = onCall(async (request) => {
  const { gameId, playerId, npcId, offer } = request.data

  // Validierung
  const valid = await validateTrade(gameId, playerId, npcId, offer)
  if (!valid.success) {
    throw new functions.https.HttpsError('invalid-argument', valid.error)
  }

  // KI-Verhandlung (Gemini)
  const npcResponse = await negotiateWithAI(npcId, offer)

  if (npcResponse.accepted) {
    // Trade ausführen
    await executeTradeTransaction(gameId, playerId, npcId, offer)

    // NPC Memory aktualisieren
    await updateNpcMemory(npcId, playerId, 'trade', offer)
  }

  return npcResponse
})

// ============================================
// 2. AI Service Functions
// ============================================

/**
 * Generiert NPC-Dialog mit Gemini
 */
export const generateNpcDialog = onCall(async (request) => {
  const { npcId, playerId, context } = request.data

  // Cache-Check (Kosten sparen)
  const cached = await checkAICache(`dialog_${npcId}_${context}`)
  if (cached) return cached

  // NPC & Player Daten laden
  const npc = await getNpc(npcId)
  const player = await getPlayer(playerId)
  const memory = npc.memory[playerId] || { interactions: [], relationshipScore: 0 }

  // Gemini Prompt
  const prompt = buildDialogPrompt(npc, player, memory, context)
  const response = await callGeminiAPI(prompt)

  // Cachen (24h)
  await cacheAIResponse(`dialog_${npcId}_${context}`, response)

  return { dialog: response }
})

/**
 * Generiert Spieler-Backstory mit Gemini
 */
export const generateBackstory = onCall(async (request) => {
  const { preferences } = request.data

  const prompt = `
Generiere eine einzigartige Hintergrundgeschichte für einen Spieler in einer
Weltraum-Wirtschaftssimulation.

Präferenzen: ${JSON.stringify(preferences)}

Die Geschichte sollte:
- 2-3 Absätze lang sein
- Einen prägnanten Hintergrund etablieren
- Motivation für den Aufstieg zum Handelshaus bieten
- Konkrete Startmodifier vorschlagen (Credits, Reputation, besondere Fähigkeiten)

Antworte im JSON-Format:
{
  "backstory": "...",
  "modifiers": {
    "startingCredits": number,
    "reputation": { "faction1": number },
    "specialAbilities": []
  }
}
  `

  const response = await callGeminiAPI(prompt)
  return JSON.parse(response)
})

/**
 * Generiert zufällige Game-Events
 */
export const generateGameEvent = onCall(async (request) => {
  const { gameId, eventType, context } = request.data

  const prompt = buildEventPrompt(eventType, context)
  const response = await callGeminiAPI(prompt)

  // Event in Firestore speichern
  await saveGameEvent(gameId, response)

  return response
})

/**
 * Gemini API Helper
 */
async function callGeminiAPI(prompt: string): Promise<string> {
  const { GoogleGenerativeAI } = require('@google/generative-ai')
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const result = await model.generateContent(prompt)

  return result.response.text()
}

// ============================================
// 3. Scheduled Functions
// ============================================

/**
 * Täglich: Alte Games aufräumen
 */
export const cleanupOldGames = onSchedule('every 24 hours', async () => {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30) // 30 Tage alt

  const oldGames = await admin.firestore()
    .collection('games')
    .where('status', '==', 'finished')
    .where('createdAt', '<', cutoff)
    .get()

  const batch = admin.firestore().batch()
  oldGames.forEach(doc => batch.delete(doc.ref))

  await batch.commit()
  functions.logger.info(`Cleaned up ${oldGames.size} old games`)
})

/**
 * Täglich: AI-Cache invalidieren
 */
export const invalidateAICache = onSchedule('every 24 hours', async () => {
  const now = new Date()

  const expiredCache = await admin.firestore()
    .collection('ai-cache')
    .where('expiresAt', '<', now)
    .get()

  const batch = admin.firestore().batch()
  expiredCache.forEach(doc => batch.delete(doc.ref))

  await batch.commit()
  functions.logger.info(`Invalidated ${expiredCache.size} cache entries`)
})

/**
 * Stündlich: Inactive Players warnen
 */
export const notifyInactivePlayers = onSchedule('every 1 hour', async () => {
  // TODO: Implementierung für Turn-Timer (Phase 2)
})
```

### Function Configuration

```json
// functions/package.json
{
  "name": "sternenhaus-functions",
  "engines": {
    "node": "20"
  },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0",
    "@google/generative-ai": "^0.2.0"
  },
  "scripts": {
    "build": "tsc",
    "serve": "npm run build && firebase emulators:start --only functions",
    "deploy": "npm run build && firebase deploy --only functions"
  }
}
```

---

## 🎨 Frontend-Architektur (Next.js)

### Project Structure

```
sternenhaus/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── (game)/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Spielübersicht, Games Liste
│   │   ├── lobby/
│   │   │   └── [gameId]/
│   │   │       └── page.tsx      # Game Lobby (vor Start)
│   │   └── game/
│   │       └── [gameId]/
│   │           ├── page.tsx      # Haupt-Spielansicht
│   │           ├── trade/
│   │           │   └── page.tsx
│   │           ├── territory/
│   │           │   └── page.tsx
│   │           └── npcs/
│   │               └── [npcId]/
│   │                   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx                  # Landing Page
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── game/
│   │   ├── GameMap.tsx           # Sternenkarte
│   │   ├── StationCard.tsx
│   │   ├── ResourceInventory.tsx
│   │   ├── NPCDialog.tsx
│   │   ├── TradeInterface.tsx
│   │   └── PlayerStats.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── GameSidebar.tsx
│   │   └── Footer.tsx
│   │
│   └── providers/
│       ├── FirebaseProvider.tsx
│       └── GameProvider.tsx
│
├── lib/
│   ├── firebase/
│   │   ├── config.ts             # Firebase Initialisierung
│   │   ├── auth.ts               # Auth Helpers
│   │   └── firestore.ts          # Firestore Helpers
│   │
│   ├── hooks/
│   │   ├── useGame.ts            # Game State Hook
│   │   ├── usePlayer.ts
│   │   ├── useNpcs.ts
│   │   └── useRealtime.ts        # Firestore Real-time Listeners
│   │
│   ├── services/
│   │   ├── gameService.ts        # Game Logic
│   │   ├── tradeService.ts
│   │   ├── npcService.ts
│   │   └── aiService.ts
│   │
│   └── types/
│       ├── game.ts               # TypeScript Interfaces
│       ├── player.ts
│       └── npc.ts
│
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── sounds/
│   └── favicon.ico
│
├── firebase.json                 # Firebase Configuration
├── firestore.rules               # Security Rules
├── firestore.indexes.json        # Composite Indexes
├── .env.local                    # Environment Variables
└── next.config.js
```

### Frontend Services

```typescript
// lib/firebase/config.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase (nur einmal)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app, 'europe-west1') // Region für Functions
export const storage = getStorage(app)

export default app
```

```typescript
// lib/hooks/useGame.ts
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Game } from '@/lib/types/game'

export function useGame(gameId: string) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!gameId) return

    // Real-time Listener
    const unsubscribe = onSnapshot(
      doc(db, 'games', gameId),
      (snapshot) => {
        if (snapshot.exists()) {
          setGame({ id: snapshot.id, ...snapshot.data() } as Game)
        } else {
          setError(new Error('Game not found'))
        }
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [gameId])

  return { game, loading, error }
}
```

```typescript
// lib/services/tradeService.ts
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/lib/firebase/config'

export interface TradeOffer {
  itemsOffered: { [resourceType: string]: number }
  itemsRequested: { [resourceType: string]: number }
  credits?: number
}

export interface TradeResponse {
  accepted: boolean
  counterOffer?: TradeOffer
  dialog: string
  npcEmotion: string
}

export async function negotiateTrade(
  gameId: string,
  playerId: string,
  npcId: string,
  offer: TradeOffer
): Promise<TradeResponse> {
  const executeTrade = httpsCallable<any, TradeResponse>(functions, 'executeTrade')

  const result = await executeTrade({
    gameId,
    playerId,
    npcId,
    offer
  })

  return result.data
}
```

---

## 💰 Kosten-Kalkulation Firebase

### Firebase Free Tier (Spark Plan)

```yaml
Cloud Firestore:
  Storage: 1 GB gratis
  Dokument-Reads: 50.000 / Tag
  Dokument-Writes: 20.000 / Tag
  Dokument-Deletes: 20.000 / Tag
  Network Egress: 10 GB / Monat

Cloud Functions:
  Invocations: 2.000.000 / Monat
  Compute Time (GB-sec): 400.000 / Monat
  Compute Time (GHz-sec): 200.000 / Monat
  Network Egress: 5 GB / Monat

Firebase Hosting:
  Storage: 10 GB
  Transfer: 360 MB / Tag (~10 GB / Monat)

Firebase Authentication:
  Phone Auth: 10.000 / Monat (Email/Password unlimited)

Firebase Storage:
  Storage: 5 GB
  Downloads: 1 GB / Tag
  Uploads: 20.000 / Tag
```

### Realistisches Szenario-Beispiel

**Annahme: 50 aktive Spieler, 10 laufende Games**

```
Firestore Reads pro Tag:
- Game State Updates: 50 Spieler × 100 Reads = 5.000
- Player Data: 50 × 50 = 2.500
- NPCs: 10 Games × 10 NPCs × 10 Reads = 1.000
- Events/Transactions: ~1.000
Total: ~9.500 Reads/Tag ✅ (unter 50.000)

Firestore Writes pro Tag:
- Player Actions: 50 Spieler × 20 Actions = 1.000
- Game Updates: 10 Games × 100 = 1.000
- NPC Memory: ~500
- Events: ~200
Total: ~2.700 Writes/Tag ✅ (unter 20.000)

Cloud Functions Invocations pro Tag:
- Trade Negotiations: 50 × 5 = 250
- Round Processing: 10 Games × 3 Runden = 30
- AI Dialogs: ~100
- Scheduled Functions: 3
Total: ~383 / Tag = ~11.500 / Monat ✅ (unter 2.000.000)

Storage:
- Game Data: ~200 MB (10 Games mit History)
- User Data: ~50 MB
- AI Cache: ~100 MB
Total: ~350 MB ✅ (unter 1 GB)

Gemini API:
- Dialog Generations: ~100 / Tag
- Event Generations: ~10 / Tag
- Backstories: ~5 / Tag
Total: ~115 Requests / Tag = ~3.450 / Monat ✅ (unter 45.000 Free Tier)
```

### ✅ Ergebnis: **Komplett kostenlos** bis ~50-100 Spieler

---

### Blaze Plan (Pay-as-you-go) - Wenn skaliert wird

```yaml
Firestore:
  Reads: $0.06 / 100.000 Dokumente
  Writes: $0.18 / 100.000 Dokumente
  Deletes: $0.02 / 100.000 Dokumente
  Storage: $0.18 / GB / Monat

Cloud Functions:
  Invocations: $0.40 / Million
  Compute (GB-sec): $0.0000025
  Compute (GHz-sec): $0.0000100

Gemini API (nach Free Tier):
  Flash 1.5: $0.075 / 1M Input Tokens, $0.30 / 1M Output Tokens
```

**Szenario: 500 aktive Spieler**

```
Firestore Costs:
- Reads: 100.000 / Tag × 30 = 3.000.000 / Monat
  → $0.06 × 30 = $1.80
- Writes: 30.000 / Tag × 30 = 900.000 / Monat
  → $0.18 × 9 = $1.62
- Storage: 2 GB → $0.36
Firestore Total: ~$3.78 / Monat

Cloud Functions:
- Invocations: 200.000 / Monat → gratis (unter 2M)
- Compute: minimal → ~$0.50 / Monat
Functions Total: ~$0.50 / Monat

Gemini API:
- 50.000 Requests / Monat (nach Free Tier: 5.000 kostenpflichtig)
- Durchschnittlich 500 Tokens Input, 200 Tokens Output
  → 5.000 × 500 = 2.5M Input Tokens → $0.19
  → 5.000 × 200 = 1M Output Tokens → $0.30
Gemini Total: ~$0.49 / Monat

GESAMT: ~$5-6 / Monat bei 500 aktiven Spielern ✅
```

---

## 🚀 Optimierungsstrategien

### 1. Firestore Query-Optimierung

```typescript
// ❌ NICHT SO (viele Reads)
const allNpcs = await getDocs(collection(db, `games/${gameId}/npcs`))

// ✅ SO (nur benötigte Felder)
const npcsQuery = query(
  collection(db, `games/${gameId}/npcs`),
  where('type', '==', 'trader'),
  limit(5)
)
const npcs = await getDocs(npcsQuery)
```

### 2. AI-Response Caching

```typescript
// Häufige Dialoge cachen (24h)
const cacheKey = `dialog_${npcId}_greeting`
const cached = await getDoc(doc(db, 'ai-cache', cacheKey))

if (cached.exists() && cached.data().expiresAt > Date.now()) {
  return cached.data().response // Cache Hit → keine API-Kosten
}

// Cache Miss → Gemini aufrufen
const response = await callGeminiAPI(prompt)
await setDoc(doc(db, 'ai-cache', cacheKey), {
  response,
  expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  createdAt: Date.now()
})
```

### 3. Batch Operations

```typescript
// ❌ NICHT SO (viele Writes)
for (const player of players) {
  await updateDoc(doc(db, 'players', player.id), { credits: player.credits + 100 })
}

// ✅ SO (ein Batch Write)
const batch = writeBatch(db)
players.forEach(player => {
  const ref = doc(db, 'players', player.id)
  batch.update(ref, { credits: player.credits + 100 })
})
await batch.commit()
```

### 4. Firestore Offline Persistence

```typescript
// Client-seitig: Offline-Daten cachen
import { enableIndexedDbPersistence } from 'firebase/firestore'

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence enabled in one tab only')
  } else if (err.code === 'unimplemented') {
    console.log('Browser does not support persistence')
  }
})
```

---

## 📦 Deployment

### Firebase Projekt Setup

```bash
# 1. Firebase CLI installieren
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Projekt initialisieren
firebase init

# Wähle:
# - Firestore
# - Functions
# - Hosting
# - Storage

# 4. Functions Dependencies
cd functions
npm install

# 5. Deploy
firebase deploy
```

### Environment Variables

```bash
# .env.local (Next.js Frontend)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sternenhaus-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sternenhaus-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sternenhaus-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxx

# functions/.env (Cloud Functions)
GEMINI_API_KEY=your_gemini_api_key
```

### Firebase Configuration

```json
// firebase.json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "runtime": "nodejs20",
      "region": "europe-west1"
    }
  ],
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

---

## 🔐 Security Considerations

### 1. API Key Protection

```typescript
// ❌ NIEMALS im Frontend
const GEMINI_API_KEY = "AIza..." // NEIN!

// ✅ Nur in Cloud Functions
// functions/.env
process.env.GEMINI_API_KEY
```

### 2. Input Validation

```typescript
// Alle Cloud Functions: Input validieren
export const executeTrade = onCall(async (request) => {
  // Authentifizierung prüfen
  if (!request.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    )
  }

  // Input validieren
  const { gameId, playerId, offer } = request.data

  if (!gameId || !playerId || !offer) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required fields'
    )
  }

  // Spieler ist in diesem Game?
  const player = await getPlayer(gameId, playerId)
  if (!player || player.userId !== request.auth.uid) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Player not authorized for this game'
    )
  }

  // ... rest der Logik
})
```

### 3. Rate Limiting

```typescript
// functions/src/middleware/rateLimiter.ts
import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 Requests
  duration: 60, // pro Minute
})

export async function checkRateLimit(userId: string) {
  try {
    await rateLimiter.consume(userId)
  } catch {
    throw new functions.https.HttpsError(
      'resource-exhausted',
      'Too many requests. Please try again later.'
    )
  }
}
```

---

## 📊 Monitoring & Analytics

### Firebase Performance Monitoring

```typescript
// lib/firebase/performance.ts
import { getPerformance, trace } from 'firebase/performance'

const perf = getPerformance()

// Trace für kritische Operationen
export async function traceOperation(name: string, operation: () => Promise<any>) {
  const t = trace(perf, name)
  t.start()

  try {
    const result = await operation()
    t.stop()
    return result
  } catch (error) {
    t.stop()
    throw error
  }
}

// Usage
await traceOperation('load_game_state', async () => {
  return await getDoc(doc(db, 'games', gameId))
})
```

### Custom Logging

```typescript
// functions/src/utils/logger.ts
import * as functions from 'firebase-functions'

export function logGameEvent(
  gameId: string,
  event: string,
  data?: any
) {
  functions.logger.info(`[Game ${gameId}] ${event}`, data)
}

export function logError(
  context: string,
  error: Error,
  data?: any
) {
  functions.logger.error(`[${context}] Error:`, {
    message: error.message,
    stack: error.stack,
    ...data
  })
}
```

---

## 🎯 Nächste Schritte

### Phase 0: Setup (Woche 1-2)

1. **Firebase Projekt erstellen**
   ```bash
   firebase init
   ```

2. **Next.js Projekt aufsetzen**
   ```bash
   npx create-next-app@latest sternenhaus --typescript --tailwind --app
   ```

3. **Firebase SDK integrieren**
   ```bash
   npm install firebase firebase-admin
   ```

4. **Gemini API Key holen**
   - https://ai.google.dev/

5. **Basis-Komponenten bauen**
   - Auth-Flow (Login/Register)
   - Dashboard
   - Game Lobby

### Phase 1: MVP (Woche 3-8)

Siehe `backlog-prioritized.md` Phase 1

---

## 📚 Ressourcen & Dokumentation

### Offizielle Docs
- Firebase: https://firebase.google.com/docs
- Firestore: https://firebase.google.com/docs/firestore
- Cloud Functions: https://firebase.google.com/docs/functions
- Gemini API: https://ai.google.dev/docs
- Next.js: https://nextjs.org/docs

### Code-Beispiele
- Firebase Samples: https://github.com/firebase/quickstart-js
- Next.js Examples: https://github.com/vercel/next.js/tree/canary/examples

---

**Ende des Dokuments**
