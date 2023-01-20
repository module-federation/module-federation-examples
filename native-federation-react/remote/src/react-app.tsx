
import React, { useState } from "react";


export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          I'm the remote's React Component!
        </p>
        <div>
          Remote button: <button data-e2e="REMOTE_BUTTON" onClick={() => setCount(count => count + 1)}>click me {count}</button>
        </div>

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
