# Product Planning Principles - Vertical Slice Approach

**Version:** 1.0
**Datum:** 2025-11-18
**Kontext:** Neuausrichtung der Roadmap-Planung auf nutzerzentrierte Vertical Slices

---

## Ausgangslage & Problem

### Beobachtete Probleme
- **Unsichtbarer Fortschritt:** Viele implementierte Features laufen im Hintergrund und sind für Nutzer nicht erlebbar
- **Lange Wartezeiten:** Nutzer müssen mehrere Sprints warten, bis sie neue Funktionen tatsächlich nutzen können
- **Enabler-Überlastung:** Zu viele technische Stories ohne direkten Nutzerwert
- **Phasen-Denken:** Planung in großen Phasen verschiebt erlebbaren Value nach hinten

### Konkrete Beispiele aus bisheriger Planung
- Phase 0 (Technical Foundation): 7 Enabler ohne spielbaren Output
- Ressourcensystem implementiert, aber Handel noch nicht nutzbar
- NPCs existieren, aber Interaktion ist noch nicht implementiert
- Stationen können kontrolliert werden, aber strategischer Wert ist nicht spürbar

---

## Neue Planungs-Prinzipien

### Prinzip 1: Vertical Slice First

**Definition:**
Jede User Story MUSS einen **end-to-end erlebbaren Wert** aus Nutzersicht liefern.

**Anforderungen:**
- ✅ **Erlebbarkeit:** Nutzer kann die Änderung direkt sehen, fühlen oder nutzen
- ✅ **Vollständigkeit:** Story liefert vollständigen Feature-Durchstich (UI → Backend → Datenbank)
- ✅ **Spielbarkeit:** Nach Story-Abschluss kann Feature im Spiel ausprobiert werden
- ✅ **Feedback-Fähigkeit:** Nutzer kann qualitatives Feedback zum Feature geben

**Anti-Pattern zu vermeiden:**
- ❌ "Backend ist fertig, UI kommt später"
- ❌ "Daten werden gespeichert, aber nirgends angezeigt"
- ❌ "Berechnung funktioniert, aber Nutzer sieht kein Ergebnis"

**Beispiel - Schlecht (Horizontal Slice):**
```
Sprint 1: Datenbank-Schema für Handel
Sprint 2: Backend-API für Handel
Sprint 3: UI für Handel
→ Nutzer wartet 3 Sprints auf erlebbaren Value
```

**Beispiel - Gut (Vertical Slice):**
```
Story: "Basis-Handel mit einem NPC"
- Minimale UI: Ein Händler-NPC, Dialog öffnen, 1 Ressource kaufen
- Minimale Backend-Logik: Transaktion durchführen
- Minimale Datenbank: Credits & Ressourcen aktualisieren
→ Nutzer kann SOFORT handeln und Feedback geben
```

---

### Prinzip 2: Keine Enabler ohne Not

**Definition:**
Technische Enabler-Stories sind nur erlaubt, wenn sie **absolut unverzichtbar** sind und **nicht in eine Vertical Slice integriert** werden können.

**Erlaubte Enabler:**
- ✅ Kritische Infrastruktur ohne die GAR NICHTS läuft (z.B. Authentifizierung)
- ✅ One-Time-Setup (z.B. Projekt-Setup, Deployment-Pipeline)
- ✅ Technische Schulden die Entwicklung BLOCKIEREN

**Verbotene Enabler:**
- ❌ "Vorbereitung für zukünftige Features"
- ❌ "Generisches Framework aufbauen"
- ❌ "Refactoring für bessere Architektur" (außer es blockiert)

**Stattdessen:**
- Baue Infrastruktur **innerhalb** einer Vertical Slice
- Akzeptiere technische Schulden wenn sie **nicht blockieren**
- Refactore **wenn nötig**, nicht präventiv

**Beispiel:**
- ❌ Schlecht: "E-005: AI Integration Foundation" (ohne konkrete Nutzung)
- ✅ Gut: "US-002: Dynamische NPC-Dialoge" (inkl. AI-Integration als Teil der Story)

---

### Prinzip 3: Jede Story = Erlebbarer Value

**Definition:**
Jede abgeschlossene User Story muss **für sich allein** einen messbaren Nutzen bringen, unabhängig von zukünftigen Stories.

**Messbare Nutzen-Typen:**
1. **Spielmechanik:** Nutzer kann etwas Neues TUN
2. **Feedback:** Nutzer sieht Konsequenzen seiner Aktionen
3. **Informationen:** Nutzer versteht das Spiel besser
4. **Emotion:** Nutzer erlebt eine emotionale Reaktion (Freude, Spannung, etc.)

**Test-Frage:**
"Wenn wir nach dieser Story die Entwicklung stoppen würden, hätten Nutzer trotzdem einen Mehrwert gegenüber vorher?"

- ✅ Ja → Story ist gut geschnitten
- ❌ Nein → Story muss umgeschnitten werden

**Beispiel:**
- ❌ Schlecht: "US-100: Basis-Ressourcensystem" (Nutzer sieht Zahlen, kann aber nichts damit TUN)
- ✅ Gut: "Händler verkauft Ressourcen gegen Credits" (Nutzer kann HANDELN)

---

### Prinzip 4: Abhängigkeiten bleiben respektiert

**Definition:**
Trotz Vertical Slice Ansatz müssen **technische und logische Abhängigkeiten** eingehalten werden.

**Regeln:**
- ✅ Story A muss vor Story B wenn B technisch auf A aufbaut
- ✅ Story-Reihenfolge muss **implementierbar** sein
- ✅ Keine "unmöglichen" Stories (z.B. "Handel" ohne "Ressourcen")

**Aber:**
- ✅ Minimale Version von Dependency ist erlaubt
- ✅ Temporäre Lösungen sind erlaubt (siehe Prinzip 6)
- ✅ "Nice-to-have" Dependencies können übersprungen werden

**Beispiel:**
- ❌ Unmöglich: "Marktmanipulation" vor "Handel"
- ✅ Möglich: "Basis-Handel" VOR "Dynamische Preise"
- ✅ Möglich: "Handel mit fixen Preisen" (temporär) → später "Dynamische Verhandlung"

---

### Prinzip 5: Temporäre Features sind erlaubt

**Definition:**
Es ist **explizit erlaubt**, Features zu bauen die **später zurückgebaut** werden, wenn sie **sofort erlebbaren Value** bringen.

**Anwendungsfälle:**
- **Simplified Version:** Baue simple Version eines Features, um es erlebbar zu machen
- **Temporary Scaffolding:** Baue Hilfskonstrukte die später ersetzt werden
- **Quick & Dirty:** Akzeptiere technische Schulden für schnelles Feedback

**Regeln:**
- ✅ Dokumentiere klar was temporär ist
- ✅ Plane Rückbau/Refactoring als separate Story ein
- ✅ Nutzer muss Value erleben, bevor Rückbau passiert

**Beispiel - Template-Dialoge:**
```
Story 1: "NPCs sprechen mit Template-Dialogen" (temporär)
→ Nutzer kann SOFORT mit NPCs reden
→ Feedback: "Dialoge sind repetitiv"

Story 10 (später): "Ersetze Templates durch KI-Dialoge"
→ Nutzer erlebt Verbesserung
→ Feedback: "Wow, jetzt fühlen sich NPCs lebendig an!"
```

**Anti-Pattern:**
- ❌ Warte 3 Monate bis KI-Integration perfekt ist, DANN erst Dialoge
- ✅ Liefere Template-Dialoge nach 1 Woche, ersetze später durch KI

---

### Prinzip 6: Sichtbarmachung bereits gebauter Features

**Definition:**
Für **bereits implementierte Backend-Features** ohne UI müssen **nachträglich User Stories** erstellt werden, um sie erlebbar zu machen.

**Vorgehen:**
1. **Identifiziere:** Welche Backend-Features existieren bereits?
2. **Bewerte:** Welche davon sind für Nutzer unsichtbar?
3. **Erstelle Stories:** "Zeige Feature X in UI" oder "Mache Feature Y nutzbar"
4. **Priorisiere hoch:** Diese Stories bringen **sofortigen** Value (Code ist ja schon da)

**Beispiel aus aktuellem Stand:**
- ✅ Backend: Ressourcenproduktion berechnet ✓
- ❌ UI: Nutzer sieht nicht WAS produziert wird
- 📝 Neue Story: "Zeige Produktionsvorschau für nächste Runde"

**Weitere Beispiele:**
- Reputation wird berechnet → Story: "Zeige Reputations-Historie"
- Stationen haben strategischen Wert → Story: "Zeige warum Station X wertvoll ist"
- NPCs haben Persönlichkeit → Story: "Zeige NPC-Profil mit Eigenschaften"

---

### Prinzip 7: Keine Phasen, nur Value-Inkrement

**Definition:**
Roadmap wird **nicht in Phasen** organisiert, sondern als **priorisierte Liste** von Value-Inkrementen.

**Anforderungen:**
- ✅ Jede Story steht für sich
- ✅ Reihenfolge basiert auf: Value × Abhängigkeit × Risiko
- ✅ Keine künstlichen "Phasen-Grenzen"
- ✅ Flexibilität: Stories können umpriorisiert werden

**Stattdessen:**
- Organisiere nach **Themes** (optional, zur Übersicht)
- Priorisiere nach **Business Value**
- Respektiere **technische Dependencies**

**Beispiel - Alt (Phasen):**
```
Phase 1: Kern-Infrastruktur (Nutzer wartet 4 Wochen)
Phase 2: Basis-Gameplay (Nutzer wartet weitere 3 Wochen)
Phase 3: AI-Features (Nutzer erlebt erst jetzt KI)
```

**Beispiel - Neu (Value-Inkremente):**
```
Story 1: Nutzer kann Spiel starten und Karte sehen (Value: Orientierung)
Story 2: Nutzer kann mit 1 NPC handeln (Value: Erste Interaktion)
Story 3: Nutzer sieht eigene Reputation (Value: Feedback)
Story 4: Nutzer kann Station kaufen (Value: Progression)
...
```

---

## Story-Schnitt: Checkliste

Jede User Story muss folgende Checkliste bestehen:

### Erlebbarkeit
- [ ] **Sichtbar:** Nutzer kann Feature visuell sehen (UI-Element)
- [ ] **Nutzbar:** Nutzer kann Feature aktiv nutzen (Button, Interaktion)
- [ ] **Feedback:** Nutzer sieht Resultat seiner Aktion sofort
- [ ] **Verstehbar:** Nutzer versteht was passiert (Tooltips, Erklärungen)

### Vollständigkeit (Vertical Slice)
- [ ] **UI:** Mindestens minimale UI implementiert
- [ ] **Backend:** Logik funktioniert und ist getestet
- [ ] **Daten:** Persistierung funktioniert (falls nötig)
- [ ] **Integration:** Alle Schichten sind verbunden

### Value
- [ ] **Standalone:** Story bringt für sich allein Nutzen
- [ ] **Messbar:** Value ist beschreibbar (Spielmechanik, Feedback, Info, Emotion)
- [ ] **Test-Bar:** Ein Tester kann Feature ausprobieren und Feedback geben

### Qualität
- [ ] **Funktional:** Feature funktioniert wie beschrieben
- [ ] **Stabil:** Keine kritischen Bugs
- [ ] **Dokumentiert:** Nutzer weiß wie Feature zu nutzen ist

---

## Story-Beispiele: Alt vs. Neu

### Beispiel 1: Handel

**❌ Alt (Horizontal Slices):**
```
E-001: Datenbank-Schema für Ressourcen
E-002: Backend-API für Handel
US-100: Ressourcen-Inventar (nur anzeigen)
US-200: Handels-UI (später)
```
→ Nutzer wartet 4 Stories bis er handeln kann

**✅ Neu (Vertical Slice):**
```
US-001: Händler verkauft Metall gegen Credits
- Mini-UI: 1 Button "Kaufe 10 Metall für 100 Credits"
- Mini-Backend: Transaktion durchführen
- Mini-DB: Credits & Metall aktualisieren
- Nutzer kann SOFORT handeln
```

### Beispiel 2: NPC-Dialoge

**❌ Alt (Enabler-First):**
```
E-005: AI Integration Foundation
E-006: Prompt Template System
US-002: Dynamische NPC-Dialoge
```
→ Nutzer wartet 3 Stories (viele Wochen) bis erste Dialoge

**✅ Neu (Vertical Slice mit Temporär):**
```
US-001: NPC begrüßt Spieler (mit Template)
- 3 vorgefertigte Begrüßungen
- Nutzer kann SOFORT NPCs erleben
- Später: Ersetze durch KI (separate Story)
```

### Beispiel 3: Reputation

**❌ Alt (Backend-First):**
```
US-300: Reputationssystem (nur Berechnung)
US-301: Reputation beeinflusst Preise (später)
US-304: Reputation anzeigen (noch später)
```
→ Nutzer sieht 2 Stories lang keine Reputation

**✅ Neu (Vertical Slice):**
```
US-001: Zeige Reputation mit einem NPC
- UI: Badge "Händler X mag dich: ★★★☆☆"
- Backend: Simple Berechnung (gute Geschäfte = +1)
- Nutzer SIEHT sofort seine Beziehungen
- Spätere Stories erweitern Mechanik
```

---

## Umgang mit bestehender Implementierung

### Für bereits gebaute Features ohne UI:

**Schritt 1: Inventur**
- Liste alle Backend-Features auf
- Markiere was für Nutzer unsichtbar ist

**Schritt 2: Sichtbarmachungs-Stories erstellen**
- Erstelle "Show X" Stories mit hoher Priorität
- Diese sind QUICK WINS (Code existiert schon)

**Schritt 3: Nachträglich priorisieren**
- Sichtbarmachung > Neue Features
- Nutzer sollen sehen was bereits gebaut wurde

**Beispiel:**
```
✅ Bereits gebaut: Ressourcenproduktion-Berechnung
📝 Neue Story: "Zeige Produktionsrate pro Station in UI"
   - Aufwand: 2h (nur UI)
   - Value: HOCH (Nutzer versteht Wirtschaft)
   - Priorität: Sofort
```

---

## Roadmap-Struktur: Neu

### Statt Phasen → Value-Stream

**Organisation:**
```
[Themes nur zur Übersicht, keine harten Grenzen]

Theme: "Erste Schritte"
├─ US-001: Spieler kann Karte sehen
├─ US-002: Spieler sieht eigene Ressourcen
├─ US-003: Spieler kann Station kaufen
└─ US-004: Spieler sieht Kauferfolg-Feedback

Theme: "Erste Interaktion"
├─ US-005: Spieler kann mit 1 NPC sprechen (Template)
├─ US-006: Spieler kann 1 Ressource kaufen
└─ US-007: Spieler sieht Preisänderung nach Kauf

Theme: "Beziehungen"
├─ US-008: Spieler sieht Reputation mit 1 NPC
├─ US-009: Reputation beeinflusst Preis bei 1 NPC
└─ US-010: Spieler kann Reputation durch Geschenk verbessern
...
```

### Priorisierungs-Faktoren:

1. **Business Value** (1-10): Wie viel bringt es dem Nutzer?
2. **Dependencies** (0-5): Wie viele Abhängigkeiten? (weniger = besser)
3. **Effort** (1-10): Wie aufwändig? (weniger = besser)
4. **Risk** (1-5): Wie riskant? (weniger = besser)

**Formel:**
```
Priority Score = (Value × 2) - Dependencies - (Effort / 2) - Risk

Höherer Score = Höhere Priorität
```

---

## Review-Prozess: Definition of Done für Stories

### Vor Story-Start:
- [ ] Story ist als Vertical Slice geschnitten
- [ ] Value ist klar beschrieben
- [ ] Akzeptanzkriterien enthalten UI, Backend UND Nutzererlebnis
- [ ] Dependencies sind geklärt

### Nach Story-Abschluss:
- [ ] **Demo möglich:** PO kann Feature in laufendem Spiel zeigen
- [ ] **Feedback möglich:** Tester können Feature ausprobieren
- [ ] **Standalone:** Feature funktioniert unabhängig von anderen
- [ ] **Dokumentiert:** Nutzer weiß wie es geht

### Review-Fragen:
1. "Kann ich einem Nutzer zeigen was wir gebaut haben?" → Muss JA sein
2. "Bringt das Feature für sich allein Nutzen?" → Muss JA sein
3. "Kann ein Tester das Feature jetzt testen?" → Muss JA sein

---

## Anti-Patterns: Zu vermeiden

### 1. "Big Bang Integration"
- ❌ Backend fertig, Frontend fertig, aber Integration fehlt
- ✅ Baue End-to-End von Anfang an

### 2. "Infrastructure First"
- ❌ Erst perfekte Architektur, dann Features
- ✅ Baue Features, Architektur entsteht dabei

### 3. "Future-Proofing"
- ❌ Baue generisches System für alle möglichen Fälle
- ✅ Baue für konkreten Use Case, refactore bei Bedarf

### 4. "Perfect First Time"
- ❌ Warte bis Feature perfekt ist vor Release
- ✅ Release simple Version, iteriere basierend auf Feedback

### 5. "Invisible Progress"
- ❌ Viele Stories abgeschlossen, aber Nutzer sieht nichts
- ✅ Jede Story zeigt Fortschritt in UI

---

## Kommunikation mit Stakeholdern

### Für Product Owner:
- "Jede Story muss demo-bar sein"
- "Nutzer sollen jede Woche etwas Neues ERLEBEN können"
- "Backend ohne UI ist verschwendete Arbeit"

### Für Entwickler:
- "Quick & Dirty ist OK für erste Version"
- "Temporäre Lösungen sind erlaubt und erwünscht"
- "Perfekte Architektur kommt durch Iteration"

### Für Stakeholder:
- "Ihr könnt jede Woche neuen Fortschritt SEHEN und TESTEN"
- "Feedback kann sofort einfließen"
- "Risiko wird minimiert durch frühe Validierung"

---

## Zusammenfassung: Die 7 Prinzipien

1. **Vertical Slice First:** Jede Story = End-to-End Feature
2. **Keine Enabler ohne Not:** Infrastruktur nur wenn unverzichtbar
3. **Jede Story = Value:** Messbarer Nutzen für jeden Abschluss
4. **Dependencies respektieren:** Technisch machbare Reihenfolge
5. **Temporär ist OK:** Einfache Version jetzt > Perfekte Version später
6. **Sichtbarmachung:** Bereits Gebautes muss erlebbar gemacht werden
7. **Keine Phasen:** Value-Stream statt großer Blöcke

---

## Nächste Schritte

1. **Bestehende Roadmap analysieren:**
   - Identifiziere horizontale Slices
   - Finde unsichtbare Features
   - Markiere Enabler ohne direkten Value

2. **Roadmap neu schneiden:**
   - Erstelle Vertical Slices
   - Definiere Value pro Story
   - Priorisiere nach Value-Score

3. **Quick Wins identifizieren:**
   - Sichtbarmachungs-Stories für bestehendes
   - Simple Features mit hohem Value
   - Risiko-Reduktion durch frühe Validierung

4. **Mit Team teilen:**
   - Workshop: Prinzipien erklären
   - Gemeinsam erste Stories schneiden
   - Review-Prozess etablieren

---

**Erstellt:** 2025-11-18
**Autor:** Product Owner
**Status:** Living Document (wird mit Projekt weiterentwickelt)
**Nächste Review:** Nach ersten 5 Vertical Slices
