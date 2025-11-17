# Sprint 1 - Technical Foundation

**Status:** Geplant
**Zeitraum:** 2025-11-17 - 2025-12-01
**Dauer:** 2 Wochen

---

## 🎯 Quick Info

- **Sprint Goal:** Lauffähiges Firebase-Projekt mit Web-App, Google-Login und Datenbank
- **Anzahl Stories:** 4 (3 Enabler + CI/CD)
- **Geschätzter Aufwand:** 6.5-8.5 Tage

---

## 📄 Dokumente

- **[sprint-plan.md](./sprint-plan.md)** - Vollständiger Sprint-Plan mit Goals, DoD, Risiken
- **[story-details.md](./story-details.md)** - Detaillierte Story-Beschreibungen mit Code-Beispielen

---

## 📋 Progress

### Enabler Stories

- [ ] **E-001**: Web-Application Infrastructure Setup (2-3 Tage)
  - [ ] Next.js 14 + TypeScript + Tailwind Setup
  - [ ] Firebase SDK Integration
  - [ ] Basis-Layout (Navbar, Footer)
  - [ ] Landing Page + Dashboard
  - [ ] Deployed auf Firebase Hosting

- [ ] **E-002**: Database & Persistence Layer (2-3 Tage)
  - [ ] Firestore Collections (users, games)
  - [ ] Security Rules
  - [ ] TypeScript Interfaces
  - [ ] Services (userService, gameService)
  - [ ] Test-Game erstellbar

- [ ] **E-003**: Authentication & User Management (2 Tage)
  - [ ] Firebase Auth + Google Sign-In
  - [ ] Login-Page
  - [ ] Auth-State-Management
  - [ ] Protected Routes
  - [ ] Auto-User-Profil bei erstem Login
  - [ ] Logout-Funktion

- [ ] **CI/CD**: GitHub Actions Pipeline (0.5 Tage)
  - [ ] Workflow-Datei erstellt
  - [ ] Secrets konfiguriert
  - [ ] Auto-Deploy bei Push zu main
  - [ ] Build-Check bei PRs

---

## ✅ Definition of Done

Sprint ist abgeschlossen wenn:
- [ ] Alle Akzeptanzkriterien erfüllt
- [ ] App deployed auf Firebase Hosting
- [ ] User kann sich mit Google einloggen
- [ ] Security Rules aktiv
- [ ] CI/CD deployt automatisch
- [ ] README.md mit Setup-Anleitung aktualisiert
- [ ] Pull Request erstellt und gemerged

---

## 🚀 Next Steps

Nach Sprint 1 kommt Sprint 2 mit:
- **E-004**: Turn Management System
- **E-005**: AI Integration Foundation
- **E-006**: Basic UI Framework & Components

---

## 📝 Notes

- **Erster Sprint**: Keine Velocity-Daten aus vorherigen Sprints
- **Google Sign-In**: Sehr convenient für Testing
- **Minimales Schema**: Nur Users + Games, Rest kommt später
- **Kein Docker/Emulators**: Direkt gegen Remote Firebase entwickeln

---

**Erstellt:** 2025-11-17
**Letzte Aktualisierung:** 2025-11-17
