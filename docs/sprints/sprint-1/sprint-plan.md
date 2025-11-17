# Sprint 1 - Technical Foundation

**Sprint-Zeitraum:** 2025-11-17 - 2025-12-01
**Status:** In Abschluss (alle Stories implementiert)
**Dauer:** 2 Wochen

---

## 🎯 Sprint Goal

**"Lauffähiges Firebase-Projekt mit Web-App, Google-Login und Datenbank, sodass Entwickler Features entwickeln können und Deployment automatisiert ist"**

### Messbare Erfolgskriterien:
- ✅ Entwickler kann sich mit Google-Account einloggen
- ✅ Next.js App läuft auf Firebase Hosting
- ✅ Firestore speichert User-Daten persistent
- ✅ CI/CD-Pipeline deployt automatisch bei Push zu main
- ✅ Basis-UI ist vorhanden und navigierbar

---

## 📝 Stories

### Enabler (Technische Voraussetzungen)

#### 1. ✅ E-001: Web-Application Infrastructure Setup
- **Status**: ERLEDIGT
- **Priorität**: MUST-HAVE
- **Aufwand**: 2-3 Tage
- **Dependencies**: Keine
- **Akzeptanzkriterien**: [siehe story-details.md](./story-details.md#e-001-web-application-infrastructure-setup)

#### 2. ✅ E-002: Database & Persistence Layer
- **Status**: ERLEDIGT
- **Priorität**: MUST-HAVE
- **Aufwand**: 2-3 Tage
- **Dependencies**: E-001
- **Akzeptanzkriterien**: [siehe story-details.md](./story-details.md#e-002-database--persistence-layer)

#### 3. ✅ E-003: Authentication & User Management
- **Status**: ERLEDIGT
- **Priorität**: MUST-HAVE
- **Aufwand**: 2 Tage
- **Dependencies**: E-001, E-002
- **Akzeptanzkriterien**: [siehe story-details.md](./story-details.md#e-003-authentication--user-management)

#### 4. ✅ CI/CD Pipeline (GitHub Actions)
- **Status**: ERLEDIGT
- **Priorität**: SHOULD-HAVE
- **Aufwand**: 0.5 Tage
- **Dependencies**: E-001
- **Akzeptanzkriterien**: [siehe story-details.md](./story-details.md#cicd-pipeline-github-actions)

---

## ✅ Definition of Done (Sprint-Level)

Ein Sprint ist abgeschlossen wenn:
- [ ] Alle Story-Akzeptanzkriterien erfüllt
- [ ] Code reviewed (mindestens ein Review bei Multi-Person-Team)
- [ ] App läuft erfolgreich auf Firebase Hosting (deployed)
- [ ] Security Rules sind aktiv und getestet
- [ ] Kein kritischer Bug vorhanden
- [ ] Dokumentation aktualisiert (README.md mit Setup-Anleitung)
- [ ] **Pull Request erstellt und gemerged**

---

## ⚠️ Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|---------|------------|
| Firebase-Setup komplex | Mittel | Hoch | Firebase-Docs nutzen, firebase-techstack.md als Referenz |
| Google Sign-In OAuth-Konfiguration | Niedrig | Mittel | Firebase Console hat Guided Setup |
| Firestore Security Rules fehlerhaft | Mittel | Hoch | Rules aus firebase-techstack.md übernehmen, testen |
| Next.js 14 App Router unbekannt | Niedrig | Mittel | Next.js Docs, etablierte Patterns nutzen |
| CI/CD-Pipeline schlägt fehl | Niedrig | Niedrig | Erst am Ende des Sprints einrichten |

---

## 🔗 Abhängigkeiten

### Externe:
- Firebase-Account (Google Cloud)
- GitHub Repository
- Google Cloud Console (für OAuth-Credentials)

### Intern:
- Keine (erster Sprint)

---

## 📊 Velocity

- **Stories**: 3 Enabler + 1 CI/CD
- **Story Points**: - (erster Sprint, noch keine Velocity)
- **Geschätzter Aufwand**: 6.5-8.5 Tage
- **Sprint-Länge**: 14 Tage → **~50% Buffer** für Unvorhergesehenes

---

## 🔀 Pull Request Requirements

**Am Ende des Sprints:**
- [ ] PR von `claude/plan-sprint-0143ZoYvWn5j4323Kjc122ut` → `main` erstellen
- [ ] PR-Titel: **"Sprint 1: Web-Application Infrastructure, Database & Auth"**
- [ ] PR-Beschreibung enthält:
  - Sprint Goal
  - Umgesetzte Stories (E-001, E-002, E-003, CI/CD)
  - Test-Plan (manuelle Tests dokumentiert)
  - Screenshots der deployed App
  - Link zur deployed Firebase Hosting URL

**PR-Template:**
```markdown
## Sprint 1 - Technical Foundation

### Sprint Goal
Lauffähiges Firebase-Projekt mit Web-App, Google-Login und Datenbank,
sodass Entwickler Features entwickeln können und Deployment automatisiert ist.

### Stories
- ✅ E-001: Web-Application Infrastructure Setup
- ✅ E-002: Database & Persistence Layer
- ✅ E-003: Authentication & User Management
- ✅ CI/CD Pipeline (GitHub Actions)

### Test Plan
- [ ] User kann sich mit Google einloggen
- [ ] User-Profil wird in Firestore erstellt
- [ ] Dashboard ist nach Login erreichbar
- [ ] Logout funktioniert
- [ ] App läuft auf Firebase Hosting
- [ ] CI/CD deployt automatisch bei Push zu main

### Deployed App
🔗 [Firebase Hosting URL]

### Screenshots
[Screenshots der Login-Page, Dashboard, etc.]

### Next Steps
Sprint 2 wird E-004 (Turn Management), E-005 (AI Integration), E-006 (UI Components) umfassen.
```

---

**Erstellt:** 2025-11-17
**Letzte Aktualisierung:** 2025-11-17
**Abgeschlossen:** 2025-11-17
