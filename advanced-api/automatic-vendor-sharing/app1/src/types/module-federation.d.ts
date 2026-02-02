declare module 'app2/Button' {
  import { ComponentType } from 'react';
  const Button: ComponentType;
  export default Button;
}

declare module 'app2/ErrorBoundary' {
  import { ComponentType } from 'react';
  const ErrorBoundary: ComponentType<{
    children: React.ReactNode;
    fallback?: React.ComponentType<any>;
  }>;
  export default ErrorBoundary;
}
