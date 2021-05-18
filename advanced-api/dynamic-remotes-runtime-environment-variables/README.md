# Module Federation Dynamic Remotes With Runtime Environment Variables

This example shows how to implement runtime environment variables when using dynamic remotes in module federation.

- `host` is the host application.
- `remote` standalone application which exposes `Widget` component.

The runtime environment variables when using Client-Side-Rendering solution was inspired by this article:
[https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/]

# Running Demo

Run `yarn start`. This will build and serve both `host` and `remote` on ports 3000 and 3001 respectively.

- [localhost:3000](http://localhost:3000/) (HOST)
- [localhost:3001](http://localhost:3001/) (STANDALONE REMOTE)
