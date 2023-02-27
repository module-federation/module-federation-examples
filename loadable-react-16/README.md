# Server Side Federation

This example demonstrates how to federate both components and routes between two servers.

- `app1` An application with an express server that renders a React application which consumes an exposed component from `app2`, and have an API route that implements an exposed route from `app2`.
- `app2` An application with an express server that renders a React application which federates/exposes a component called Content and an express route called userRoute.

The `app1` has an express route called `/api/user`, this route consumes an federated/exposed function from app2, then it calls the function passing the request and response objects, and finally it returns the response. This app also consumes a federated/exposed component from `app2`, called `Content`, the component receives a dynamic prop that can be modified by typing in the input field, this shows the component reactivity.

The `app2` is used to expose a component called `Content` and a route called `userRoute`.

## Running Demo

Run `yarn` to install the dependencies.

Run `yarn start` this will build and start all applications.

Bellow you can see the port mapping:

- [localhost:3000](http://localhost:3000/) (app1)
- [localhost:3001](http://localhost:3001/) (app2)
