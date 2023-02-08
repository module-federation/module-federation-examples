# Create React App Example

This example demos a basic host application loading remote component.

- `host` is the host application (cra-based).
- `remote` standalone application (cra-based) which exposes `Button` component.

# Running Demo

Run `yarn start`. This will build and serve both `host` and `remote` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3000/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
