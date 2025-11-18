# Roadmap Analyse - Bestand & Reorganisation

**Datum:** 2025-11-18
**Kontext:** Analyse der bestehenden Implementierung zur Identifizierung von unsichtbaren Features und Vorbereitung der Vertical-Slice-Reorganisation

---

## 1. Bestandsaufnahme: Was ist implementiert?

### Sprint 1: Technical Foundation ✅
**Status:** Abgeschlossen

**Implementierte Features:**
- ✅ Web-App Infrastructure (Next.js 14, Firebase Hosting)
- ✅ Google Authentication (Sign-In, User-Profile)
- ✅ Firestore Database (User Collection, Security Rules)
- ✅ CI/CD Pipeline (GitHub Actions) - **NICHT AKTIV**
- ✅ Basic UI Components (Navbar, Layout, shadcn/ui)

**Erlebbarkeit für Nutzer:**
- ✅ **SICHTBAR:** Login-Screen, Dashboard
- ✅ **NUTZBAR:** Einloggen, Profil ansehen
- ⚠️ **EINGESCHRÄNKT:** Kein spielbarer Content nach Login

**Bewertung:**
- Technische Foundation ist da
- Nutzer kann sich einloggen
- **ABER:** Nach Login ist nichts zu tun → "Leere App"

---

### Sprint 2: Game Engine Basics ✅
**Status:** Abgeschlossen

**Implementierte Features:**
- ✅ Turn Management System (Round State, Player Ready Logic)
- ✅ AI Integration (Gemini API, Cloud Function, Caching)
- ✅ UI Components Library (shadcn/ui, GameLayout, Sidebar)
- ✅ useRoundState Hook (Frontend-Integration)

**Erlebbarkeit für Nutzer:**
- ⚠️ **TEILWEISE SICHTBAR:** Rundenanzeige vorhanden
- ⚠️ **BACKEND ONLY:** Turn Management läuft im Hintergrund
- ❌ **NICHT NUTZBAR:** AI-Integration hat keine UI
- ❌ **NICHT SICHTBAR:** Nutzer sieht nicht dass KI existiert

**Bewertung:**
- Starke Backend-Implementierung
- **PROBLEM:** Nutzer sieht/erlebt fast nichts davon
- Rundenlogik funktioniert, aber ohne spielbare Aktionen

---

### Sprint 3: Resource & Economy Foundation ✅
**Status:** Abgeschlossen (Code fertig, Deployment ausstehend)

**Implementierte Features:**
- ✅ Ressourcensystem (5 Ressourcentypen: Metalle, Energie, Nahrung, Komponenten, Luxusgüter)
- ✅ ResourceInventory Component (zeigt Ressourcen an)
- ✅ 8 Stationen auf Karte (GameMap Component)
- ✅ Station Control (purchaseStation Cloud Function)
- ✅ Ressourcenproduktion (calculateProduction in turnManager)
- ✅ ProductionSummary Component
- ✅ StationCard Component (erweitert)

**Erlebbarkeit für Nutzer:**
- ✅ **SICHTBAR:** Ressourcen-Inventar, Karte mit Stationen
- ✅ **NUTZBAR:** Stationen kaufen (Button vorhanden)
- ✅ **FEEDBACK:** Produktion wird berechnet und angezeigt
- ⚠️ **EINGESCHRÄNKT:** Keine Verwendung für Ressourcen (kein Handel)
- ⚠️ **EINGESCHRÄNKT:** Stationskauf funktioniert, aber strategischer Wert unklar

**Bewertung:**
- **DEUTLICH BESSER** als Sprint 1+2
- Nutzer kann etwas SEHEN und TUN
- **ABER:** Geschlossener Loop fehlt (kaufen → nutzen → Effekt sehen)

---

## 2. Problem-Analyse: Was ist unsichtbar?

### Backend-Features ohne UI

#### AI-Integration (Sprint 2)
**Was existiert:**
- Gemini API Integration
- generateNpcDialog Cloud Function
- AI Response Caching
- Prompt Template System

**Was fehlt:**
- ❌ Kein NPC sichtbar in UI
- ❌ Keine Dialog-UI
- ❌ Nutzer weiß nicht dass KI existiert
- ❌ Keine Möglichkeit Dialoge zu testen

**Impact:**
- Komplexes Feature komplett unsichtbar
- Investment in AI-Integration bringt 0 Value aktuell

#### Turn Management Details (Sprint 2)
**Was existiert:**
- Round State Machine
- Player Ready Logic
- processRoundEnd Function
- Round Calculation

**Was fehlt:**
- ⚠️ Nutzer sieht nur Rundenzahl
- ❌ Was passiert beim Rundenende? (Unsichtbar)
- ❌ Warum muss ich ready markieren?
- ❌ Was passiert wenn ALLE ready sind?

**Impact:**
- Nutzer versteht Mechanik nicht
- Rundenlogik fühlt sich "leer" an

#### Ressourcen-Strategiewert (Sprint 3)
**Was existiert:**
- Strategic Value pro Station (Zahl gespeichert)
- Defense Level pro Station
- Resource Production Rates

**Was fehlt:**
- ❌ Warum ist Station X wertvoller als Station Y?
- ❌ Was bringt mir hohe Produktion?
- ❌ Wofür brauche ich Ressourcen?

**Impact:**
- Nutzer trifft Entscheidungen "blind"
- Strategische Tiefe nicht erlebbar

---

## 3. Vertikale Schnitte: Was fehlt für "Erlebbarkeit"?

### Feature-Cluster-Analyse

#### Cluster 1: "Ich kann Ressourcen nutzen"
**Implementiert:**
- ✅ Ressourcen werden produziert
- ✅ Ressourcen werden angezeigt

**Fehlt für Vertical Slice:**
- ❌ **Verwendung:** Wofür kann ich Ressourcen nutzen?
  - Kein Handel
  - Kein Verkauf
  - Keine Verwendung für Bau/Upgrades

**Minimal-Slice für Value:**
```
Story: "Verkaufe Ressourcen an NPC-Händler"
- UI: Button "Verkaufe 10 Metalle für 500 Credits"
- Backend: updatePlayerResources, updateCredits
- Feedback: "Du hast 500 Credits erhalten!"
→ Nutzer kann Ressourcen NUTZEN und EFFEKT sehen
```

#### Cluster 2: "Ich verstehe warum Stationen wichtig sind"
**Implementiert:**
- ✅ Stationen sind kaufbar
- ✅ Produktion wird berechnet

**Fehlt für Vertical Slice:**
- ❌ **Motivation:** Warum Station X kaufen?
- ❌ **Vergleich:** Ist Station A besser als B?
- ❌ **ROI:** Wann habe ich Investition zurück?

**Minimal-Slice für Value:**
```
Story: "Zeige ROI-Berechnung beim Stationskauf"
- UI: "Kosten: 3000 Credits | Produktion: 10 Metalle/Runde | ROI: ~6 Runden"
- Backend: Berechnung existiert bereits
- Feedback: Nutzer VERSTEHT Kaufentscheidung
```

#### Cluster 3: "Ich erlebe KI-Features"
**Implementiert:**
- ✅ AI Backend komplett fertig
- ✅ Caching funktioniert

**Fehlt für Vertical Slice:**
- ❌ **NPC-Sichtbarkeit:** Kein NPC in UI
- ❌ **Dialog-Interaktion:** Keine Möglichkeit zu sprechen
- ❌ **KI-Erlebnis:** Nutzer weiß nicht dass KI läuft

**Minimal-Slice für Value:**
```
Story: "Spreche mit 1 NPC (Template + KI Fallback)"
- UI: NPC-Card "Händler Marcus" + Button "Sprechen"
- Dialog-Modal mit 2-3 Antwortoptionen
- Backend: Nutze BESTEHENDE generateNpcDialog Function
- Feedback: Nutzer ERLEBT KI-Dialoge sofort
```

---

## 4. Quick Wins: Sichtbarmachung mit minimalem Aufwand

### Quick Win 1: NPC-Dialog Demo ⚡
**Aufwand:** 2-4 Stunden
**Value:** SEHR HOCH (zeigt KI-Investment)

**Was zu tun:**
1. Erstelle `NpcCard.tsx` Component (1h)
   - Name, Avatar, "Sprechen" Button
2. Erstelle `DialogModal.tsx` (1h)
   - Zeigt KI-Response
   - 2-3 vorgefertigte Antworten
3. Verbinde mit BESTEHENDER Cloud Function (0.5h)
4. Deploy (0.5h)

**Resultat:**
- Nutzer kann mit 1 NPC sprechen
- KI-Dialoge sind SICHTBAR
- Komplexe AI-Integration wird erlebbar

---

### Quick Win 2: Ressourcen-Verkauf ⚡
**Aufwand:** 3-4 Stunden
**Value:** SEHR HOCH (schließt Game Loop)

**Was zu tun:**
1. Erstelle `sellResources` Cloud Function (1.5h)
   - Aktualisiere Resources & Credits
   - Validation
2. Erweitere `ResourceInventory.tsx` (1h)
   - "Verkaufen" Button pro Ressource
   - Zeige aktuellen Preis (aus config)
3. Feedback-Toast (0.5h)
   - "Du hast 500 Credits erhalten!"
4. Deploy + Test (1h)

**Resultat:**
- Nutzer kann Ressourcen NUTZEN
- Wirtschafts-Loop ist GESCHLOSSEN
- Produktion → Verkauf → Credits → Stationskauf

---

### Quick Win 3: Station-Wert Tooltips ⚡
**Aufwand:** 1-2 Stunden
**Value:** MITTEL (bessere UX)

**Was zu tun:**
1. Erweitere `StationCard.tsx` (1h)
   - Tooltip mit Breakdown
   - "Strategic Value: 8 weil X"
   - "Produktion: 10 Metalle/Runde = 500 Credits/Runde"
   - "ROI: 6 Runden"
2. Styling (0.5h)
3. Deploy (0.5h)

**Resultat:**
- Nutzer VERSTEHT Stationskäufe
- Strategische Entscheidungen sind informiert
- Bestehende Daten werden genutzt

---

### Quick Win 4: Runden-Feedback ⚡
**Aufwand:** 2-3 Stunden
**Value:** MITTEL (Verständnis)

**Was zu tun:**
1. Erstelle `RoundSummary.tsx` Component (1.5h)
   - Modal nach Rundenende
   - "Runde 5 beendet!"
   - Zeige: Produktion, Ereignisse, Änderungen
2. Trigger in `processRoundEnd` (0.5h)
3. Deploy + Test (1h)

**Resultat:**
- Nutzer SIEHT was bei Rundenende passiert
- Turn Management ist TRANSPARENT
- Feedback-Loop geschlossen

---

## 5. Neue Roadmap-Struktur: Value-First

### Prinzipien der Reorganisation
1. **Quick Wins zuerst:** Sichtbarmachung > Neue Features
2. **Geschlossene Loops:** Jede Story schließt einen Value-Loop
3. **Keine Enabler ohne Not:** Infrastruktur nur wenn blockierend
4. **Temporäre Lösungen OK:** Simple Version jetzt > Perfekt später

---

### Vorgeschlagene Story-Reihenfolge (Top 20)

#### Theme: "Erste Schritte" (Week 1)

**VS-001: Verkaufe Ressourcen an System-Händler** ⚡ QUICK WIN
- **Value:** Ressourcen werden NUTZBAR, Credits-Loop geschlossen
- **Aufwand:** 3-4h
- **Dependencies:** Sprint 3 ✅
- **Akzeptanz:** Nutzer kann Ressourcen verkaufen, sieht Credits steigen

**VS-002: Spreche mit 1 NPC (Händler Marcus)** ⚡ QUICK WIN
- **Value:** KI-Feature wird ERLEBBAR
- **Aufwand:** 2-4h
- **Dependencies:** Sprint 2 (AI) ✅
- **Akzeptanz:** Nutzer sieht KI-generierten Dialog

**VS-003: Zeige Station-Wert Breakdown** ⚡ QUICK WIN
- **Value:** Stationskäufe werden VERSTÄNDLICH
- **Aufwand:** 1-2h
- **Dependencies:** Sprint 3 ✅
- **Akzeptanz:** Nutzer sieht ROI-Berechnung vor Kauf

**VS-004: Runden-Zusammenfassung nach Rundenende** ⚡ QUICK WIN
- **Value:** Turn Management wird TRANSPARENT
- **Aufwand:** 2-3h
- **Dependencies:** Sprint 2 ✅
- **Akzeptanz:** Nutzer sieht was in Runde passiert ist

---

#### Theme: "Wirtschafts-Loop" (Week 2)

**VS-005: Kaufe Ressourcen von NPC-Händler**
- **Value:** Aktiver Handel möglich
- **Aufwand:** 4-6h
- **Dependencies:** VS-001 ✅
- **Akzeptanz:** Nutzer kann Credits gegen Ressourcen tauschen

**VS-006: NPC-Preise variieren nach Persönlichkeit**
- **Value:** NPCs fühlen sich UNTERSCHIEDLICH an
- **Aufwand:** 3-4h
- **Dependencies:** VS-005, VS-002
- **Akzeptanz:** "Gieriger Händler" hat +20% Preise

**VS-007: Zeige Handelshistorie mit NPC**
- **Value:** Beziehungen werden SICHTBAR
- **Aufwand:** 2-3h
- **Dependencies:** VS-005
- **Akzeptanz:** Nutzer sieht vergangene Geschäfte

---

#### Theme: "Beziehungen & Reputation" (Week 3)

**VS-008: Zeige Reputation mit 1 NPC**
- **Value:** Soziales Kapital wird SICHTBAR
- **Aufwand:** 3-4h
- **Dependencies:** VS-002
- **Akzeptanz:** Badge "★★★☆☆" bei NPC sichtbar

**VS-009: Reputation beeinflusst Preise bei 1 NPC**
- **Value:** Reputation ist mechanisch RELEVANT
- **Aufwand:** 2-3h
- **Dependencies:** VS-008, VS-006
- **Akzeptanz:** Hohe Rep = -10% Preis

**VS-010: Verbessere Reputation durch Geschenk**
- **Value:** Nutzer kann Beziehungen AKTIV gestalten
- **Aufwand:** 3-4h
- **Dependencies:** VS-008
- **Akzeptanz:** Button "Geschenk machen" erhöht Reputation

---

#### Theme: "Multiplayer-Basis" (Week 4)

**VS-011: Erstelle/Trete Spiel bei (Lobby)**
- **Value:** Multiplayer wird MÖGLICH
- **Aufwand:** 6-8h
- **Dependencies:** Sprint 2 ✅
- **Akzeptanz:** 2 Spieler können gemeinsam spielen

**VS-012: Zeige Mitspieler in Spiel**
- **Value:** Andere Spieler sind SICHTBAR
- **Aufwand:** 2-3h
- **Dependencies:** VS-011
- **Akzeptanz:** Liste "Spieler im Spiel" sichtbar

**VS-013: Zeige Territorium anderer Spieler auf Karte**
- **Value:** Konkurrenz ist SICHTBAR
- **Aufwand:** 2-3h
- **Dependencies:** VS-011, Sprint 3
- **Akzeptanz:** Karte zeigt farbig wem was gehört

---

#### Theme: "Strategische Tiefe" (Week 5)

**VS-014: 3 NPC-Typen mit unterschiedlichen Persönlichkeiten**
- **Value:** Vielfalt im Handel
- **Aufwand:** 4-5h
- **Dependencies:** VS-002, VS-006
- **Akzeptanz:** Gieriger, Ehrenhafter, Vorsichtiger Händler

**VS-015: Ressourcenknappheit wird sichtbar**
- **Value:** Strategie wird WICHTIGER
- **Aufwand:** 3-4h
- **Dependencies:** VS-005
- **Akzeptanz:** "Metalle sind knapp: +50% Preis"

**VS-016: Zeige Produktionsprognose für 3 Runden**
- **Value:** Planung wird MÖGLICH
- **Aufwand:** 2-3h
- **Dependencies:** Sprint 3 ✅
- **Akzeptanz:** Chart zeigt zukünftige Produktion

---

#### Theme: "Progression" (Week 6)

**VS-017: Zeige Einfluss-Score**
- **Value:** Fortschritt wird MESSBAR
- **Aufwand:** 3-4h
- **Dependencies:** Sprint 3 ✅
- **Akzeptanz:** "Einfluss: 250 (von Stationen: 150, Credits: 100)"

**VS-018: Unlock "Zweite Station kaufbar" bei Einfluss 100**
- **Value:** Progression ist SPÜRBAR
- **Aufwand:** 2-3h
- **Dependencies:** VS-017
- **Akzeptanz:** Tooltip "Einfluss zu niedrig" bei Kauf

**VS-019: Zeige Fortschrittsbalken zu Minor House**
- **Value:** Langfristziel ist SICHTBAR
- **Aufwand:** 2-3h
- **Dependencies:** VS-017
- **Akzeptanz:** "75% zu Minor House (brauche noch 1 Station)"

**VS-020: Aufstieg zu Minor House (Zeremonie)**
- **Value:** Großer Meilenstein ist ERLEBBAR
- **Aufwand:** 4-6h
- **Dependencies:** VS-019
- **Akzeptanz:** Modal "Du bist nun Minor House!", Titel ändert sich

---

## 6. Aufwandsschätzung: Erste 4 Wochen

| Woche | Stories | Aufwand (h) | Value | Theme |
|-------|---------|-------------|-------|-------|
| **Week 1** | VS-001 bis VS-004 | 8-13h | ⭐⭐⭐⭐⭐ | Quick Wins (Sichtbarmachung) |
| **Week 2** | VS-005 bis VS-007 | 9-13h | ⭐⭐⭐⭐ | Wirtschafts-Loop |
| **Week 3** | VS-008 bis VS-010 | 8-11h | ⭐⭐⭐⭐ | Beziehungen |
| **Week 4** | VS-011 bis VS-013 | 10-14h | ⭐⭐⭐⭐⭐ | Multiplayer |
| **Week 5** | VS-014 bis VS-016 | 9-12h | ⭐⭐⭐ | Strategische Tiefe |
| **Week 6** | VS-017 bis VS-020 | 11-16h | ⭐⭐⭐⭐⭐ | Progression |

**Total (6 Wochen):** 55-79h für 20 Vertical Slices

**Durchschnitt pro Story:** 2.75-3.95h

**Velocity-Annahme:** ~10-15h/Woche → **2-4 Stories/Woche**

---

## 7. Vergleich: Alt vs. Neu

### Alte Roadmap (Phasen-basiert)
```
Phase 0: Technical Foundation (6 Wochen)
→ Nutzer sieht: Login, leere UI
→ Value: MINIMAL

Phase 1: MVP Core Loop (4 Wochen)
→ Nutzer sieht: Ressourcen, Stationen (aber kein Handel)
→ Value: NIEDRIG

Phase 2: Multiplayer (3 Wochen)
→ Nutzer kann: Mit anderen spielen (aber immer noch wenig zu tun)
→ Value: MITTEL

Phase 3: AI Enhancement (4 Wochen)
→ Nutzer erlebt: KI-Dialoge (ENDLICH!)
→ Value: HOCH

→ TOTAL: 17 Wochen bis KI erlebbar ist
```

### Neue Roadmap (Value-First)
```
Week 1: Quick Wins
→ Nutzer kann: Handeln, NPCs erleben, Stationen verstehen
→ Value: HOCH

Week 2-3: Wirtschaft + Beziehungen
→ Nutzer kann: Strategisch handeln, Reputation aufbauen
→ Value: SEHR HOCH

Week 4: Multiplayer
→ Nutzer kann: Mit anderen konkurrieren
→ Value: SEHR HOCH

Week 5-6: Tiefe + Progression
→ Nutzer kann: Aufsteigen, komplexe Strategien nutzen
→ Value: SEHR HOCH

→ TOTAL: Week 1 hat MEHR VALUE als alte Phase 0-2 zusammen
```

---

## 8. Risiken & Mitigationen

### Risiko 1: Technische Schulden durch Quick & Dirty
**Wahrscheinlichkeit:** HOCH
**Impact:** MITTEL

**Mitigation:**
- Dokumentiere "temporäre" Solutions klar
- Plane Refactoring-Stories ein (später)
- Akzeptiere Schulden für schnelles Feedback

### Risiko 2: Stories sind zu klein (Overhead)
**Wahrscheinlichkeit:** MITTEL
**Impact:** NIEDRIG

**Mitigation:**
- Kombiniere kleine Stories wenn sinnvoll
- Fokus auf Value, nicht Story-Count

### Risiko 3: Abhängigkeiten werden komplex
**Wahrscheinlichkeit:** NIEDRIG
**Impact:** MITTEL

**Mitigation:**
- Dependency-Graph pflegen
- Nur technisch notwendige Dependencies respektieren

---

## 9. Erfolgsmetriken

### Nach Week 1 (Quick Wins)
- [ ] Nutzer kann Ressourcen verkaufen
- [ ] Nutzer kann mit 1 NPC sprechen
- [ ] Nutzer versteht Stationswerte
- [ ] Nutzer sieht Rundenzusammenfassung
- **Ziel:** 80% der Tester sagen "Ich verstehe das Spiel jetzt besser"

### Nach Week 4 (Multiplayer)
- [ ] 2 Spieler können gemeinsam spielen
- [ ] Nutzer sieht Konkurrenz auf Karte
- [ ] Wirtschafts-Loop funktioniert
- **Ziel:** 70% der Tester sagen "Ich will weiterspielen"

### Nach Week 6 (Progression)
- [ ] Nutzer kann zu Minor House aufsteigen
- [ ] Langfristmotivation ist spürbar
- [ ] Strategische Tiefe ist erlebbar
- **Ziel:** 60% der Tester spielen 5+ Sessions

---

## 10. Nächste Schritte

### Sofort
1. ✅ Diese Analyse mit Team teilen
2. ⚠️ Workshop: Prinzipien erklären (1h)
3. ⚠️ VS-001 bis VS-004 detaillieren
4. ⚠️ Sprint 4 planen (Week 1: Quick Wins)

### Diese Woche
1. ⚠️ VS-001 implementieren (Ressourcen-Verkauf)
2. ⚠️ VS-002 implementieren (NPC-Dialog)
3. ⚠️ Deploy + Test
4. ⚠️ User Feedback sammeln

### Nächste Woche
1. VS-003 & VS-004 (Quick Wins abschließen)
2. VS-005 starten (Ressourcen kaufen)
3. Retrospektive: Velocity messen

---

**Fazit:**

Die neue Roadmap fokussiert auf **sofort erlebbaren Value** statt technischer Perfektion. Quick Wins in Week 1 machen bereits investierte Arbeit (AI, Ressourcen, Stationen) sichtbar und nutzbar.

**Key Insight:** Wir haben VIEL gebaut - jetzt müssen wir es ZEIGEN.

---

**Erstellt:** 2025-11-18
**Nächste Revision:** Nach Week 1 (basierend auf echtem Feedback)
