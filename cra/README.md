# Rsbuild / Create React App Example

This example demos a basic host application loading remote component.

- `host` is the host application (cra-based).
- `remote` standalone application (cra-based) which exposes `Button` component.

# Running Demo

Run `pnpm run start`. This will build and serve both `host` and `remote` on ports 3000 and 3002 respectively.

- [localhost:3000](http://localhost:3000/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

# Running Playwright E2E Tests

Run the following commands from this directory:

- `pnpm test:e2e`: launches the host and remote servers and runs the Playwright suite headlessly.
- `pnpm test:e2e:ui`: opens the Playwright test runner UI for local development.
- `pnpm test:e2e:debug`: starts the suite in headed mode with Playwright's inspector attached.
- `pnpm e2e:ci`: installs the required browsers (when needed) and executes the suite with a list reporter while collecting failure artifacts (traces, screenshots, videos).

> **Note:** The first Playwright run may require downloading browser binaries. If they are not already installed you can run `pnpm exec playwright install` once to prepare the environment.
