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

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=typescript-react-monorepo&ep.readme_path=typescript-react-monorepo%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Ftypescript-react-monorepo&dt=ModuleFederationExamples+typescript-react-monorepo%2FREADME.md">
