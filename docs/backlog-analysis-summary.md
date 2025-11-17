# Product Backlog Analyse - Executive Summary

**Projekt:** Sternenhaus - KI-gestützte Wirtschaftssimulation
**Analysiert von:** Product Owner Review
**Datum:** 2025-11-17
**Status:** ✅ Analyse komplett

---

## 🎯 Zusammenfassung

Das Projekt "Sternenhaus" ist **ambitioniert aber machbar**, wenn richtig priorisiert. Die vorliegenden 134 User Stories wurden analysiert, neu priorisiert und in **8 Release-Phasen** organisiert.

**Haupterkenntnis:** Die ursprünglichen User Stories waren zu KI-lastig für ein MVP. Ein "Walking Skeleton"-Ansatz wird empfohlen.

---

## ✅ Was gut ist

### Stärken der aktuellen User Stories:

1. **Vollständigkeit:** Alle Spielsysteme sind abgedeckt (Handel, Territorium, Spionage, Politik)
2. **Abhängigkeiten dokumentiert:** Dependencies zwischen Stories sind klar
3. **Akzeptanzkriterien vorhanden:** Stories haben testbare Kriterien
4. **Kohärente Vision:** README und Stories passen zusammen
5. **Design Goals separiert:** Qualitative Ziele sind in eigenem Dokument

---

## ❌ Identifizierte Probleme

### Kritische Findings:

#### 1. **Fehlende Enabler Stories**
**Problem:** Stories springen direkt in Features, technische Grundlagen fehlen.

**Fehlende Enabler:**
- E-001: Web-App Infrastruktur
- E-002: Datenbank & Persistence
- E-003: Authentication
- E-004: Turn Management System
- E-005: AI Integration Foundation
- E-006: UI Framework

**Impact:** Ohne diese kann kein Feature implementiert werden.

**Lösung:** ✅ 7 Enabler Stories definiert (siehe backlog-prioritized.md)

---

#### 2. **Zu ambitioniertes MVP**
**Problem:** Viele Stories setzen hochkomplexe KI voraus, bereits im MVP.

**Beispiele:**
- US-002: "Dynamisch generierte Dialoge" → Komplex, teuer, riskant
- US-150: "KI-generierte Hintergrundgeschichte" → Nice-to-have, kein MVP
- US-800-805: "Emergente Narration" → End-Game-Feature

**Impact:**
- Hohes Risiko (KI-Qualität unsicher)
- Hohe Kosten (LLM API Calls)
- Lange Time-to-Market

**Lösung:** ✅ "Walking Skeleton"-Strategie

```
Phase 1 (MVP):    Templates statt KI
Phase 2:          Multiplayer
Phase 3:          Jetzt erst KI aktivieren (Ersetzt Templates)
```

**Vorteil:** Spielmechanik kann getestet werden, **bevor** teure KI kommt.

---

#### 3. **US-010 zu groß**
**Problem:** "Rundenbasiertes Multiplayer-Spiel" versucht zu viel auf einmal.

**Enthält:**
- Multiplayer-Infrastruktur
- Turn-Management
- Persistenz
- User-Management
- Timer-System

**Lösung:** ✅ Aufgeteilt in:
- US-010-PART-A: Single-Player Rundenlogik (MVP Phase 1)
- US-010-PART-B: Online-Multiplayer 2-4 Spieler (Phase 2)
- US-010-FULL: Timer & 6 Spieler (Später)

---

#### 4. **Vereinfachte Versionen fehlen**
**Problem:** Viele Stories haben nur "Full Version", keine einfache Stufe.

**Beispiel US-200 (Handel):**
- Original: "Dynamische Preisverhandlungen mit KI-Händler"
- Zu komplex für MVP

**Lösung:** ✅ Stufenweiser Ausbau:
- **Phase 1:** US-200-SIMPLE (Fixpreise + Persönlichkeits-Modifier)
- **Phase 3:** US-200 Full (KI-Verhandlungen)

**Weitere vereinfachte Stories:**
- US-001-SIMPLE: Vordefinierte NPCs statt KI-generiert
- US-002-SIMPLE: Templates statt dynamische Dialoge
- US-150-SIMPLE: Auswahl aus 5 Backstories statt KI-generiert

---

## 📊 Core Loop Analyse

### Identifizierter Kern-Gameplay-Loop:

```
START als Händler
  ↓
Handel treiben (Ressourcen kaufen/verkaufen)
  ↓
Credits & Ressourcen sammeln
  ↓
Reputation & Einfluss aufbauen
  ↓
Stationen übernehmen (Territorium erweitern)
  ↓
Mit NPCs interagieren (Beziehungen aufbauen)
  ↓
Aufsteigen (Händler → Minor House → Major House)
  ↓
LOOP (mit mehr Macht & Möglichkeiten)
```

### MVP Core Loop (vereinfacht):

**Minimaler spielbarer Kern:**

1. ✅ Spieler startet mit 1 Station, wenig Credits
2. ✅ Spieler handelt Ressourcen (kaufen/verkaufen)
3. ✅ Spieler sammelt Credits & Reputation
4. ✅ Spieler übernimmt weitere Stationen
5. ✅ Spieler steigt auf zu Minor House
6. ✅ Repeat mit mehr Optionen

**Was NICHT in MVP:**
- ❌ Komplexe KI-Dialoge (Templates reichen)
- ❌ Emergente Narration (später)
- ❌ Militärsystem (später)
- ❌ Forschung (später)
- ❌ Ämtersystem (erst ab Minor House relevant)
- ❌ Komplexe Spionage (vereinfacht oder später)

---

## 📋 Neue Backlog-Struktur

### 8 Release-Phasen:

| Phase | Ziel | Stories | Dauer (geschätzt) |
|-------|------|---------|-------------------|
| **Phase 0** | Technical Foundation (Enabler) | 7 | 3-4 Wochen |
| **Phase 1** | MVP Core Loop (Single Player) | ~20 | 8-10 Wochen |
| **Phase 2** | Multiplayer Foundation | ~5 | 3-4 Wochen |
| **Phase 3** | AI Enhancement | ~15 | 6-8 Wochen |
| **Phase 4** | Expansion Systems | ~10 | 4-6 Wochen |
| **Phase 5** | Advanced Trading & Markets | ~15 | 6-8 Wochen |
| **Phase 6** | Social Systems | ~25 | 10-12 Wochen |
| **Phase 7** | Political Systems | ~20 | 8-10 Wochen |
| **Phase 8** | End-Game Systems | ~17 | 8-10 Wochen |

**Total:** ~54-72 Wochen (12-18 Monate) für Full Release

### Milestones:

- 🎉 **M1:** MVP Complete (Phase 1) → Spielbar, Single Player
- 🎉 **M2:** Multiplayer Complete (Phase 2) → Online-Spiel
- 🎉 **M3:** AI Enhancement (Phase 3) → "Magische" KI-Features
- 🎉 **M4-M8:** Feature-Komplettierung

---

## 🔧 Enabler Stories (Neu definiert)

7 neue Enabler Stories wurden identifiziert und hinzugefügt:

| ID | Titel | Zweck |
|----|-------|-------|
| **E-001** | Web-App Infrastruktur | React/Next.js + Node.js Backend |
| **E-002** | Database & Persistence | PostgreSQL + ORM |
| **E-003** | Authentication | User-Management |
| **E-004** | Turn Management System | Rundenlogik-Engine |
| **E-005** | AI Integration Foundation | LLM API + Prompt-System |
| **E-006** | UI Framework & Components | Wiederverwendbare UI |
| **E-007** | Multiplayer State Management | Multi-Player Sync (Phase 2) |

**Wichtig:** Ohne E-001 bis E-006 kann **kein Feature** entwickelt werden!

---

## 🎯 Empfohlene Priorisierung

### Phase 1: MVP (HÖCHSTE PRIORITÄT)

**Ziel:** Funktionierender Single-Player-Prototyp in 3 Monaten

**Must-Have Stories (in Reihenfolge):**

#### Sprint 0: Foundation (3-4 Wochen)
1. E-001: Web-App Setup
2. E-002: Database
3. E-003: Auth
4. E-004: Turn Management
5. E-005: AI Integration (Vorbereitung)
6. E-006: UI Framework

#### Sprint 1: Core Economy (2 Wochen)
7. US-100: Basis-Ressourcen (5 Typen)
8. US-101: Ressourcenvorkommen
9. US-102: Ressourcenproduktion

#### Sprint 2: Territory (2 Wochen)
10. US-020: Stationskontrolle (5-8 Stationen)

#### Sprint 3: Reputation & Influence (1-2 Wochen)
11. US-300: Basis-Reputation
12. US-320: Basis-Einfluss

#### Sprint 4: NPCs (2-3 Wochen)
13. US-001: Basis-NPC-Persönlichkeiten (vordefiniert!)
14. US-002-SIMPLE: Template-Dialoge (NICHT KI)

#### Sprint 5: Trading (2 Wochen)
15. US-200-SIMPLE: Basis-Handel (Fixpreise)

#### Sprint 6: Progression (1-2 Wochen)
16. US-150-SIMPLE: Backstory-Auswahl (Templates)
17. US-600: Progression-System
18. US-601: Aufstieg zu Minor House

#### Sprint 7: Game Loop (1 Woche)
19. US-010-PART-A: Single-Player Runden

**Ergebnis nach Phase 1:**
✅ Spielbarer Prototyp (30-45 Min Spielzeit)
✅ Testbar ohne teure KI-Kosten
✅ Mechanik validierbar

---

### Phase 2: Multiplayer (ZWEIT-HÖCHSTE PRIORITÄT)

**Dauer:** 3-4 Wochen

**Stories:**
- E-007: Multiplayer State Management
- US-010-PART-B: Online-Multiplayer (2-4 Spieler)
- US-021: Sektorkontrolle
- US-022: Territoriale Grenzen

**Ergebnis:**
✅ Multiplayer-Spiel funktioniert
✅ Beta-Testing möglich

---

### Phase 3: AI Enhancement (MITTLERE PRIORITÄT)

**Dauer:** 6-8 Wochen

**Stories:**
- US-002: Dynamische KI-Dialoge (ersetzt Templates)
- US-003-005: NPC-Gedächtnis, Vergebung, Groll
- US-200: KI-Verhandlungen (ersetzt Fixpreise)
- US-201-205: Trading-Beziehungen
- US-150: KI-Backstory (ersetzt Templates)
- US-151-152: Backstory-Integration

**Ergebnis:**
✅ "Magische" KI-Features live
✅ NPCs fühlen sich lebendig an

---

### Phase 4-8: Feature-Erweiterung (NIEDRIGERE PRIORITÄT)

**Dauer:** 9-12 Monate

**Reihenfolge:**
1. **Phase 4:** Expansion (Territorium vertiefen)
2. **Phase 5:** Advanced Trading (Märkte, Spekulation)
3. **Phase 6:** Social Systems (Spionage, Diplomatie)
4. **Phase 7:** Political Systems (Ämter, Häuser)
5. **Phase 8:** End-Game (Militär, Forschung, Events)

---

## 🚨 Risiken & Empfehlungen

### Risiko 1: KI-Kosten & Qualität

**Problem:** LLM API Calls können teuer werden (besonders bei vielen Spielern)

**Empfehlung:**
- ✅ Caching implementieren (E-005)
- ✅ Templates als Fallback (bereits im Backlog)
- ✅ Kosten pro User tracken
- ⚠️ **Budget für LLM-Kosten einplanen** (ca. 0,50-2€ pro Spieler pro Monat geschätzt)

### Risiko 2: Scope Creep

**Problem:** 134 Stories sind viele, Team könnte sich verzetteln

**Empfehlung:**
- ✅ **Eisern an Phase 1 (MVP) festhalten**
- ✅ Erst nach M1 (MVP Complete) weiter
- ✅ Regelmäßige Backlog-Refinements
- ⚠️ **Versuchung widerstehen**, "nur noch schnell" Features einzubauen

### Risiko 3: Technische Komplexität

**Problem:** Rundenbasiertes Multiplayer + KI ist komplex

**Empfehlung:**
- ✅ Technische Spikes in Phase 0 (Enabler)
- ✅ Proof-of-Concepts für:
  - Turn Management (E-004)
  - AI Integration (E-005)
  - Multiplayer Sync (E-007)
- ⚠️ **2-3 Wochen für Spikes einplanen** vor Sprint 1

---

## 📈 Erfolgsmetriken

### MVP (Phase 1) ist erfolgreich, wenn:

- [ ] 3 interne Tester spielen 30+ Minuten ohne Bugs
- [ ] Core Loop funktioniert (Handel → Expansion → Aufstieg)
- [ ] Positives Feedback zu Spielmechanik
- [ ] NPCs fühlen sich "gut genug" an (auch ohne KI)

### Beta (Phase 2-3) ist erfolgreich, wenn:

- [ ] 10+ externe Tester spielen regelmäßig
- [ ] Multiplayer stabil über mehrere Tage
- [ ] KI-Dialoge werden als "beeindruckend" bewertet
- [ ] Retention-Rate >40% nach 7 Tagen

### Early Access (Phase 4-6) ist erfolgreich, wenn:

- [ ] 100+ zahlende Spieler
- [ ] Durchschnittliche Session-Länge >45 Min
- [ ] Positive Steam/Bewertungen (>80%)
- [ ] Community bildet sich (Discord/Forum)

---

## ✅ Nächste Schritte

### Sofort (diese Woche):

1. **Team-Meeting:** Backlog mit Entwicklern reviewen
2. **Technische Spikes:** Für E-004 (Turn Management) und E-005 (AI) planen
3. **Sprint 0 Planning:** Phase 0 (Enabler) in Tasks aufbrechen

### Nächste 2 Wochen:

4. **Proof-of-Concepts:**
   - Turn-based Game Loop
   - LLM Integration (1-2 Beispiel-Dialoge)
5. **UI Mockups:** Für MVP-Screens (Karte, Handel, Inventar)

### Monat 1-3:

6. **Phase 0 (Enabler):** Technische Grundlagen bauen
7. **Phase 1 (MVP):** Core Loop implementieren
8. **Alpha-Testing:** Intern testen

### Monat 4-6:

9. **Phase 2:** Multiplayer
10. **Phase 3:** AI Enhancement
11. **Beta-Testing:** Extern testen

---

## 🎯 Fazit

**Das Projekt ist machbar**, wenn:

1. ✅ **MVP-Scope strikt eingehalten wird** (keine KI-Features in Phase 1)
2. ✅ **Enabler Stories zuerst** (technische Grundlagen)
3. ✅ **Iterativ vorgehen** (Phase für Phase)
4. ✅ **Frühes Testing** (nach jeder Phase)

**Größtes Risiko:** Zu frühe KI-Integration ohne validierte Spielmechanik

**Größte Chance:** Einzigartiges Spielerlebnis durch KI + klassische Wirtschaftssim

**Empfohlene Time-to-Market:**
- **Alpha (MVP):** 3 Monate
- **Beta (Multiplayer + AI):** 6 Monate
- **Early Access:** 9-12 Monate
- **Full Release:** 18 Monate

---

**Viel Erfolg! 🚀**
