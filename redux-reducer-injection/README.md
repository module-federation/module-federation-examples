# Redux reducer injection Example

This example shows how you can share your redux store across your remote app and inject dynamically a reducer.

- app1 is the host application that create the store and add `injectReducer` to the `store` object.
- app2 is the remote application that inject in own reducer to the store that was passed by the props by `app1`

# Running Demo
1) `yarn install && yarn start`
2) Browse to localhost:3001

You should see a `Welcome to Host App` and a `button`
