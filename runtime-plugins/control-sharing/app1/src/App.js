import LocalButton from './Button';
import React from 'react';
import ReactDOM from 'react-dom';
import RemoteButton from 'app2/Button';
import lodash from 'lodash';
import ControlPanel from './ControlPanel';

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  header: {
    borderBottom: '2px solid #e9ecef',
    marginBottom: '2rem',
    paddingBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    margin: '0 0 1rem 0',
  },
  subtitle: {
    fontSize: '1.8rem',
    color: '#34495e',
    margin: '1rem 0',
  },
  versionInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  versionText: {
    margin: '0',
    fontSize: '1rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
};

const getColorFromString = str => {
  let primes = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) * primes[i % primes.length];
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const App = () => {
  const reactColor = getColorFromString(React.version);
  const reactDomColor = getColorFromString(ReactDOM.version);
  const lodashColor = getColorFromString(lodash.VERSION);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Share Control Panel</h1>
        <h2 style={styles.subtitle}>App 1</h2>
      </header>

      <div style={styles.versionInfo}>
        <h4 style={styles.versionText}>
          <span style={{ ...styles.dot, backgroundColor: reactColor }} />
          Host Used React: {React.version}
        </h4>
        <h4 style={styles.versionText}>
          <span style={{ ...styles.dot, backgroundColor: reactDomColor }} />
          Host Used ReactDOM: {ReactDOM.version}
        </h4>
        <h4 style={styles.versionText}>
          <span style={{ ...styles.dot, backgroundColor: lodashColor }} />
          Host Used Lodash: {lodash.VERSION}
        </h4>
      </div>

      <div style={styles.buttonContainer}>
        <LocalButton />
        <React.Suspense fallback={
          <div style={{ 
            padding: '0.5rem 1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            color: '#666'
          }}>
            Loading Button...
          </div>
        }>
          <RemoteButton />
        </React.Suspense>
      </div>

      <ControlPanel />
    </div>
  );
};

export default App;
