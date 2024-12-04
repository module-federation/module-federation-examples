import LocalButton from './Button';
import React from 'react';

const RemoteButton = React.lazy(() => import('app1/Button'));

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
};

const headerStyle = {
  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  padding: '2rem',
  borderRadius: '12px',
  color: 'white',
  marginBottom: '2rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  marginBottom: '2rem',
  flexWrap: 'wrap',
};

const App = () => (
  <div style={containerStyle}>
    <div style={headerStyle}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>Share Control Panel</h1>
      <h2 style={{ margin: '0', opacity: '0.9', fontWeight: '400' }}>App 2</h2>
    </div>

    <div style={buttonContainerStyle}>
      <LocalButton />
      <React.Suspense fallback={
        <div style={{ 
          padding: '12px 24px',
          background: '#f0f0f0',
          borderRadius: '6px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          color: '#666'
        }}>
          Loading Button...
        </div>
      }>
        <RemoteButton />
      </React.Suspense>
    </div>
  </div>
);

export default App;
