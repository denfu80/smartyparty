# Product Backlog - Konsolidiert

**Version:** 3.0 (Konsolidiert aus allen Quellen)
**Datum:** 2025-11-18
**Status:** ACTIVE - Dies ist das EINZIGE gültige Backlog
**Prinzipien:** [product-planning-principles.md](./product-planning-principles.md)

---

## 📋 Über dieses Backlog

Dies ist das **einzige gültige Product Backlog** für Sternenhaus/SmartyParty.

**Konsolidiert aus:**
- ✅ user-stories.md (134 Stories, 10 Epics)
- ✅ backlog-prioritized.md (8 Phasen)
- ✅ Sprint 1-3 Learnings (bereits implementiert)
- ✅ Vertical Slice Analyse (Quick Wins)

**Organisation:**
- Stories sind als **Vertical Slices** geschnitten (End-to-End)
- Priorisierung nach: **Value × Dependencies × Effort × Risk**
- Status-Tracking: ✅ Done | 🚧 In Progress | 📋 Ready | 💡 Backlog
- **Keine Phasen:** Stories können umpriorisiert werden

---

## 🎯 Status-Übersicht

| Status | Count | Beschreibung |
|--------|-------|--------------|
| ✅ Done | ~30 | Implementiert & deployed |
| 🚧 In Progress | 0 | Aktuell in Arbeit |
| 📋 Ready | 10 | Detailliert, bereit für Sprint |
| 💡 Backlog | 120+ | Grob skizziert, zu detaillieren |

---

## 🚀 Top 20 Prioritäten (Nächste 6-8 Wochen)

### Priority Tier 1: Quick Wins - Sichtbarmachung ⚡ (Sprint 4)

Diese Stories machen bereits implementierte Backend-Features erlebbar.
**Aufwand gesamt:** 8-13 Stunden | **Value:** Maximal

---

#### 📋 #1: Verkaufe Ressourcen an System-Händler
**Referenz:** VS-001, Teil von US-200
**Priority Score:** 9.5 | **Effort:** 3-4h | **Value:** ⭐⭐⭐⭐⭐

**Als** Spieler **möchte ich** Ressourcen verkaufen können **damit** ich Credits verdiene

**Warum jetzt?**
- Ressourcen werden produziert (Sprint 3 ✅) aber nicht nutzbar
- Schließt Game Loop: Produktion → Verkauf → Credits → Stationskauf
- Nutzt bestehende ResourceInventory Component

**Akzeptanzkriterien:**
- [ ] UI: "Verkaufen" Button bei jeder Ressource
- [ ] UI: Zeigt Preis (z.B. "10 Metalle = 500 Credits")
- [ ] Backend: `sellResources` Cloud Function (atomic transaction)
- [ ] Feedback: Toast "500 Credits erhalten!"
- [ ] Error: "Nicht genug Ressourcen"

**Quick & Dirty erlaubt:**
- Fixe Preise (aus config/resources.ts)
- System kauft immer (kein NPC, unendliche Nachfrage)
- Keine Limits

**Dependencies:** Sprint 3 (Ressourcen) ✅

**Später erweitern:** #6 (NPC-Preise), #15 (Marktdynamik)

---

#### 📋 #2: Spreche mit 1 NPC (Händler Marcus)
**Referenz:** VS-002, Teil von US-001, US-002
**Priority Score:** 9.8 | **Effort:** 2-4h | **Value:** ⭐⭐⭐⭐⭐

**Als** Spieler **möchte ich** mit NPC sprechen **damit** ich KI-Features erlebe

**Warum jetzt?**
- AI Backend komplett fertig (Sprint 2 ✅) aber unsichtbar
- Zeigt Investment in KI-Integration
- Kernfeature wird erlebbar

**Akzeptanzkriterien:**
- [ ] UI: NpcCard Component ("Händler Marcus", Avatar, "Sprechen" Button)
- [ ] UI: DialogModal (zeigt KI-Response)
- [ ] Backend: Nutze BESTEHENDE `generateNpcDialog` Function
- [ ] Caching: Nutze bestehendes AI-Cache System
- [ ] Fallback: Template-Dialog bei API-Fehler

**NPC-Definition:**
```typescript
const MARCUS = {
  id: 'npc-marcus',
  name: 'Händler Marcus',
  personality: ['gierig', 'geschäftstüchtig'],
  greeting: 'Was willst du? Ich hab keine Zeit.'
};
```

**Quick & Dirty erlaubt:**
- 1 NPC nur (Marcus)
- Vorgefertigte Antwortoptionen
- Keine Konsequenzen (nur Gespräch)

**Dependencies:** Sprint 2 (AI) ✅

**Später erweitern:** #6 (Handel), #8 (Reputation), #14 (mehr NPCs)

---

#### 📋 #3: Zeige Station-Wert Breakdown
**Referenz:** VS-003, Teil von US-020
**Priority Score:** 8.5 | **Effort:** 1-2h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** verstehen warum Station wertvoll ist **damit** ich informiert kaufe

**Warum jetzt?**
- Stationen kaufbar (Sprint 3 ✅) aber Wert unklar
- Nutzt bestehende Daten (strategicValue, production)
- Verbessert UX massiv

**Akzeptanzkriterien:**
- [ ] UI: Tooltip/Popover in StationCard
- [ ] Zeigt: Strategic Value, Produktion, Produktionswert, Kaufpreis, ROI
- [ ] Formel: `ROI = Kaufpreis / (Produktionswert pro Runde)`
- [ ] Farb-Coding: ROI <5 Runden=Grün, 5-10=Gelb, >10=Rot

**Berechnung:**
```typescript
const productionValue = station.resourceProduction.reduce(
  (sum, p) => sum + (p.amountPerRound * RESOURCE_CONFIG[p.type].basePrice), 0
);
const roi = (station.strategicValue * 1000) / productionValue;
```

**Quick & Dirty erlaubt:**
- Statische Preise (keine Marktdynamik)
- Einfache Formel

**Dependencies:** Sprint 3 (Stationen) ✅

**Später erweitern:** #15 (Marktpreise), #16 (Prognosen)

---

#### 📋 #4: Runden-Zusammenfassung nach Rundenende
**Referenz:** VS-004, Teil von US-010
**Priority Score:** 8.0 | **Effort:** 2-3h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** sehen was in Runde passiert ist **damit** ich Turn Management verstehe

**Warum jetzt?**
- processRoundEnd läuft (Sprint 2 ✅) aber unsichtbar
- Nutzer versteht nicht was beim "Runde beenden" passiert
- Transparenz = besseres Verständnis

**Akzeptanzkriterien:**
- [ ] UI: RoundSummaryModal (auto-trigger nach Rundenende)
- [ ] Sections: Produktion, Credits-Änderung, Stationen
- [ ] Button: "Weiter zur nächsten Runde"
- [ ] Backend: Speichere roundSummary in Firestore
- [ ] Frontend: useRoundState Hook lädt Summary

**Quick & Dirty erlaubt:**
- Nur Produktion (keine Events)
- Simple Liste (kein Fancy-Design)

**Dependencies:** Sprint 2 (Turn Management) ✅

**Später erweitern:** #21 (Events), #30 (Konkurrenz-Aktionen)

---

### Priority Tier 2: Wirtschafts-Loop 💰 (Sprint 5)

Aktiver Handel, Preisdynamik, NPC-Beziehungen
**Aufwand gesamt:** 9-13 Stunden

---

#### 📋 #5: Kaufe Ressourcen von NPC-Händler
**Referenz:** VS-005, US-200
**Priority Score:** 8.5 | **Effort:** 4-6h | **Value:** ⭐⭐⭐⭐⭐

**Als** Spieler **möchte ich** Ressourcen kaufen **damit** ich aktiv handeln kann

**Akzeptanzkriterien:**
- [ ] UI: "Handeln" Tab in NPC-Dialog
- [ ] Liste aller Ressourcen mit Preisen
- [ ] Slider/Input für Menge, "Kaufen" Button
- [ ] Backend: `buyFromNpc` Cloud Function
- [ ] Preis: `basePrice * 1.2` (+20% NPC-Aufschlag)

**Quick & Dirty erlaubt:**
- Fixe NPC-Preise
- Unendliches NPC-Inventar

**Dependencies:** #1 (Verkaufen) ✅, #2 (NPC) ✅

**Später erweitern:** #6 (variable Preise), #15 (Knappheit)

---

#### 📋 #6: NPC-Preise variieren nach Persönlichkeit
**Referenz:** VS-006, US-001, US-200, US-203
**Priority Score:** 7.5 | **Effort:** 3-4h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** dass NPCs unterschiedlich sind **damit** Handel strategisch ist

**Akzeptanzkriterien:**
- [ ] 3 NPC-Typen: Gierig (+30%), Ehrenhaft (+10%), Vorsichtig (+20%/-5%)
- [ ] UI: Zeige Persönlichkeit + Preismodifier
- [ ] Backend: Berechne Preis mit Modifier
- [ ] Tooltip: "Gierig: +30% auf alle Preise"

**Dependencies:** #5 (Handel) ✅

**Später erweitern:** #8 (Reputation)

---

#### 📋 #7: Zeige Handelshistorie mit NPC
**Referenz:** VS-007, US-201
**Priority Score:** 6.0 | **Effort:** 2-3h | **Value:** ⭐⭐⭐

**Als** Spieler **möchte ich** vergangene Geschäfte sehen **damit** ich Beziehung nachvollziehe

**Akzeptanzkriterien:**
- [ ] UI: "Historie" Tab in NPC-Dialog
- [ ] Liste letzte 10 Transaktionen (Runde, Typ, Ressource, Preis)
- [ ] Backend: Speichere Transaktionen in Firestore (Limit 50)

**Dependencies:** #5 (Handel) ✅

**Später erweitern:** #8 (Reputation), #25 (Statistiken)

---

### Priority Tier 3: Beziehungen & Reputation 🤝 (Sprint 6)

Soziales Kapital wird mechanisch relevant
**Aufwand gesamt:** 8-11 Stunden

---

#### 📋 #8: Zeige Reputation mit 1 NPC
**Referenz:** VS-008, US-300, US-003
**Priority Score:** 8.8 | **Effort:** 3-4h | **Value:** ⭐⭐⭐⭐⭐

**Als** Spieler **möchte ich** Reputation sehen **damit** ich soziales Kapital verstehe

**Akzeptanzkriterien:**
- [ ] UI: Badge in NpcCard (★★★☆☆, 60/100, Farbe: Grün/Gelb/Rot)
- [ ] Backend: npcRelations Struktur (reputation, lastInteraction, totalTrades)
- [ ] Start: 50 (neutral), Handel: +2
- [ ] Levels: Hostile (0-20), Unfriendly (21-40), Neutral (41-60), Friendly (61-80), Ally (81-100)

**Dependencies:** #2 (NPC) ✅

**Später erweitern:** #9 (Preise), #10 (Geschenke), #26 (Gedächtnis)

---

#### 📋 #9: Reputation beeinflusst Preise
**Referenz:** VS-009, US-301, US-203, US-204
**Priority Score:** 7.8 | **Effort:** 2-3h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** dass hohe Reputation bessere Preise bringt **damit** Reputation wichtig ist

**Akzeptanzkriterien:**
- [ ] Formel: `discount = floor((rep - 50) / 10) * 5%` (max ±25%)
- [ ] UI: Zeige Rabatt (z.B. "500 Credits (Freundschaftsrabatt: -15%)")
- [ ] Tooltip: "Verbessere Reputation für bessere Preise"

**Dependencies:** #8 (Reputation) ✅, #6 (Preise) ✅

---

#### 📋 #10: Verbessere Reputation durch Geschenk
**Referenz:** VS-010, US-204
**Priority Score:** 7.5 | **Effort:** 3-4h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** Geschenke machen **damit** ich Beziehungen gestalte

**Akzeptanzkriterien:**
- [ ] UI: "Geschenk machen" Button
- [ ] Auswahl: Ressourcen oder Credits
- [ ] Vorschau: "~800 Credits → +15 Reputation"
- [ ] Backend: `giveGift` Function (max +30 Rep)
- [ ] Feedback: Toast + KI-Dankestext (optional)

**Dependencies:** #8 (Reputation) ✅

**Später erweitern:** #27 (NPC-Präferenzen)

---

### Priority Tier 4: Multiplayer-Basis 👥 (Sprint 7)

2+ Spieler können gemeinsam spielen
**Aufwand gesamt:** 10-14 Stunden

---

#### 📋 #11: Erstelle/Trete Spiel bei (Lobby)
**Referenz:** VS-011, US-010, E-007
**Priority Score:** 8.0 | **Effort:** 6-8h | **Value:** ⭐⭐⭐⭐⭐

**Als** Spieler **möchte ich** Multiplayer-Spiel erstellen/beitreten **damit** ich mit Freunden spiele

**Akzeptanzkriterien:**
- [ ] UI: Lobby Page (/lobby) mit Liste offener Spiele
- [ ] UI: "Neues Spiel erstellen" Modal (Name, Max. Spieler 2-4)
- [ ] Backend: `createGame` Function (Status: waiting → running)
- [ ] Backend: `joinGame` Function (Validierung: nicht voll)
- [ ] UI: Lobby-Screen (Spielerliste, "Bereit" Button)
- [ ] Realtime: useGameLobby Hook (Firestore onSnapshot)

**Quick & Dirty erlaubt:**
- Keine Passwörter (öffentliche Spiele)
- Max 4 Spieler

**Dependencies:** Sprint 2 (Turn Management) ✅

**Später erweitern:** #29 (Private Spiele)

---

#### 📋 #12: Zeige Mitspieler in Spiel
**Referenz:** VS-012
**Priority Score:** 7.0 | **Effort:** 2-3h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** Mitspieler sehen **damit** ich Übersicht habe

**Akzeptanzkriterien:**
- [ ] UI: PlayerList in GameSidebar
- [ ] Avatar, Name, Status (ready/online)
- [ ] Eigener Spieler hervorgehoben
- [ ] Status-Badges (grün=online, grau=offline)

**Dependencies:** #11 (Lobby) ✅

---

#### 📋 #13: Zeige Territorium anderer Spieler
**Referenz:** VS-013, US-022
**Priority Score:** 7.2 | **Effort:** 2-3h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** sehen wem was gehört **damit** ich Konkurrenz visuell erfasse

**Akzeptanzkriterien:**
- [ ] UI: GameMap mit Farben (Grün=eigene, Blau/Rot/Gelb=andere, Grau=neutral)
- [ ] Legende: "🟢 Deine (3) | 🔵 Spieler 2 (2) | ⚪ Neutral (3)"
- [ ] Tooltip: "Gehört zu: Spieler 2"

**Dependencies:** #11 (Multiplayer) ✅, Sprint 3 (GameMap) ✅

---

### Priority Tier 5: Strategische Tiefe 🧠 (Sprint 8)

Mehr NPCs, Knappheit, Prognosen
**Aufwand gesamt:** 9-12 Stunden

---

#### 📋 #14: 3 NPC-Typen
**Referenz:** VS-014, US-001, US-501-503
**Priority Score:** 6.5 | **Effort:** 4-5h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** verschiedene NPCs **damit** Handel vielseitig ist

**NPCs:**
1. Händler Marcus: Gierig, teuer
2. Schmuggler Kira: Riskant, günstig
3. Gildenmeister Taron: Ehrenhaft, fair

**Akzeptanzkriterien:**
- [ ] 3 NPCs mit unterschiedlichen Persönlichkeiten & Preisen
- [ ] UI: NPC-Auswahl (Tabs/Dropdown)
- [ ] KI: Dialoge reflektieren Persönlichkeit

**Dependencies:** #2 (1 NPC) ✅, #6 (Persönlichkeiten) ✅

---

#### 📋 #15: Ressourcenknappheit sichtbar
**Referenz:** VS-015, US-103, US-220, US-221
**Priority Score:** 5.8 | **Effort:** 3-4h | **Value:** ⭐⭐⭐

**Als** Spieler **möchte ich** Knappheit sehen **damit** ich strategisch handle

**Akzeptanzkriterien:**
- [ ] Backend: Berechne supply/demand (scarcity='high' wenn demand > supply*1.5)
- [ ] UI: Badge "⚠️ Metalle knapp: +50% Preis"
- [ ] Backend: Preis-Anpassung bei Knappheit
- [ ] UI: Marktübersicht-Panel (optional)

**Dependencies:** #5 (Handel) ✅

---

#### 📋 #16: Produktionsprognose (3 Runden)
**Referenz:** VS-016, US-102
**Priority Score:** 5.5 | **Effort:** 2-3h | **Value:** ⭐⭐⭐

**Als** Spieler **möchte ich** Zukunft sehen **damit** ich planen kann

**Akzeptanzkriterien:**
- [ ] UI: ProductionForecast Component
- [ ] Zeigt nächste 3 Runden ("Runde 6: +10 Metalle, +5 Energie")
- [ ] Warnung: "⚠️ Inventar voll in Runde 7"

**Dependencies:** Sprint 3 (Produktion) ✅

---

### Priority Tier 6: Progression & Aufstieg 📈 (Sprint 9)

Minor House Aufstieg erlebbar
**Aufwand gesamt:** 11-16 Stunden

---

#### 📋 #17: Zeige Einfluss-Score
**Referenz:** VS-017, US-320, US-321-326
**Priority Score:** 8.2 | **Effort:** 3-4h | **Value:** ⭐⭐⭐⭐⭐

**Als** Spieler **möchte ich** Einfluss sehen **damit** ich Fortschritt messe

**Akzeptanzkriterien:**
- [ ] UI: Influence Panel (Sidebar/Header)
- [ ] Breakdown: Stationen (x50), Credits (/100), Reputation (/10)
- [ ] Formel: `influence = (stations*50) + (credits/100) + (rep/10)`
- [ ] Trend: ↑ grün, ↓ rot

**Dependencies:** Sprint 3 (Stationen) ✅

---

#### 📋 #18: Unlock "Zweite Station" bei Einfluss 100
**Referenz:** VS-018, US-600
**Priority Score:** 7.3 | **Effort:** 2-3h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** dass Stationskäufe Einfluss erfordern **damit** Progression spürbar ist

**Requirements:**
- Station 1: 0 Einfluss
- Station 2: 100 Einfluss
- Station 3: 250 Einfluss

**Akzeptanzkriterien:**
- [ ] Backend: Prüfe Einfluss in purchaseStation
- [ ] UI: Lock-Icon + "Benötigt 100 Einfluss (Du: 75)"
- [ ] Tooltip: "Verdiene Credits oder kaufe Stationen"

**Dependencies:** #17 (Einfluss) ✅

---

#### 📋 #19: Fortschrittsbalken zu Minor House
**Referenz:** VS-019, US-601-603
**Priority Score:** 7.0 | **Effort:** 2-3h | **Value:** ⭐⭐⭐⭐

**Als** Spieler **möchte ich** Fortschritt sehen **damit** ich motiviert bleibe

**Requirements:**
- 3 Stationen
- 500 Einfluss
- 50+ Reputation bei 1 NPC
- 10,000 Credits

**Akzeptanzkriterien:**
- [ ] UI: ProgressBar "75% zu Minor House"
- [ ] Checklist mit ✅/❌ pro Bedingung
- [ ] Notification bei 90%

**Dependencies:** #17 (Einfluss) ✅

---

#### 📋 #20: Aufstieg zu Minor House (Zeremonie)
**Referenz:** VS-020, US-601
**Priority Score:** 8.5 | **Effort:** 4-6h | **Value:** ⭐⭐⭐⭐⭐

**Als** Spieler **möchte ich** Aufstieg feiern **damit** Meilenstein episch ist

**Akzeptanzkriterien:**
- [ ] Trigger: checkMinorHouseEligibility in processRoundEnd
- [ ] UI: Zeremonie-Modal (KI-Text, Konfetti, Sound optional)
- [ ] Button: "Titel annehmen"
- [ ] Backend: player.rank = 'minor_house', title = "Minor House [Name]"
- [ ] UI: Titel überall sichtbar (Navbar, PlayerList)
- [ ] Belohnung: +5000 Credits oder freie Station

**Quick & Dirty erlaubt:**
- Template statt KI-Text
- Keine Sounds/Animationen

**Dependencies:** #19 (Progress) ✅

**Später erweitern:** #45 (Major House)

---

## 💡 Backlog: Tier 7-12 (Stories 21-140)

### Tier 7: Events & Dynamik 🎲 (Stories 21-30)

**#21:** Event-System (KI-generierte Ereignisse) - US-800, US-801
**#22:** Mehrere Ressourcen gleichzeitig handeln
**#23:** Ressourcen-Bundles ("Starter-Pack")
**#24:** Handels-Achievements ("100 Geschäfte")
**#25:** Handels-Statistiken (Charts, Trends) - US-240
**#26:** NPC-Gedächtnis (erinnert Gespräche) - US-003
**#27:** NPC-Präferenzen (mag bestimmte Geschenke)
**#28:** NPC lehnt Geschenke ab (bei schlechter Rep) - US-004, US-005
**#29:** Private Spiele (Passwort-geschützt)
**#30:** Konkurrenz-Aktionen sichtbar - US-802, US-803

---

### Tier 8: Erweiterte Wirtschaft 💎 (Stories 31-40)

**#31:** Hausloyalität (Spione, NPCs) - US-560, US-561
**#32:** NPC-Ziele (NPCs haben eigene Agenda)
**#33:** NPC-Konflikte (NPCs mögen sich nicht)
**#34:** Schwarzmarkt (illegaler Handel)
**#35:** Chat-System (Spieler kommunizieren)
**#36:** Markt-Events (KI-Krisen) - US-221
**#37:** Preischarts (historische Daten)
**#38:** Produktions-Charts (visualisiert)
**#39:** What-If-Szenarien ("Was wenn ich Station X kaufe?")
**#40:** Territorium-Karte (visuelle Grenzen) - US-022, US-023

---

### Tier 9: Einfluss & Politik 🏛️ (Stories 41-50)

**#41:** Influence-History (Chart über Zeit) - US-320
**#42:** Einflussbereiche (geografisch)
**#43:** Alternative Unlock-Pfade (nicht nur Einfluss)
**#44:** Alternative Aufstiegswege - US-602, US-603
**#45:** Aufstieg zu Major House - US-620-622
**#46:** Ämter vergeben (als Major House) - US-550-555
**#47:** Ämter-Privilegien nutzen - US-570-576
**#48:** Ämter verlieren (Skandale) - US-590-593
**#49:** Intrigen gegen Konkurrenten - US-592
**#50:** Politische Allianzen - US-650-654

---

### Tier 10: Militär & Konflikt ⚔️ (Stories 51-60)

**#51:** Baue Schiff - US-050
**#52:** Gruppiere Flotte - US-051
**#53:** Kommandiere Flotte - US-052
**#54:** Sichere Handelsroute - US-053
**#55:** Raubzüge - US-054
**#56:** Militärische Konflikte - US-055
**#57:** Erobere Station (militärisch) - US-023
**#58:** Verteidigungssystem
**#59:** Flotten-Upgrades
**#60:** Militär-Einheiten (verschiedene Typen)

---

### Tier 11: Spionage 🕵️ (Stories 61-80)

**#61:** Rekrutiere Spion - US-500-503
**#62:** Loyalität von Bezahlung - US-520
**#63:** Loyalität von Behandlung - US-521, US-522
**#64:** Abwerben von Spionen - US-523-525
**#65:** Spion-Dialoge - US-540
**#66:** Loyale Spione warnen - US-541
**#67:** Unzufriedene Spione überlaufen - US-542
**#68:** Idealistische Spione verweigern - US-543
**#69:** Geheime Aktionen - US-463
**#70:** Aufdeckung & Skandale - US-480-482, US-302
**#71:** Öffentliche Information - US-460
**#72:** Halböffentliche Aktionen - US-461, US-462
**#73:** Gerüchte-System - US-804
**#74:** Spionage-Missionen (verschiedene Typen)
**#75:** Gegenspionage
**#76:** Informationsverkauf
**#77:** Erpressung
**#78:** Sabotage - US-801
**#79:** Attentate
**#80:** Spionage-Netzwerke

---

### Tier 12: Forschung & Tech 🔬 (Stories 81-100)

**#81:** Forsche Technologie (Tech-Tree) - US-700
**#82:** Tech-Vorteile nutzen - US-701
**#83:** Technologischer Vorsprung - US-702, US-326
**#84:** Tech-Pfade (Militär/Wirtschaft/Spionage) - US-703
**#85:** Produktions-Upgrade (+20%)
**#86:** Handels-Upgrade (bessere Preise)
**#87:** Militär-Upgrade (stärkere Schiffe)
**#88:** Spionage-Upgrade (bessere Agenten)
**#89:** Technologische Obsoleszenz - US-222
**#90:** Technologie-Verkauf
**#91:** Technologie-Spionage
**#92:** Technologie-Monopole
**#93:** Tech-Allianzen
**#94:** Tech-Embargos - US-223
**#95:** Tech-Rennen (kompetitiv)
**#96:** Reverse Engineering
**#97:** Tech-Prototypen
**#98:** Tech-Patente
**#99:** Tech-Lizenzen
**#100:** Tech-Sabotage

---

### Tier 13: Erweiterte Features 🌟 (Stories 101-140)

**#101:** Sektorkontrolle - US-021
**#102:** Ressourcenknappheit (erweitert) - US-103
**#103:** Marktmanipulation - US-240-244
**#104:** Kartelle - US-242
**#105:** Spekulation - US-240
**#106:** Horten - US-241
**#107:** Embargos (politisch) - US-223
**#108:** Verrat hat Konsequenzen - US-205
**#109:** Vergebung - US-004
**#110:** Groll - US-005
**#111:** Beziehungsentwicklung - US-652
**#112:** Bündnisbruch - US-653
**#113:** Opportunistische Diplomatie - US-654
**#114:** Konsultation bei Entscheidungen - US-303
**#115:** Versprechen & Vertrauen - US-304
**#116:** Balance Reputation/Einfluss - US-340-342
**#117:** KI-Hintergrundgeschichte - US-150-152
**#118:** Emergente Narration - US-805
**#119:** Nachrichtensystem (erweitert) - US-802
**#120:** Raumschiff-Designs

*(Weitere 20 Stories aus US-101-805 noch zu detaillieren)*

---

## 📊 Priorisierungs-Formel

```
Priority Score = (Value × 2.0) - (Effort / 10) - Dependencies - Risk

Value:        1-5 (⭐)
Effort:       Stunden
Dependencies: 0-3 (Anzahl blockierender Stories)
Risk:         0-2 (0=niedrig, 1=mittel, 2=hoch)
```

---

## 🎯 Sprint-Empfehlungen

| Sprint | Stories | Theme | Effort | Value |
|--------|---------|-------|--------|-------|
| **Sprint 4** | #1-4 | Quick Wins ⚡ | 8-13h | ⭐⭐⭐⭐⭐ |
| **Sprint 5** | #5-7 | Wirtschaft 💰 | 9-13h | ⭐⭐⭐⭐ |
| **Sprint 6** | #8-10 | Beziehungen 🤝 | 8-11h | ⭐⭐⭐⭐ |
| **Sprint 7** | #11-13 | Multiplayer 👥 | 10-14h | ⭐⭐⭐⭐⭐ |
| **Sprint 8** | #14-16 | Tiefe 🧠 | 9-12h | ⭐⭐⭐ |
| **Sprint 9** | #17-20 | Progression 📈 | 11-16h | ⭐⭐⭐⭐⭐ |

**Velocity-Annahme:** 10-15h/Woche → 2-4 Stories/Sprint

---

## ✅ Bereits Implementiert (Sprint 1-3)

Diese Features sind DONE und bilden die Basis:

### Sprint 1: Technical Foundation ✅
- Web-App (Next.js, Firebase Hosting)
- Google Authentication
- Firestore Database
- Basic UI Components (Navbar, Layout, shadcn/ui)

### Sprint 2: Game Engine ✅
- Turn Management System (processRoundEnd)
- AI Integration (generateNpcDialog, Caching)
- useRoundState Hook
- GameLayout, GameSidebar

### Sprint 3: Resources & Territory ✅
- 5 Ressourcentypen (Metalle, Energie, Nahrung, Komponenten, Luxusgüter)
- ResourceInventory Component
- 8 Stationen auf Karte (GameMap)
- purchaseStation Function
- Ressourcenproduktion (calculateProduction)
- ProductionSummary Component
- StationCard Component

**Status:** Code committed, Deployment ausstehend

---

## 🔄 Backlog Management

### Review-Zyklen
- **Nach jedem Sprint:** Top 20 neu priorisieren
- **Monatlich:** Tier 7-12 detaillieren
- **Quarterly:** Neue Stories aus User Feedback

### Story-Lifecycle
1. **💡 Backlog:** Grob skizziert (1-2 Sätze)
2. **📋 Ready:** Detailliert (Akzeptanzkriterien, Dependencies)
3. **🚧 In Progress:** In Sprint, aktiv entwickelt
4. **✅ Done:** Implementiert, deployed, getestet

### Umpriorisierung
Stories können umpriorisiert werden basierend auf:
- User Feedback (nach Sprint)
- Velocity-Daten (zu optimistisch geschätzt?)
- Neue Erkenntnisse (technische Blocker?)
- Business-Prioritäten (externe Anforderungen)

---

## 📚 Referenz-Dokumente

| Dokument | Status | Verwendung |
|----------|--------|------------|
| **product-backlog.md** | ✅ ACTIVE | Einziges gültiges Backlog |
| **product-planning-principles.md** | ✅ ACTIVE | Planungsprinzipien |
| user-stories.md | 📚 ARCHIV | Referenz (134 Stories) |
| backlog-prioritized.md | 📚 ARCHIV | Alte Phasen-Struktur |
| backlog-analysis-summary.md | 📚 ARCHIV | Alte Analyse |

---

## 🎯 Erfolgsmetriken

### Nach Sprint 4 (Week 1)
- [ ] 80% Tester: "Ich verstehe das Spiel"
- [ ] 70% Tester: "Ich sehe dass KI existiert"
- [ ] 100% können Ressourcen verkaufen

### Nach Sprint 7 (Week 4)
- [ ] 2+ Spieler spielen gemeinsam
- [ ] 70% Tester: "Ich will weiterspielen"

### Nach Sprint 9 (Week 6)
- [ ] Minor House Aufstieg funktioniert
- [ ] 60% spielen 5+ Sessions

---

**Erstellt:** 2025-11-18
**Version:** 3.0 (Konsolidiert)
**Nächste Review:** Nach Sprint 4
**Maintainer:** Product Owner
