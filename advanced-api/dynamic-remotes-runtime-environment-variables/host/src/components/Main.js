import React, { useContext, useState } from 'react';

import { useFederatedComponent } from '../hooks/useFederatedComponent';
import { EnvContext } from './App';

const Main = () => {
  const ENV = useContext(EnvContext);
  const [{ module, scope, url }, setSystem] = useState({});

  const loadRemoteWidget = () => {
    setSystem({
      url: 'http://localhost:3001/remoteEntry.js',
      scope: 'remote',
      module: './Widget',
    });
  };

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(url, scope, module);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>Host</h2>
      <h3>my env is {ENV.API_URL}</h3>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will no load components that have been loaded already.
      </p>
      <button onClick={loadRemoteWidget}>Load Remote Widget</button>
      <div style={{ marginTop: '2em' }}>
        <React.Suspense fallback="Loading System">
          {errorLoading
            ? `Error loading module "${module}"`
            : FederatedComponent && <FederatedComponent />}
        </React.Suspense>
      </div>
    </div>
  );
};

export default Main;
