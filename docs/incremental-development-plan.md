# Sternenhaus - Inkrementeller Entwicklungsplan

**Version:** 1.0
**Datum:** 2025-11-16
**Ansatz:** Inkrementelle Entwicklung mit kontinuierlicher Value-Generierung

---

## Philosophie

> **Jedes Inkrement muss spielbar sein und Mehrwert bieten.**

- **Setup-Phase:** Technische Grundlagen (nicht spielbar)
- **Core Loop:** Minimales spielbares Spiel (15-20 Stories)
- **Iterationen:** Jede Story erweitert den Core Loop um eine Dimension

**Ziel:** Nach Core Loop kann man bereits spielen, testen und Feedback sammeln. Alle weiteren Iterationen bauen darauf auf.

---

## 🔧 Phase 0: Setup & Infrastructure (2-4 Wochen)

**Ziel:** Technische Grundlagen schaffen. **Noch nicht spielbar.**

### Critical Path:

```
┌─────────────────────────────────────────────┐
│ SETUP PHASE - Nicht spielbar, aber essentiell│
└─────────────────────────────────────────────┘

[NEW] US-910: Save/Load System
├─ [ ] Speichern/Laden von Spielständen
├─ [ ] Versionierung für zukünftige Erweiterungen
├─ [ ] Autosave jede 3 Runden
└─ [ ] Crash Recovery

[NEW] US-011: Hotseat Turn System
├─ [ ] Rundenbasierter Spielerwechsel
├─ [ ] Screen-Blanking zwischen Spielern
├─ [ ] Spieler-Authentifizierung (einfaches Passwort)
└─ [ ] Turn-Timer (optional)

[NEW] US-920: Basic UI Framework
├─ [ ] Hauptmenü (Neues Spiel, Laden, Einstellungen)
├─ [ ] HUD mit Spielerinformationen
├─ [ ] Dialog-System (Textboxen, Auswahlmenü)
├─ [ ] Benachrichtigungs-System
└─ [ ] Karten-View (einfache 2D-Ansicht)

US-100: Ressourcensystem (Basis)
├─ [ ] 5 Basis-Ressourcen (Credits, Metalle, Energie, Nahrung, Luxusgüter)
├─ [ ] Inventar-Datenstruktur
├─ [ ] Preissystem (erstmal statisch)
└─ [ ] UI: Ressourcenanzeige

US-010: Spielstart (Hotseat-Modus)
├─ [ ] 2-4 Spieler Setup
├─ [ ] Startressourcen verteilen
├─ [ ] Rundenlogik implementieren
└─ [ ] Spielende-Bedingung (vorerst: 20 Runden oder Einflussschwelle)

[NEW] US-930: NPC-Infrastruktur (ohne KI)
├─ [ ] NPC-Datenstruktur (Name, Persönlichkeit, Beziehung)
├─ [ ] 3-5 vordefinierte NPC-Typen (Gierig, Ehrenhaft, Opportunistisch)
├─ [ ] Beziehungs-Tracking (numerischer Wert)
└─ [ ] KEIN KI-Dialog (nur Templates)
```

**Deliverable:** Lauffähiges Grundgerüst, wo Spieler Runden spielen können (ohne Gameplay).

**Value:** 0% spielbar, aber 100% notwendig.

---

## 🎮 Phase 1: Core Loop - "The Trader Game" (4-8 Wochen)

**Ziel:** **Minimales spielbares Spiel** - Handel, Reputation, Aufstieg.

### Core Loop:

```
┌─────────────────────────────────────────────┐
│    SPIELER-LOOP (muss Spaß machen!)        │
└─────────────────────────────────────────────┘

1. HANDELN mit NPCs → Credits verdienen
2. REPUTATION aufbauen → bessere Deals
3. RESSOURCEN akkumulieren → Einfluss steigt
4. AUFSTEIGEN → Minor House werden
5. GEWINNEN (höchster Einfluss nach X Runden)
```

### User Stories (Priorität 1):

**Iteration 1.1: Basis-Handel (2 Wochen)**

```
US-200: Dynamische Preisverhandlungen (vereinfacht)
├─ [ ] NPC-Händler haben vordefinierte Preisranges
├─ [ ] Spieler kann Angebot machen
├─ [ ] NPC akzeptiert/lehnt ab basierend auf Preis + Beziehung
└─ [ ] UI: Handels-Dialog mit Slider

US-201: NPCs erinnern sich an Geschäfte
├─ [ ] Geschäfts-Counter pro NPC
├─ [ ] "Wiederholungskunden-Bonus" (5% nach 3 Deals)
├─ [ ] Einfacher Text: "Schön dich wiederzusehen, [Name]"
└─ [ ] KEIN KI-Dialog, nur 3-5 vordefinierte Varianten

US-203: Beziehungen beeinflussen Handel
├─ [ ] Beziehungswert (-100 bis +100)
├─ [ ] Gute Deals erhöhen Beziehung (+5)
├─ [ ] Unfaire Angebote senken Beziehung (-3)
├─ [ ] Beziehung gibt Rabatt: (Beziehung/10)%
└─ [ ] UI zeigt Beziehungswert mit ⭐️-System
```

**Playtest Checkpoint:** Ist Handeln mit 3-5 NPCs bereits unterhaltsam?

---

**Iteration 1.2: Reputation (1 Woche)**

```
US-300: Reputationssystem (Basis)
├─ [ ] Reputation = Durchschnitt aller NPC-Beziehungen
├─ [ ] Anzeige im HUD
├─ [ ] 3 Reputation-Level: Niedrig (<30), Mittel (30-70), Hoch (>70)
└─ [ ] KEIN Fraktionssystem (erstmal global)

US-301: Reputation gibt Verhandlungsvorteile
├─ [ ] Hohe Reputation (>70): +10% bessere Startangebote
├─ [ ] Mittlere Reputation: Normal
├─ [ ] Niedrige Reputation: +10% schlechtere Angebote
└─ [ ] Visuelles Feedback in Handels-UI
```

**Playtest Checkpoint:** Merken Spieler, dass Reputation wichtig ist?

---

**Iteration 1.3: Einfluss & Aufstieg (2 Wochen)**

```
US-320: Einfluss-System (Basis)
├─ [ ] Einfluss = f(Credits, Handelsvolumen)
├─ [ ] Formel: Einfluss = (Credits/100) + (Handelsvolumen/500)
├─ [ ] Anzeige im HUD
└─ [ ] Einflusswert bestimmt Sieg (nach X Runden)

US-600: Progression - Unabhängiger Händler
├─ [ ] Start-Status: "Unabhängiger Händler"
├─ [ ] Bei Einfluss > 50: Zugang zu Premium-NPCs
├─ [ ] Bei Einfluss > 100: Zugang zu Großaufträgen
└─ [ ] UI zeigt Progression-Bar

US-601: Aufstieg zu Minor House (Vereinfacht)
├─ [ ] Bedingung: Einfluss > 200
├─ [ ] Zeremonie-Event (einfacher Text-Dialog)
├─ [ ] Titel ändert sich
├─ [ ] Neue Handelsoptionen (größere Volumen)
└─ [ ] Achievement-Benachrichtigung

US-602: Minor House - Wirtschaftsweg
├─ [ ] Alternative: Handelsvolumen > 10.000 Credits
├─ [ ] Anerkennung durch NPCs (Text-Variante)
└─ [ ] Bonus: -5% auf alle Preise
```

**Playtest Checkpoint:** Ist der Aufstieg befriedigend? Ist das Ziel klar?

---

**Iteration 1.4: Marktdynamik (1-2 Wochen)**

```
US-220: Massenkäufe treiben Preise hoch
├─ [ ] Große Käufe (>10 Einheiten) erhöhen Preis um 10%
├─ [ ] Große Verkäufe senken Preis um 10%
├─ [ ] Effekt hält 2 Runden
└─ [ ] UI zeigt Preistrend (↑↓→)

US-240: Spekulation
├─ [ ] Spieler kann Ressourcen horten
├─ [ ] Lagerkapazität = Einfluss * 10
├─ [ ] Risiko: Preise können auch fallen
└─ [ ] UI: Lager-Übersicht
```

**Playtest Checkpoint:** Entsteht strategische Tiefe? Ist Spekulation lohnend?

---

### Phase 1 Deliverable:

✅ **Spielbares Spiel mit Core Loop**

**Gameplay:**
- 2-4 Spieler handeln mit 5-8 NPCs
- Ressourcen kaufen/verkaufen
- Reputation aufbauen
- Zum Minor House aufsteigen
- Gewinner nach 20 Runden = höchster Einfluss

**Spielzeit:** 30-60 Minuten

**Value:** 100% spielbar, 20% der finalen Vision

**Kritische Frage:** **Macht das Spaß?** Wenn nein, STOPP und überarbeite den Core Loop!

---

## 🚀 Phase 2: Erste Erweiterung - "Lebendige Welt" (3-6 Wochen)

**Ziel:** NPCs fühlen sich lebendig an. Einführung von KI-Dialogen (mit Fallback).

### Iteration 2.1: KI-Persönlichkeiten (2 Wochen)

```
[NEW] US-006: KI-Fallback-System
├─ [ ] KI-Service mit Timeout (3 Sekunden)
├─ [ ] Bei Fehler: Fallback auf Templates
├─ [ ] Caching für häufige Dialoge
├─ [ ] Error-Logging
└─ [ ] UI zeigt "thinking..." während KI-Call

US-001: NPC-Persönlichkeiten (KI-generiert)
├─ [ ] 5 Persönlichkeits-Traits (Greed, Honor, Risk-Taking, Talkativeness, Memory)
├─ [ ] KI generiert Persönlichkeit bei NPC-Erstellung
├─ [ ] Persönlichkeit beeinflusst Verhalten (Parameter-Tuning)
├─ [ ] Fallback: 5 vordefinierte Templates
└─ [ ] UI zeigt Traits mit Icons

US-002: Dynamische Dialoge (erste Version)
├─ [ ] KI-generierte Begrüßungen
├─ [ ] KI-generierte Reaktionen auf Angebote
├─ [ ] Kontext: Persönlichkeit + Beziehung + letztes Geschäft
├─ [ ] Fallback: Template-basiert (wie Phase 1)
└─ [ ] Max 2 Dialog-Runden pro Verhandlung

US-003: NPC-Gedächtnis
├─ [ ] NPCs erinnern sich an letzte 5 Interaktionen
├─ [ ] KI referenziert vergangene Events ("Letzte Woche hast du...")
├─ [ ] Gedächtnis beeinflusst Beziehung
└─ [ ] UI: "Beziehungshistorie" anzeigen
```

**Value Increment:** NPCs fühlen sich einzigartig und lebendig an.

---

### Iteration 2.2: Events (1-2 Wochen)

```
[NEW] US-800-Simple: Handgeschriebene Events
├─ [ ] 10 vordefinierte Events (Seuche, Boom, Embargo, etc.)
├─ [ ] Events triggern basierend auf Spielzustand
├─ [ ] Events haben 2-3 Antwortoptionen
├─ [ ] Konsequenzen sind klar definiert
└─ [ ] UI: Event-Popup mit Auswahl

US-221: Krisen-Events
├─ [ ] Seuche erhöht Medikamentenpreise (+50%)
├─ [ ] Technologie-Boom senkt alte Waren-Preise (-30%)
├─ [ ] Events dauern 3-5 Runden
└─ [ ] NPCs kommentieren Events (KI-generiert oder Template)
```

**Value Increment:** Welt fühlt sich dynamisch an, nicht statisch.

---

### Iteration 2.3: Hintergrundgeschichten (1 Woche)

```
US-150: KI-Hintergrundgeschichte
├─ [ ] Bei Spielstart: KI generiert Backstory (3 Absätze)
├─ [ ] Backstory beeinflusst Startbedingungen:
│   ├─ Ex-Militär: +1 Schiff, -500 Credits (Schulden)
│   ├─ Erbin: +1000 Credits, -20 Reputation (Neid)
│   └─ Selbstgemacht: Neutral
├─ [ ] Fallback: 5 vordefinierte Backstories
└─ [ ] UI: Zeige Backstory im Character Sheet

US-151: Backstory beeinflusst Startbedingungen
├─ [ ] Siehe oben
└─ [ ] Varianz: ±30% Ressourcen

US-152: NPCs reagieren auf Backstory
├─ [ ] 1-2 NPCs erwähnen Backstory in Dialogen
├─ [ ] KI-generiert mit Context: "Ich habe gehört, du warst bei der Flotte..."
└─ [ ] Nur einmal pro NPC (nicht nervig)
```

**Value Increment:** Jeder Spielstart fühlt sich einzigartig an.

---

### Phase 2 Deliverable:

✅ **Core Loop + Lebendige Welt**

**Neu:**
- NPCs haben Persönlichkeiten und erinnern sich
- Dialoge sind dynamisch (KI oder Template)
- Events bringen Abwechslung
- Jeder Spielstart ist anders

**Value:** 100% spielbar, 35% der finalen Vision

---

## 🌍 Phase 3: Zweite Erweiterung - "Expansion & Territorien" (4-6 Wochen)

**Ziel:** Spieler können expandieren, nicht nur handeln.

### Iteration 3.1: Territorien (2 Wochen)

```
US-020: Stationskontrolle
├─ [ ] 10-15 Stationen auf Karte
├─ [ ] Stationen haben Owner (NPC oder Spieler)
├─ [ ] Kontrolle gibt passives Einkommen (Ressourcen/Runde)
└─ [ ] UI: Karte mit Stations-Icons

[NEW] US-024: Stationen kaufen
├─ [ ] Preis = Station-Wert (1000-5000 Credits)
├─ [ ] Besitzer muss verkaufen wollen (Beziehung >50)
├─ [ ] Kauf erhöht Einfluss (+20)
└─ [ ] UI: "Station kaufen" Button im Dialog

[NEW] US-025: Stationen durch Verträge übernehmen
├─ [ ] Angebot: "Werde mein Vasall, behalte Station"
├─ [ ] NPC akzeptiert wenn: Reputation >70 ODER unter Druck
└─ [ ] Vasallen zahlen Tribut (10% Einkommen)

US-101: Ressourcenvorkommen
├─ [ ] Jede Station hat 1-2 Ressourcenvorkommen
├─ [ ] Kontrolle → Produktion (5-10 Einheiten/Runde)
├─ [ ] Seltene Ressourcen sind wertvoller
└─ [ ] UI: Station-Info zeigt Vorkommen

US-102: Ressourcenproduktion
├─ [ ] Automatisch jede Runde
├─ [ ] Geht ins Inventar
├─ [ ] Lagerkapazität beachten
└─ [ ] UI: Produktions-Übersicht
```

**Value Increment:** Spieler können expandieren, nicht nur handeln. Neue Strategie-Dimension.

---

### Iteration 3.2: Sektoren (1 Woche)

```
US-021: Sektorkontrolle
├─ [ ] 3-5 Sektoren mit je 3-5 Stationen
├─ [ ] Sektor-Bonus wenn >50% der Stationen kontrolliert
├─ [ ] Bonus: +50% Produktion ODER -20% Kosten
└─ [ ] UI: Sektor-Übersicht auf Karte

US-322: Einfluss durch Territorien
├─ [ ] Jede Station: +10 Einfluss
├─ [ ] Sektor-Kontrolle: +50 Einfluss
└─ [ ] Strategische Stationen: +20 Einfluss
```

**Value Increment:** Meta-Layer für territoriale Strategie.

---

### Iteration 3.3: Aufstieg zu Major House (1 Woche)

```
US-620: Aufstieg durch territoriale Präsenz
├─ [ ] Bedingung: 2 Sektoren kontrolliert
├─ [ ] ODER: 8+ Stationen
├─ [ ] Zeremonie (text-basiert)
└─ [ ] Neue Privilegien (siehe Phase 4)

US-622: Reputation-Check für Aufstieg
├─ [ ] Zusatzbedingung: Reputation >60
├─ [ ] Ohne Reputation: Aufstieg blockiert
└─ [ ] NPCs müssen "anerkennen"
```

**Value Increment:** Zweite Progressionsstufe. Langfristiges Ziel.

---

### Phase 3 Deliverable:

✅ **Core Loop + Expansion**

**Neu:**
- Stationen kaufen/übernehmen
- Territorien produzieren Ressourcen
- Sektoren kontrollieren
- Zum Major House aufsteigen

**Value:** 100% spielbar, 50% der finalen Vision

---

## 🎭 Phase 4: Dritte Erweiterung - "Politik & Ämter" (4-6 Wochen)

**Ziel:** Politische Dimension. Ämter bringen Privilegien.

### Iteration 4.1: Ämter-System (2 Wochen)

```
US-550: Ämter-Vergabe
├─ [ ] 5 Ämter-Typen (vorerst):
│   ├─ Handelslizenz-Verwalter
│   ├─ Ressourcen-Monopolist
│   ├─ Flottenkommandant (wenn Militär implementiert)
│   ├─ Geheimdienstchef (wenn Spionage implementiert)
│   └─ Ratsmitglied (Diplomatie-Bonus)
├─ [ ] Major Houses vergeben Ämter
├─ [ ] Basierend auf Reputation + Leistung
└─ [ ] UI: Ämter-Übersicht

US-551-553: Vergabe-Kriterien
├─ [ ] Reputation >70 erforderlich
├─ [ ] Vergangene Leistungen zählen (Gedächtnis)
├─ [ ] Kontext: Krieg → militärische Ämter bevorzugt
└─ [ ] UI: "Amt bewerben" Button

US-324: Einfluss durch Ämter
├─ [ ] Jedes Amt: +30 Einfluss
├─ [ ] Höhere Ämter: +50 Einfluss
└─ [ ] Amtsverlust: Sofortiger Entzug
```

---

### Iteration 4.2: Ämter-Privilegien (2 Wochen)

```
US-570-571: Handelslizenz-Verwalter
├─ [ ] Kann Zölle erheben (0-20% auf Handel in Sektor)
├─ [ ] Kann Handelsverbot aussprechen (1 Spieler)
├─ [ ] Zolleinnahmen gehen an Amtsinhaber
└─ [ ] Missbrauch senkt Reputation

US-574-575: Ressourcen-Monopolist
├─ [ ] Vorkaufsrecht für 1 Ressource
├─ [ ] Preiskontrolle (kann Preise um ±20% ändern)
├─ [ ] Monopol bringt passives Einkommen
└─ [ ] Zu hohe Preise → Schmuggel (später)

[NEW] US-577: Ratsmitglied
├─ [ ] Diplomatie-Bonus (+20% auf Verhandlungen)
├─ [ ] Kann Allianzen vermitteln
└─ [ ] Beziehungen bauen sich 2x schneller auf
```

**Value Increment:** Politische Macht als neue Strategie-Dimension.

---

### Iteration 4.3: Ämter-Dynamik (1 Woche)

```
US-590: Ämter-Entzug durch Skandale
├─ [ ] Niedrige Reputation (<40) → Entzug-Risiko
├─ [ ] Skandale (später: Spionage) können Ämter kosten
├─ [ ] Öffentliche Bekanntmachung
└─ [ ] Kann zurückgewonnen werden

US-593: Permanente Unsicherheit
├─ [ ] Alle 5 Runden: Überprüfung durch Haus
├─ [ ] Bei schlechter Performance: Entzug
└─ [ ] UI: "Amtssicherheit" Anzeige (0-100%)
```

**Value Increment:** Ämter sind mächtig aber unsicher. Spannungselement.

---

### Phase 4 Deliverable:

✅ **Core Loop + Politik**

**Neu:**
- Ämter in Major Houses
- Privilegien nutzen
- Politische Macht aufbauen
- Ämter verteidigen

**Value:** 100% spielbar, 65% der finalen Vision

---

## 🕵️ Phase 5: Vierte Erweiterung - "Spionage & Intrigen" (6-8 Wochen)

**Ziel:** Geheime Aktionen und Informationskrieg.

### Iteration 5.1: Geheime Aktionen (2 Wochen)

```
[NEW] US-012: Geheime Aktionen im Hotseat
├─ [ ] Password-Protected Turn Phase
├─ [ ] Screen-Blanking nach Eingabe
├─ [ ] "Geheime Aktion"-Menü (nur für aktuellen Spieler)
└─ [ ] Aktionen werden geheim gespeichert

US-463: Geheime Aktionstypen
├─ [ ] Bestechung (NPC überzeugen für Geld)
├─ [ ] Sabotage (Produktion einer Station -50% für 3 Runden)
├─ [ ] Schmuggel (Embargo umgehen)
├─ [ ] Intrige (Gerücht streuen)
└─ [ ] UI: Geheime Aktionen-Menü

US-480: Aufdeckung
├─ [ ] Jede geheime Aktion hat Aufdeckungs-Chance (20-40%)
├─ [ ] Aufdeckung nach 1-3 Runden
├─ [ ] Skandal-Event
└─ [ ] Reputationsverlust (-30 bis -50)
```

**Value Increment:** Neue riskante Strategie-Option. Spannung durch Geheimhaltung.

---

### Iteration 5.2: Spione (3 Wochen)

```
US-500: Spione rekrutieren
├─ [ ] 10-15 Spione verfügbar
├─ [ ] Persönlichkeiten (Gierig, Idealistisch, Opportunistisch)
├─ [ ] Rekrutierungskosten
└─ [ ] UI: Spion-Rekrutierungs-Menü

US-501-503: Spion-Persönlichkeiten
├─ [ ] Gierig: Billig abzuwerben
├─ [ ] Idealistisch: Lehnt unmoralische Missionen ab
├─ [ ] Opportunistisch: Geht zum Höchstbietenden
└─ [ ] Persönlichkeit beeinflusst Verhalten

US-520-525: Loyalitätssystem
├─ [ ] Loyalität (0-100)
├─ [ ] Hängt ab von: Bezahlung, Behandlung, Hausloyalität
├─ [ ] Niedrige Loyalität → Überlaufen
├─ [ ] UI: Loyalitäts-Anzeige

US-523-524: Spione abwerben
├─ [ ] Spieler können Spione anderer abwerben
├─ [ ] Kosten = Basislohn * (Loyalität/50)
├─ [ ] Loyale Spione warnen ihren Meister
└─ [ ] UI: "Spion abwerben" Aktion
```

**Value Increment:** Informationskrieg als neue Dimension. Spionage-Gameplay.

---

### Iteration 5.3: Spionage-Missionen (2 Wochen)

```
[NEW] US-505: Informationen sammeln
├─ [ ] Spion kann Infos über Gegner sammeln:
│   ├─ Ressourcen-Stand
│   ├─ Geplante Aktionen
│   ├─ Beziehungen
│   └─ Geheime Deals
├─ [ ] Erfolgswahrscheinlichkeit hängt von Spion ab
└─ [ ] UI: Spionage-Bericht

[NEW] US-506: Gegenspionage
├─ [ ] Spione können gegnerische Spione aufdecken
├─ [ ] Aufgedeckte Spione: Gefangen oder eliminiert
└─ [ ] Katz-und-Maus-Spiel

US-592: Intrigen gegen Konkurrenten
├─ [ ] Spione können Gerüchte streuen
├─ [ ] Ziel: Ämter entziehen, Reputation schädigen
├─ [ ] Risiko: Wenn entdeckt, selbst Schaden
└─ [ ] UI: Intrigen-Menü
```

**Value Increment:** Vollständiges Spionage-System. Komplexe Interaktionen.

---

### Phase 5 Deliverable:

✅ **Core Loop + Spionage**

**Neu:**
- Geheime Aktionen
- Spione rekrutieren und managen
- Informationen sammeln
- Intrigen spinnen

**Value:** 100% spielbar, 80% der finalen Vision

---

## ⚔️ Phase 6: Fünfte Erweiterung - "Militär & Konflikte" (6-8 Wochen)

**Ziel:** Militärische Dimension. Konflikte und Eroberung.

### Iteration 6.1: Flotten-Basis (2 Wochen)

```
US-050: Schiffe bauen/kaufen
├─ [ ] 5 Schiffstypen (Scout, Fregatte, Kreuzer, Transporter, Flaggschiff)
├─ [ ] Unterschiedliche Kosten und Fähigkeiten
├─ [ ] Bauzeit: 2-5 Runden
├─ [ ] Kauf: Sofort, aber 2x teurer
└─ [ ] UI: Schiffswerft-Menü

US-051: Flotten gruppieren
├─ [ ] Mehrere Schiffe zu Flotte zusammenfassen
├─ [ ] Flottenkommandant (vorerst: Spieler)
├─ [ ] Flottenübersicht
└─ [ ] UI: Flotten-Manager

US-052: Flotten kommandieren
├─ [ ] Befehle: Bewegen, Patrouille, Angriff, Verteidigung
├─ [ ] Rundenbasierte Bewegung
└─ [ ] UI: Flotten-Kommando auf Karte
```

---

### Iteration 6.2: Kampfsystem (3 Wochen)

```
[NEW] US-056: Kampfmechanik
├─ [ ] Automatischer Kampf (kein taktisches Spiel)
├─ [ ] Kampfkraft = Summe(Schiffsstärken)
├─ [ ] Modifikatoren: Verteidiger-Bonus, Tech-Level
├─ [ ] Schiffsverluste basierend auf Stärkeverhältnis
└─ [ ] UI: Kampfbericht

[NEW] US-057: Stationen erobern
├─ [ ] Militärische Eroberung möglich
├─ [ ] Erfordert: Flotte + Kampf gewinnen
├─ [ ] Eroberte Station wechselt Besitzer
├─ [ ] Reputationsverlust für Aggressor (-20)
└─ [ ] Verteidiger kann zurückschlagen

[NEW] US-058: Verteidigung
├─ [ ] Stationen haben Verteidigungswert
├─ [ ] Kann durch Bauten erhöht werden
├─ [ ] Verteidiger-Bonus (+30%)
└─ [ ] UI: Verteidigungs-Anzeige
```

---

### Iteration 6.3: Militärische Aktionen (2 Wochen)

```
US-053: Routen sichern
├─ [ ] Flotte auf Patrouille → -50% Piraten-Risiko
├─ [ ] Gesicherte Routen: +10% Handelsvolumen
└─ [ ] Kosten: Flotten-Unterhalt

US-054: Raubzüge
├─ [ ] Flotte überfällt Handelsroute
├─ [ ] Beute = 10-30% des Handelsvolumens
├─ [ ] Risiko: Aufdeckung → Reputation -40
└─ [ ] Kann geheim sein (Spionage-System)

US-323: Einfluss durch Militär
├─ [ ] Flottengröße → Einfluss
├─ [ ] Formel: Einfluss = Flottenstärke / 10
├─ [ ] Militärische Siege: +20 Einfluss
└─ [ ] UI: Militär-Stärke Anzeige
```

**Value Increment:** Militärische Strategie-Option. Eroberung möglich.

---

### Phase 6 Deliverable:

✅ **Core Loop + Militär**

**Neu:**
- Flotten bauen und kommandieren
- Kämpfe und Eroberungen
- Routen sichern oder überfallen
- Militärischer Einfluss

**Value:** 100% spielbar, 90% der finalen Vision

---

## 🔬 Phase 7: Letzte Erweiterung - "Forschung & Emergente Events" (4-6 Wochen)

**Ziel:** Tech-Tree und vollständig emergente Narration.

### Iteration 7.1: Forschungssystem (2 Wochen)

```
US-700: Tech-Tree
├─ [ ] 20 Technologien in 3 Pfaden:
│   ├─ Militär (bessere Schiffe, Waffen)
│   ├─ Wirtschaft (Produktions-Boni, Handels-Effizienz)
│   └─ Spionage (bessere Spione, Tarnungen)
├─ [ ] Dependencies zwischen Techs
├─ [ ] UI: Tech-Tree Ansicht

US-701: Forschungs-Vorteile
├─ [ ] Jede Tech bringt messbaren Vorteil
├─ [ ] z.B. "Fortgeschrittene Metallurgie" → +20% Schiffsproduktion
├─ [ ] Freischaltung neuer Einheiten/Gebäude
└─ [ ] UI: Tech-Effekte klar anzeigen

US-326: Einfluss durch Tech
├─ [ ] Fortschrittliche Techs → Einfluss
├─ [ ] Exklusive Techs → +50 Einfluss
└─ [ ] Technologieführerschaft sichtbar

US-702: Tech-Vorsprung nutzen
├─ [ ] Technologie verkaufen (an NPCs)
├─ [ ] Monopol-Vorteile
└─ [ ] Andere können spionieren (langsamer)
```

**Value Increment:** Langfristige strategische Planung. Tech-Pfad Entscheidungen.

---

### Iteration 7.2: Emergente Events (KI) (3 Wochen)

```
US-800: KI-Event-Generierung
├─ [ ] KI generiert Events basierend auf Spielzustand
├─ [ ] Kontext: Wer ist führend? Konflikte? Wirtschaftslage?
├─ [ ] 2-3 Events pro Partie
├─ [ ] Fallback: Handgeschriebene Events
└─ [ ] UI: Dramatische Event-Darstellung

US-801: Reaktionen auf Sabotage
├─ [ ] KI erkennt wenn Station geschwächt wird
├─ [ ] NPCs können opportunistisch profitieren
├─ [ ] Generierte Konsequenzen
└─ [ ] Unbeabsichtigte Effekte möglich

US-802-804: Nachrichtensystem
├─ [ ] KI-generierte News basierend auf Ereignissen
├─ [ ] NPCs kommentieren Expansion, Allianzen, Skandale
├─ [ ] Gerüchte verbreiten sich
└─ [ ] UI: News-Feed

US-805: Lebendige Welt
├─ [ ] Integration aller Systeme
├─ [ ] NPCs reagieren konsistent
├─ [ ] Langfristige Konsequenzen
└─ [ ] Immersion durch Reaktivität
```

**Value Increment:** Vollständig emergente, lebendige Spielwelt. Jede Partie einzigartig.

---

### Phase 7 Deliverable:

✅ **VOLLSTÄNDIGES SPIEL**

**Neu:**
- Forschungssystem
- KI-generierte emergente Events
- Vollständig reaktive Welt

**Value:** 100% spielbar, 100% der finalen Vision

---

## 📊 Zusammenfassung: Inkrementeller Value

```
Phase 0: Setup               [████░░░░░░] 0% spielbar   (2-4 Wochen)
Phase 1: Core Loop           [██████████] 20% Vision    (4-8 Wochen)  ✅ SPIELBAR
Phase 2: Lebendige Welt      [██████████] 35% Vision    (3-6 Wochen)  ✅ SPIELBAR
Phase 3: Expansion           [██████████] 50% Vision    (4-6 Wochen)  ✅ SPIELBAR
Phase 4: Politik             [██████████] 65% Vision    (4-6 Wochen)  ✅ SPIELBAR
Phase 5: Spionage            [██████████] 80% Vision    (6-8 Wochen)  ✅ SPIELBAR
Phase 6: Militär             [██████████] 90% Vision    (6-8 Wochen)  ✅ SPIELBAR
Phase 7: Forschung & Events  [██████████] 100% Vision   (4-6 Wochen)  ✅ SPIELBAR

Total Development Time: 33-52 Wochen (~8-12 Monate)
```

---

## ✅ Vorteile dieses Ansatzes

### 1. **Kontinuierliches Testing**
- Nach Phase 1: Core Loop testen
- Wenn nicht spaßig → Pivot, nicht weiterbauen

### 2. **Risiko-Minimierung**
- KI erst in Phase 2 (wenn Core Loop funktioniert)
- Fallbacks überall
- Jede Phase ist optional erweiterbar

### 3. **Klare Milestones**
- Jede Phase hat Deliverable
- Klar definierter Value
- Entscheidungspunkt nach jeder Phase

### 4. **Priorisierung durch Value**
- Wenn Zeit/Budget knapp: Nach Phase 4 stoppen
- Immer noch 65% der Vision, voll spielbar

### 5. **Parallele Entwicklung möglich**
- Phase 2-7 können teilweise parallel laufen
- Z.B. Spionage und Militär unabhängig

---

## 🎯 Empfohlene Priorisierung

### Must-Have (für Launch):
- ✅ Phase 0: Setup
- ✅ Phase 1: Core Loop
- ✅ Phase 2: Lebendige Welt
- ✅ Phase 3: Expansion

### Should-Have (für gutes Spiel):
- ⚡ Phase 4: Politik

### Nice-to-Have (für vollständige Vision):
- ⭐ Phase 5: Spionage
- ⭐ Phase 6: Militär
- ⭐ Phase 7: Forschung

**Minimum Viable Product:** Phase 0-3 (50% Vision, voll spielbar)

**Recommended Release:** Phase 0-4 (65% Vision, starkes Spiel)

**Full Vision:** Phase 0-7 (100% Vision)

---

## 🚨 Kritische Erfolgsfaktoren

### Nach Phase 1:
❓ **Ist der Core Loop spaßig?**
- Wenn NEIN → STOPP und überarbeite
- Wenn JA → Weiter zu Phase 2

### Nach Phase 2:
❓ **Fühlen sich NPCs lebendig an?**
- Wenn NEIN → KI-System überarbeiten
- Wenn JA → Weiter zu Phase 3

### Nach Phase 3:
❓ **Ist Expansion befriedigend?**
- Wenn NEIN → Balance überarbeiten
- Wenn JA → Weiter zu Phase 4

### Nach Phase 4:
❓ **Haben wir genug für Release?**
- Wenn JA → Polish & Launch
- Wenn NEIN → Weiter zu Phase 5-7

---

## 📋 Nächste Schritte

1. **Review diesen Plan** mit dem Team
2. **Setup-Phase planen** (US-910, US-011, US-920, US-930)
3. **Core Loop prototypen** (Phase 1.1)
4. **Ersten Playtest** nach Phase 1.2
5. **Go/No-Go Entscheidung** nach Phase 1

---

**Ende des Dokuments**
