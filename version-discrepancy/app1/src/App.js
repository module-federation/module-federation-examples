import { VERSION, nth } from 'lodash';

import React from 'react';

const RemoteExample = React.lazy(() => import('app2/Example'));

const App = () => {
  return (
    <div>
      <h1>App 1 Host</h1>
      <p>Lodash v{VERSION}</p>
      <p>
        <code>
          typeof lodash.nth
          <br />
          // => {typeof nth}
        </code>
        <br />
        <br />
        <em>
          (<code>lodash.nth</code> not available until lodash@4.11)
        </em>
      </p>
      <React.Suspense fallback="Loading Example">
        <RemoteExample />
      </React.Suspense>
    </div>
  );
};

export default App;
