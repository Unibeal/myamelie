# MY AMELIE — Application PC

Application de bureau (Windows / Mac / Linux) pour l'app "MY AMELIE" — mon tableau de révisions.

Le projet est basé sur **Electron** : il enveloppe les pages `login.html` et `my-amelie.html`
existantes (avec Firebase pour la connexion et l'enregistrement des tableaux) dans une vraie
fenêtre d'application, avec son icône, sans avoir besoin d'un navigateur.

## 📥 Obtenir le fichier .exe (le plus simple : GitHub Actions)

Ce dépôt contient déjà un robot de construction automatique (`.github/workflows/build.yml`).
Dès que ce projet est poussé sur GitHub, GitHub construit lui-même les installateurs :

1. Crée un nouveau dépôt sur GitHub (ex: `my-amelie-app`), vide, sans README.
2. Dans un terminal, à la racine de ce dossier :
   ```bash
   git init
   git add .
   git commit -m "MY AMELIE - application de bureau"
   git branch -M main
   git remote add origin https://github.com/TON-COMPTE/my-amelie-app.git
   git push -u origin main
   ```
3. Va dans l'onglet **Actions** de ton dépôt GitHub : le build démarre automatiquement
   (~5-10 minutes pour les 3 plateformes).
4. Une fois terminé, clique sur le run puis, en bas de page, télécharge l'artefact
   **`my-amelie-windows-latest`** → dézippe-le → tu obtiens `MY AMELIE Setup.exe`
   (installateur) et une version `.exe` portable (sans installation).

Tu obtiens aussi automatiquement une version Mac (`.dmg`) et Linux (`.AppImage`)
dans les autres artefacts.

### Pour publier une "Release" téléchargeable directement
Crée un tag de version pour déclencher aussi une release GitHub avec les fichiers attachés :
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 🖥️ Construire toi-même en local (optionnel)

Si tu as Node.js installé sur ta machine :
```bash
npm install
npm run dist:win     # -> release/MY AMELIE Setup.exe (+ version portable)
npm run dist:mac     # -> release/MY AMELIE.dmg (doit être lancé sur un Mac)
npm run dist:linux   # -> release/MY AMELIE.AppImage
```

Pour juste tester l'app sans construire d'installateur :
```bash
npm install
npm start
```

## 📁 Structure du projet

```
my-amelie-app/
├── main.js                  ← process principal Electron (ouvre la fenêtre)
├── package.json             ← config de l'app + electron-builder
├── app/
│   ├── login.html            ← page de connexion (Firebase Auth)
│   └── my-amelie.html        ← l'application (tableau de révisions)
├── build/
│   ├── icon.png               ← icône source
│   ├── icon.ico                ← icône Windows
│   └── icon.icns                ← icône Mac (générée au build si absente)
└── .github/workflows/build.yml ← construction auto sur GitHub
```

## ℹ️ Remarques

- L'app a besoin d'une connexion internet pour la connexion (Firebase Auth/Firestore)
  et pour les exports PDF/PNG/JPG (bibliothèques chargées depuis un CDN).
- La configuration Firebase utilisée est celle déjà présente dans les fichiers HTML
  d'origine — aucune donnée supplémentaire n'a été modifiée.
- L'icône fournie a été convertie automatiquement en `.ico` (Windows). Pour macOS,
  électron-builder génère l'`.icns` à partir de `build/icon.png` s'il est absent, tu peux
  aussi le remplacer par un `.icns` fait sur mesure si tu préfères.
