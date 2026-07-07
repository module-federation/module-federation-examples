# UMD Federation Demo

This example demonstrates loading 3 remotes using the ModuleFederationPlugin

1. app2 (umd remote react app)
2. @remix-run/routr (umd remote library)
3. mf-app-01 (mf remote react app)

Run `npm run start`. This will build and serve both `app1` and `app2` on ports 9001 and 9002 respectively.

- HOST (app1): [localhost:9001](http://localhost:9001)
- REMOTE (app2): [localhost:9002](http://localhost:9002/main.js)
- REMOTE (mf-app-01): [https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js](https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

## try online

https://stackblitz.com/github/module-federation/module-federation-examples/tree/master/umd-federation?file=app1/webpack.config.js

Create lerna.json if you are in online example
{
"version": "0.0.0",
"npmClient": "yarn",
"useWorkspaces": true
}

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=umd-federation&ep.readme_path=umd-federation%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fumd-federation&dt=ModuleFederationExamples+umd-federation%2FREADME.md">
