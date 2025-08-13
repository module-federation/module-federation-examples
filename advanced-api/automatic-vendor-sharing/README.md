# Automatic Vendor Sharing with Module Federation

A comprehensive example demonstrating **AutomaticVendorFederation** - an intelligent dependency sharing system that automatically optimizes bundle sizes across microfrontends by preventing duplicate dependencies and ensuring consistent versions.

## Table of Contents

- [What is Automatic Vendor Sharing?](#what-is-automatic-vendor-sharing)
- [Why is it Important?](#why-is-it-important)
- [How This Example Works](#how-this-example-works)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [Configuration Deep Dive](#configuration-deep-dive)
- [Benefits vs Manual Vendor Sharing](#benefits-vs-manual-vendor-sharing)
- [Common Use Cases](#common-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)

## What is Automatic Vendor Sharing?

Automatic Vendor Sharing is a Module Federation feature that intelligently analyzes your dependencies and automatically shares them across microfrontends without manual configuration. It:

- **Automatically detects** which dependencies can be safely shared
- **Prevents duplicate bundles** by sharing common dependencies
- **Optimizes loading strategies** based on dependency versions and requirements
- **Ensures version compatibility** across different microfrontends

## Why is it Important?

### Traditional Problems
- **Bundle Duplication**: Each microfrontend bundles its own copy of shared libraries (React, Lodash, etc.)
- **Version Conflicts**: Different apps using different versions of the same library
- **Network Overhead**: Multiple downloads of the same dependencies
- **Cache Inefficiency**: Browser can't cache shared dependencies effectively

### Automatic Vendor Sharing Solutions
- **Intelligent Sharing**: Automatically shares compatible dependencies
- **Reduced Bundle Sizes**: Up to 70% reduction in total JavaScript payload
- **Faster Loading**: Shared dependencies cached across microfrontends
- **Version Harmony**: Automatic resolution of compatible versions

## How This Example Works

This example features two React applications (`app1` and `app2`) that:

1. **Bidirectional Sharing**: Both apps act as hosts and remotes
2. **Component Exchange**: App1 loads App2's button component and vice versa
3. **Automatic Dependency Sharing**: React, ReactDOM, and other dependencies are automatically shared
4. **Enhanced Error Handling**: Comprehensive error boundaries for production-ready code
5. **Performance Monitoring**: Runtime plugins for debugging and optimization

### Visual Architecture

```
┌─────────────────┐    ┌─────────────────┐
│     App 1       │◄──►│     App 2       │
│  (Port 3001)    │    │  (Port 3002)    │
├─────────────────┤    ├─────────────────┤
│ Exposes:        │    │ Exposes:        │
│ • Button        │    │ • Button        │
│ • ErrorBoundary │    │ • ErrorBoundary │
│                 │    │                 │
│ Consumes:       │    │ Consumes:       │
│ • App2/Button   │    │ • App1/Button   │
└─────────────────┘    └─────────────────┘
         │                       │
         └───── Shared Deps ─────┘
         • React (singleton)
         • ReactDOM (singleton)
         • Auto-detected deps
```

## Quick Start

### Prerequisites
- Node.js 16+ 
- pnpm (recommended) or npm/yarn

### Installation & Running

```bash
# Install dependencies
pnpm install

# Start both applications in development mode
pnpm start

# Or start individual apps
pnpm --filter automatic-vendor-sharing_app1 start
pnpm --filter automatic-vendor-sharing_app2 start
```

### Available URLs
- **App 1**: [http://localhost:3001](http://localhost:3001)
- **App 2**: [http://localhost:3002](http://localhost:3002)

### Production Build

```bash
# Build optimized production bundles
pnpm build

# Or build with webpack production config
pnpm --filter automatic-vendor-sharing_app1 build:prod
pnpm --filter automatic-vendor-sharing_app2 build:prod

# Serve production builds
pnpm serve
```

## Architecture Overview

### File Structure
```
automatice-vendor-sharing/
├── app1/
│   ├── src/
│   │   ├── App.js                 # Enhanced host app with error handling
│   │   ├── Button.js              # Interactive component with state
│   │   ├── ErrorBoundary.tsx      # Production-ready error boundary
│   │   ├── runtimePlugin.js       # MF runtime monitoring
│   │   ├── bootstrap.js           # React 18 bootstrap
│   │   └── types/
│   │       └── module-federation.d.ts  # TypeScript declarations
│   ├── webpack.config.js          # Development configuration
│   ├── webpack.prod.config.js     # Production optimization
│   ├── rspack.config.js           # Alternative bundler config
│   ├── tsconfig.json              # TypeScript configuration
│   └── package.json
└── app2/
    └── [same structure as app1]
```

### Technology Stack
- **React 18**: Latest React with concurrent features
- **Module Federation Enhanced**: Latest MF with AutomaticVendorFederation
- **TypeScript**: Type safety for federated modules
- **Webpack 5**: Primary bundler with advanced optimizations
- **Rspack**: Alternative high-performance bundler
- **Error Boundaries**: Production-ready error handling

## Key Features

### 1. AutomaticVendorFederation Configuration

```javascript
shared: {
  ...AutomaticVendorFederation({
    exclude: ['@module-federation/enhanced'],
    ignoreVersion: ['react', 'react-dom'],
    shareStrategy: 'loaded-first',
  }),
  react: {
    singleton: true,
    requiredVersion: deps.react,
    eager: false,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: deps['react-dom'],
    eager: false,
  },
}
```

### 2. Enhanced Error Handling

- **Error Boundaries**: Catch and gracefully handle remote loading failures
- **Retry Mechanisms**: Allow users to retry failed module loads
- **Detailed Error Information**: Debug-friendly error messages
- **Fallback UI**: Elegant degradation when remotes are unavailable

### 3. Performance Monitoring

- **Runtime Plugins**: Monitor module loading performance
- **Load Time Tracking**: Measure and log remote module load times
- **Dependency Analysis**: Track which dependencies are being shared
- **Error Reporting**: Comprehensive error logging for debugging

### 4. Production Optimizations

- **Code Splitting**: Intelligent chunk splitting for optimal loading
- **Tree Shaking**: Remove unused code from shared dependencies
- **Cache Optimization**: Filesystem caching for faster rebuilds
- **Bundle Analysis**: Tools for analyzing bundle composition

## Configuration Deep Dive

### AutomaticVendorFederation Options

| Option | Description | Example |
|--------|-------------|----------|
| `exclude` | Dependencies to never share automatically | `['@module-federation/enhanced']` |
| `ignoreVersion` | Dependencies where version mismatches are acceptable | `['react', 'react-dom']` |
| `shareStrategy` | How to resolve version conflicts | `'loaded-first'`, `'version-first'` |
| `eager` | Load dependencies immediately vs on-demand | `false` (recommended for production) |

### Share Strategies

1. **loaded-first**: Use the version that loads first (fastest)
2. **version-first**: Use the highest compatible version (safest)
3. **singleton**: Ensure only one version exists (required for React)

### Module Federation Enhanced Features

```javascript
experiments: {
  federationRuntime: 'hoisted', // Optimize runtime performance
}
runtimePlugins: [require.resolve('./src/runtimePlugin')], // Custom runtime behavior
```

## Benefits vs Manual Vendor Sharing

### Manual Configuration Challenges

```javascript
// Manual approach - error-prone and maintenance-heavy
shared: {
  'react': { singleton: true, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  'lodash': { requiredVersion: '^4.17.0' },
  'moment': { requiredVersion: '^2.29.0' },
  // ... need to manually add every dependency
}
```

### AutomaticVendorFederation Benefits

| Aspect | Manual Sharing | Automatic Sharing |
|--------|---------------|------------------|
| **Setup Time** | Hours of configuration | Minutes |
| **Maintenance** | Update for every new dependency | Zero maintenance |
| **Error Rate** | High (manual version management) | Low (automatic detection) |
| **Bundle Optimization** | Inconsistent | Consistently optimized |
| **Version Conflicts** | Manual resolution required | Automatic resolution |
| **New Dependencies** | Must manually configure | Automatically included |

## Common Use Cases

### 1. Microfrontend Architecture
- **Multiple Teams**: Each team owns independent applications
- **Shared Libraries**: Common design system, utilities, or frameworks
- **Independent Deployment**: Teams deploy without coordinating dependencies

### 2. Plugin Systems
- **Core Application**: Main app with plugin architecture
- **Third-party Plugins**: External modules that extend functionality
- **Dependency Sharing**: Plugins share core app dependencies

### 3. Multi-Brand Applications
- **Shared Components**: Common UI components across brands
- **Brand-specific Features**: Unique functionality per brand
- **Optimized Loading**: Shared dependencies reduce load times

### 4. Progressive Migration
- **Legacy Integration**: Gradually modernize legacy applications
- **Technology Mixing**: Combine different frontend frameworks
- **Risk Mitigation**: Incremental migration with shared dependencies

## Best Practices

### 1. Dependency Management

```javascript
// ✅ Good: Consistent version ranges
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}

// ❌ Bad: Exact versions that might conflict
"dependencies": {
  "react": "18.3.1",
  "react-dom": "18.3.0"
}
```

### 2. Error Handling

```javascript
// ✅ Always wrap remote components
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <RemoteComponent />
  </Suspense>
</ErrorBoundary>

// ❌ Don't load remotes without error handling
<RemoteComponent /> // Will crash entire app if remote fails
```

### 3. Performance Optimization

```javascript
// ✅ Use lazy loading for remotes
const RemoteButton = React.lazy(() => import('app2/Button'));

// ✅ Configure appropriate eager settings
shared: {
  react: { singleton: true, eager: false }, // Load when needed
  'my-utils': { eager: true }, // Load immediately if small
}
```

### 4. Production Considerations

- **Bundle Analysis**: Regularly analyze bundle sizes
- **Error Monitoring**: Implement error tracking for remote failures
- **Performance Monitoring**: Track remote loading performance
- **Fallback Strategies**: Always have fallbacks for critical functionality

## Troubleshooting

### Common Issues

#### 1. Version Conflicts

**Symptom**: React hooks errors or "Multiple versions of React" warnings

**Solution**:
```javascript
// Ensure singleton configuration
react: {
  singleton: true,
  requiredVersion: deps.react,
}
```

#### 2. Remote Loading Failures

**Symptom**: "Loading chunk failed" or network errors

**Diagnosis**:
- Check if remote application is running
- Verify CORS headers are configured
- Ensure remote URL is accessible

**Solution**:
```javascript
// Add proper error boundaries
<ErrorBoundary fallback={CustomErrorComponent}>
  <RemoteComponent />
</ErrorBoundary>
```

#### 3. Build Errors

**Symptom**: TypeScript errors about missing modules

**Solution**:
```typescript
// Add proper type declarations
declare module 'app2/Button' {
  const Button: React.ComponentType;
  export default Button;
}
```

#### 4. Development vs Production Issues

**Symptom**: Works in development but fails in production

**Diagnosis**:
- Check `publicPath` configuration
- Verify production URLs are correct
- Ensure proper CORS configuration

### Debug Tools

#### 1. Runtime Plugin Logging
```javascript
// Enable detailed logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('[MF Debug] Module loading details:', args);
}
```

#### 2. Bundle Analysis
```bash
# Analyze bundle composition
npm run analyze

# Or use webpack-bundle-analyzer directly
npx webpack-bundle-analyzer dist/static/js/*.js
```

#### 3. Network Monitoring
- Use browser DevTools Network tab
- Monitor for failed chunk loads
- Check timing of shared dependency loads

## Advanced Topics

### 1. Custom Share Strategies

```javascript
// Implement custom version resolution
const customShareStrategy = (localVersion, remoteVersion) => {
  // Custom logic for version selection
  return semver.gt(localVersion, remoteVersion) ? localVersion : remoteVersion;
};
```

### 2. Dynamic Remote URLs

```javascript
// Runtime remote URL resolution
const getRemoteUrl = () => {
  return process.env.NODE_ENV === 'production' 
    ? 'https://app2.production.com/remoteEntry.js'
    : 'http://localhost:3002/remoteEntry.js';
};
```

### 3. Module Federation with Server-Side Rendering

```javascript
// SSR-compatible configuration
module.exports = {
  // ... other config
  target: isServer ? 'node' : 'web',
  plugins: [
    new ModuleFederationPlugin({
      library: { type: isServer ? 'commonjs-module' : 'var' },
      // ... other MF config
    })
  ]
};
```

### 4. Testing Federated Modules

```javascript
// Mock federated modules in tests
jest.mock('app2/Button', () => {
  return function MockButton() {
    return <button>Mock App2 Button</button>;
  };
});
```

---

## Running Tests

### E2E Tests

```bash
# Interactive mode
npm run cypress:debug

# Headless mode
npm run e2e:ci
```

### Unit Tests

```bash
# Type checking
pnpm run type-check

# Run tests with mocked remotes
npm test
```

## Additional Resources

- [Module Federation Documentation](https://module-federation.io/)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Module Federation Enhanced](https://github.com/module-federation/enhanced)
- [Best Practices Guide](../../cypress-e2e/README.md)

## Contributing

When contributing to this example:

1. Ensure both apps start successfully
2. Test bidirectional component loading
3. Verify error boundaries work correctly
4. Check that shared dependencies are not duplicated
5. Test both development and production builds

---

**Note**: This example demonstrates production-ready patterns for Module Federation with automatic vendor sharing. The enhanced error handling, performance monitoring, and optimization techniques shown here are suitable for real-world applications.
