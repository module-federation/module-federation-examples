import LocalButton from './Button';
import React from 'react';
import ReactDOM from 'react-dom';
import RemoteButton from 'app2/Button';
import ControlPanel from './ControlPanel';
const getColorFromString = (str) => {
  let primes = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) * primes[i % primes.length];
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};
const App = () => (
  <div>
    <h1>Bi-Directional</h1>
    <h2>App 1</h2>
    <h3 style={{color: getColorFromString(React.version)}}>Host Used React: {React.version}</h3>
    <h3 style={{color: getColorFromString(ReactDOM.version)}}>Host Used ReactDOM: {ReactDOM.version}</h3>

    <LocalButton/>
    <React.Suspense fallback="Loading Button">
      <RemoteButton/>
    </React.Suspense>
    <ControlPanel/>
  </div>
);

export default App;
