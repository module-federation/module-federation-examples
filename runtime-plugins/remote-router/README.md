# Remote Router

This example uses a runtime plugin to keep remote routing and loading policy out of the compiled host. The plugin rewrites configured remote entries at runtime, provides fallback modules for failed remotes, records hook telemetry, customizes script loading, and observes preload hooks.

## Runtime Plugin Hooks

- `apply(instance)`: initializes plugin-level observability with the host instance name.
- `beforeRequest(args)`: rewrites matching remote entries to their local runtime endpoints.
- `errorLoadRemote({ id, error, from })`: returns a fallback module when a remote cannot load.
- `createScript(args)`: creates browser script tags with a timeout and remote metadata.
- `afterLoadEntry(args)`: records remote-entry loading results.
- `afterLoadRemote(args)`: records remote module loading results.
- `beforePreloadRemote(args)`: observes preload operations before the runtime executes them.
- `generatePreloadAssets(args)`: observes preload asset generation for a remote.

## Running

```bash
pnpm --filter remote-router start
pnpm --filter remote-router e2e:ci
```

`e2e:ci` builds the host so CI exercises the runtime plugin instead of passing through a placeholder script.

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=runtime-plugins&ep.readme_path=runtime-plugins%2Fremote-router%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fruntime-plugins%2Fremote-router&dt=ModuleFederationExamples+runtime-plugins%2Fremote-router%2FREADME.md">
