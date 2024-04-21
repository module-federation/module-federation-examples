
const runtimePlugin = function () {
  return {
    name: 'my-runtime-plugin',
    beforeInit(args) {
      console.log('beforeInit: ', args);
      return args;
    },
    init(args) {
      console.log('init: ', args);
      return args;
    },
    loadRemote(args) {
      console.log('beforeRequest: ', args);
      return args;
    },
    afterResolve(args) {
      console.log('afterResolve', args);

      const hostVersion = args.options.shared.react[0].version;
      const remoteInstance = __FEDERATION__.__INSTANCES__.find(instance=>{
        return instance.name === args.pkgNameOrAlias
      })
      const remoteVersion = remoteInstance ? remoteInstance.options.shared.react[0].version : false

      if(remoteVersion && hostVersion && remoteVersion !== hostVersion) {
      console.log(remoteVersion, hostVersion)
        }

      return args;
    },
    async onLoad(args) {
      console.log('onLoad: ', args);
        const hostVersion = args.origin.options.shared['react-dom'][0].version;
        const remoteInstance = __FEDERATION__.__INSTANCES__.find(instance=>{
            return instance.name === args.pkgNameOrAlias
        })
        const remoteVersion = remoteInstance ? remoteInstance.options.shared['react-dom'][0].version : false
        const res = (await import('./fallback.js')).default

        if(remoteVersion && hostVersion && remoteVersion !== hostVersion) {
            const remoteReactVersion = await args.origin.loadShare('react-dom', {
              resolver: (sharedOptions) => {
                console.log('sharedOptions',sharedOptions)
                return (
                    sharedOptions.find((i) => i.version === remoteVersion) ?? sharedOptions[0]
                );
              },
            })
            return ()=>()=>res(args.exposeModuleFactory().default, remoteVersion, hostVersion,remoteReactVersion)
        }
        return args
    },
    async loadShare(args) {
      console.log('loadShare:', args);
    },
    async beforeLoadShare(args) {
      console.log('beforeloadShare:', args);
      return args;
    },
  };
};
export default runtimePlugin;
