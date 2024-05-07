import React, { useState, useEffect, Suspense } from 'react';

import { init,loadRemote } from '@module-federation/runtime'

init({
  name: 'app1',
  remotes: [
    {
      name:'app2',
      entry: 'http://localhost:3002/remoteEntry.js'
    },
    {
      name:'app3',
      entry: 'http://localhost:3003/remoteEntry.js'
    },
  ]
})


function useDynamicImport({module,scope}) {
  console.log(module,scope)
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if(!module && !scope) return
    const loadComponent = async () => {
      const { default: component } = await loadRemote(`${scope}/${module}`);
      setComponent(() => component);
    };
    loadComponent();
  }, [module,scope]);
  const fallback = ()=> null
  return component || fallback
}

function App() {
  const [{ module, scope }, setSystem] = React.useState({});

  function setApp2() {
    setSystem({
      scope: 'app2',
      module: 'Widget',
    });
  }

  function setApp3() {
    setSystem({
      scope: 'app3',
      module: 'Widget',
    });
  }

  const Component = useDynamicImport({module,scope});

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
        <strong>exposes</strong>. It will no load components that have been loaded already.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{ marginTop: '2em' }}>
        <React.Suspense fallback="Loading System">
         <Component />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
