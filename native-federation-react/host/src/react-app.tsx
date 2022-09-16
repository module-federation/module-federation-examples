import React from 'https://esm.sh/react';
import { loadRemoteModule } from '@softarc/native-federation';

// import "./App.css";
const reactAppMod = loadRemoteModule({
  remoteName: 'remote',
  exposedModule: './react-remote',
});
const RemoteComponent = React.lazy(() =>
  reactAppMod.then(c => {
    console.log(c);
    return { default: c.App };
  }),
);
export function App() {
  return (
    <div className="App">
      <header className="App-header">
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
