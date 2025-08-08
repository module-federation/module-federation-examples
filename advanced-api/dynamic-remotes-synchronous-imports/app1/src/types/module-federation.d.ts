/**
 * Type definitions for Module Federation dynamic remotes
 */

declare module 'app2/Widget' {
  import { ComponentType } from 'react';
  const WidgetRemote: ComponentType;
  export default WidgetRemote;
}

// Global window extensions for dynamic remote URL configuration
declare global {
  interface Window {
    /**
     * Global variable for app2 remote URL
     * Set this before the application loads to dynamically configure the remote URL
     */
    app2Url?: string;
    
    /**
     * Fallback URL for app2 remote
     * Used when the primary URL fails to load
     */
    app2FallbackUrl?: string;
    
    /**
     * Module Federation debugging utilities
     */
    __MF_DEBUG__?: {
      getDynamicRemotePluginState?: () => {
        resolvedUrls: Record<string, string>;
        failedRemotes: string[];
        retryAttempts: Record<string, number>;
      } | null;
    };
    
    /**
     * Internal Module Federation plugin state (for debugging)
     */
    __MF_PLUGIN_STATE__?: () => {
      resolvedUrls: Record<string, string>;
      failedRemotes: string[];
      retryAttempts: Record<string, number>;
    };
  }
}

/**
 * Module Federation runtime plugin types
 */
export interface ModuleFederationRuntimePlugin {
  name: string;
  version?: string;
  init?: (args: any) => any;
  beforeRequest?: (args: BeforeRequestArgs) => BeforeRequestArgs;
  afterResolve?: (args: any) => any;
  errorLoadRemote?: (args: ErrorLoadRemoteArgs) => any;
  getPluginState?: () => PluginState;
}

export interface BeforeRequestArgs {
  id: string;
  options: {
    remotes: RemoteConfig[];
  };
}

export interface RemoteConfig {
  name: string;
  entry: string;
  [key: string]: any;
}

export interface ErrorLoadRemoteArgs {
  id: string;
  error: Error | string;
  origin?: string;
}

export interface PluginState {
  resolvedUrls: Record<string, string>;
  failedRemotes: string[];
  retryAttempts: Record<string, number>;
}

export {};