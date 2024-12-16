# React and Preact Integration at Runtime

This example demonstrates how to run a React-based application (shell) while consuming a remote Preact-based application (remote) dynamically at runtime.

- `shell`: is the host application using React and ReactDOM.
- `remote`: The guest application built with Preact. It provides an injector function that allows the host application (shell) to import and mount it into a specified `<div>` element.

# How to Run the Demo

Run `pnpm run start`. This will build and serve both `shell` and `remote` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
