# Dynamic System Host Example

This example demos a basic host application loading remote component.

- `app1` is the host application.
- `app2` standalone application which exposes `Widget` component.
- `app3` standalone application which exposes `Widget` component that requires
  `momentjs`.

# Running Demo

Run `yarn start`. This will build and serve both `app1`, `app2`, and `app3` on
ports `3001`, `3002`, and `3003` respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
- [localhost:3003](http://localhost:3003/) (STANDALONE REMOTE)
  <img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/DynamicSystemHost">
