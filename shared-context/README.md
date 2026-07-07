# Shared Context Example

This example demos a host application wrapped in a ContextProvider and renders a remote component consuming the ContextProvider value.

- `app1` is the host application and is wrapped with `NameContextProvider` with value of `"Billy"`.
- `app2` standalone application which exposes `Welcome` component. `Welcome` renders `"Welcome, <name>"`, where name is the value provided from `NameContextProvider.
- `shared-library` is a library that would be shared between `app1` and `app2`. This library contains `NameContextProvider` component.

# Running Demo

Run `pnpm run start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=shared-context&ep.readme_path=shared-context%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fshared-context&dt=ModuleFederationExamples+shared-context%2FREADME.md">
