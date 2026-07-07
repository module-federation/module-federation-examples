# Server Side Federation

This example demonstrates how to federate both components and routes between two servers.

- `app1` An application with an express server that renders a React application which consumes an exposed component from `app2`, and have an API route that implements an exposed route from `app2`.
- `app2` An application with an express server that renders a React application which federates/exposes a component called Content and an express route called userRoute.

The `app1` has an express route called `/api/user`, this route consumes an federated/exposed function from app2, then it calls the function passing the request and response objects, and finally it returns the response. This app also consumes a federated/exposed component from `app2`, called `Content`, the component receives a dynamic prop that can be modified by typing in the input field, this shows the component reactivity.

The `app2` is used to expose a component called `Content` and a route called `userRoute`.

## Running Demo

Run `yarn` to install the dependencies.

Run `pnpm run start` this will build and start all applications.

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (app1)
- [localhost:3001](http://localhost:3001/) (app2)

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=loadable-react-16&ep.readme_path=loadable-react-16%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Floadable-react-16&dt=ModuleFederationExamples+loadable-react-16%2FREADME.md">
