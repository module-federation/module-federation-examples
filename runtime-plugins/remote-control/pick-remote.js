const store = {};

const CustomPlugin = () => {
  return {
    name: 'backend-remote-control',
    beforeInit: args => {
      store.name = args.options.name;
      return args;
    },
    init: async args => {
      const lsmap = {
        green: 'http://localhost:3003/remoteEntry.js',
        blue: 'http://localhost:3002/remoteEntry.js',
      };
      const override = window.localStorage.getItem('button');
      console.log('override', override);
      if (override) {
        args.options.remotes.map(remote => {
          remote.entry = lsmap[window.localStorage.getItem('button')];
        });
        return args;
      }

      const mockApiResponse = key => {
        return new Promise((resolve, reject) => {
          const map = {
            app2: 'http://localhost:3003/remoteEntry.js',
          };
          //@ts-ignore
          resolve(map[key]);
        });
      };

      const promises = args.options.remotes.map(async remote => {
        remote.entry = await mockApiResponse(remote.name);
      });
      await Promise.all(promises);
      return args;
    },
    beforeRequest: args => {
      console.log('beforeRequest: ', args);
      return args;
    },
    afterResolve: args => {
      return args;
    },
    onLoad: args => {
      return args;
    },
    resolveShare: args => {
      if (!localStorage.getItem('formDataVMSC')) return args;
      const overrides = JSON.parse(localStorage.getItem('formDataVMSC'));
      const originalResolver = args.resolver;
      const { shareScopeMap, scope, pkgName, version, GlobalFederation } = args;

      args.resolver = function () {
        if (!overrides[store.name]) {
          return originalResolver();
        }

        const overrideVersion = overrides[store.name][pkgName];
        const matchingInstance = GlobalFederation.__INSTANCES__.find(instance => {
          return instance.options.shared[pkgName].version === overrideVersion;
        });

        if (matchingInstance) {
          const current = shareScopeMap[scope][pkgName][version],
            override = matchingInstance.options.shared[pkgName];
          if (current.from === override.from) return current;
          const originInstance = GlobalFederation.__INSTANCES__.find(instance => {
            return instance.options.name === current.from;
          });

          originInstance.options.shared[pkgName].useIn = originInstance.options.shared[
            pkgName
          ].useIn.filter(i => i !== store.name);
          shareScopeMap[scope][pkgName][version] = matchingInstance.options.shared[pkgName];
          if (!shareScopeMap[scope][pkgName][version].useIn.includes(store.name)) {
            shareScopeMap[scope][pkgName][version].useIn.push(store.name);
          }
          return matchingInstance.options.shared[pkgName];
        } else {
          console.log('No matching instance found for overrideVersion', overrideVersion);
        }

        return originalResolver();
      };
      return args;
    },
    loadShare: async args => {
      console.log('loadShare:', args);
    },
    beforeLoadShare: async args => {
      console.log('beforeloadShare:', args);
      while (__FEDERATION__.__INSTANCES__.length <= 1) {
        await new Promise(r => setTimeout(r, 50));
      }
      return args;
    },
  };
};

export default CustomPlugin;
