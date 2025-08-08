import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Module Federation Error Boundary caught an error:', error, errorInfo);
  }

  private retry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error!} retry={this.retry} />;
      }

      return (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ff6b6b', 
          borderRadius: '4px', 
          backgroundColor: '#ffe0e0',
          margin: '10px 0'
        }}>
          <h3>Module Loading Error</h3>
          <p>Failed to load remote module. This might be due to:</p>
          <ul>
            <li>Network connectivity issues</li>
            <li>Remote application is not running</li>
            <li>Version compatibility problems</li>
          </ul>
          <button 
            onClick={this.retry}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
          <details style={{ marginTop: '10px' }}>
            <summary>Error Details</summary>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error?.message}
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;