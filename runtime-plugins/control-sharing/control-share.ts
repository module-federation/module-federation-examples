import { FederationRuntimePlugin } from '@module-federation/runtime/types';

const runtimeStore = {};

const ControlScopeResolvePlugin = (): FederationRuntimePlugin => {
  return {
    name: 'control-scope-resolve-plugin',
    beforeInit: args => {
      runtimeStore.name = args.options.name;
      return args;
    },
    init: args => args,
    beforeRequest: args => {
      console.log('beforeRequest: ', args);
      return args;
    },
    afterResolve: args => args,
    onLoad: args => args,
    resolveShare: args => {
      if (!localStorage.getItem('formDataVMSC')) return args;
      const overrides = JSON.parse(localStorage.getItem('formDataVMSC'));
      const originalResolver = args.resolver;
      const { shareScopeMap, scope, pkgName, version, GlobalFederation } = args;

      args.resolver = function () {
        if (!overrides[runtimeStore.name]) {
          return originalResolver();
        }

        const overrideVersion = overrides[runtimeStore.name][pkgName];
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
          ].useIn.filter(i => i !== runtimeStore.name);
          shareScopeMap[scope][pkgName][version] = matchingInstance.options.shared[pkgName];
          if (!shareScopeMap[scope][pkgName][version].useIn.includes(runtimeStore.name)) {
            shareScopeMap[scope][pkgName][version].useIn.push(runtimeStore.name);
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
      console.log('beforeLoadShare:', args);
      while (__FEDERATION__.__INSTANCES__.length <= 1) {
        await new Promise(r => setTimeout(r, 50));
      }
      return args;
    },
  };
};

export default ControlScopeResolvePlugin;
