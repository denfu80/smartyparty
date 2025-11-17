# Sprint 1 - Story Details

Dieses Dokument enthält die vollständigen Akzeptanzkriterien und technischen Details für jede Story im Sprint.

---

## E-001: Web-Application Infrastructure Setup

### Story (aus backlog-prioritized.md)

Als Entwickler möchte ich eine grundlegende Web-App-Infrastruktur haben, damit ich Features entwickeln kann.

**Technische Anforderungen:**
- Frontend: React/Next.js Setup
- Backend: Firebase Cloud Functions vorbereitet
- Development Environment: Remote Firebase (kein Docker/Emulators)
- CI/CD Pipeline (GitHub Actions)
- Deployment-Umgebung (Firebase Hosting)

### Akzeptanzkriterien

- [ ] Next.js 14 Projekt mit App Router aufgesetzt
- [ ] TypeScript konfiguriert
- [ ] Tailwind CSS + shadcn/ui integriert
- [ ] Firebase Projekt erstellt (Remote)
- [ ] Firebase SDK im Frontend integriert (`lib/firebase/config.ts`)
- [ ] Firebase Hosting konfiguriert
- [ ] Basis-Layout mit Navigation (Navbar, Footer)
- [ ] Landing Page (`/`) vorhanden
- [ ] Dashboard-Seite (`/dashboard`) vorhanden
- [ ] App läuft auf Firebase Hosting (deployed)

### Technische Umsetzung

**Projekt-Struktur:**
```
app/
  ├── (auth)/          # Auth-Seiten (login)
  ├── (game)/          # Game-Seiten (dashboard, game/*)
  ├── layout.tsx       # Root Layout
  └── page.tsx         # Landing Page

components/
  ├── ui/              # shadcn/ui components
  └── layout/          # Navbar, Footer

lib/
  ├── firebase/
  │   └── config.ts    # Firebase Initialisierung
  └── types/           # TypeScript Interfaces
```

**Firebase SDK Setup:**
```typescript
// lib/firebase/config.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app, 'europe-west1')

export default app
```

**Environment Variables (.env.local):**
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**Firebase Hosting Config (firebase.json):**
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Notizen

- **Kein Docker/Emulators**: Entwicklung direkt gegen Remote Firebase
- **shadcn/ui**: Nutze `npx shadcn-ui@latest init` für Setup
- **Next.js Static Export**: `npm run build && npm run export` für Firebase Hosting

---

## E-002: Database & Persistence Layer

### Story (aus backlog-prioritized.md)

Als Entwickler möchte ich eine Datenbank mit Persistence-Layer haben, damit Spielstände gespeichert werden.

**Technische Anforderungen:**
- Cloud Firestore Setup
- Basis-Schema für Game State (minimal für jetzt)
- Firestore Security Rules
- TypeScript Interfaces für Collections

### Akzeptanzkriterien

- [ ] Firestore Collections definiert (nur minimal für jetzt):
  - `/users/{userId}` - User-Profile
  - `/games/{gameId}` - Game-Metadaten (Status, Name, Creator)
- [ ] Firestore Security Rules implementiert
- [ ] TypeScript Interfaces für Collections (`lib/types/`)
- [ ] Basis-Services implementiert:
  - `userService.ts` - createUser, getUser, updateUser
  - `gameService.ts` - createGame, getGame, listGames
- [ ] Ein Test-Game kann erstellt und gelesen werden
- [ ] User-Profil wird bei Registrierung automatisch erstellt

### Technische Umsetzung

**Firestore Schema (Minimal):**

```typescript
// lib/types/user.ts
export interface User {
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

// lib/types/game.ts
export interface Game {
  id: string
  name: string
  createdBy: string  // userId
  createdAt: Timestamp
  status: 'lobby' | 'active' | 'finished'
  maxPlayers: number
  currentRound: number
}
```

**Firestore Security Rules (firestore.rules):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Users: Jeder kann lesen, nur eigenes Profil schreiben
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId);
    }

    // Games: Jeder kann lesen, nur eingeloggte können erstellen
    match /games/{gameId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn(); // TODO: In späteren Sprints einschränken
      allow delete: if false; // Games werden nicht gelöscht
    }
  }
}
```

**Services:**

```typescript
// lib/services/userService.ts
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { User } from '@/lib/types/user'

export async function createUser(userId: string, data: Partial<User>): Promise<void> {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    createdAt: new Date(),
    stats: { gamesPlayed: 0, gamesWon: 0 },
    settings: { language: 'de', theme: 'light' }
  })
}

export async function getUser(userId: string): Promise<User | null> {
  const snapshot = await getDoc(doc(db, 'users', userId))
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as User : null
}

export async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  await updateDoc(doc(db, 'users', userId), data)
}
```

```typescript
// lib/services/gameService.ts
import { collection, doc, getDoc, getDocs, addDoc, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Game } from '@/lib/types/game'

export async function createGame(name: string, createdBy: string, maxPlayers: number = 4): Promise<string> {
  const docRef = await addDoc(collection(db, 'games'), {
    name,
    createdBy,
    maxPlayers,
    status: 'lobby',
    currentRound: 0,
    createdAt: new Date()
  })
  return docRef.id
}

export async function getGame(gameId: string): Promise<Game | null> {
  const snapshot = await getDoc(doc(db, 'games', gameId))
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Game : null
}

export async function listGames(userId?: string): Promise<Game[]> {
  let q = query(collection(db, 'games'))

  if (userId) {
    q = query(collection(db, 'games'), where('createdBy', '==', userId))
  }

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game))
}
```

### Notizen

- **Minimales Schema**: Nur Users + Games, keine NPCs/Stations/etc. für jetzt
- **Später erweitern**: Sub-Collections kommen in Sprint 2+
- **Security Rules testen**: Firebase Console → Rules Playground nutzen

---

## E-003: Authentication & User Management

### Story (aus backlog-prioritized.md)

Als Entwickler möchte ich ein Auth-System haben, damit Spieler Accounts haben.

**Technische Anforderungen:**
- Firebase Authentication mit **Google Sign-In**
- Session Management (automatisch via Firebase Auth)
- User Profile erstellen bei erstem Login

### Akzeptanzkriterien

- [ ] Firebase Authentication mit **Google Sign-In** konfiguriert
- [ ] Login-Seite (`/login`) mit "Sign in with Google"-Button
- [ ] Auth-State-Management (`lib/hooks/useAuth.ts`)
- [ ] Protected Routes: `/dashboard` und `/game/*` nur für eingeloggte User
- [ ] Automatische User-Profil-Erstellung bei erstem Login
- [ ] Logout-Funktion in Navbar
- [ ] User kann sich einloggen, eingeloggt bleiben, und ausloggen
- [ ] User sieht seinen Namen/Avatar in der Navbar

### Technische Umsetzung

**Firebase Auth Setup (Google Provider):**

1. Firebase Console → Authentication → Sign-in method → Google aktivieren
2. OAuth-Credentials von Google Cloud Console holen (wird automatisch gemacht)

**Auth Service:**

```typescript
// lib/firebase/auth.ts
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from './config'
import { createUser, getUser } from '@/lib/services/userService'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Prüfen ob User-Profil existiert, sonst erstellen
    const existingUser = await getUser(user.uid)

    if (!existingUser) {
      await createUser(user.uid, {
        id: user.uid,
        email: user.email!,
        displayName: user.displayName || 'Unbekannt',
        avatar: user.photoURL || undefined
      })
    }

    return user
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export async function signOut() {
  await firebaseSignOut(auth)
}

export function onAuthChange(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback)
}
```

**Auth Hook:**

```typescript
// lib/hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { onAuthChange } from '@/lib/firebase/auth'
import type { User } from 'firebase/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
```

**Login Page:**

```typescript
// app/(auth)/login/page.tsx
'use client'

import { signInWithGoogle } from '@/lib/firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()

  async function handleGoogleLogin() {
    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login fehlgeschlagen')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <h1 className="text-3xl font-bold text-center">Sternenhaus</h1>
        <Button onClick={handleGoogleLogin} className="w-full">
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
```

**Protected Route Middleware:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // TODO: Firebase Auth Token prüfen
  // Für MVP: Client-seitig in Layout/Component prüfen
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/game/:path*']
}
```

**Alternative: Protected Layout (einfacher für MVP):**

```typescript
// app/(game)/layout.tsx
'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
```

**Navbar mit Logout:**

```typescript
// components/layout/Navbar.tsx
'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { signOut } from '@/lib/firebase/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()

  async function handleLogout() {
    await signOut()
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">Sternenhaus</Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span>{user?.displayName}</span>
              {user?.photoURL && <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />}
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
```

### Notizen

- **Kein Email/Password**: Nur Google Sign-In (einfacher für Testing)
- **Kein Passwort-Reset nötig**: Da kein Email/Password Auth
- **User-Profil automatisch**: Wird bei erstem Login erstellt
- **Avatar von Google**: `user.photoURL` nutzen

---

## CI/CD Pipeline (GitHub Actions)

### Story

Als Entwickler möchte ich automatisches Deployment haben, damit ich nicht manuell deployen muss.

### Akzeptanzkriterien

- [ ] GitHub Actions Workflow für Deployment
- [ ] Bei Push zu `main`: Automatischer Deploy zu Firebase Hosting
- [ ] Bei Pull Request: Build-Check (kein Deploy)
- [ ] Firebase Service Account in GitHub Secrets hinterlegt
- [ ] Erfolgreicher Deployment wird in PR kommentiert (optional)

### Technische Umsetzung

**GitHub Actions Workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js
        run: |
          npm run build
          npm run export
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}

      - name: Deploy to Firebase Hosting (main only)
        if: github.ref == 'refs/heads/main'
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
```

**GitHub Secrets Setup:**

1. Firebase Service Account erstellen:
   ```bash
   firebase login
   firebase projects:list
   # Service Account in Firebase Console erstellen
   # JSON-Key herunterladen
   ```

2. GitHub Secrets hinzufügen:
   - `FIREBASE_SERVICE_ACCOUNT` - JSON-Key als String
   - `NEXT_PUBLIC_FIREBASE_*` - Alle Firebase Config Values

**package.json Scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Notizen

- **Service Account**: Muss in Firebase Console erstellt werden (IAM → Service Accounts)
- **Secrets**: Alle `NEXT_PUBLIC_*` Variablen als GitHub Secrets
- **Preview Deploys**: Bei PRs optional (Firebase Hosting Preview Channels)

---

**Ende der Story-Details**
