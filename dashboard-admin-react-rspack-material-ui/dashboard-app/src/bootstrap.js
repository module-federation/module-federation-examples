import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './Dashboard';



const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
      <Dashboard />
  </React.StrictMode>
);