# Dynamic Remotes on Node

Similar to browser side dynamic remotes.

This allows you to dynamically load remote containers on the server.

`pnpm run start` will initiate a build and http server, then node will execute a simple test.

## runtime-container
This example shows the same thing but how to do it outside of the webpack runtime (outside a webpack bundle). See the script `import-remote.js`, which is not compiled by webpack. Run the command `yarn import-remote` or simply, `node import-remote.js`
