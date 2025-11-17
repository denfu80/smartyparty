# Sternenhaus - Technische Architektur

**Version:** 1.0
**Datum:** 2025-11-17
**Status:** Initial Draft für Online-Multiplayer Architektur

---

## Übersicht

Sternenhaus ist ein rundenbasiertes Online-Multiplayer-Strategiespiel, das als Web-App implementiert wird. Die Architektur muss asynchrones Multiplayer-Gameplay unterstützen, bei dem Spieler unabhängig voneinander ihre Züge machen und die nächste Runde automatisch startet, sobald alle Spieler fertig sind.

---

## Architektur-Prinzipien

1. **Asynchrones Multiplayer**: Spieler können jederzeit ihre Züge machen, unabhängig von anderen
2. **Persistente Welt**: Spielzustand wird dauerhaft in einer Datenbank gespeichert
3. **Web-First**: Primäre Plattform ist Browser (Desktop & Mobile)
4. **Skalierbar**: Architektur muss mehrere parallele Spiele unterstützen
5. **KI-Integration**: Backend muss KI-Dienste effizient einbinden
6. **Real-time Updates**: Spieler sehen in Echtzeit, wenn andere ihre Züge abgeschlossen haben

---

## System-Komponenten

### 1. Frontend (Web-App)

**Technologie-Stack (Empfohlen):**
- **Framework**: React oder Vue.js
- **State Management**: Redux/Vuex oder Zustand
- **UI Components**: Tailwind CSS + Custom Components
- **Real-time**: WebSockets oder Server-Sent Events
- **Build Tool**: Vite oder Next.js

**Hauptkomponenten:**
- `GameBoard`: Hauptspielansicht mit Karte, Stationen, Flotten
- `TurnManager`: Zeigt aktuellen Rundenstatus (wer hat schon gezogen)
- `DialogSystem`: KI-generierte Dialoge mit NPCs
- `MarketView`: Handelsinterface
- `FleetControl`: Flottenkommandos
- `DiplomacyView`: Diplomatie und Allianzen
- `NotificationCenter`: Echtzeitbenachrichtigungen über Rundenfortschritt

**Funktionen:**
- Authentifizierung & Session-Management
- Asynchrone Zug-Eingabe
- Echtzeit-Updates über Spielerstatus
- Responsive Design für Desktop & Mobile
- Offline-Toleranz (Zug speichern, später hochladen)

---

### 2. Backend (API Server)

**Technologie-Stack (Empfohlen):**
- **Framework**: Node.js (Express/Fastify) oder Python (FastAPI)
- **Datenbank**: PostgreSQL (relational) + Redis (Caching/Sessions)
- **WebSockets**: Socket.io oder native WebSockets
- **Authentifizierung**: JWT + OAuth2
- **KI-Integration**: REST APIs zu LLM-Diensten (Claude, OpenAI)

**Hauptkomponenten:**

#### 2.1 Game Server
- **Turn Processing**: Verarbeitet Spielzüge und aktualisiert Spielzustand
- **Round Manager**: Erkennt wenn alle Spieler fertig sind, startet neue Runde
- **Game State Engine**: Zentrale Logik für Spielmechaniken
- **Validation Layer**: Validiert alle Spieleraktionen gegen Spielregeln

#### 2.2 KI Service Layer
- **NPC Dialog Generator**: Generiert dynamische Dialoge basierend auf Kontext
- **Event Generator**: Erstellt emergente Events basierend auf Spielzustand
- **Personality Engine**: Verwaltet NPC-Persönlichkeiten und Gedächtnis
- **Story Generator**: Generiert Hintergrundgeschichten und Narrative

#### 2.3 API Endpoints

**Authentifizierung:**
- `POST /api/auth/register` - Nutzer registrieren
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Aktueller Nutzer

**Spiel-Verwaltung:**
- `POST /api/games` - Neues Spiel erstellen
- `GET /api/games` - Spiele auflisten (eigene & öffentliche)
- `GET /api/games/:id` - Spieldetails
- `POST /api/games/:id/join` - Spiel beitreten
- `POST /api/games/:id/start` - Spiel starten (wenn genug Spieler)

**Rundenbasiertes Gameplay:**
- `GET /api/games/:id/state` - Aktueller Spielzustand
- `POST /api/games/:id/turn` - Zug einreichen
- `POST /api/games/:id/turn/complete` - Zug als abgeschlossen markieren
- `GET /api/games/:id/turn/status` - Wer hat schon gezogen?

**Spielaktionen:**
- `POST /api/games/:id/trade` - Handelsgeschäft durchführen
- `POST /api/games/:id/fleet/command` - Flottenbefehl
- `POST /api/games/:id/diplomacy/alliance` - Allianz vorschlagen
- `POST /api/games/:id/espionage` - Spionageaktion
- `POST /api/games/:id/dialog/:npcId` - Dialog mit NPC

**Echtzeit-Updates:**
- `WS /api/games/:id/live` - WebSocket für Echtzeit-Updates

---

### 3. Datenbank-Schema (PostgreSQL)

**Haupttabellen:**

#### `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
```

#### `games`
```sql
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  max_players INTEGER DEFAULT 6,
  current_round INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'waiting', -- waiting, active, completed
  turn_timer_hours INTEGER, -- NULL oder Stunden für Timer (Ausbaustufe)
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

#### `game_players`
```sql
CREATE TABLE game_players (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id),
  user_id INTEGER REFERENCES users(id),
  player_color VARCHAR(20),
  starting_position JSONB, -- Startpositionen, Ressourcen, etc.
  turn_completed BOOLEAN DEFAULT FALSE,
  last_turn_at TIMESTAMP,
  UNIQUE(game_id, user_id)
);
```

#### `game_state`
```sql
CREATE TABLE game_state (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) UNIQUE,
  state JSONB NOT NULL, -- Gesamter Spielzustand (Territorien, Flotten, Märkte, etc.)
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `npcs`
```sql
CREATE TABLE npcs (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id),
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50), -- trader, commander, spy, etc.
  house_loyalty VARCHAR(50),
  personality JSONB NOT NULL, -- KI-generierte Persönlichkeit
  memory JSONB DEFAULT '[]', -- Erinnerungen an Interaktionen
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `player_actions`
```sql
CREATE TABLE player_actions (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id),
  player_id INTEGER REFERENCES game_players(id),
  round INTEGER NOT NULL,
  action_type VARCHAR(50), -- trade, fleet_move, diplomacy, etc.
  action_data JSONB NOT NULL,
  is_secret BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `events`
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id),
  round INTEGER NOT NULL,
  event_type VARCHAR(50), -- crisis, opportunity, scandal, etc.
  event_data JSONB NOT NULL,
  visibility VARCHAR(20) DEFAULT 'public', -- public, semi_public, secret
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `turn_timer` (Ausbaustufe)
```sql
CREATE TABLE turn_timers (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id),
  round INTEGER NOT NULL,
  deadline TIMESTAMP NOT NULL,
  warning_sent BOOLEAN DEFAULT FALSE,
  UNIQUE(game_id, round)
);
```

---

### 4. Rundenmanagement-Logik

**Ablauf einer Runde:**

1. **Runde startet**: `game_players.turn_completed` wird für alle auf `FALSE` gesetzt
2. **Spieler machen Züge**:
   - Spieler führen Aktionen aus (Handel, Flotten bewegen, Diplomatie)
   - Aktionen werden in `player_actions` gespeichert
   - `game_state` wird kontinuierlich aktualisiert
3. **Spieler markiert Zug als abgeschlossen**:
   - `game_players.turn_completed = TRUE`
   - `game_players.last_turn_at = NOW()`
   - WebSocket-Broadcast an alle Spieler: "Spieler X hat seinen Zug abgeschlossen"
4. **Check: Alle fertig?**
   - Backend prüft: `SELECT COUNT(*) FROM game_players WHERE game_id = ? AND turn_completed = FALSE`
   - Wenn 0 → Alle fertig!
5. **Rundenwechsel**:
   - `games.current_round += 1`
   - Alle `game_players.turn_completed = FALSE`
   - KI-Events generieren (basierend auf Aktionen der letzten Runde)
   - Marktpreise aktualisieren
   - NPC-Reaktionen berechnen
   - WebSocket-Broadcast: "Neue Runde hat begonnen!"

**Pseudocode (Backend):**

```javascript
async function onPlayerCompleteTurn(gameId, playerId) {
  // Markiere Spieler als fertig
  await db.query(
    'UPDATE game_players SET turn_completed = TRUE, last_turn_at = NOW() WHERE game_id = $1 AND id = $2',
    [gameId, playerId]
  );

  // Broadcast an alle Spieler
  io.to(`game_${gameId}`).emit('player_turn_completed', { playerId });

  // Check: Alle fertig?
  const pending = await db.query(
    'SELECT COUNT(*) FROM game_players WHERE game_id = $1 AND turn_completed = FALSE',
    [gameId]
  );

  if (pending.rows[0].count === '0') {
    // Alle fertig → Rundenwechsel!
    await processRoundTransition(gameId);
  }
}

async function processRoundTransition(gameId) {
  // Inkrement Round
  await db.query('UPDATE games SET current_round = current_round + 1 WHERE id = $1', [gameId]);

  // Reset turn_completed
  await db.query('UPDATE game_players SET turn_completed = FALSE WHERE game_id = $1', [gameId]);

  // KI-Events generieren
  await generateAIEvents(gameId);

  // Märkte aktualisieren
  await updateMarkets(gameId);

  // NPC-Reaktionen
  await processNPCReactions(gameId);

  // Broadcast neue Runde
  io.to(`game_${gameId}`).emit('new_round_started', {
    round: (await db.query('SELECT current_round FROM games WHERE id = $1', [gameId])).rows[0].current_round
  });
}
```

---

### 5. Timer-System (Ausbaustufe)

**Funktionalität:**
- Spiel-Admin kann Timer konfigurieren (z.B. 24h, 48h, 7 Tage)
- Deadline wird in `turn_timers` gespeichert
- Cronjob prüft regelmäßig Deadlines
- Warnung 2h vor Deadline (Email/Push-Benachrichtigung)
- Bei Deadline-Überschreitung:
  - **Option 1**: Auto-Pass (Spieler passt automatisch)
  - **Option 2**: KI übernimmt Zug
  - **Option 3**: Spieler wird aus Spiel entfernt (nur bei wiederholter Verletzung)

**Implementation:**

```javascript
// Cronjob (läuft alle 10 Minuten)
async function checkTurnDeadlines() {
  const now = new Date();

  // Finde ablaufende Timer
  const timers = await db.query(
    'SELECT * FROM turn_timers WHERE deadline <= $1 AND warning_sent = FALSE',
    [new Date(now.getTime() + 2 * 60 * 60 * 1000)] // 2h in Zukunft
  );

  for (const timer of timers.rows) {
    // Warnung senden
    await sendDeadlineWarning(timer.game_id, timer.round);
    await db.query('UPDATE turn_timers SET warning_sent = TRUE WHERE id = $1', [timer.id]);
  }

  // Finde überschrittene Deadlines
  const expired = await db.query(
    'SELECT * FROM turn_timers WHERE deadline <= $1',
    [now]
  );

  for (const timer of expired.rows) {
    await handleExpiredTurn(timer.game_id, timer.round);
  }
}
```

---

### 6. KI-Integration

**KI-Dienste:**

1. **Dialog-Generierung**: Claude/GPT für NPC-Dialoge
2. **Event-Generierung**: KI erstellt kontextabhängige Events
3. **Persönlichkeits-Engine**: Generiert und verwaltet NPC-Persönlichkeiten
4. **Story-Generierung**: Hintergrundgeschichten für Spieler

**API-Design:**

```javascript
class AIService {
  async generateNPCDialog(npcId, context) {
    const npc = await db.getNPC(npcId);
    const history = await db.getNPCMemory(npcId);

    const prompt = `
      Du bist ${npc.name}, ein ${npc.role} mit folgender Persönlichkeit:
      ${JSON.stringify(npc.personality)}

      Bisherige Interaktionen mit dem Spieler:
      ${JSON.stringify(history)}

      Aktuelle Situation: ${context.situation}

      Generiere eine Antwort die zur Persönlichkeit passt und die Geschichte berücksichtigt.
    `;

    const response = await callLLM(prompt);

    // Speichere Interaktion in NPC-Gedächtnis
    await db.addToNPCMemory(npcId, {
      player: context.playerId,
      situation: context.situation,
      response: response,
      timestamp: new Date()
    });

    return response;
  }

  async generateEvent(gameId, round) {
    const gameState = await db.getGameState(gameId);
    const recentActions = await db.getPlayerActions(gameId, round - 1);

    const prompt = `
      Basierend auf dem Spielzustand und den Aktionen der letzten Runde,
      generiere ein emergentes Event das logisch aus den Spieleraktionen folgt.

      Spielzustand: ${JSON.stringify(gameState)}
      Letzte Aktionen: ${JSON.stringify(recentActions)}
    `;

    const event = await callLLM(prompt);

    // Speichere Event
    await db.createEvent(gameId, round, event);

    return event;
  }
}
```

**Caching & Optimierung:**
- Häufige NPC-Reaktionen cachen (Redis)
- Batch-Requests für Event-Generierung
- Rate-Limiting für KI-API-Calls
- Fallback auf vorgenerierte Inhalte bei API-Ausfall

---

### 7. Echtzeit-Kommunikation (WebSockets)

**Events die gebroadcasted werden:**

```javascript
// Spieler tritt Spiel bei
socket.emit('player_joined', { playerId, username });

// Spieler hat Zug abgeschlossen
socket.emit('player_turn_completed', { playerId, username });

// Neue Runde hat begonnen
socket.emit('new_round_started', { round, events });

// Öffentliche Aktion (z.B. großer Handel)
socket.emit('public_action', { playerId, actionType, summary });

// Halböffentliche Info (Gerüchte)
socket.emit('rumor_spread', { rumor });

// Private Nachricht (nur für bestimmte Spieler)
socket.to(playerId).emit('secret_discovered', { secret });

// Timer-Warnung
socket.to(playerId).emit('deadline_warning', { hoursLeft });
```

**Client-Verbindung:**

```javascript
// Frontend
const socket = io(`ws://backend.com/api/games/${gameId}/live`, {
  auth: { token: jwtToken }
});

socket.on('player_turn_completed', (data) => {
  updateUI(`${data.username} hat seinen Zug abgeschlossen`);
});

socket.on('new_round_started', (data) => {
  loadNewRound(data.round);
  showEvents(data.events);
});
```

---

### 8. Skalierung & Performance

**Horizontale Skalierung:**
- Load Balancer vor mehreren API-Server-Instanzen
- Redis für Session-Sharing zwischen Instanzen
- Database Connection Pooling
- Stateless API-Design (JWT statt Server-Sessions)

**Datenbank-Optimierung:**
- Indizes auf `game_id`, `player_id`, `round`
- Partitionierung von `player_actions` nach `game_id`
- Archivierung abgeschlossener Spiele

**Caching-Strategie:**
- Redis Cache für:
  - Aktuellen Spielzustand (TTL: bis Rundenwechsel)
  - NPC-Daten (TTL: 1h)
  - Marktpreise (TTL: bis Rundenwechsel)
- Cache Invalidierung bei Rundenwechsel

---

### 9. Deployment-Architektur

**Empfohlene Infrastruktur:**

```
┌─────────────────┐
│   CDN/Cloudflare│ (Frontend Static Assets)
└────────┬────────┘
         │
┌────────▼────────┐
│  Load Balancer  │
└────────┬────────┘
         │
    ┌────┴────┬────────┬────────┐
    │         │        │        │
┌───▼───┐ ┌──▼───┐ ┌──▼───┐ ┌──▼───┐
│API #1 │ │API #2│ │API #3│ │API #4│
└───┬───┘ └──┬───┘ └──┬───┘ └──┬───┘
    │        │        │        │
    └────────┴────┬───┴────────┘
                  │
         ┌────────▼────────┐
         │  PostgreSQL     │ (Primary)
         │  + Read Replica │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │     Redis       │ (Cache/Sessions)
         └─────────────────┘
```

**Container-Orchestrierung:**
- Docker für alle Services
- Kubernetes oder Docker Swarm für Orchestrierung
- Separate Pods für: API, Worker (KI-Jobs), WebSocket-Server

---

### 10. Sicherheit

**Authentifizierung:**
- JWT mit kurzer Gültigkeit (15min)
- Refresh Tokens (gespeichert in httpOnly Cookies)
- OAuth2 für Social Login (optional)

**Autorisierung:**
- Spieler darf nur eigene Züge machen
- Spieler sieht nur eigene geheime Aktionen
- Admin-Rechte für Spiel-Creator

**Validierung:**
- Alle Spielzüge server-seitig validieren
- Rate-Limiting (z.B. max 100 Requests/Minute)
- Input-Sanitization gegen Injection-Attacks

**Geheime Aktionen:**
- Verschlüsselt in DB speichern (bis Aufdeckung)
- Nur sichtbar für Spieler der sie ausgeführt hat
- Aufdeckung triggert Entschlüsselung und Broadcast

---

### 11. Monitoring & Logging

**Metriken:**
- Anzahl aktiver Spiele
- Durchschnittliche Zugzeit
- API Response Times
- WebSocket Connection Count
- KI-API Call Rate & Kosten

**Logging:**
- Strukturiertes Logging (JSON)
- Log-Levels: ERROR, WARN, INFO, DEBUG
- Separate Logs für:
  - API Requests
  - Spieler-Aktionen
  - KI-Generierung
  - Fehler & Exceptions

**Tools:**
- Prometheus + Grafana für Metriken
- ELK Stack (Elasticsearch, Logstash, Kibana) für Logs
- Sentry für Error Tracking

---

## Implementierungs-Roadmap

### Phase 1: MVP (Minimum Viable Product)
- [ ] Basic Frontend (Spiel erstellen, beitreten, einfache Züge)
- [ ] Backend API (Authentifizierung, Spielverwaltung, Rundenwechsel)
- [ ] Datenbank-Setup
- [ ] WebSocket für Echtzeit-Updates
- [ ] Einfaches Rundenmanagement (ohne KI)

### Phase 2: KI-Integration
- [ ] NPC-System mit KI-generierten Dialogen
- [ ] Event-Generierung
- [ ] Persönlichkeits-Engine
- [ ] Emergente Narration

### Phase 3: Erweiterte Features
- [ ] Vollständiges Handelssystem
- [ ] Flottenmanagement
- [ ] Diplomatie-System
- [ ] Spionage-Mechaniken

### Phase 4: Ausbaustufe
- [ ] Timer-System
- [ ] Email/Push-Benachrichtigungen
- [ ] Mobile App (optional)
- [ ] Erweiterte Analytics

---

## Technologie-Entscheidungen

**Frontend:**
- **Empfehlung**: Next.js (React) mit TypeScript
- **Begründung**: SSR für SEO, gute DX, große Community, TypeScript für Typ-Sicherheit

**Backend:**
- **Empfehlung**: Node.js (NestJS) mit TypeScript
- **Alternative**: Python (FastAPI)
- **Begründung**: Gemeinsame Sprache mit Frontend, gute async-Performance, große Ökosystem

**Datenbank:**
- **Empfehlung**: PostgreSQL + Redis
- **Begründung**: JSONB für flexible Spielzustände, Redis für Caching

**Hosting:**
- **Empfehlung**: Vercel (Frontend) + Railway/Render (Backend)
- **Alternative**: AWS (komplett) oder DigitalOcean
- **Begründung**: Einfaches Deployment, Autoscaling, günstig für MVP

---

## Offene Fragen & Entscheidungen

1. **KI-Provider**: Claude vs. OpenAI vs. selbstgehostetes Modell?
2. **Mobile-First**: Native App oder responsive Web-App?
3. **Matchmaking**: Wie finden Spieler Spiele? (Lobby-System, Ranked, Casual)
4. **Monetarisierung**: Free-to-play mit Cosmetics? Einmaliger Kauf? Abo?
5. **Lokalisierung**: Mehrsprachigkeit von Anfang an?

---

**Version History:**
- **v1.0 (2025-11-17)**: Initial Draft für Online-Multiplayer Architektur
