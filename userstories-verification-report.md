# Verifizierungsbericht: User Stories für Sternenhaus

**Datum:** 2025-11-16
**Analysierte Datei:** userstories v1.md
**Anzahl Stories:** 101 über 9 Epics

## Executive Summary

Die User Stories sind inhaltlich gut ausgearbeitet und bieten jeweils klaren Mehrwert. Es gibt jedoch **kritische strukturelle Probleme**:

1. **Keine dokumentierten Abhängigkeiten** zwischen Stories
2. **Falsche Reihenfolge** der Epics
3. **Fehlende fundamentale User Stories** für referenzierte Systeme
4. **Vermischung** von User Stories mit Designzielen

## Detaillierte Analyse

### ✅ Positive Aspekte

- **Klarer Mehrwert**: Jede Story bietet erkennbaren Spielerwert
- **Gute Formulierung**: "Als [Rolle] möchte ich [Funktion], damit [Nutzen]"
- **Gute thematische Gruppierung** in Epics
- **Umfassende Abdeckung** verschiedener Spielaspekte

---

## ❌ Kritische Probleme

### Problem 1: Fehlende Dependencies-Dokumentation

**Betroffene Stories:** Praktisch alle außer den grundlegendsten

#### Epic 1: Spielgrundlagen
- **US-002** (Hintergrundgeschichte) → benötigt US-001 (Spielstart)
- **US-003** (Hintergrundgeschichte beeinflusst Start) → benötigt US-002
- **US-004** (NPCs reagieren auf Hintergrundgeschichte) → benötigt US-002, US-003, **US-190-194** (NPC-Persönlichkeiten)

#### Epic 2: Reputation & Einfluss
- **US-011 bis US-014** → benötigen US-010 (Reputationssystem)
- **US-021** (Einfluss durch Handel) → benötigt **US-150-163** (Handelssystem)
- **US-022** (Einfluss durch Territorien) → benötigt **FEHLENDES Territorialsystem**
- **US-023** (Einfluss durch Militär) → benötigt **FEHLENDES Militärsystem**
- **US-024** (Einfluss durch Ämter) → benötigt **US-060-083** (Ämtersystem)
- **US-025** (Einfluss durch Spionage) → benötigt **US-110-141** (Spionagesystem)
- **US-026** (Einfluss durch Technologie) → benötigt **FEHLENDES Forschungssystem**
- **US-027, US-028** → benötigen US-020-026
- **US-030-032** (Balance) → benötigen US-010 und US-020

#### Epic 3: Aufstiegssystem
- **US-040** (neue Handlungsoptionen) → benötigt US-020 (Einfluss)
- **US-041** (Aufstieg durch Stationen) → benötigt **FEHLENDES Territorialsystem**
- **US-042** (Aufstieg durch Handelsvolumen) → benötigt **US-150-163** (Handelssystem)
- **US-043** (Aufstieg durch Reputation) → benötigt US-010
- **US-050** (territoriale Präsenz) → benötigt US-041, **FEHLENDES Territorialsystem**
- **US-051** (Vasallen/Ämter) → benötigt **US-060-083** (Ämtersystem)
- **US-052** (Reputation bei Großmächten) → benötigt US-010, US-050

#### Epic 4: Ämtersystem
- **US-060-065** (Ämter-Vergabe) → benötigen **US-050-052** (Major Houses müssen existieren)
- **US-061-063** → benötigen US-010 (Reputation)
- **US-070-071** (Handelslizenz) → benötigen US-060, **US-150-163** (Handelssystem)
- **US-072-073** (Flottenkommandant) → benötigen US-060, **FEHLENDES Militärsystem**
- **US-074-075** (Ressourcen-Monopol) → benötigen US-060, **FEHLENDES Ressourcensystem**, **US-160-163** (Marktdynamik)
- **US-076** (Geheimdienstchef) → benötigt US-060, **US-110-141** (Spionagesystem)
- **US-080-083** (Ämter-Dynamik) → benötigen US-060-076, US-100-102 (Skandalaufdeckung)

#### Epic 5: Informationssystem
- **US-090** (öffentliche Handelsgeschäfte) → benötigt **US-150-155** (Handelssystem)
- **US-091-092** (halböffentliche Deals) → benötigen **US-190-194** (NPC-System mit Gedächtnis)
- **US-093** (geheime Aktionen) → benötigt **US-110-141** (Spionagesystem)
- **US-100-102** (Aufdeckung & Konsequenzen) → benötigen US-090-093, US-010 (Reputation)

#### Epic 6: Spionagesystem
- **US-110-113** (Rekrutierung) → relativ unabhängig, aber benötigen **US-190** (KI-Persönlichkeiten)
- **US-120-125** (Loyalität) → benötigen US-110-113, US-010 (Reputation)
- **US-130-133** (Interaktionen) → benötigen US-110-125, **US-190-191** (KI-Dialoge)
- **US-140-141** (Hausloyalität) → benötigen US-110-125, **US-050-052** (Häuser-System)

#### Epic 7: Handelssystem
- **US-150-155** (Verhandlungen) → benötigen **US-190-192** (NPC-Persönlichkeiten mit Gedächtnis)
- **US-160-163** (Marktdynamik) → benötigen US-150-155
- **US-170-174** (Marktmanipulation) → benötigen US-150-163, US-020 (Einfluss für US-027)

#### Epic 8: Emergente Narration
- **US-180-182** (Event-Generierung) → benötigen ALLE anderen Systeme
- **US-190-194** (NPC-Persönlichkeiten) → **FUNDAMENTAL, benötigt von fast allen anderen Stories!**
- **US-200-203** (Nachrichtensystem) → benötigen ALLE anderen Systeme

#### Epic 9: Langzeitstrategie
- **US-210-221** → **KEINE User Stories**, sondern Designziele

---

### Problem 2: Falsche Epic-Reihenfolge

**Kritisch:** Epic 8 (speziell US-190-194) muss **an den Anfang**!

**Empfohlene neue Reihenfolge:**

1. **Epic 0: Kern-Infrastruktur** (NEU)
   - US-190-194: NPC-Persönlichkeiten & Dialoge
   - US-001: Spielstart
   - NEU: Territorialsystem
   - NEU: Grundlegendes Militärsystem
   - NEU: Grundlegendes Ressourcensystem

2. **Epic 1: Charaktererstellung**
   - US-002-004: Hintergrundgeschichte

3. **Epic 2: Handelssystem** (war Epic 7)
   - US-150-174

4. **Epic 3: Reputation & Einfluss** (war Epic 2)
   - US-010-032

5. **Epic 4: Informationssystem** (war Epic 5)
   - US-090-102

6. **Epic 5: Spionagesystem** (war Epic 6)
   - US-110-141

7. **Epic 6: Aufstiegssystem** (war Epic 3)
   - US-040-052

8. **Epic 7: Ämtersystem** (war Epic 4)
   - US-060-083

9. **Epic 8: Emergente Narration**
   - US-180-182, US-200-203

10. **Epic 9: Fortgeschrittene Features**
    - NEU: Forschungssystem
    - Weitere fortgeschrittene Mechaniken

**Designziele** (US-210-221) → in separates Dokument verschieben

---

### Problem 3: Fehlende fundamentale User Stories

Die folgenden Systeme werden referenziert, haben aber keine User Stories:

#### 3.1 Territorialsystem (KRITISCH)
Benötigt von: US-022, US-041, US-050

**Fehlende Stories:**
- Als Spieler möchte ich Stationen kontrollieren können
- Als Spieler möchte ich Sektoren verwalten können
- Als Spieler möchte ich territoriale Grenzen sehen
- Als Spieler möchte ich Territorien erweitern/verlieren können

#### 3.2 Militär-/Flottensystem (KRITISCH)
Benötigt von: US-023, US-072-073

**Fehlende Stories:**
- Als Spieler möchte ich Schiffe bauen/kaufen können
- Als Spieler möchte ich Flotten kommandieren können
- Als Spieler möchte ich Handelsrouten sichern können
- Als Spieler möchte ich militärische Konflikte führen können

#### 3.3 Ressourcensystem
Benötigt von: US-074-075, Handelssystem

**Fehlende Stories:**
- Als Spieler möchte ich verschiedene Ressourcentypen haben
- Als Spieler möchte ich Ressourcenvorkommen finden können
- Als Spieler möchte ich Ressourcen abbauen/ernten können
- Als Spieler möchte ich Ressourcenknappheit erleben

#### 3.4 Forschungs-/Technologiesystem
Benötigt von: US-026, US-162

**Fehlende Stories:**
- Als Spieler möchte ich Technologien erforschen können
- Als Spieler möchte ich durch Forschung Vorteile erhalten
- Als Spieler möchte ich technologischen Vorsprung nutzen können
- Als Spieler möchte ich, dass Forschung meine Optionen erweitert

#### 3.5 Allianz-/Diplomatie-System
Benötigt von: US-091, US-172, US-182

**Fehlende Stories:**
- Als Spieler möchte ich Allianzen bilden können
- Als Spieler möchte ich Verträge aushandeln können
- Als Spieler möchte ich diplomatische Beziehungen pflegen
- Als Spieler möchte ich Bündnisse brechen können (mit Konsequenzen)

---

### Problem 4: Keine echten User Stories (US-210-221)

**US-210 bis US-221** sind **Designziele**, keine User Stories.

**Probleme:**
- Zu abstrakt ("schwierigen Entscheidungen", "Macht in all ihren Facetten")
- Keine konkreten Akzeptanzkriterien
- Nicht direkt implementierbar
- Eher Qualitätsziele für das Gesamtprodukt

**Empfehlung:** In separates "Design Goals"-Dokument verschieben oder in konkrete User Stories aufbrechen.

---

## 📋 Empfohlene Struktur mit Dependencies

### Template für User Story mit Dependencies:

```markdown
**US-XXX:** Als [Rolle] möchte ich [Funktion], damit [Nutzen].

**Abhängigkeiten:**
- US-YYY: [Beschreibung warum]
- System Z: [welches System wird benötigt]

**Akzeptanzkriterien:**
- [ ] Kriterium 1
- [ ] Kriterium 2
```

### Beispiel (US-021 korrigiert):

```markdown
**US-021:** Als Spieler möchte ich Einfluss durch wirtschaftliche Dominanz gewinnen, damit erfolgreicher Handel belohnt wird.

**Abhängigkeiten:**
- US-020: Einflusssystem muss existieren
- US-150-163: Handelssystem muss funktionieren
- US-160-163: Marktdynamik muss messbar sein

**Akzeptanzkriterien:**
- [ ] Handelsvolumen erhöht Einflusswert
- [ ] Marktanteile werden berechnet
- [ ] Einfluss wächst proportional zu wirtschaftlicher Dominanz
- [ ] UI zeigt Einflussquellen an
```

---

## 🔧 Konkrete Handlungsempfehlungen

### Sofortmaßnahmen (Kritisch):

1. **Neue Epic 0 erstellen** mit fundamentalen Systemen:
   ```
   Epic 0: Kern-Infrastruktur
   - NPC-Persönlichkeiten (US-190-194 verschieben)
   - Territorialsystem (NEU)
   - Basis-Militärsystem (NEU)
   - Basis-Ressourcensystem (NEU)
   ```

2. **Dependencies zu JEDER Story hinzufügen** im Format:
   ```markdown
   **Abhängigkeiten:**
   - US-XXX: [Grund]
   - System Y: [Grund]
   ```

3. **Epics neu ordnen** (siehe empfohlene Reihenfolge oben)

4. **US-210-221 entfernen** und in "Design Goals"-Dokument verschieben

### Mittelfristig:

5. **Fehlende User Stories ergänzen** für:
   - Territorialsystem (min. 5-8 Stories)
   - Militärsystem (min. 8-10 Stories)
   - Ressourcensystem (min. 5-7 Stories)
   - Forschungssystem (min. 6-8 Stories)
   - Allianz/Diplomatie-System (min. 5-7 Stories)

6. **Akzeptanzkriterien** zu jeder Story hinzufügen

7. **Story Points** schätzen für Implementierungsaufwand

8. **Story-IDs neu vergeben** nach neuer Reihenfolge

---

## 📊 Dependency-Graph (Beispiel)

```
Epic 0 (Infrastruktur)
├── US-190-194 (NPC-System)
│   ├── benötigt von: US-004, US-092, US-130-133, US-150-155, US-180-182
├── US-001 (Spielstart)
│   ├── benötigt von: US-002
├── Territorialsystem (NEU)
│   ├── benötigt von: US-022, US-041, US-050
└── Militärsystem (NEU)
    ├── benötigt von: US-023, US-072-073

Epic 1 (Charaktererstellung)
├── US-002 (Hintergrundgeschichte)
│   ├── benötigt: US-001, US-190
│   ├── benötigt von: US-003, US-004
├── US-003 (Hintergrundgeschichte → Startbedingungen)
│   ├── benötigt: US-002
│   ├── benötigt von: US-004
└── US-004 (NPCs reagieren)
    ├── benötigt: US-002, US-003, US-190-194

Epic 2 (Handelssystem)
├── US-150-155 (Verhandlungen)
│   ├── benötigt: US-190-192
│   ├── benötigt von: US-021, US-042, US-090, US-160-163
...
```

---

## ✅ Zusammenfassung

| Kategorie | Status |
|-----------|--------|
| **Mehrwert pro Story** | ✅ Gut |
| **Implementierbarkeit** | ⚠️ Teilweise (fehlende Systeme) |
| **Dependencies dokumentiert** | ❌ Keine vorhanden |
| **Epic-Reihenfolge** | ❌ Falsch |
| **Vollständigkeit** | ❌ Fehlende fundamentale Stories |

**Fazit:** Die Stories sind inhaltlich gut, aber die **Struktur muss komplett überarbeitet werden**, bevor mit der Implementierung begonnen werden kann.

---

## 📝 Nächste Schritte

1. ✅ Diesen Bericht reviewen
2. ⬜ Entscheidung treffen: Komplett-Überarbeitung vs. inkrementelle Verbesserung
3. ⬜ Epic 0 mit fundamentalen Systemen erstellen
4. ⬜ Fehlende User Stories für Territorien, Militär, Ressourcen, Forschung schreiben
5. ⬜ Dependencies zu allen Stories hinzufügen
6. ⬜ Epics neu ordnen
7. ⬜ US-210-221 in Design Goals-Dokument verschieben
8. ⬜ Akzeptanzkriterien ergänzen
9. ⬜ Story Points schätzen
10. ⬜ Version 2 der User Stories erstellen
