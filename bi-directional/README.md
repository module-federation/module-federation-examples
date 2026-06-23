# Bi-Directional Hosts Example

This example demonstrates bi-directional module federation using Modern.js, where each application can both expose and consume federated modules from each other.

- `app1` exposes a red `<button>App 1 Button</button>` component and consumes `app2`'s button.
- `app2` exposes a blue `<button>App 2 Button</button>` component and consumes `app1`'s button.

## Technology Stack

- **Framework**: Modern.js v2.68.6
- **Module Federation**: @module-federation/modern-js v0.17.1
- **Testing**: Playwright for end-to-end testing
- **Build Tool**: Rspack (via Modern.js)

## Running Demo

Run `pnpm run start`. This will start both `app1` and `app2` in development mode on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) - App1 hosting App2's button
- [localhost:3002](http://localhost:3002/) - App2 hosting App1's button

Notice that each app will asynchronously load the other app's federated button component using React Suspense.

## Available Scripts

- `pnpm start` - Start both apps in development mode
- `pnpm build` - Build both apps for production
- `pnpm serve` - Serve built apps in production mode
- `pnpm test:e2e` - Run Playwright tests in headless mode
- `pnpm test:e2e:ui` - Run Playwright tests with UI mode
- `pnpm test:e2e:debug` - Run Playwright tests in debug mode
- `pnpm e2e:ci` - Build and run tests for CI

## Module Federation Configuration

Each app uses inline Module Federation config passed to `moduleFederationPlugin()` in `modern.config.js`:

- **Exposed modules**: Components shared with other apps
- **Remote modules**: Components consumed from other apps
- **Shared dependencies**: React and React-DOM with singleton strategy

## End-to-End Testing with Playwright

This example includes comprehensive Playwright tests that verify:

- ✅ Both applications load correctly
- ✅ Federated components render properly
- ✅ Bi-directional communication works
- ✅ Error handling for module loading failures
- ✅ Cross-app interaction and state management

### Running Tests

```bash
# Run tests in headless mode
pnpm test:e2e

# Run tests with interactive UI
pnpm test:e2e:ui

# Run tests in debug mode
pnpm test:e2e:debug

# Run tests for CI (build first)
pnpm e2e:ci
```

### Test Architecture

The test suite includes:

- **Page Objects**: Reusable test utilities in `e2e/utils/`
- **Test Fixtures**: Shared setup and teardown logic
- **Comprehensive Coverage**: All module federation scenarios
- **Error Scenarios**: Graceful handling of federation failures

## Key Features Demonstrated

1. **Bi-directional Federation**: Apps both expose and consume modules
2. **React Suspense Integration**: Lazy loading with fallback UI
3. **Modern.js Framework**: Latest patterns and best practices
4. **Production-Ready Testing**: Comprehensive Playwright test suite
5. **TypeScript Support**: Full type safety across federated modules
