const { app, BrowserWindow } = require('electron');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const salesRoutes = require('./routes/salesRoutes');
const purchasesRoutes = require('./routes/purchasesRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile('src/views/index.html');
}

app.whenReady().then(() => {
  createWindow();
  productRoutes();
  categoriesRoutes();
  salesRoutes();
  purchasesRoutes();
  suppliersRoutes();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
