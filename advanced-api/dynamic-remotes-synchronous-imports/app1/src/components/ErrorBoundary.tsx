import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  prevResetKeys: Array<string | number>;
}

/**
 * Enhanced Error Boundary for Module Federation
 *
 * Provides robust error handling for:
 * - Remote module loading failures
 * - Runtime errors in federated components
 * - Network issues during dynamic imports
 * - Graceful fallback UI rendering
 */
export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      prevResetKeys: props.resetKeys || [],
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    const { resetKeys = [] } = props;
    const { prevResetKeys } = state;

    // Reset error state if resetKeys have changed
    if (state.hasError && resetKeys.some((key, idx) => key !== prevResetKeys[idx])) {
      return {
        hasError: false,
        error: null,
        errorInfo: null,
        prevResetKeys: resetKeys,
      };
    }

    return { prevResetKeys: resetKeys };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught an error:', error);
    console.error('[ErrorBoundary] Error info:', errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service if in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Implementation for logging to external error tracking service
    // This could be Sentry, LogRocket, Bugsnag, etc.
    console.log('[ErrorBoundary] Would log to error service:', { error, errorInfo });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleAutoRetry = () => {
    this.resetTimeoutId = window.setTimeout(() => {
      // Check if component is still mounted before retrying
      if (this.state.hasError) {
        console.log('[ErrorBoundary] Auto-retrying after error...');
        this.handleRetry();
      }
    }, 5000);
  };

  private renderDefaultFallback() {
    const { error, errorInfo } = this.state;
    const isModuleFederationError =
      error?.message?.includes('Loading') ||
      error?.message?.includes('remote') ||
      error?.name === 'ChunkLoadError';

    return (
      <div
        style={{
          padding: '20px',
          margin: '20px',
          border: '2px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          color: '#d63031',
        }}
      >
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
          {isModuleFederationError ? '🔌 Remote Module Loading Error' : '⚠️ Something went wrong'}
        </h2>

        <p style={{ margin: '0 0 16px 0', fontSize: '14px' }}>
          {isModuleFederationError ? (
            <>This usually happens when a remote module is unavailable or the URL is incorrect.</>
          ) : (
            <>An unexpected error occurred while rendering this component.</>
          )}
        </p>

        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={this.handleRetry}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              backgroundColor: '#0984e3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Retry
          </button>

          {isModuleFederationError && (
            <button
              onClick={this.handleAutoRetry}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fdcb6e',
                color: '#2d3436',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ⏰ Auto-retry in 5s
            </button>
          )}
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details style={{ fontSize: '12px', marginTop: '16px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🐛 Debug Information
            </summary>
            <pre
              style={{
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '11px',
              }}
            >
              <strong>Error:</strong> {error?.toString()}
              {errorInfo?.componentStack && (
                <>
                  {'\n\n'}
                  <strong>Component Stack:</strong>
                  {errorInfo.componentStack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or default
      return this.props.fallback || this.renderDefaultFallback();
    }

    return this.props.children;
  }
}

/**
 * Hook version of Error Boundary for functional components
 * Note: This is a wrapper that uses the class-based ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>,
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

export default ErrorBoundary;
