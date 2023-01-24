import React from 'react';
import('app3')
const RemoteButton = React.lazy(() => import('app2/Button'));
import lodash from 'lodash';
import merge from 'lodash.merge';

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
