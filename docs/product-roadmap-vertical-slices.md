# Product Roadmap - Vertical Slice Approach

**Version:** 2.0 (Reorganisiert)
**Datum:** 2025-11-18
**Product Owner:** Team
**Prinzipien:** [product-planning-principles.md](./product-planning-principles.md)
**Analyse:** [roadmap-analysis.md](./roadmap-analysis.md)

---

## 📋 Roadmap-Übersicht

Diese Roadmap ist **nach Business Value priorisiert**, nicht nach Phasen.

Jede Story ist ein **Vertical Slice**: End-to-End implementiert und sofort für Nutzer erlebbar.

### Organisation
- **Keine Phasen:** Stories stehen für sich, keine künstlichen Grenzen
- **Themes:** Optionale Gruppierung zur Übersicht (nicht verbindlich)
- **Priorisierung:** Value × Dependencies × Effort × Risk
- **Flexibilität:** Reihenfolge kann angepasst werden basierend auf Feedback

### Status-Legende
- ✅ **DONE:** Implementiert, deployed, getestet
- 🚧 **IN PROGRESS:** Wird gerade entwickelt
- 📋 **READY:** Detailliert, bereit für Entwicklung
- 💡 **BACKLOG:** Grob skizziert, noch nicht detailliert

---

## 🎯 Top Prioritäten (Nächste 4 Wochen)

| ID | Story | Value | Effort | Status |
|----|-------|-------|--------|--------|
| VS-001 | Verkaufe Ressourcen an System-Händler | ⭐⭐⭐⭐⭐ | 3-4h | 📋 |
| VS-002 | Spreche mit 1 NPC (Händler Marcus) | ⭐⭐⭐⭐⭐ | 2-4h | 📋 |
| VS-003 | Zeige Station-Wert Breakdown | ⭐⭐⭐⭐ | 1-2h | 📋 |
| VS-004 | Runden-Zusammenfassung nach Rundenende | ⭐⭐⭐⭐ | 2-3h | 📋 |
| VS-005 | Kaufe Ressourcen von NPC-Händler | ⭐⭐⭐⭐⭐ | 4-6h | 💡 |
| VS-006 | NPC-Preise variieren nach Persönlichkeit | ⭐⭐⭐⭐ | 3-4h | 💡 |
| VS-007 | Zeige Handelshistorie mit NPC | ⭐⭐⭐ | 2-3h | 💡 |
| VS-008 | Zeige Reputation mit 1 NPC | ⭐⭐⭐⭐⭐ | 3-4h | 💡 |

---

## 📦 Alle Stories (Priorisiert)

### Theme: Quick Wins - Sichtbarmachung (Week 1) ⚡

> **Ziel:** Bereits implementierte Backend-Features für Nutzer erlebbar machen

---

#### VS-001: Verkaufe Ressourcen an System-Händler ⭐⭐⭐⭐⭐

**Als** Spieler
**möchte ich** meine produzierten Ressourcen an das System verkaufen können
**damit** ich Credits verdiene und einen geschlossenen Wirtschafts-Loop habe

**Value:** SEHR HOCH (schließt Game Loop, Ressourcen werden nutzbar)
**Effort:** 3-4 Stunden
**Priority Score:** 9.5

**Dependencies:**
- ✅ Sprint 3: Ressourcensystem implementiert
- ✅ Sprint 3: ResourceInventory Component existiert
- ✅ Sprint 3: Ressourcenproduktion funktioniert

**Akzeptanzkriterien:**
- [ ] UI: "Verkaufen" Button bei jeder Ressource im Inventar
- [ ] UI: Zeigt aktuellen Verkaufspreis (aus config/resources.ts)
- [ ] UI: Bestätigungs-Dialog "Verkaufe 10 Metalle für 500 Credits?"
- [ ] Backend: `sellResources` Cloud Function
  - Validierung: Spieler hat genug Ressourcen
  - Aktualisiere player.resources (reduziere Menge)
  - Aktualisiere player.credits (erhöhe)
  - Transaktion ist atomic (Firestore Transaction)
- [ ] Feedback: Toast "Du hast 500 Credits erhalten!"
- [ ] Feedback: Credits-Anzeige aktualisiert sich sofort
- [ ] Error Handling: "Nicht genug Ressourcen" Fehler

**Technische Details:**
```typescript
// Neue Cloud Function
export const sellResources = functions.https.onCall(async (data, context) => {
  const { gameId, resourceType, amount } = data;
  // Validierung, Transaktion, Update
});
```

**Quick & Dirty erlaubt:**
- Fixe Preise (aus config, keine Dynamik)
- Kein NPC (System kauft immer)
- Keine Limits (unendliche Nachfrage)

**Später erweitern:** VS-015 (Marktdynamik), VS-006 (NPC-Preise)

---

#### VS-002: Spreche mit 1 NPC (Händler Marcus) ⭐⭐⭐⭐⭐

**Als** Spieler
**möchte ich** mit einem NPC in KI-generierten Dialogen sprechen
**damit** ich die KI-Features des Spiels erlebe

**Value:** SEHR HOCH (macht AI-Investment sichtbar, Kernfeature)
**Effort:** 2-4 Stunden
**Priority Score:** 9.8

**Dependencies:**
- ✅ Sprint 2: generateNpcDialog Cloud Function existiert
- ✅ Sprint 2: AI Integration funktioniert

**Akzeptanzkriterien:**
- [ ] UI: NpcCard Component
  - Name: "Händler Marcus"
  - Avatar/Icon
  - Persönlichkeits-Tags: "Gierig, Geschäftstüchtig"
  - Button: "Sprechen"
- [ ] UI: DialogModal Component
  - Zeigt NPC-Namen oben
  - Zeigt KI-generierte Begrüßung
  - 2-3 Antwortoptionen (vorgefertigt oder KI-generiert)
  - "Beenden" Button
- [ ] Backend: Nutze BESTEHENDE `generateNpcDialog` Function
  - Parameter: npcId, conversationContext
  - Response wird im Modal angezeigt
- [ ] Caching: Nutze bestehendes AI-Caching System
- [ ] Fallback: Bei API-Fehler zeige Template-Dialog
- [ ] Feedback: Dialog öffnet sich ohne Verzögerung (Loading-State)

**NPC-Definition:**
```typescript
const NPC_MARCUS = {
  id: 'npc-marcus',
  name: 'Händler Marcus',
  personality: ['gierig', 'geschäftstüchtig', 'misstrauisch'],
  role: 'trader',
  greeting: 'Was willst du, Fremder? Ich habe keine Zeit für Plaudereien.'
};
```

**Quick & Dirty erlaubt:**
- 1 NPC nur (Marcus)
- Vorgefertigte Antwortoptionen
- Keine Dialog-Konsequenzen (nur Gespräch)
- Keine Gedächtnis-Integration (kommt später)

**Später erweitern:** VS-006 (Preise), VS-007 (Historie), VS-014 (mehr NPCs)

---

#### VS-003: Zeige Station-Wert Breakdown ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** sehen warum eine Station wertvoll ist
**damit** ich informierte Kaufentscheidungen treffe

**Value:** HOCH (verbessert UX, nutzt bestehende Daten)
**Effort:** 1-2 Stunden
**Priority Score:** 8.5

**Dependencies:**
- ✅ Sprint 3: StationCard Component existiert
- ✅ Sprint 3: Station strategicValue berechnet

**Akzeptanzkriterien:**
- [ ] UI: Tooltip/Popover bei StationCard (Hover oder Click)
- [ ] UI: Breakdown zeigt:
  - "Strategic Value: 8/10"
  - "Produktion: 10 Metalle + 5 Energie pro Runde"
  - "Produktionswert: ~550 Credits/Runde"
  - "Kaufpreis: 4000 Credits"
  - "ROI (Return on Investment): ~7.3 Runden"
- [ ] UI: Farb-Coding:
  - ROI < 5 Runden = Grün (sehr gut)
  - ROI 5-10 Runden = Gelb (ok)
  - ROI > 10 Runden = Rot (teuer)
- [ ] Berechnung: Nutze bestehende Produktionsraten
- [ ] Styling: shadcn/ui Tooltip Component

**Berechnung:**
```typescript
const productionValue = station.resourceProduction.reduce((sum, prod) => {
  return sum + (prod.amountPerRound * RESOURCE_CONFIG[prod.type].basePrice);
}, 0);

const roi = station.strategicValue * 1000 / productionValue; // in rounds
```

**Quick & Dirty erlaubt:**
- Einfache ROI-Berechnung (ignoriert Komplexität)
- Statische Ressourcenpreise

**Später erweitern:** VS-015 (Marktpreise), VS-016 (Prognosen)

---

#### VS-004: Runden-Zusammenfassung nach Rundenende ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** nach jeder Runde eine Zusammenfassung sehen
**damit** ich verstehe was passiert ist

**Value:** HOCH (Transparenz, Feedback, Verständnis)
**Effort:** 2-3 Stunden
**Priority Score:** 8.0

**Dependencies:**
- ✅ Sprint 2: processRoundEnd Function existiert
- ✅ Sprint 3: Produktion wird berechnet

**Akzeptanzkriterien:**
- [ ] UI: RoundSummaryModal Component
  - Trigger: Öffnet sich automatisch nach Rundenende
  - Titel: "Runde X beendet!"
  - Sections:
    - **Produktion:** "Du hast produziert: 10 Metalle, 5 Energie"
    - **Credits:** "Credits geändert: +0"
    - **Stationen:** "Keine Änderungen" (später erweitern)
  - Button: "Weiter zur nächsten Runde"
- [ ] Backend: Erweitere processRoundEnd
  - Speichere roundSummary in /games/{id}/rounds/{roundNumber}
  - Struktur: { production, creditsChange, events }
- [ ] Frontend: useRoundState Hook
  - Lade neuestes roundSummary
  - Trigger Modal wenn neu
- [ ] Styling: Animated Modal (fade-in)

**Quick & Dirty erlaubt:**
- Nur Produktion zeigen (keine Events)
- Keine Animationen (falls zu aufwendig)
- Simple Liste (kein Fancy-Design)

**Später erweitern:** VS-021 (Events), VS-030 (Konkurrenz-Aktionen)

---

### Theme: Wirtschafts-Loop (Week 2) 💰

> **Ziel:** Aktiver Handel, Preisdynamik, NPC-Beziehungen

---

#### VS-005: Kaufe Ressourcen von NPC-Händler ⭐⭐⭐⭐⭐

**Als** Spieler
**möchte ich** Ressourcen von NPCs kaufen können
**damit** ich aktiv handeln kann und nicht nur auf Produktion angewiesen bin

**Value:** SEHR HOCH (komplettiert Handels-Loop)
**Effort:** 4-6 Stunden
**Priority Score:** 8.5

**Dependencies:**
- ✅ VS-001: Verkaufen funktioniert
- ✅ VS-002: NPC existiert

**Akzeptanzkriterien:**
- [ ] UI: Erweitere NpcCard oder DialogModal
  - "Handeln" Tab/Button
  - Liste aller Ressourcentypen
  - Aktueller Preis pro Ressource (von NPC)
  - Slider/Input für Menge
  - "Kaufen" Button
- [ ] Backend: `buyFromNpc` Cloud Function
  - Parameter: gameId, npcId, resourceType, amount
  - Validierung: Genug Credits
  - Transaktion: Credits reduzieren, Ressourcen erhöhen
  - NPC-Inventar: Unendlich (später begrenzen)
- [ ] Feedback: Toast "Du hast 10 Metalle für 600 Credits gekauft"
- [ ] Error Handling: "Nicht genug Credits"

**NPC-Preise (zunächst):**
```typescript
const npcPrice = RESOURCE_CONFIG[type].basePrice * 1.2; // +20% Aufschlag
```

**Quick & Dirty erlaubt:**
- Fixe NPC-Preise (+20% auf basePrice)
- Unendliches NPC-Inventar
- Keine Verhandlung (fixer Preis)

**Später erweitern:** VS-006 (variable Preise), VS-015 (Knappheit)

---

#### VS-006: NPC-Preise variieren nach Persönlichkeit ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** dass verschiedene NPCs verschiedene Preise haben
**damit** NPCs sich unterschiedlich anfühlen

**Value:** HOCH (NPC-Diversität, Strategie)
**Effort:** 3-4 Stunden
**Priority Score:** 7.5

**Dependencies:**
- ✅ VS-005: Handel funktioniert
- ✅ VS-002: NPC-Persönlichkeiten existieren

**Akzeptanzkriterien:**
- [ ] 3 NPC-Typen mit Persönlichkeits-Modifiern:
  - **Gieriger Händler:** +30% Verkauf, +20% Kauf (teuer)
  - **Ehrenhafter Händler:** +10% Verkauf, +10% Kauf (fair)
  - **Vorsichtiger Händler:** +20% Verkauf, +5% Kauf (billig kaufen, teuer verkaufen)
- [ ] UI: Zeige Persönlichkeit in NpcCard
- [ ] UI: Tooltip erklärt Preise: "Gierig: +30% auf alle Preise"
- [ ] Backend: Erweitere buyFromNpc & sellToNpc (neue Function)
  - Berechne Preis basierend auf NPC-Modifier
- [ ] Balancing: Mindestens 1 NPC ist "gut" für Kauf, 1 für Verkauf

**NPC-Preisberechnung:**
```typescript
const finalPrice = basePrice * (1 + npc.personality.priceModifier);
```

**Quick & Dirty erlaubt:**
- Simple Multiplikatoren (keine komplexe Formel)
- 3 NPCs ausreichend (nicht 10)

**Später erweitern:** VS-008 (Reputation beeinflusst), VS-015 (Marktdynamik)

---

#### VS-007: Zeige Handelshistorie mit NPC ⭐⭐⭐

**Als** Spieler
**möchte ich** vergangene Geschäfte mit einem NPC sehen
**damit** ich meine Beziehung nachvollziehen kann

**Value:** MITTEL (Feedback, Immersion)
**Effort:** 2-3 Stunden
**Priority Score:** 6.0

**Dependencies:**
- ✅ VS-005: Handel funktioniert

**Akzeptanzkriterien:**
- [ ] UI: "Historie" Tab in NPC-Dialog
- [ ] UI: Liste der letzten 10 Transaktionen
  - Datum/Runde
  - Typ (Kauf/Verkauf)
  - Ressource + Menge
  - Preis
  - Beispiel: "Runde 5: Gekauft 10 Metalle für 600 Credits"
- [ ] Backend: Erweitere buyFromNpc/sellToNpc
  - Speichere Transaktion in /games/{id}/npcRelations/{npcId}/transactions
  - Limit: Letzte 50 (ältere löschen)
- [ ] UI: "Keine Geschäfte" Nachricht wenn leer

**Quick & Dirty erlaubt:**
- Simple Liste (kein Fancy-Chart)
- Keine Statistiken (nur rohe Daten)

**Später erweitern:** VS-008 (Reputation), VS-025 (Statistiken)

---

### Theme: Beziehungen & Reputation (Week 3) 🤝

> **Ziel:** Soziales Kapital wird mechanisch relevant

---

#### VS-008: Zeige Reputation mit 1 NPC ⭐⭐⭐⭐⭐

**Als** Spieler
**möchte ich** meine Reputation bei einem NPC sehen
**damit** ich mein soziales Kapital verstehe

**Value:** SEHR HOCH (Kernmechanik, langfristige Strategie)
**Effort:** 3-4 Stunden
**Priority Score:** 8.8

**Dependencies:**
- ✅ VS-002: NPC existiert
- ⚠️ VS-005: Handel funktioniert (optional, aber sinnvoll)

**Akzeptanzkriterien:**
- [ ] UI: Reputation Badge in NpcCard
  - Anzeige: ★★★☆☆ (3/5 Sterne)
  - Numerisch: "Reputation: 60/100"
  - Farbe: Grün (80+), Gelb (40-79), Rot (0-39)
  - Tooltip: "Deine Beziehung zu Marcus: Neutral"
- [ ] Backend: `npcRelations` Datenstruktur
  ```typescript
  {
    npcId: 'npc-marcus',
    reputation: 60,
    lastInteraction: timestamp,
    totalTrades: 5
  }
  ```
- [ ] Backend: Reputation-Berechnung
  - Start: 50 (neutral)
  - Jeder erfolgreiche Handel: +2
  - (Später: Geschenk: +10, Betrug: -30)
- [ ] UI: "Reputations"-Tab in NPC-Dialog zeigt Details

**Reputation-Stufen:**
```typescript
const REPUTATION_LEVELS = {
  HOSTILE: 0-20,
  UNFRIENDLY: 21-40,
  NEUTRAL: 41-60,
  FRIENDLY: 61-80,
  ALLY: 81-100
};
```

**Quick & Dirty erlaubt:**
- Simple Berechnung (nur Handel zählt)
- Keine komplexen Faktoren

**Später erweitern:** VS-009 (Preise), VS-010 (Geschenke), VS-026 (Gedächtnis)

---

#### VS-009: Reputation beeinflusst Preise bei 1 NPC ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** dass hohe Reputation bessere Preise bringt
**damit** Reputation mechanisch relevant ist

**Value:** HOCH (macht Reputation wichtig, Langzeitstrategie)
**Effort:** 2-3 Stunden
**Priority Score:** 7.8

**Dependencies:**
- ✅ VS-008: Reputation existiert
- ✅ VS-006: Preise variieren

**Akzeptanzkriterien:**
- [ ] Formel: Preis-Rabatt basierend auf Reputation
  ```typescript
  const discount = Math.floor((reputation - 50) / 10) * 5; // -5% bis +25%
  const finalPrice = basePrice * (1 - discount/100);
  ```
  - Rep 80: -15% (Freund)
  - Rep 50: 0% (Neutral)
  - Rep 20: +15% (Feind)
- [ ] UI: Zeige Rabatt in Preisanzeige
  - "Preis: 500 Credits (Freundschaftsrabatt: -15%)"
  - Ursprungspreis durchgestrichen wenn Rabatt
- [ ] UI: Tooltip erklärt Mechanik
  - "Verbessere deine Reputation für bessere Preise!"
- [ ] Backend: Erweitere buyFromNpc & sellToNpc
  - Berechne finalPrice mit Reputation

**Quick & Dirty erlaubt:**
- Lineare Formel (nicht perfekt balanciert)
- Nur 1 NPC zunächst (später alle)

**Später erweitern:** VS-026 (Komplexe Beziehungen), VS-031 (Hausloyalität)

---

#### VS-010: Verbessere Reputation durch Geschenk ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** NPCs Geschenke machen können
**damit** ich Beziehungen aktiv gestalten kann

**Value:** HOCH (Strategie, Player Agency)
**Effort:** 3-4 Stunden
**Priority Score:** 7.5

**Dependencies:**
- ✅ VS-008: Reputation existiert

**Akzeptanzkriterien:**
- [ ] UI: "Geschenk machen" Button in NPC-Dialog
- [ ] UI: Geschenk-Auswahl
  - Ressourcen (Metalle, Komponenten, Luxusgüter)
  - Credits (direkte Zahlung)
  - Menge wählbar
- [ ] UI: Vorschau: "Geschenk-Wert: ~800 Credits → +15 Reputation"
- [ ] Backend: `giveGift` Cloud Function
  - Validierung: Spieler hat Ressourcen/Credits
  - Berechnung: Geschenkwert → Reputation-Gewinn
  ```typescript
  const reputationGain = Math.min(giftValue / 100, 30); // Max +30
  ```
  - Aktualisiere npcRelations
- [ ] Feedback: Toast "Marcus freut sich über dein Geschenk! (+15 Rep)"
- [ ] NPC-Reaktion: KI-generierter Dankestext (optional)

**Geschenk-Wert:**
```typescript
const giftValue = resourceAmount * RESOURCE_CONFIG[type].basePrice;
```

**Quick & Dirty erlaubt:**
- Simple Formel (linearer Zusammenhang)
- Keine NPC-Präferenzen (alle mögen alles gleich)

**Später erweitern:** VS-027 (NPC-Präferenzen), VS-028 (Ablehnung)

---

### Theme: Multiplayer-Basis (Week 4) 👥

> **Ziel:** 2+ Spieler können gemeinsam spielen

---

#### VS-011: Erstelle/Trete Spiel bei (Lobby) ⭐⭐⭐⭐⭐

**Als** Spieler
**möchte ich** ein Multiplayer-Spiel erstellen oder beitreten
**damit** ich mit Freunden spielen kann

**Value:** SEHR HOCH (Kernfeature Multiplayer)
**Effort:** 6-8 Stunden
**Priority Score:** 8.0

**Dependencies:**
- ✅ Sprint 2: Turn Management existiert
- ✅ Sprint 3: Game-Logik existiert

**Akzeptanzkriterien:**
- [ ] UI: Game Lobby Page (/lobby)
  - Liste offener Spiele
  - "Neues Spiel erstellen" Button
  - "Spiel beitreten" Button pro offenes Spiel
- [ ] UI: Create Game Modal
  - Spiel-Name (Input)
  - Max. Spieler (2-4 Dropdown)
  - "Erstellen" Button
- [ ] Backend: `createGame` Cloud Function (erweitern)
  - Erstelle Game in Firestore
  - Status: "waiting" (später "running", "finished")
  - Ersteller ist automatisch Spieler 1
  - Initialisiere Stationen (seeding)
- [ ] Backend: `joinGame` Cloud Function
  - Validierung: Spiel ist "waiting", nicht voll
  - Füge Spieler zu game.players hinzu
  - Erstelle Player-Dokument
- [ ] UI: Lobby-Screen (im Spiel)
  - Liste aller Spieler im Spiel
  - "Bereit" Button (alle müssen ready sein)
  - Wenn alle ready: Spiel startet (Status → "running")
- [ ] Realtime: useGameLobby Hook
  - Firestore onSnapshot für /games/{id}
  - Updates wenn Spieler beitritt/ready ist

**Quick & Dirty erlaubt:**
- Keine Passwort-Protektion (öffentliche Spiele)
- Kein Kick/Ban (alle können beitreten)
- Max 4 Spieler (nicht 6)

**Später erweitern:** VS-029 (Private Spiele), VS-030 (Spectator Mode)

---

#### VS-012: Zeige Mitspieler in Spiel ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** sehen wer mit mir spielt
**damit** ich Übersicht über Konkurrenz habe

**Value:** HOCH (Multiplayer-UX)
**Effort:** 2-3 Stunden
**Priority Score:** 7.0

**Dependencies:**
- ✅ VS-011: Lobby funktioniert

**Akzeptanzkriterien:**
- [ ] UI: PlayerList Component in GameSidebar
  - Liste aller Spieler im Spiel
  - Avatar, Name, Status (ready/not ready, online/offline)
  - Eigene Position hervorgehoben
- [ ] UI: Sortierung
  - Eigener Spieler zuerst
  - Dann nach Beitritts-Reihenfolge
- [ ] UI: Status-Badges
  - Grüner Punkt: Online
  - Grauer Punkt: Offline (>5 min keine Aktivität)
  - "Bereit für Runde X" Badge
- [ ] Realtime: Updates bei Statusänderungen

**Quick & Dirty erlaubt:**
- Simple Liste (kein Fancy-Design)
- Online-Status rudimentär (lastSeen timestamp)

**Später erweitern:** VS-030 (Konkurrenz-Aktionen), VS-035 (Chat)

---

#### VS-013: Zeige Territorium anderer Spieler auf Karte ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** sehen welche Stationen anderen Spielern gehören
**damit** ich Konkurrenz visuell erfasse

**Value:** HOCH (Multiplayer-Erlebnis, Strategie)
**Effort:** 2-3 Stunden
**Priority Score:** 7.2

**Dependencies:**
- ✅ VS-011: Multiplayer funktioniert
- ✅ Sprint 3: GameMap existiert

**Akzeptanzkriterien:**
- [ ] UI: GameMap zeigt Farben pro Spieler
  - Eigene Stationen: Grün
  - Spieler 2: Blau
  - Spieler 3: Rot
  - Spieler 4: Gelb
  - Neutral: Grau
- [ ] UI: Legende
  - "🟢 Deine Stationen (3)"
  - "🔵 Spieler 2 Stationen (2)"
  - "⚪ Neutrale Stationen (3)"
- [ ] Backend: Erweitere StationCard
  - Zeige controlledBy (Player Name)
  - Tooltip: "Gehört zu: Spieler 2"
- [ ] Visuelle Differenzierung
  - Border-Color nach Spieler
  - Oder Background-Tint

**Quick & Dirty erlaubt:**
- Fixe Farben (nicht wählbar)
- Simple Farbkodierung

**Später erweitern:** VS-030 (Spieler-Icons), VS-040 (Territorium-Karte)

---

### Theme: Strategische Tiefe (Week 5) 🧠

> **Ziel:** Mehr NPCs, Knappheit, Prognosen

---

#### VS-014: 3 NPC-Typen mit unterschiedlichen Persönlichkeiten ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** verschiedene NPC-Typen erleben
**damit** Handel vielseitig ist

**Value:** HOCH (Diversität, Wiederspielbarkeit)
**Effort:** 4-5 Stunden
**Priority Score:** 6.5

**Dependencies:**
- ✅ VS-002: 1 NPC existiert
- ✅ VS-006: Persönlichkeiten existieren

**Akzeptanzkriterien:**
- [ ] 3 NPCs implementiert:
  - **Händler Marcus:** Gierig, teuer
  - **Schmuggler Kira:** Riskant, günstig aber illegal (später: Risiko)
  - **Gildenmeister Taron:** Ehrenhaft, fair, hohe Startreputation
- [ ] UI: NPC-Auswahl in Handels-Screen
  - Tabs oder Dropdown
  - Zeigt Persönlichkeit + Preismodifier
- [ ] Backend: NPC-Konfiguration
  ```typescript
  const NPCS = [
    { id: 'marcus', personality: 'gierig', priceModifier: 0.3 },
    { id: 'kira', personality: 'riskant', priceModifier: -0.1 },
    { id: 'taron', personality: 'ehrenhaft', priceModifier: 0.1 }
  ];
  ```
- [ ] KI: Dialoge reflektieren Persönlichkeit
  - Marcus: "Ich will Profit sehen!"
  - Kira: "Pssst, ich habe da was..."
  - Taron: "Ein faires Geschäft, mein Freund."

**Quick & Dirty erlaubt:**
- 3 NPCs ausreichend (nicht 10)
- Persönlichkeit nur in Preisen + Dialogen (keine komplexen Mechaniken)

**Später erweitern:** VS-032 (NPC-Ziele), VS-033 (NPC-Konflikte)

---

#### VS-015: Ressourcenknappheit wird sichtbar ⭐⭐⭐

**Als** Spieler
**möchte ich** sehen wenn Ressourcen knapp sind
**damit** ich strategisch handeln kann

**Value:** MITTEL-HOCH (Strategie, Marktdynamik)
**Effort:** 3-4 Stunden
**Priority Score:** 5.8

**Dependencies:**
- ✅ VS-005: Handel funktioniert

**Akzeptanzkriterien:**
- [ ] Backend: Marktangebot-Berechnung
  ```typescript
  const marketSupply = calculateTotalProduction(game, resourceType);
  const marketDemand = calculateNpcDemand(game); // später erweitern
  const scarcity = demand > supply * 1.5 ? 'high' : 'normal';
  ```
- [ ] UI: Knappheits-Badge bei Ressourcen
  - "⚠️ Metalle sind knapp: Preise +50%"
  - Nur bei scarcity === 'high'
- [ ] Backend: Preis-Anpassung
  ```typescript
  if (scarcity === 'high') finalPrice *= 1.5;
  ```
- [ ] UI: Marktübersicht-Panel (optional)
  - Zeigt Angebot/Nachfrage pro Ressource
  - "Metalle: Hoch gefragt"

**Quick & Dirty erlaubt:**
- Simple Berechnung (nur Gesamtproduktion)
- Keine echte Nachfrage-Simulation (kommt später)
- Statische Threshold (nicht dynamisch)

**Später erweitern:** VS-036 (Marktevents), VS-037 (Preischarts)

---

#### VS-016: Zeige Produktionsprognose für 3 Runden ⭐⭐⭐

**Als** Spieler
**möchte ich** zukünftige Produktion sehen
**damit** ich planen kann

**Value:** MITTEL (Planung, Strategie)
**Effort:** 2-3 Stunden
**Priority Score:** 5.5

**Dependencies:**
- ✅ Sprint 3: Produktion funktioniert

**Akzeptanzkriterien:**
- [ ] UI: ProductionForecast Component
  - Zeigt nächste 3 Runden
  - "Runde 6: +10 Metalle, +5 Energie"
  - "Runde 7: +10 Metalle, +5 Energie"
  - "Runde 8: +10 Metalle, +5 Energie"
- [ ] UI: Gesamt-Prognose
  - "In 3 Runden: +30 Metalle, +15 Energie"
  - "Wert: ~1650 Credits"
- [ ] UI: Warnung bei Kapazitätsüberschreitung
  - "⚠️ Inventar voll in Runde 7!"
- [ ] Berechnung: Basiert auf aktuellen Stationen
  - Berücksichtigt Kapazitätslimit

**Quick & Dirty erlaubt:**
- Statische Prognose (keine Änderungen berücksichtigt)
- 3 Runden ausreichend (nicht 10)

**Später erweitern:** VS-038 (Charts), VS-039 (What-If-Szenarien)

---

### Theme: Progression & Aufstieg (Week 6) 📈

> **Ziel:** Langfristziel "Minor House" ist erlebbar

---

#### VS-017: Zeige Einfluss-Score ⭐⭐⭐⭐⭐

**Als** Spieler
**möchte ich** meinen Einfluss sehen
**damit** ich Fortschritt messe

**Value:** SEHR HOCH (Progression, Motivation)
**Effort:** 3-4 Stunden
**Priority Score:** 8.2

**Dependencies:**
- ✅ Sprint 3: Stationen + Credits existieren

**Akzeptanzkriterien:**
- [ ] UI: Influence Panel in Sidebar oder Header
  - "Einfluss: 250"
  - Breakdown (Tooltip):
    - "Von Stationen: 150 (3 × 50)"
    - "Von Credits: 100 (10,000 / 100)"
    - "Von Reputation: 0 (später)"
- [ ] Backend: calculateInfluence Function
  ```typescript
  const influence =
    (controlledStations.length * 50) +
    (player.credits / 100) +
    (totalReputation / 10); // später
  ```
- [ ] UI: Trend-Indikator
  - Grüner Pfeil ↑ wenn Einfluss steigt
  - Roter Pfeil ↓ wenn sinkt
- [ ] UI: Vergleich mit Mitspielern (optional)
  - "Du bist #2 von 4 Spielern"

**Quick & Dirty erlaubt:**
- Einfache Formel (nicht perfekt balanciert)
- Keine History (nur aktueller Wert)

**Später erweitern:** VS-041 (Influence-History), VS-042 (Einflussbereiche)

---

#### VS-018: Unlock "Zweite Station kaufbar" bei Einfluss 100 ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** dass Stationskäufe Einfluss erfordern
**damit** Progression spürbar ist

**Value:** HOCH (Progression-Gate, Balancing)
**Effort:** 2-3 Stunden
**Priority Score:** 7.3

**Dependencies:**
- ✅ VS-017: Einfluss existiert
- ✅ Sprint 3: Stationskauf funktioniert

**Akzeptanzkriterien:**
- [ ] Backend: Einfluss-Requirements pro Station
  ```typescript
  const STATION_REQUIREMENTS = {
    1: { influence: 0 },      // Erste: Immer möglich
    2: { influence: 100 },    // Zweite: 100 Einfluss
    3: { influence: 250 },    // Dritte: 250 Einfluss
    // ...
  };
  ```
- [ ] Backend: Erweitere purchaseStation
  - Prüfe: player.influence >= requirement
  - Error: "Nicht genug Einfluss"
- [ ] UI: Zeige Requirement in StationCard
  - "Benötigt: 100 Einfluss (Du hast: 75)"
  - Lock-Icon wenn nicht erfüllt
  - Button disabled
- [ ] UI: Tooltip erklärt wie Einfluss steigen kann
  - "Verdiene mehr Credits oder kaufe Stationen"

**Quick & Dirty erlaubt:**
- Lineare Requirements (nicht exponentiell)
- Einfache Formel

**Später erweitern:** VS-043 (Alternative Unlock-Pfade)

---

#### VS-019: Zeige Fortschrittsbalken zu Minor House ⭐⭐⭐⭐

**Als** Spieler
**möchte ich** sehen wie nah ich am Aufstieg bin
**damit** ich motiviert bleibe

**Value:** HOCH (Langzeit-Motivation)
**Effort:** 2-3 Stunden
**Priority Score:** 7.0

**Dependencies:**
- ✅ VS-017: Einfluss existiert

**Akzeptanzkriterien:**
- [ ] UI: ProgressBar Component
  - "Fortschritt zu Minor House"
  - Balken: 75% gefüllt
  - Text: "3/4 Bedingungen erfüllt"
- [ ] UI: Checklist
  - ✅ "Kontrolliere 3 Stationen" (3/3)
  - ✅ "Erreiche 500 Einfluss" (500/500)
  - ✅ "50+ Reputation bei 1 Major House" (60/50)
  - ❌ "10,000 Credits" (7,500/10,000)
- [ ] Backend: Minor House Requirements
  ```typescript
  const MINOR_HOUSE_REQUIREMENTS = {
    stations: 3,
    influence: 500,
    reputation: 50, // bei mind. 1 NPC
    credits: 10000
  };
  ```
- [ ] UI: "Fast geschafft!" Notification bei 90%

**Quick & Dirty erlaubt:**
- Fixe Requirements (nicht dynamisch)
- Einfache Checklist (kein Fancy-Design)

**Später erweitern:** VS-020 (Zeremonie), VS-044 (Alternative Pfade)

---

#### VS-020: Aufstieg zu Minor House (Zeremonie) ⭐⭐⭐⭐⭐

**Als** Spieler
**möchte ich** den Aufstieg zu Minor House feiern
**damit** der Meilenstein episch ist

**Value:** SEHR HOCH (Epischer Moment, Langzeit-Payoff)
**Effort:** 4-6 Stunden
**Priority Score:** 8.5

**Dependencies:**
- ✅ VS-019: Requirements sind trackbar

**Akzeptanzkriterien:**
- [ ] Trigger: Wenn alle Requirements erfüllt
  - Backend: checkMinorHouseEligibility in processRoundEnd
  - Flag: player.eligibleForMinorHouse = true
- [ ] UI: Zeremonie-Modal (Auto-Trigger bei Login)
  - **Titel:** "Herzlichen Glückwunsch!"
  - **Text:** KI-generierte Zeremonie-Rede
    - "Deine Taten haben dich zum Minor House erhoben..."
  - **Animationen:** Konfetti, Fade-In, Sound (optional)
  - **Button:** "Titel annehmen"
- [ ] Backend: Beim Annehmen
  - player.title = "Minor House [PlayerName]"
  - player.rank = "minor_house"
  - Unlock neue Features (z.B. Allianzen)
- [ ] UI: Titel-Änderung überall
  - Navbar: "Minor House AlexTheGreat"
  - PlayerList: Badge "Minor House"
- [ ] Belohnung (optional):
  - +5000 Credits Bonus
  - Oder freie Station

**KI-Zeremonie-Text (Beispiel):**
```
"Spieler [Name], deine Vision und dein Geschick haben dich von einem
einfachen Händler zu einem respektierten Minor House erhoben. Die
Großmächte nehmen dich nun als ebenbürtig wahr. Möge dein Haus gedeihen!"
```

**Quick & Dirty erlaubt:**
- Template-Text statt KI (für MVP)
- Simple Modal (keine aufwendigen Animationen)
- Keine Sound-Effekte (später)

**Später erweitern:** VS-045 (Major House Aufstieg), VS-046 (Ämter)

---

## 📊 Priorisierungs-Matrix

### Priority Score Formula
```
Score = (Value × 2.0) - (Effort / 10) - Dependencies - Risk

Value:      1-5 (⭐)
Effort:     Stunden
Dependencies: 0-3 (Anzahl blockierender Stories)
Risk:       0-2 (0=niedrig, 1=mittel, 2=hoch)
```

### Top 10 nach Priority Score

| Rang | ID | Story | Score | Status |
|------|----|-------|-------|--------|
| 1 | VS-002 | NPC-Dialog | 9.8 | 📋 Ready |
| 2 | VS-001 | Ressourcen verkaufen | 9.5 | 📋 Ready |
| 3 | VS-008 | Reputation zeigen | 8.8 | 💡 Backlog |
| 4 | VS-005 | Ressourcen kaufen | 8.5 | 💡 Backlog |
| 5 | VS-003 | Station-Wert | 8.5 | 📋 Ready |
| 6 | VS-020 | Minor House Aufstieg | 8.5 | 💡 Backlog |
| 7 | VS-017 | Einfluss-Score | 8.2 | 💡 Backlog |
| 8 | VS-011 | Game Lobby | 8.0 | 💡 Backlog |
| 9 | VS-004 | Runden-Summary | 8.0 | 📋 Ready |
| 10 | VS-009 | Reputation → Preise | 7.8 | 💡 Backlog |

---

## 🚀 Sprint-Planung (Empfohlen)

### Sprint 4: Quick Wins (Week 1)
**Ziel:** Sichtbarmachung bestehender Features
**Stories:** VS-001, VS-002, VS-003, VS-004
**Aufwand:** 8-13 Stunden
**Value:** ⭐⭐⭐⭐⭐

### Sprint 5: Wirtschafts-Loop (Week 2)
**Ziel:** Aktiver Handel + Preisdynamik
**Stories:** VS-005, VS-006, VS-007
**Aufwand:** 9-13 Stunden
**Value:** ⭐⭐⭐⭐

### Sprint 6: Beziehungen (Week 3)
**Ziel:** Reputation-System nutzbar machen
**Stories:** VS-008, VS-009, VS-010
**Aufwand:** 8-11 Stunden
**Value:** ⭐⭐⭐⭐

### Sprint 7: Multiplayer (Week 4)
**Ziel:** Gemeinsam spielen
**Stories:** VS-011, VS-012, VS-013
**Aufwand:** 10-14 Stunden
**Value:** ⭐⭐⭐⭐⭐

### Sprint 8: Strategische Tiefe (Week 5)
**Ziel:** Mehr NPCs + Marktdynamik
**Stories:** VS-014, VS-015, VS-016
**Aufwand:** 9-12 Stunden
**Value:** ⭐⭐⭐

### Sprint 9: Progression (Week 6)
**Ziel:** Minor House Aufstieg erlebbar
**Stories:** VS-017, VS-018, VS-019, VS-020
**Aufwand:** 11-16 Stunden
**Value:** ⭐⭐⭐⭐⭐

---

## 📋 Backlog (Stories 21+)

### Theme: Erweiterte Features 💡

**VS-021:** Event-System (KI-generierte Ereignisse)
**VS-022:** Mehrere Ressourcen gleichzeitig handeln
**VS-023:** Ressourcen-Bundles ("Starter-Pack")
**VS-024:** Handels-Achievements ("100 Geschäfte mit Marcus")
**VS-025:** Handels-Statistiken (Charts, Trends)
**VS-026:** NPC-Gedächtnis (erinnert sich an Gespräche)
**VS-027:** NPC-Präferenzen (mag bestimmte Geschenke mehr)
**VS-028:** NPC lehnt Geschenke ab (bei schlechter Rep)
**VS-029:** Private Spiele (Passwort-geschützt)
**VS-030:** Konkurrenz-Aktionen sichtbar ("Spieler X kaufte Station Y")

### Theme: Militär & Konflikte ⚔️

**VS-050:** Baue Schiff (einfaches Militär)
**VS-051:** Beschütze Handelsroute (Flotte zuweisen)
**VS-052:** Erobere Station (Militär)
**VS-053:** Verteidigungssystem (Station absichern)

### Theme: Diplomatie & Allianzen 🤝

**VS-060:** Schließe Allianz mit Spieler
**VS-061:** Handelsabkommen (Preisrabatte)
**VS-062:** Bündnisbruch (mit Konsequenzen)
**VS-063:** Gemeinsame Aktionen (Alliierte helfen)

### Theme: Forschung & Technologie 🔬

**VS-070:** Forsche Technologie (einfacher Tech-Tree)
**VS-071:** Produktions-Upgrade (+20% Produktion)
**VS-072:** Handels-Upgrade (bessere Preise)
**VS-073:** Militär-Upgrade (stärkere Schiffe)

### Theme: Ämter & Häuser 👑

**VS-080:** Werde zum Major House (große Zeremonie)
**VS-081:** Vergebe Amt an Spieler (wenn Major House)
**VS-082:** Nutze Amts-Privilegien (z.B. Flottenkommandant)
**VS-083:** Verliere Amt (durch Skandal)

---

## 📈 Roadmap Metrics

### Velocity-Tracking
- **Planned:** Nach Sprint 4 messen
- **Target:** 10-15h Development/Woche
- **Stories/Sprint:** ~3-4 Stories (basierend auf Effort)

### Value Delivery
- **Week 1-2:** HOCH (Quick Wins + Wirtschaft)
- **Week 3-4:** SEHR HOCH (Beziehungen + Multiplayer)
- **Week 5-6:** HOCH (Tiefe + Progression)

### User Feedback
- **Nach Sprint 4:** "Verstehe ich das Spiel?" (Target: 80% Ja)
- **Nach Sprint 7:** "Will ich weiterspielen?" (Target: 70% Ja)
- **Nach Sprint 9:** "Habe ich ein Langzeitziel?" (Target: 60% Ja)

---

## 🔄 Review & Anpassung

Diese Roadmap ist **living document** und wird angepasst basierend auf:
- User Feedback (nach jedem Sprint)
- Velocity-Daten (Aufwand vs. Schätzung)
- Neue Erkenntnisse (technische Risiken)
- Business-Prioritäten (externe Anforderungen)

**Nächste Review:** Nach Sprint 4 (Week 1)

---

**Erstellt:** 2025-11-18
**Basiert auf:** product-planning-principles.md, roadmap-analysis.md
**Ersetzt:** backlog-prioritized.md (phasenbasiert)
**Status:** Active Roadmap
