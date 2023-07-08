import React from 'react';

const RemoteButton = React.lazy(() => import('remote/Button'));

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>Host Application</h2>
    <React.Suspense fallback="Loading Button">
        <RemoteButton variant="secondary">Click here</RemoteButton>
    </React.Suspense>
  </div>
);

export default App;
