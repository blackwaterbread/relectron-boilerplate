/// <reference types="react-scripts" />

declare global {
    interface Window {
        Application: {
            versions: {
                node: () => string,
                chrome: () => string,
                electron: () => string,
            },
            setAppSize: (width: number, height: number) => void,
            setAppResizable: (resizable: boolean) => void,
            isDevelopment: () => boolean
        },
        Store: {
            get: (key: string) => any,
            set: (key: string, value: number | string | object) => void,
            delete: (key: string) => void,
        }
    }
}