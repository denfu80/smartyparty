# Sternenhaus - Priorisiertes Product Backlog

**Version:** 1.0
**Datum:** 2025-11-17
**Product Owner:** [Projekt-Team]
**Status:** 📚 **ARCHIV** - Ersetzt durch **[product-backlog.md](./product-backlog.md)**

> ⚠️ **Hinweis (2025-11-18):** Dieses Dokument wurde archiviert.
> Die Phasen-basierte Struktur wurde ersetzt durch eine Vertical-Slice-Priorisierung.
> Siehe **product-backlog.md** für die aktuelle Roadmap.

---

## Backlog-Struktur

Dieses Backlog ist in **Release-Phasen** organisiert, wobei jede Phase ein spielbares Inkrement liefert:

- **Phase 0: Technical Foundation** (Enabler) - Technische Grundlagen
- **Phase 1: MVP Core Loop** - Minimaler spielbarer Kern (Single Player)
- **Phase 2: Multiplayer Foundation** - Rundenbasiertes Online-Spiel
- **Phase 3: AI Enhancement** - KI-gestützte Dynamik
- **Phase 4: Expansion Systems** - Territorium & Aufstieg
- **Phase 5: Advanced Trading** - Marktdynamik
- **Phase 6: Social Systems** - Spionage & Diplomatie
- **Phase 7: Political Systems** - Ämter & Häuser
- **Phase 8: End-Game Systems** - Militär, Forschung, Events

---

## 🎯 Definition of "Enabler"

**Enabler Stories** sind technische Aufgaben, die:
- Notwendig sind, um User Stories zu implementieren
- **Keinen direkten User-Value** generieren
- Vom Umfang her eine normale Story sprengen würden
- Infrastruktur oder Architektur schaffen

**Format:** `E-XXX: [Titel]` (E = Enabler)

---

# Phase 0: Technical Foundation (Enabler)

> **Ziel:** Technische Grundlagen schaffen, damit MVP entwickelt werden kann
> **Auslieferbar:** Lauffähiges Basis-System (noch nicht spielbar)

### Sprint 0.1: Basis-Infrastruktur

**E-001: Web-Application Infrastructure Setup**

Als Entwickler möchte ich eine grundlegende Web-App-Infrastruktur haben, damit ich Features entwickeln kann.

**Technische Anforderungen:**
- [ ] Frontend: React/Next.js Setup
- [ ] Backend: Node.js/Express API
- [ ] Development Environment (Docker optional)
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Deployment-Umgebung (Vercel/Railway/etc.)

**Definition of Done:** Developer kann App lokal starten und deployen

---

**E-002: Database & Persistence Layer**

Als Entwickler möchte ich eine Datenbank mit Persistence-Layer haben, damit Spielstände gespeichert werden.

**Technische Anforderungen:**
- [ ] PostgreSQL/MongoDB Setup
- [ ] ORM/ODM Integration (Prisma/Mongoose)
- [ ] Database Migrations
- [ ] Basis-Schema für Game State

**Definition of Done:** Daten können persistiert und geladen werden

---

**E-003: Authentication & User Management**

Als Entwickler möchte ich ein Auth-System haben, damit Spieler Accounts haben.

**Technische Anforderungen:**
- [ ] User Registration/Login
- [ ] Session Management (JWT/NextAuth)
- [ ] Password Security (bcrypt)
- [ ] Basic User Profile

**Definition of Done:** Benutzer können sich registrieren und einloggen

---

### Sprint 0.2: Game Engine Basics

**E-004: Turn Management System**

Als Entwickler möchte ich ein Turn-Management-System haben, damit rundenbasiertes Gameplay funktioniert.

**Technische Anforderungen:**
- [ ] Game State Machine (Round States)
- [ ] Player Action Queue
- [ ] Round Resolution Logic
- [ ] Turn Validation

**Definition of Done:** System kann Runden verwalten und Spielerzüge verarbeiten

---

**E-005: AI Integration Foundation**

Als Entwickler möchte ich AI-Integration haben, damit KI-Features genutzt werden können.

**Technische Anforderungen:**
- [ ] LLM API Integration (OpenAI/Anthropic)
- [ ] Prompt Template System
- [ ] Response Caching (Kosten-Optimierung)
- [ ] Error Handling & Fallbacks

**Definition of Done:** System kann LLM-Anfragen machen und Antworten verarbeiten

---

**E-006: Basic UI Framework & Components**

Als Entwickler möchte ich wiederverwendbare UI-Komponenten haben, damit ich schnell Interfaces bauen kann.

**Technische Anforderungen:**
- [ ] Component Library (Tailwind/shadcn/MUI)
- [ ] Layout System (Dashboard, Game View)
- [ ] Basic Navigation
- [ ] Responsive Design Foundation

**Definition of Done:** Basis-UI-Komponenten sind verfügbar und dokumentiert

---

# Phase 1: MVP Core Loop (Single Player)

> **Ziel:** Minimaler spielbarer Kern mit einem Spieler gegen NPCs
> **Auslieferbar:** Spieler kann handeln, Reputation aufbauen, aufsteigen

### Sprint 1.1: Resource & Economy Foundation

**US-100: Basis-Ressourcensystem** ⭐ MVP

Als Spieler möchte ich verschiedene Ressourcentypen haben, damit ich handeln kann.

**MVP-Scope (vereinfacht):**
- [ ] **5 Basis-Ressourcentypen** (statt 10): Metalle, Energie, Nahrung, Komponenten, Luxusgüter
- [ ] Ressourcen haben unterschiedliche Basispreise
- [ ] Spieler hat Inventar mit Kapazitätslimit
- [ ] UI zeigt Ressourcen-Inventar

**Spätere Erweiterung:** Mehr Ressourcentypen, komplexe Verwendung

---

**US-101: Ressourcenvorkommen (vereinfacht)** ⭐ MVP

Als Spieler möchte ich Ressourcenvorkommen in kontrollierten Gebieten finden.

**MVP-Scope:**
- [ ] Jede Station hat 1-2 Ressourcenvorkommen (fix, nicht prozedural)
- [ ] Vorkommen werden auf Karte angezeigt
- [ ] UI zeigt welche Station welche Ressource produziert

**Spätere Erweiterung:** Seltene Ressourcen, prozedurale Verteilung

---

**US-102: Basis-Ressourcenproduktion** ⭐ MVP

Als Spieler möchte ich Ressourcen aus kontrollierten Stationen abbauen.

**MVP-Scope:**
- [ ] Kontrollierte Station produziert X Einheiten pro Runde (fix)
- [ ] Produktion wird automatisch ins Inventar gelegt
- [ ] UI zeigt Produktionsrate

**Spätere Erweiterung:** Produktionsanlagen, Verbesserungen

---

### Sprint 1.2: Territory & Control

**US-020: Basis-Stationskontrolle** ⭐ MVP

Als Spieler möchte ich Raumstationen kontrollieren können.

**MVP-Scope:**
- [ ] 5-8 Stationen auf Karte (fest definiert, nicht prozedural)
- [ ] Spieler startet mit 1 Station
- [ ] Stationen können übernommen werden (friedlich via Kauf, später militärisch)
- [ ] UI zeigt kontrollierte Stationen auf Karte

**Spätere Erweiterung:** Mehr Stationen, komplexe Übernahmemechanik

---

### Sprint 1.3: Reputation & Influence Tracking

**US-300: Basis-Reputationssystem** ⭐ MVP

Als Spieler möchte ich einen Reputationswert haben.

**MVP-Scope:**
- [ ] Reputation pro NPC-Fraktion (0-100 Skala)
- [ ] 3 Basis-Fraktionen (Major Houses)
- [ ] Reputation ändert sich durch Aktionen (+/- Werte)
- [ ] UI zeigt Reputation klar

**Spätere Erweiterung:** Komplexe Reputationsmechanik, Skandale

---

**US-320: Basis-Einflusssystem** ⭐ MVP

Als Spieler möchte ich einen Einflusswert haben.

**MVP-Scope:**
- [ ] Einfluss-Score (numerisch)
- [ ] Quellen: Stationsanzahl, Credits, Handelsvolumen
- [ ] Einfache Berechnung (Addition)
- [ ] UI zeigt Gesamteinfluss

**Spätere Erweiterung:** Multi-dimensionale Einflussquellen, Breakdown-View

---

### Sprint 1.4: NPC Foundation (Simplified)

**US-001: Basis-NPC-Persönlichkeiten** ⭐ MVP (vereinfacht)

Als Spieler möchte ich NPCs mit unterscheidbaren Persönlichkeiten haben.

**MVP-Scope (ohne KI-Generierung):**
- [ ] 5-8 vordefinierte NPCs (Händler, Stationskommandanten)
- [ ] Jeder NPC hat 3 Persönlichkeits-Tags (z.B. "gierig", "ehrenhaft", "vorsichtig")
- [ ] Persönlichkeit beeinflusst Handelspreise (+/- 10%)
- [ ] UI zeigt NPC-Name und Persönlichkeit

**Spätere Erweiterung:** KI-generierte Persönlichkeiten, komplexes Verhalten

---

**US-002-SIMPLE: Template-basierte Dialoge** ⭐ MVP (vereinfacht)

Als Spieler möchte ich mit NPCs in Dialogen interagieren können.

**MVP-Scope (OHNE KI, mit Templates):**
- [ ] Vordefinierte Dialog-Templates pro NPC-Typ
- [ ] Persönlichkeit beeinflusst Template-Auswahl
- [ ] 3-5 Dialog-Optionen pro Interaktion
- [ ] UI zeigt Dialoge als Text-Choices

**Hinweis:** Dies ersetzt temporär US-002 (dynamische KI-Dialoge) für MVP

**Spätere Erweiterung:** US-002 (volle KI-Dialoge) in Phase 3

---

### Sprint 1.5: Basic Trading

**US-200-SIMPLE: Basis-Handel mit fixen Preisen** ⭐ MVP (vereinfacht)

Als Spieler möchte ich mit NPCs handeln können.

**MVP-Scope (ohne KI-Verhandlung):**
- [ ] Kauf/Verkauf von Ressourcen bei NPC-Händlern
- [ ] Fixe Preise mit Persönlichkeits-Modifier (+/- 10%)
- [ ] Einfacher Kauf-Dialog (Menge eingeben, bestätigen)
- [ ] Credits als Währung

**Hinweis:** Dies ersetzt temporär US-200 (dynamische Verhandlungen) für MVP

**Spätere Erweiterung:** US-200 (volle Verhandlungen) in Phase 3

---

### Sprint 1.6: Progression Foundation

**US-150-SIMPLE: Basis-Hintergrundgeschichte (Template)** ⭐ MVP (vereinfacht)

Als Spieler möchte ich eine Hintergrundgeschichte haben.

**MVP-Scope (OHNE KI-Generierung):**
- [ ] Spieler wählt aus 5 vorgefertigten Backstories
- [ ] Jede Backstory gibt Startmodifier (z.B. +Reputation bei Haus X, +Credits, +Schulden)
- [ ] Text ist vorgefertigt (1-2 Absätze)

**Spätere Erweiterung:** US-150 (KI-generierte Backstories) in Phase 3

---

**US-600: Basis-Progression** ⭐ MVP

Als Händler möchte ich durch wachsenden Einfluss neue Optionen freischalten.

**MVP-Scope:**
- [ ] Einfluss-Schwellen definiert (z.B. 100 = Option X, 300 = Option Y)
- [ ] 3-5 freischaltbare Aktionen
- [ ] UI zeigt nächste Schwelle
- [ ] Benachrichtigung bei Freischaltung

---

**US-601: Aufstieg zu Minor House** ⭐ MVP

Als Händler möchte ich zu Minor House aufsteigen.

**MVP-Scope:**
- [ ] Bedingung: 3 Stationen + Einfluss 500 (vereinfacht)
- [ ] Aufstiegs-Event (einfacher Text)
- [ ] Titel ändert sich
- [ ] Neue Aktion freigeschaltet (z.B. "Allianz vorschlagen")

**Spätere Erweiterung:** US-602, US-603 (alternative Aufstiegswege)

---

### Sprint 1.7: Game Loop Integration

**US-010-PART-A: Single-Player Rundenlogik** ⭐ MVP

Als Spieler möchte ich rundenbasiert spielen können (zunächst Single Player).

**MVP-Scope (nur Single Player):**
- [ ] Spieler macht Aktionen in seiner Runde
- [ ] "Runde beenden" Button
- [ ] System berechnet Rundenergebnis (Produktion, NPC-Aktionen)
- [ ] Nächste Runde startet
- [ ] Rundenanzeige in UI

**Hinweis:** Multiplayer folgt in Phase 2 (US-010-PART-B)

---

## 🎉 MILESTONE 1: MVP COMPLETE

**Deliverable:** Spielbarer Single-Player-Prototyp

**Test-Kriterien:**
- [ ] Spieler kann Spiel starten
- [ ] Spieler kann handeln und Ressourcen sammeln
- [ ] Spieler kann Stationen übernehmen
- [ ] Spieler kann Reputation/Einfluss aufbauen
- [ ] Spieler kann zu Minor House aufsteigen
- [ ] Spiel ist über mindestens 20 Runden spielbar

**Play-Test-Dauer:** ~30-45 Minuten pro Session

---

# Phase 2: Multiplayer Foundation

> **Ziel:** Mehrere Spieler können asynchron gegeneinander spielen
> **Auslieferbar:** 2-4 Spieler Online-Multiplayer

### Sprint 2.1: Multiplayer Infrastructure

**E-007: Multiplayer Game State Management**

Als Entwickler möchte ich Multi-Player-Spielstände verwalten können.

**Technische Anforderungen:**
- [ ] Game Lobby System
- [ ] Player State Isolation
- [ ] Concurrent Turn Handling
- [ ] State Synchronization

---

**US-010-PART-B: Online-Multiplayer (2-4 Spieler)** ⭐ MVP+

Als Spieler möchte ich mit anderen online spielen.

**Scope:**
- [ ] 2-4 Spieler können Spiel erstellen/joinen
- [ ] Jeder Spieler spielt asynchron seine Runde
- [ ] Wenn alle fertig: Nächste Runde startet
- [ ] Spieler sehen nur ihre eigenen Informationen
- [ ] Persistente Spielstände

**Spätere Erweiterung (US-010 Full):** Timer für Züge, 6 Spieler

---

### Sprint 2.2: Player Interaction Basics

**US-021: Sektorkontrolle (vereinfacht)**

Als Spieler möchte ich Sektoren kontrollieren.

**Scope:**
- [ ] 3 Sektoren mit je 2-3 Stationen
- [ ] Sektorkontrolle = Mehrheit der Stationen
- [ ] Bonus-Einfluss für Sektorkontrolle
- [ ] UI zeigt Sektorgrenzen

---

**US-022: Territoriale Grenzen visualisieren**

Als Spieler möchte ich mein Territorium sehen.

**Scope:**
- [ ] Karte zeigt farbig wem welche Station gehört
- [ ] Grenzgebiete erkennbar
- [ ] UI-Filter: "Zeige nur mein Territorium"

---

## 🎉 MILESTONE 2: MULTIPLAYER COMPLETE

**Test-Kriterien:**
- [ ] 3 Spieler können gleichzeitig online spielen
- [ ] Asynchrones Rundenspiel funktioniert
- [ ] Persistenz über mehrere Tage

---

# Phase 3: AI Enhancement

> **Ziel:** KI-Features aktivieren für lebendige NPCs
> **Auslieferbar:** Dynamische Dialoge, Verhandlungen, AI-generierte Inhalte

### Sprint 3.1: Dynamic NPC Dialogs

**US-002: Dynamische KI-Dialoge** (volle Version)

Als Spieler möchte ich dynamisch generierte Dialoge haben.

**Scope:**
- [ ] Ersetzt Template-System aus Phase 1
- [ ] LLM generiert Dialoge zur Laufzeit
- [ ] Persönlichkeit steuert Prompt
- [ ] Dialoge passen zum Kontext
- [ ] Fallback zu Templates bei API-Fehler

---

**US-003: NPC-Gedächtnis**

Als Spieler möchte ich, dass NPCs sich erinnern.

**Scope:**
- [ ] Jeder NPC speichert Interaktionshistorie
- [ ] Mindestens 10 vergangene Events
- [ ] NPCs referenzieren Vergangenheit in Dialogen
- [ ] Beziehungsqualität entwickelt sich

---

**US-004: NPC-Vergebung**

Als Spieler möchte ich, dass NPCs mir vergeben können.

---

**US-005: NPC-Groll**

Als Spieler möchte ich, dass manche NPCs Groll tragen.

---

### Sprint 3.2: Dynamic Trading

**US-200: Dynamische Preisverhandlungen** (volle Version)

Als Spieler möchte ich Preise verhandeln.

**Scope:**
- [ ] Ersetzt Fixpreis-System
- [ ] KI-Händler machen Gegenangebote
- [ ] 3 Verhandlungsrunden
- [ ] Erfolg hängt von Reputation ab

---

**US-201: Händler erinnern sich**

Als Spieler möchte ich, dass Händler vergangene Geschäfte erinnern.

---

**US-203: Persönliche Beziehungen im Handel**

Als Spieler möchte ich, dass Beziehungen Preise beeinflussen.

---

**US-204: Gefallen werden belohnt**

Als Spieler möchte ich bessere Preise nach Gefallen.

---

**US-205: Verrat hat Konsequenzen**

Als Spieler möchte ich, dass Verrat Handel blockiert.

---

### Sprint 3.3: AI-Generated Content

**US-150: KI-generierte Hintergrundgeschichte** (volle Version)

Als Spieler möchte ich eine einzigartige KI-generierte Backstory.

**Scope:**
- [ ] Ersetzt Template-System
- [ ] LLM generiert einzigartige Geschichte
- [ ] Beeinflusst Startbedingungen dynamisch

---

**US-151: Backstory beeinflusst Start**

Als Spieler möchte ich, dass meine Backstory Startbedingungen beeinflusst.

---

**US-152: NPCs reagieren auf Backstory**

Als Spieler möchte ich, dass NPCs meine Backstory erwähnen.

---

## 🎉 MILESTONE 3: AI ENHANCEMENT COMPLETE

---

# Phase 4: Expansion Systems

> **Ziel:** Territoriale Expansion und Aufstiegssysteme vertiefen

### Sprint 4.1: Advanced Territory

**US-023: Territoriale Expansion & Verlust**

Als Spieler möchte ich Territorien erobern oder verlieren.

---

**US-103: Ressourcenknappheit**

Als Spieler möchte ich Knappheit erleben.

---

### Sprint 4.2: Advanced Progression

**US-602: Aufstieg via Handelsvolumen**

Als Händler möchte ich durch Handel zu Minor House aufsteigen.

---

**US-603: Aufstieg via Reputation**

Als Händler möchte ich durch Reputation aufsteigen.

---

**US-620: Aufstieg zu Major House (Territorium)**

Als Minor House möchte ich durch Territorium zu Major House aufsteigen.

---

**US-621: Aufstieg via Vasallen/Ämter**

Als Minor House möchte ich durch Vasallen aufsteigen.

---

**US-622: Reputation für Major House**

Als Minor House brauche ich Reputation bei Großmächten.

---

## 🎉 MILESTONE 4: EXPANSION COMPLETE

---

# Phase 5: Advanced Trading & Markets

> **Ziel:** Marktdynamik und Wirtschaftssysteme

### Sprint 5.1: Market Dynamics

**US-220: Dynamische Preise durch Angebot/Nachfrage**

Als Spieler möchte ich, dass Massenkäufe Preise beeinflussen.

---

**US-202: Marktlagen beeinflussen Handel**

Als Spieler möchte ich, dass Händler Marktlagen berücksichtigen.

---

**US-221: KI-Events erschaffen Krisen**

Als Spieler möchte ich dynamische Markt-Events erleben.

---

### Sprint 5.2: Market Manipulation

**US-240: Spekulation**

Als Spieler möchte ich spekulieren.

---

**US-241: Horten**

Als Spieler möchte ich Waren horten.

---

**US-242: Kartelle**

Als Spieler möchte ich Kartelle bilden.

---

**US-243: Marktmanipulation**

Als Spieler möchte ich Märkte manipulieren.

---

**US-244: KI reagiert auf Manipulation**

Als Spieler möchte ich emergente Reaktionen erleben.

---

### Sprint 5.3: Advanced Market Features

**US-222: Technologische Obsoleszenz**

Als Spieler möchte ich, dass Tech alte Waren entwertet.

---

**US-223: Politische Embargos**

Als Spieler möchte ich, dass Politik Handel beeinflusst.

---

## 🎉 MILESTONE 5: ADVANCED TRADING COMPLETE

---

# Phase 6: Social Systems (Spionage & Diplomatie)

> **Ziel:** Spionage- und Diplomatiesysteme

### Sprint 6.1: Espionage Foundation

**US-500: Spione mit Persönlichkeiten rekrutieren**

Als Spieler möchte ich Spione anheuern.

---

**US-501-503: Verschiedene Spion-Typen**

Als Spieler möchte ich verschiedene Spion-Persönlichkeiten erleben.

---

### Sprint 6.2: Loyalty System

**US-520: Loyalität von Bezahlung**

Als Spieler möchte ich Spione bezahlen müssen.

---

**US-521: Loyalität von Behandlung**

Als Spieler möchte ich, dass Behandlung Loyalität beeinflusst.

---

**US-522: Selbstmörderische Missionen**

Als Spieler möchte ich, dass Spione sich an Risiken erinnern.

---

**US-523-525: Abwerben von Spionen**

Als Spieler möchte ich Spione abwerben können.

---

### Sprint 6.3: Spy Operations

**US-540-543: Spion-Interaktionen**

Als Spieler möchte ich mit Spionen verhandeln.

---

**US-560-561: Hausloyalität**

Als Spieler möchte ich, dass Spione Hausloyalitäten haben.

---

### Sprint 6.4: Information Systems

**US-460: Öffentliche Information**

Als Spieler möchte ich öffentliche Handelsgeschäfte sehen.

---

**US-461-462: Halböffentliche Aktionen & Gerüchte**

Als Spieler möchte ich, dass Gerüchte entstehen.

---

**US-463: Geheime Aktionen**

Als Spieler möchte ich geheime Aktionen durchführen.

---

**US-480-482: Aufdeckung & Skandale**

Als Spieler möchte ich, dass geheime Aktionen aufgedeckt werden können.

---

### Sprint 6.5: Diplomacy Systems

**US-650-654: Allianzen & Diplomatie**

Als Spieler möchte ich Allianzen bilden.

---

## 🎉 MILESTONE 6: SOCIAL SYSTEMS COMPLETE

---

# Phase 7: Political Systems (Ämter & Häuser)

> **Ziel:** Ämtersystem und politische Strukturen

### Sprint 7.1: Office System Foundation

**US-550: Ämter-Vergabe**

Als Major House möchte ich Ämter vergeben.

---

**US-551-555: Ämter-Vergabe-Kriterien**

Als Spieler möchte ich, dass Ämter nach Kriterien vergeben werden.

---

### Sprint 7.2: Office Privileges

**US-570-576: Verschiedene Ämter**

Als Amtsinhaber möchte ich spezifische Privilegien haben.

---

### Sprint 7.3: Office Dynamics

**US-590-593: Ämter-Dynamik**

Als Spieler möchte ich, dass Ämter dynamisch sind.

---

### Sprint 7.4: Reputation & Influence Depth

**US-301-304: Erweiterte Reputation**

Als Spieler möchte ich Reputationsvorteile nutzen.

---

**US-321-328: Erweiterte Einflussquellen**

Als Spieler möchte ich Einfluss aus verschiedenen Quellen gewinnen.

---

**US-340-342: Balance-Mechanik**

Als Spieler möchte ich Reputation und Einfluss balancieren.

---

## 🎉 MILESTONE 7: POLITICAL SYSTEMS COMPLETE

---

# Phase 8: End-Game Systems (Militär, Forschung, Events)

> **Ziel:** Militär, Forschung und emergente Narrationen

### Sprint 8.1: Military System

**US-050-055: Militärsystem**

Als Spieler möchte ich Flotten bauen und kommandieren.

---

### Sprint 8.2: Research System

**US-700-703: Forschungssystem**

Als Spieler möchte ich Technologien erforschen.

---

### Sprint 8.3: Emergent Narration

**US-800-805: Event-Generierung & emergente Narrationen**

Als Spieler möchte ich emergente Geschichten erleben.

---

## 🎉 MILESTONE 8: FULL GAME COMPLETE

---

# Zusammenfassung & Statistik

## Gesamt-Übersicht

- **Enabler Stories:** 7 (E-001 bis E-007)
- **MVP Stories (Phase 1):** ~20 Stories
- **MVP+ (Phase 1-2):** ~25 Stories
- **Full Game:** 134+ Stories über 8 Phasen

## MVP-Kritische Stories (Phase 1)

| Story | Titel | Vereinfacht? |
|-------|-------|--------------|
| E-001 | Web-App Infrastruktur | - |
| E-002 | Database | - |
| E-003 | Authentication | - |
| E-004 | Turn Management | - |
| E-005 | AI Integration | - |
| E-006 | UI Framework | - |
| US-100 | Basis-Ressourcen | ✓ (5 statt 10 Typen) |
| US-101 | Ressourcenvorkommen | ✓ (fix statt prozedural) |
| US-102 | Ressourcenproduktion | ✓ (fix statt verbesserbar) |
| US-020 | Stationskontrolle | ✓ (5-8 Stationen) |
| US-300 | Reputation | ✓ (Basis-Tracking) |
| US-320 | Einfluss | ✓ (Basis-Tracking) |
| US-001 | NPC-Persönlichkeiten | ✓ (vordefiniert, nicht KI) |
| US-002-SIMPLE | Template-Dialoge | ✓ (Templates, nicht KI) |
| US-200-SIMPLE | Basis-Handel | ✓ (Fixpreise, nicht Verhandlung) |
| US-150-SIMPLE | Backstory | ✓ (Templates, nicht KI) |
| US-600 | Progression | ✓ (vereinfacht) |
| US-601 | Aufstieg Minor House | ✓ (ein Weg statt drei) |
| US-010-PART-A | Single-Player Runden | ✓ (kein Multiplayer) |

## Vereinfachungsstrategie

**Prinzip:** "Walking Skeleton First, AI Enhancement Later"

1. **Phase 1 (MVP):** Funktionierende Spielmechanik **ohne KI**
   - Templates statt generierte Inhalte
   - Fixe Werte statt dynamische Systeme
   - Single Player statt Multiplayer

2. **Phase 2:** Multiplayer hinzufügen

3. **Phase 3:** **Jetzt erst KI aktivieren**
   - Ersetzen von Templates durch echte KI
   - Dynamische Dialoge
   - Generierte Inhalte

**Vorteil:** Spielmechanik kann getestet werden, bevor teure KI-Integration kommt

## Release-Strategie

### Alpha (Phase 1)
- **Ziel:** Internal Testing
- **Features:** Single Player Core Loop
- **Dauer:** 2-3 Monate

### Beta (Phase 2-3)
- **Ziel:** Closed Beta mit Testern
- **Features:** Multiplayer + AI
- **Dauer:** 3-4 Monate

### Early Access (Phase 4-6)
- **Ziel:** Öffentliche Early Access
- **Features:** Expansion, Trading, Social
- **Dauer:** 6-9 Monate

### Full Release (Phase 7-8)
- **Ziel:** 1.0 Launch
- **Features:** Political, Military, Research
- **Dauer:** 12-18 Monate gesamt

---

## Nächste Schritte

1. **Team-Alignment:** Backlog mit Team reviewen
2. **Sprint Planning:** Phase 0 (Enabler) planen
3. **Spike Stories:** Technische Spikes für E-001 bis E-006
4. **Prototyping:** Proof-of-Concept für kritische Risiken (AI Integration, Turn Management)

---

**Ende des Backlog**
