# Rsbuild / Create React App Example

This example demos a basic host application loading remote component.

- `host` is the host application (cra-based).
- `remote` standalone application (cra-based) which exposes `Button` component.

## Setup

Run `pnpm install` in this directory to install dependencies for both `host` and `remote`.

## Running Demo

Run `pnpm run start`. This will build and serve both `host` and `remote` on ports 3000 and 3002 respectively.

- [localhost:3000](http://localhost:3000/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

## Running Playwright E2E Tests

To run tests in interactive UI mode, run `pnpm test:e2e:ui`.

To build the apps, start both servers, and run tests in headless mode, run `pnpm e2e:ci`.
