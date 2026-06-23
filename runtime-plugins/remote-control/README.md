# Backend Controlled Configs

API based Remote Module Loading is an example application that showcases the dynamic control over the loading of remote modules in a web application using the Module Federation plugin. The application is divided into two segments: the host application and the remote application. The host application features a local button, and it also loads a button from the remote application.

## Features

- **Runtime Plugin**: A runtime plugin that controls the loading rules for shared modules.
- **Switch remotes by clicking button**: The ability to upgrade or downgrade applications or remote urls dynamically
- **Exposing Button Components**: `app1`, `app2`, and `app3` expose different button components for demonstration purposes. Clicking the button on `app1` dynamically loads either `app2` or `app3`, simulating the replacement of one remote with another, which could be a different version of the remote like a deployed version.

## Main Components

### `./app1/pick-remote.ts`

This is the runtime plugin that controls the loading rules for module federation.

# Running Demo

To give the application a spin, run `pnpm start`. This command will build and serve `app1`, `app2`, and `app3` on ports 3001, 3002, and 3003 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
- [localhost:3003](http://localhost:3003/)

# Running Playwright E2E Tests

- `pnpm test:e2e` runs the Playwright suite locally (headed by default).
- `pnpm test:e2e:ui` opens the Playwright Test Runner UI for interactive debugging.
- `pnpm test:e2e:debug` starts Playwright in debug mode.
- `pnpm e2e:ci` builds the applications and executes the suite in headless mode, the same flow used in CI.

Playwright stores traces, screenshots, and videos for failing specs inside `playwright-report` when run in CI mode.
