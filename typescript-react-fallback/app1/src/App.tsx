import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Components from './Components';
import { importRemote } from '@module-federation/utilities';

const FallbackRemote = React.lazy(() =>
  importRemote({
    url: 'http://localhost:3002',
    scope: 'app2',
    module: 'Button',
  }),
);

const Fallback = () => (
  <React.Suspense fallback="Loading Button">
    <FallbackRemote />
  </React.Suspense>
);

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App 1</h2>
    <ErrorBoundary fallbackRender={Fallback}>
      <Components />
    </ErrorBoundary>
  </div>
);

export default App;
