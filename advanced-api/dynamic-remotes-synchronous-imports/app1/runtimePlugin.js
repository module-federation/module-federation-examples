/**
 * Enhanced runtime plugin for dynamic remote URL resolution
 * Supports synchronous imports while dynamically changing remote URLs at runtime
 * 
 * This plugin implements Module Federation 2.0 runtime hooks to enable:
 * - Dynamic remote URL resolution based on global variables
 * - Fallback mechanisms for failed remote loads
 * - Comprehensive error handling and logging
 * - URL validation and security checks
 * 
 * @returns {import('@module-federation/enhanced/runtime').ModuleFederationRuntimePlugin}
 */
const getDynamicRemotePlugin = () => {
  // Plugin state management
  const pluginState = {
    resolvedUrls: new Map(),
    failedRemotes: new Set(),
    retryAttempts: new Map(),
    maxRetries: 3
  };

  /**
   * Enhanced URL resolution with fallback support
   * @param {string} remoteName - Name of the remote
   * @param {string} originalEntry - Original entry URL
   * @returns {string} Resolved URL
   */
  const resolveRemoteUrl = (remoteName, originalEntry) => {
    const globalVarName = `${remoteName}Url`;
    const fallbackVarName = `${remoteName}FallbackUrl`;
    
    // Check if URL was already resolved and cached
    if (pluginState.resolvedUrls.has(remoteName)) {
      return pluginState.resolvedUrls.get(remoteName);
    }

    let resolvedUrl = originalEntry;

    // Try primary URL from global variable
    if (typeof window !== 'undefined' && window[globalVarName]) {
      const placeholderPattern = /\[window\.[^\]]+]/;
      const match = originalEntry.match(placeholderPattern);
      
      if (match) {
        const pathAfterPlaceholder = originalEntry.split(placeholderPattern)[1] || '';
        const candidateUrl = window[globalVarName] + pathAfterPlaceholder;
        
        if (isValidRemoteUrl(candidateUrl)) {
          resolvedUrl = candidateUrl;
          console.log(`[Dynamic Remote Plugin] Resolved URL for '${remoteName}':`, {
            source: 'primary',
            url: resolvedUrl
          });
          console.log(`[get-remote-from-window-plugin] app2Url resolved: ${resolvedUrl}`);
        }
      }
    }
    
    // Try fallback URL if primary failed or unavailable
    if (resolvedUrl === originalEntry && typeof window !== 'undefined' && window[fallbackVarName]) {
      const fallbackUrl = window[fallbackVarName];
      if (isValidRemoteUrl(fallbackUrl)) {
        resolvedUrl = fallbackUrl;
        console.log(`[Dynamic Remote Plugin] Using fallback URL for '${remoteName}':`, resolvedUrl);
      }
    }

    // Cache the resolved URL
    pluginState.resolvedUrls.set(remoteName, resolvedUrl);
    return resolvedUrl;
  };

  return {
    name: 'enhanced-dynamic-remote-plugin',
    version: '2.0.0',
    
    /**
     * init hook - called when the plugin is initialized
     */
    init: (args) => {
      console.log('[Dynamic Remote Plugin] Initializing enhanced dynamic remote plugin v2.0.0');
      
      // Setup global error handlers for remote loading
      if (typeof window !== 'undefined') {
        window.addEventListener('unhandledrejection', (event) => {
          if (event.reason?.message?.includes('Loading script failed')) {
            console.error('[Dynamic Remote Plugin] Remote script loading failed:', event.reason);
          }
        });
      }
      
      return args;
    },
    
    /**
     * beforeRequest hook - called before resolving remote modules
     */
    beforeRequest: (args) => {
      try {
        console.log('[Dynamic Remote Plugin] Processing request:', {
          id: args.id,
          remotesCount: args.options?.remotes?.length || 0
        });
        
        // Validate args structure
        if (!args.options || !Array.isArray(args.options.remotes)) {
          console.warn('[Dynamic Remote Plugin] Invalid args structure, skipping processing');
          return args;
        }

        // Process each remote configuration
        args.options.remotes.forEach((remote, index) => {
          if (!remote || !remote.name || !remote.entry) {
            console.warn(`[Dynamic Remote Plugin] Invalid remote configuration at index ${index}:`, remote);
            return;
          }

          // Skip if this remote has failed too many times
          const retryCount = pluginState.retryAttempts.get(remote.name) || 0;
          if (retryCount >= pluginState.maxRetries) {
            console.warn(`[Dynamic Remote Plugin] Skipping remote '${remote.name}' - max retries exceeded`);
            return;
          }

          // Resolve the remote URL with fallback support
          const resolvedUrl = resolveRemoteUrl(remote.name, remote.entry);
          
          if (resolvedUrl !== remote.entry) {
            console.log(`[Dynamic Remote Plugin] URL resolved for '${remote.name}':`, {
              original: remote.entry,
              resolved: resolvedUrl
            });
            remote.entry = resolvedUrl;
          }
        });

        return args;
      } catch (error) {
        console.error('[Dynamic Remote Plugin] Error in beforeRequest hook:', error);
        // Return original args to prevent breaking the application
        return args;
      }
    },

    /**
     * Enhanced error handling for remote loading failures
     */
    errorLoadRemote: (args) => {
      const { id, error, origin } = args;
      const remoteName = id?.split('/')[0];
      
      if (remoteName) {
        // Track retry attempts
        const currentRetries = pluginState.retryAttempts.get(remoteName) || 0;
        pluginState.retryAttempts.set(remoteName, currentRetries + 1);
        
        // Mark as failed if max retries exceeded
        if (currentRetries >= pluginState.maxRetries) {
          pluginState.failedRemotes.add(remoteName);
          console.error(`[Dynamic Remote Plugin] Remote '${remoteName}' marked as failed after ${pluginState.maxRetries} attempts`);
        }
      }
      
      console.error('[Dynamic Remote Plugin] Failed to load remote:', {
        id,
        remoteName,
        error: error?.message || error,
        origin,
        retryAttempt: pluginState.retryAttempts.get(remoteName) || 0
      });
      
      return args;
    },

    /**
     * afterResolve hook - called after a remote is successfully resolved
     */
    afterResolve: (args) => {
      const remoteName = args.id?.split('/')[0];
      if (remoteName && pluginState.failedRemotes.has(remoteName)) {
        // Remote recovered, remove from failed list
        pluginState.failedRemotes.delete(remoteName);
        pluginState.retryAttempts.delete(remoteName);
        console.log(`[Dynamic Remote Plugin] Remote '${remoteName}' recovered successfully`);
      }
      return args;
    },

    /**
     * Expose plugin state for debugging
     */
    getPluginState: () => ({
      resolvedUrls: Object.fromEntries(pluginState.resolvedUrls),
      failedRemotes: Array.from(pluginState.failedRemotes),
      retryAttempts: Object.fromEntries(pluginState.retryAttempts)
    })
  };
};

/**
 * Enhanced URL validation for Module Federation remotes
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
function isValidRemoteUrl(url) {
  try {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Remove whitespace
    url = url.trim();

    // Check for basic URL structure
    const hasValidProtocol = url.startsWith('http://') || 
                            url.startsWith('https://') || 
                            url.startsWith('//') || 
                            url.startsWith('/');
    
    if (!hasValidProtocol) {
      return false;
    }

    // Must end with .js for Module Federation
    if (!url.endsWith('.js')) {
      return false;
    }

    // Security check: prevent javascript: URLs and other dangerous schemes
    if (url.toLowerCase().includes('javascript:') || 
        url.toLowerCase().includes('data:') ||
        url.toLowerCase().includes('vbscript:')) {
      return false;
    }

    // For full URLs, validate with URL constructor
    if (url.startsWith('http')) {
      try {
        new URL(url);
      } catch {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Utility function to expose plugin debugging information globally
 */
if (typeof window !== 'undefined') {
  window.__MF_DEBUG__ = {
    getDynamicRemotePluginState: () => {
      // This will be set by the plugin instance
      return window.__MF_PLUGIN_STATE__ || null;
    }
  };
}

// CommonJS export for webpack runtime plugin compatibility
module.exports = getDynamicRemotePlugin;

// Also expose as named export for modern import syntax
module.exports.getDynamicRemotePlugin = getDynamicRemotePlugin;
module.exports.isValidRemoteUrl = isValidRemoteUrl;

// Set up global debugging state if in browser
if (typeof window !== 'undefined') {
  const pluginInstance = getDynamicRemotePlugin();
  if (pluginInstance.getPluginState) {
    window.__MF_PLUGIN_STATE__ = pluginInstance.getPluginState;
  }
}
