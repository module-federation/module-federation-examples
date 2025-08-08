import { lazy, useEffect, useState, useCallback, useRef } from 'react';
import { registerRemotes, loadRemote } from '@module-federation/runtime';

// Enhanced loading function with retry logic
function loadComponent(scope, module, maxRetries = 3, retryDelay = 1000) {
  return async () => {
    if (!scope || !module) {
      console.warn('useFederatedComponent: scope and module are required');
      return { default: () => null };
    }

    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Loading remote: ${scope}${module.replace('.', '')} (attempt ${attempt}/${maxRetries})`);
        const result = await loadRemote(scope + module.replace('.', ''));
        
        if (result) {
          console.log(`Successfully loaded remote: ${scope}${module.replace('.', '')}`);
          return result;
        }
        throw new Error('Remote loaded but returned null/undefined');
      } catch (error) {
        lastError = error;
        console.warn(`Failed to load remote (attempt ${attempt}/${maxRetries}):`, error.message);
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        }
      }
    }
    
    throw new Error(`Failed to load remote ${scope}${module.replace('.', '')} after ${maxRetries} attempts: ${lastError.message}`);
  };
}

// Component cache with TTL (Time To Live)
class ComponentCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.TTL = 5 * 60 * 1000; // 5 minutes
  }

  get(key) {
    const timestamp = this.timestamps.get(key);
    if (timestamp && Date.now() - timestamp > this.TTL) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
    this.timestamps.set(key, Date.now());
  }

  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }
}

const componentCache = new ComponentCache();

export const useFederatedComponent = (
  remoteUrl, 
  scope, 
  module, 
  options = {}
) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    enableCache = true,
    timeout = 10000
  } = options;

  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef(null);

  const key = `${remoteUrl}-${scope}-${module}`;

  console.log('useFederatedComponent:', { remoteUrl, scope, module, key });

  // Register remote if URL and scope are provided
  useEffect(() => {
    if (scope && remoteUrl) {
      try {
        registerRemotes([
          {
            name: scope,
            entry: remoteUrl,
          },
        ]);
        console.log(`Registered remote: ${scope} at ${remoteUrl}`);
      } catch (err) {
        console.error(`Failed to register remote ${scope}:`, err);
        setError(err);
      }
    }
  }, [scope, remoteUrl]);

  const loadComponentWithTimeout = useCallback(async () => {
    if (!scope || !module || !remoteUrl) {
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);

    try {
      // Check cache first
      if (enableCache) {
        const cachedComponent = componentCache.get(key);
        if (cachedComponent) {
          console.log(`Using cached component for: ${key}`);
          setComponent(cachedComponent);
          setLoading(false);
          return;
        }
      }

      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout)
      );

      // Create abort promise
      const abortPromise = new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
          reject(new Error('Request aborted'));
        });
      });

      // Load component with timeout and abort capability
      const componentLoader = loadComponent(scope, module, maxRetries, retryDelay);
      const loadPromise = componentLoader();

      const result = await Promise.race([loadPromise, timeoutPromise, abortPromise]);
      
      if (signal.aborted) {
        return;
      }

      const LazyComponent = lazy(() => Promise.resolve(result));
      
      if (enableCache) {
        componentCache.set(key, LazyComponent);
      }
      
      setComponent(LazyComponent);
      setRetryCount(0);
    } catch (err) {
      if (signal.aborted) {
        return;
      }
      
      console.error(`Error loading federated component:`, err);
      setError(err);
      setRetryCount(prev => prev + 1);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [scope, module, remoteUrl, key, maxRetries, retryDelay, enableCache, timeout]);

  // Reset component when key changes
  useEffect(() => {
    if (Component) {
      setComponent(null);
    }
  }, [key]);

  // Load component
  useEffect(() => {
    if (!Component && !loading && scope && module && remoteUrl) {
      loadComponentWithTimeout();
    }
  }, [Component, loading, loadComponentWithTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const retry = useCallback(() => {
    setError(null);
    setComponent(null);
    loadComponentWithTimeout();
  }, [loadComponentWithTimeout]);

  const clearCache = useCallback(() => {
    componentCache.delete(key);
    setComponent(null);
    setError(null);
  }, [key]);

  return {
    Component,
    loading,
    error,
    retry,
    retryCount,
    clearCache,
    // Legacy compatibility
    errorLoading: error
  };
};

// Utility function to preload a remote
export const preloadRemote = async (remoteUrl, scope, module, options = {}) => {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  
  try {
    if (scope && remoteUrl) {
      registerRemotes([
        {
          name: scope,
          entry: remoteUrl,
        },
      ]);
    }
    
    const componentLoader = loadComponent(scope, module, maxRetries, retryDelay);
    await componentLoader();
    console.log(`Preloaded remote: ${scope}${module.replace('.', '')}`);
  } catch (error) {
    console.error(`Failed to preload remote:`, error);
    throw error;
  }
};

export default useFederatedComponent;