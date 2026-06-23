# Dynamic Remote Vendor Sharing Example

This example demonstrates advanced Module Federation capabilities for **dynamic remote loading** and **vendor code sharing** between unknown remotes at runtime. It showcases how a host application can load remote components on-demand without compile-time knowledge of their locations, while efficiently sharing dependencies.

> **⚠️ Important Note**: True dynamic remotes (where you don't know what you're importing at build time) are **very rare** in practice. For most use cases where you need dynamic remote URLs but know the component interfaces, consider using **runtime plugins** instead:
>
> - **[Remote Control Example](../../runtime-plugins/remote-control)** - Dynamic remote URL configuration with runtime plugins
> - **[Remote Router Example](../../runtime-plugins/remote-router)** - Dynamic routing with runtime remote management
>
> These approaches provide better type safety, performance, and maintainability while still allowing runtime URL configuration.

## Project Overview

This example illustrates the power of Module Federation's runtime API for creating truly dynamic micro-frontend architectures. The host application (`app1`) can dynamically load and render components from remote applications (`app2` and `app3`) at runtime, demonstrating vendor sharing optimization where dependencies like React and Moment.js are shared efficiently between applications.

**Key Learning Objectives:**

- Runtime remote registration and loading
- Dynamic component rendering with error handling
- Vendor dependency sharing optimization
- Cross-application state and dependency management

## Architecture

### Applications Structure

- **`app1`** - Host Application (Port 3001)

  - Serves as the container application
  - Dynamically loads remotes using `@module-federation/runtime`
  - Manages shared dependencies (React, ReactDOM)
  - Provides UI for remote component selection

- **`app2`** - Remote Application (Port 3002)

  - Exposes a `Widget` component
  - Uses Moment.js for date formatting
  - Demonstrates vendor sharing with external dependencies

- **`app3`** - Remote Application (Port 3003)
  - Exposes a `Widget` component with React hooks
  - Uses Moment.js and Redux for state management
  - Shows advanced dependency sharing scenarios

### Dynamic Loading Flow

```
1. Host app initializes Module Federation runtime
2. Runtime registers remote entry points
3. User triggers component load via UI
4. Host dynamically imports remote component
5. Shared dependencies are resolved efficiently
6. Component renders with fallback handling
```

## Current Implementation

### Host Application Dynamic Loading

The host uses the Module Federation runtime API to initialize and load remotes:

```javascript
// Runtime initialization with remote registration
init({
  name: 'app1',
  remotes: [
    { name: 'app2', entry: 'http://localhost:3002/remoteEntry.js' },
    { name: 'app3', entry: 'http://localhost:3003/remoteEntry.js' },
  ],
});

// Dynamic component loading hook
function useDynamicImport({ module, scope }) {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const { default: Component } = await loadRemote(`${scope}/${module}`);
        setComponent(() => Component);
      } catch (error) {
        console.error(`Error loading remote module ${scope}/${module}:`, error);
      }
    };

    loadComponent();
  }, [module, scope]);

  return component;
}
```

### Vendor Sharing Configuration

Each application configures shared dependencies to optimize bundle sizes:

```javascript
// Host configuration (app1)
shared: {
  react: {
    singleton: true,
    shareScope: 'default'
  },
  'react-dom': {
    singleton: true
  }
}

// Remote configuration (app2/app3)
shared: {
  react: {
    requiredVersion: deps.react,
    singleton: true
  },
  'react-dom': {
    requiredVersion: deps['react-dom'],
    singleton: true
  },
  moment: deps.moment // Shared between remotes
}
```

## Setup Instructions

### Prerequisites

- Node.js 16+ and pnpm
- Modern browser with ES2020 support
- Network access for cross-origin requests

### Installation & Running

1. **Install dependencies for all applications:**

   ```bash
   pnpm install
   ```

2. **Start all applications simultaneously:**

   ```bash
   pnpm start
   ```

   This starts:

   - Host app on [http://localhost:3001](http://localhost:3001)
   - Remote app2 on [http://localhost:3002](http://localhost:3002)
   - Remote app3 on [http://localhost:3003](http://localhost:3003)

3. **Alternative: Legacy Webpack mode:**

   ```bash
   pnpm legacy:start
   ```

4. **Production build:**
   ```bash
   pnpm build
   pnpm serve
   ```

### Usage Instructions

1. Open the host application at [http://localhost:3001](http://localhost:3001)
2. Click "Load App 2 Widget" to dynamically load the red widget from app2
3. Click "Load App 3 Widget" to dynamically load the purple widget from app3
4. Observe shared dependency optimization in browser DevTools Network tab
5. Check browser console for loading logs and shared module information

## Key Concepts Demonstrated

### 1. Runtime Remote Registration

- Remotes are registered at runtime, not build time
- Entry points can be discovered dynamically
- No compile-time coupling between host and remotes

### 2. Dynamic Import with Error Handling

- Graceful fallback when remotes are unavailable
- Loading states and error boundaries
- Component lazy loading with Suspense

### 3. Vendor Code Sharing

- React/ReactDOM shared as singletons across applications
- Moment.js shared between app2 and app3
- Automatic version resolution and deduplication

### 4. Cross-Application Dependency Management

- Shared scope management for dependency isolation
- Version compatibility handling
- Singleton enforcement for framework libraries

## Configuration Explained

### Module Federation Plugin Configuration

**Host Configuration:**

```javascript
new ModuleFederationPlugin({
  name: 'app1',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
```

**Remote Configuration:**

```javascript
new ModuleFederationPlugin({
  name: 'app2',
  filename: 'remoteEntry.js',
  exposes: {
    './Widget': './src/Widget',
  },
  shared: {
    react: { requiredVersion: deps.react, singleton: true },
    'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
    moment: deps.moment,
  },
});
```

### Rspack vs Webpack Support

The example supports both Rspack (default) and Webpack bundlers:

- **Rspack**: Faster builds with `rspack serve`
- **Webpack**: Legacy support with `webpack-cli serve`
- Both configurations maintain feature parity

## Known Issues & Limitations

### Critical Issues Requiring Attention

1. **Severely Outdated React Version (16.13.0)**

   - Missing modern features (Concurrent Mode, Suspense improvements)
   - Security vulnerabilities in older versions
   - Limited hooks and performance optimizations

2. **Hardcoded Remote URLs**

   - `http://localhost:3002/3003` URLs limit portability
   - No environment-based configuration
   - Deployment challenges across environments

3. **Missing Error Boundaries**

   - Remote loading failures can crash the host
   - No graceful degradation strategies
   - Limited user feedback for loading states

4. **No Type Safety**

   - Missing TypeScript definitions for remote contracts
   - Runtime errors for interface mismatches
   - No compile-time validation of remote APIs

5. **Suboptimal Shared Configuration**
   - Inconsistent version requirements across remotes
   - Missing eager loading for critical dependencies
   - No shared scope isolation strategies

## Modernization Roadmap

### Immediate Improvements (High Priority)

1. **Upgrade to React 18+**

   ```bash
   pnpm update react react-dom --workspace-root
   ```

2. **Environment-based Configuration**

   ```javascript
   const REMOTE_BASE_URL = process.env.REMOTE_BASE_URL || 'http://localhost';
   ```

3. **Enhanced Error Handling**
   ```javascript
   const ErrorBoundary = ({ children, fallback }) => {
     // Implement comprehensive error boundary
   };
   ```

### Medium-term Enhancements

1. **TypeScript Migration**

   - Add type definitions for remote contracts
   - Implement shared type packages
   - Enable compile-time validation

2. **Advanced Shared Dependencies**

   ```javascript
   shared: {
     react: {
       singleton: true,
       eager: true,
       requiredVersion: '^18.0.0'
     }
   }
   ```

3. **Runtime Remote Discovery**
   - Service registry integration
   - Dynamic remote manifest loading
   - Health checking for remote availability

### Advanced Features

1. **Micro-frontend Orchestration**

   - Centralized routing and navigation
   - Inter-application communication patterns
   - Shared state management strategies

2. **Performance Optimization**
   - Bundle analysis and optimization
   - Lazy loading strategies
   - Caching and prefetching policies

## Best Practices Demonstrated

### 1. Separation of Concerns

- Clear boundaries between host and remote responsibilities
- Independent deployment capabilities
- Isolated development workflows

### 2. Dependency Management

- Singleton enforcement for framework libraries
- Version compatibility strategies
- Shared scope optimization

### 3. Runtime Flexibility

- Dynamic component discovery and loading
- Graceful degradation patterns
- Environment-agnostic configuration

### 4. Development Experience

- Hot module replacement support
- Independent development servers
- Comprehensive testing strategies

## Troubleshooting

### Common Issues and Solutions

**1. CORS Errors During Development**

```javascript
// Add to webpack.config.js devServer
headers: {
  'Access-Control-Allow-Origin': '*'
}
```

**2. Shared Dependency Version Conflicts**

```javascript
// Use strict version matching
shared: {
  react: {
    requiredVersion: '^18.0.0',
    singleton: true,
    strictVersion: true
  }
}
```

**3. Remote Loading Failures**

```javascript
// Implement retry logic
const loadWithRetry = async (remoteName, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await loadRemote(remoteName);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

**4. Development Server Port Conflicts**

```bash
# Check and gracefully terminate processes using ports
lsof -ti:3001,3002,3003 | xargs kill -15
# If any processes remain, force kill as a last resort:
lsof -ti:3001,3002,3003 | xargs kill -9
```

**5. Build Failures with Rspack**

```javascript
// Add to rspack.config.js for compatibility
resolve: {
  alias: {
    '@module-federation/runtime$': require.resolve('@module-federation/runtime')
  }
}
```

## Testing

### Running E2E Tests

**Interactive Mode:**

```bash

```

**Headless CI Mode:**

```bash
pnpm e2e:ci
```

**Legacy Webpack Testing:**

```bash
pnpm legacy:e2e:ci
```

The E2E tests verify:

- Dynamic component loading functionality
- Shared dependency optimization
- Cross-application UI interactions
- Error handling and fallback scenarios

### Test Coverage

- Component rendering verification
- Dynamic loading state management
- Vendor sharing optimization validation
- Cross-browser compatibility checks

## Next Steps

1. **Immediate**: Address critical issues (React upgrade, environment config)
2. **Short-term**: Implement TypeScript and enhanced error handling
3. **Long-term**: Explore advanced micro-frontend patterns and tooling

This example serves as a foundation for understanding Module Federation's dynamic capabilities while highlighting areas for production-ready improvements.
