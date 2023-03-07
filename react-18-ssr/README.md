# Server Side Rendering Example

Module Federation Server Side Rendering example using React Suspense.

This example demonstrates a basic shell application loading remote components and rendering them server side.

- `shell` is the host application which includes the SSR server.
- `remote1` standalone application which exposes `Content` component and consumes `Image` from `remote2`
- `remote2` standalone application which exposes `Image` component.

## Running Demo

Run `yarn` to install the dependencies.

Run `yarn start` this will build and start all applications.

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (SHELL)
- [localhost:3001](http://localhost:3001/) (STANDALONE REMOTE1)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE2)
