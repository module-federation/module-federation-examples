/**
 * NpmRuntimePlugin for Module Federation
 * --------------------------------------
 * This plugin extends the capabilities of the module federation runtime by modifying the resolution of shared modules.
 *
 * Functionality:
 * 1. The plugin hooks into the 'resolveShare' hook of the federation runtime.
 * 2. It updates the references to shared module factories, allowing them to point to external sources like unpkg or esm.sh.
 * 3. This is particularly useful for cases where certain packages (like 'lodash') are preferred to be loaded from these external sources rather than bundled.
 *
 * How it Works:
 * - The plugin defines a 'useLocalShares' set specifying which modules should use local resolution.
 * - The 'getShareFromUnpkg' function dynamically imports a module from esm.sh, given a package name and version.
 * - In the 'resolveShare' hook, the plugin checks if the package should use local resolution (based on 'useLocalShares').
 * - If not, it updates the package reference to fetch from the external source.
 * - The 'beforeLoadShare' hook contains a workaround for an old issue which may not be relevant anymore.
 *
 * Usage:
 * - Register the plugin using 'registerGlobalPlugins' to enable its functionality in the module federation context.
 *
 * Notes:
 * - This plugin provides a flexible way to control module resolution, optimizing bundle sizes and leveraging CDN-hosted modules when desirable.
 */

import { registerGlobalPlugins } from '@module-federation/runtime';

const useLocalShares = new Set(['lodash']);

//workaround for rspack who cannot process webpackIgnore comments yet

const getShareFromUnpkg = (packageName, version) => {
  return () => {
    const mod = new Function(
      'packageName',
      'version',
      'return import(/* webpackIgnore: true */ `https://esm.sh/${packageName}@${version}`)',
    )(packageName, version);
    return mod.then(m => {
      return () => m;
    });
  };
};

const store = {};

const NpmRuntimeGlobalPlugin = () => {
  return {
    name: 'share-from-npm-plugin',
    beforeInit: args => {
      store.name = args.options.name;
      return args;
    },

    resolveShare: args => {
      const { shareScopeMap, scope, pkgName, version, resolver } = args;
      const currentPackageRef = shareScopeMap[scope][pkgName][version];

      args.resolver = () => {
        if (!useLocalShares.has(pkgName)) {
          currentPackageRef.get = getShareFromUnpkg(pkgName, version);
        }
        return resolver();
      };

      return args;
    },
    beforeLoadShare: async args => {
      // old workaround, may not be required anymore
      while (__FEDERATION__.__INSTANCES__.length <= 1) {
        await new Promise(r => setTimeout(r, 50));
      }
      return args;
    },
  };
};

registerGlobalPlugins([NpmRuntimeGlobalPlugin()]);

export default () => ({
  name: 'empty-plugin',
});
