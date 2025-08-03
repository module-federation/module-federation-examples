import React, { useState, useEffect, Suspense } from 'react';
import { init, loadRemote } from '@module-federation/runtime';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Remote component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2em', 
          border: '2px solid #ff6b6b', 
          borderRadius: '4px', 
          backgroundColor: '#ffe0e0',
          color: '#c92a2a'
        }}>
          <h3>⚠️ Component Failed to Load</h3>
          <p>Unable to load the remote component. Please try again or check the remote application.</p>
          <details>
            <summary>Error Details</summary>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ 
              marginTop: '1em', 
              padding: '0.5em 1em', 
              backgroundColor: '#c92a2a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const getRemoteEntry = (port) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? (process.env.REACT_APP_REMOTE_BASE_URL || window.location.origin)
    : 'http://localhost';
  return `${baseUrl}:${port}/remoteEntry.js`;
};

init({
  name: 'app1',
  remotes: [
    {
      name: 'app2',
      entry: getRemoteEntry(3002),
    },
    {
      name: 'app3',
      entry: getRemoteEntry(3003),
    },
  ],
});

function useDynamicImport({ module, scope }) {
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!module || !scope) {
      setComponent(null);
      setError(null);
      return;
    }

    const loadComponent = async () => {
      setLoading(true);
      setError(null);
      setComponent(null);

      try {
        console.log(`Loading remote module: ${scope}/${module}`);
        const { default: Component } = await loadRemote(`${scope}/${module}`);
        setComponent(() => Component);
        console.log(`Successfully loaded: ${scope}/${module}`);
      } catch (error) {
        console.error(`Error loading remote module ${scope}/${module}:`, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [module, scope]);

  return { component, loading, error };
}

function App() {
  const [{ module, scope }, setSystem] = useState({});

  const setApp2 = () => {
    setSystem({
      scope: 'app2',
      module: 'Widget',
    });
  };

  const setApp3 = () => {
    setSystem({
      scope: 'app3',
      module: 'Widget',
    });
  };

  const { component: Component, loading, error } = useDynamicImport({ module, scope });

  const renderRemoteComponent = () => {
    if (loading) {
      return (
        <div style={{ 
          padding: '2em', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '4px',
          border: '2px dashed #dee2e6' 
        }}>
          <div>🔄 Loading {scope}/{module}...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ 
          padding: '2em', 
          border: '2px solid #ffc107', 
          borderRadius: '4px', 
          backgroundColor: '#fff3cd',
          color: '#856404'
        }}>
          <h3>⚠️ Failed to Load Remote Component</h3>
          <p>Could not load {scope}/{module}</p>
          <details>
            <summary>Error Details</summary>
            <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '1em' }}>
              {error.toString()}
            </pre>
          </details>
        </div>
      );
    }

    if (Component) {
      return (
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage of Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will not load components that have already been loaded.
      </p>
      <div style={{ marginBottom: '1em' }}>
        <button 
          onClick={setApp2} 
          disabled={loading}
          style={{ 
            marginRight: '1em', 
            padding: '0.5em 1em',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Load App 2 Widget
        </button>
        <button 
          onClick={setApp3} 
          disabled={loading}
          style={{ 
            padding: '0.5em 1em',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Load App 3 Widget
        </button>
      </div>
      <div style={{ marginTop: '2em' }}>
        <Suspense fallback={
          <div style={{ padding: '2em', textAlign: 'center' }}>
            🔄 Initializing component...
          </div>
        }>
          {renderRemoteComponent()}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
