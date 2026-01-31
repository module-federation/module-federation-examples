import React from 'react';
import { createRoot } from 'react-dom/client';
import Content from './Content';
const App = () => <Content />;

createRoot(document.getElementById('app')).render(<App />);
