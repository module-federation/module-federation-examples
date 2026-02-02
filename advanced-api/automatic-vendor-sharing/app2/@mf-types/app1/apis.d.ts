export type RemoteKeys = 'app1/Button' | 'app1/ErrorBoundary';
type PackageType<T> = T extends 'app1/ErrorBoundary'
  ? typeof import('app1/ErrorBoundary')
  : T extends 'app1/Button'
    ? typeof import('app1/Button')
    : any;
