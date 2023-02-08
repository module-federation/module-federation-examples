# Module Federation - React Router DOM nested routers
This example shows how to handle independent and nested routings in a MFE setup based on [webpack-module-federation](https://github.com/module-federation). The setup consists of:

- `app1` & `app2`: apps using a browser history strategy when acting as hosts and an in-memory history strategy when acting as remotes.
- `shell`: host app based on a browser history strategy that handles high-level routing. Shell routing determines mounting/unmounting of `app1` and `app2` remotes.

The shell is the only component responsible for updating browser url. The two level of history strategies (browser + in-memory) are kept in sync through an event-based communication between shell and remotes.

<br>

# Running the demo
1. Install deps: `yarn install`.
2. Start apps: `yarn start`.

Visit http://localhost:8080 to navigate `shell` app. `app1` and `app2` are also exposed as standalone apps at http://localhost:8081 and http://localhost:8082 respectively. 

<br>

# Running Cypress E2E Tests

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

To run tests in interactive mode, run  `yarn cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

# Credits
The setup is inspired to https://github.com/StephenGrider/mfe. 
