import React from 'react';

const RemoteButton = React.lazy(() => import('remote/Button'));
const ServiceComponent = React.lazy(() => import('remote/ServiceComponent'));

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>Host</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
      <ServiceComponent/>
    </React.Suspense>
  </div>
);

export default App;
