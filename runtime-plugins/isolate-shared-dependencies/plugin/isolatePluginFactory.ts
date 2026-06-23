import { FederationHost } from '@module-federation/runtime';
import { FederationRuntimePlugin } from '@module-federation/runtime/types';

type WebpackRequire = {
  m: Record<string, unknown>;
  c: Record<string, unknown>;
};

type ExtendedFederationHost = FederationHost & {
  __webpack_require__: WebpackRequire;
};

type IsolateSharedDependenciesPluginOptions = {
  dependencies?: string[];
};

declare global {
  const __webpack_runtime_id__: string;
  const __webpack_require__: WebpackRequire;
}

export default function IsolateSharedDependenciesPluginFactory(
  options: string[] | IsolateSharedDependenciesPluginOptions = {},
): FederationRuntimePlugin {
  const dependencies = Array.isArray(options) ? options : options.dependencies ?? [];

  if (!Array.isArray(dependencies)) {
    throw new Error(
      'IsolateSharedDependenciesPlugin needs to receive a list of dependencies to isolate',
    );
  }

  let originId: string = '';
  const dependenciesToIsolateSet = new Set(dependencies);
  const patchedInstances: Record<string, unknown> = {};

  return {
    name: 'isolate-shared-dependencies-plugin',
    version: '1.0.0',
    beforeInit: args => {
      originId = args.origin.name;
      (args.origin as ExtendedFederationHost).__webpack_require__ =
        __webpack_require__;
      return args;
    },
    resolveShare: args => {
      if (!dependenciesToIsolateSet.has(args.pkgName)) {
        return args;
      }

      const resolvedDependency = args.resolver();
      if (!resolvedDependency) {
        return args;
      }

      args.resolver = () => ({
        ...resolvedDependency,
        scope: [originId],
        lib: undefined,
        loaded: false,
        loading: new Promise(async resolve => {
          const originalFactory = await resolvedDependency.get();

          // Mark the original factory as loaded
          resolvedDependency.lib = originalFactory;
          resolvedDependency.loaded = true;

          resolve(() => {
            if (!patchedInstances[args.pkgName]) {
              // Get the federation instance that the dependency comes from
              const originInstance = args.GlobalFederation.__INSTANCES__.find(
                instance => instance.name === resolvedDependency.from,
              ) as ExtendedFederationHost;

              if (originInstance && originInstance.__webpack_require__) {
                const originCache = originInstance.__webpack_require__.c;

                const savedOriginCache = { ...originCache };

                Object.keys(originCache).forEach(key => {
                  delete originCache[key];
                });

                patchedInstances[args.pkgName] = originalFactory();

                Object.keys(originCache).forEach(key => {
                  delete originCache[key];
                });
                Object.keys(savedOriginCache).forEach(key => {
                  originCache[key] = savedOriginCache[key];
                });

                return patchedInstances[args.pkgName];
              } else {
                console.warn(
                  `[IsolateSharedDependenciesPlugin] ${resolvedDependency.from} is not using IsolateSharedDependenciesPlugin, can't isolate ${args.pkgName} in ${originId}`,
                );
                return originalFactory();
              }
            }

            return patchedInstances[args.pkgName];
          });
        }),
      });

      return args;
    },
  };
}
