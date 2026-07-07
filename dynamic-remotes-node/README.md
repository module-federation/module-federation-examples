# Dynamic Remotes on Node w/ Javascript

Similar to browser side dynamic remotes.

This allows you to dynamically load remote containers on the server.

`pnpm run start` will initiate a build and http server, then the node will load the remotes. The host will poll for changes on the remote and reload when they are detected.

NOTE: HMR is not supported on the server side yet, so we can't get notified of changes in the remote. We have to poll for changes.

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=dynamic-remotes-node&ep.readme_path=dynamic-remotes-node%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fdynamic-remotes-node&dt=ModuleFederationExamples+dynamic-remotes-node%2FREADME.md">
