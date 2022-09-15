import React, { lazy, Suspense, useState } from 'react';
import './styles.css';

// Lazy load a dummy component which imports another global CSS rule
const Dummy = lazy(() => import('./Dummy'));

const App = () => {
  const [dummyLoaded, setDummyLoaded] = useState(false);

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
