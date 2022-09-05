import { contextBridge, ipcRenderer } from 'electron';
import Store from 'electron-store';

const store = new Store();

contextBridge.exposeInMainWorld('Application', {
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
    setAppSize: (width: number, height: number) => { ipcRenderer.send('setSize', width, height) },
    setAppResizable: (resizable: boolean) => { ipcRenderer.send('setResizable', resizable); },
    isDevelopment: () => process.env.NODE_ENV === 'development'
});

contextBridge.exposeInMainWorld('Store', {
    get: (key: string) => store.get(key),
    set: (key: string, value: number | string | object) => store.set(key, value),
    delete: (key: string) => store.delete(key),
});