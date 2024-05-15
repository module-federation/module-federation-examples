/**
 * The react-adapter-runtime-plugin.ts and fallback.js files work together to enable compatibility
 * between different versions of React used by the host and remote modules in a Module Federation setup.
 *
 * In the runtime plugin (react-adapter-runtime-plugin.ts):
 * - It checks if the host and remote modules are using different versions of React.
 * - If they are, it loads the specific versions of react-dom and react used by the remote module.
 * - It then imports the fallback module and returns a function that wraps the remote module's exposed
 *   component with the fallback component, passing the remote and host React versions as props.
 *
 * In the fallback module (fallback.js):
 * - It defines a higher-order component (HOC) called `withVersions`.
 * - The HOC takes the remote module's exposed component (`Original`) and the remote and host React versions as arguments.
 * - It renders a `Component` that displays the host and remote React versions.
 * - Inside the `Component`, it creates a container ref to mount the `Original` component.
 * - In the HOC's lifecycle methods, it mounts, updates, and unmounts the `Original` component using the
 *   remote module's specific React version and ReactDOM.
 * - This ensures that the `Original` component is rendered using the correct React version within the
 *   fallback component's container.
 *
 * By using this approach, the runtime plugin and fallback module allow the host and remote modules to
 * use different versions of React without conflicts, enabling compatibility in a Module Federation architecture.
 */

const runtimePlugin = () => ({
  name: 'my-runtime-plugin',
  beforeInit(args) {
    return args;
  },
  init(args) {
    return args;
  },
  loadRemote(args) {
    return args;
  },
  afterResolve(args) {
    return args;
  },
  async onLoad(args) {
    const hostVersion = args.origin.options.shared['react-dom'][0].version;
    const remoteInstance = __FEDERATION__.__INSTANCES__.find(instance => instance.name === args.pkgNameOrAlias);
    const remoteVersion = remoteInstance ? remoteInstance.options.shared['react-dom'][0].version : false;

    if (remoteVersion && hostVersion && remoteVersion !== hostVersion) {
      const remoteReactDOMVersion = await remoteInstance.loadShare('react-dom', {
        resolver: (sharedOptions) => sharedOptions.find((i) => i.version === remoteVersion) ?? sharedOptions[0],
      });

      const remoteReactVersion = await remoteInstance.loadShare('react', {
        resolver: (sharedOptions) => sharedOptions.find((i) => i.version === remoteVersion) ?? sharedOptions[0],
      });

      const res = (await import('./fallback.js')).default;

      return () => res(args.exposeModuleFactory().default, remoteVersion, hostVersion, remoteReactDOMVersion, remoteReactVersion);
    }
    return args;
  },
  async beforeLoadShare(args) {
    return args;
  },
});

export default runtimePlugin;
