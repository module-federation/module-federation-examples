import React from 'react';

const RemoteButtonContainer = React.lazy(() => import('app2/ButtonContainer'));

const App = () => (
  <div>
    <h1>Nested</h1>
    <h2>App 1</h2>
    <p>app 1 body</p>
    <React.Suspense fallback="Loading Button Container">
      <RemoteButtonContainer />
    </React.Suspense>
  </div>
);

export default App;
