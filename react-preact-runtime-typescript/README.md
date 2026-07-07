# React and Preact Integration at Runtime

This example demonstrates how to run a React-based application (shell) while consuming a remote Preact-based application (remote) dynamically at runtime.

- `shell`: is the host application using React and ReactDOM.
- `remote`: The guest application built with Preact. It provides an injector function that allows the host application (shell) to import and mount it into a specified `<div>` element.

# How to Run the Demo

Run `pnpm run start`. This will build and serve both `shell` and `remote` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=react-preact-runtime-typescript&ep.readme_path=react-preact-runtime-typescript%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Freact-preact-runtime-typescript&dt=ModuleFederationExamples+react-preact-runtime-typescript%2FREADME.md">
