# Nested Example

This example demos loading nested remote components.

- `app1` is the host application and async loads `ButtonContainer` from `app2`.
- `app2` is a standalone application that exposes `ButtonContainer` component which async loads `Button`.
- `app3` is a standalone application that exposes `Button` component.

# Running Demo

Run `pnpm run start`. This will build and serve both `app1`, `app2`, and `app3` on ports 3001, 3002, and 3003 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
- [localhost:3003](http://localhost:3003/) (STANDALONE REMOTE)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=nested-remote&ep.readme_path=nested-remote%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fnested-remote&dt=ModuleFederationExamples+nested-remote%2FREADME.md">
