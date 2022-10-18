import React, { useEffect } from 'react';

const parentElementId = 'parent';

const App = () => {
  useEffect(() => {
    let cleanup;
    import('app2/appInjector').then(({ inject, unmount }) => {
      inject(parentElementId);
      cleanup = unmount;
    });

    return () => cleanup && cleanup(parentElementId);
  }, []);

  // App2 will be injected in the div with parentElementId
  return (
    <div>
      <h1>Host Application - React Version {React.version}</h1>
      <h2>App 1</h2>
      <div id={parentElementId}></div>
    </div>
  );
};

export default App;
