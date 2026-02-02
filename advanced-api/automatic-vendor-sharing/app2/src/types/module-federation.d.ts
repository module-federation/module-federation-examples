declare module 'app1/Button' {
  import { ComponentType } from 'react';
  const Button: ComponentType;
  export default Button;
}

declare module 'app1/ErrorBoundary' {
  import { ComponentType } from 'react';
  const ErrorBoundary: ComponentType<{
    children: React.ReactNode;
    fallback?: React.ComponentType<any>;
  }>;
  export default ErrorBoundary;
}
