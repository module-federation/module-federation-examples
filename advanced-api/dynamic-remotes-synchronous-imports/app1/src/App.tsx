import React, { Suspense, useState, useEffect, useCallback } from 'react';
import Widget from './Widget';
import ErrorBoundary from './components/ErrorBoundary';
import { configUtils } from '../../moduleConfig';

// Import remote component with synchronous syntax
// This demonstrates the core pattern of dynamic remotes with synchronous imports
import WidgetRemote from 'app2/Widget';

/**
 * Enhanced App Component with Module Federation 2.0 patterns
 *
 * Demonstrates:
 * - Synchronous imports of dynamic remotes
 * - Error boundaries for remote module failures
 * - Loading states and fallbacks
 * - Runtime configuration debugging
 * - Modern React patterns (hooks, functional components)
 */
const App: React.FC = () => {
  const [remoteConfig, setRemoteConfig] = useState<any>(null);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  /**
   * Load and validate Module Federation configuration
   */
  useEffect(() => {
    const config = configUtils.getCurrentConfig();
    const validation = configUtils.validateConfiguration();

    setRemoteConfig(config);

    if (!validation.isValid) {
      console.warn('[App] Configuration issues detected:', validation.issues);
      setRemoteError(validation.issues.join(', '));
    }

    // Log configuration for debugging
    console.log('[App] Module Federation configuration:', config);
  }, []);

  /**
   * Handle errors from remote components
   */
  const handleRemoteError = useCallback((error: Error, errorInfo: any) => {
    console.error('[App] Remote component error:', error);
    setRemoteError(error.message);

    // Optionally attempt to reconfigure remotes
    if (error.message.includes('Loading')) {
      console.log('[App] Attempting to reconfigure remote URLs...');
      // You could implement auto-recovery logic here
    }
  }, []);

  /**
   * Retry loading remote components
   */
  const handleRetry = useCallback(() => {
    setRemoteError(null);
    setRetryKey(prev => prev + 1);
    console.log('[App] Retrying remote component load...');
  }, []);

  /**
   * Loading fallback for remote components
   */
  const RemoteLoadingFallback = () => (
    <div
      style={{
        padding: '20px',
        margin: '10px 0',
        border: '2px dashed #74b9ff',
        borderRadius: '8px',
        backgroundColor: '#e3f2fd',
        textAlign: 'center',
        color: '#1976d2',
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔄</div>
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Loading Remote Component...</div>
      <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.7 }}>
        Fetching app2/Widget from remote module
      </div>
    </div>
  );

  /**
   * Debug panel for development
   */
  const DebugPanel = () => {
    if (process.env.NODE_ENV !== 'development') return null;

    return (
      <details
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontSize: '12px',
        }}
      >
        <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
          🔧 Module Federation Debug Info
        </summary>

        {remoteConfig && (
          <div>
            <h4>Configuration:</h4>
            <pre
              style={{
                backgroundColor: '#ffffff',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                overflow: 'auto',
              }}
            >
              {JSON.stringify(remoteConfig, null, 2)}
            </pre>
          </div>
        )}

        {remoteError && (
          <div style={{ marginTop: '10px' }}>
            <h4 style={{ color: '#d63031' }}>Configuration Issues:</h4>
            <p style={{ color: '#d63031', margin: '4px 0' }}>{remoteError}</p>
            <button
              onClick={handleRetry}
              style={{
                padding: '4px 8px',
                backgroundColor: '#0984e3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Retry
            </button>
          </div>
        )}

        <div style={{ marginTop: '10px' }}>
          <h4>Global Debug Access:</h4>
          <p>Open browser console and try:</p>
          <code
            style={{
              backgroundColor: '#2d3748',
              color: '#e2e8f0',
              padding: '4px 8px',
              borderRadius: '4px',
              display: 'block',
              marginTop: '4px',
            }}
          >
            window.__MF_CONFIG__.getCurrentConfig()
          </code>
        </div>
      </details>
    );
  };

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <header style={{ marginBottom: '30px' }}>
        <h1
          style={{
            color: '#2d3748',
            borderBottom: '3px solid #4299e1',
            paddingBottom: '10px',
            margin: '0 0 10px 0',
          }}
        >
          🌐 Dynamic System Host
        </h1>
        <h2
          style={{
            color: '#4a5568',
            fontSize: '18px',
            margin: '0',
            fontWeight: 'normal',
          }}
        >
          App 1 - Demonstrating Synchronous Imports with Dynamic Remotes
        </h2>
      </header>

      <main>
        {/* Local Component */}
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>📍 Local Component</h3>
          <div
            style={{
              border: '2px solid #48bb78',
              borderRadius: '8px',
              padding: '4px',
            }}
          >
            <Widget />
          </div>
        </section>

        {/* Remote Component with Enhanced Error Handling */}
        <section>
          <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>
            🔌 Remote Component (Synchronous Import)
          </h3>
          <div
            style={{
              border: '2px solid #ed8936',
              borderRadius: '8px',
              padding: '4px',
            }}
          >
            <ErrorBoundary
              onError={handleRemoteError}
              resetKeys={[retryKey]}
              fallback={
                <div
                  style={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#fed7d7',
                    border: '2px solid #fc8181',
                    borderRadius: '6px',
                    color: '#c53030',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Remote Module Failed to Load
                  </div>
                  <div style={{ fontSize: '14px', marginBottom: '12px' }}>
                    The remote component 'app2/Widget' could not be loaded.
                  </div>
                  <button
                    onClick={handleRetry}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    🔄 Retry Loading
                  </button>
                </div>
              }
            >
              <Suspense fallback={<RemoteLoadingFallback />}>
                <WidgetRemote />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        {/* Debug Panel */}
        <DebugPanel />
      </main>

      <footer
        style={{
          marginTop: '40px',
          padding: '20px 0',
          borderTop: '1px solid #e2e8f0',
          fontSize: '14px',
          color: '#718096',
          textAlign: 'center',
        }}
      >
        <p>
          This example demonstrates <strong>synchronous imports</strong> with{' '}
          <strong>dynamic remote URLs</strong>.
          <br />
          The remote URL is resolved at runtime while maintaining the synchronous import syntax.
        </p>
      </footer>
    </div>
  );
};

export default App;
