# Advanced API: Startup code

This is s basic host remote example, with startup code that sets the remotes public path dynamically.

- startup code is merged in with the remoteEntry
- `app1` is the host application.
- `app2` standalone application which exposes `Button` component.

# Running Demo

Run `yarn build && yarn serve`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.
Currently, webpack-dev-server has a bug that incorrectly appends an entrypoint to the end of the remote.

This prevents us from attaching remotes correctly to the internal scope.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/StartupCode">
