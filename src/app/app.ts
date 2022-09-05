import { app, BrowserWindow, shell, session, ipcMain } from 'electron';
import { initRenderer } from 'electron-store';
import path from 'path';
const reactDevToolsPath = '<DEV-TOOLS-PATH>';

let mainWindow: BrowserWindow | null = null;
function createWindow() {
    initRenderer();
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 1024,
        darkTheme: true,
        autoHideMenuBar: app.isPackaged,
        icon: path.join(__dirname, '../public/logo512.png'),
        webPreferences: {
            nodeIntegration: false,
            sandbox: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'context.js'),
            devTools: !app.isPackaged
        },
    });

    mainWindow.loadURL(
        app.isPackaged
            ? `file://${path.join(__dirname, '../build/index.html')}`
            : 'http://localhost:3000'
    );

    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    mainWindow.on('closed', () => {
        if (process.platform !== 'darwin') app.quit();
        else mainWindow = null;
    });
    mainWindow.focus();

    // 새창 시스템 브라우저로 열기
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // app.quit();
        app.exit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// debugging
app.whenReady().then(async () => {
    if (!app.isPackaged) await session.defaultSession.loadExtension(reactDevToolsPath);
});

ipcMain.on('setAppSize', (event, width: number, height: number) => {
    mainWindow!.setMinimumSize(width, height);
    mainWindow!.setSize(width, height, true);
    mainWindow!.center();
});

ipcMain.on('setAppResizable', (event, resizable: boolean) => {
    mainWindow!.resizable = resizable;
});