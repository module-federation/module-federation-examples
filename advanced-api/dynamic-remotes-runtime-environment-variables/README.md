# Module Federation Dynamic Remotes With Runtime Environment Variables

This example shows how to implement runtime environment variables when using dynamic remotes in module federation.

- `host` is the host application.
- `remote` standalone application which exposes `Widget` component.

The runtime environment variables when using Client-Side-Rendering solution was inspired by this article:
[https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/]

# Running Demo

Run `yarn start`. This will build and serve both `host` and `remote` on ports 3000 and 3001 respectively.

- [localhost:3000](http://localhost:3000/) (HOST)
- [localhost:3001](http://localhost:3001/) (STANDALONE REMOTE)

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)