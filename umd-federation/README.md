# UMD Federation Demo

This example demonstrates loading 3 remotes using the ModuleFederationPlugin
1. app2 (umd remote react app)
2. @remix-run/routr (umd remote library)
3. mf-app-01 (mf remote react app)


Run `npm run start`. This will build and serve both `app1` and `app2` on ports 9001 and 9002 respectively.

- HOST (app1): [localhost:9001](http://localhost:9001)
- REMOTE (app2): [localhost:9002](http://localhost:9002/main.js)
- REMOTE (mf-app-01): [https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js](https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js)

## try online

https://stackblitz.com/github/module-federation/module-federation-examples/tree/master/umd-federation?file=app1/webpack.config.js
