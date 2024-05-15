
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
