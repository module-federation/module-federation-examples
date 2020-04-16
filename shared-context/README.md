# Shared Context Example

This example demos a host application wrapped in a ContextProvider and renders a remote component consuming the ContextProvider value.

- `app1` is the host application and is wrapped with `NameContextProvider` with value of `"Billy"`.
- `app2` standalone application which exposes `Welcome` component. `Welcome` renders `"Welcome, <name>"`, where name is the value provided from `NameContextProvider.
- `shared-library` is a library that would be shared between `app1` and `app2`. This library contains `NameContextProvider` component.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
