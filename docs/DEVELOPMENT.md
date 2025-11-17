# Development Guide - Sternenhaus

## Setup

### Prerequisites
- Node.js 20+
- Firebase Project (erstellt unter https://console.firebase.google.com)
- Google Cloud Account (für OAuth)

### Installation

1. Repository klonen und Dependencies installieren:
```bash
git clone https://github.com/denfu80/smartyparty.git
cd smartyparty
npm install
```

2. Firebase Projekt erstellen:
   - Gehe zu https://console.firebase.google.com
   - Erstelle neues Projekt "sternenhaus"
   - Aktiviere Firestore Database
   - Aktiviere Authentication → Google Sign-In

3. Environment Variables einrichten:

Erstelle `.env.local` im Root-Verzeichnis:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Firebase Config findest du unter: **Project Settings → General → Your apps → SDK setup and configuration**

4. Firestore Security Rules deployen:
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

5. Development Server starten:
```bash
npm run dev
```

App läuft auf http://localhost:3000

## Projektstruktur

```
app/
  ├── login/              # Login-Seite (Google Sign-In)
  ├── dashboard/          # Dashboard (Protected Route)
  │   ├── layout.tsx      # Protected Layout mit Auth-Check
  │   └── page.tsx        # Dashboard mit Game-Liste
  ├── layout.tsx          # Root Layout
  └── page.tsx            # Landing Page

components/
  ├── ui/                 # shadcn/ui components
  └── layout/             # Navbar, Footer
      └── Navbar.tsx      # Navbar mit Auth-Status

lib/
  ├── firebase/
  │   ├── config.ts       # Firebase SDK Initialisierung
  │   └── auth.ts         # Auth Service (Google Sign-In)
  ├── services/
  │   ├── userService.ts  # User CRUD
  │   └── gameService.ts  # Game CRUD
  ├── types/
  │   ├── user.ts         # User Interface
  │   └── game.ts         # Game Interface
  └── hooks/
      └── useAuth.ts      # Auth Hook

docs/
  ├── sprints/            # Sprint Planning
  └── architecture/       # Tech Stack Docs
```

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Firestore, Authentication, Hosting, Functions)
- **Deployment**: Firebase Hosting, GitHub Actions

## Available Scripts

```bash
npm run dev          # Development Server (Port 3000)
npm run build        # Production Build
npm run start        # Start Production Server
npm run lint         # ESLint
```

## Firebase Collections

### users
```typescript
{
  id: string
  email: string
  displayName: string
  avatar?: string
  createdAt: Timestamp
  stats: {
    gamesPlayed: number
    gamesWon: number
  }
  settings: {
    language: 'de' | 'en'
    theme: 'light' | 'dark'
  }
}
```

### games
```typescript
{
  id: string
  name: string
  createdBy: string  // userId
  createdAt: Timestamp
  status: 'lobby' | 'active' | 'finished'
  maxPlayers: number
  currentRound: number
}
```

## Authentication Flow

1. User klickt "Login" in Navbar
2. Redirect zu `/login`
3. Google Sign-In Popup
4. Bei erfolgreichem Login:
   - Check ob User-Profil existiert
   - Falls nicht: Erstelle User-Profil in Firestore
5. Redirect zu `/dashboard`

## Protected Routes

Das Dashboard ist durch ein Layout geschützt:
- `app/dashboard/layout.tsx` prüft Auth-Status
- Nicht eingeloggte User werden zu `/login` redirected
- Loading-State während Auth-Check

## Testing

### Manual Testing Checklist

- [ ] Kann User sich mit Google einloggen?
- [ ] Wird User-Profil bei erstem Login erstellt?
- [ ] Zeigt Navbar User-Info korrekt an?
- [ ] Kann User sich ausloggen?
- [ ] Funktioniert Protected Route (Dashboard redirect)?
- [ ] Kann eingeloggter User Game erstellen?
- [ ] Werden Games korrekt geladen und angezeigt?

## Deployment

### Manuelles Deployment

1. Build erstellen:
```bash
npm run build
```

2. Deploy zu Firebase Hosting:
```bash
firebase deploy --only hosting
```

### Automatisches Deployment (CI/CD)

Bei Push zu `main` wird automatisch deployed via GitHub Actions.

**Setup:** Siehe [CI-CD-SETUP.md](./CI-CD-SETUP.md) für detaillierte Anleitung

**Workflow:**
- `.github/workflows/deploy.yml`
- Bei Push zu `main`: Automatischer Deploy
- Bei Pull Requests: Build-Check ohne Deploy

**Benötigte GitHub Secrets:**
- `FIREBASE_SERVICE_ACCOUNT`
- `NEXT_PUBLIC_FIREBASE_*` (alle Firebase Config Variablen)

## Troubleshooting

### "Permission denied" bei Firestore
→ Firestore Security Rules deployen: `firebase deploy --only firestore:rules`

### "No Firebase App" Error
→ `.env.local` prüfen, alle Firebase Config Variablen gesetzt?

### Google Sign-In funktioniert nicht
→ Firebase Console → Authentication → Google Provider aktiviert?
→ Authorized domains konfiguriert? (localhost + Production Domain)

## Next Steps (Sprint 2+)

- [ ] Turn Management System
- [ ] AI Integration (NPC Dialoge)
- [ ] Game Lobby UI
- [ ] Real-time Updates (Firestore Subscriptions)
- [ ] Player Stats Dashboard

## Links

- [Firebase Console](https://console.firebase.google.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [shadcn/ui Components](https://ui.shadcn.com)
