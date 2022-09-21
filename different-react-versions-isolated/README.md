# Different React Versions in Isolation

This example demos host and remote applications running in isolation with two different React versions and no shared libraries

- `app1` is the host application using one version of React and ReactDOM.
- `app2` is the guest application using a different version of React and ReactDOM. It exposes an injector function which lets the host application (app1) import it and inject it into a div element.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/BasicRemoteHost">
