# Sternenhaus - Design Goals & Qualitätsziele

**Version:** 1.0
**Datum:** 2025-11-16
**Kontext:** Diese Design Goals wurden aus User Stories v1 (US-210-221) extrahiert, da sie keine implementierbaren User Stories sind, sondern qualitative Ziele für das Gesamtspiel.

---

## Über dieses Dokument

Design Goals sind **qualitative Ziele**, die das gesamte Spiel durchziehen und bei jeder Implementierungsentscheidung berücksichtigt werden sollten. Im Gegensatz zu User Stories sind sie:

- Nicht direkt implementierbar (zu abstrakt)
- Keine einzelnen Features
- Querschnittliche Qualitätsanforderungen
- Eher als Acceptance Criteria für das Gesamtprodukt zu verstehen

Diese Goals sollten bei Code Reviews, Design-Entscheidungen und Testing als Leitlinien dienen.

---

## Goal 1: Bedeutsame Entscheidungen

**Ziel:** Spieler sollen vor schwierigen Entscheidungen mit unvorhersehbaren Konsequenzen stehen, damit jede Wahl bedeutsam ist.

**Messkriterien:**
- Mindestens 70% der Spielerentscheidungen haben messbare Konsequenzen
- Keine "offensichtlich besten" Entscheidungen (Balance)
- Entscheidungen führen zu unterschiedlichen Spielverläufen
- Spieler äußern im Playtesting, dass Entscheidungen "schwer" waren

**Relevant für User Stories:**
- US-340-342: Balance zwischen Reputation und Einfluss
- US-590-593: Ämter-Dynamik
- US-243: Marktmanipulation
- US-653: Bündnisbruch

**Anti-Pattern zu vermeiden:**
- Dominant strategies (eine Strategie ist immer optimal)
- Triviale Entscheidungen ohne Konsequenzen
- Vorhersehbare Konsequenzen (Spieler kann alles vorausberechnen)

---

## Goal 2: Belohnung für langfristiges Denken

**Ziel:** Langfristiges strategisches Denken soll belohnt werden, damit kurzfristige Gier nicht optimal ist.

**Messkriterien:**
- Kurzfristig profitable Aktionen haben langfristige Kosten
- Langfristige Investitionen (Beziehungen, Forschung) zahlen sich aus
- Spieler die "rushed" gewinnen nicht systematisch
- Reputation-Aufbau ist langfristig wertvoller als kurzfristige Ausbeutung

**Relevant für User Stories:**
- US-300-304: Reputationssystem (langfristiger Aufbau)
- US-520-525: Spionenloyalität (langfristige Investition)
- US-201: Händlerbeziehungen über Zeit
- US-700-703: Forschungssystem

**Anti-Pattern zu vermeiden:**
- "Rush"-Strategien dominieren
- Beziehungsaufbau ist wertlos vs. Ausbeutung
- Kurzfristige Gewinne ohne Kosten

---

## Goal 3: Mechanische Relevanz sozialer Kompetenz

**Ziel:** Politisches Geschick und soziale Kompetenz müssen mechanisch relevant sein, nicht nur narrativ.

**Messkriterien:**
- Spieler mit hoher Reputation haben messbare Vorteile
- Diplomatie kann Konflikte vermeiden (messbare Einsparungen)
- Soziale Netzwerke (Spione, Allianzen) sind mechanisch mächtig
- Soziale Inkompetenz (niedrige Reputation) hat mechanische Nachteile

**Relevant für User Stories:**
- US-301: Verhandlungsvorteile durch Reputation
- US-304: Vertrauen ist mechanisch relevant
- US-203-205: Persönliche Beziehungen im Handel
- US-650-654: Diplomatie-System

**Anti-Pattern zu vermeiden:**
- Reputation ist nur "Fluff" ohne mechanische Auswirkung
- Militär/Wirtschaft dominieren, Diplomatie ist wertlos
- NPCs behandeln alle Spieler gleich unabhängig von Beziehung

---

## Goal 4: Belohnung für Cleverness & Gelegenheiten

**Ziel:** Spieler sollen Gelegenheiten erkennen und nutzen können, damit Cleverness belohnt wird.

**Messkriterien:**
- Emergente Strategien sind möglich (nicht vom Designer vorgeplant)
- Spieler können kreative Lösungen finden
- System-Interaktionen ermöglichen unerwartete Taktiken
- "Clever plays" werden in Playtests beobachtet

**Relevant für User Stories:**
- US-240-244: Marktmanipulation
- US-555: Ausnutzen wirtschaftlich schwacher Häuser
- US-592: Intrigen gegen Konkurrenten
- US-800-801: Emergente Event-Reaktionen

**Anti-Pattern zu vermeiden:**
- Nur vorgeplante Lösungswege funktionieren
- Kreative Strategien werden vom System nicht unterstützt
- "One true path" Design

---

## Goal 5: Vielschichtige Macht-Dimensionen

**Ziel:** Spieler sollen Macht in all ihren Facetten erleben (wirtschaftlich, politisch, sozial, informationell), damit das Spiel vielschichtig ist.

**Messkriterien:**
- Alle 4 Macht-Dimensionen sind spielbar und wertvoll
- Spezialisierung ist möglich (Wirtschaftsmogul vs. Spionagemeister)
- Keine Dimension dominiert alle anderen
- Synergie zwischen Dimensionen existiert aber ist nicht zwingend

**Relevant für User Stories:**
- US-321-326: Einflussquellen (wirtschaftlich, territorial, militärisch, politisch, informationell, technologisch)
- US-243: Wirtschaftsmacht
- US-500-561: Informationsmacht (Spionage)
- US-050-055: Militärmacht
- US-550-593: Politische Macht (Ämter)

**Anti-Pattern zu vermeiden:**
- Eine Machtdimension dominiert (z.B. "nur Militär gewinnt")
- Manche Dimensionen sind irrelevant
- Spezialisierung ist unmöglich oder suboptimal

---

## Goal 6: Einzigartige & bedeutsame KI-Interaktionen

**Ziel:** Jede KI-generierte Interaktion soll sich einzigartig und bedeutsam anfühlen, damit Wiederholbarkeit hoch ist.

**Messkriterien:**
- Spieler erleben in 3 Partien keine identischen Dialoge/Events
- NPCs fühlen sich individuell an, nicht generisch
- Wiederholungen werden in Playtests nicht bemängelt
- Narrative Qualität ist vergleichbar mit handgeschriebenen Dialogen

**Relevant für User Stories:**
- US-001-005: NPC-Persönlichkeiten
- US-002: Dynamische Dialoge
- US-150: KI-Hintergrundgeschichten
- US-800-805: Emergente Events

**Anti-Pattern zu vermeiden:**
- NPCs klingen alle gleich
- Dialoge wiederholen sich erkennbar
- KI-generierte Texte fühlen sich "generisch" an
- Template-artige Formulierungen durchdringen

---

## Goal 7: Lebendige, reaktive Welt

**Ziel:** Die Spielwelt soll sich lebendig anfühlen, weil sie auf Spielertaten reagiert, damit Immersion entsteht.

**Messkriterien:**
- Spieleraktionen triggern sichtbare Weltreaktionen
- NPCs erinnern sich und ändern Verhalten
- Gerüchte und News reflektieren tatsächliche Ereignisse
- "Die Welt fühlt sich lebendig an" in Playtesting-Feedback

**Relevant für User Stories:**
- US-003: NPC-Gedächtnis
- US-801: KI reagiert auf Sabotage
- US-802-804: Nachrichtensystem
- US-244: Emergente Konsequenzen auf Manipulation

**Anti-Pattern zu vermeiden:**
- Welt fühlt sich statisch an
- NPCs vergessen Spieleraktionen
- Keine sichtbaren Konsequenzen
- "Theme park" Gefühl (alles ist vorgefertigt)

---

## Goal 8: Strategische Tiefe

**Ziel:** Das Spiel soll strategische Tiefe bieten, sodass Mastery möglich ist und verschiedene Skill-Levels erkennbar sind.

**Messkriterien:**
- Skill-Gap zwischen Anfängern und Experten ist messbar
- "Meta" entwickelt sich (optimal strategies)
- Aber: Keine unschlagbare Strategie (Balance)
- Komplexität führt nicht zu Unübersichtlichkeit

**Relevant für User Stories:**
- US-340-342: Balance-Mechanik (Trade-offs)
- US-320-328: Einfluss-System (multi-dimensionale Optimierung)
- US-700-703: Tech-Tree Entscheidungen

**Anti-Pattern zu vermeiden:**
- Spiel ist zu simpel (solved game)
- Spiel ist zu komplex (analysis paralysis)
- Glück dominiert Skill
- Keine erkennbare Verbesserung mit Erfahrung

---

## Goal 9: Unvorhersehbarkeit & Emergenz

**Ziel:** Das KI-gesteuerte System soll emergentes Gameplay ermöglichen, das selbst die Designer überrascht.

**Messkriterien:**
- Playtester berichten von unerwarteten Situationen
- Entwickler können nicht alle Spielverläufe vorhersagen
- KI-Reaktionen fühlen sich "intelligent" an, nicht gescriptet
- Jede Partie entwickelt sich unterschiedlich

**Relevant für User Stories:**
- US-800-805: Event-Generierung
- US-221: KI-Events erschaffen Krisen
- US-244: Emergente Konsequenzen auf Manipulation
- US-654: NPCs machen opportunistische Angebote

**Anti-Pattern zu vermeiden:**
- Alle Partien verlaufen gleich
- Events fühlen sich vorgefertigt an
- KI-Verhalten ist vorhersehbar
- Keine Überraschungen

---

## Goal 10: Kohärenz & Konsistenz

**Ziel:** Trotz KI-Generierung muss die Welt kohärent und konsistent bleiben.

**Messkriterien:**
- Keine Widersprüche in NPC-Verhalten
- Ereignisse folgen logisch auseinander
- Spieler finden keine "Logiklücken"
- Welt fühlt sich glaubwürdig an

**Relevant für User Stories:**
- US-003: NPC-Gedächtnis (Konsistenz über Zeit)
- US-152: NPCs reagieren auf Hintergrund (Kohärenz)
- US-802: Nachrichten reflektieren Spielsituation

**Anti-Pattern zu vermeiden:**
- NPCs widersprechen sich
- Events ergeben keinen Sinn im Kontext
- Welt fühlt sich "random" an
- Glaubwürdigkeit leidet

---

## Implementierungs-Checkliste

Bei jeder neuen Feature-Implementierung sollten folgende Fragen gestellt werden:

### Entscheidungs-Design:
- [ ] Gibt dieses Feature dem Spieler bedeutsame Entscheidungen?
- [ ] Sind die Trade-offs klar aber nicht trivial?
- [ ] Belohnt es langfristiges Denken?

### Macht-Dimensionen:
- [ ] Zu welcher Macht-Dimension gehört dieses Feature?
- [ ] Ist die Dimension ausbalanciert mit anderen?
- [ ] Gibt es Synergie-Möglichkeiten?

### KI-Integration:
- [ ] Nutzt dieses Feature KI-Generierung sinnvoll?
- [ ] Fühlen sich KI-Outputs einzigartig an?
- [ ] Ist die Kohärenz gewahrt?

### Weltreaktion:
- [ ] Reagiert die Welt auf diese Spieleraktion?
- [ ] Erinnern sich NPCs daran?
- [ ] Gibt es sichtbare Konsequenzen?

### Strategische Tiefe:
- [ ] Ermöglicht dieses Feature strategische Entscheidungen?
- [ ] Gibt es Raum für Mastery?
- [ ] Ist es komplex aber nicht kompliziert?

---

## Priorisierung in Konflikten

Wenn Design Goals in Konflikt geraten, folgende Priorisierung:

1. **Kohärenz & Konsistenz** (Goal 10) - Nicht verhandelbar
2. **Bedeutsame Entscheidungen** (Goal 1) - Kern des Gameplays
3. **Lebendige Welt** (Goal 7) - Kern-USP des Spiels
4. **Vielschichtige Macht** (Goal 5) - Für Vielfalt notwendig
5. **Einzigartige KI-Interaktionen** (Goal 6) - Technisches USP
6. **Restliche Goals** - Wichtig aber nachrangig

**Beispiel-Konflikt:**
- KI-generierter Dialog ist sehr kreativ (Goal 6) aber widerspricht früherer NPC-Aussage (Goal 10)
- **Lösung:** Kohärenz gewinnt, Dialog muss Konsistenz-Check durchlaufen

---

## Testing & Validation

### Für Playtesting:
Fokus-Fragen für Tester:

1. **Entscheidungen:** "Welche Entscheidung war am schwierigsten? Warum?"
2. **Macht:** "Wie hast du Macht aufgebaut? Welche Dimension hat dominiert?"
3. **NPCs:** "Haben sich NPCs individuell angefühlt? Beispiele?"
4. **Welt:** "Hat sich die Welt reaktiv angefühlt? Beispiele?"
5. **Tiefe:** "Was würdest du beim nächsten Mal anders machen?"

### Für Code Reviews:
- Checkt jedes neue Feature gegen die 10 Goals
- Dokumentiert welche Goals das Feature unterstützt
- Warnt bei Features die Goals verletzen könnten

---

## Metriken für Erfolg

Nach Launch sollten folgende Metriken die Goals validieren:

| Goal | Metrik | Zielwert |
|------|--------|----------|
| Goal 1 (Entscheidungen) | Durchschnittliche Bedenkzeit bei wichtigen Entscheidungen | >30 Sekunden |
| Goal 2 (Langfristigkeit) | Korrelation zwischen Spieldauer und Erfolg | Positiv |
| Goal 3 (Soziale Kompetenz) | Win-Rate bei verschiedenen Reputationswerten | Höher bei hoher Reputation |
| Goal 5 (Macht-Dimensionen) | Verteilung der Siegstrategien | Alle Dimensionen >15% |
| Goal 6 (Einzigartigkeit) | Wiederholungsrate von Dialogen | <5% |
| Goal 7 (Lebendigkeit) | "Welt fühlt sich lebendig an" in Umfragen | >80% Zustimmung |
| Goal 9 (Emergenz) | Anzahl unterschiedlicher Spielverläufe (first 10h) | >50 signifikant unterschiedliche Pfade |

---

## Versionierung

Dieses Dokument sollte mit dem Spiel evolvieren:

- **v1.0 (2025-11-16):** Initial basierend auf User Stories v1 (US-210-221)
- Zukünftige Updates sollten neue Goals oder Anpassungen dokumentieren

---

**Ende des Dokuments**
