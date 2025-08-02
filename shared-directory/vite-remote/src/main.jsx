import file1Default from "shared/dir1/file1";
import {A} from "shared/file2";
console.log('shared/dir1/file1 Default', file1Default)
console.log('shared/file2 A', A)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App1 from './App1';
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>

    <h2>App1</h2>
    <App1 />

  </React.StrictMode>
);
