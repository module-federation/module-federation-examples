# Rspack-Webpack Interoperability Example

This example demonstrates Module Federation working seamlessly between Webpack and Rspack applications, showcasing cross-bundler interoperability with the `@module-federation/enhanced` plugin.

## Overview

This workspace contains 5 federated applications demonstrating:
- **Webpack host consuming Rspack remotes**: App #1 (Webpack) acts as the host shell and consumes modules from Apps #2-#5 (Rspack)
- **Bidirectional federation**: Apps can both expose and consume federated modules
- **Multiple frameworks**: React, Svelte, and LitElement working together via Module Federation
- **Async startup**: All apps use the `asyncStartup` experiment for better performance
- **Shared dependencies**: Singleton sharing of React, Material-UI, and router libraries

## Architecture

### App #1 (Webpack Host) - Port 3001
- **Build Tool**: Webpack 5 with `@module-federation/enhanced/webpack`
- **Framework**: React 18
- **Role**: Application shell and aggregator
- **Exposes**:
  - `./SideNav` - Navigation component
  - `./Page` - Page wrapper component
- **Consumes**: Remotes from Apps #2, #3, #4, and #5

### App #2 (Rspack Remote) - Port 3002
- **Build Tool**: Rspack with `@module-federation/enhanced/rspack`
- **Framework**: React 18
- **Role**: Remote application with bidirectional federation
- **Exposes**:
  - `./Dialog` - Dialog component
  - `./Tabs` - Tabs component
- **Consumes**: Remotes from Apps #1 and #3

### App #3 (Rspack Remote) - Port 3003
- **Build Tool**: Rspack
- **Framework**: React 18

### App #4 (Rspack Remote) - Port 3004
- **Build Tool**: Rspack
- **Framework**: Svelte

### App #5 (Rspack Remote) - Port 3005
- **Build Tool**: Rspack
- **Framework**: LitElement

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- pnpm package manager

### Installation

From the repository root:
```sh
pnpm install
```

### Development

Start all applications in development mode:
```sh
cd rspack-webpack-interop
pnpm start
```

This command will:
1. Build all applications (apps #1-#5)
2. Serve them concurrently on their respective ports

Access the applications:
- **Main App Shell**: [http://localhost:3001](http://localhost:3001)
- **App #2**: [http://localhost:3002](http://localhost:3002)
- **App #3**: [http://localhost:3003](http://localhost:3003)
- **App #4**: [http://localhost:3004](http://localhost:3004)
- **App #5**: [http://localhost:3005](http://localhost:3005)

### Available Scripts

```sh
# Start all apps (build + serve)
pnpm start

# Build all apps for production
pnpm build

# Serve pre-built apps
pnpm serve

# Clean build artifacts
pnpm clean

# Legacy build (using webpack for all apps)
pnpm legacy:build
pnpm legacy:start
```

## Testing

This example uses Playwright for end-to-end testing.

### Run E2E Tests

```sh
# Run tests in headless mode
pnpm run test:e2e

# Run tests with UI
pnpm run test:e2e:ui

# Debug tests
pnpm run test:e2e:debug

# CI mode (install dependencies + run tests)
pnpm run e2e:ci
```

The Playwright configuration automatically:
- Builds and serves all applications before testing
- Runs tests against [http://localhost:3001](http://localhost:3001)
- Provides retry logic for flaky tests in CI environments
- Generates traces on first retry for debugging

### Test Coverage

The test suite validates:
- Module loading across Webpack/Rspack boundaries
- Component rendering from federated modules
- Navigation between different framework implementations
- Shared dependency singleton behavior
- Cross-application state management

## Key Features Demonstrated

### 1. Cross-Bundler Interoperability
Shows how Webpack and Rspack applications can seamlessly share modules using the enhanced Module Federation plugin.

### 2. Async Startup
All applications use the `asyncStartup` experiment, which improves initial load performance by deferring module loading:
```js
experiments: {
  asyncStartup: true,
}
```

### 3. Shared Dependencies
Demonstrates singleton sharing to prevent duplicate library instances:
```js
shared: {
  react: { singleton: true },
  'react-dom': { singleton: true },
  '@material-ui/core': { singleton: true },
  'react-router-dom': { singleton: true },
}
```

### 4. Multi-Framework Support
Shows federated modules working across React, Svelte, and LitElement frameworks.

## Project Structure

```
rspack-webpack-interop/
├── app-01/           # Webpack host application
│   ├── webpack.config.js
│   ├── rspack.config.js  # Alternative Rspack config
│   └── src/
├── app-02/           # Rspack remote (React)
│   ├── rspack.config.js
│   └── src/
├── app-03/           # Rspack remote (React)
├── app-04/           # Rspack remote (Svelte)
├── app-05/           # Rspack remote (LitElement)
├── e2e/              # Playwright test specs
├── playwright.config.ts
└── package.json
```

## Troubleshooting

### Port Already in Use
If you see EADDRINUSE errors, ensure ports 3001-3005 are available:
```sh
# macOS/Linux
lsof -ti:3001-3005 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Module Not Found Errors
Ensure all applications are built and running:
```sh
pnpm clean
pnpm build
pnpm serve
```

### Remote Entry Loading Issues
Check that all remote applications are accessible:
```sh
curl http://localhost:3002/remoteEntry.js
curl http://localhost:3003/remoteEntry.js
curl http://localhost:3004/remoteEntry.js
curl http://localhost:3005/remoteEntry.js
```

## Learn More

- [Module Federation Documentation](https://module-federation.io/)
- [Rspack Documentation](https://rspack.dev)
- [@module-federation/enhanced Plugin](https://module-federation.io/guide/basic/enhanced.html)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
