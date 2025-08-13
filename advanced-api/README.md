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
