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
yarn start
```

```bash
# Terminal 2
cd app2
yarn start
```

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (app1)
- [localhost:3001](http://localhost:3001/) (app2)
