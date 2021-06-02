# Next.js with Module Federation only client side integration

## Getting Started

1. Run `yarn` from this directory to install all the dependencies. `lerna` will install dependencies in each subdirectory.
2. Run `yarn start` and browse to:
 - http://localhost:3001 displays the `nextjs` app (host).
 - http://localhost:8886 displays the `chat` app (remote).
 - http://localhost:8888 displays the `reception` app (remote).

## Requirements

1) The remotes don't need to be server-side rendered. 
2) A package should not be downloaded more than once if the package is shared between host and/or remotes. 
3) We don't want to expose React components directly from the remotes. Each remote should expose a function that can mount React components in a given DOM element.


## Context

We have 1 Next.js application that hosts 2 React remote applications. The Next.js app works as a shell that renders some layout and provides cross-cutting concerns such as feature flags. 

The "main" application that is federating code (the host) is the `nextjs` folder. Visiting http://localhost:3001 should show you "This a Next.js host 🚀" at the top left corner of the page + the remote reception app.

The `reception` folder contains a React app that exposes some modules. The `chat` folder contains a React app that exposes some modules.

## Challenges
### Consuming Remotes

Webpack needs an async boundary to figure out which modules are shared. Since Next.js v10.2.3 does not have an async boundary Webpack doesn't seem to resolve modules in the shared scope. 

E.g. `nextjs` and `reception` use the same version of React. If you navigate to http://localhost:3001 only 1 copy of React should be downloaded. However, the shared scope doesn't work when using `dynamic from "next/dynamic"` resulting in React being downloaded twice.


Inside `nextjs/components/LoadNextMF.jsx` there is a workaround using the Dynamic Remote Vendor Sharing API. The workaround is based on [this example](https://github.com/module-federation/module-federation-examples/blob/master/advanced-api/dynamic-remotes/app1/src/App.js).

You can see how we use the workaround in `nextjs/pages/index.js`:
```jsx
<LoadNextMF
  url="http://localhost:8886/remoteEntry.js"
  scope="reception"
  module="./App"
/>
```

This workaround enables Webpack to use the shared scope between:
1. The host and the remote. e.g. navigating to http://localhost:3001 doesn't download React from http://localhost:8888.
2. Two remotes. e.g. navigating from http://localhost:3001 to http://localhost:3001/chat doesn't download dependencies shared only between the two remotes, such as React Router in this example.

### Sharing

Sharing federated modules from Next.js v10.2.3 doesn't seem to work and this example doesn't address the issue. More on the issue [here](module-federation-examples/tree/nextjs-client-only/nextjs-client-only#sharing).

In this example we share modules from React apps (`reception` and `chat`) to Next.js.

## Reference Points

Module Federation specific:

- https://github.com/module-federation/module-federation-examples/blob/master/advanced-api/dynamic-remotes/app1/src/App.js
