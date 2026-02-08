// import { FederationRuntimePlugin } from '@module-federation/runtime/types';

export default function () {
  return {
    name: 'umd-library-shared-plugin',
    resolveShare(args) {
      const { shareScopeMap, scope, pkgName, version } = args;

      if (!['react', 'react-dom'].includes(pkgName)) {
        return args;
      }

      args.resolver = function () {
        shareScopeMap[scope][pkgName][version] = pkgName === 'react' ? window.React : window.ReactDOM; // replace local share scope manually with desired module
        return shareScopeMap[scope][pkgName][version];
      };

      return args;
    },
  };
}
