import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';

import LocalButton from './Button';
import RemoteButton from 'app2/Button';

const App = () => (
  <div>
    <h1>Offline Remote Handling</h1>

    {/* LocalButton is a button component from the local app */}
    <LocalButton />
      <br/>
      <br/>
    {/* RemoteButton is a button component loaded from a remote app */}
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
