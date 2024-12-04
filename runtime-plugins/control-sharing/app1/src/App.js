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
  const colors = [
    '#F44336', // red
    '#2196F3', // blue
    '#4CAF50', // green
    '#9C27B0', // purple
    '#E91E63', // pink
    '#FF9800', // orange
    '#03A9F4', // light blue
    '#009688', // teal
    '#8BC34A', // light green
    '#AB47BC'  // medium purple
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }

  hash = Math.abs(hash);
  
  return colors[hash % colors.length];
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
        <h4 style={{ ...styles.versionText, color: reactColor }}>
          Host Used React: {React.version}
        </h4>
        <h4 style={{ ...styles.versionText, color: reactDomColor }}>
          Host Used ReactDOM: {ReactDOM.version}
        </h4>
        <h4 style={{ ...styles.versionText, color: lodashColor }}>
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
