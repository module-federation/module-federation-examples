# Controlled Vendor Sharing

Controlled Vendor Sharing is a dynamic application that introduces a control panel within the runtime plugin for Module Federation in rspack or `@module-federation/enhanced`. The control panel allows you to manage and modify the loading rules for shared modules, as well as upgrade or downgrade applications based on inputs from a React form.

## Features

- **Runtime Plugin**: A runtime plugin that controls the loading rules for shared modules.
- **Switch remotes by clicking button**: The ability to upgrade or downgrade applications or remote urls dynamically
- **Exposing Button Components**: `app1`, `app2`, and `app3` expose different button components for demonstration purposes. Clicking the button on `app1` dynamically loads either `app2` or `app3`, simulating the replacement of one remote with another, which could be a different version of the remote like a deployed version.

## Main Components

### `./pick-remote.ts`

This is the runtime plugin that controls the loading rules for module federation.

# Running Demo

To give the application a spin, run `pnpm start`. This command will build and serve `app1`, `app2`, and `app3` on ports 3001, 3002, and 3003 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
- [localhost:3003](http://localhost:3003/)

# Running Cypress E2E Tests

For running tests in interactive mode, execute `npm run cypress:debug` from the root directory of the project. This will open the Cypress Test Runner and allow you to run tests interactively. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build the app and run tests in headless mode, run `yarn e2e:ci`. This command will build the app and run tests for this workspace in headless mode. If tests fail, Cypress will create a `cypress` directory in the sample root folder with screenshots and videos.

["Best Practices, Rules and more interesting information here](../../cypress/README.md)
