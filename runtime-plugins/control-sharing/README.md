# Controlled Vendor Sharing

Dynamic Vendor Sharing is an application that implements a control panel in the runtime plugin for module federation 1.5 in rspack or `@module-federation/enhanced`. The control panel allows you to deterministically manage and modify the rules for shared modules, as well as upgrade or downgrade applications based on the inputs from the React form.

## Features

- Runtime plugin that implements rules for module sharing.
- React form for modifying the rules.
- Ability to upgrade or downgrade applications.
- `app1` and `app2` exposing different button components.

## Main Components

### `./app1/control-share.ts`

This is the runtime plugin that implements the rules for module federation.

### `./app1/src/ControlPanel.js`

This is a React form that allows for the modification of rules implemented in `control-share.ts`.

# Running Demo

Run `pnpm run start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)

# Running Cypress E2E Tests

To run tests in interactive mode, run `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
