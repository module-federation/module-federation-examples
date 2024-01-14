# TypeScript-react-monorepo Example

This example demos a basic host/remote application with TypeScript and also streams types.

# Installation

```bash
npm install --global yarn
yarn
```

# Running Demo

Run `REMOTE_URL=http://localhost:4000 pnpm run start` in root folder. This will build and serve both `host` and `remote` on ports 3000 and 4000 respectively.

- [localhost:3000](http://localhost:3000/)
- [localhost:4000](http://localhost:4000/)

# Running Host RTL test through Jest

Go to host service folder and run `yarn test`
This is achieved using jest's moduleNameMapper by telling it how to resolve remote imports.

# Running Host Cypress Component test

Go to host service folder and run `yarn cypress`
This is achieved using webpack's `resolve.alias` by telling it how to resolve remote imports.

# FederationConfig

- For more settings, you can access federationConfig from path packages/[host or remote]/configs/federationConfig.js
- Use the .env file in the host project to change the remote address

# Tip

- Monorepo is requirement for jest to run.
