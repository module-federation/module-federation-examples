# Svelte host and remote

## Getting started

From this directory execute:

- npm run install:deps
- npm run serve:remote
- npm run serve:host (in a different terminal)

Open your browser at http://localhost:5173/ to see the amazing result

![screenshot](docs/screenshot.png)

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
