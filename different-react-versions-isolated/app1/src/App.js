import React, { useEffect } from 'react';

const parentElementId = 'parent';

const App = () => {
  useEffect(() => {
    import('app2/injectApp').then(injector => injector.default(parentElementId));
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
