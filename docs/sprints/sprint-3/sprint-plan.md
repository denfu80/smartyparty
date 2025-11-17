# Sprint 3 - Resource & Economy Foundation

**Sprint-Zeitraum:** 2025-12-16 - 2025-12-29
**Status:** Geplant
**Dauer:** 2 Wochen

---

## 🎯 Sprint Goal

**"Spielbares Wirtschafts-Fundament mit Territorium und Ressourcenproduktion, sodass Spieler Stationen kontrollieren und pro Runde Ressourcen generieren können"**

### Messbare Erfolgskriterien:
- ✅ Spieler kann Stationen auf einer Karte sehen und besitzen
- ✅ Spieler kann Stationen kaufen (friedliche Übernahme)
- ✅ Jede Station produziert 1-2 Ressourcentypen automatisch pro Runde
- ✅ Spieler sieht sein Ressourcen-Inventar mit 5 Ressourcen
- ✅ Nach Rundenende wird Produktion automatisch ins Inventar gelegt

---

## 📝 Stories

### User Stories (nach logischer Reihenfolge)

#### 1. US-020: Basis-Stationskontrolle ⭐
- **Status:** Geplant
- **Priorität:** MUST-HAVE
- **Aufwand:** 2 Tage
- **Dependencies:** Keine
- **Akzeptanzkriterien:** [siehe story-details.md](./story-details.md#us-020-basis-stationskontrolle)

#### 2. US-100: Basis-Ressourcensystem ⭐
- **Status:** Geplant
- **Priorität:** MUST-HAVE
- **Aufwand:** 2 Tage
- **Dependencies:** Keine
- **Akzeptanzkriterien:** [siehe story-details.md](./story-details.md#us-100-basis-ressourcensystem)

#### 3. US-101: Ressourcenvorkommen (vereinfacht) ⭐
- **Status:** Geplant
- **Priorität:** MUST-HAVE
- **Aufwand:** 1.5 Tage
- **Dependencies:** US-020 ✅, US-100 ✅
- **Akzeptanzkriterien:** [siehe story-details.md](./story-details.md#us-101-ressourcenvorkommen-vereinfacht)

#### 4. US-102: Basis-Ressourcenproduktion ⭐
- **Status:** Geplant
- **Priorität:** MUST-HAVE
- **Aufwand:** 1.5 Tage
- **Dependencies:** US-101 ✅, US-020 ✅
- **Akzeptanzkriterien:** [siehe story-details.md](./story-details.md#us-102-basis-ressourcenproduktion)

---

## ✅ Definition of Done (Sprint-Level)

Ein Sprint ist abgeschlossen wenn:

- [ ] **Alle Story-Akzeptanzkriterien erfüllt**
- [ ] **Code reviewed und gemergt**
  - Mindestens 1 Review bei Multi-Person-Team
  - Alle Kommentare addressiert
- [ ] **Tests geschrieben und passing:**
  - Unit Tests für Ressourcen-Logik
  - Integration Tests für Production-Berechnung
  - Manual Tests dokumentiert
- [ ] **Dokumentation aktualisiert:**
  - README.md mit Game-Setup-Anleitung
  - Ressourcen-Typen dokumentiert
  - Station-Seeding dokumentiert
- [ ] **Deployment erfolgreich (Firebase):**
  - Frontend deployed auf Firebase Hosting
  - Cloud Functions deployed (processRoundEnd erweitert)
  - Keine Breaking Changes für Sprint 1+2 Features
- [ ] **Spielbarkeit getestet:**
  - Mindestens 1 vollständige Spielrunde mit 2 Spielern
  - Stationen können gekauft werden
  - Produktion funktioniert über 3+ Runden
  - Inventar-Kapazität wird respektiert
- [ ] **Keine kritischen Bugs:**
  - Ressourcen-Berechnung korrekt
  - Karten-Visualisierung funktioniert
  - Keine UI-Breaks auf Mobile
- [ ] **Pull Request erstellt und gemerged**

---

## ⚠️ Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| Karten-Visualisierung komplex | Mittel | Mittel | Simple 2D Grid nutzen (CSS Grid), keine fancy SVG/Canvas |
| Ressourcen-Balancing schwierig | Mittel | Niedrig | Fixe Werte für MVP, Balancing in Sprint 4-6 |
| Kapazität zu restriktiv | Niedrig | Niedrig | 500 Einheiten ist großzügig, später anpassbar |
| Production-Logik fehleranfällig | Mittel | Hoch | Unit Tests schreiben, mit 2 Spielern + 3 Runden testen |
| Station-Kauflogik unklar | Niedrig | Niedrig | Einfache Formel: `Preis = strategicValue × 1000 Credits` |
| UI-Performance bei 8 Stationen | Niedrig | Niedrig | React optimal für 8 Komponenten, kein Problem |
| Integration mit E-004 Turn System | Niedrig | Mittel | E-004 aus Sprint 2 ist getestet, nur erweitern |

---

## 🔗 Abhängigkeiten

### Externe Abhängigkeiten:
- ✅ Firebase Projekt (Sprint 1)
- ✅ Cloud Functions deployed (Sprint 2)
- ✅ Turn Management System (E-004, Sprint 2)

### Interne Abhängigkeiten:
- **Story-Dependencies:**
  - US-020 & US-100: Keine Dependencies → **können parallel entwickelt werden** ✅
  - US-101: Benötigt US-020 + US-100
  - US-102: Benötigt US-101

### Blockers:
- Keine bekannten Blockers

---

## 📊 Velocity

- **Stories:** 4 User Stories
- **Story Points:** - (keine Story Points, nutzen Tage-Schätzung)
- **Geschätzter Aufwand:** 7 Tage
- **Sprint-Länge:** 14 Tage
- **Buffer:** 50% (~7 Tage) ✅

### Velocity aus vorherigen Sprints:
- **Sprint 1:** 4 Stories, ~7 Tage → Erfolgreich ✅
- **Sprint 2:** 3 Stories, ~7 Tage → Erfolgreich ✅
- **Sprint 3:** 4 Stories, ~7 Tage → **Passt zur Velocity** ✅

---

## 🗓️ Empfohlene Umsetzungsreihenfolge

**Woche 1 (Tag 1-7):**
- **Tag 1-2:** US-020 (Stationskontrolle) + US-100 (Ressourcensystem) **parallel**
  - Developer A: Karte + Stationen
  - Developer B: Ressourcen + Inventar
  - Beide unabhängig, keine Konflikte ✅

**Woche 2 (Tag 3-7):**
- **Tag 3-4:** US-101 (Ressourcenvorkommen)
  - Benötigt US-020 + US-100 als Basis
- **Tag 5-6:** US-102 (Ressourcenproduktion)
  - Benötigt US-101
- **Tag 7:** Integration Testing + Bug Fixes

**Buffer (Tag 8-14):**
- Dokumentation schreiben
- Code Review
- Manual Testing (komplette Spielrunde)
- Deployment + Smoke Tests
- Sprint Review vorbereiten

---

## 🎯 Sprint Success Metrics

### Messbare Ziele:
1. **Territorium:**
   - ✅ 100% der Spieler können Stationen sehen und kaufen
   - ✅ 0 Fehler bei Station-Besitzwechsel

2. **Ressourcen:**
   - ✅ 5 Ressourcentypen verfügbar
   - ✅ 100% korrekte Produktionsberechnung (keine Verluste/Duplikate)
   - ✅ Kapazitätslimit wird in 100% der Fälle respektiert

3. **UI/UX:**
   - ✅ Karte rendert in < 500ms (8 Stationen)
   - ✅ Responsive auf Mobile + Desktop (keine Breaks)
   - ✅ Alle Interaktionen funktionieren (Kauf, Inventory-View)

4. **Spielbarkeit:**
   - ✅ Mindestens 1 komplettes Testspiel (2 Spieler, 5+ Runden)
   - ✅ Spieler können wirtschaftliche Entscheidungen treffen

---

## 🔀 Pull Request Requirements

**Branch:** `claude/sprint-3-implementation` (zu erstellen)
**Target:** `main`

### PR-Titel:
```
Sprint 3: Resource & Economy Foundation (Territory + Production)
```

### PR-Beschreibung Template:

```markdown
## Sprint 3 - Resource & Economy Foundation

### 🎯 Sprint Goal
Spielbares Wirtschafts-Fundament mit Territorium und Ressourcenproduktion,
sodass Spieler Stationen kontrollieren und pro Runde Ressourcen generieren können.

### ✅ Umgesetzte Stories
- ✅ US-020: Basis-Stationskontrolle
- ✅ US-100: Basis-Ressourcensystem
- ✅ US-101: Ressourcenvorkommen (vereinfacht)
- ✅ US-102: Basis-Ressourcenproduktion

### 🧪 Test Plan
**Territorium:**
- [ ] 8 Stationen werden auf Karte angezeigt
- [ ] Spieler startet mit 1 Station
- [ ] Spieler kann andere Station kaufen (genug Credits vorhanden)
- [ ] Kaufpreis korrekt berechnet (strategicValue × 1000)
- [ ] Besitzer wechselt korrekt

**Ressourcen:**
- [ ] 5 Ressourcentypen sichtbar im Inventar
- [ ] Startressourcen korrekt (Metalle: 10, Energie: 20, etc.)
- [ ] Kapazitätslimit (500) wird angezeigt
- [ ] Überschuss wird abgeschnitten

**Produktion:**
- [ ] Station mit Metall-Vorkommen produziert pro Runde
- [ ] Produktion landet im Inventar nach Rundenende
- [ ] ProductionSummary zeigt korrekte Vorschau
- [ ] 3 Runden gespielt ohne Fehler

### 📸 Screenshots
[TODO: Screenshots]
- GameMap mit 8 Stationen
- StationCard mit Ressourcen-Vorkommen
- ResourceInventory mit 5 Ressourcen
- ProductionSummary nach Runde

### 🔗 Deployed App
[Firebase Hosting URL]

### 📊 Metrics
- **Karten-Performance:** XXms (Ziel: <500ms)
- **Produktions-Genauigkeit:** 100% (0 Fehler in Tests)
- **UI-Tests:** Mobile + Desktop ✅

### 📝 Dokumentation Updates
- [x] README.md: Ressourcen-System erklärt
- [x] Station-Seeding dokumentiert
- [x] Game-Setup-Anleitung erweitert

### 🚀 Next Steps
**Sprint 4 wird folgende Stories umfassen:**
- US-300: Basis-Reputationssystem
- US-320: Basis-Einflusssystem
- US-001: Basis-NPC-Persönlichkeiten (vordefiniert)

---

**Branch:** `claude/sprint-3-implementation`
**Target:** `main`
**Sprint:** 3 (Phase 1.1)
**Zeitraum:** 2025-12-16 - 2025-12-29
```

---

## 📚 Referenz-Dokumente

- [backlog-prioritized.md](../../backlog-prioritized.md) - Phase 1.1 Definition
- [user-stories.md](../../user-stories.md) - Detaillierte Story-Beschreibungen (US-020, US-100, US-101, US-102)
- [firebase-techstack.md](../../architecture/firebase-techstack.md) - Technische Implementierung
- [Sprint 2 Plan](../sprint-2/sprint-plan.md) - Vorheriger Sprint

---

## 🎉 Sprint Review Agenda (2025-12-30)

1. **Demo der Features** (30 min)
   - GameMap mit 8 Stationen zeigen
   - Station kaufen (Live-Demo)
   - Ressourcen-Inventar durchgehen
   - Rundenende → Produktion → Inventar aktualisiert

2. **Metrics Review** (10 min)
   - Performance-Daten
   - Test-Coverage
   - Bug-Count

3. **Retrospektive** (20 min)
   - Was lief gut?
   - Was können wir verbessern?
   - Action Items für Sprint 4

---

**Erstellt:** 2025-11-17
**Letzte Aktualisierung:** 2025-11-17
**Sprint-Nummer:** 3
**Phase:** 1.1 (Resource & Economy Foundation)
