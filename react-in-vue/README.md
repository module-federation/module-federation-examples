# react in Vue - Module Federation Demo

This example demos consumption of federated modules from a Webpack bundle. `layout` app (vue based) depends on a component exposed by `home` app (react based). It is a simple proof of concept using `ReactDOMServer.renderToString` to inject data a html string into a vue template.

---

# Running Demo

Run `yarn start` . This will build and serve both `home` and `layout` on ports 3002 and 3001 respectively.

- HOST (layout): [localhost:3001](http://localhost:3001/)
- REMOTE (home): [localhost:3002](http://localhost:3002/)
