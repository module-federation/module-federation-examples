import React from 'react';
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
function System(props) {
  const { request } = props;

  if (!request) {
    return <h2>No system specified</h2>;
  }

  const Component = React.lazy(() => loadRemote(request));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
}

function App() {
  const [system, setSystem] = React.useState(false);

  function setApp2() {
    setSystem('app2/Widget');
  }

  function setApp3() {
    setSystem('app3/Widget');
  }

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
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
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
}

export default App;
