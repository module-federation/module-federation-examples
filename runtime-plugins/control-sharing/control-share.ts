import type { FederationRuntimePlugin, Shared, ShareArgs, ShareInfos, ShareScopeMap, SharedGetter } from '@module-federation/runtime/types';

// Store interface for runtime data
interface RuntimeStore {
  name: string;
}

// Extended shared module interface with additional properties
interface SharedModule extends Shared {
  version: string;
  from: string;
  useIn: string[];
}

// Interface for form data structure
interface FormDataOverrides {
  [containerName: string]: {
    [packageName: string]: string;
  };
}

const runtimeStore: RuntimeStore = {
  name: ''
};

const LOCAL_STORAGE_KEY = 'formDataVMSC';

const ControlScopeResolvePlugin = (): FederationRuntimePlugin => {
  return {
    name: 'control-scope-resolve-plugin',
    beforeInit: args => {
      runtimeStore.name = args.options.name;
      return args;
    },
    resolveShare: (args) => {
      let overrides: FormDataOverrides;
      
      try {
        const formData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!formData) return args;
        overrides = JSON.parse(formData);
      } catch (error) {
        console.error('Failed to parse form data:', error);
        return args;
      }

      const originalResolver = args.resolver;
      const { shareScopeMap, scope, pkgName, version, GlobalFederation } = args;

      args.resolver = function (): Shared | undefined {
        // Skip override logic if no overrides exist for current container
        if (!overrides[runtimeStore.name]) {
          return originalResolver();
        }

        const overrideVersion = overrides[runtimeStore.name][pkgName];
        const matchingInstance = GlobalFederation.__INSTANCES__.find(instance => 
          instance.options.shared[pkgName]?.[0]?.version === overrideVersion
        );

        if (matchingInstance) {
          const current = shareScopeMap[scope][pkgName][version];
          const override = matchingInstance.options.shared[pkgName][0];
          
          // Return current if override is from same source
          if (current.from === override.from) return current;

          // Find and update original instance
          const originInstance = GlobalFederation.__INSTANCES__.find(instance => 
            instance.options.name === current.from
          );

          if (originInstance) {
            const sharedPkg = originInstance.options.shared[pkgName][0];
            sharedPkg.useIn = sharedPkg.useIn.filter((i: string) => i !== runtimeStore.name);
          }
          
          // Update share scope map with new instance
          shareScopeMap[scope][pkgName][version] = override;
          if (!shareScopeMap[scope][pkgName][version].useIn.includes(runtimeStore.name)) {
            shareScopeMap[scope][pkgName][version].useIn.push(runtimeStore.name);
          }
          
          return override;
        } else {
          console.warn(`No matching instance found for package ${pkgName} with version ${overrideVersion}`);
        }

        return originalResolver();
      };
      
      return args;
    },
  };
};

export default ControlScopeResolvePlugin;
