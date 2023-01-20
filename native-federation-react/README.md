# Module Federation using ESbuild

## Usage

1. npm install
2. npm run build
3. npm run start

Apps will be running on http://localhost:3000, http://localhost:3001

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

## Help Wanted

Commonjs support:

Right now we depend on importing commonjs libraries from esm.sh like:

```js
import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom';
```

It would be nice if we can use:

```js
import React from 'react';
import ReactDOM from 'react-dom';
```


