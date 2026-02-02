import LocalButton from './Button';
import ErrorBoundary from './ErrorBoundary';
import React, { Suspense, useState, useEffect } from 'react';

const RemoteButton = React.lazy(() => import('app2/Button'));

// Enhanced loading component with visual feedback
const LoadingFallback = ({ message = 'Loading remote module...' }) => (
  <div
    style={{
      padding: '16px',
      backgroundColor: '#f0f8ff',
      border: '1px solid #b3d9ff',
      borderRadius: '4px',
      textAlign: 'center',
      margin: '10px 0',
      animation: 'pulse 1.5s ease-in-out infinite',
    }}
  >
    <div
      style={{
        display: 'inline-block',
        width: '16px',
        height: '16px',
        border: '2px solid #0066cc',
        borderTop: '2px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '8px',
      }}
    />
    {message}
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `}</style>
  </div>
);

const App = () => {
  const [remoteLoadTime, setRemoteLoadTime] = useState(null);
  const [sharedDependencies, setSharedDependencies] = useState([]);

  useEffect(() => {
    // Monitor shared dependencies for educational purposes
    const startTime = Date.now();
    import('app2/Button')
      .then(() => {
        const loadTime = Date.now() - startTime;
        setRemoteLoadTime(loadTime);
      })
      .catch(console.error);

    // Simulate checking shared dependencies (in real app, this would come from Module Federation runtime)
    setSharedDependencies(['react', 'react-dom']);
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>
          Module Federation with Automatic Vendor Sharing
        </h1>
        <h2 style={{ color: '#800', fontWeight: 'normal' }}>App 1 (Host & Remote)</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Demonstrating intelligent dependency sharing across microfrontends
        </p>
      </header>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
        <section style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, color: '#800' }}>Local Component</h3>
          <LocalButton />
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            This button is served from App 1's local bundle
          </p>
        </section>

        <section style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, color: '#008' }}>Remote Component (App 2)</h3>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading App 2 Button..." />}>
              <RemoteButton />
            </Suspense>
          </ErrorBoundary>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            This button is loaded from App 2 via Module Federation
            {remoteLoadTime && ` (loaded in ${remoteLoadTime}ms)`}
          </p>
        </section>
      </div>

      <section
        style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0, color: '#2d5016' }}>Automatic Vendor Sharing Info</h3>
        <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '10px' }}>
          This example demonstrates AutomaticVendorFederation, which intelligently shares
          dependencies between microfrontends to optimize bundle sizes and prevent duplicate code.
        </p>
        <div style={{ fontSize: '12px', color: '#2d5016' }}>
          <strong>Shared Dependencies:</strong> {sharedDependencies.join(', ')}
          <br />
          <strong>Load Strategy:</strong> loaded-first (uses the first loaded version)
          <br />
          <strong>Benefits:</strong> Reduced bundle size, faster loading, consistent dependency
          versions
        </div>
      </section>
    </div>
  );
};

export default App;
