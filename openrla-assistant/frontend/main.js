const { app, BrowserWindow } = require('electron');

let win;

const devTools = false;

function createSplashWindow() {
  const splashWin = new BrowserWindow({
    width: 640,
    height: 480,
    frame: false,
    modal: true,
    parent: 'top',
    resizable: false,
  });
  splashWin.loadURL(`file://${__dirname}/view/splash.html`);
  splashWin.on('close', createWindow);
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/view/index.html`);

  // Open the DevTools.
  if (devTools) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createSplashWindow);

// Quit when all windows are closed.
app.on('window-all-closed', app.quit);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
