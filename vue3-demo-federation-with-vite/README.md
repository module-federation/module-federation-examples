# vue3-demo-federation-with-vite

This project is a mix of `webpack-federation` and `vite-federation`

## vite-side

`vite` as a packaging tool, host uses `vite`, remote uses `webpack` project

## weboack-side

`webpack` as a packaging tool, host using `webpack`, remote uses `vite` project

## how to run

```shell
cd vue3-demo-federation-with-vite
pnpm install
pnpm build
pnpm serve
```

vite: http://localhost:5000/
<br>
webpack: http://localhost:5001/

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
