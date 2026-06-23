import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Using React 18 createRoot API for better performance and concurrent features
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
