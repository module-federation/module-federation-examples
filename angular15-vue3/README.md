# Microfrontends Angular 15

This project shows an example of using Webpack 5 Module Federation with Angular `15` using Vue 3 components from remote.

## Running the demo

- Install packages: `yarn install`
- Start the shell: `yarn start:shell`
- Start the shell: `yarn start:remote`
- Open the shell http://localhost:4200

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

## Project Structure

### Shell (shell)

The shell project located in: `shell` folder, its contains the shell application which is used to load remote Microfrontends.

```js
  plugins: [
    new ModuleFederationPlugin({
      shared: {
        "@angular/core": { eager: true, singleton: true },
        "@angular/common": { eager: true, singleton: true },
        "@angular/router": { eager: true, singleton: true },
        "@ngxs/store": {singleton: true, eager: true },
      },
    }),
  ],
```

### Remote (vue-remote)

The remote project located in: `vue-remote` folder, it exposes Vue component as an Vue App that could be mounted into needed element,
and exposes Custom Element that could be registered and added to the DOM.

```js
  new ModuleFederationPlugin({
    name: 'vue_remote',
    filename: 'remoteEntry.js',
    exposes: {
      './customElement': './src/components/HelloWorld.web-component.js',
      './app': './src/components/HelloWorld.bootstrap.js',
    },
    shared: {
      vue: {
        singleton: true,
      },
    },
  })
```
