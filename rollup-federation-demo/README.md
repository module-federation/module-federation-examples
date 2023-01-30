# Rollup Federation Demo

This example demos consumption of federated modules from a Rollup bundle. `rollup-spa` depends on a component exposed by `webpack-spa`.

---

# Running Demo

Run `yarn install` this will install dependencies for all 3 apps and root.
Run `yarn start`. This will build and serve all three `webpack-spa`, `rollup-spa`  and `rs-sidecar` on ports 8081, 8082, 8080 respectively.

- SIDECAR (rollup-spa): [localhost:8080](http://localhost:8080/)
- REMOTE (webpack-spa): [localhost:8081](http://localhost:8081/)
- HOST (rollup-spa): [localhost:8082](http://localhost:8082/)
