# Shared App Shell, State, Routing and Components Example

This example demos a basic host application loading remote component.

- `shell` is the App Shell
- `dashboard` - standalone application
- `order` - standalone application
- `sales` - standalone application
- `profile` - standalone application

# Running Demo

To run the application, run `pnpm run start`. This will build all the apps `shell`, `dashboard`, `order`, `profile`, `sales` on different ports as shown below

- [localhost:3000](http://localhost:3000/) (HOST) - `shell`
- [localhost:3001](http://localhost:3001/) (STANDALONE REMOTE) - `dashboard`
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE) - `order`
- [localhost:3003](http://localhost:3003/) (STANDALONE REMOTE) - `sales`
- [localhost:3004](http://localhost:3004/) (STANDALONE REMOTE) - `profile`

You will notice that each of the above URLs will look exactly same. For more details [Watch this YouTube video](https://www.youtube.com/watch?v=-LNcpralkjM)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=shared-routing&ep.readme_path=shared-routing%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fshared-routing&dt=ModuleFederationExamples+shared-routing%2FREADME.md">
