# Shared Context Example

This example demos a host application wrapped in a ContextProvider and renders a remote component consuming the ContextProvider value.

- `app1` is the host application and is wrapped with `NameContextProvider` with value of `"Billy"`.
- `app2` standalone application which exposes `Welcome` component. `Welcome` renders `"Welcome, <name>"`, where name is the value provided from `NameContextProvider.
- `shared-library` is a library that would be shared between `app1` and `app2`. This library contains `NameContextProvider` component.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
  <img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/SharedContext">

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
