import { FederationRuntimePlugin } from '@module-federation/runtime/types';

const store = {};

const CustomPlugin = (): FederationRuntimePlugin => {
    return {
        name: 'custom-plugin',
        beforeInit: (args) => {
            store.name = args.options.name;
            return args;
        },
        init: (args) => {
            return args;
        },
        beforeRequest: (args) => {
            console.log('beforeRequest: ', args);
            return args;
        },
        afterResolve: (args) => {
            return args;
        },
        onLoad: (args) => {
            return args;
        },
        resolveShare: (args) => {
            if(!localStorage.getItem('formDataVMSC')) return args;
            const overrides = JSON.parse(localStorage.getItem('formDataVMSC'));
            const originalResolver = args.resolver;
            const { shareScopeMap, scope, pkgName, version, GlobalFederation } = args;

            args.resolver = function() {
                if(!overrides[store.name]) {
                    return originalResolver();
                }

                const overrideVersion = overrides[store.name][pkgName];
                const matchingInstance = GlobalFederation.__INSTANCES__.find(instance => {
                    return instance.options.shared[pkgName].version === overrideVersion;
                });

                if (matchingInstance) {
                    const current = shareScopeMap[scope][pkgName][version],
                        override = matchingInstance.options.shared[pkgName];
                    if(current.from === override.from) return current;
                    const originInstance = GlobalFederation.__INSTANCES__.find(instance => {
                        return instance.options.name === current.from;
                    });

                    originInstance.options.shared[pkgName].useIn = originInstance.options.shared[pkgName].useIn.filter(i => i !== store.name);
                    shareScopeMap[scope][pkgName][version] = matchingInstance.options.shared[pkgName];
                    if (!shareScopeMap[scope][pkgName][version].useIn.includes(store.name)) {
                        shareScopeMap[scope][pkgName][version].useIn.push(store.name);
                    }
                    return matchingInstance.options.shared[pkgName];
                } else {
                    console.log('No matching instance found for overrideVersion', overrideVersion);
                }

                return originalResolver();
            }
            return args;
        },
        loadShare: async (args) => {
            console.log('loadShare:', args);
        },
        beforeLoadShare: async (args) => {
            console.log('beforeloadShare:', args);
            while (__FEDERATION__.__INSTANCES__.length <= 1) {
                await new Promise(r => setTimeout(r, 50));
            }
            return args;
        },
    };
}

export default CustomPlugin;
