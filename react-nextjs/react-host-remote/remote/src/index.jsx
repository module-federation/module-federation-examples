import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const container = document.getElementById('root-remote');
import Invoices from './routes/Invoices';
import Expenses from './routes/Expenses';
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="expenses" element={<Expenses />} />
    </Routes>
  </BrowserRouter>,
);
