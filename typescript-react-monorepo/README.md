# TypeScript-react-monorepo Example

This example demos a basic host/remote application with TypeScript and also streams types.

# Installation

```bash
npm install --global yarn
yarn
```

# Running Demo

Run `pnpm run start` in root folder. This will build and serve both `host` and `app1`, `app2` on ports `4000` and `3000,3001` respectively.

- [localhost:3000](http://localhost:3000/)
- [localhost:3001](http://localhost:3001/)
- [localhost:4000](http://localhost:4000/)

# FederationConfig

- For more settings, you can access federationConfig from path packages/[host or remote]/configs/federationConfig.js
- Use the .env file in the host project to change the remote address

# Tip

- Monorepo is used for ease of use. But there is no requirement to use it.
- This project demonstrates the functionality of @module-federation/typescript. To read more, you can refer to the documentation of this package.
