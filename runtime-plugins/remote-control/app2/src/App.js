import LocalButton from './Button';
import React from 'react';

const RemoteButton = React.lazy(() => import('app1/Button'));

const App = () => (
  <div>
    <h1>API controlled remote configs</h1>
    <h2>App 2</h2>
    <LocalButton />
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
