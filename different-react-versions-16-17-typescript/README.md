> For an example implementation of using different React versions together with Module Federation, check out the runtime plugin folder [runtime-plugins/multiple-react-versions](https://github.com/module-federation/module-federation-examples/tree/master/runtime-plugins/multiple-react-versions).


# Mixed React Versions and Compatibility levels

This example demos the ability to load two separate versions of react.

Module Federation allows us to create an adapter which attaches a hooks-friendly version to render a section of thr app using modern versions.

- `app1` uses and older version of react, not compatible with react Hooks
- `app2` uses a modern react version and its components are hooks based

The adapter consumes both versions of react to "translate" the props into a fresh render. This could be presented as a HOC or federated components could have a legacy export containing the adapter build in.

# Running Demo

Run `pnpm run start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/DifferentReactVersions">
