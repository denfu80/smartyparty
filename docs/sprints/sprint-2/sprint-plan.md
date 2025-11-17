# Sprint 2 - Game Engine Basics

**Sprint-Zeitraum:** 2025-12-02 - 2025-12-15
**Status:** Completed
**Dauer:** 2 Wochen

---

## 🎯 Sprint Goal

**"Lauffähiges Game Engine Backend mit Rundenlogik, KI-Integration und UI-Komponenten-Bibliothek, sodass MVP-Features (Phase 1) entwickelt werden können"**

### Messbare Erfolgskriterien:
- ✅ Entwickler kann Rundenübergänge testen (alle Spieler ready → neue Runde startet)
- ✅ Gemini API liefert KI-generierte Dialoge über Cloud Function
- ✅ shadcn/ui Komponenten-Bibliothek ist installiert und dokumentiert
- ✅ Mindestens 1 Game-Layout (Dashboard + Game View) ist implementiert
- ✅ AI-Cache reduziert API-Calls messbar (Log-Analyse zeigt Cache-Hits)

---

## 📝 Stories

### Enabler (Technische Voraussetzungen)

Stories sind **parallel entwickelbar** (keine Abhängigkeiten untereinander):

#### 1. E-004: Turn Management System
- **Status**: Geplant
- **Priorität**: MUST-HAVE
- **Aufwand**: 3 Tage
- **Dependencies**: E-001 ✅, E-002 ✅ (Sprint 1)
- **Akzeptanzkriterien**: [siehe story-details.md](./story-details.md#e-004-turn-management-system)

#### 2. E-005: AI Integration Foundation
- **Status**: Geplant
- **Priorität**: MUST-HAVE
- **Aufwand**: 2-3 Tage
- **Dependencies**: E-001 ✅ (Sprint 1)
- **Akzeptanzkriterien**: [siehe story-details.md](./story-details.md#e-005-ai-integration-foundation)

#### 3. E-006: Basic UI Framework & Components
- **Status**: Geplant
- **Priorität**: MUST-HAVE
- **Aufwand**: 2 Tage
- **Dependencies**: E-001 ✅ (Sprint 1)
- **Akzeptanzkriterien**: [siehe story-details.md](./story-details.md#e-006-basic-ui-framework--components)

---

## ✅ Definition of Done (Sprint-Level)

Ein Sprint ist abgeschlossen wenn:

- [ ] **Alle Story-Akzeptanzkriterien erfüllt**
- [ ] **Code reviewed** (bei Multi-Person-Team: min. 1 Review pro Story)
- [ ] **Tests geschrieben und passing:**
  - Unit Tests für Turn Management State Machine
  - Integration Tests für AI Functions (mit Mocks)
  - UI Component Tests (optional für MVP)
- [ ] **Dokumentation aktualisiert:**
  - README.md mit Setup-Anleitung für neue Functions
  - API-Dokumentation für Cloud Functions
  - Style Guide für UI-Komponenten
- [ ] **Deployment erfolgreich:**
  - Cloud Functions deployed auf Firebase
  - Frontend deployed auf Firebase Hosting
  - Keine Breaking Changes für Sprint 1 Features
- [ ] **Keine kritischen Bugs:**
  - Round Management funktioniert fehlerfrei
  - AI Integration hat Error Handling
  - UI ist responsive ohne Layout-Breaks
- [ ] **Manuelle Tests durchgeführt:**
  - Turn-Zyklus mit 2+ Spielern getestet
  - AI-Dialog-Generierung getestet (mit echtem API Key)
  - UI-Navigation auf Mobile + Desktop getestet
- [ ] **Pull Request erstellt und gemerged** zu `main`

---

## ⚠️ Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| Race Conditions im Turn Management | Mittel | Hoch | Firestore Transactions für `allPlayersReady` Check nutzen |
| Gemini API Rate Limits | Niedrig | Mittel | Aggressive Caching (24h TTL), Free Tier ist großzügig (15/min) |
| API-Parsing-Fehler | Mittel | Mittel | Try-Catch mit Fallback-Responses, strukturierte Prompts |
| Turn Management Komplexität | Mittel | Hoch | Mit 3 States starten, später erweitern. State Machine dokumentieren |
| shadcn/ui Setup aufwendig | Niedrig | Niedrig | Offizielle Docs sind exzellent, nur Basis-Set installieren |
| Zeitdruck durch 3 parallele Stories | Mittel | Mittel | Stories sind unabhängig → können parallel entwickelt werden |
| Gemini API Kosten | Niedrig | Niedrig | Free Tier: 1.5M Tokens/Tag (sehr großzügig für MVP) |

---

## 🔗 Abhängigkeiten

### Externe Abhängigkeiten:
- ✅ **Firebase Projekt vorhanden** (Sprint 1)
- ✅ **Google Cloud Console Zugang** (Sprint 1)
- 🆕 **Gemini API Key** (https://ai.google.dev/)
- ✅ **GitHub Repository** (Sprint 1)

### Interne Abhängigkeiten:
- ✅ **Sprint 1 abgeschlossen** (E-001, E-002, E-003 ✅)
- **Keine Dependencies zwischen Sprint 2 Stories** → Parallel entwickelbar ✅

### Blockers:
- Keine bekannten Blockers

---

## 📊 Velocity & Planung

### Sprint-Planung:
- **Stories:** 3 Enabler
- **Story Points:** - (noch keine Velocity aus Sprint 1)
- **Geschätzter Aufwand:** 7-8 Tage
- **Sprint-Länge:** 14 Tage
- **Buffer:** ~45% ✅ (gut für Unvorhergesehenes)

### Empfohlene Reihenfolge:

**Woche 1 (Tag 1-7):**
- Tag 1-3: **E-005 AI Integration** (2-3 Tage) - Kann sofort starten
- Tag 1-4: **E-004 Turn Management** (3 Tage) - Kann parallel zu E-005
- Tag 5-7: **E-006 UI Components** (2 Tage) - Kann parallel nach Tag 2

**Woche 2 (Tag 8-14):**
- Tag 8-10: Testing, Bug Fixes, Integration
- Tag 11-12: Dokumentation, Code Review
- Tag 13: Final Testing, Deployment
- Tag 14: Buffer / Sprint Review Vorbereitung

**Parallele Entwicklung möglich:** Alle 3 Stories sind unabhängig voneinander ✅

---

## 🔀 Pull Request Requirements

### PR-Titel:
```
Sprint 2: Game Engine Basics (Turn Management, AI Integration, UI Framework)
```

### PR-Beschreibung Template:

```markdown
## Sprint 2 - Game Engine Basics

### 🎯 Sprint Goal
Lauffähiges Game Engine Backend mit Rundenlogik, KI-Integration und
UI-Komponenten-Bibliothek, sodass MVP-Features (Phase 1) entwickelt werden können.

### ✅ Umgesetzte Stories
- ✅ E-004: Turn Management System
- ✅ E-005: AI Integration Foundation
- ✅ E-006: Basic UI Framework & Components

### 🧪 Test Plan
**Turn Management:**
- [ ] 2 Spieler erstellen Game
- [ ] Spieler 1 markiert sich als ready
- [ ] Spieler 2 markiert sich als ready
- [ ] System startet automatisch neue Runde
- [ ] `currentRound` wird erhöht
- [ ] `playersReady` Array wird geleert

**AI Integration:**
- [ ] Cloud Function `generateNpcDialog` aufrufen
- [ ] Gemini API gibt Response zurück
- [ ] Response wird gecacht in `/ai-cache`
- [ ] Zweiter Call nutzt Cache (Log: "Cache HIT")
- [ ] Error Handling: API-Key entfernen → Fallback funktioniert

**UI Components:**
- [ ] Dashboard lädt mit GameLayout
- [ ] Navbar zeigt User-Avatar
- [ ] Sidebar-Navigation funktioniert
- [ ] Responsive: Layout passt sich an auf Mobile (< 768px)
- [ ] ResourceInventory Komponente rendert Dummy-Daten
- [ ] StationCard Komponente rendert Dummy-Daten

### 📸 Screenshots
[TODO: Screenshots von deployed App]
- Dashboard mit neuem Layout
- Game View mit Sidebar
- Mobile View

### 🔗 Deployed App
[Firebase Hosting URL]

### 📊 Metrics
- **Cache Hit Rate:** XX% (Ziel: >50% nach 10 Requests)
- **API Response Time:** ~XXXms (Gemini API)
- **UI Components:** 10 installiert, 2 Game-Components gebaut

### 📝 Dokumentation Updates
- [x] README.md: Setup-Anleitung für Gemini API Key
- [x] docs/architecture/: Cloud Functions Dokumentation
- [x] docs/style-guide.md: UI Component Guidelines

### 🚀 Next Steps
**Sprint 3 wird folgende Stories umfassen:**
- US-100: Basis-Ressourcensystem (Phase 1.1 Start)
- US-101: Ressourcenvorkommen
- US-102: Ressourcenproduktion

Oder weiter mit Phase 0 Enabler (abhängig von Team-Entscheidung).

### ⚠️ Known Issues
- [ ] Turn Timer noch nicht implementiert (optional für MVP, kommt später)
- [ ] AI Fallbacks sind simpel (werden in Phase 3 verfeinert)

---

**Branch:** `claude/plan-sptr-01GFYRPrgSrjKf6wScXZZLyj`
**Target:** `main`
**Sprint:** 2 (Phase 0.2)
**Zeitraum:** 2025-12-02 - 2025-12-15
```

---

## 📈 Success Metrics

### Messbare Ziele:
1. **Turn Management:**
   - ✅ 100% Success Rate für Rundenübergänge (keine Deadlocks)
   - ✅ < 500ms Latenz für `processRoundEnd` Function

2. **AI Integration:**
   - ✅ > 50% Cache Hit Rate nach 10 API-Calls
   - ✅ < 2s Response Time für Gemini API (P95)
   - ✅ 0 Crashes bei API-Fehlern (Fallbacks funktionieren)

3. **UI Components:**
   - ✅ 10+ shadcn/ui Komponenten installiert
   - ✅ 100% Responsive (keine Layout-Breaks auf Mobile)
   - ✅ 2+ Game-spezifische Komponenten dokumentiert

### Qualitätsziele:
- Code Coverage: > 60% für neue Functions (optional)
- 0 kritische Bugs im Deployment
- Dokumentation vollständig (README + Inline-Kommentare)

---

## 📚 Referenz-Dokumente

- [backlog-prioritized.md](../../backlog-prioritized.md) - Phase 0.2 Definition
- [user-stories.md](../../user-stories.md) - Detaillierte Story-Beschreibungen (E-004, E-005, E-006)
- [firebase-techstack.md](../../architecture/firebase-techstack.md) - Technische Implementierung
- [Sprint 1 Plan](../sprint-1/sprint-plan.md) - Vorheriger Sprint

---

## 🎉 Sprint Review Agenda (2025-12-16)

1. **Demo der Features** (30 min)
   - Turn Management Live-Demo (2 Spieler)
   - AI-Dialog-Generierung zeigen
   - UI-Komponenten-Bibliothek durchgehen

2. **Metrics Review** (10 min)
   - Cache Hit Rate zeigen
   - Performance Metrics

3. **Retrospektive** (20 min)
   - Was lief gut?
   - Was können wir verbessern?
   - Action Items für Sprint 3

---

**Erstellt:** 2025-11-17
**Letzte Aktualisierung:** 2025-11-17
**Sprint-Nummer:** 2
**Phase:** 0.2 (Technical Foundation - Game Engine Basics)
