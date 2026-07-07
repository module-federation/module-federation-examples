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

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=clo&ep.readme_path=clo%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fclo&dt=ModuleFederationExamples+clo%2FREADME.md">
