# Self-Healing Example

This example demos self-healing capabilities with Module Federation. `app2` depends on and is expecting a shared dependency to be provided in `app1`.

---

In `app2`'s webpack config we are expecting `styled-components` to be a shared dependency with the `app1` host application.

```js
// app1 webpack.config.js
new ModuleFederationPlugin({
    // ...
    shared: ["react", "react-dom"] // note lack of "styled-components"
}),
```

```js
// app2 webpack.config.js
new ModuleFederationPlugin({
    // ...
    shared: ["react", "react-dom", "styled-components"],
}),
```

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- HOST: [localhost:3001](http://localhost:3001/)
- REMOTE: [localhost:3002](http://localhost:3002/)

Notice that the button in both apps are the same even though the host app didn't provide `styled-components` as a dependency. If you open DevTools and checkout the "Network" tab you can see 2 requests were made to `app2`; the remote `<Button />` component and the missing `styled-components` vendor code.
<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/SelfHealing">

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
