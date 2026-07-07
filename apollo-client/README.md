# Apollo Client

This example demonstrates using Apollo Client with Module Federation.

- `app1` This app consumes the `Content` component from `app2` and uses React.lazy to load it.
- `app2`This app exposes the `Content` component and split it into a separate chunk using `React.lazy`.

The `app2` is used to expose a component called `Content` and a route called `userRoute`.

## Running Demo

Run `yarn` to install the dependencies.

Run `pnpm run start` this will build and start all applications.

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (app1)
- [localhost:3001](http://localhost:3001/) (app2)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=apollo-client&ep.readme_path=apollo-client%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fapollo-client&dt=ModuleFederationExamples+apollo-client%2FREADME.md">
