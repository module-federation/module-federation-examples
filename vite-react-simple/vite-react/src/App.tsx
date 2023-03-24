import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Button = React.lazy(() => import('foo_app1/Button'));
const Header = React.lazy(() => import('foo_rollup_spa/Header'));

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + federation! +1+2+3+4</p>
        <React.Suspense fallback="Loading App...">
          <Header />
          <Button />
        </React.Suspense>
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            data-e2e="VITE_REACT_APP__LEARN_REACT_LINK"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
            data-e2e="VITE_REACT_APP__VITE_DOCS_LINK"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
