import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const hostElement = document.getElementById('root') as unknown as HTMLElement;
const host = createRoot(hostElement);
host.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
