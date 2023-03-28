# React 18 Code Splitting

This example demonstrates how to use Code Splitting with React 18.

- `app1` This app consumes the `Content` component from `app2` and uses React.lazy to load it.
- `app2`This app exposes the `Content` component and split it into a separate chunk using `React.lazy`.

The `app2` is used to expose a component called `Content` and a route called `userRoute`.

## Running Demo

Run `yarn` to install the dependencies.

Run `yarn start` this will build and start all applications.

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (app1)
- [localhost:3001](http://localhost:3001/) (app2)
