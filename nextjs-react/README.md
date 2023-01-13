# Module Federation with NextJS and Client Side React.

Module federation in NextJS depends on [@module-federation/nextjs-mf](https://www.npmjs.com/package/@module-federation/nextjs-mf).

## Context

There are 2 applications:

- `host-app`: Next.js app
- `remote-app`: flavor of `React + Webpack 5`

### The `remote-app`

- Within this application, we are exposing a `Button` component that utilizes a CSS-in-JS design solution.
- If you'll notice the `shared` config, you can see that the version of `react` and `react-dom` have been set to `0`.
- When consuming the remote app within a Next.js environment, we need to make sure that webpack always selects the host's copy of these modules.
- By combining the `version: '0'` syntax with `singleton: true` we can guarantee that this will be the case.

> NOTE: If `version: '0'` is omitted, you'll encounter an issue where a copy of react will be downloaded from the remoteEntry.

> NOTE: Another issue you may run into is an invalid hook call if you are federating a component that uses react hooks. This is directly related to multiple copies of react running at the same time. The above resolves this.

### The `host-app`

Within this application, we've configured the `remotes` object inside of the `NextFederationPlugin`.

## Setup

- run `yarn` - Install all the dependencies to run the apps in parallel.
- run `npm run install:apps` - Install all the required dependencies on both `host-app` and `remote-app`
- run `npm run start` - Start both `host-app` and `remote-app`
- `host-app` on `localhost:3000`
- `remote-app` on `localhost:3001`
- Navigate to `localhost:3000` - Two Button Component should be visible, one from remote and another from host app.

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
