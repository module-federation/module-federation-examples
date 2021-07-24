# Next.js with Module Federation

Module Federation in Next.js depends on <a href="https://app.privjs.com/buy/packageDetail?pkg=@module-federation/nextjs-mf">@module-federation/nextjs-mf</a> It will not work unless you have access to this plugin, which is not free.

Due to the effort to support Next.js and funding constraints, I have moved the plugin to a paid model.

## Getting Started

1. run `npm install @module-federation/nextjs-mf --registry https://r.privjs.com` with npm 7 or install it directly in each folder/app, note the plugin is not free.
2. run `yarn start` and browse to `http://localhost:3000`, `http://localhost:3001`, or `http://localhot:3002`

# We are available to consult

Looking for SSR over `fetch()` or architecture support and designs for module federation and Next.js?

Contact me <a href="mailto:zackary.l.jackson@gmail.com">zackary.l.jackson@gmail.com</a> or <a href="https://twitter.com/scriptedalchemy">@ScriptedAlchemy</a> on Twitter

All solutions for next.js currently require a paid access or paid plugin

## Context

We have three next.js applications

- `checkout` - port 3000
- `home` - port 3001
- `shop` - port 3002

The applications utilize omnidirectional routing and pages or components are able to be federated between applications like a SPA

I am using hooks here to ensure multiple copies of react are not loaded into scope on server or client.

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

However, in the case of Next.js - you need to use <a href="https://app.privjs.com/buy/packageDetail?pkg=@module-federation/nextjs-mf">@module-federation/nextjs-mf</a>

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
