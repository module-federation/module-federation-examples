# Mixed React Versions and Compatibility with Module Federation

This example demonstrates how to use Module Federation to load and integrate different versions of React in a single application.

## Key Aspects

1. **Adapter for Hooks Compatibility**: An adapter is created to attach a hooks-friendly version of React to render a section of the app using modern versions. This allows components from different React versions to work together seamlessly.

2. **Separate React Versions**: 
   - `app1` uses an older version of React (pre-hooks era)
   - `app2` uses a modern version of React with hooks-based components

3. **Module Federation**: Module Federation is used to federate the components from `app2` into `app1`. This allows the consumption of components across different versions of React.

4. **Adapter Implementation**: The adapter consumes both versions of React to "translate" the props and facilitate the rendering of the federated components. It can be presented as a Higher-Order Component (HOC) or built into the federated components as a legacy export.

## Running the Demo

To run the demo, follow these steps:

1. Install the dependencies using `pnpm install`
2. Run `pnpm run start` to build and serve both `app1` and `app2` on ports 3001 and 3002 respectively
3. Open [localhost:3001](http://localhost:3001/) to view `app1` (HOST)
4. Open [localhost:3002](http://localhost:3002/) to view `app2` (STANDALONE REMOTE)

This example showcases the power of Module Federation in enabling the integration of different versions of React, allowing for incremental upgrades and the coexistence of legacy and modern components in a single application.