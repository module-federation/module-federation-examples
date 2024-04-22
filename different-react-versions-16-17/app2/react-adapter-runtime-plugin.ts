
const runtimePlugin = function () {
  return {
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
    // resolveShare(args) {
    //   const { shareScopeMap, scope, pkgName, version, GlobalFederation } = args;
    //
    //   console.log('resolveShare:', args);
    //   if (pkgName !== 'react') {
    //     return args;
    //   }
    //
    //   return args
    //
    //   // set lib
    //   args.resolver = function () {
    //     shareScopeMap[scope][pkgName][version] = {
    //       lib: ()=>window.React,
    //       loaded:true,
    //       loading: Promise.resolve(()=>window.React)
    //     }; // Manually replace the local share scope with the desired module
    //     return shareScopeMap[scope][pkgName][version];
    //   };
    //
    //   // set get
    //   args.resolver = function () {
    //     shareScopeMap[scope][pkgName][version] = {
    //       get: async ()=>()=>window.React,
    //     }; // Manually replace the local share scope with the desired module
    //     return shareScopeMap[scope][pkgName][version];
    //   };
    //   return args;
    // },
    async onLoad(args) {
      // console.log('onLoad: ', args);
        const hostVersion = args.origin.options.shared['react-dom'][0].version;
        const remoteInstance = __FEDERATION__.__INSTANCES__.find(instance=>{
            return instance.name === args.pkgNameOrAlias
        })
        const remoteVersion = remoteInstance ? remoteInstance.options.shared['react-dom'][0].version : false

        if(remoteVersion && hostVersion && remoteVersion !== hostVersion) {
            const remoteReactDOMVersion = await remoteInstance.loadShare('react-dom', {
              resolver: (sharedOptions) => {
                return (
                    sharedOptions.find((i) => i.version === remoteVersion) ?? sharedOptions[0]
                );
              },
            })


          const remoteReactVersion = await remoteInstance.loadShare('react', {
            resolver: (sharedOptions) => {
              return (
                  sharedOptions.find((i) => i.version === remoteVersion) ?? sharedOptions[0]
              );
            },
          })
            const res = (await import('./fallback.js')).default

            return ()=>(props)=>{
                return res(args.exposeModuleFactory().default, remoteVersion, hostVersion,remoteReactDOMVersion,remoteReactVersion)(props)
            }
        }
        return args
    },
    async beforeLoadShare(args) {
      return args;
    },
  };
};
export default runtimePlugin;
