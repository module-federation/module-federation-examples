# App1 - Module Federation Host/Remote

This is the first application in the bi-directional module federation example. It both exposes and consumes federated modules.

## Module Federation Setup

**Exposes:**

- `./Button` - Red button component (`src/components/button.js`)

**Consumes:**

- `app2/Button` - Blue button component from App2

**Port:** 3001

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

The module federation setup is configured inline in `modern.config.js` via `moduleFederationPlugin({ config: ... })`.

## Key Features

- **React Suspense**: Uses lazy loading for federated components
- **Modern.js Framework**: Built with Modern.js v2.68.6
- **TypeScript Support**: Full type safety across federated modules
- **Error Boundaries**: Graceful handling of federation failures

For more information, see the [Modern.js documentation](https://modernjs.dev/en).

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=bi-directional&ep.readme_path=bi-directional%2Fapp1%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fbi-directional%2Fapp1&dt=ModuleFederationExamples+bi-directional%2Fapp1%2FREADME.md">
