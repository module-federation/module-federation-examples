import React from 'react';
import RemoteButton from 'remote/Button'
// const RemoteButton = React.lazy(() => import('remote/Button'));

const App = () => (
  <div>
    <h1 data-testid="main-heading">Basic Host-Remote</h1>
    <h2 data-testid="sub-heading">Host</h2>
    <React.Suspense fallback={<span data-testid="loading-fallback">Loading Button</span>}>
      <RemoteButton data-testid="remote-button" />
    </React.Suspense>
  </div>
);

export default App;
