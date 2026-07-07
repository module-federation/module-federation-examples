# Redux Reducer Injection Example

This example shows how you can share your redux store across your remote app and inject dynamically a reducer.

- app1 is the host application that create the store and add `injectReducer` to the `store` object.
- app2 is the remote application that inject in own reducer to the store that was passed by the props by `app1`

# Running Demo

1. `yarn install && pnpm run start`
2. Browse to localhost:3001

You should see a `Welcome to Host App` and a `button`

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=redux-reducer-injection&ep.readme_path=redux-reducer-injection%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fredux-reducer-injection&dt=ModuleFederationExamples+redux-reducer-injection%2FREADME.md">
