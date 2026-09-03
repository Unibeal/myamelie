const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Garde une référence globale de la fenêtre pour éviter le garbage collection
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 480,
    minHeight: 560,
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,
    backgroundColor: '#FBF6EF',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  // Menu minimal (pas de barre de menu technique inutile)
  Menu.setApplicationMenu(null);

  // L'app démarre sur la page de connexion (Firebase gère la redirection
  // automatique vers my-amelie.html si l'utilisateur est déjà connecté)
  mainWindow.loadFile(path.join(__dirname, 'app', 'login.html'));

  // Ouvre les liens externes (ex: mot de passe oublié -> mail) dans le navigateur
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
