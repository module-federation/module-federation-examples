# Advanced API

Examples in this directory showcase early implementations of advanced Module Federation features. Each subfolder is a standalone example with its own documentation.

## Available examples

- [Automatic Vendor Sharing](./automatic-vendor-sharing/README.md) – automatically detect and share common dependencies across federated builds.
- [Dynamic Remotes](./dynamic-remotes/README.md) – dynamically load and share code from remotes that aren't known to the host at build time.
- [Dynamic Remotes with Runtime Environment Variables](./dynamic-remotes-runtime-environment-variables/README.md) – configure remote URLs via runtime-provided environment variables and container-friendly setups.
- [Dynamic Remotes with Synchronous Imports](./dynamic-remotes-synchronous-imports/README.md) – change remote URLs at runtime while keeping static import syntax like `import Widget from 'app2/Widget'`.

## Getting started

Install dependencies at the repository root:

```bash
pnpm install
```

Then run or build any example from its folder, e.g.:

```bash
pnpm --filter automatic-vendor-sharing_* start
pnpm --filter dynamic-remotes_* build
```

See each example's README for detailed instructions.

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=advanced-api&ep.readme_path=advanced-api%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fadvanced-api&dt=ModuleFederationExamples+advanced-api%2FREADME.md">
