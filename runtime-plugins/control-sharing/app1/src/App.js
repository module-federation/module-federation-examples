import LocalButton from './Button';
import React from 'react';
import ReactDOM from 'react-dom';
import RemoteButton from 'app2/Button';
import ControlPanel from './ControlPanel';

const App = () => (
  <div>
    <h1>Bi-Directional</h1>
    <h2>App 1</h2>
    <h3>Host Used React: {React.version}</h3>
    <h3>Host Used ReactDOM: {ReactDOM.version}</h3>
    <LocalButton />
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
    <ControlPanel />
  </div>
);

export default App;
