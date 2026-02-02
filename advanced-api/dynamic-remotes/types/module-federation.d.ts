/**
 * Module Federation Type Definitions
 *
 * Provides type safety for remote modules and federation APIs
 */

declare module '@module-federation/runtime' {
  export interface FederationRuntimePlugin {
    name: string;
    init?(args: InitOptions): void | Promise<void>;
    loadRemote?(args: LoadRemoteArgs, next: (args: LoadRemoteArgs) => Promise<any>): Promise<any>;
  }

  export interface InitOptions {
    name: string;
    remotes?: RemoteConfig[];
    plugins?: FederationRuntimePlugin[];
    shared?: SharedConfig;
  }

  export interface RemoteConfig {
    name: string;
    entry: string;
    alias?: string;
  }

  export interface LoadRemoteArgs {
    id: string;
    url: string;
    from?: string;
    remoteName?: string;
  }

  export interface SharedConfig {
    [key: string]: SharedDependency;
  }

  export interface SharedDependency {
    singleton?: boolean;
    requiredVersion?: string;
    strictVersion?: boolean;
    eager?: boolean;
    import?: string;
    shareKey?: string;
    shareScope?: string;
  }

  export function init(options: InitOptions): Promise<void>;
  export function loadRemote<T = any>(id: string): Promise<{ default: T }>;
  export function registerRemotes(remotes: RemoteConfig[]): void;
  export function getRemotes(): RemoteConfig[];
}

declare module '@module-federation/enhanced' {
  export interface ModuleFederationPluginOptions {
    name: string;
    filename?: string;
    exposes?: Record<string, string>;
    remotes?: Record<string, string>;
    shared?: SharedConfig;
    library?: {
      type: string;
      name?: string;
    };
    dts?: {
      generateTypes?: boolean;
      generateAPITypes?: boolean;
      consumeAPITypes?: boolean;
      typesFolder?: string;
    };
    manifest?: {
      fileName?: string;
      getPublicPath?: () => string;
    };
    runtime?: boolean;
    experiments?: {
      federationRuntime?: string;
    };
  }

  export class ModuleFederationPlugin {
    constructor(options: ModuleFederationPluginOptions);
  }

  export interface SharedConfig {
    [key: string]: SharedDependency;
  }

  export interface SharedDependency {
    singleton?: boolean;
    requiredVersion?: string;
    strictVersion?: boolean;
    eager?: boolean;
    import?: string;
    shareKey?: string;
    shareScope?: string;
  }
}

declare module '@module-federation/enhanced/rspack' {
  export * from '@module-federation/enhanced';
}

// Global type declarations for remote modules
declare global {
  interface Window {
    __FEDERATION__: {
      remotes: Record<string, any>;
      shared: Record<string, any>;
    };
  }
}

// Remote module declarations
declare module 'app2/Widget' {
  import { ComponentType } from 'react';
  const Widget: ComponentType;
  export default Widget;
}

declare module 'app3/Widget' {
  import { ComponentType } from 'react';
  const Widget: ComponentType;
  export default Widget;
}

// Type utilities for dynamic remote loading
export interface RemoteComponentProps {
  module: string;
  scope: string;
}

export interface DynamicImportHook {
  component: React.ComponentType | null;
  loading: boolean;
  error: Error | null;
  retryCount: number;
  retry: () => void;
}

export interface RuntimePluginOptions {
  retry?: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    onRetry?: (attempt: number, error: Error, args: LoadRemoteArgs) => void;
    onFailure?: (error: Error, args: LoadRemoteArgs) => void;
  };
  performance?: {
    enableLogging?: boolean;
    slowThreshold?: number;
    onSlowLoad?: (loadTime: number, args: LoadRemoteArgs) => void;
    onLoadSuccess?: (loadTime: number, args: LoadRemoteArgs) => void;
  };
  healthCheck?: {
    timeout?: number;
    enableCheck?: boolean;
    onHealthCheckFail?: (error: Error, args: LoadRemoteArgs) => void;
  };
  errorBoundary?: {
    errorReporting?: boolean;
    maxErrorReports?: number;
    onError?: (errorInfo: ErrorInfo) => void;
  };
  cache?: {
    cacheTTL?: number;
    maxCacheSize?: number;
  };
}

export interface ErrorInfo {
  remoteId: string;
  url: string;
  error: string;
  stack?: string;
  timestamp: string;
  count: number;
  userAgent: string;
}

export {};
