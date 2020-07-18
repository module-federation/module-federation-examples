# Redux Reducer Injection Example

This example shows how you can share your redux store across your remote app and inject dynamically a reducer.

- app1 is the host application that create the store and add `injectReducer` to the `store` object.
- app2 is the remote application that inject in own reducer to the store that was passed by the props by `app1`

# Running Demo

1. `yarn install && yarn start`
2. Browse to localhost:3001

You should see a `Welcome to Host App` and a `button`
<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/ReduxReducerInjection">
