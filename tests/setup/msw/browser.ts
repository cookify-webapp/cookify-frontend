// src/mocks/browser.js
import { setupWorker } from 'msw'
import { handlers } from './../../../mocks/handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)