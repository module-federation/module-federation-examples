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
Run `yarn start` to build and serve the shell, shared-store, react-counter and vue-counter at once.

The shell will be accessible on [localhost:3001](http://localhost:3001/)
<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/SharedStoreCrossFramework">
