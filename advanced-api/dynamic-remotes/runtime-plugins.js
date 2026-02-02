/**
 * Module Federation Runtime Plugins
 *
 * These plugins provide enhanced error handling, retry mechanisms,
 * and performance monitoring for dynamic remote loading.
 */

/**
 * Retry Plugin for failed remote loads
 * Implements exponential backoff retry strategy
 */
class RetryPlugin {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 5000;
    this.onRetry = options.onRetry || (() => {});
    this.onFailure = options.onFailure || (() => {});
  }

  name = 'retry-plugin';

  async loadRemote(args, next) {
    let lastError;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await next(args);
      } catch (error) {
        lastError = error;

        if (attempt === this.maxRetries - 1) {
          console.error(`Failed to load remote after ${this.maxRetries} attempts:`, error);
          this.onFailure(error, args);
          throw error;
        }

        const delay = Math.min(this.baseDelay * Math.pow(2, attempt), this.maxDelay);

        console.warn(
          `Retry attempt ${attempt + 1}/${this.maxRetries} for remote ${args.id} in ${delay}ms`,
          error,
        );
        this.onRetry(attempt + 1, error, args);

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
}

/**
 * Performance Monitoring Plugin
 * Tracks remote loading performance and network issues
 */
class PerformancePlugin {
  constructor(options = {}) {
    this.enableLogging = options.enableLogging !== false;
    this.slowThreshold = options.slowThreshold || 3000;
    this.onSlowLoad = options.onSlowLoad || (() => {});
    this.onLoadSuccess = options.onLoadSuccess || (() => {});
  }

  name = 'performance-plugin';

  async loadRemote(args, next) {
    const startTime = performance.now();

    try {
      const result = await next(args);
      const loadTime = performance.now() - startTime;

      if (this.enableLogging) {
        console.log(`Successfully loaded remote ${args.id} in ${loadTime.toFixed(2)}ms`);
      }

      if (loadTime > this.slowThreshold) {
        this.onSlowLoad(loadTime, args);
      }

      this.onLoadSuccess(loadTime, args);
      return result;
    } catch (error) {
      const loadTime = performance.now() - startTime;
      console.error(`Failed to load remote ${args.id} after ${loadTime.toFixed(2)}ms:`, error);
      throw error;
    }
  }
}

/**
 * Health Check Plugin
 * Validates remote availability before attempting to load
 */
class HealthCheckPlugin {
  constructor(options = {}) {
    this.timeout = options.timeout || 5000;
    this.enableCheck = options.enableCheck !== false;
    this.onHealthCheckFail = options.onHealthCheckFail || (() => {});
  }

  name = 'health-check-plugin';

  async loadRemote(args, next) {
    if (!this.enableCheck) {
      return next(args);
    }

    try {
      // Basic health check by trying to fetch the remote entry
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(args.url, {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
      }

      return await next(args);
    } catch (error) {
      console.warn(`Health check failed for remote ${args.id}:`, error.message);
      this.onHealthCheckFail(error, args);

      // Still attempt to load, as the health check might fail due to CORS
      // but the actual module loading might work
      return await next(args);
    }
  }
}

/**
 * Error Boundary Plugin
 * Provides comprehensive error tracking and reporting
 */
class ErrorBoundaryPlugin {
  constructor(options = {}) {
    this.onError = options.onError || (() => {});
    this.errorReporting = options.errorReporting !== false;
    this.maxErrorReports = options.maxErrorReports || 10;
    this.errorCounts = new Map();
  }

  name = 'error-boundary-plugin';

  async loadRemote(args, next) {
    try {
      return await next(args);
    } catch (error) {
      const errorKey = `${args.id}-${error.name}`;
      const errorCount = (this.errorCounts.get(errorKey) || 0) + 1;
      this.errorCounts.set(errorKey, errorCount);

      const errorInfo = {
        remoteId: args.id,
        url: args.url,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        count: errorCount,
        userAgent: navigator.userAgent,
      };

      if (this.errorReporting && errorCount <= this.maxErrorReports) {
        console.error('Module Federation Error:', errorInfo);
        this.onError(errorInfo);
      }

      throw error;
    }
  }
}

/**
 * Cache Plugin
 * Implements intelligent caching for remote modules
 */
class CachePlugin {
  constructor(options = {}) {
    this.cacheTTL = options.cacheTTL || 5 * 60 * 1000; // 5 minutes
    this.maxCacheSize = options.maxCacheSize || 50;
    this.cache = new Map();
    this.cacheTimestamps = new Map();
  }

  name = 'cache-plugin';

  async loadRemote(args, next) {
    const cacheKey = `${args.id}-${args.url}`;
    const now = Date.now();

    // Check if we have a valid cached version
    if (this.cache.has(cacheKey)) {
      const cacheTime = this.cacheTimestamps.get(cacheKey);
      if (now - cacheTime < this.cacheTTL) {
        console.log(`Loading remote ${args.id} from cache`);
        return this.cache.get(cacheKey);
      } else {
        // Cache expired
        this.cache.delete(cacheKey);
        this.cacheTimestamps.delete(cacheKey);
      }
    }

    // Load fresh and cache
    const result = await next(args);

    // Implement LRU cache size limit
    if (this.cache.size >= this.maxCacheSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      this.cacheTimestamps.delete(oldestKey);
    }

    this.cache.set(cacheKey, result);
    this.cacheTimestamps.set(cacheKey, now);

    return result;
  }
}

/**
 * Create default runtime plugins with sensible defaults
 */
function createDefaultPlugins(customOptions = {}) {
  const options = {
    retry: {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 5000,
      ...customOptions.retry,
    },
    performance: {
      enableLogging: process.env.NODE_ENV === 'development',
      slowThreshold: 3000,
      ...customOptions.performance,
    },
    healthCheck: {
      timeout: 5000,
      enableCheck: process.env.NODE_ENV === 'development',
      ...customOptions.healthCheck,
    },
    errorBoundary: {
      errorReporting: true,
      maxErrorReports: 10,
      ...customOptions.errorBoundary,
    },
    cache: {
      cacheTTL: 5 * 60 * 1000,
      maxCacheSize: 50,
      ...customOptions.cache,
    },
  };

  return [
    new CachePlugin(options.cache),
    new HealthCheckPlugin(options.healthCheck),
    new PerformancePlugin(options.performance),
    new RetryPlugin(options.retry),
    new ErrorBoundaryPlugin(options.errorBoundary),
  ];
}

module.exports = {
  RetryPlugin,
  PerformancePlugin,
  HealthCheckPlugin,
  ErrorBoundaryPlugin,
  CachePlugin,
  createDefaultPlugins,
};
