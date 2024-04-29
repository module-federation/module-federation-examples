import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';

import LocalButton from './Button';
import RemoteButton from 'app2/Button';

// A function to generate a color from a string
const getColorFromString = str => {
  // Prime numbers used for generating a hash
  let primes = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23];
  let hash = 0;

  // Generate a hash from the string
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) * primes[i % primes.length];
  }

  // Convert the hash to a color
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
};

// The main App component
const App = () => (
  <div>
    <h1>Offline Remote</h1>
    <h2>Remotes currently in use</h2>
    {/* Display the names of the remotes loaded by the CustomPlugin */}
    {__FEDERATION__.__INSTANCES__.map(inst => (
      <span
        style={{
          padding: 10,
          color: '#fff',
          background: getColorFromString(inst.name.split().reverse().join('')),
        }}
        key={inst.name}
      >
        {inst.name}
      </span>
    ))}
    <p>
      Click The second button. This will cause the <i>pick-remote.ts</i> to load remoteEntry urls
      from a mock api call.
    </p>
    {/* LocalButton is a button component from the local app */}
    <LocalButton />
    {/* RemoteButton is a button component loaded from a remote app */}
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
    {/* The Reset button clears the 'button' item from localStorage */}
    <button
      onClick={() => {
        localStorage.clear('button');
        window.location.reload();
      }}
    >
      Reset{' '}
    </button>
  </div>
);

export default App;
