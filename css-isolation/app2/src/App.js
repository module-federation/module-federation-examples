import React, { lazy, Suspense, useEffect, useState } from 'react';
import { runStandalone } from '../styleLoader';
import './styles.css';

// Lazy load a dummy component which imports another global CSS rule
const Dummy = lazy(() => import('./Dummy'));

const App = ({ isStandalone = false }) => {
  const [dummyLoaded, setDummyLoaded] = useState(false);

  useEffect(() => {
    if (!isStandalone) {
      return;
    }
    // If we receive the isStandAlone prop we will initialize the style loader in standalone mode
    runStandalone();
  }, [isStandalone]);

  return (
    <div style={{ border: '1px red solid' }}>
      <h1>Remote Application - React Version {React.version}</h1>
      <h2>App 2</h2>
      <button onClick={() => setDummyLoaded(true)}>Make Everything Yellow</button>
      {dummyLoaded && (
        <Suspense fallback={null}>
          <Dummy />
        </Suspense>
      )}
    </div>
  );
};

export default App;
