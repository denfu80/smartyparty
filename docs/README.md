# Sternenhaus/SmartyParty - Dokumentation

**Projekt:** Sternenhaus (SmartyParty)
**Letzte Aktualisierung:** 2025-11-18

---

## 📋 Dokumenten-Index

### ✅ AKTIVE Dokumente (verwende diese!)

| Dokument | Zweck | Zielgruppe |
|----------|-------|------------|
| **[product-backlog.md](./product-backlog.md)** | 🎯 **EINZIGES gültiges Backlog** | Team, PO, Sprints |
| **[product-planning-principles.md](./product-planning-principles.md)** | Planungsprinzipien (Vertical Slices) | Team, neue Mitglieder |
| **[design-goals.md](./design-goals.md)** | Qualitätsziele & Leitlinien | Team, Design-Entscheidungen |
| **[sprints/sprint-3/SPRINT-SUMMARY.md](./sprints/sprint-3/SPRINT-SUMMARY.md)** | Aktueller Sprint-Status | Team |

---

### 📚 ARCHIV-Dokumente (Referenz, nicht mehr aktiv)

Diese Dokumente sind **historische Referenz**, aber nicht mehr die aktive Planungsgrundlage:

| Dokument | Status | Hinweis |
|----------|--------|---------|
| [user-stories.md](./user-stories.md) | 📚 ARCHIV | 134 Stories detailliert, Quelle für product-backlog.md |
| [backlog-prioritized.md](./backlog-prioritized.md) | 📚 ARCHIV | Alte Phasen-Struktur (Phase 0-8), ersetzt durch product-backlog.md |
| [backlog-analysis-summary.md](./backlog-analysis-summary.md) | 📚 ARCHIV | Alte Analyse, siehe stattdessen roadmap-analysis.md |
| [product-roadmap-vertical-slices.md](./product-roadmap-vertical-slices.md) | 📚 ARCHIV | Detaillierte Analyse VS-001-020, konsolidiert in product-backlog.md |
| [roadmap-analysis.md](./roadmap-analysis.md) | 📚 ARCHIV | Historische Analyse, Begründung für Umstellung |
| [ROADMAP-REORGANIZATION-SUMMARY.md](./ROADMAP-REORGANIZATION-SUMMARY.md) | 📚 ARCHIV | Executive Summary der Umstellung |

**Warum archiviert?**
Am 2025-11-18 wurden alle Backlogs konsolidiert in **product-backlog.md**. Die alten Dokumente bleiben als Referenz, sind aber nicht mehr die aktive Planungsquelle.

---

## 🚀 Quick Start für neue Team-Mitglieder

### 1. Verstehe die Prinzipien
👉 Lies: **[product-planning-principles.md](./product-planning-principles.md)**

**Kernprinzipien:**
- Jede Story = Vertical Slice (End-to-End)
- Keine Enabler ohne Not
- Jede Story = erlebbarer Value
- Temporäre Lösungen sind OK

### 2. Verstehe das aktuelle Backlog
👉 Lies: **[product-backlog.md](./product-backlog.md)**

**Was findest du dort:**
- Top 20 Prioritäten (nächste 6-8 Wochen)
- ~120 weitere Stories im Backlog
- Priorisierung nach Value × Effort × Dependencies × Risk
- Sprint-Empfehlungen

### 3. Verstehe den aktuellen Stand
👉 Lies: **[sprints/sprint-3/SPRINT-SUMMARY.md](./sprints/sprint-3/SPRINT-SUMMARY.md)**

**Was ist bereits implementiert:**
- Sprint 1: Technical Foundation (Auth, Database)
- Sprint 2: Game Engine (Turn Management, AI)
- Sprint 3: Resources & Territory (Ressourcen, Stationen, Karte)

### 4. Verstehe die Qualitätsziele
👉 Lies: **[design-goals.md](./design-goals.md)**

**10 Design Goals:**
- Bedeutsame Entscheidungen
- Belohnung für langfristiges Denken
- Mechanische Relevanz sozialer Kompetenz
- Vielschichtige Macht-Dimensionen
- Lebendige, reaktive Welt
- etc.

---

## 📂 Dokumenten-Struktur

```
docs/
├── README.md                               ← Du bist hier
├── product-backlog.md                      ← ⭐ AKTIVES Backlog
├── product-planning-principles.md          ← ⭐ Planungsprinzipien
├── design-goals.md                         ← ⭐ Qualitätsziele
│
├── architecture/
│   ├── README.md                           ← Architektur-Übersicht
│   └── firebase-techstack.md               ← Firebase Tech-Stack
│
├── sprints/
│   ├── README.md                           ← Sprint-Übersicht
│   ├── sprint-1/
│   │   ├── sprint-plan.md                  ← Sprint 1 Plan
│   │   ├── story-details.md                ← Story-Details
│   │   └── SPRINT-SUMMARY.md               ← Abschluss-Summary
│   ├── sprint-2/
│   │   └── ... (ähnlich)
│   └── sprint-3/
│       └── SPRINT-SUMMARY.md               ← ⭐ Aktueller Stand
│
├── ARCHIV/
│   ├── user-stories.md                     ← 134 Stories (Referenz)
│   ├── backlog-prioritized.md              ← Alte Phasen-Struktur
│   ├── backlog-analysis-summary.md         ← Alte Analyse
│   ├── product-roadmap-vertical-slices.md  ← Detaillierte VS-Analyse
│   ├── roadmap-analysis.md                 ← Historische Analyse
│   └── ROADMAP-REORGANIZATION-SUMMARY.md   ← Executive Summary Umstellung
│
├── DEVELOPMENT.md                          ← Dev-Setup & Workflows
├── CI-CD-SETUP.md                          ← CI/CD Konfiguration
└── style-guide.md                          ← Code & UI Style Guide
```

---

## 🎯 Häufige Fragen

### "Welches Backlog soll ich verwenden?"
👉 **Nur [product-backlog.md](./product-backlog.md)**

### "Wo finde ich Details zu einer Story?"
👉 **product-backlog.md** (Top 20 sind detailliert)
👉 **user-stories.md** (ARCHIV, für tiefe Details zu US-001 bis US-805)

### "Was ist der Unterschied zwischen US-XXX und #XXX?"
- **US-XXX:** Original User Story aus user-stories.md (134 Stories)
- **#XXX:** Priorisierte Story in product-backlog.md (140 Stories)
- Viele Stories sind 1:1 übernommen, manche sind umgeschnitten oder kombiniert

### "Warum gibt es so viele Backlog-Dokumente?"
Am 2025-11-18 wurden alle Backlogs konsolidiert. Die alten Dokumente bleiben als Referenz, aber **product-backlog.md** ist die einzige aktive Quelle.

### "Was bedeutet 'Vertical Slice'?"
Eine Story ist ein **Vertical Slice** wenn sie:
- End-to-End implementiert ist (UI + Backend + Datenbank)
- Für sich allein erlebbaren Value bringt
- Sofort getestet werden kann

Details: **[product-planning-principles.md](./product-planning-principles.md)**

### "Wie priorisieren wir Stories?"
Formel: `Priority Score = (Value × 2) - (Effort / 10) - Dependencies - Risk`

Details in: **[product-backlog.md](./product-backlog.md)**

---

## 🔄 Workflow

### Sprint-Planung
1. Öffne **product-backlog.md**
2. Wähle Stories aus Top 20 (basierend auf Velocity)
3. Detailliere Stories falls nötig
4. Erstelle Sprint-Plan in `sprints/sprint-X/sprint-plan.md`

### Story-Entwicklung
1. Story aus product-backlog.md
2. Prüfe Dependencies (sind alle ✅?)
3. Implementiere als Vertical Slice (UI + Backend + DB)
4. Test & Review
5. Deploy
6. Story → ✅ Done in Backlog

### Sprint-Review
1. Demo der Stories
2. User Feedback sammeln
3. Velocity messen (Effort vs. Schätzung)
4. product-backlog.md neu priorisieren
5. SPRINT-SUMMARY.md erstellen

---

## 📊 Metriken & Tracking

### Story-Status
- ✅ **Done:** ~30 (Sprint 1-3)
- 🚧 **In Progress:** 0
- 📋 **Ready:** 10 (Top 20, detailliert)
- 💡 **Backlog:** 120+ (grob skizziert)

### Velocity
- **Target:** 10-15h Development/Woche
- **Stories/Sprint:** ~2-4 (basierend auf Effort)
- **Wird gemessen ab:** Sprint 4

---

## 🤝 Beitragen

### Neue Story vorschlagen
1. Öffne Issue in GitHub (oder schreibe in Team-Chat)
2. Beschreibe: Als [Rolle] möchte ich [Ziel] damit [Nutzen]
3. Product Owner priorisiert in product-backlog.md

### Story detaillieren
1. Wähle Story aus Backlog (💡 Status)
2. Schreibe Akzeptanzkriterien
3. Identifiziere Dependencies
4. Schätze Effort (Stunden)
5. Status → 📋 Ready

### Dokumentation aktualisieren
- Immer wenn Stories abgeschlossen sind
- Nach jedem Sprint (SPRINT-SUMMARY.md)
- Monatlich: Backlog-Review

---

## 📞 Kontakt & Support

**Team-Kommunikation:** [GitHub Issues](https://github.com/denfu80/smartyparty/issues)
**Product Owner:** [Team]
**Entwickler:** [Team]

---

**Letzte Aktualisierung:** 2025-11-18
**Version:** 3.0 (Nach Backlog-Konsolidierung)
