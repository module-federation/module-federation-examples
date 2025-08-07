import React, { createContext, useCallback, useMemo } from 'react';
import Main from './Main';
import useFetchJson from '../hooks/useFetchJson';

export const EnvContext = createContext();

const App = () => {
  const validateData = useCallback((data) => data && typeof data === 'object', []);
  
  const fallbackData = useMemo(() => ({
    API_URL: 'https://fallback.api.com',
    REMOTE_URL: 'http://localhost:3001/remoteEntry.js'
  }), []);

  const { data, loading, error, retry } = useFetchJson(
    '/env-config.json',
    {
      maxRetries: 2,
      retryDelay: 500,
      timeout: 3000,
      validateData,
      fallbackData
    }
  );

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007acc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <div>Loading environment configuration...</div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '400px',
          padding: '20px',
          border: '1px solid #f44336',
          borderRadius: '8px',
          backgroundColor: '#ffebee',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#d32f2f', marginTop: 0 }}>Configuration Error</h2>
          <p style={{ color: '#666' }}>
            Failed to load environment configuration: {error.message}
          </p>
          <button
            onClick={retry}
            style={{
              backgroundColor: '#007acc',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <EnvContext.Provider value={data}>
      {error && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          color: '#856404',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>Warning:</strong> Using fallback configuration due to loading error: {error.message}
        </div>
      )}
      <Main />
    </EnvContext.Provider>
  );
};

export default App;
