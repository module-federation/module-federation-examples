# Version Discrepency Example

This example demos two federated apps that use two different versions of lodash.

- `app1` uses lodash@4.10.0.
- `app2` uses lodash@4.11.0 and `lodash.nth`--a feature not available in lodash@4.10.0.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
