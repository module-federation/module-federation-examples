// Custom MF runtime plugin for Rstest:
// - We need Node-side script loading for remotes (loadScriptNode),
// - but we must NOT patch chunk loading handlers, because that can break
//   Rstest's injected dynamic import shim (`__rstest_dynamic_import__`).
//
// This plugin only patches `__webpack_require__.l` (script loader).

module.exports = function mfNodeRuntimePlugin() {
  return {
    name: 'mf-node-runtime-plugin-rstest',
    beforeInit(args) {
      // Ensure `self` exists when evaluating remoteEntry code in Node.
      // Some remote bundles reference `self` for chunk loading globals.
      // eslint-disable-next-line no-undef
      if (typeof self === 'undefined') globalThis.self = globalThis;

      // eslint-disable-next-line no-undef
      const path = require('node:path');

      const getLocalDistForRemote = (remoteGlobalName) => {
        // `remoteGlobalName` is the `name` used by ModuleFederationPlugin (global/container name).
        // In this repo we also have the remotes checked out locally, so we can point Node's
        // filesystem-based chunk loader at their `dist` directories.
        const rstestRoot = path.resolve(__dirname, '..', '..');
        if (remoteGlobalName === 'component_app')
          return path.resolve(rstestRoot, 'component-app', 'dist');
        return null;
      };

      __webpack_require__.l = (url, done, key, chunkId) => {
        if (!key || chunkId) {
          done(new Error(`__webpack_require__.l name is required for ${url}`));
          return;
        }

        // For Node remotes built with `library.type = 'commonjs-module'`, we need the
        // "script" loader to produce a container object with `get/init`.
        // Load the remoteEntry over HTTP, evaluate it, then pick the container from the
        // returned CommonJS export shape (usually `{ <globalName>: container }`).
        (async () => {
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to load remoteEntry: ${res.status} ${res.statusText}`);
            const code = await res.text();

            // Evaluate the remoteEntry as CommonJS.
            const module = { exports: {} };
            const exports = module.exports;
            // eslint-disable-next-line no-new-func
            const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', code);

            // The remotes are built for `target: async-node`, so their chunk loading defaults to
            // filesystem reads relative to `__dirname`. Evaluate the remoteEntry using the remote's
            // local `dist` dir so `__federation_expose_*.js` chunks can be resolved naturally.
            const localDist = getLocalDistForRemote(key);
            const dirnameForRemote = localDist ?? process.cwd();
            const filenameForRemote = localDist
              ? path.join(localDist, 'remoteEntry.js')
              : url;

            fn(module, exports, require, dirnameForRemote, filenameForRemote);

            const exported = module.exports;
            const container = exported && exported[key] ? exported[key] : exported;
            if (!container || typeof container.get !== 'function') {
              throw new Error(`Remote "${key}" did not expose a container (missing get/init)`);
            }

            // eslint-disable-next-line no-undef
            const enhancedRemote = __webpack_require__.federation.instance.initRawContainer(
              key,
              url,
              container,
            );

            // eslint-disable-next-line no-new-func
            new Function('return globalThis')()[key] = enhancedRemote;
            done(enhancedRemote);
          } catch (e) {
            done(e);
          }
        })();
      };

      return args;
    },
  };
};
