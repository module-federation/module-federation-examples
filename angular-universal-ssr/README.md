# Angular Universal Ssr Example

- `client-app`
- `host-app`

# Running Demo

Run `yarn start`. This will build and serve both `client-app`, `host-app`, on
ports `4000`, `5000`, respectively.

- [localhost:4000](http://localhost:4000/) (CLIENT_APP)
- [localhost:3000](http://localhost:3000/) (HOST_APP)

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
