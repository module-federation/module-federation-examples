# 🧰 Module Federation Types 🧰

> This repo host module federation types can may exist

This repo has some examples of module federation that may exist, and it's a WIP, so we will add examples along the way, for instance, react host with react remote and more.

- Disclaimer for NextJS apps you need the lates version of `@module-federation/nextjs-mf` that is a paid module, you can read more [here](https://app.privjs.com/buy/packageDetail?pkg=@module-federation/nextjs-mf)

#### ⬇️ Host

- It is a top-level app that depends on modules exposed from a remote app
- Runs on port `8080`

#### ⬆️ Remote

- Exposes components: for example `Nav` to another app called host.
- Runs on port `8081`

#### 🔄 BI-Directional

It is a middle-level app, which depends on modules exposed from remote app, for example can be : react ,react-dom or others. In the meantime, it also exposes components: for example `Nav` to another host apps

### 🛠️ Set Up and running module federation types

- Clone the project
- Navigate to the type of module federation you are interested to run
  - For example we will illustrate for: `nextjs-host-remote`
  - Navigate to `nextjs-host-remote` folder
  - Run in the root folder: `yarn`
  - Run: `yarn start`
  - Navigate to: [http://localhost:8080/](http://localhost:8080/)

## 🖇️ Types

- To run every type, please take a look: _Set Up and running module federation types_

### 💠 NextJS Host and NextJS Remote

- Module federation that has a host app with NextJS and a remote app with NextJS
- This type of module federated at folder: `nextjs-host-remote`

### 💠 React Host and React Remote

- Module federation that has a host app with React and a remote app with React
- This type of module federated at folder: `react-host-remote`

### 💠 React Host and NextJS Remote

- Module federation that has a host app with React and a remote app with NextJS
- This type of module federated at folder: `react-host-nextjs-remote`

### 💠 NextJS Host and React Remote

- Module federation that has a host app with NextJS and a remote app with React
- This type of module federated at folder: `nextjs-host-react-remote`

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)