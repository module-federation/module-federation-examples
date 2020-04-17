# Nested Example

This example demos loading nested remote components.

- `app1` is the host application and async loads `ButtonContainer` from `app2`.
- `app2` is a standalone application that exposes `ButtonContainer` component which async loads `Button`.
- `app3` is a standalone application that exposes `Button` component.

# Running Demo

Run `yarn start`. This will build and serve both `app1`, `app2`, and `app3` on ports 3001, 3002, and 3003 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
- [localhost:3003](http://localhost:3003/) (STANDALONE REMOTE)
