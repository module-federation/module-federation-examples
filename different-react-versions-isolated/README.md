> For an example implementation of using different React versions together with Module Federation, check out the runtime plugin folder [runtime-plugins/multiple-react-versions](https://github.com/module-federation/module-federation-examples/tree/master/runtime-plugins/multiple-react-versions).

# Different React Versions in Isolation

This example demos host and remote applications running in isolation with two different React versions and no shared libraries

- `app1` is the host application using one version of React and ReactDOM.
- `app2` is the guest application using a different version of React and ReactDOM. It exposes an injector function which lets the host application (app1) import it and inject it into a div element.

# Running Demo

Run `pnpm run start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=different-react-versions-isolated&ep.readme_path=different-react-versions-isolated%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fdifferent-react-versions-isolated&dt=ModuleFederationExamples+different-react-versions-isolated%2FREADME.md">
