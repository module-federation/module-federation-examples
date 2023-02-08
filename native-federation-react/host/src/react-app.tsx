
import React, { useState, lazy } from "react";

import { loadRemoteModule } from '@softarc/native-federation';

// import "./App.css";
const reactAppMod = loadRemoteModule({
  remoteName: 'remote',
  exposedModule: './react-remote',
});

const RemoteComponent = lazy(()=>reactAppMod.then(c=>{
 console.log(c);
  return {default: c.App}
}))
export function App() {
  const [count, setCount] = useState(0);


  return (
    <div className="App">
      <header className="App-header">
        <div>
          Host button: <button data-e2e="HOST_BUTTON" onClick={() => setCount(count => count + 1)}>click me {count}</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <React.Suspense fallback="loading federated">
          <RemoteComponent />
        </React.Suspense>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
