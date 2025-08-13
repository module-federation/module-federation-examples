/**
 * Enhanced Module Federation Configuration
 * 
 * This configuration demonstrates advanced patterns for dynamic remote URL resolution
 * while maintaining synchronous imports. Features include:
 * - Dynamic URL resolution via window variables
 * - Fallback URL support for resilience
 * - Environment-based configuration
 * - Multi-environment support (dev, staging, prod)
 * - CDN and local development support
 */

const moduleFileName = 'remoteEntry.js';

/**
 * Environment detection and configuration
 */
const getEnvironment = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' ? 'development' : 'production';
  }
  return process.env.NODE_ENV || 'development';
};

/**
 * Base configuration class for modules
 */
class ModuleConfig {
  constructor(name, port, options = {}) {
    this.name = name;
    this.port = port;
    this.fileName = options.fileName || moduleFileName;
    this.environment = getEnvironment();
    this.cdnUrl = options.cdnUrl;
    this.stagingUrl = options.stagingUrl;
  }

  /**
   * Get the base URL for this module based on environment
   */
  get url() {
    switch (this.environment) {
      case 'production':
        return this.cdnUrl || `//cdn.example.com/${this.name}`;
      case 'staging':
        return this.stagingUrl || `//staging.example.com/${this.name}`;
      default:
        return `//localhost:${this.port}`;
    }
  }

  /**
   * Get development URL (always localhost)
   */
  get devUrl() {
    return `//localhost:${this.port}`;
  }

  /**
   * Get the full remote entry URL
   */
  get remoteEntryUrl() {
    return `${this.url}/${this.fileName}`;
  }
}

// Host module configuration
const app1Module = new ModuleConfig('app1', 3001, {
  cdnUrl: '//cdn.example.com/app1',
  stagingUrl: '//staging.example.com/app1'
});

// Remote module configuration with enhanced features
const app2Module = new ModuleConfig('app2', 3002, {
  cdnUrl: '//cdn.example.com/app2',
  stagingUrl: '//staging.example.com/app2'
});

// Add dynamic configuration methods
Object.assign(app2Module, {
  /**
   * Global variable name that the runtime plugin will check
   * The plugin looks for window[urlGlobalVariable] to override the URL
   */
  urlGlobalVariable: 'app2Url',
  
  /**
   * Fallback global variable name for resilience
   */
  fallbackGlobalVariable: 'app2FallbackUrl',
  
  /**
   * Federation configuration string with placeholder syntax
   * Format: remoteName@[window.globalVariableName]/remoteEntry.js
   * 
   * The enhanced runtime plugin will:
   * 1. Look for window.app2Url (primary)
   * 2. If not found, look for window.app2FallbackUrl (fallback)
   * 3. If neither found, use the default URL
   * 4. Implement retry logic for failed loads
   * 
   * This pattern enables resilient dynamic URL resolution while keeping synchronous imports
   */
  get federationConfig() {
    return `${this.name}@[window.${this.urlGlobalVariable}]/${this.fileName}`;
  },
  
  /**
   * Configuration with fallback support
   * Uses the fallback URL if the primary fails
   */
  get federationConfigWithFallback() {
    return `${this.name}@[window.${this.fallbackGlobalVariable}]/${this.fileName}`;
  },
  
  /**
   * Static configuration for development (no dynamic resolution)
   * Useful for local development when you want predictable URLs
   */
  get federationConfigStatic() {
    return `${this.name}@${this.devUrl}/${this.fileName}`;
  },
  
  /**
   * Get all possible URLs for this remote (for debugging/monitoring)
   */
  getAllPossibleUrls() {
    const urls = {
      development: this.devUrl,
      static: `${this.devUrl}/${this.fileName}`,
      federationConfig: this.federationConfig
    };
    
    if (this.stagingUrl) {
      urls.staging = `${this.stagingUrl}/${this.fileName}`;
    }
    
    if (this.cdnUrl) {
      urls.production = `${this.cdnUrl}/${this.fileName}`;
    }
    
    // Add runtime URLs if available
    if (typeof window !== 'undefined') {
      if (window[this.urlGlobalVariable]) {
        urls.runtimePrimary = `${window[this.urlGlobalVariable]}/${this.fileName}`;
      }
      if (window[this.fallbackGlobalVariable]) {
        urls.runtimeFallback = `${window[this.fallbackGlobalVariable]}/${this.fileName}`;
      }
    }
    
    return urls;
  }
});

/**
 * Utility functions for dynamic remote configuration
 */
const configUtils = {
  /**
   * Set up dynamic URLs for all remotes
   * Call this before your application starts to configure remote URLs
   * 
   * @param {Object} remoteUrls - Object mapping remote names to URLs
   * @example
   * configUtils.setupDynamicUrls({
   *   app2: '//production-server.com/app2',
   *   app3: '//another-server.com/app3'
   * });
   */
  setupDynamicUrls(remoteUrls) {
    if (typeof window === 'undefined') {
      console.warn('[Module Config] Cannot setup dynamic URLs in non-browser environment');
      return;
    }
    
    Object.entries(remoteUrls).forEach(([remoteName, url]) => {
      const globalVarName = `${remoteName}Url`;
      window[globalVarName] = url;
      console.log(`[Module Config] Set ${globalVarName} = ${url}`);
    });
  },
  
  /**
   * Set up fallback URLs for resilience
   * 
   * @param {Object} fallbackUrls - Object mapping remote names to fallback URLs
   */
  setupFallbackUrls(fallbackUrls) {
    if (typeof window === 'undefined') {
      console.warn('[Module Config] Cannot setup fallback URLs in non-browser environment');
      return;
    }
    
    Object.entries(fallbackUrls).forEach(([remoteName, url]) => {
      const globalVarName = `${remoteName}FallbackUrl`;
      window[globalVarName] = url;
      console.log(`[Module Config] Set fallback ${globalVarName} = ${url}`);
    });
  },
  
  /**
   * Get current configuration for debugging
   */
  getCurrentConfig() {
    return {
      environment: getEnvironment(),
      app1: {
        ...app1Module,
        currentUrl: app1Module.url
      },
      app2: {
        ...app2Module,
        currentUrl: app2Module.url,
        allUrls: app2Module.getAllPossibleUrls()
      }
    };
  },
  
  /**
   * Validate remote URLs for common issues
   */
  validateConfiguration() {
    const issues = [];
    
    // Check if required ports are configured
    if (app1Module.port === app2Module.port) {
      issues.push('app1 and app2 are using the same port');
    }
    
    // Check if global variables are set when needed
    if (typeof window !== 'undefined') {
      const primaryUrl = window[app2Module.urlGlobalVariable];
      const fallbackUrl = window[app2Module.fallbackGlobalVariable];
      
      if (!primaryUrl && !fallbackUrl) {
        issues.push(`Neither ${app2Module.urlGlobalVariable} nor ${app2Module.fallbackGlobalVariable} is set`);
      }
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }
};

// Export configuration and utilities
module.exports = {
  app1Module,
  app2Module,
  configUtils,
  getEnvironment,
  ModuleConfig
};

// Make utilities available globally for debugging
if (typeof window !== 'undefined') {
  window.__MF_CONFIG__ = {
    ...module.exports,
    getCurrentConfig: configUtils.getCurrentConfig,
    validateConfiguration: configUtils.validateConfiguration
  };
}
