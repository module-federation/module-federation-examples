# TypeScript-react-monorepo Example

This example demos a basic host/remote application with TypeScript and also streams types.

# Installation

```bash
npm install --global yarn
yarn
```

# Running Demo

Run `yarn start` in root folder. This will build and serve both `host` and `remote` on ports 3000 and 4000 respectively.

- [localhost:3000](http://localhost:3000/)
- [localhost:4000](http://localhost:4000/)

# FederationConfig

- For more settings, you can access federationConfig from path packages/[host or remote]/configs/federationConfig.js
- Use the .env file in the host project to change the remote address

# Tip

- Monorepo is used for ease of use. But there is no requirement to use it.
- This project demonstrates the functionality of @module-federation/typescript. To read more, you can refer to the documentation of this package.
