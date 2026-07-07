# Server Side Rendering Example

Module Federation Server Side Rendering example using React Suspense.

This example demonstrates a basic shell application loading remote components and rendering them server side.

- `shell` is the host application which includes the SSR server.
- `remote1` standalone application which exposes `Content` component and consumes `Image` from `remote2`
- `remote2` standalone application which exposes `Image` component.

## Running Demo

Run `yarn` to install the dependencies.

Run `pnpm run start` this will build and start all applications.

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (SHELL)
- [localhost:3001](http://localhost:3001/) (STANDALONE REMOTE1)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE2)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=react-18-ssr&ep.readme_path=react-18-ssr%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Freact-18-ssr&dt=ModuleFederationExamples+react-18-ssr%2FREADME.md">
