# Sternenhaus - User Stories v2

**Version:** 2.0
**Datum:** 2025-11-16
**Status:** 📚 **ARCHIV** - Für aktuelle Priorisierung siehe **[product-backlog.md](./product-backlog.md)**

> ⚠️ **Hinweis (2025-11-18):** Dieses Dokument wurde archiviert.
> Alle Stories wurden konsolidiert in **product-backlog.md**.
> Dieses Dokument bleibt als Referenz für detaillierte Story-Beschreibungen.

---

## ℹ️ Hinweis zur Nutzung

**Dieses Dokument ist ein REFERENZ-DOKUMENT** mit detaillierten User Stories, Abhängigkeiten und Akzeptanzkriterien.

**Für die aktuelle Arbeitsreihenfolge, Sprint-Planung und Priorisierung siehe:**
- 📋 **`backlog-prioritized.md`** - Priorisiertes Product Backlog (8 Release-Phasen, MVP-Definition)
- 📊 **`backlog-analysis-summary.md`** - Executive Summary & Empfehlungen

Dieses Dokument dient als Nachschlagewerk während der Implementierung für:
- Detaillierte Akzeptanzkriterien
- Story-Abhängigkeiten
- Vollständige Feature-Beschreibungen

---

## Epic 0: Kern-Infrastruktur & Spielgrundlagen

### 0.1 NPC-System & KI-Persönlichkeiten

**US-001:** Als Spieler möchte ich, dass NPCs KI-generierte Persönlichkeiten mit eigenen Zielen haben, damit sie glaubwürdig wirken.

**Abhängigkeiten:**
- Keine (fundamentales System)

**Akzeptanzkriterien:**
- [ ] Jeder NPC hat mindestens 3-5 Persönlichkeitsmerkmale
- [ ] NPCs haben individuelle Ziele und Motivationen
- [ ] Persönlichkeit beeinflusst Verhalten und Entscheidungen
- [ ] Persönlichkeit wird in Dialogen erkennbar

---

**US-002:** Als Spieler möchte ich, dass NPCs keine fixen Dialogbäume haben, sondern dynamisch generierte Dialoge, damit Gespräche lebendig sind.

**Abhängigkeiten:**
- US-001: NPC-Persönlichkeiten müssen existieren

**Akzeptanzkriterien:**
- [ ] Dialoge werden zur Laufzeit generiert
- [ ] Dialoge passen zur NPC-Persönlichkeit
- [ ] Dialoge berücksichtigen aktuellen Kontext
- [ ] Keine erkennbaren Wiederholungen bei gleichen Situationen

---

**US-003:** Als Spieler möchte ich, dass NPCs (Stationskommandanten, Händler, etc.) sich an alle Interaktionen erinnern, damit langfristige Beziehungen entstehen.

**Abhängigkeiten:**
- US-001: NPC-Persönlichkeiten
- US-002: Dynamische Dialoge

**Akzeptanzkriterien:**
- [ ] NPCs speichern Historie aller Interaktionen
- [ ] NPCs referenzieren vergangene Ereignisse in Dialogen
- [ ] Beziehungsqualität entwickelt sich über Zeit
- [ ] Mindestens 10 vergangene Interaktionen werden berücksichtigt

---

**US-004:** Als Spieler möchte ich, dass NPCs mir vergeben können, wenn ich nun wertvolle Dienste leiste, damit Erlösung möglich ist.

**Abhängigkeiten:**
- US-003: NPC-Gedächtnis
- US-001: Persönlichkeit (beeinflusst Vergebungsbereitschaft)

**Akzeptanzkriterien:**
- [ ] Negative Beziehungen können verbessert werden
- [ ] Persönlichkeit beeinflusst Vergebungsbereitschaft
- [ ] Größere Taten erfordern größere Wiedergutmachung
- [ ] UI zeigt Beziehungsentwicklung

---

**US-005:** Als Spieler möchte ich, dass NPCs über Jahrzehnte Groll tragen können, damit manche Taten unverzeihlich sind.

**Abhängigkeiten:**
- US-003: NPC-Gedächtnis
- US-001: Persönlichkeit (manche NPCs sind nachtragender)

**Akzeptanzkriterien:**
- [ ] Bestimmte Handlungen markieren NPCs als "unverzeihlich"
- [ ] Persönlichkeit bestimmt, welche Taten unverzeihlich sind
- [ ] Zeitablauf schwächt Groll nicht automatisch
- [ ] UI zeigt permanenten Beziehungsschaden an

---

### 0.2 Spielstart & Basis-Mechaniken

**US-010:** Als neuer Spieler möchte ich ein rundenbasiertes Online-Multiplayer-Spiel (Web-App) starten können, damit ich asynchron mit anderen Spielern online spielen kann.

**Abhängigkeiten:**
- Keine (Einstiegspunkt)

**Akzeptanzkriterien:**
- [ ] Web-App unterstützt 2-6 Spieler online
- [ ] Rundenbasiertes System: Alle Spieler spielen ihre Runde asynchron
- [ ] Wenn alle Spieler fertig sind, startet automatisch die nächste Runde
- [ ] Jeder Spieler hat eigene Sicht/Informationen
- [ ] Spieler können sich jederzeit einloggen und ihren Zug machen
- [ ] Persistenter Spielstand in Datenbank
- [ ] **Ausbaustufe:** Konfigurierbarer Timer bis wann Züge gemacht werden müssen

---

### 0.3 Territorialsystem

**US-020:** Als Spieler möchte ich Raumstationen kontrollieren können, damit ich eine territoriale Basis habe.

**Abhängigkeiten:**
- US-010: Spielstart

**Akzeptanzkriterien:**
- [ ] Stationen können besessen/kontrolliert werden
- [ ] Jede Station hat strategischen Wert
- [ ] Kontrolle kann gewonnen/verloren werden
- [ ] UI zeigt kontrollierte Stationen auf Karte

---

**US-021:** Als Spieler möchte ich Sektoren des Weltraums kontrollieren, damit ich größere Gebiete verwalte.

**Abhängigkeiten:**
- US-020: Stationskontrolle

**Akzeptanzkriterien:**
- [ ] Sektoren bestehen aus mehreren Stationen/Systemen
- [ ] Sektorkontrolle bringt zusätzliche Boni
- [ ] Sektorengrenzen sind klar visualisiert
- [ ] Kontrolle über Sektor erfordert Mehrheit der Stationen

---

**US-022:** Als Spieler möchte ich meine territorialen Grenzen sehen und verteidigen, damit ich mein Reich überblicken kann.

**Abhängigkeiten:**
- US-021: Sektorkontrolle
- US-020: Stationskontrolle

**Akzeptanzkriterien:**
- [ ] Grenzen werden auf Karte angezeigt
- [ ] Grenzgebiete sind erkennbar
- [ ] Bedrohungen an Grenzen werden gemeldet
- [ ] Grenzänderungen werden visualisiert

---

**US-023:** Als Spieler möchte ich Territorien erweitern oder durch Eroberung/Verlust verlieren können, damit territoriale Dynamik entsteht.

**Abhängigkeiten:**
- US-022: Territoriale Grenzen
- US-050: Militärsystem (für Eroberung)

**Akzeptanzkriterien:**
- [ ] Territorien können friedlich oder militärisch erweitert werden
- [ ] Verlust von Territorien ist möglich
- [ ] Territoriale Änderungen haben strategische Konsequenzen
- [ ] History-Log zeigt territoriale Entwicklung

---

### 0.4 Militär & Flotten-System

**US-050:** Als Spieler möchte ich Raumschiffe bauen oder kaufen können, damit ich eine Flotte aufbauen kann.

**Abhängigkeiten:**
- US-010: Spielstart
- US-100: Ressourcensystem (Schiffsbau kostet Ressourcen)

**Akzeptanzkriterien:**
- [ ] Mindestens 5 verschiedene Schiffstypen verfügbar
- [ ] Schiffe haben unterschiedliche Kosten und Fähigkeiten
- [ ] Schiffsbau benötigt Zeit und Ressourcen
- [ ] Schiffe können auch gekauft werden (schneller, aber teurer)

---

**US-051:** Als Spieler möchte ich Schiffe zu Flotten gruppieren, damit ich sie koordiniert einsetzen kann.

**Abhängigkeiten:**
- US-050: Schiffe müssen existieren

**Akzeptanzkriterien:**
- [ ] Mehrere Schiffe können zu Flotten zusammengefasst werden
- [ ] Flotten haben Kommandanten
- [ ] Flottenkommandos gelten für alle Schiffe
- [ ] UI zeigt Flottenübersicht

---

**US-052:** Als Spieler möchte ich Flotten kommandieren und Befehle erteilen, damit ich militärische Operationen durchführe.

**Abhängigkeiten:**
- US-051: Flotten müssen existieren

**Akzeptanzkriterien:**
- [ ] Mindestens 5 verschiedene Flottenkommandos (Patrouille, Angriff, Verteidigung, etc.)
- [ ] Befehle sind rundenbasiert
- [ ] Flottenposition wird auf Karte angezeigt
- [ ] Kommandos haben taktische Konsequenzen

---

**US-053:** Als Spieler möchte ich Handelsrouten mit Flotten sichern können, damit mein Handel geschützt ist.

**Abhängigkeiten:**
- US-052: Flottenkommandos
- US-200: Handelssystem muss existieren

**Akzeptanzkriterien:**
- [ ] Flotten können Routen patrouillieren
- [ ] Gesicherte Routen haben geringeres Risiko
- [ ] Piratenangriffe werden abgewehrt
- [ ] UI zeigt gesicherte vs. unsichere Routen

---

**US-054:** Als Spieler möchte ich Flotten für Raubzüge nutzen können, damit ich alternative Einkommensquellen habe.

**Abhängigkeiten:**
- US-052: Flottenkommandos
- US-053: Routensystem
- US-300: Reputation (Raubzüge senken Reputation)

**Akzeptanzkriterien:**
- [ ] Raubzüge bringen Ressourcen/Credits
- [ ] Raubzüge haben Erfolgswahrscheinlichkeit
- [ ] Raubzüge senken Reputation erheblich
- [ ] Geheime Raubzüge sind möglich (Spionagesystem)

---

**US-055:** Als Spieler möchte ich militärische Konflikte führen können, damit ich Territorien erobern oder verteidigen kann.

**Abhängigkeiten:**
- US-052: Flottenkommandos
- US-023: Territoriale Expansion

**Akzeptanzkriterien:**
- [ ] Konflikte haben taktisches Kampfsystem
- [ ] Schiffsverluste sind permanent
- [ ] Gewonnene Kämpfe ermöglichen Eroberung
- [ ] Verlorene Kämpfe können Territorien kosten

---

### 0.5 Ressourcen-System

**US-100:** Als Spieler möchte ich verschiedene Ressourcentypen haben (Metalle, Energie, Nahrung, Luxusgüter), damit Handel und Produktion komplex sind.

**Abhängigkeiten:**
- US-010: Spielstart

**Akzeptanzkriterien:**
- [ ] Mindestens 10 verschiedene Ressourcentypen
- [ ] Ressourcen haben unterschiedliche Verwendungszwecke
- [ ] Ressourcen werden in Inventar angezeigt
- [ ] Ressourcenknappheit beeinflusst Wirtschaft

---

**US-101:** Als Spieler möchte ich Ressourcenvorkommen in kontrollierten Gebieten finden, damit territoriale Kontrolle wertvoll ist.

**Abhängigkeiten:**
- US-100: Ressourcentypen
- US-020: Stationskontrolle

**Akzeptanzkriterien:**
- [ ] Stationen/Sektoren haben Ressourcenvorkommen
- [ ] Vorkommen sind unterschiedlich verteilt
- [ ] Seltene Ressourcen sind strategisch wertvoll
- [ ] UI zeigt Ressourcenvorkommen auf Karte

---

**US-102:** Als Spieler möchte ich Ressourcen abbauen oder produzieren, damit ich Einkommen generiere.

**Abhängigkeiten:**
- US-101: Ressourcenvorkommen
- US-020: Kontrollierte Stationen

**Akzeptanzkriterien:**
- [ ] Kontrolle über Vorkommen ermöglicht Abbau
- [ ] Abbau generiert Ressourcen pro Runde
- [ ] Produktionsanlagen können gebaut werden
- [ ] Produktionsrate ist verbesserbar

---

**US-103:** Als Spieler möchte ich Ressourcenknappheit erleben, damit strategische Entscheidungen notwendig sind.

**Abhängigkeiten:**
- US-100: Ressourcensystem
- US-102: Ressourcenproduktion

**Akzeptanzkriterien:**
- [ ] Nicht alle Ressourcen sind überall verfügbar
- [ ] Knappheit treibt Preise hoch
- [ ] Mangel an kritischen Ressourcen hat Konsequenzen
- [ ] Handel wird durch Knappheit motiviert

---

## Epic 1: Charaktererstellung & Hintergrund

**US-150:** Als Spieler möchte ich zu Spielbeginn eine KI-generierte Hintergrundgeschichte erhalten, damit mein Charakter eine glaubwürdige Vergangenheit hat.

**Abhängigkeiten:**
- US-010: Spielstart muss funktionieren
- US-001: KI-Generierung für Texte

**Akzeptanzkriterien:**
- [ ] Jeder Spielstart generiert einzigartige Hintergrundgeschichte
- [ ] Geschichte ist 3-5 Absätze lang
- [ ] Geschichte etabliert Kontext (Familie, Herkunft, prägende Ereignisse)
- [ ] Geschichte wird zu Spielbeginn angezeigt

---

**US-151:** Als Spieler möchte ich, dass meine Hintergrundgeschichte meine Startbedingungen beeinflusst (z.B. militärische Kontakte, Schulden, Ruf), damit jeder Spielstart einzigartig ist.

**Abhängigkeiten:**
- US-150: Hintergrundgeschichte muss generiert sein
- US-300: Reputationssystem
- US-100: Ressourcensystem (für Schulden/Startkapital)

**Akzeptanzkriterien:**
- [ ] Hintergrund beeinflusst Startressourcen (+/- 30%)
- [ ] Hintergrund gibt initiale Reputation bei Fraktionen
- [ ] Hintergrund kann spezielle Kontakte oder Schulden geben
- [ ] Unterschiede sind im Gameplay messbar

---

**US-152:** Als Spieler möchte ich, dass NPCs auf meine Hintergrundgeschichte reagieren, damit sich die Welt kohärent anfühlt.

**Abhängigkeiten:**
- US-150: Hintergrundgeschichte
- US-002: Dynamische NPC-Dialoge
- US-003: NPC-Gedächtnis

**Akzeptanzkriterien:**
- [ ] NPCs erwähnen Elemente der Hintergrundgeschichte in Dialogen
- [ ] Hintergrund beeinflusst initiale NPC-Reaktionen
- [ ] Mindestens 3 NPCs pro Spiel referenzieren Hintergrund
- [ ] Referenzen passen zum Kontext

---

## Epic 2: Handelssystem

### 2.1 Dynamische Verhandlungen

**US-200:** Als Spieler möchte ich dynamische Preisverhandlungen statt fixer Preislisten haben, damit Handel interaktiv ist.

**Abhängigkeiten:**
- US-100: Ressourcensystem
- US-002: Dynamische Dialoge
- US-001: NPC-Persönlichkeiten

**Akzeptanzkriterien:**
- [ ] Preise werden nicht fix angezeigt, sondern verhandelt
- [ ] NPC-Händler machen Gegenangebote
- [ ] Verhandlungsgeschick beeinflusst Ergebnis
- [ ] Mindestens 3 Verhandlungsrunden möglich

---

**US-201:** Als Spieler möchte ich, dass NPC-Händler sich an vergangene Geschäfte erinnern, damit Beziehungen aufgebaut werden.

**Abhängigkeiten:**
- US-200: Handelssystem
- US-003: NPC-Gedächtnis

**Akzeptanzkriterien:**
- [ ] NPCs erinnern sich an Anzahl der Geschäfte
- [ ] NPCs erinnern sich an Fairness vergangener Deals
- [ ] Wiederholte Geschäfte verbessern Konditionen
- [ ] NPCs erwähnen vergangene Deals in Dialogen

---

**US-202:** Als Spieler möchte ich, dass NPC-Händler aktuelle Marktlagen berücksichtigen, damit Handel realistisch ist.

**Abhängigkeiten:**
- US-200: Handelssystem
- US-220: Marktdynamik

**Akzeptanzkriterien:**
- [ ] Preise reflektieren Angebot und Nachfrage
- [ ] NPCs erwähnen Marktbedingungen in Dialogen
- [ ] Krisenzeiten erhöhen Preise für kritische Güter
- [ ] NPCs lehnen Deals ab, wenn Preise zu niedrig sind

---

**US-203:** Als Spieler möchte ich, dass NPC-Händler persönliche Beziehungen berücksichtigen, damit soziales Kapital handelbar ist.

**Abhängigkeiten:**
- US-200: Handelssystem
- US-003: NPC-Gedächtnis
- US-300: Reputationssystem

**Akzeptanzkriterien:**
- [ ] Gute Beziehungen senken Preise (5-20%)
- [ ] Schlechte Beziehungen erhöhen Preise oder blockieren Handel
- [ ] NPCs geben Freunden bessere Deals
- [ ] UI zeigt Beziehungsbonus/-malus

---

**US-204:** Als Spieler möchte ich bessere Preise bekommen, wenn ich jemandem früher geholfen habe, damit gute Taten belohnt werden.

**Abhängigkeiten:**
- US-203: Persönliche Beziehungen im Handel
- US-003: NPC-Gedächtnis

**Akzeptanzkriterien:**
- [ ] Vergangene Gefallen werden als "Schuld" gespeichert
- [ ] NPCs bieten bessere Preise aus Dankbarkeit
- [ ] Größere Gefallen = größere Rabatte
- [ ] NPCs erwähnen den Gefallen explizit

---

**US-205:** Als Spieler möchte ich, dass Händler den Handel verweigern, wenn ich ihr Haus verraten habe, damit Verrat Konsequenzen hat.

**Abhängigkeiten:**
- US-203: Persönliche Beziehungen
- US-003: NPC-Gedächtnis
- US-460: Informationssystem (Verrat muss aufgedeckt werden)

**Akzeptanzkriterien:**
- [ ] Schwerer Verrat führt zu Handelsembargo
- [ ] NPCs erklären warum sie nicht handeln
- [ ] Embargo kann durch Wiedergutmachung aufgehoben werden
- [ ] Hausloyalität bestimmt Embargo-Strenge

---

### 2.2 Marktdynamik

**US-220:** Als Spieler möchte ich, dass Massenkäufe Preise hochtreiben, damit Märkte auf Angebot und Nachfrage reagieren.

**Abhängigkeiten:**
- US-200: Handelssystem
- US-100: Ressourcensystem

**Akzeptanzkriterien:**
- [ ] Große Käufe erhöhen Preise (dynamisch)
- [ ] Große Verkäufe senken Preise
- [ ] Preisänderungen sind für Spieler sichtbar
- [ ] Markteffekt hält mehrere Runden an

---

**US-221:** Als Spieler möchte ich, dass KI-Events Krisen erschaffen (z.B. Seuchen erhöhen Medikamentenpreise), damit die Welt dynamisch ist.

**Abhängigkeiten:**
- US-220: Marktdynamik
- US-800: Event-Generierung

**Akzeptanzkriterien:**
- [ ] Mindestens 5 verschiedene Krisentypen
- [ ] Krisen beeinflussen spezifische Ressourcenpreise
- [ ] Krisen dauern begrenzte Zeit
- [ ] NPCs kommentieren aktuelle Krisen

---

**US-222:** Als Spieler möchte ich, dass technologische Durchbrüche alte Waren wertlos machen, damit ich Innovation berücksichtigen muss.

**Abhängigkeiten:**
- US-220: Marktdynamik
- US-700: Forschungssystem

**Akzeptanzkriterien:**
- [ ] Neue Technologien entwerten alte Produkte
- [ ] Entwertung geschieht graduell (3-5 Runden)
- [ ] Frühe Adoption neuer Technologie bringt Vorteil
- [ ] UI warnt vor technologischer Obsoleszenz

---

**US-223:** Als Spieler möchte ich, dass politische Embargos profitable Routen sperren, damit Politik den Handel beeinflusst.

**Abhängigkeiten:**
- US-200: Handelssystem
- US-650: Diplomatie-System

**Akzeptanzkriterien:**
- [ ] Embargos blockieren Handel mit bestimmten Fraktionen
- [ ] Embargo-Bruch ist möglich aber riskant
- [ ] Embargos werden politisch verkündet
- [ ] UI zeigt gesperrte Handelspartner

---

### 2.3 Marktmanipulation

**US-240:** Als Spieler möchte ich mit Waren spekulieren können, damit ich Risiken eingehen kann.

**Abhängigkeiten:**
- US-220: Marktdynamik
- US-100: Ressourcensystem

**Akzeptanzkriterien:**
- [ ] Waren können auf Vorrat gekauft werden
- [ ] Spekulation kann Gewinn oder Verlust bringen
- [ ] Markttrends sind teilweise vorhersehbar
- [ ] UI zeigt Preisentwicklung (Charts)

---

**US-241:** Als Spieler möchte ich Waren horten können, damit ich Knappheit erschaffen kann.

**Abhängigkeiten:**
- US-240: Spekulation
- US-220: Marktdynamik

**Akzeptanzkriterien:**
- [ ] Große Lagerhaltung reduziert Marktangebot
- [ ] Künstliche Knappheit erhöht Preise
- [ ] Horten ist sichtbar für andere (Spionage)
- [ ] Lagerkapazität ist begrenzt

---

**US-242:** Als Spieler möchte ich Kartelle mit anderen bilden können, damit Kooperation möglich ist.

**Abhängigkeiten:**
- US-241: Marktmanipulation
- US-650: Diplomatie-System

**Akzeptanzkriterien:**
- [ ] Kartelle können zwischen 2-4 Spielern gebildet werden
- [ ] Kartellmitglieder kontrollieren gemeinsam Preise
- [ ] Kartellbruch ist möglich (geheim oder öffentlich)
- [ ] Kartelle sind halböffentlich (Gerüchte)

---

**US-243:** Als Spieler möchte ich durch gezielte Aktionen Märkte manipulieren, damit strategische Tiefe entsteht.

**Abhängigkeiten:**
- US-240-242: Spekulation, Horten, Kartelle
- US-320: Einfluss-System

**Akzeptanzkriterien:**
- [ ] Mindestens 5 verschiedene Manipulationsstrategien
- [ ] Manipulation erfordert signifikanten Einfluss
- [ ] Manipulation kann aufgedeckt werden
- [ ] Erfolgreiche Manipulation bringt große Gewinne

---

**US-244:** Als Spieler möchte ich, dass die KI auf meine Marktmanipulation mit emergenten Konsequenzen reagiert, damit das System unvorhersehbar bleibt.

**Abhängigkeiten:**
- US-243: Marktmanipulation
- US-800: Event-Generierung

**Akzeptanzkriterien:**
- [ ] KI generiert logische Reaktionen auf Manipulation
- [ ] Andere Häuser können Gegenmaßnahmen ergreifen
- [ ] Zu aggressive Manipulation führt zu politischen Konsequenzen
- [ ] Reaktionen sind kontextabhängig, nicht vorgefertigt

---

## Epic 3: Reputation & Einfluss-System

### 3.1 Reputation

**US-300:** Als Spieler möchte ich einen Reputationswert haben, der mein soziales Kapital repräsentiert, damit ich verstehe, wie mich andere wahrnehmen.

**Abhängigkeiten:**
- US-010: Spielstart
- US-001: NPC-System (NPCs vergeben Reputation)

**Akzeptanzkriterien:**
- [ ] Reputationswert ist numerisch (z.B. 0-100)
- [ ] Reputation ist pro Fraktion/Haus getrennt
- [ ] UI zeigt aktuelle Reputation deutlich
- [ ] Reputation ändert sich durch Aktionen

---

**US-301:** Als Spieler mit hoher Reputation möchte ich bei Verhandlungen Vorteile erhalten, damit sich mein guter Ruf auszahlt.

**Abhängigkeiten:**
- US-300: Reputationssystem
- US-200: Verhandlungen

**Akzeptanzkriterien:**
- [ ] Hohe Reputation senkt Preise um 10-25%
- [ ] NPCs bieten bessere Erstangebote
- [ ] Reputation erhöht Verhandlungsspielraum
- [ ] UI zeigt Reputationsbonus

---

**US-302:** Als Spieler möchte ich, dass meine Reputation bei aufgedeckten Skandalen sinkt, damit meine geheimen Aktionen Risiken haben.

**Abhängigkeiten:**
- US-300: Reputationssystem
- US-460: Skandalaufdeckung

**Akzeptanzkriterien:**
- [ ] Aufgedeckte geheime Aktionen senken Reputation erheblich (-20 bis -50)
- [ ] Schwere der Tat bestimmt Reputationsverlust
- [ ] Mehrere Fraktionen können gleichzeitig betroffen sein
- [ ] Reputationsverlust ist dauerhaft (nur langsam wiederherstellbar)

---

**US-303:** Als Spieler möchte ich bei wichtigen Entscheidungen anderer Häuser konsultiert werden, wenn ich hohe Reputation habe, damit ich politisch relevant bin.

**Abhängigkeiten:**
- US-300: Reputationssystem
- US-001: NPC-System
- US-600: Aufstiegssystem (Major/Minor Houses)

**Akzeptanzkriterien:**
- [ ] Bei Reputation >80 werden Spieler zu Entscheidungen befragt
- [ ] Spielermeinung beeinflusst NPC-Entscheidungen
- [ ] Konsultation erfolgt via Dialoge/Events
- [ ] Ablehnung der Konsultation hat Konsequenzen

---

**US-304:** Als Spieler möchte ich sehen, dass NPCs meinen Versprechen mehr glauben, wenn ich hohe Reputation habe, damit Vertrauen mechanisch relevant ist.

**Abhängigkeiten:**
- US-300: Reputationssystem
- US-002: Dynamische Dialoge

**Akzeptanzkriterien:**
- [ ] Hohe Reputation macht Versprechen glaubwürdiger
- [ ] NPCs akzeptieren Versprechen statt sofortiger Zahlung
- [ ] Gebrochene Versprechen senken Reputation massiv
- [ ] Reputation beeinflusst Diplomatie-Chancen

---

### 3.2 Einfluss

**US-320:** Als Spieler möchte ich einen Einflusswert haben, der meine reale Macht repräsentiert, damit ich meine Position im Universum einschätzen kann.

**Abhängigkeiten:**
- US-010: Spielstart

**Akzeptanzkriterien:**
- [ ] Einflusswert ist numerisch messbar
- [ ] Einfluss wird aus verschiedenen Quellen berechnet
- [ ] UI zeigt Gesamteinfluss und Breakdown nach Quellen
- [ ] Einfluss bestimmt politische Macht

---

**US-321:** Als Spieler möchte ich Einfluss durch wirtschaftliche Dominanz gewinnen, damit erfolgreicher Handel belohnt wird.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-200: Handelssystem
- US-220: Marktdynamik

**Akzeptanzkriterien:**
- [ ] Handelsvolumen erhöht Einfluss
- [ ] Marktanteile werden berechnet
- [ ] Monopole bringen besonders viel Einfluss
- [ ] Einfluss wächst proportional zu Wirtschaftsmacht

---

**US-322:** Als Spieler möchte ich Einfluss durch territoriale Kontrolle gewinnen, damit Expansion einen messbaren Vorteil bringt.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-020-023: Territorialsystem

**Akzeptanzkriterien:**
- [ ] Jede kontrollierte Station gibt Einfluss
- [ ] Sektorkontrolle gibt Bonus-Einfluss
- [ ] Strategisch wichtige Orte geben mehr Einfluss
- [ ] Territoriale Expansion ist im Einflusswert sichtbar

---

**US-323:** Als Spieler möchte ich Einfluss durch militärische Stärke gewinnen, damit Flottenbau strategisch sinnvoll ist.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-050-055: Militärsystem

**Akzeptanzkriterien:**
- [ ] Flottengröße erhöht Einfluss
- [ ] Schiffsqualität ist wichtiger als reine Anzahl
- [ ] Militärische Siege bringen Bonus-Einfluss
- [ ] Einfluss aus Militär ist in UI sichtbar

---

**US-324:** Als Spieler möchte ich Einfluss durch politische Ämter gewinnen, damit Positionen in Häusern wertvoll sind.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-550: Ämtersystem

**Akzeptanzkriterien:**
- [ ] Jedes Amt gibt spezifischen Einflusswert
- [ ] Höhere Ämter geben mehr Einfluss
- [ ] Ämter in mächtigeren Häusern geben mehr Einfluss
- [ ] Amtsverlust reduziert Einfluss sofort

---

**US-325:** Als Spieler möchte ich Einfluss durch Informationsnetzwerke gewinnen, damit Spionage einen strategischen Wert hat.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-500: Spionagesystem

**Akzeptanzkriterien:**
- [ ] Anzahl der Spione erhöht Einfluss
- [ ] Qualität der Informationen bringt Bonus
- [ ] Gut platzierte Spione geben mehr Einfluss
- [ ] Verlorene Spione reduzieren Einfluss

---

**US-326:** Als Spieler möchte ich Einfluss durch technologischen Vorsprung gewinnen, damit Forschung belohnt wird.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-700: Forschungssystem

**Akzeptanzkriterien:**
- [ ] Fortgeschrittene Technologien geben Einfluss
- [ ] Exklusive Technologien geben mehr Einfluss
- [ ] Technologieführerschaft ist messbar
- [ ] Veraltete Technologie gibt keinen Einfluss

---

**US-327:** Als Spieler mit hohem Einfluss möchte ich Märkte manipulieren können, damit meine Macht konkrete Vorteile bringt.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-243: Marktmanipulation

**Akzeptanzkriterien:**
- [ ] Hoher Einfluss schaltet Manipulationsoptionen frei
- [ ] Mindesteinfluss erforderlich für bestimmte Aktionen
- [ ] Einfluss reduziert Kosten von Manipulation
- [ ] UI zeigt einflusbasierte Möglichkeiten

---

**US-328:** Als Spieler mit hohem Einfluss möchte ich Entscheidungen erzwingen können, auch wenn mich andere dafür verachten, damit Macht und Reputation unabhängig sind.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-300: Reputationssystem

**Akzeptanzkriterien:**
- [ ] Hoher Einfluss ermöglicht Erzwingung von Entscheidungen
- [ ] Erzwingen senkt Reputation erheblich
- [ ] Machtmissbrauch ist möglich aber kostspielig
- [ ] NPCs kommentieren tyrannisches Verhalten

---

### 3.3 Balance-Mechanik

**US-340:** Als Spieler möchte ich beide Werte (Reputation und Einfluss) balancieren müssen, damit ich strategische Entscheidungen treffen muss.

**Abhängigkeiten:**
- US-300: Reputationssystem
- US-320: Einfluss-System

**Akzeptanzkriterien:**
- [ ] Manche Aktionen erhöhen Einfluss aber senken Reputation
- [ ] Andere Aktionen erhöhen Reputation aber kosten Einfluss
- [ ] Perfektes Balancieren ist unmöglich (Trade-offs nötig)
- [ ] UI zeigt beide Werte prominent

---

**US-341:** Als Spieler mit hoher Reputation aber niedrigem Einfluss möchte ich respektiert werden, aber wenig bewirken können, damit die Balance spürbar ist.

**Abhängigkeiten:**
- US-340: Balance-Mechanik

**Akzeptanzkriterien:**
- [ ] NPCs sind freundlich aber ignorieren Forderungen
- [ ] Gute Preise aber keine politische Macht
- [ ] Dialoge reflektieren "respektierte Schwäche"
- [ ] Gameplay macht Machtlosigkeit spürbar

---

**US-342:** Als Spieler mit hohem Einfluss aber niedriger Reputation möchte ich gefürchtet werden, aber kaum Freiwillige finden, damit beide Werte wichtig sind.

**Abhängigkeiten:**
- US-340: Balance-Mechanik

**Akzeptanzkriterien:**
- [ ] Befehle werden befolgt aber widerwillig
- [ ] Rekrutierung ist teuer oder unmöglich
- [ ] NPCs zeigen Furcht in Dialogen
- [ ] Isolation ist mechanisch spürbar

---

## Epic 4: Informationssystem & Sichtbarkeit

### 4.1 Sichtbarkeitsebenen

**US-460:** Als Spieler möchte ich normale Handelsgeschäfte öffentlich sehen, damit ich Marktbewegungen nachvollziehen kann.

**Abhängigkeiten:**
- US-200: Handelssystem

**Akzeptanzkriterien:**
- [ ] Alle Handelsgeschäfte werden im Markt-Log angezeigt
- [ ] Handelsvolumen ist für alle sichtbar
- [ ] Preise sind öffentliche Information
- [ ] Log zeigt mindestens letzte 20 Transaktionen

---

**US-461:** Als Spieler möchte ich, dass große Deals und Allianzen halböffentlich sind, damit Gerüchte entstehen können.

**Abhängigkeiten:**
- US-460: Öffentliche Information
- US-650: Allianzen

**Akzeptanzkriterien:**
- [ ] Große Geschäfte (>10.000 Credits) sind halböffentlich
- [ ] Details sind unscharf ("großer Deal mit Haus X")
- [ ] Informationsqualität hängt von Spionage ab
- [ ] Gerüchte verbreiten sich über NPCs

---

**US-462:** Als Spieler möchte ich bei halböffentlichen Aktionen NPCs mit "Ich habe gehört, dass..." reagieren sehen, damit die Welt lebendig wirkt.

**Abhängigkeiten:**
- US-461: Halböffentliche Aktionen
- US-002: Dynamische Dialoge

**Akzeptanzkriterien:**
- [ ] NPCs erwähnen Gerüchte in Dialogen
- [ ] Gerüchte sind teilweise korrekt, teilweise verzerrt
- [ ] Spieler kann Gerüchte bestätigen oder dementieren
- [ ] Mindestens 5 verschiedene Gerüchte-Formulierungen

---

**US-463:** Als Spieler möchte ich geheime Aktionen (Bestechung, Sabotage, Schmuggel) durchführen können, die verborgen bleiben, damit ich riskante Strategien verfolgen kann.

**Abhängigkeiten:**
- US-460: Informationssystem
- US-500: Spionagesystem (für Geheimhaltung)

**Akzeptanzkriterien:**
- [ ] Mindestens 5 verschiedene geheime Aktionstypen
- [ ] Geheime Aktionen sind standardmäßig unsichtbar
- [ ] Aufdeckungsrisiko ist vorhanden
- [ ] UI zeigt "geheime Aktionen"-Menü

---

### 4.2 Aufdeckung & Konsequenzen

**US-480:** Als Spieler möchte ich, dass geheime Aktionen aufgedeckt werden können, damit Risiko und Spannung entstehen.

**Abhängigkeiten:**
- US-463: Geheime Aktionen
- US-500: Spionagesystem

**Akzeptanzkriterien:**
- [ ] Jede geheime Aktion hat Aufdeckungswahrscheinlichkeit
- [ ] Spionage erhöht Aufdeckungschance
- [ ] Aufdeckung wird dramatisch inszeniert
- [ ] Aufdeckung erfolgt verzögert (nicht sofort)

---

**US-481:** Als Spieler möchte ich bei aufgedeckten Skandalen Reputationsverlust erleiden, damit Geheimnisse einen Preis haben.

**Abhängigkeiten:**
- US-480: Aufdeckung
- US-302: Reputation und Skandale

**Akzeptanzkriterien:**
- [ ] Skandale senken Reputation bei allen Fraktionen
- [ ] Schwere bestimmt Reputationsverlust
- [ ] Öffentliche Skandale schaden mehr als private Aufdeckung
- [ ] Reputationsverlust ist dauerhaft

---

**US-482:** Als Spieler möchte ich, dass NPCs nach aufgedeckten Skandalen anders auf mich reagieren, damit Konsequenzen spürbar sind.

**Abhängigkeiten:**
- US-481: Reputationsverlust durch Skandale
- US-002: Dynamische Dialoge
- US-003: NPC-Gedächtnis

**Akzeptanzkriterien:**
- [ ] NPCs erwähnen Skandal in Dialogen
- [ ] Verhalten ändert sich (Misstrauen, Ablehnung)
- [ ] Einige NPCs brechen Beziehungen ab
- [ ] Andere NPCs nutzen Skandal als Druckmittel

---

## Epic 5: Spionagesystem

### 5.1 Spion-Rekrutierung & Charaktere

**US-500:** Als Spieler möchte ich Spione mit KI-generierten Persönlichkeiten anheuern, damit jeder Agent einzigartig ist.

**Abhängigkeiten:**
- US-001: KI-Persönlichkeiten
- US-100: Ressourcensystem (Bezahlung)

**Akzeptanzkriterien:**
- [ ] Spione haben individuelle Persönlichkeitsmerkmale
- [ ] Mindestens 5 verschiedene Persönlichkeitstypen
- [ ] Persönlichkeit beeinflusst Verhalten
- [ ] Rekrutierung erfolgt über Dialoge

---

**US-501:** Als Spieler möchte ich, dass manche Spione gierig sind und sich leicht kaufen lassen, damit ich verschiedene Strategien habe.

**Abhängigkeiten:**
- US-500: Spion-Persönlichkeiten

**Akzeptanzkriterien:**
- [ ] "Gierige" Spione akzeptieren Bestechung leichter
- [ ] Höhere Bezahlung sichert Loyalität
- [ ] Gierige Spione verraten für Geld
- [ ] Persönlichkeit wird im UI angezeigt

---

**US-502:** Als Spieler möchte ich, dass manche Spione idealistisch sind und nie gegen ihre Prinzipien handeln, damit ich ihre Werte berücksichtigen muss.

**Abhängigkeiten:**
- US-500: Spion-Persönlichkeiten

**Akzeptanzkriterien:**
- [ ] Idealistische Spione lehnen bestimmte Missionen ab
- [ ] Prinzipien sind klar definiert (z.B. "kein Mord")
- [ ] Verletzung von Prinzipien führt zu sofortigem Überlaufen
- [ ] Spione erklären ihre Prinzipien bei Rekrutierung

---

**US-503:** Als Spieler möchte ich, dass manche Spione opportunistisch sind und dem Höchstbietenden dienen, damit Loyalität unsicher ist.

**Abhängigkeiten:**
- US-500: Spion-Persönlichkeiten

**Akzeptanzkriterien:**
- [ ] Opportunistische Spione vergleichen Angebote
- [ ] Gegenangebote können Spione abwerben
- [ ] Opportunisten sind nicht dauerhaft loyal
- [ ] UI warnt vor opportunistischen Spionen

---

### 5.2 Loyalitätssystem

**US-520:** Als Spieler möchte ich, dass Spionenloyalität von Bezahlung abhängt, damit ich sie angemessen entlohnen muss.

**Abhängigkeiten:**
- US-500: Spionagesystem
- US-100: Ressourcensystem

**Akzeptanzkriterien:**
- [ ] Regelmäßige Bezahlung erhält Loyalität
- [ ] Unterbezahlung senkt Loyalität
- [ ] Loyalitätswert ist numerisch (0-100)
- [ ] UI zeigt Loyalität jedes Spions

---

**US-521:** Als Spieler möchte ich, dass Spionenloyalität von meiner Behandlung abhängt, damit faire Behandlung belohnt wird.

**Abhängigkeiten:**
- US-520: Loyalitätssystem

**Akzeptanzkriterien:**
- [ ] Erfolgreiche Missionen erhöhen Loyalität
- [ ] Respektvolle Dialoge erhöhen Loyalität
- [ ] Missbrauch senkt Loyalität
- [ ] Behandlungshistorie wird gespeichert

---

**US-522:** Als Spieler möchte ich, dass Spione sich merken, ob ich sie in selbstmörderische Missionen schicke, damit meine Führung Konsequenzen hat.

**Abhängigkeiten:**
- US-521: Behandlung beeinflusst Loyalität
- US-003: Gedächtnissystem

**Akzeptanzkriterien:**
- [ ] Hochriskante Missionen werden als solche erkannt
- [ ] Wiederholte Risikozuweisung senkt Loyalität stark
- [ ] Spione können Missionen verweigern
- [ ] Andere Spione erfahren davon (senkt allgemeine Moral)

---

**US-523:** Als Spieler möchte ich, dass konkurrierende Spieler meine Agenten abwerben können, damit ich sie halten muss.

**Abhängigkeiten:**
- US-520: Loyalitätssystem
- US-500: Spionagesystem

**Akzeptanzkriterien:**
- [ ] Andere Spieler können Abwerbe-Versuche starten
- [ ] Niedrige Loyalität erhöht Abwerbe-Erfolg
- [ ] Spieler wird über Abwerbe-Versuch informiert (wenn Spion loyal)
- [ ] Gegenangebote sind möglich

---

**US-524:** Als Spieler möchte ich, dass der Abwerbe-Preis von der aktuellen Zuneigung des Spions abhängt, damit Beziehungen wichtig sind.

**Abhängigkeiten:**
- US-523: Abwerben
- US-520: Loyalität

**Akzeptanzkriterien:**
- [ ] Hohe Loyalität erfordert sehr hohe Angebote
- [ ] Niedrige Loyalität macht Abwerben billig
- [ ] Formel: Kosten ~ Basislohn * (Loyalität/50)
- [ ] UI zeigt geschätzte Abwerbekosten

---

**US-525:** Als Spieler möchte ich, dass Zuneigung mit meiner Reputation beim jeweiligen Haus verbunden ist, damit Ruf bei der Loyalität hilft.

**Abhängigkeiten:**
- US-520: Loyalität
- US-300: Reputationssystem

**Akzeptanzkriterien:**
- [ ] Spione aus Haus X sind loyaler bei hoher Reputation mit Haus X
- [ ] Reputationsverlust senkt Loyalität zugehöriger Spione
- [ ] Hausloyalität wird in UI angezeigt
- [ ] Effekt ist signifikant (+/- 20 Loyalität)

---

### 5.3 Spion-Interaktionen

**US-540:** Als Spieler möchte ich KI-generierte Verhandlungsdialoge mit Spionen führen, die ihre Persönlichkeit reflektieren, damit Interaktionen authentisch wirken.

**Abhängigkeiten:**
- US-500: Spion-Persönlichkeiten
- US-002: Dynamische Dialoge

**Akzeptanzkriterien:**
- [ ] Jeder Spion hat individuellen Dialogstil
- [ ] Persönlichkeit beeinflusst Reaktionen
- [ ] Dialoge sind nicht vorgefertigt
- [ ] Mindestens 3 Dialogoptionen pro Interaktion

---

**US-541:** Als Spieler möchte ich, dass loyale Spione mich vor Bestechungsversuchen warnen, damit Loyalität praktischen Nutzen hat.

**Abhängigkeiten:**
- US-520: Loyalitätssystem
- US-523: Abwerben

**Akzeptanzkriterien:**
- [ ] Bei Loyalität >70 werden Abwerbe-Versuche gemeldet
- [ ] Spieler erfährt wer versucht hat abzuwerben
- [ ] Spieler kann reagieren (Gegenangebot, Konfrontation)
- [ ] Warnung erfolgt als Event/Dialog

---

**US-542:** Als Spieler möchte ich, dass unzufriedene Spione kommentarlos überlaufen, damit ich ihre Zufriedenheit im Auge behalte.

**Abhängigkeiten:**
- US-520: Loyalitätssystem

**Akzeptanzkriterien:**
- [ ] Bei Loyalität <20 können Spione ohne Warnung überlaufen
- [ ] Überlaufen ist permanenter Verlust
- [ ] Übergelaufene Spione arbeiten für Gegner
- [ ] Spieler erhält nur nachträgliche Meldung

---

**US-543:** Als Spieler möchte ich, dass idealistische Spione Aufträge verweigern, die ihren Werten widersprechen, damit ich ihre Prinzipien respektieren muss.

**Abhängigkeiten:**
- US-502: Idealistische Spione
- US-540: Dialoge mit Spionen

**Akzeptanzkriterien:**
- [ ] Spione erklären warum sie ablehnen
- [ ] Erzwingung senkt Loyalität massiv oder führt zu Überlaufen
- [ ] Alternative Spione müssen gefunden werden
- [ ] UI zeigt Prinzipien vor Missionsauswahl

---

### 5.4 Hausloyalität

**US-560:** Als Spieler möchte ich, dass Spione Hausloyalitäten haben, damit ich deren Grenzen kenne.

**Abhängigkeiten:**
- US-500: Spionagesystem
- US-600: Häuser-System

**Akzeptanzkriterien:**
- [ ] Jeder Spion hat Hausloyalität (kann "keine" sein)
- [ ] Hausloyalität wird bei Rekrutierung angezeigt
- [ ] Loyalität beeinflusst verfügbare Missionen
- [ ] UI zeigt Hausloyalität deutlich

---

**US-561:** Als Spieler möchte ich, dass Spione aus bestimmten Adelshäusern nie fundamentale Interessen dieser Häuser verraten, damit ich diverse Netzwerke aufbauen muss.

**Abhängigkeiten:**
- US-560: Hausloyalität

**Akzeptanzkriterien:**
- [ ] Spione verweigern Missionen gegen ihr Haus
- [ ] "Fundamentale Interessen" sind klar definiert
- [ ] Hausloyalität kann nicht gebrochen werden (nur umgangen)
- [ ] Spieler braucht Spione aus verschiedenen Häusern

---

## Epic 6: Aufstiegssystem

### 6.1 Unabhängiger Händler zu Minor House

**US-600:** Als unabhängiger Händler möchte ich durch wachsenden Einfluss neue Handlungsoptionen freischalten, damit sich Progression lohnt.

**Abhängigkeiten:**
- US-320: Einfluss-System
- US-010: Spielstart (Startstatus ist "Händler")

**Akzeptanzkriterien:**
- [ ] Bei Einfluss-Schwellen schalten neue Aktionen frei
- [ ] Mindestens 5 verschiedene freischaltbare Aktionen
- [ ] Freischaltungen werden dem Spieler angezeigt
- [ ] UI zeigt nächste Schwelle und Belohnung

---

**US-601:** Als Händler möchte ich durch Kontrolle mehrerer Stationen zum Minor House aufsteigen, damit territoriale Expansion belohnt wird.

**Abhängigkeiten:**
- US-600: Händler-Status
- US-020: Stationskontrolle

**Akzeptanzkriterien:**
- [ ] Kontrolle von mindestens 3 Stationen erforderlich
- [ ] Aufstieg zum Minor House wird zeremoniell inszeniert
- [ ] Neue Privilegien werden freigeschaltet
- [ ] Titel ändert sich von "Händler" zu "Minor House [Name]"

---

**US-602:** Als Händler möchte ich durch ausreichendes Handelsvolumen zum Minor House aufsteigen, damit wirtschaftlicher Erfolg anerkannt wird.

**Abhängigkeiten:**
- US-600: Händler-Status
- US-200: Handelssystem
- US-321: Einfluss durch Handel

**Akzeptanzkriterien:**
- [ ] Handelsvolumen-Schwelle definiert (z.B. 100.000 Credits Umsatz)
- [ ] Alternativer Aufstiegsweg zu US-601
- [ ] Wirtschaftsmacht wird anerkannt
- [ ] NPCs gratulieren zum Aufstieg

---

**US-603:** Als Händler möchte ich durch Reputation bei etablierten Häusern zum Minor House aufsteigen, damit soziales Kapital zählt.

**Abhängigkeiten:**
- US-600: Händler-Status
- US-300: Reputationssystem

**Akzeptanzkriterien:**
- [ ] Hohe Reputation bei mindestens 2 Major Houses erforderlich (>80)
- [ ] Alternativer Aufstiegsweg zu US-601/602
- [ ] Soziale Anerkennung führt zu politischem Status
- [ ] Major Houses sponsern den Aufstieg

---

### 6.2 Minor House zu Major House

**US-620:** Als Minor House möchte ich durch territoriale Präsenz über mehrere Sektoren zum Major House aufsteigen, damit Expansion strategisch ist.

**Abhängigkeiten:**
- US-601-603: Minor House Status
- US-021: Sektorkontrolle

**Akzeptanzkriterien:**
- [ ] Kontrolle von mindestens 3 Sektoren erforderlich
- [ ] Sektoren müssen strategisch verteilt sein (nicht alle benachbart)
- [ ] Aufstieg zum Major House ist große Zeremonie
- [ ] Neue politische Rechte werden freigeschaltet

---

**US-621:** Als Minor House möchte ich durch Vasallen oder Schlüsselämter zum Major House aufsteigen, damit politischer Einfluss zählt.

**Abhängigkeiten:**
- US-601-603: Minor House Status
- US-550: Ämtersystem (Schlüsselämter)

**Akzeptanzkriterien:**
- [ ] Mindestens 2 Vasallen oder 3 Schlüsselämter erforderlich
- [ ] Alternativer Aufstiegsweg zu US-620
- [ ] Politisches Netzwerk wird anerkannt
- [ ] Vasallen schwören öffentlich Loyalität

---

**US-622:** Als Minor House möchte ich solide Reputation bei anderen Großmächten benötigen, um Major House zu werden, damit Diplomatie wichtig bleibt.

**Abhängigkeiten:**
- US-601-603: Minor House Status
- US-300: Reputationssystem

**Akzeptanzkriterien:**
- [ ] Reputation bei mindestens 3 bestehenden Major Houses >60 erforderlich
- [ ] Zusätzliche Bedingung zu US-620 oder US-621
- [ ] Schlechte Reputation blockiert Aufstieg
- [ ] Major Houses müssen Aufstieg "anerkennen"

---

## Epic 7: Ämtersystem

### 7.1 Ämter-Vergabe

**US-550:** Als Major House möchte ich verschiedene Ämter an Spieler vergeben können, damit ich politische Strukturen schaffe.

**Abhängigkeiten:**
- US-620-622: Major House Status
- US-001: NPC-System (KI-Major Houses)

**Akzeptanzkriterien:**
- [ ] Mindestens 5 verschiedene Ämtertypen
- [ ] Major Houses können Ämter vergeben/entziehen
- [ ] Jedes Amt hat spezifische Privilegien
- [ ] UI zeigt verfügbare und besetzte Ämter

---

**US-551:** Als Spieler möchte ich, dass die KI Ämter basierend auf meiner Reputation vergibt, damit mein Ruf wichtig ist.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-300: Reputationssystem

**Akzeptanzkriterien:**
- [ ] Hohe Reputation erhöht Vergabe-Wahrscheinlichkeit
- [ ] Niedrige Reputation (<30) schließt Vergabe aus
- [ ] Reputation wichtiger als andere Faktoren
- [ ] KI erklärt Vergabe-Entscheidung

---

**US-552:** Als Spieler möchte ich, dass die KI Ämter basierend auf meinen erbrachten Leistungen vergibt, damit meine Taten zählen.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-003: NPC-Gedächtnis

**Akzeptanzkriterien:**
- [ ] Vergangene Erfolge erhöhen Vergabe-Chance
- [ ] Relevante Leistungen zählen mehr (militärische Erfolge für Flottenkommando)
- [ ] NPCs erwähnen Leistungen als Grund
- [ ] Leistungshistorie wird gespeichert

---

**US-553:** Als Spieler möchte ich, dass die KI Ämter basierend auf der politischen Großwetterlage vergibt, damit das System dynamisch ist.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-800: Event-System

**Akzeptanzkriterien:**
- [ ] Kriegszeiten bevorzugen militärische Ämter
- [ ] Wirtschaftskrisen bevorzugen Handelsämter
- [ ] Politische Lage ändert Vergabe-Prioritäten
- [ ] KI erklärt kontextuelle Gründe

---

**US-554:** Als Spieler möchte ich, dass ein im Krieg befindliches Haus militärische Positionen höher bewertet, damit der Kontext relevant ist.

**Abhängigkeiten:**
- US-553: Kontextabhängige Vergabe
- US-055: Militärische Konflikte

**Akzeptanzkriterien:**
- [ ] Aktiver Krieg erhöht Wert militärischer Ämter
- [ ] Militärische Erfolge werden in Kriegszeiten stärker gewichtet
- [ ] Friedliche Häuser bevorzugen Handels-/Diplomatie-Ämter
- [ ] Wechsel ist dynamisch (nicht fix)

---

**US-555:** Als Spieler möchte ich, dass wirtschaftlich angeschlagene Häuser Ämter an Meistbietende vergeben, damit Notlagen ausgenutzt werden können.

**Abhängigkeiten:**
- US-553: Kontextabhängige Vergabe
- US-220: Wirtschaftssystem

**Akzeptanzkriterien:**
- [ ] Niedrige Ressourcen öffnen "Kauf" von Ämtern
- [ ] Preise sind variabel (je nach Notlage)
- [ ] Gekaufte Ämter haben schlechteren Ruf
- [ ] Andere NPCs kommentieren Korruption

---

### 7.2 Ämter-Privilegien

**US-570:** Als Handelslizenz-Verwalter möchte ich Konkurrenten Zölle auferlegen können, damit mein Amt einen konkreten Vorteil bringt.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-200: Handelssystem

**Akzeptanzkriterien:**
- [ ] Amt "Handelslizenz-Verwalter" existiert
- [ ] Zölle können auf Spieler/NPCs erhoben werden (0-30%)
- [ ] Zolleinnahmen gehen an Amtsinhaber
- [ ] Zu hohe Zölle senken Handelsvolumen

---

**US-571:** Als Handelslizenz-Verwalter möchte ich Handelsverbote aussprechen können, damit ich wirtschaftliche Macht ausüben kann.

**Abhängigkeiten:**
- US-570: Handelslizenz-Amt

**Akzeptanzkriterien:**
- [ ] Handelsverbote können verhängt werden
- [ ] Verbote gelten im Einflussbereich des Major House
- [ ] Umgehung ist möglich aber riskant
- [ ] Verbote senken eigene Reputation (Machtmissbrauch)

---

**US-572:** Als Flottenkommandant möchte ich militärische Ressourcen kontrollieren, damit ich strategische Macht habe.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-050-055: Militärsystem

**Akzeptanzkriterien:**
- [ ] Amt "Flottenkommandant" gibt Zugriff auf Hausflotte
- [ ] Flottengröße hängt vom Major House ab
- [ ] Kommandant kann Flotte einsetzen (mit Einschränkungen)
- [ ] Missbrauch führt zu Amtsentzug

---

**US-573:** Als Flottenkommandant möchte ich Routen sichern oder für Raubzüge nutzen können, damit ich flexible Optionen habe.

**Abhängigkeiten:**
- US-572: Flottenkommandant-Amt
- US-053-054: Routen sichern/Raubzüge

**Akzeptanzkriterien:**
- [ ] Hausflotte kann für beide Zwecke genutzt werden
- [ ] Raubzüge schaden dem Major House (riskant)
- [ ] Routensicherung bringt Ansehen
- [ ] Spieler trägt Verantwortung für Flottenhandlungen

---

**US-574:** Als Ressourcen-Monopolist möchte ich Vorkaufsrechte genießen, damit ich Märkte beeinflussen kann.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-100: Ressourcensystem

**Akzeptanzkriterien:**
- [ ] Amt "Ressourcen-Monopolist" existiert
- [ ] Vorkaufsrecht für spezifische Ressource (z.B. "Titan-Monopolist")
- [ ] Erste Zugriff auf neue Vorkommen
- [ ] Vorkaufsrecht zu fixen Preisen (nicht Marktpreisen)

---

**US-575:** Als Ressourcen-Monopolist möchte ich Preiskontrolle ausüben, damit mein Amt wirtschaftlich mächtig ist.

**Abhängigkeiten:**
- US-574: Ressourcen-Monopolist-Amt
- US-220: Marktdynamik

**Akzeptanzkriterien:**
- [ ] Preise für monopolisierte Ressource können beeinflusst werden
- [ ] Künstliche Preiserhöhung ist möglich
- [ ] Zu hohe Preise führen zu Schmuggel/Schwarzmarkt
- [ ] Preiskontrolle bringt erhebliches Einkommen

---

**US-576:** Als Geheimdienstchef möchte ich vergünstigten Zugang zum Spionage-Netzwerk meines Hauses erhalten, damit ich Informationsvorteile habe.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-500: Spionagesystem

**Akzeptanzkriterien:**
- [ ] Amt "Geheimdienstchef" existiert
- [ ] Zugriff auf Hausspione (ohne eigene Kosten)
- [ ] Informationen über Gegner sind leichter erhältlich
- [ ] Spionageaktionen sind günstiger (-30% Kosten)

---

### 7.3 Ämter-Dynamik

**US-590:** Als Spieler möchte ich, dass Ämter durch Skandale entzogen werden können, damit meine geheimen Aktionen riskant sind.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-481: Skandale

**Akzeptanzkriterien:**
- [ ] Aufgedeckte Skandale führen zu Amtsentzug
- [ ] Schwere des Skandals bestimmt Wahrscheinlichkeit
- [ ] Entzug ist öffentlich und beschämend
- [ ] Verlorene Ämter können später wiedererlangt werden

---

**US-591:** Als Spieler möchte ich, dass Ämter durch politische Umschwünge entzogen werden können, damit ich sie aktiv verteidigen muss.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-800: Event-System

**Akzeptanzkriterien:**
- [ ] Politische Änderungen können Ämter kosten
- [ ] Machtwechsel in Major Houses = Neuverteilung
- [ ] Spieler wird vorgewarnt (Politik-Events)
- [ ] Verteidigung durch Diplomatie möglich

---

**US-592:** Als Spieler möchte ich durch erfolgreiche Intrigen anderen Spielern Ämter entziehen können, damit politische Ränkespiele möglich sind.

**Abhängigkeiten:**
- US-550: Ämtersystem
- US-500: Spionagesystem
- US-300: Reputation

**Akzeptanzkriterien:**
- [ ] Intrigen-Mechanik zum Amtsentzug
- [ ] Erfordert Beweise oder Gerüchte-Streuen
- [ ] Risiko: Wenn entdeckt, selbst Reputationsverlust
- [ ] Erfolg entzieht Amt und beschädigt Ziel

---

**US-593:** Als Spieler möchte ich permanente Unsicherheit bei Ämtern haben, damit ich meine Positionen aktiv verteidige.

**Abhängigkeiten:**
- US-590-592: Ämter-Dynamik

**Akzeptanzkriterien:**
- [ ] Ämter sind nie 100% sicher
- [ ] Regelmäßige Überprüfung durch Major House
- [ ] Leistung muss kontinuierlich erbracht werden
- [ ] UI zeigt "Amtssicherheit" als Wert

---

## Epic 8: Diplomatie & Allianzen

**US-650:** Als Spieler möchte ich formelle Allianzen mit anderen Spielern oder NPCs bilden können, damit Kooperation möglich ist.

**Abhängigkeiten:**
- US-010: Spielstart
- US-300: Reputation (beeinflusst Allianzbereitschaft)

**Akzeptanzkriterien:**
- [ ] Allianz-Vorschläge können gemacht werden
- [ ] Allianzen haben definierte Bedingungen (Verteidigung, Handel, etc.)
- [ ] Beide Parteien müssen zustimmen
- [ ] UI zeigt aktive Allianzen

---

**US-651:** Als Spieler möchte ich Verträge mit spezifischen Bedingungen aushandeln, damit Diplomatie komplex ist.

**Abhängigkeiten:**
- US-650: Allianzen
- US-002: Dynamische Dialoge

**Akzeptanzkriterien:**
- [ ] Mindestens 5 verschiedene Vertragstypen
- [ ] Bedingungen sind verhandelbar
- [ ] Verträge haben Laufzeit oder sind permanent
- [ ] Vertragsbruch hat Konsequenzen

---

**US-652:** Als Spieler möchte ich diplomatische Beziehungen pflegen, die sich über Zeit entwickeln, damit Langzeitinvestitionen lohnen.

**Abhängigkeiten:**
- US-650: Diplomatie-System
- US-003: NPC-Gedächtnis

**Akzeptanzkriterien:**
- [ ] Beziehungen haben numerischen Wert (-100 bis +100)
- [ ] Aktionen beeinflussen Beziehungen
- [ ] Langfristig gute Beziehungen bringen Vorteile
- [ ] UI zeigt Beziehungsentwicklung über Zeit

---

**US-653:** Als Spieler möchte ich Bündnisse brechen können (mit erheblichen Konsequenzen), damit ich nicht dauerhaft gebunden bin.

**Abhängigkeiten:**
- US-650: Allianzen
- US-300: Reputation

**Akzeptanzkriterien:**
- [ ] Bündnisbruch ist jederzeit möglich
- [ ] Massive Reputationsverlust bei Bruch (-40 bis -60)
- [ ] Andere Spieler erfahren davon sofort
- [ ] Zukünftige Allianzen werden schwieriger

---

**US-654:** Als Spieler möchte ich, dass NPCs mir nach meinen Aktionen Allianzen anbieten, wenn sie davon profitieren, damit opportunistische Diplomatie entsteht.

**Abhängigkeiten:**
- US-650: Allianzen
- US-800: Event-Generierung

**Akzeptanzkriterien:**
- [ ] NPCs machen kontextuelle Allianz-Vorschläge
- [ ] Vorschläge basieren auf gemeinsamen Interessen
- [ ] KI erkennt strategische Situationen
- [ ] Spieler kann annehmen oder ablehnen

---

## Epic 9: Forschung & Technologie

**US-700:** Als Spieler möchte ich neue Technologien erforschen können, damit ich technologischen Fortschritt habe.

**Abhängigkeiten:**
- US-010: Spielstart
- US-100: Ressourcensystem (Forschung kostet Ressourcen)

**Akzeptanzkriterien:**
- [ ] Technologiebaum mit mindestens 20 Technologien
- [ ] Forschung kostet Ressourcen und Zeit
- [ ] Technologien haben Abhängigkeiten untereinander
- [ ] UI zeigt Technologiebaum übersichtlich

---

**US-701:** Als Spieler möchte ich durch Forschung konkrete Vorteile erhalten (bessere Schiffe, effizientere Produktion), damit Forschung lohnt.

**Abhängigkeiten:**
- US-700: Forschungssystem

**Akzeptanzkriterien:**
- [ ] Jede Technologie bringt messbaren Vorteil
- [ ] Vorteile sind in verschiedenen Bereichen (Militär, Wirtschaft, Diplomatie)
- [ ] Technologien schalten neue Gebäude/Einheiten frei
- [ ] UI zeigt Vorteile jeder Technologie klar

---

**US-702:** Als Spieler möchte ich technologischen Vorsprung als strategischen Vorteil nutzen, damit frühe Forschung belohnt wird.

**Abhängigkeiten:**
- US-701: Technologievorteile
- US-326: Einfluss durch Technologie

**Akzeptanzkriterien:**
- [ ] Exklusive Technologien geben Monopolvorteil
- [ ] Technologieführerschaft erhöht Einfluss
- [ ] Andere können Technologie spionieren (langsamer als eigene Forschung)
- [ ] Technologieverkauf ist möglich

---

**US-703:** Als Spieler möchte ich, dass Forschung meine strategischen Optionen erweitert, damit verschiedene Tech-Pfade möglich sind.

**Abhängigkeiten:**
- US-700: Forschungssystem

**Akzeptanzkriterien:**
- [ ] Mindestens 3 verschiedene Forschungspfade (Militär, Wirtschaft, Spionage)
- [ ] Spezialisierung ist möglich aber nicht verpflichtend
- [ ] Verschiedene Pfade ermöglichen verschiedene Spielstile
- [ ] Tech-Entscheidungen haben langfristige Konsequenzen

---

## Epic 10: Emergente Narration & Events

### 10.1 Event-Generierung

**US-800:** Als Spieler möchte ich, dass die KI kontextabhängige Events statt vorgefertigter Quests generiert, damit jede Partie einzigartig ist.

**Abhängigkeiten:**
- US-001: KI-System
- ALLE anderen Systeme (Events nutzen alle Mechaniken)

**Akzeptanzkriterien:**
- [ ] Events werden dynamisch basierend auf Spielzustand generiert
- [ ] Keine vorgefertigten Quest-Ketten
- [ ] Events sind einzigartig und kontextabhängig
- [ ] Mindestens 2-3 Events pro Partie

---

**US-801:** Als Spieler möchte ich, dass die KI auf meine Sabotage-Aktionen mit logischen Konsequenzen reagiert (z.B. andere Häuser nutzen die Schwäche), damit meine Taten die Welt formen.

**Abhängigkeiten:**
- US-800: Event-Generierung
- US-463: Geheime Aktionen (Sabotage)

**Akzeptanzkriterien:**
- [ ] Sabotage-Aktionen triggern KI-Reaktionen
- [ ] Reaktionen sind logisch und kontextgerecht
- [ ] Andere NPCs profitieren von geschaffenen Schwächen
- [ ] Unbeabsichtigte Konsequenzen sind möglich

---

**US-802:** Als Spieler möchte ich, dass das Nachrichtensystem die tatsächliche Spielsituation widerspiegelt, damit die Welt kohärent ist.

**Abhängigkeiten:**
- US-800: Event-System
- ALLE Systeme (Nachrichten reflektieren alle Aktionen)

**Akzeptanzkriterien:**
- [ ] Nachrichten-Feed zeigt relevante Ereignisse
- [ ] Nachrichten sind KI-generiert, nicht vorgefertigt
- [ ] Bezug zu tatsächlichen Spielereignissen
- [ ] Mindestens 5 Nachrichten pro Runde

---

**US-803:** Als Spieler möchte ich, dass NPCs meine aggressive Expansion mit Sorge oder Bewunderung kommentieren, damit meine Macht wahrgenommen wird.

**Abhängigkeiten:**
- US-802: Nachrichtensystem
- US-023: Territoriale Expansion
- US-002: Dynamische Dialoge

**Akzeptanzkriterien:**
- [ ] Schnelle Expansion triggert NPC-Kommentare
- [ ] Reaktionen hängen von NPC-Persönlichkeit ab
- [ ] Schwache NPCs zeigen Sorge, Starke Bewunderung oder Rivalität
- [ ] Kommentare erscheinen in Dialogen und News

---

**US-804:** Als Spieler möchte ich, dass sich Gerüchte über aufgedeckte Allianzen verbreiten, damit Information dynamisch ist.

**Abhängigkeiten:**
- US-802: Nachrichtensystem
- US-461: Halböffentliche Aktionen
- US-650: Allianzen

**Akzeptanzkriterien:**
- [ ] Allianzen werden zu Gerüchten
- [ ] Gerüchte verbreiten sich über mehrere Runden
- [ ] Details werden verzerrt (Stille-Post-Effekt)
- [ ] Spieler kann Gerüchte bestätigen/dementieren

---

**US-805:** Als Spieler möchte ich, dass sich die Welt lebendig anfühlt, weil sie auf meine Taten reagiert, damit Immersion entsteht.

**Abhängigkeiten:**
- US-800-804: Alle Event-/Nachrichtensysteme
- ALLE Systeme

**Akzeptanzkriterien:**
- [ ] Mindestens 80% der Spieleraktionen haben sichtbare Reaktion
- [ ] Welt fühlt sich reaktiv, nicht statisch an
- [ ] NPCs erinnern sich und reagieren konsistent
- [ ] Langfristige Konsequenzen sind spürbar

---

## Design-Prinzipien (nicht User Stories)

Die folgenden Design-Prinzipien aus v1 (US-210-221) wurden in separates Dokument "Design Goals" verschoben, da sie keine implementierbaren User Stories sind, sondern qualitative Ziele für das Gesamtspiel.

---

## Zusammenfassung

**Gesamt:** 134 User Stories über 10 Epics

### Epic-Übersicht:
- **Epic 0:** Kern-Infrastruktur (35 Stories: US-001 bis US-103)
- **Epic 1:** Charaktererstellung (3 Stories: US-150 bis US-152)
- **Epic 2:** Handelssystem (45 Stories: US-200 bis US-244)
- **Epic 3:** Reputation & Einfluss (23 Stories: US-300 bis US-342)
- **Epic 4:** Informationssystem (7 Stories: US-460 bis US-482)
- **Epic 5:** Spionagesystem (16 Stories: US-500 bis US-561)
- **Epic 6:** Aufstiegssystem (7 Stories: US-600 bis US-622)
- **Epic 7:** Ämtersystem (18 Stories: US-550 bis US-593)
- **Epic 8:** Diplomatie & Allianzen (5 Stories: US-650 bis US-654)
- **Epic 9:** Forschung & Technologie (4 Stories: US-700 bis US-703)
- **Epic 10:** Emergente Narration (6 Stories: US-800 bis US-805)

### Änderungen gegenüber v1:
- ✅ Neue Epic 0 mit fundamentalen Systemen
- ✅ NPC-System an den Anfang verschoben
- ✅ Dependencies zu jeder Story hinzugefügt
- ✅ Akzeptanzkriterien ergänzt
- ✅ Fehlende Systeme hinzugefügt (Territorien, Militär, Ressourcen, Forschung, Diplomatie)
- ✅ Epics logisch neu geordnet
- ✅ US-210-221 als Design Goals ausgelagert
- ✅ Neue Nummerierung nach logischer Abhängigkeit
