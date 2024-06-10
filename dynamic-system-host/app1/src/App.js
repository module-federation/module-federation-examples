import React, { useState, lazy, Suspense } from 'react';
import { loadRemote, init } from '@module-federation/runtime';
import ReactDOM from 'react-dom';

init({
  remotes: [
    {
      name: 'app2',
      alias: 'app2',
      entry: 'http://localhost:3002/remoteEntry.js',
    },
    {
      name: 'app3',
      alias: 'app3',
      entry: 'http://localhost:3003/remoteEntry.js',
    },
  ],
  plugins: [
    {
      name: 'custom-plugin',
      beforeInit(args) {
        return args;
      },
      init(args) {
        console.log('init: ', args);
        return args;
      },
      beforeLoadShare(args) {
        console.log('beforeLoadShare: ', args);
        return args;
      },
    },
  ],
  shared: {
    react: {
      version: '16.0.0',
      scope: 'default',
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: '^16.0.0',
      },
    },
    'react-dom': {
      version: '16.0.0',
      scope: 'default',
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: '^16.0.0',
      },
    },
  },
});

const System = ({ request }) => {
  if (!request) {
    return <h2>No system specified</h2>;
  }

  const Component = lazy(() => loadRemote(request));

  return (
    <Suspense fallback="Loading System">
      <Component />
    </Suspense>
  );
};

const App = () => {
  const [system, setSystem] = useState(null);

  const setApp2 = () => setSystem('app2/Widget');
  const setApp3 = () => setSystem('app3/Widget');

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage of Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will not load any components or modules that have been loaded
        already.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{ marginTop: '2em' }}>
        <System request={system} />
      </div>
    </div>
  );
};

export default App;
