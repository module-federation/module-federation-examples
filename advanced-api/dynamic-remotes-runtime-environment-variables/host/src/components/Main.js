import React, { useContext, useState, useCallback } from 'react';
import { useFederatedComponent, preloadRemote } from '../hooks/useFederatedComponent';
import { EnvContext } from './App';

const Main = () => {
  const ENV = useContext(EnvContext);
  const [{ module, scope, url }, setSystem] = useState({});
  const [isPreloading, setIsPreloading] = useState(false);

  const loadRemoteWidget = useCallback(() => {
    setSystem({
      url: ENV?.REMOTE_URL || 'http://localhost:3001/remoteEntry.js',
      scope: 'remote',
      module: './Widget',
    });
  }, [ENV?.REMOTE_URL]);

  const preloadWidget = useCallback(async () => {
    setIsPreloading(true);
    try {
      const remoteUrl = ENV?.REMOTE_URL || 'http://localhost:3001/remoteEntry.js';
      await preloadRemote(remoteUrl, 'remote', './Widget');
      console.log('Widget preloaded successfully');
    } catch (error) {
      console.error('Failed to preload widget:', error);
    } finally {
      setIsPreloading(false);
    }
  }, [ENV?.REMOTE_URL]);

  const {
    Component: FederatedComponent,
    loading,
    error,
    retry,
    retryCount,
    clearCache,
  } = useFederatedComponent(url, scope, module, {
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 10000,
  });

  const styles = {
    container: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      color: '#333',
      borderBottom: '2px solid #007acc',
      paddingBottom: '10px',
    },
    envInfo: {
      backgroundColor: '#f5f5f5',
      padding: '10px',
      borderRadius: '4px',
      margin: '10px 0',
      fontSize: '14px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      margin: '20px 0',
    },
    button: {
      backgroundColor: '#007acc',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    buttonSecondary: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    errorContainer: {
      backgroundColor: '#ffebee',
      border: '1px solid #f44336',
      borderRadius: '4px',
      padding: '15px',
      margin: '10px 0',
    },
    errorText: {
      color: '#d32f2f',
      marginBottom: '10px',
    },
    remoteContainer: {
      marginTop: '2em',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
    },
    statusText: {
      fontSize: '14px',
      color: '#666',
      margin: '10px 0',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dynamic Remotes with Runtime Environment Variables</h1>

      <div style={styles.envInfo}>
        <h3>Environment Configuration:</h3>
        <ul>
          <li>
            <strong>API URL:</strong> {ENV?.API_URL || 'Not configured'}
          </li>
          <li>
            <strong>Remote URL:</strong>{' '}
            {ENV?.REMOTE_URL || 'http://localhost:3001/remoteEntry.js (default)'}
          </li>
          <li>
            <strong>Environment:</strong> {process.env.NODE_ENV || 'development'}
          </li>
        </ul>
      </div>

      <p>
        This example demonstrates how Module Federation can load remote components dynamically with
        runtime environment variables. The remote URL and other configuration can be changed without
        rebuilding the application.
      </p>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={loadRemoteWidget} disabled={loading}>
          {loading ? 'Loading...' : 'Load Remote Widget'}
        </button>

        <button style={styles.buttonSecondary} onClick={preloadWidget} disabled={isPreloading}>
          {isPreloading ? 'Preloading...' : 'Preload Widget'}
        </button>

        {FederatedComponent && (
          <button style={styles.buttonSecondary} onClick={clearCache}>
            Clear Cache
          </button>
        )}
      </div>

      {error && (
        <div style={styles.errorContainer}>
          <div style={styles.errorText}>
            <strong>Error loading remote component:</strong> {error.message}
          </div>
          <div style={styles.statusText}>Failed after {retryCount} attempts</div>
          <button style={styles.button} onClick={retry}>
            Retry Loading
          </button>
        </div>
      )}

      {loading && (
        <div style={styles.statusText}>
          Loading remote component... This may take a few seconds.
        </div>
      )}

      <div style={styles.remoteContainer}>
        <h3>Remote Component:</h3>
        <React.Suspense
          fallback={<div style={styles.statusText}>Initializing remote component...</div>}
        >
          {FederatedComponent ? (
            <FederatedComponent />
          ) : (
            <div style={styles.statusText}>
              No remote component loaded. Click "Load Remote Widget" to begin.
            </div>
          )}
        </React.Suspense>
      </div>
    </div>
  );
};

export default Main;
