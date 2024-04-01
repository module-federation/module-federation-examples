import { NameContextProvider } from 'shared-context_shared-library';
import React from 'react';
import Welcome from './Welcome';

const App = () => (
  <div>
    <h1>Context Provider</h1>
    <h2>App 2</h2>
    <NameContextProvider.Provider value="Susan">
      <Welcome />
    </NameContextProvider.Provider>
  </div>
);

export default App;
