# Sprint 3 - Resource & Economy Foundation

**Status:** Geplant
**Zeitraum:** 2025-12-16 - 2025-12-29
**Phase:** 1.1 (Resource & Economy Foundation)

---

## 🎯 Quick Info

- **Sprint Goal:** Spielbares Wirtschafts-Fundament mit Territorium und Ressourcenproduktion
- **Anzahl Stories:** 4 User Stories
- **Aufwand:** 7 Tage (bei 14-Tage-Sprint = 50% Buffer)

---

## 📁 Dokumente

- **[sprint-plan.md](./sprint-plan.md)** - Vollständiger Sprint-Plan
- **[story-details.md](./story-details.md)** - Detaillierte Story-Beschreibungen mit Akzeptanzkriterien

---

## 📝 Stories

### User Stories (in logischer Reihenfolge)

- [ ] **US-020:** Basis-Stationskontrolle
- [ ] **US-100:** Basis-Ressourcensystem
- [ ] **US-101:** Ressourcenvorkommen (vereinfacht)
- [ ] **US-102:** Basis-Ressourcenproduktion

---

## 🎯 Sprint Ziele

Nach diesem Sprint können Spieler:
- ✅ Stationen auf einer Karte sehen und kontrollieren
- ✅ Stationen kaufen (friedliche Übernahme)
- ✅ 5 verschiedene Ressourcentypen sammeln
- ✅ Automatische Produktion pro Runde erhalten
- ✅ Wirtschaftliche Entscheidungen treffen (welche Station kaufen?)

---

## 📊 Progress

**Gesamt:** 0/4 Stories abgeschlossen (0%)

### Story Status:
- ⏳ US-020: Basis-Stationskontrolle - **Geplant**
- ⏳ US-100: Basis-Ressourcensystem - **Geplant**
- ⏳ US-101: Ressourcenvorkommen - **Geplant**
- ⏳ US-102: Basis-Ressourcenproduktion - **Geplant**

---

## 🔗 Dependencies

### Erfüllte Abhängigkeiten:
- ✅ Sprint 1: Web-App Infrastructure, Database, Auth
- ✅ Sprint 2: Turn Management System (E-004)
- ✅ Sprint 2: AI Integration (E-005)
- ✅ Sprint 2: UI Components (E-006)

### Story-Dependencies:
- US-020 & US-100: Keine Dependencies → **Können parallel entwickelt werden** ✅
- US-101: Benötigt US-020 + US-100
- US-102: Benötigt US-101

---

## 🚀 Nächste Schritte

### Vor Sprint-Start:
1. Branch erstellen: `claude/sprint-3-implementation`
2. Game-Seeding-Script für 8 Stationen vorbereiten
3. Ressourcen-Konfiguration definieren

### Während Sprint:
- **Woche 1:** US-020 + US-100 parallel entwickeln
- **Woche 2:** US-101 → US-102 → Integration Testing

### Nach Sprint-Ende:
- Pull Request erstellen
- Sprint Review (2025-12-30)
- Sprint 4 planen (Reputation + NPCs)

---

## 📚 Referenzen

- [Backlog (Phase 1.1)](../../backlog-prioritized.md#sprint-11-resource--economy-foundation)
- [User Stories (Detail)](../../user-stories.md)
- [Firebase Tech-Stack](../../architecture/firebase-techstack.md)
- [Sprint 2 (Vorheriger)](../sprint-2/sprint-plan.md)

---

**Erstellt:** 2025-11-17
**Letzte Aktualisierung:** 2025-11-17
