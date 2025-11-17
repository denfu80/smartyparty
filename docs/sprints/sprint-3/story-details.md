# Sprint 3 - Story Details

Dieses Dokument enthält die vollständigen Akzeptanzkriterien und technischen Details für jede Story im Sprint.

---

## US-020: Basis-Stationskontrolle

### Story (aus user-stories.md)

Als Spieler möchte ich Raumstationen kontrollieren können, damit ich eine territoriale Basis habe.

### MVP-Scope (aus backlog-prioritized.md)

- 5-8 Stationen auf Karte (fest definiert, nicht prozedural)
- Spieler startet mit 1 Station
- Stationen können übernommen werden (friedlich via Kauf, später militärisch)
- UI zeigt kontrollierte Stationen auf Karte

### Akzeptanzkriterien

- [ ] **8 Stationen werden auf Karte angezeigt** (fest definiert, nicht zufällig)
- [ ] **Spieler startet mit 1 Station** ("Alpha Station", stationId: "station-1")
- [ ] **Stationen können via Kauf übernommen werden**
  - Kaufpreis: `strategicValue × 1000 Credits`
  - Kaufen-Button in StationCard
  - Nach Kauf: `controlledBy` wird aktualisiert
  - Credits werden vom Käufer abgezogen
- [ ] **UI zeigt kontrollierte Stationen farblich markiert**
  - Eigene Stationen: Grün
  - Gegner-Stationen: Rot
  - Neutrale Stationen: Grau
- [ ] **StationCard zeigt Details**
  - Name (z.B. "Alpha Station", "Beta Outpost")
  - Besitzer (Spielername oder "Neutral")
  - Strategischer Wert (1-10)
  - Kaufpreis (wenn nicht eigene Station)

### Technische Umsetzung

**Firestore Schema** (bereits definiert in firebase-techstack.md):
```typescript
// /games/{gameId}/stations/{stationId}
interface Station {
  id: string
  gameId: string
  name: string
  controlledBy?: string // playerId oder "neutral"
  position: { x: number, y: number }
  strategicValue: number // 1-10
  defenseLevel: number
}
```

**Vordefinierte Stationen** (zu seeden bei Game-Erstellung):
```typescript
const STATIONS = [
  { id: 'station-1', name: 'Alpha Station', position: { x: 2, y: 2 }, strategicValue: 5 },
  { id: 'station-2', name: 'Beta Outpost', position: { x: 5, y: 1 }, strategicValue: 3 },
  { id: 'station-3', name: 'Gamma Hub', position: { x: 7, y: 4 }, strategicValue: 7 },
  { id: 'station-4', name: 'Delta Station', position: { x: 3, y: 6 }, strategicValue: 4 },
  { id: 'station-5', name: 'Epsilon Base', position: { x: 8, y: 7 }, strategicValue: 6 },
  { id: 'station-6', name: 'Zeta Mining', position: { x: 1, y: 8 }, strategicValue: 8 },
  { id: 'station-7', name: 'Eta Trade Post', position: { x: 6, y: 5 }, strategicValue: 5 },
  { id: 'station-8', name: 'Theta Research', position: { x: 4, y: 3 }, strategicValue: 9 }
]
```

**Frontend-Komponenten** (zu bauen):
- `components/game/GameMap.tsx` - 8×8 Grid, zeigt Stationen als Marker
- `components/game/StationCard.tsx` - Stationsdetails, Kaufen-Button
- `components/game/StationList.tsx` - Liste aller Stationen (Sidebar)

**Cloud Functions** (optional, kann auch client-side mit Security Rules):
```typescript
// functions/src/stationManagement.ts
export const purchaseStation = onCall(async (request) => {
  const { gameId, playerId, stationId } = request.data

  // Validierung
  const player = await getPlayer(gameId, playerId)
  const station = await getStation(gameId, stationId)

  const price = station.strategicValue * 1000

  if (player.credits < price) {
    throw new functions.https.HttpsError('failed-precondition', 'Nicht genug Credits')
  }

  if (station.controlledBy === playerId) {
    throw new functions.https.HttpsError('failed-precondition', 'Station bereits kontrolliert')
  }

  // Transaktion
  await db.runTransaction(async (transaction) => {
    transaction.update(playerRef, { credits: player.credits - price })
    transaction.update(stationRef, { controlledBy: playerId })
    transaction.update(playerRef, {
      controlledStations: [...player.controlledStations, stationId]
    })
  })

  return { success: true, newCredits: player.credits - price }
})
```

### Notizen

- **Karten-Grid:** 8×8 CSS Grid, jede Zelle kann Station oder leer sein
- **Station-Position:** (x, y) Koordinaten im 8×8 Grid
- **Militärische Eroberung:** Nicht in Sprint 3, kommt später (Phase 4)
- **Sektoren:** Werden in Sprint 4 eingeführt (US-021)

---

## US-100: Basis-Ressourcensystem

### Story (aus user-stories.md)

Als Spieler möchte ich verschiedene Ressourcentypen haben (Metalle, Energie, Nahrung, Luxusgüter), damit Handel und Produktion komplex sind.

### MVP-Scope (aus backlog-prioritized.md)

- **5 Basis-Ressourcentypen** (statt 10): Metalle, Energie, Nahrung, Komponenten, Luxusgüter
- Ressourcen haben unterschiedliche Basispreise
- Spieler hat Inventar mit Kapazitätslimit
- UI zeigt Ressourcen-Inventar

### Akzeptanzkriterien

- [ ] **5 Ressourcentypen definiert**
  - Metalle (`metals`)
  - Energie (`energy`)
  - Nahrung (`food`)
  - Komponenten (`components`)
  - Luxusgüter (`luxury_goods`)
- [ ] **Jede Ressource hat Basispreis**
  - Metalle: 50 Credits
  - Energie: 30 Credits
  - Nahrung: 20 Credits
  - Komponenten: 100 Credits
  - Luxusgüter: 200 Credits
- [ ] **Spieler hat Inventar mit Kapazitätslimit**
  - Kapazität: 500 Einheiten (Summe aller Ressourcen)
  - Start-Inventar: Metalle: 10, Energie: 20, Nahrung: 30, Komponenten: 5, Luxusgüter: 0
- [ ] **ResourceInventory UI zeigt alle 5 Ressourcen**
  - Name, Icon, Menge
  - Basispreis
  - Kapazitätsbalken: "Belegt: 65/500"

### Technische Umsetzung

**Ressourcentypen** (TypeScript):
```typescript
// lib/types/resources.ts
export enum ResourceType {
  METALS = 'metals',
  ENERGY = 'energy',
  FOOD = 'food',
  COMPONENTS = 'components',
  LUXURY_GOODS = 'luxury_goods'
}

export const RESOURCE_CONFIG = {
  metals: {
    name: 'Metalle',
    icon: '⚙️',
    basePrice: 50,
    description: 'Grundlegendes Baumaterial für Schiffe und Stationen'
  },
  energy: {
    name: 'Energie',
    icon: '⚡',
    basePrice: 30,
    description: 'Treibstoff für Schiffe und Stationen'
  },
  food: {
    name: 'Nahrung',
    icon: '🌾',
    basePrice: 20,
    description: 'Lebenserhaltung für Crews'
  },
  components: {
    name: 'Komponenten',
    icon: '🔧',
    basePrice: 100,
    description: 'Elektronik und High-Tech-Bauteile'
  },
  luxury_goods: {
    name: 'Luxusgüter',
    icon: '💎',
    basePrice: 200,
    description: 'Seltene und wertvolle Handelswaren'
  }
}

export const INVENTORY_CAPACITY = 500
```

**Player Schema** (bereits in firebase-techstack.md):
```typescript
interface Player {
  // ... andere Felder
  resources: {
    [resourceType: string]: number
  }
}
```

**Frontend-Komponenten**:
```typescript
// components/game/ResourceInventory.tsx
export function ResourceInventory({ player }: { player: Player }) {
  const totalUsed = Object.values(player.resources).reduce((sum, qty) => sum + qty, 0)

  return (
    <Card>
      <CardHeader>Ressourcen-Inventar</CardHeader>
      <CardContent>
        {Object.entries(RESOURCE_CONFIG).map(([type, config]) => (
          <ResourceRow
            key={type}
            type={type}
            quantity={player.resources[type] || 0}
            config={config}
          />
        ))}
        <CapacityBar used={totalUsed} max={INVENTORY_CAPACITY} />
      </CardContent>
    </Card>
  )
}
```

**Initialisierung** (bei Spieler-Erstellung):
```typescript
// Startressourcen
const initialResources = {
  metals: 10,
  energy: 20,
  food: 30,
  components: 5,
  luxury_goods: 0
}
```

### Notizen

- **Verwendungszwecke:** Werden in späteren Sprints definiert (Schiffsbau, etc.)
- **Ressourcenknappheit:** Wird in Sprint 5+ implementiert (US-103)
- **Dynamische Preise:** Kommen in Phase 5 (US-220, Marktdynamik)
- **Icons:** Unicode-Emojis für MVP, später kann auf SVG-Icons gewechselt werden

---

## US-101: Ressourcenvorkommen (vereinfacht)

### Story (aus user-stories.md)

Als Spieler möchte ich Ressourcenvorkommen in kontrollierten Gebieten finden, damit territoriale Kontrolle wertvoll ist.

### MVP-Scope (aus backlog-prioritized.md)

- Jede Station hat 1-2 Ressourcenvorkommen (fix, nicht prozedural)
- Vorkommen werden auf Karte angezeigt
- UI zeigt welche Station welche Ressource produziert

### Akzeptanzkriterien

- [ ] **Jede Station hat 1-2 Ressourcenvorkommen** (vordefiniert, nicht zufällig)
- [ ] **Vorkommen sind unterschiedlich verteilt**
  - Nicht alle Stationen haben alles
  - Luxusgüter nur bei 2 Stationen verfügbar (selten)
  - Nahrung häufiger als Komponenten
- [ ] **UI zeigt Vorkommen auf GameMap als Icons**
  - Kleine Icons unter Stationsmarker
  - Z.B. "⚙️⚡" = Metalle + Energie
- [ ] **StationCard zeigt detaillierte Produktion**
  - "Produziert: Metalle (10/Runde), Energie (5/Runde)"
  - Nur sichtbar wenn Station kontrolliert wird (oder scouted)

### Technische Umsetzung

**Station Schema Extension**:
```typescript
// /games/{gameId}/stations/{stationId}
interface Station {
  // ... bestehende Felder
  resourceProduction: {
    [resourceType: string]: {
      amountPerRound: number
      currentStock: number
    }
  }
}
```

**Vordefinierte Vorkommen** (zu seeden):
```typescript
const STATION_RESOURCES = {
  'station-1': { // Alpha Station (Starterstation)
    metals: { amountPerRound: 10, currentStock: 0 },
    energy: { amountPerRound: 5, currentStock: 0 }
  },
  'station-2': { // Beta Outpost
    food: { amountPerRound: 15, currentStock: 0 }
  },
  'station-3': { // Gamma Hub
    components: { amountPerRound: 8, currentStock: 0 },
    metals: { amountPerRound: 5, currentStock: 0 }
  },
  'station-4': { // Delta Station
    energy: { amountPerRound: 10, currentStock: 0 },
    food: { amountPerRound: 8, currentStock: 0 }
  },
  'station-5': { // Epsilon Base
    metals: { amountPerRound: 12, currentStock: 0 },
    components: { amountPerRound: 6, currentStock: 0 }
  },
  'station-6': { // Zeta Mining
    luxury_goods: { amountPerRound: 3, currentStock: 0 }, // SELTEN!
    metals: { amountPerRound: 8, currentStock: 0 }
  },
  'station-7': { // Eta Trade Post
    food: { amountPerRound: 12, currentStock: 0 },
    energy: { amountPerRound: 8, currentStock: 0 }
  },
  'station-8': { // Theta Research
    components: { amountPerRound: 10, currentStock: 0 },
    luxury_goods: { amountPerRound: 2, currentStock: 0 } // SELTEN!
  }
}
```

**Verteilungs-Analyse:**
- **Metalle:** 4 Stationen (häufig)
- **Energie:** 4 Stationen (häufig)
- **Nahrung:** 3 Stationen (mittel)
- **Komponenten:** 4 Stationen (mittel)
- **Luxusgüter:** 2 Stationen (SELTEN) → Strategisch wertvoll!

**UI-Updates**:
```typescript
// components/game/StationCard.tsx - Ergänzung
function ProductionInfo({ station }: { station: Station }) {
  if (!station.resourceProduction) return null

  return (
    <div className="production">
      <h4>Produziert:</h4>
      {Object.entries(station.resourceProduction).map(([type, prod]) => (
        <div key={type}>
          {RESOURCE_CONFIG[type].icon} {RESOURCE_CONFIG[type].name}:
          <strong>{prod.amountPerRound}/Runde</strong>
        </div>
      ))}
    </div>
  )
}
```

### Notizen

- **Seltene Ressourcen:** Luxusgüter sind strategisch wichtig → Motivation Theta/Zeta zu erobern
- **Prozedurale Verteilung:** Nicht im MVP, später (Phase 2+)
- **Erschöpfbare Vorkommen:** Nicht im MVP, alle Vorkommen sind unendlich
- **Scouting:** Nicht in Sprint 3, später (Spionage-System)

---

## US-102: Basis-Ressourcenproduktion

### Story (aus user-stories.md)

Als Spieler möchte ich Ressourcen abbauen oder produzieren, damit ich Einkommen generiere.

### MVP-Scope (aus backlog-prioritized.md)

- Kontrollierte Station produziert X Einheiten pro Runde (fix)
- Produktion wird automatisch ins Inventar gelegt
- UI zeigt Produktionsrate

### Akzeptanzkriterien

- [ ] **Kontrollierte Stationen produzieren automatisch bei Rundenende**
  - `processRoundEnd` Cloud Function berechnet Produktion
  - Nur kontrollierte Stationen produzieren (nicht neutrale)
- [ ] **Produktion wird ins Spieler-Inventar gelegt**
  - `player.resources[type] += production.amountPerRound`
  - Bei mehreren Stationen: Summe aller Produktionen
- [ ] **Überschuss über Kapazität wird abgeschnitten**
  - Wenn `totalResources > 500`: Überschuss geht verloren
  - UI warnt: "⚠️ Inventar voll! Überschuss geht verloren"
- [ ] **ProductionSummary UI zeigt Vorschau**
  - "Nächste Runde: +15 Metalle, +10 Energie, +5 Nahrung"
  - Berechnung basiert auf aktuell kontrollierten Stationen
- [ ] **Produktion funktioniert korrekt über 3+ Runden**
  - Integration Test: 3 Runden spielen, Produktion tracken
  - Keine Duplikate, keine Verluste

### Technische Umsetzung

**Cloud Function** (Erweiterung von `processRoundEnd`):
```typescript
// functions/src/roundManagement.ts
async function calculateProduction(gameId: string) {
  const playersSnapshot = await db.collection(`games/${gameId}/players`).get()

  for (const playerDoc of playersSnapshot.docs) {
    const player = playerDoc.data() as Player

    // Hole alle kontrollierten Stationen
    const stationsSnapshot = await db
      .collection(`games/${gameId}/stations`)
      .where('controlledBy', '==', player.id)
      .get()

    // Berechne Gesamtproduktion
    const productionSummary: { [type: string]: number } = {}

    for (const stationDoc of stationsSnapshot.docs) {
      const station = stationDoc.data() as Station

      for (const [resourceType, production] of Object.entries(station.resourceProduction || {})) {
        if (!productionSummary[resourceType]) {
          productionSummary[resourceType] = 0
        }
        productionSummary[resourceType] += production.amountPerRound
      }
    }

    // Update Player Resources (mit Kapazitätslimit)
    const newResources = { ...player.resources }

    for (const [type, amount] of Object.entries(productionSummary)) {
      newResources[type] = (newResources[type] || 0) + amount
    }

    // Kapazitätslimit prüfen
    const totalResources = Object.values(newResources).reduce((sum, qty) => sum + qty, 0)

    if (totalResources > INVENTORY_CAPACITY) {
      // Proportional kürzen
      const factor = INVENTORY_CAPACITY / totalResources
      for (const type in newResources) {
        newResources[type] = Math.floor(newResources[type] * factor)
      }
    }

    // Update Player
    await db.doc(`games/${gameId}/players/${player.id}`).update({
      resources: newResources
    })

    // Log für Debugging
    functions.logger.info(`Player ${player.id} production:`, productionSummary)
  }
}

// In processRoundEnd integrieren:
export const processRoundEnd = onCall(async (request) => {
  const { gameId } = request.data

  // 1. Ressourcenproduktion (NEU!)
  await calculateProduction(gameId)

  // 2. Marktpreise aktualisieren (später)
  // await updateMarketPrices(gameId)

  // 3. NPC-Aktionen (später)
  // await executeNpcActions(gameId)

  // 4. Events generieren (später)
  // await generateGameEvents(gameId)

  // 5. Runde erhöhen
  await startNextRound(gameId)

  return { success: true }
})
```

**Frontend-Komponente**:
```typescript
// components/game/ProductionSummary.tsx
export function ProductionSummary({ player, stations }: Props) {
  // Berechne Vorschau
  const productionPreview = calculateProductionPreview(player, stations)
  const totalProduction = Object.values(productionPreview).reduce((sum, qty) => sum + qty, 0)

  const currentTotal = Object.values(player.resources).reduce((sum, qty) => sum + qty, 0)
  const afterProduction = currentTotal + totalProduction
  const willOverflow = afterProduction > INVENTORY_CAPACITY

  return (
    <Card>
      <CardHeader>Nächste Runde</CardHeader>
      <CardContent>
        {Object.entries(productionPreview).map(([type, amount]) => (
          <div key={type}>
            {RESOURCE_CONFIG[type].icon} +{amount} {RESOURCE_CONFIG[type].name}
          </div>
        ))}
        {willOverflow && (
          <Alert variant="warning">
            ⚠️ Inventar wird voll! Überschuss geht verloren.
            Erweitere Lagerkapazität oder verkaufe Ressourcen.
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
```

**Integration mit E-004**:
- `E-004: Turn Management System` aus Sprint 2 stellt `processRoundEnd` bereit
- Diese Story erweitert diese Function um `calculateProduction`
- Turn-Zyklus bleibt gleich:
  1. Alle Spieler machen Aktionen
  2. Alle markieren sich als "ready"
  3. `processRoundEnd` wird automatisch getriggert
  4. Neue Runde startet

### Notizen

- **Produktionsanlagen:** Nicht in Sprint 3, später (Gebäude-System)
- **Verbesserungen:** Nicht in Sprint 3, später (Tech-Tree)
- **Lagerausbau:** Nicht in Sprint 3, Kapazität bleibt bei 500
- **NPC-Produktion:** Nicht im MVP, nur Spieler produzieren

---

## Technische Checkliste

### Setup & Seeding
- [ ] Station-Seeding-Script schreiben (`lib/seeders/stationSeeder.ts`)
- [ ] Ressourcen-Konfiguration erstellen (`lib/config/resources.ts`)
- [ ] Game-Initialisierung erweitern (Stationen + Start-Ressourcen)

### Cloud Functions
- [ ] `processRoundEnd` um `calculateProduction` erweitern
- [ ] Optional: `purchaseStation` Function (oder client-side)
- [ ] Error Handling für alle Functions

### Frontend Components
- [ ] `GameMap.tsx` - 8×8 Grid mit Stationen
- [ ] `StationCard.tsx` - Details + Kaufen-Button
- [ ] `StationList.tsx` - Sidebar mit allen Stationen
- [ ] `ResourceInventory.tsx` - Inventar-Anzeige
- [ ] `ResourceRow.tsx` - Einzelne Ressource
- [ ] `CapacityBar.tsx` - Kapazitätsbalken
- [ ] `ProductionSummary.tsx` - Produktions-Vorschau
- [ ] `ResourceIcon.tsx` - Icon-Komponente

### Security Rules
- [ ] Firestore Rules für Stations (read: alle, write: nur Functions)
- [ ] Player Resources (read: eigener Spieler, write: nur Functions)

### Testing
- [ ] Unit Tests: `calculateProduction` Logic
- [ ] Integration Test: 3 Runden spielen, Produktion tracken
- [ ] Manual Test: 2 Spieler, Station kaufen, Produktion verifizieren
- [ ] UI Tests: Responsive auf Mobile

---

**Ende des Story-Details-Dokuments**
