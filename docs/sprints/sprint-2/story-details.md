# Sprint 2 - Story Details

Dieses Dokument enthält die vollständigen Akzeptanzkriterien und technischen Details für jede Story im Sprint 2.

---

## E-004: Turn Management System

### Story (aus backlog-prioritized.md)

Als Entwickler möchte ich ein Turn-Management-System haben, damit rundenbasiertes Gameplay funktioniert.

**Technische Anforderungen:**
- [ ] Game State Machine (Round States)
- [ ] Player Action Queue
- [ ] Round Resolution Logic
- [ ] Turn Validation

**Definition of Done:** System kann Runden verwalten und Spielerzüge verarbeiten

---

### Akzeptanzkriterien

#### Backend (Cloud Functions)

- [ ] **Firestore Schema erweitert:**
  - `/games/{gameId}` hat neues Feld `roundState` mit:
    - `currentPhase`: 'waiting_for_players' | 'in_progress' | 'round_ending' | 'next_round_starting'
    - `playersReady`: string[] (Array von userIds)
    - `allPlayersReady`: boolean
    - `actionsThisRound`: number
    - `nextRoundStartsAt`: Timestamp (optional)

- [ ] **Neue Collection erstellt:**
  - `/games/{gameId}/actions/{actionId}` für Player Actions
  - Felder: `id`, `gameId`, `playerId`, `round`, `timestamp`, `type`, `data`, `status`, `validationError`

- [ ] **Cloud Function: `onPlayerReady`**
  - Firestore Trigger auf `/games/{gameId}/players/{playerId}`
  - Wird ausgelöst wenn Player `isReady: true` setzt
  - Prüft ob alle Spieler im Game ready sind
  - Bei allen ready: ruft `processRoundEnd` auf
  - Nutzt Firestore Transaction um Race Conditions zu vermeiden

- [ ] **Cloud Function: `processRoundEnd`**
  - Callable Function (kann von Frontend aufgerufen werden)
  - Verarbeitet Rundenende in folgenden Schritten:
    1. State Machine Transition: `in_progress` → `round_ending`
    2. Sammelt alle Player Actions aus `/actions` Collection
    3. Validiert Actions (Placeholder-Logik für Sprint 2)
    4. Führt Actions aus (Placeholder für Sprint 2)
    5. Erhöht `currentRound` um 1
    6. Setzt alle Spieler auf `isReady: false`
    7. State Machine: `round_ending` → `in_progress`
  - Error Handling: Bei Fehler rollback auf vorherigen State
  - Logging: Alle State Transitions werden geloggt

- [ ] **Helper Functions:**
  - `checkAllPlayersReady(gameId)`: Prüft ob alle Spieler ready
  - `collectPlayerActions(gameId)`: Sammelt Actions der aktuellen Runde
  - `validateActions(actions)`: Validiert Action-Format (Placeholder)
  - `executeActions(actions)`: Führt Actions aus (Placeholder)
  - `startNextRound(gameId)`: Initialisiert neue Runde

#### Frontend (Next.js)

- [ ] **Service: `gameService.ts`**
  - Funktion `markPlayerReady(gameId, playerId)`: Setzt Spieler auf ready
  - Funktion `getGameState(gameId)`: Lädt aktuellen Game State
  - Funktion `subscribeToRoundState(gameId, callback)`: Real-time Listener für Round Updates

- [ ] **Hook: `useRoundState.ts`**
  - Custom Hook für Round State Management
  - Gibt zurück: `{ currentRound, roundPhase, playersReady, isAllReady, loading }`
  - Nutzt Firestore Real-time Listener

- [ ] **UI-Komponente: `RoundControl.tsx`**
  - Zeigt aktuelle Runde und Phase an
  - Button "Runde beenden" (nur wenn Phase = 'in_progress')
  - Zeigt "Warte auf andere Spieler..." wenn Phase = 'round_ending'
  - Zeigt Liste der ready/not ready Spieler

#### Tests

- [ ] **Unit Tests:**
  - Test: State Machine Transitions funktionieren korrekt
  - Test: `checkAllPlayersReady` gibt true nur wenn alle ready
  - Test: Race Condition Handling (2 Spieler werden gleichzeitig ready)
  - Test: Round Increment funktioniert

- [ ] **Integration Tests (optional):**
  - Test: Kompletter Turn-Zyklus mit 2 Spielern
  - Test: Error Handling bei fehlerhaftem State

#### Dokumentation

- [ ] **README.md Update:**
  - Sektion "Turn Management" hinzufügen
  - State Machine Diagramm (Mermaid oder ASCII)
  - Beispiel-Code für Frontend-Integration

- [ ] **Inline-Kommentare:**
  - Jede State Transition kommentiert
  - Firestore Transaction erklärt

---

### Technische Umsetzung

**State Machine Diagramm:**

```
waiting_for_players → in_progress
         ↑                 ↓
         |           (Alle ready?)
         |                 ↓
  next_round_starting ← round_ending
```

**Code-Beispiel (Backend):**

```typescript
// functions/src/roundManager.ts

export const onPlayerReady = onDocumentWritten(
  'games/{gameId}/players/{playerId}',
  async (event) => {
    const gameId = event.params.gameId
    const playerData = event.data?.after.data()

    if (!playerData?.isReady) return

    // Transaction um Race Conditions zu vermeiden
    const gameRef = admin.firestore().collection('games').doc(gameId)

    await admin.firestore().runTransaction(async (transaction) => {
      const gameDoc = await transaction.get(gameRef)
      const game = gameDoc.data()

      // Alle Spieler ready?
      const allReady = await checkAllPlayersReady(gameId)

      if (allReady && game.roundState.currentPhase === 'in_progress') {
        // Trigger Round End
        transaction.update(gameRef, {
          'roundState.allPlayersReady': true,
          'roundState.currentPhase': 'round_ending'
        })

        // Async: Process Round End
        await processRoundEnd({ data: { gameId } })
      }
    })
  }
)
```

---

### Notizen

- **Turn Timer:** Nicht Teil von Sprint 2 (kommt in späterem Sprint)
- **Action Types:** Nur Placeholder (`type: 'dummy'`) für Sprint 2
- **Validation:** Einfache Format-Checks, keine Game-Logic-Validierung
- **Race Conditions:** Firestore Transactions sind essentiell!

---

## E-005: AI Integration Foundation

### Story (aus backlog-prioritized.md)

Als Entwickler möchte ich AI-Integration haben, damit KI-Features genutzt werden können.

**Technische Anforderungen:**
- [ ] LLM API Integration (OpenAI/Anthropic) → Wir nutzen Gemini 1.5 Flash
- [ ] Prompt Template System
- [ ] Response Caching (Kosten-Optimierung)
- [ ] Error Handling & Fallbacks

**Definition of Done:** System kann LLM-Anfragen machen und Antworten verarbeiten

---

### Akzeptanzkriterien

#### Setup

- [ ] **Package Installation:**
  - `npm install @google/generative-ai` in `/functions`
  - `package.json` updated mit Dependency

- [ ] **Environment Variables:**
  - `functions/.env` hat `GEMINI_API_KEY=...`
  - Firebase Functions Config: `firebase functions:config:set gemini.api_key="..."`
  - `.env.example` dokumentiert notwendige Keys

#### Backend (Cloud Functions)

- [ ] **AI Service (`aiService.ts`):**
  - Funktion `callGeminiAPI(prompt, options?)`: Basis-AI-Call
  - Funktion `checkAICache(cacheKey)`: Prüft ob Response gecacht ist
  - Funktion `cacheAIResponse(cacheKey, response, ttlHours)`: Cached Response
  - Error Handling: Wirft `HttpsError` bei API-Fehler
  - Logging: Jeder API-Call wird geloggt (Cache Hit/Miss)

- [ ] **Firestore Schema:**
  - Collection `/ai-cache/{cacheKey}` mit Feldern:
    - `id`: string (Hash von Prompt)
    - `prompt`: string
    - `response`: string
    - `model`: string ('gemini-1.5-flash')
    - `createdAt`: Timestamp
    - `expiresAt`: Timestamp
    - `hitCount`: number
    - `lastUsedAt`: Timestamp

- [ ] **Prompt Templates:**
  - Template `npcDialog`: Generiert NPC-Dialog basierend auf Persönlichkeit
  - Template `backstory`: Generiert Spieler-Backstory
  - Template `gameEvent`: Generiert dynamisches Game-Event
  - Templates sind dokumentiert in Code-Kommentaren

- [ ] **Cloud Functions (Callable):**

  **1. `generateNpcDialog`:**
  - Input: `{ gameId, npcId, playerId, contextString }`
  - Lädt NPC-Daten aus Firestore
  - Checkt Cache (Key: `dialog_${npcId}_${contextString}`)
  - Bei Cache Miss: Ruft Gemini API auf
  - Cached Response für 24h
  - Output: `{ dialog: string, cached: boolean }`

  **2. `generateBackstory`:**
  - Input: `{ preferences: any }`
  - Generiert unique Backstory (KEIN Caching!)
  - Parst JSON-Response
  - Bei Parse-Fehler: Fallback-Backstory
  - Output: `{ backstory: string, modifiers: {...} }`

  **3. `generateGameEvent`:**
  - Input: `{ gameId, eventType, eventContext }`
  - Generiert Event basierend auf Kontext
  - Speichert Event in `/games/{gameId}/events`
  - Output: Event-Objekt

- [ ] **Rate Limiting:**
  - Max 10 Requests/Minute pro User
  - Bei Überschreitung: `HttpsError('resource-exhausted')`

- [ ] **Error Handling:**
  - Gemini API Fehler → Fallback-Response
  - JSON Parse Fehler → Fallback-Daten
  - Timeout (> 10s) → Error mit klarer Message

#### Frontend (Next.js)

- [ ] **Service: `aiService.ts`**
  - Funktion `generateNpcDialog(gameId, npcId, playerId, context)`
  - Funktion `generateBackstory(preferences)`
  - Nutzt `httpsCallable` von Firebase Functions SDK
  - Error Handling im Frontend

#### Tests

- [ ] **Unit Tests:**
  - Test: Cache Hit/Miss funktioniert
  - Test: Fallback bei API-Fehler
  - Test: JSON Parsing mit ungültigem Input
  - Test: Rate Limiter blockiert nach 10 Requests

- [ ] **Integration Tests (mit Mocks):**
  - Mock Gemini API Responses
  - Test kompletter Dialog-Generierungs-Flow

#### Dokumentation

- [ ] **README.md Update:**
  - Sektion "AI Integration"
  - Setup-Anleitung für Gemini API Key
  - Beispiel-Code für Frontend-Usage

- [ ] **Code-Dokumentation:**
  - Prompt Templates dokumentiert
  - Caching-Strategie erklärt
  - API-Kosten-Optimierungen dokumentiert

---

### Technische Umsetzung

**Caching-Strategie:**

```typescript
// 1. Check Cache
const cacheKey = `dialog_${npcId}_${context}`
const cached = await checkAICache(cacheKey)

if (cached) {
  return { dialog: cached, cached: true }
}

// 2. Cache Miss → Call API
const response = await callGeminiAPI(prompt)

// 3. Cache Response
await cacheAIResponse(cacheKey, response, 24) // 24h TTL

return { dialog: response, cached: false }
```

**Fallback-System:**

```typescript
try {
  const response = await callGeminiAPI(prompt)
  return JSON.parse(response)
} catch (error) {
  functions.logger.error('AI Error:', error)

  // Fallback
  return {
    backstory: "Du bist ein aufstrebender Händler im Weltraum.",
    modifiers: { startingCredits: 0, reputation: {} }
  }
}
```

---

### Notizen

- **API-Kosten:** Free Tier ist sehr großzügig (1.5M Tokens/Tag)
- **Caching spart ~70%** der API-Calls (laut Schätzung)
- **Backstories:** NICHT cachen (müssen unique sein)
- **Dialoge:** Cachen für 24h (häufige Kontexte wiederholen sich)
- **Rate Limits:** Gemini Free Tier: 15 Requests/Minute

---

## E-006: Basic UI Framework & Components

### Story (aus backlog-prioritized.md)

Als Entwickler möchte ich wiederverwendbare UI-Komponenten haben, damit ich schnell Interfaces bauen kann.

**Technische Anforderungen:**
- [ ] Component Library (Tailwind/shadcn/MUI) → Wir nutzen shadcn/ui
- [ ] Layout System (Dashboard, Game View)
- [ ] Basic Navigation
- [ ] Responsive Design Foundation

**Definition of Done:** Basis-UI-Komponenten sind verfügbar und dokumentiert

---

### Akzeptanzkriterien

#### Setup

- [ ] **shadcn/ui Installation:**
  ```bash
  npx shadcn-ui@latest init
  ```
  - Konfiguration: Default settings (Tailwind, TypeScript)
  - `components.json` ist erstellt
  - Tailwind Config ist erweitert

- [ ] **Basis-Komponenten installiert:**
  ```bash
  npx shadcn-ui@latest add button
  npx shadcn-ui@latest add card
  npx shadcn-ui@latest add dialog
  npx shadcn-ui@latest add input
  npx shadcn-ui@latest add avatar
  npx shadcn-ui@latest add dropdown-menu
  npx shadcn-ui@latest add tabs
  npx shadcn-ui@latest add badge
  npx shadcn-ui@latest add separator
  npx shadcn-ui@latest add select
  ```
  - Alle Komponenten in `/components/ui/`
  - Mindestens 10 Komponenten installiert

#### Layout-Komponenten

- [ ] **`GameLayout.tsx`:**
  - Wrapper-Component für Game-Screens
  - Enthält Navbar + Sidebar + Main Content Area
  - Props: `children: React.ReactNode`
  - Responsive: Sidebar wird zu Drawer auf Mobile (< 768px)

- [ ] **`Navbar.tsx`:**
  - Logo/Titel links
  - User-Avatar + Dropdown rechts
  - Dropdown-Menü:
    - Profil
    - Einstellungen
    - Logout
  - Sticky Top (bleibt beim Scrollen oben)

- [ ] **`GameSidebar.tsx`:**
  - Navigation-Tabs:
    - Übersicht
    - Handel
    - Territorium
    - NPCs
  - Player-Stats Card (Placeholder mit Dummy-Daten)
  - Width: 256px (w-64)

- [ ] **`DashboardLayout.tsx`:**
  - Einfacheres Layout ohne Sidebar
  - Nur Navbar + Content
  - Für Dashboard/Lobby Screens

#### Game-Komponenten (Placeholder)

- [ ] **`ResourceInventory.tsx`:**
  - Zeigt Ressourcen-Liste
  - Props: `resources: Record<string, number>`
  - Card mit Titel + Badge für jede Ressource
  - Responsive Grid

- [ ] **`StationCard.tsx`:**
  - Zeigt Station-Informationen
  - Props: `station: { id, name, sectorId, controlledBy }`
  - Card mit Hover-Effekt
  - Button "Details" (onClick Placeholder)

- [ ] **`PlayerStats.tsx` (optional):**
  - Zeigt Credits, Influence, Reputation
  - Props: `player: Player`
  - Kompakte Card für Sidebar

#### Responsive Design

- [ ] **Breakpoints funktionieren:**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

- [ ] **Sidebar-Verhalten:**
  - Desktop: Immer sichtbar (w-64)
  - Mobile: Hidden, Button öffnet Drawer

- [ ] **Grid-Layouts:**
  - Mobile: 1 Column
  - Tablet: 2 Columns
  - Desktop: 3 Columns

#### Dokumentation

- [ ] **Style Guide (`docs/style-guide.md`):**
  - Farb-Schema dokumentiert
  - Typografie-Regeln
  - Spacing-Konventionen
  - Component-Usage-Beispiele

- [ ] **Component-Dokumentation:**
  - Jede Layout-Komponente hat JSDoc-Kommentare
  - Props sind dokumentiert
  - Usage-Beispiele in Kommentaren

#### Tests (optional für MVP)

- [ ] **Visual Tests (optional):**
  - Screenshots von Layouts auf verschiedenen Breakpoints
  - Storybook Setup (optional)

---

### Technische Umsetzung

**Ordnerstruktur:**

```
components/
├── ui/                      # shadcn/ui Komponenten
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
│
├── layout/                  # Layout-Komponenten
│   ├── GameLayout.tsx
│   ├── DashboardLayout.tsx
│   ├── Navbar.tsx
│   └── GameSidebar.tsx
│
└── game/                    # Game-spezifische Komponenten
    ├── ResourceInventory.tsx
    ├── StationCard.tsx
    └── PlayerStats.tsx
```

**Beispiel: GameLayout.tsx**

```typescript
import { Navbar } from './Navbar'
import { GameSidebar } from './GameSidebar'

export function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {/* Desktop: immer sichtbar, Mobile: hidden */}
        <div className="hidden md:block">
          <GameSidebar />
        </div>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

**Responsive Grid:**

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {stations.map(station => (
    <StationCard key={station.id} station={station} />
  ))}
</div>
```

---

### Notizen

- **shadcn/ui ist Copy-Paste:** Keine NPM-Dependency, volle Kontrolle
- **Alle Komponenten sind accessible:** ARIA-konform out-of-the-box
- **Tailwind bereits konfiguriert:** In Sprint 1 ✅
- **Dark Mode:** shadcn/ui unterstützt Dark Mode (kann später aktiviert werden)
- **Storybook optional:** Nice-to-have, aber nicht kritisch für MVP

---

**Ende der Story Details**
