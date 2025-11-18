# Roadmap Reorganization - Executive Summary

**Datum:** 2025-11-18
**Initiator:** Product Owner
**Grund:** Bestehende Roadmap liefert zu wenig erlebbaren Value zu früh

---

## 🎯 Problem Statement

### Ausgangslage
Nach 3 abgeschlossenen Sprints haben wir:
- ✅ Solide technische Foundation (Auth, Database, AI, Turn Management)
- ✅ Ressourcensystem implementiert
- ✅ Stationen auf Karte
- ✅ Produktions-Berechnung

### Das Problem
> **"Vieles läuft im Hintergrund, man kann wenig davon wirklich erleben"**

**Konkrete Symptome:**
- AI-Integration komplett unsichtbar (keine NPCs in UI)
- Ressourcen werden produziert, aber können nicht genutzt werden
- Turn Management funktioniert, aber Nutzer versteht nicht was passiert
- Stationen sind kaufbar, aber strategischer Wert ist unklar

**Impact:**
- Nutzer sieht nach Sprint 3 nur: Karte, Zahlen, "Runde beenden" Button
- Kein geschlossener Game-Loop
- Investment in Features (z.B. AI) bringt 0 erlebbaren Value
- Motivation sinkt ("Was soll ich hier tun?")

---

## 💡 Lösung: Vertical Slice Approach

### Neue Planungs-Prinzipien

#### 1. Vertical Slice First
**Jede Story = End-to-End Feature**
- UI + Backend + Datenbank in EINER Story
- Nutzer kann Feature SOFORT nutzen und Feedback geben
- Keine "Backend fertig, UI kommt später"

#### 2. Keine Enabler ohne Not
**Infrastruktur nur wenn absolut nötig**
- Baue Infrastruktur INNERHALB von Features
- Akzeptiere temporäre Lösungen für schnelles Feedback
- Refactoring wenn blockierend, nicht präventiv

#### 3. Jede Story = Erlebbarer Value
**Standalone-Test:**
"Wenn wir nach dieser Story stoppen, haben Nutzer trotzdem Mehrwert?"
- Ja → Story ist gut geschnitten
- Nein → Story muss umgeschnitten werden

#### 4. Temporäre Features erlaubt
**Quick & Dirty ist OK**
- Template-Dialoge JETZT → KI-Dialoge SPÄTER
- Fixe Preise JETZT → Dynamische Preise SPÄTER
- Dokumentiere temporäre Lösungen klar

#### 5. Sichtbarmachung bereits gebauter Features
**Erstelle Stories um Bestehendes sichtbar zu machen**
- Höchste Priorität (Code ist schon da!)
- Quick Wins in 1-4 Stunden
- Sofortiger Value

#### 6. Keine Phasen, nur Value-Inkrement
**Priorisierung nach Value, nicht nach "Phase"**
- Flexibel: Stories können umpriorisiert werden
- Themes optional zur Übersicht
- Kein Warten auf "Phase-Ende"

---

## 📦 Deliverables

### 1. Product Planning Principles
**Datei:** `docs/product-planning-principles.md`

**Inhalt:**
- 7 Planungs-Prinzipien detailliert erklärt
- Story-Schnitt Checkliste
- Anti-Patterns zu vermeiden
- Beispiele: Alt vs. Neu
- Review-Prozess & Definition of Done

**Verwendung:**
- Weitergeben an neue Team-Mitglieder
- Workshop-Material
- Referenz bei Story-Detaillierung

---

### 2. Roadmap Analysis
**Datei:** `docs/roadmap-analysis.md`

**Inhalt:**
- Bestandsaufnahme: Was ist in Sprint 1-3 implementiert?
- Problem-Analyse: Was ist unsichtbar?
- Vertikale Schnitte: Was fehlt für Erlebbarkeit?
- **Quick Wins:** 4 Stories mit 1-4h Aufwand, sofortiger Value
- Vergleich: Alte vs. Neue Roadmap (17 Wochen → 1 Woche bis KI erlebbar)

**Key Insights:**
- **Quick Win 1:** NPC-Dialog Demo (2-4h) → AI wird sichtbar
- **Quick Win 2:** Ressourcen-Verkauf (3-4h) → Game Loop geschlossen
- **Quick Win 3:** Station-Wert Tooltips (1-2h) → Kaufentscheidungen verständlich
- **Quick Win 4:** Runden-Feedback (2-3h) → Turn Management transparent

**Verwendung:**
- Sprint 4 Planung (Quick Wins)
- Argumentationsbasis für Stakeholder
- Lessons Learned

---

### 3. Product Roadmap - Vertical Slices
**Datei:** `docs/product-roadmap-vertical-slices.md`

**Inhalt:**
- **20 detaillierte Vertical Slices** (6 Wochen)
- Stories gruppiert nach Themes (optional)
- Priorisierung nach Value × Effort × Dependencies × Risk
- Sprint-Empfehlungen (Sprints 4-9)
- 60+ weitere Stories im Backlog (grob skizziert)

**Struktur:**
```
Theme: Quick Wins (Week 1) - 4 Stories ⚡
Theme: Wirtschafts-Loop (Week 2) - 3 Stories 💰
Theme: Beziehungen (Week 3) - 3 Stories 🤝
Theme: Multiplayer (Week 4) - 3 Stories 👥
Theme: Strategische Tiefe (Week 5) - 3 Stories 🧠
Theme: Progression (Week 6) - 4 Stories 📈
```

**Top Priorities:**
1. **VS-001:** Verkaufe Ressourcen (3-4h, Score: 9.5)
2. **VS-002:** NPC-Dialog (2-4h, Score: 9.8)
3. **VS-003:** Station-Wert Breakdown (1-2h, Score: 8.5)
4. **VS-004:** Runden-Summary (2-3h, Score: 8.0)

**Verwendung:**
- AKTIVE Roadmap (ersetzt backlog-prioritized.md)
- Sprint-Planung
- Stakeholder-Kommunikation

---

## 🔄 Änderungen zur bisherigen Roadmap

### Alt: Phasenbasierte Roadmap
```
Phase 0: Technical Foundation (6 Wochen)
  → Nutzer sieht: Login, leere UI
  → Value: MINIMAL

Phase 1: MVP Core Loop (4 Wochen)
  → Nutzer sieht: Ressourcen, Stationen
  → Value: NIEDRIG (kann nichts damit tun)

Phase 2: Multiplayer (3 Wochen)
  → Nutzer kann: Mit anderen spielen
  → Value: MITTEL (aber immer noch wenig zu tun)

Phase 3: AI Enhancement (4 Wochen)
  → Nutzer erlebt: KI-Dialoge ENDLICH!
  → Value: HOCH

GESAMT: 17 Wochen bis KI erlebbar
```

### Neu: Value-First Roadmap
```
Week 1: Quick Wins
  → VS-001-004: Handel, NPCs, Verständnis
  → Value: SEHR HOCH

Week 2: Wirtschaft
  → VS-005-007: Aktiver Handel
  → Value: SEHR HOCH

Week 3: Beziehungen
  → VS-008-010: Reputation mechanisch relevant
  → Value: HOCH

Week 4: Multiplayer
  → VS-011-013: Gemeinsam spielen
  → Value: SEHR HOCH

GESAMT: 1 Woche bis KI erlebbar
        4 Wochen bis Multiplayer
        6 Wochen bis Progression
```

### Impact
- **Time-to-Value:** 17 Wochen → 1 Woche (für KI)
- **Feedback-Zyklen:** Früher und häufiger
- **Risiko-Reduktion:** Validierung nach jeder Story
- **Motivation:** Jede Woche etwas Neues erleben

---

## 📊 Vergleich: Alte vs. Neue Stories

### Beispiel 1: NPC-Dialoge

#### Alt (Horizontal Slices)
```
Sprint 2: E-005: AI Integration Foundation
  → Backend fertig, keine UI
  → Nutzer sieht: Nichts

Sprint X (später): US-001: NPC-Persönlichkeiten
  → NPCs definiert, keine UI
  → Nutzer sieht: Nichts

Sprint Y (noch später): US-002: Dynamische Dialoge
  → ENDLICH UI!
  → Nutzer erlebt: KI-Dialoge

WARTEZEIT: Mehrere Sprints (Wochen/Monate)
```

#### Neu (Vertical Slice)
```
Sprint 4: VS-002: Spreche mit 1 NPC
  → UI: NpcCard, DialogModal
  → Backend: Nutze BESTEHENDE generateNpcDialog Function
  → Nutzer erlebt: KI-Dialoge SOFORT

WARTEZEIT: 0 (nutzt bestehendes Backend)
AUFWAND: 2-4 Stunden
```

### Beispiel 2: Handel

#### Alt (Horizontal Slices)
```
Sprint 3: US-100: Ressourcensystem
  → Ressourcen werden angezeigt
  → Nutzer kann: Ansehen (nicht nutzen)

Sprint X: US-200: Handelssystem
  → Backend für Handel
  → Nutzer kann: Immer noch nicht handeln

Sprint Y: US-200 UI
  → ENDLICH Handels-UI
  → Nutzer kann: Handeln

WARTEZEIT: Mehrere Sprints
```

#### Neu (Vertical Slice)
```
Sprint 4: VS-001: Verkaufe Ressourcen
  → UI: Button "Verkaufen" in ResourceInventory
  → Backend: sellResources Function
  → Nutzer kann: SOFORT verkaufen & Credits verdienen

WARTEZEIT: 0
AUFWAND: 3-4 Stunden
```

---

## 🚀 Empfohlenes Vorgehen

### Sofort (Diese Woche)
1. ✅ **Dokumente teilen** mit Team
2. ⚠️ **Workshop** (1h): Prinzipien erklären, Fragen klären
3. ⚠️ **Sprint 4 planen:** Quick Wins (VS-001 bis VS-004)
4. ⚠️ **VS-001 & VS-002 starten** (höchste Priorität)

### Week 1 (Sprint 4)
- Implementiere VS-001 (Ressourcen verkaufen)
- Implementiere VS-002 (NPC-Dialog)
- Implementiere VS-003 (Station-Wert)
- Implementiere VS-004 (Runden-Summary)
- **Deploy & User-Testing**
- **Retrospektive:** Velocity messen, Feedback sammeln

### Week 2-6
- Folge neuer Roadmap (product-roadmap-vertical-slices.md)
- Review nach jedem Sprint
- Anpassungen basierend auf Feedback

---

## ✅ Erfolgsmetriken

### Nach Sprint 4 (Week 1)
**Ziel:** Nutzer verstehen das Spiel besser

- [ ] 80% der Tester: "Ich verstehe jetzt was ich tun soll"
- [ ] 70% der Tester: "Ich sehe dass KI existiert"
- [ ] 100% der Tester können Ressourcen verkaufen
- [ ] Velocity gemessen (Aufwand vs. Schätzung)

### Nach Sprint 7 (Week 4)
**Ziel:** Multiplayer funktioniert und macht Spaß

- [ ] 2+ Spieler können gemeinsam spielen
- [ ] 70% der Tester: "Ich will weiterspielen"
- [ ] Wirtschafts-Loop funktioniert
- [ ] Reputation ist mechanisch relevant

### Nach Sprint 9 (Week 6)
**Ziel:** Progression ist spürbar

- [ ] Nutzer können zu Minor House aufsteigen
- [ ] 60% der Tester spielen 5+ Sessions
- [ ] Langzeit-Motivation vorhanden

---

## ⚠️ Risiken & Mitigationen

### Risiko 1: Technische Schulden durch Quick & Dirty
**Wahrscheinlichkeit:** HOCH
**Impact:** MITTEL

**Mitigation:**
- Dokumentiere "temporär" klar in Code-Kommentaren
- Plane Refactoring-Stories ein (später)
- Akzeptiere Schulden für schnelles Feedback
- Kommuniziere offen mit Team

### Risiko 2: Team-Widerstand gegen neue Prinzipien
**Wahrscheinlichkeit:** MITTEL
**Impact:** HOCH

**Mitigation:**
- Workshop: Erkläre Gründe (nicht nur was, auch warum)
- Zeige Vergleich: 17 Wochen vs. 1 Woche
- Quick Wins in Sprint 4 demonstrieren Nutzen
- Retrospektiven: Feedback ernst nehmen

### Risiko 3: Scope Creep (Stories werden zu groß)
**Wahrscheinlichkeit:** MITTEL
**Impact:** MITTEL

**Mitigation:**
- Story-Schnitt Checkliste nutzen
- "Quick & Dirty erlaubt" für jede Story definiert
- Time-Box: 6h Maximum pro Story (sonst splitten)

---

## 📚 Referenz-Dokumente

| Dokument | Zweck | Zielgruppe |
|----------|-------|------------|
| **product-planning-principles.md** | Planungs-Prinzipien, Weitergabe | Team, neue Mitglieder |
| **roadmap-analysis.md** | Begründung, Lessons Learned | PO, Stakeholder |
| **product-roadmap-vertical-slices.md** | AKTIVE Roadmap | Team, Sprints |
| **ROADMAP-REORGANIZATION-SUMMARY.md** | Executive Summary | Stakeholder, Management |

---

## 🎯 Kernbotschaft

> **Wir haben VIEL gebaut - jetzt müssen wir es ZEIGEN.**

Statt weiter Backend-Features zu bauen die niemand sieht, fokussieren wir auf:
- ✅ Sichtbarmachung (Quick Wins)
- ✅ Geschlossene Loops (Produktion → Verkauf → Credits)
- ✅ Sofort erlebbarer Value (jede Woche neue Features SPIELEN)

**Week 1 liefert mehr erlebbaren Value als die alte Phase 0-2 zusammen.**

---

## 🔄 Nächste Review

**Termin:** Nach Sprint 4 (Ende Week 1)

**Agenda:**
1. Demo der Quick Wins (VS-001 bis VS-004)
2. User Feedback auswerten
3. Velocity validieren (Aufwand vs. Schätzung)
4. Roadmap anpassen (falls nötig)

---

**Erstellt:** 2025-11-18
**Autor:** Product Owner
**Status:** Genehmigung ausstehend
**Nächste Schritte:** Workshop mit Team, Sprint 4 Planning
