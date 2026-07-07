# Runtime Plugin Examples

These examples show how runtime plugins move product policy out of Module Federation core and into composable hooks. The core runtime owns stable loading, sharing, snapshot, and factory execution semantics; runtime plugins customize policy such as request routing, fallback modules, share selection, resource loading, preload behavior, and telemetry.

## Hook Coverage

| Hook family | Hooks | Example coverage |
| --- | --- | --- |
| Bootstrap | `beforeInit`, `init`, `apply` | `control-sharing`, `remote-control`, `isolate-shared-dependencies`, `multiple-react-versions`, `remote-router` |
| Remote policy | `beforeRequest`, `errorLoadRemote`, `afterLoadRemote` | `remote-router`, `offline-remote` |
| Share policy | `beforeLoadShare`, `resolveShare` | `control-sharing`, `isolate-shared-dependencies`, `multiple-react-versions`, `remote-control` |
| Loader policy | `createScript`, `afterLoadEntry` | `remote-router` |
| Factory execution | `onLoad` | `multiple-react-versions` |
| Preload policy | `beforePreloadRemote`, `generatePreloadAssets` | `remote-router` |

## Examples

- `control-sharing`: exposes a UI for changing shared module resolver rules at runtime.
- `isolate-shared-dependencies`: uses tuple runtime plugin parameters to isolate selected shared dependencies while keeping code sharing.
- `multiple-react-versions`: adapts share loading and remote module execution so legacy and modern React versions can coexist.
- `offline-remote`: returns a fallback module from `errorLoadRemote` when a remote is unavailable.
- `remote-control`: changes shared loading behavior based on runtime state.
- `remote-router`: rewrites remote entries, records runtime telemetry, customizes script loading, and observes preload hooks.
- `single-runtime`: demonstrates single-runtime behavior for host/remote sharing.

Additional core hooks such as `afterLoadShare`, `errorLoadShare`, snapshot hooks, and bridge hooks are available for production plugins, but these examples stay focused on the hooks they exercise directly.

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=runtime-plugins&ep.readme_path=runtime-plugins%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fruntime-plugins&dt=ModuleFederationExamples+runtime-plugins%2FREADME.md">
