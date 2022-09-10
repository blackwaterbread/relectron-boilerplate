/// <reference types="react-scripts" />

import { typeContextApplication, typeContextStore } from 'app/context';

declare global {
    interface Window {
        Application: typeContextApplication,
        Store: typeContextStore
    }
}