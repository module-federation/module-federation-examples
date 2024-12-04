# Dynamic Remotes on Node w/ TypeScript

Similar to browser side dynamic remotes.

This allows you to dynamically load remote containers on the server.

`pnpm run start` will initiate a build and http server, then the node will load the remotes. The host will poll for changes on the remote and reload when they are detected.

NOTE: HMR is not supported on the server side yet, so we can't get notified of changes in the remote. We have to poll for changes.