# Sternenhaus - Architektur-Dokumentation

Dieses Verzeichnis enthält die technische Architektur-Dokumentation für das Sternenhaus-Projekt.

## 📁 Dokumente

### [firebase-techstack.md](./firebase-techstack.md)
**Die Haupt-Architektur-Dokumentation** (gewählter Tech-Stack)

Vollständige Beschreibung der Firebase-basierten Architektur inklusive:
- System-Architektur-Diagramm
- Firestore Datenbank-Schema (alle Collections)
- Cloud Functions Struktur
- Frontend-Architektur (Next.js)
- Kosten-Kalkulation & Optimierungen
- Deployment-Anleitung
- Security Best Practices
- Monitoring & Logging

**Status:** ✅ Aktive Architektur-Entscheidung

---

## 🎯 Architektur-Entscheidung

### Gewählter Stack: Firebase Ecosystem

```
Frontend:     React 18 + Next.js 14 (App Router)
Backend:      Firebase Cloud Functions (Gen 2)
Datenbank:    Cloud Firestore
Auth:         Firebase Authentication
Hosting:      Firebase Hosting
KI/LLM:       Google Gemini 1.5 Flash API
Real-time:    Firestore Real-time Listeners
```

### Warum Firebase?

1. **Native Real-time Capabilities** - Firestore bietet out-of-the-box Realtime-Synchronisation
2. **Google Ecosystem** - Nahtlose Integration mit Gemini API
3. **Generous Free Tier** - Kostenlos bis ~50-100 aktive Spieler
4. **Skalierbarkeit** - Pay-as-you-go Model für Wachstum
5. **Developer Experience** - Einfaches Setup, gute Dokumentation
6. **Zero DevOps** - Managed Services, kein Server-Management

---

## 📊 Kosten-Übersicht

### Free Tier (Spark Plan)
- **Kosten:** €0 / Monat
- **Kapazität:** ~50-100 aktive Spieler
- **Firestore:** 50k Reads, 20k Writes/Tag
- **Functions:** 2M Invocations/Monat
- **Gemini API:** 1.5M Tokens/Tag

### Skalierung (Blaze Plan)
- **500 aktive Spieler:** ~€5-6 / Monat
- **1000 aktive Spieler:** ~€12-15 / Monat

Detaillierte Berechnungen siehe [firebase-techstack.md](./firebase-techstack.md#-kosten-kalkulation-firebase)

---

## 🏗️ Haupt-Komponenten

### 1. Frontend (Next.js)
- **Location:** `/` (Root-Verzeichnis)
- **Framework:** Next.js 14 (App Router)
- **UI:** React 18 + Tailwind CSS + shadcn/ui
- **State:** React Context + Firestore Realtime Listeners

### 2. Backend (Cloud Functions)
- **Location:** `/functions/`
- **Runtime:** Node.js 20
- **Framework:** Firebase Functions Gen 2
- **Region:** europe-west1

**Hauptfunktionen:**
- `processRoundEnd` - Rundenende-Logik
- `executeTrade` - Handel mit NPCs
- `generateNpcDialog` - KI-Dialog-Generierung
- `generateBackstory` - Spieler-Hintergrundgeschichte

### 3. Datenbank (Firestore)
**Collections:**
```
/games/{gameId}
  /players/{playerId}
  /npcs/{npcId}
  /stations/{stationId}
  /transactions/{transactionId}
  /events/{eventId}
  /sectors/{sectorId}

/users/{userId}
/ai-cache/{cacheKey}
```

Vollständiges Schema siehe [firebase-techstack.md](./firebase-techstack.md#-firestore-datenbank-schema)

### 4. KI-Integration (Gemini)
- **Model:** gemini-1.5-flash (kostenlos)
- **Use Cases:**
  - NPC-Dialoge generieren
  - Spieler-Backstories generieren
  - Game-Events generieren
  - Markt-Ereignisse generieren

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 20
npm >= 10
Firebase CLI
```

### Setup
```bash
# 1. Firebase CLI installieren
npm install -g firebase-tools

# 2. Firebase Login
firebase login

# 3. Projekt clonen
git clone <repo-url>
cd sternenhaus

# 4. Dependencies installieren
npm install
cd functions && npm install && cd ..

# 5. Environment Variables setzen
cp .env.example .env.local
# .env.local bearbeiten (Firebase Config + Gemini API Key)

# 6. Firebase Emulators starten (lokal testen)
firebase emulators:start

# 7. Next.js Dev Server
npm run dev
```

Detaillierte Setup-Anleitung siehe [firebase-techstack.md](./firebase-techstack.md#-deployment)

---

## 📝 Development Workflow

### Lokale Entwicklung
```bash
# Terminal 1: Firebase Emulators
firebase emulators:start

# Terminal 2: Next.js Dev Server
npm run dev

# App läuft auf:
# - Frontend: http://localhost:3000
# - Firestore UI: http://localhost:4000
# - Functions: http://localhost:5001
```

### Deployment
```bash
# 1. Build Next.js
npm run build
npm run export

# 2. Deploy alles
firebase deploy

# Oder einzeln:
firebase deploy --only firestore:rules
firebase deploy --only functions
firebase deploy --only hosting
```

---

## 🔐 Security

### Firestore Security Rules
- **Location:** `/firestore.rules`
- **Principle:** Least Privilege
- Spieler können nur ihre eigenen Daten schreiben
- Sensible Daten (NPCs, Events) nur via Cloud Functions

### API Keys
- **Frontend:** Nur Public API Keys (NEXT_PUBLIC_*)
- **Backend:** Gemini API Key nur in Cloud Functions
- **Environment:** Nutze `.env.local` (nicht committen!)

---

## 📚 Weitere Dokumentation

### Projekt-Dokumentation
- [README.md](../../README.md) - Projekt-Übersicht
- [docs/user-stories.md](../user-stories.md) - Feature-Spezifikationen
- [docs/backlog-prioritized.md](../backlog-prioritized.md) - Entwicklungs-Roadmap
- [docs/design-goals.md](../design-goals.md) - Design-Prinzipien

### Externe Ressourcen
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)

---

## 🤝 Contribution Guidelines

### Architektur-Änderungen
Größere Architektur-Änderungen sollten:
1. Als separates Dokument in diesem Ordner dokumentiert werden
2. Mit dem Team reviewed werden
3. Die Kosten-Auswirkungen berücksichtigen
4. Migrations-Strategie beinhalten

### Naming Conventions
- **Collections:** Plural, lowercase (z.B. `games`, `players`)
- **Fields:** camelCase (z.B. `currentRound`, `isReady`)
- **Functions:** camelCase, Verb-first (z.B. `processRoundEnd`, `executeTrade`)
- **Types/Interfaces:** PascalCase (z.B. `Game`, `Player`, `TradeOffer`)

---

## ❓ FAQ

### Warum nicht Supabase/PostgreSQL?
Firebase wurde gewählt wegen:
- Native Realtime-Fähigkeiten (keine zusätzliche Komplexität)
- Bessere Gemini-Integration (Google Ecosystem)
- Einfacheres Security-Model für Multiplayer
- Generous Free Tier

### Kann ich später migrieren?
Ja! Die Business-Logik ist in Services abstrahiert.
Eine Migration zu einem anderen Stack (z.B. Supabase) wäre möglich,
erfordert aber Anpassungen in:
- Datenbank-Queries (Firestore → PostgreSQL)
- Real-time Listeners (Firestore → Supabase Realtime)
- Cloud Functions → Edge Functions oder eigener Server

### Wie skalierbar ist das?
- **0-100 Spieler:** Kostenlos
- **100-1000 Spieler:** ~€10-15/Monat
- **1000-10.000 Spieler:** ~€50-100/Monat
- **10.000+ Spieler:** Zeit für CDN, Caching-Layer, ggf. Refactoring

Firestore skaliert problemlos auf Millionen von Dokumenten.
Bei sehr hohen Reads/Writes können Kosten steigen → dann Optimierungen.

### Wie teste ich lokal?
Firebase Emulators erlauben vollständiges lokales Testen:
```bash
firebase emulators:start
```
- Firestore, Functions, Auth, Storage laufen lokal
- Keine Kosten, keine Cloud-Verbindung nötig
- Perfekt für Development

---

## 📅 Version History

### Version 1.0 (2025-11-17)
- Initiale Architektur-Dokumentation
- Firebase Stack gewählt
- Firestore Schema definiert
- Cloud Functions Struktur geplant
- Kosten-Kalkulation erstellt

---

## 📧 Kontakt

Bei Fragen zur Architektur:
- GitHub Issues erstellen
- Tech-Lead kontaktieren

---

**Letzte Aktualisierung:** 2025-11-17
