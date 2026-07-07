# Shared Store Cross Framework Example

This example demos a Vue3 in React application which shares the same store.

- `shell` is the host application made with react wich display a counter based on the `shared-store` state
- `shared-store` exposes a counter state using a tiny framework agnostic store named [Effector](https://effector.dev/).
- `react-counter` exposes two buttons which an increment and decrement the counter using the `shared-store`
- `vue-counter` exposes two buttons which an increment and decrement the counter using the `shared-store`

# Running Demo

[Code Sandbox](https://codesandbox.io/s/module-federation-shared-store-cross-framework-o4o8w8)
[Code Sandbox's fullscreen demo](https://o4o8w8.sse.codesandbox.io/)\

## Run it locally

Run `yarn` to install the dependencies.\
Run `pnpm run start` to build and serve the shell, shared-store, react-counter and vue-counter at once.

The shell will be accessible on [localhost:3001](http://localhost:3001/)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=shared-store-cross-framework&ep.readme_path=shared-store-cross-framework%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fshared-store-cross-framework&dt=ModuleFederationExamples+shared-store-cross-framework%2FREADME.md">
