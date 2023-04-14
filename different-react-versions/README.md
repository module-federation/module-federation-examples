# Mixed React Versions and Compatibility levels

This example demos the ability to load two separate versions of react (v16.6.3 and v16.13.1).

> Check the typescript version of this example [here](../different-react-versions-typescript/README.md).

Module Federation allows us to create an adapter which attaches a hooks-friendly version to render a section of thr app using modern versions.

- `app1` uses and older version of react, not compatible with react Hooks
- `app2` uses a modern react version and its components are hooks based

## Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

## How it works

This example contains two important components, the `ReactAdapterConsumer` and `ReactAdapterProvider`. They are responsible to make the two versions of react work together.

The adapter consumes both versions of react to "translate" the props into a fresh render. This could be presented as a HOC or federated components could have a legacy export containing the adapter build in.

### [ReactAdapterProvider](./app2/src/components/ReactAdapterProvider.js)

This component is responsible to dynamic render/hydrate the federated component using it host version of React.

> You can see the usage [here](./app2/src/components/ModernReactComponent.js#24).

```jsx
import React from 'react';

const Button = props => {
  return <button style={{ color: props.color }}>Click me</button>;
};

export const Adapted = React.forwardRef((props, ref) => {
  return <ReactAdapterProvider component={Button} color="red" ref={ref} />;
});
```

### [ReactAdapterConsumer](./app1/src/components/ReactAdapterConsumer.js)

This component is responsible to render the federated component using the remote version of React.

> You can see the usage [here](./app1/src/components/App.js#29).

```jsx
<ReactAdapterConsumer
  color="blue"
  fallback={<div>Loading...</div>}
  importer={() => import('app2/Button').then(module => ({ default: module.Adapted }))}
/>
```

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/DifferentReactVersions">

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
