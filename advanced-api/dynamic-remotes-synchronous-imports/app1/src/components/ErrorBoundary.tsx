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
      prevResetKeys: props.resetKeys || []
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
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
        prevResetKeys: resetKeys
      };
    }
    
    return { prevResetKeys: resetKeys };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught an error:', error);
    console.error('[ErrorBoundary] Error info:', errorInfo);
    
    this.setState({
      error,
      errorInfo
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
      errorInfo: null
    });
  };

  private handleAutoRetry = () => {
    this.resetTimeoutId = window.setTimeout(() => {
      console.log('[ErrorBoundary] Auto-retrying after error...');\n      this.handleRetry();\n    }, 5000);\n  };\n\n  private renderDefaultFallback() {\n    const { error, errorInfo } = this.state;\n    const isModuleFederationError = error?.message?.includes('Loading') || \n                                   error?.message?.includes('remote') ||\n                                   error?.name === 'ChunkLoadError';\n\n    return (\n      <div style={{\n        padding: '20px',\n        margin: '20px',\n        border: '2px solid #ff6b6b',\n        borderRadius: '8px',\n        backgroundColor: '#ffe0e0',\n        color: '#d63031'\n      }}>\n        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>\n          {isModuleFederationError ? \n            '🔌 Remote Module Loading Error' : \n            '⚠️ Something went wrong'\n          }\n        </h2>\n        \n        <p style={{ margin: '0 0 16px 0', fontSize: '14px' }}>\n          {isModuleFederationError ? (\n            <>This usually happens when a remote module is unavailable or the URL is incorrect.</>\n          ) : (\n            <>An unexpected error occurred while rendering this component.</>\n          )}\n        </p>\n        \n        <div style={{ marginBottom: '16px' }}>\n          <button \n            onClick={this.handleRetry}\n            style={{\n              padding: '8px 16px',\n              marginRight: '8px',\n              backgroundColor: '#0984e3',\n              color: 'white',\n              border: 'none',\n              borderRadius: '4px',\n              cursor: 'pointer'\n            }}\n          >\n            🔄 Retry\n          </button>\n          \n          {isModuleFederationError && (\n            <button \n              onClick={this.handleAutoRetry}\n              style={{\n                padding: '8px 16px',\n                backgroundColor: '#fdcb6e',\n                color: '#2d3436',\n                border: 'none',\n                borderRadius: '4px',\n                cursor: 'pointer'\n              }}\n            >\n              ⏰ Auto-retry in 5s\n            </button>\n          )}\n        </div>\n        \n        {process.env.NODE_ENV === 'development' && (\n          <details style={{ fontSize: '12px', marginTop: '16px' }}>\n            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>\n              🐛 Debug Information\n            </summary>\n            <pre style={{\n              marginTop: '8px',\n              padding: '8px',\n              backgroundColor: '#f8f9fa',\n              border: '1px solid #dee2e6',\n              borderRadius: '4px',\n              overflow: 'auto',\n              fontSize: '11px'\n            }}>\n              <strong>Error:</strong> {error?.toString()}\n              {errorInfo?.componentStack && (\n                <>\n                  {'\n\n'}<strong>Component Stack:</strong>{errorInfo.componentStack}\n                </>\n              )}\n            </pre>\n          </details>\n        )}\n      </div>\n    );\n  }\n\n  render() {\n    if (this.state.hasError) {\n      // Render custom fallback UI or default\n      return this.props.fallback || this.renderDefaultFallback();\n    }\n\n    return this.props.children;\n  }\n}\n\n/**\n * Hook version of Error Boundary for functional components\n * Note: This is a wrapper that uses the class-based ErrorBoundary\n */\nexport function withErrorBoundary<P extends object>(\n  Component: React.ComponentType<P>,\n  errorBoundaryProps?: Omit<Props, 'children'>\n) {\n  const WrappedComponent = (props: P) => (\n    <ErrorBoundary {...errorBoundaryProps}>\n      <Component {...props} />\n    </ErrorBoundary>\n  );\n  \n  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;\n  \n  return WrappedComponent;\n}\n\nexport default ErrorBoundary;