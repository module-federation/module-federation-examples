# Module Federation with NexJS and Client Side React.

Module federation in NextJS depends on [@module-federation/nextjs-mf](https://www.npmjs.com/package/@module-federation/nextjs-mf).

> Use Case: Use `NextJS` as Host App and Remote app will be a flavour of `React + Webpack 5`.

# Context
There are 2 applications, 
- `host-app`: NextJS App
- `remote-app`: flavour of `React + Webpack 5`

`remote-app` is exposing a component called `Button` and the same button is consumed by `host-app`.

# Setup
- run `npm install` - Install all the dependencies to run the apps in parallel.
- run `npm run install:apps` - Install all the required dependencies on both `host-app` and `remote-app`
- run `npm run start` - Start both `host-app` and `remote-app`
- `host-app`  on `localhost:3000`
- `remote-app` on `localhost:3001`
- Navigate to `localhost:3000` - Two Button Component should be visible, one from remote and another from host app.