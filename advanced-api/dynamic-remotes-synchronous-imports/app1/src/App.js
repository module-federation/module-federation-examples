import Widget from './Widget';
import React, { Suspense } from 'react';
import WidgetRemote from 'app2/Widget';

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App 1</h2>
    <Widget />
    <Suspense fallback="Loading widget">
      <WidgetRemote />
    </Suspense>
  </div>
);

export default App;
