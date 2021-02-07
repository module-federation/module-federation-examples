# Dynamic Remote with Vendor Sharing and Synchronous imports Example

This example demos a basic host application loading remote component and sharing vendor code dynamically between unknown remotes

- `app1` standalone application which exposes `Widget` component.
- `app2` standalone application which exposes `Widget` component that requires
  `momentjs`.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports
`3001` and `3002` respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
  <img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/advanced-api/dynamic-remotes">
