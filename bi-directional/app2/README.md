# App2 - Module Federation Host/Remote

This is the second application in the bi-directional module federation example. It both exposes and consumes federated modules.

## Module Federation Setup

**Exposes:**
- `./Button` - Blue button component (`src/components/button.js`)

**Consumes:**
- `app1/Button` - Red button component from App1

**Port:** 3002

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm serve
```

## Module Federation Configuration

The module federation setup is configured in `module-federation.config.ts`:

```typescript
export default createModuleFederationConfig({
  name: 'app2',
  remotes: {
    app1: 'app1@http://localhost:3001/mf-manifest.json',
  },
  exposes: {
    './Button': './src/components/button.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  dts: false,
});
```

## Key Features

- **React Suspense**: Uses lazy loading for federated components
- **Modern.js Framework**: Built with Modern.js v2.68.6
- **TypeScript Support**: Full type safety across federated modules
- **Error Boundaries**: Graceful handling of federation failures

For more information, see the [Modern.js documentation](https://modernjs.dev/en).
