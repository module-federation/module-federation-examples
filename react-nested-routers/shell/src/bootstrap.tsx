import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.getElementById('shell-root')!);
root.render(<App />);

export {};
