import React, { createContext, useMemo } from 'react';
import Widget from './Widget';
import useFetchJson from '../hooks/useFetchJson';

export const EnvContext = createContext();

// Wraps the Widget component with the EnvContext
const WidgetWrapper = () => {
  // Memoize fetch options to prevent repeated fetching in React strict mode
  const fetchOptions = useMemo(
    () => ({
      maxRetries: 3,
      retryDelay: 1000,
      timeout: 5000,
      validateData: data => data && typeof data === 'object',
      fallbackData: {
        API_URL: 'https://remote.fallback.api.com',
      },
    }),
    [],
  );

  const { data, loading, error, retry } = useFetchJson(
    `${__webpack_public_path__}env-config.json`,
    fetchOptions,
  );

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #f3f3f3',
              borderTop: '2px solid #9c27b0',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 8px',
            }}
          ></div>
          <div style={{ fontSize: '14px', color: '#666' }}>Loading remote configuration...</div>
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
      <div
        style={{
          padding: '20px',
          border: '1px solid #f44336',
          borderRadius: '8px',
          backgroundColor: '#ffebee',
          margin: '10px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <h3 style={{ color: '#d32f2f', marginTop: 0 }}>Remote Configuration Error</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Failed to load remote configuration: {error.message}
        </p>
        <button
          onClick={retry}
          style={{
            backgroundColor: '#9c27b0',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <EnvContext.Provider value={data}>
      {error && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            color: '#856404',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          <strong>Warning:</strong> Using fallback configuration: {error.message}
        </div>
      )}
      <Widget />
    </EnvContext.Provider>
  );
};

export default WidgetWrapper;
