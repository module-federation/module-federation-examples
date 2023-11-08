# Rollup Federation Demo

This example demos consumption of federated modules from a Rollup bundle. `rollup-spa` depends on a component exposed by `webpack-spa`.

---

# Running Demo

Run `yarn install` this will install dependencies for all 3 apps and root.
Run `yarn start`. This will build and serve all three `webpack-spa`, `rollup-spa`  and `rs-sidecar` on ports 8081, 8082, 8080 respectively.

- SIDECAR (rollup-spa): [localhost:8080](http://localhost:8080/)
- REMOTE (webpack-spa): [localhost:8081](http://localhost:8081/)
- HOST (rollup-spa): [localhost:8082](http://localhost:8082/)

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
