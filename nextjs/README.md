# Next.js with Module Federation

## Getting Started

1. run `yarn` to install from this directory, a `postinstall` script will perform the install in each next directory
2. run `yarn start` and browse to `http://localhost:3000` and `http://localhost:3001`

## Context

We have two next.js applications

- `next1` - port 3000
- `next2` - port 3001

The "main" application that is federating code (the host) is next2, visiting http://localhost:3001 should show you "This came fom next1 !!!"

I am using hooks here to ensure multiple copies of react are not loaded into scope on server or client.

## Challenges

### Sharing

Next.js does not have an async boundary. Between the entrypoint and the shared code.
Read this for more context: https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md

In order for webpack to figure out who shares what, an async boundary is typically needed somewhere before the module is used.
Usually, we can work around async boundaries for things like `react` by specifying the following

https://medium.com/dev-genius/module-federation-advanced-api-inwebpack-5-0-0-beta-17-71cd4d42e534?source=friends_link&sk=70658eb0bf58dfcc5ce534cb1cd78b1f

```js
const config = {
  shared: {
    react: {
      eager: true,
      singleton: true,
    },
  },
};
```

However, in the case of Next.js - this does not seem to work. I have also created a clean app, called `next3` which does absolutely nothing but usalize module federation to showcase immediate errors when attempting to use eager true

### Consuming Remotes

While sharing is one issue, the consuming a remote with the native `import` syntax also seems to run into issues.

> I did note, that i can get rid of emitting a secondary entry chunk if module federation uses name. webpack-runtime-next1 and i also change the runtimeChunk `name` to be the same. But this did not resolve my issues client or server

Inside `next2/pages/index.js` youll see i am using a hack workaround

```js
const RemoteTitle = dynamic(
  async () => {
    try {
      // seems to make webpack start loading the chunk, but fails
      require("next1/exposedTitle");
    } catch (e) {
      // will still fail if i try to requre it again, but can access via low level api?
      return handleFederation("next1/exposedTitle");
    }
  },
  { ssr: true }
);
```

If you try loading in next3, I have ssr set to false, which will work if sharing is working correctly. (or comment out with no hooks)

However on the server side, because i am missing async boundaries - I get the classic

```
[2] TypeError: fn is not a function
[2] while loading "./exposedTitle" from webpack/container/reference/next1
```

Which shows up when a remote container is not yet available.

## Reference Points

I do have some helpful examples floating around, hopefully these will be of use.

Next.js specific:

- https://github.com/module-federation/module-federation-examples/pull/155/
- https://github.com/module-federation/module-federation-examples/blob/master/nextjs-sidecar/

SSR Specific:

- https://github.com/module-federation/module-federation-examples/tree/master/server-side-rendering

Useful files in the SSR build.

- https://github.com/module-federation/module-federation-examples/blob/master/server-side-rendering/website1/build/webpack.config.js/server.base.js
- https://github.com/module-federation/module-federation-examples/blob/master/server-side-rendering/website1/build/webpack.config.js/client.base.js
- Entrypoint - https://github.com/module-federation/module-federation-examples/blob/master/server-side-rendering/website1/server/index.js
- Async import middleware - https://github.com/module-federation/module-federation-examples/blob/master/server-side-rendering/website1/server/server-entry.js

The async import middleware is where i keep the async boundary, this is also the only point of reference where React is import into scope.

By doing so, I can ensure that webpack has time to initialize and load anything it might need before attempting to actually require, and render the application.
