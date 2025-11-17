# Sprint 2 - Game Engine Basics

**Status:** Geplant
**Zeitraum:** 2025-12-02 - 2025-12-15
**Dauer:** 2 Wochen

---

## 🎯 Quick Info

- **Sprint Goal:** Lauffähiges Game Engine Backend mit Rundenlogik, KI-Integration und UI-Komponenten-Bibliothek
- **Anzahl Stories:** 3 Enabler
- **Geschätzter Aufwand:** 7-8 Tage (45% Buffer)
- **Dependencies:** Sprint 1 ✅ abgeschlossen

---

## 📄 Dokumente

- [sprint-plan.md](./sprint-plan.md) - Vollständiger Sprint-Plan mit DoD, Risiken, Metrics
- [story-details.md](./story-details.md) - Detaillierte Akzeptanzkriterien & technische Umsetzung

---

## 📊 Progress

### Stories

- [ ] **E-004:** Turn Management System (3 Tage)
- [ ] **E-005:** AI Integration Foundation (2-3 Tage)
- [ ] **E-006:** Basic UI Framework & Components (2 Tage)

### Story Status Tracker

| Story | Status | Start | Ende | Notizen |
|-------|--------|-------|------|---------|
| E-004 | 📋 Geplant | - | - | - |
| E-005 | 📋 Geplant | - | - | - |
| E-006 | 📋 Geplant | - | - | - |

**Legende:** 📋 Geplant | 🚧 In Progress | ✅ Erledigt | ⚠️ Blocked

---

## ✅ Sprint-Checkliste

### Vor Sprint-Start
- [ ] Sprint 1 PR gemerged
- [ ] Gemini API Key besorgt (https://ai.google.dev/)
- [ ] Team hat Sprint-Plan gelesen
- [ ] Environment Setup dokumentiert

### Während Sprint
- [ ] Daily Stand-ups (optional bei kleinem Team)
- [ ] Code Reviews innerhalb 24h
- [ ] Blockers sofort kommunizieren
- [ ] Tests laufen grün

### Sprint-Ende
- [ ] Alle Akzeptanzkriterien erfüllt
- [ ] Dokumentation aktualisiert
- [ ] PR erstellt mit Template
- [ ] Deployed auf Firebase
- [ ] Sprint Review durchgeführt
- [ ] Retrospektive abgehalten

---

## 🧪 Test-Checkliste

### Turn Management
- [ ] 2 Spieler können Game erstellen
- [ ] Spieler 1 markiert sich als ready
- [ ] Spieler 2 markiert sich als ready
- [ ] System startet automatisch neue Runde
- [ ] `currentRound` wird erhöht
- [ ] `playersReady` Array wird geleert

### AI Integration
- [ ] `generateNpcDialog` Function deployed
- [ ] API gibt Response zurück
- [ ] Response wird gecacht
- [ ] Zweiter Call nutzt Cache (Log: "Cache HIT")
- [ ] Error Handling funktioniert (Test: API-Key entfernen)

### UI Components
- [ ] shadcn/ui ist installiert (min. 10 Komponenten)
- [ ] GameLayout rendert korrekt
- [ ] Navbar zeigt User-Avatar
- [ ] Sidebar-Navigation funktioniert
- [ ] Responsive: Mobile Layout (< 768px) funktioniert
- [ ] ResourceInventory Komponente funktioniert
- [ ] StationCard Komponente funktioniert

---

## 📈 Metrics

### Ziele

| Metric | Ziel | Aktuell | Status |
|--------|------|---------|--------|
| Cache Hit Rate | > 50% | - | 📋 |
| API Response Time (P95) | < 2s | - | 📋 |
| UI Components | 10+ | - | 📋 |
| Turn Processing Latency | < 500ms | - | 📋 |
| Code Coverage | > 60% | - | 📋 |

### Velocity
- **Sprint 1 Velocity:** - (baseline wird nach Sprint 2 bekannt)
- **Sprint 2 Geplant:** 3 Stories
- **Sprint 2 Abgeschlossen:** - / 3

---

## 🚨 Blockers & Risiken

### Aktuelle Blockers
_Keine_

### Tracking
| Blocker | Impact | Seit | Resolution |
|---------|--------|------|------------|
| - | - | - | - |

### Top Risiken
1. **Race Conditions im Turn Management** → Firestore Transactions nutzen
2. **Gemini API Rate Limits** → Aggressive Caching (24h TTL)
3. **Zeitdruck durch 3 parallele Stories** → Stories sind unabhängig

---

## 🔗 Links

### Externe
- [Gemini API Docs](https://ai.google.dev/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Firestore Transactions](https://firebase.google.com/docs/firestore/manage-data/transactions)

### Intern
- [Backlog (Phase 0.2)](../../backlog-prioritized.md#phase-02-game-engine-basics)
- [Firebase Architektur](../../architecture/firebase-techstack.md)
- [Sprint 1 Plan](../sprint-1/sprint-plan.md)

---

## 📝 Notizen

### Wichtige Entscheidungen
- Turn Timer ist **optional** für MVP (kommt in späterem Sprint)
- Backstories werden **nicht gecacht** (müssen unique sein)
- Dialoge werden **24h gecacht** (Kosten-Optimierung)
- shadcn/ui als UI-Library gewählt (Copy-Paste statt NPM)

### Lessons Learned
_Wird nach Sprint Review gefüllt_

---

**Erstellt:** 2025-11-17
**Letzte Aktualisierung:** 2025-11-17
