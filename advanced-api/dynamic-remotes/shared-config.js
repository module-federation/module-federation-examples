/**
 * Shared Module Federation Configuration
 * 
 * This file provides standardized shared dependency configurations
 * across all applications in the dynamic remotes example.
 */

const deps = {
  react: '^18.3.1',
  'react-dom': '^18.3.1',
  moment: '^2.29.4',
  'react-redux': '^9.1.2',
  redux: '^5.0.1',
};

/**
 * Standard shared configuration for Module Federation
 * @param {Object} additionalShared - Additional shared dependencies specific to the app
 * @returns {Object} Complete shared configuration
 */
function createSharedConfig(additionalShared = {}) {
  const baseShared = {
    react: {
      singleton: true,
      requiredVersion: deps.react,
      strictVersion: true,
      eager: false,
      import: 'react',
      shareKey: 'react',
      shareScope: 'default',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: deps['react-dom'],
      strictVersion: true,
      eager: false,
    },
    'react/jsx-runtime': {
      singleton: true,
      eager: false,
    },
    'react/jsx-dev-runtime': {
      singleton: true,
      eager: false,
    },
  };

  return {
    ...baseShared,
    ...additionalShared,
  };
}

/**
 * Environment-aware remote URL generation
 * @param {number} port - Port number for the remote
 * @param {string} appName - Name of the application
 * @returns {string} Complete remote entry URL
 */
function getRemoteEntry(port, appName = '') {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const baseUrl = isDevelopment 
    ? (process.env.REMOTE_BASE_URL || 'http://localhost')
    : (process.env.REMOTE_BASE_URL || window?.location?.origin || 'http://localhost');
  
  return `${baseUrl}:${port}/remoteEntry.js`;
}

/**
 * Standard webpack devServer configuration
 * @param {number} port - Port number for the dev server
 * @returns {Object} DevServer configuration
 */
function createDevServerConfig(port) {
  return {
    static: {
      directory: require('path').join(process.cwd(), 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    port,
    hot: true,
    liveReload: false,
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };
}

/**
 * Standard babel configuration for React with TypeScript
 */
const babelConfig = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { 
      allowDeclareFields: true,
      allowNamespaces: true 
    }],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
  ],
};

/**
 * Standard SWC configuration for Rspack with TypeScript support
 */
const swcConfig = {
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true,
    },
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
    target: 'es2020',
  },
  env: {
    targets: 'defaults',
  },
};

/**
 * TypeScript-specific SWC configuration
 */
const swcConfigTS = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
    },
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
    target: 'es2020',
  },
  env: {
    targets: 'defaults',
  },
};

module.exports = {
  createSharedConfig,
  getRemoteEntry,
  createDevServerConfig,
  babelConfig,
  swcConfig,
  swcConfigTS,
  deps,
};