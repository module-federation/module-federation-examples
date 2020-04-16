# Module Federation Examples

This repository is to showcase examples on Webpack 5's new Module Federation can be used.

# Examples

> Legend:
>
> - ⚠️: In Progress/Incomplete

- [x] [Basic Host-Remote](./basic-host-remote/README.md) &mdash; App 1 consumes remote components from App2.
- [x] [Bi-Directional Hosts](./bi-directional/README.md) &mdash; App1 consumes App2 components; App2 consumes App1 components.
- [x] [Self-Healing](./self-healing/README.md) &mdash; Fallback to remote apps vendors if a dependency fails to load.
- [x] ⚠️ [Server-Side Rendering](./server-side-rendering/README.md) &mdash; App1 and App2 with SSR.
- [x] [Multi UI Framework Federation](./comprehensive-demo/README.md) &mdash; Multiple Apps in different technologies federated.
- [x] [Dynamic System Host](./dynamic-system-host/README.md) &mdash; Swap between remotes at runtime.
- [x] [Redux Reducer Injection](./redux-reducer-injection.md) &mdash; Dynamically inject reducers to host store at runtime.
- [x] [Shared Routes](./shared-routes2) &mdash; Compose federated routes for a seamless user experience.
- [ ] Nested Interleaved Components
- [x] Share State/Context Providers
- [ ] Non-UI Module
- [x] Routing
- [ ] Nested
- [x] Version Discrepancy
- [x] [TypeScript](./typescript/README.md) &mdash; Simple host/remote example using TypeScript.
- [ ] NextJS
