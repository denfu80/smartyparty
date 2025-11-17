# CI/CD Setup - GitHub Actions + Firebase

Diese Anleitung beschreibt, wie du die automatische Deployment-Pipeline einrichtest.

## Übersicht

Bei jedem Push zu `main` wird die App automatisch zu Firebase Hosting deployed. Bei Pull Requests wird nur ein Build-Check durchgeführt.

## Schritt 1: Firebase Service Account erstellen

1. Gehe zur [Firebase Console](https://console.firebase.google.com)
2. Wähle dein Projekt (sternenhaus)
3. Klicke auf das Zahnrad ⚙️ → **Project Settings**
4. Wechsle zum Tab **Service Accounts**
5. Klicke auf **Generate new private key**
6. Eine JSON-Datei wird heruntergeladen (z.B. `sternenhaus-firebase-adminsdk-xxxxx.json`)

**WICHTIG:** Diese Datei enthält sensitive Daten! Niemals ins Git committen!

## Schritt 2: GitHub Secrets konfigurieren

Gehe zu deinem GitHub Repository → **Settings** → **Secrets and variables** → **Actions**

### Secrets hinzufügen:

1. **FIREBASE_SERVICE_ACCOUNT**
   - Klicke auf **New repository secret**
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Den kompletten Inhalt der heruntergeladenen JSON-Datei (copy & paste)
   - Klicke **Add secret**

2. **NEXT_PUBLIC_FIREBASE_API_KEY**
   - Value: Dein Firebase API Key aus `.env.local`

3. **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
   - Value: z.B. `sternenhaus.firebaseapp.com`

4. **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
   - Value: `sternenhaus`

5. **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
   - Value: z.B. `sternenhaus.appspot.com`

6. **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
   - Value: Deine Sender ID

7. **NEXT_PUBLIC_FIREBASE_APP_ID**
   - Value: Deine App ID

**Tipp:** Alle Firebase Config Werte findest du in der Firebase Console unter **Project Settings → General → Your apps**

## Schritt 3: Workflow testen

### Lokaler Test (optional)

Teste ob der Build funktioniert:

```bash
npm run build
```

Das sollte ein `out/` Verzeichnis erstellen.

### GitHub Actions Test

1. Pushe einen Commit zu einem Feature-Branch:
   ```bash
   git checkout -b test-ci
   git add .
   git commit -m "Test CI/CD Pipeline"
   git push origin test-ci
   ```

2. Erstelle einen Pull Request auf GitHub

3. GitHub Actions sollte automatisch starten und einen Build-Check durchführen

4. Wenn der Build erfolgreich ist: Merge den PR zu `main`

5. Bei Merge zu `main` wird automatisch zu Firebase Hosting deployed

## Workflow-Datei

Die Workflow-Konfiguration liegt in `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]      # Deploy bei Push zu main
  pull_request:
    branches: [main]      # Build-Check bei PRs
```

## Deployment überprüfen

Nach erfolgreichem Deployment:

1. Gehe zur [Firebase Console](https://console.firebase.google.com/project/sternenhaus/hosting)
2. Unter **Hosting** siehst du die Deployment-Historie
3. Klicke auf deine Domain um die deployed App zu öffnen

Oder öffne direkt: `https://sternenhaus.web.app` (oder deine Custom Domain)

## Troubleshooting

### "Error: HTTP Error: 403, The caller does not have permission"

→ Firebase Service Account hat nicht die richtigen Berechtigungen:
1. Firebase Console → IAM & Admin
2. Stelle sicher, dass der Service Account die Rolle **Firebase Admin** hat

### "Error: No Firebase App"

→ Environment Variables fehlen im GitHub Secrets:
1. Überprüfe ob alle `NEXT_PUBLIC_FIREBASE_*` Secrets gesetzt sind
2. Secrets dürfen keine Leerzeichen oder Anführungszeichen enthalten

### Build schlägt fehl

→ Teste lokal: `npm run build`
→ Überprüfe die GitHub Actions Logs für Details

### Deployment funktioniert bei PR

→ Das ist normal! Nur Pushes zu `main` deployen
→ PRs machen nur einen Build-Check

## Nächste Schritte

- [ ] Custom Domain konfigurieren (optional)
- [ ] Preview Deployments für PRs aktivieren (optional)
- [ ] Deployment-Benachrichtigungen einrichten (optional)

## Weitere Ressourcen

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [FirebaseExtended/action-hosting-deploy](https://github.com/FirebaseExtended/action-hosting-deploy)
