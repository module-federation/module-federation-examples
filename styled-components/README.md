# Styled Components + MF

This sample shows how to use [Styled Components](https://www.styled-components.com/) with MF and React SSR.

- app1: consumes styled-components federated from app2
- app2: uses styled-components and exposes it to app1

## Running Demo

Run `yarn` to install the dependencies.

To run this demo you will need to open 2 terminals.

```bash
# Terminal 1
cd app1
pnpm run start
```

```bash
# Terminal 2
cd app2
pnpm run start
```

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (app1)
- [localhost:3001](http://localhost:3001/) (app2)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=styled-components&ep.readme_path=styled-components%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fstyled-components&dt=ModuleFederationExamples+styled-components%2FREADME.md">
