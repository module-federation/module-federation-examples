import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App basename={'/remote2'} />
  </React.StrictMode>,
);
