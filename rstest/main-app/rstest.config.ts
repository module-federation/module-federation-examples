import { defineConfig } from '@rstest/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { pluginReact } from '@rsbuild/plugin-react';

const RstestMfChunkInitPlugin = {
  name: 'rstest-mf-chunk-init',
  // Ensure the "remotes" runtime hook runs for entry chunks loaded via Node `require()`.
  // Rstest loads test entry chunks directly, bypassing `__webpack_require__.e(chunkId)`,
  // so the MF runtime hook never runs and the generated `webpack/container/remote/*`
  // module ids don't get registered.
  apply(compiler: any) {
    const pluginName = 'RstestMfChunkInitPlugin';
    compiler.hooks.thisCompilation.tap(pluginName, (compilation: any) => {
      const { RawSource } = compiler.webpack.sources;
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          // Run fairly late so chunk wrappers are already emitted.
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        (assets: Record<string, any>) => {
          for (const [filename, source] of Object.entries(assets)) {
            if (!filename.endsWith('.js')) continue;
            const code = source.source().toString();

            // Rstest's Node MF runtime plugin patches `__webpack_require__.f.readFileVm`.
            // That override uses federation metadata to load chunks and can return an
            // empty chunk when it doesn't know the base URL, which breaks `__webpack_require__.e`.
            // Keep Rstest's built-in readFileVm (readFile + vm) chunk loader.
            let nextCode = code;
            if (filename === 'rstest-runtime.js' && nextCode.includes('__webpack_require__.f.readFileVm')) {
              nextCode = nextCode.replace(
                /__webpack_require__\.f\.readFileVm\s*=\s*handle\s*;\s*/g,
                '/* rstest-mf: keep Rstest chunk loader */\n',
              );
            }

            // Patch the runtime to lazily initialize MF remote module factories when a test chunk
            // tries to `require("webpack/container/remote/...")` but the factory hasn't been set up
            // (because the chunk was loaded via Node `require()` instead of `__webpack_require__.e()`).
            if (filename === 'rstest-runtime.js' && nextCode.includes('[Rstest] Cannot find module')) {
              nextCode = nextCode.replace(
                /if \\(errMsg\\.includes\\('__webpack_modules__\\[moduleId\\] is not a function'\\)\\) throw new Error\\(`\\[Rstest\\] Cannot find module \"\\$\\{args\\[0\\]\\}\"`\\);/,
                `if (errMsg.includes('__webpack_modules__[moduleId] is not a function')) {\n` +
                  `  const missingId = args[0];\n` +
                  `  if (typeof missingId === 'string' && missingId.startsWith('webpack/container/remote/') && __webpack_require__.remotesLoadingData && __webpack_require__.f) {\n` +
                  `    // Find the chunk that declares this remote module id, then run MF runtime hooks.\n` +
                  `    let chunkId;\n` +
                  `    for (const [cid, mods] of Object.entries(__webpack_require__.remotesLoadingData.chunkMapping || {})) {\n` +
                  `      if (Array.isArray(mods) && mods.includes(missingId)) { chunkId = cid; break; }\n` +
                  `    }\n` +
                  `    if (chunkId) {\n` +
                  `      try {\n` +
                  `        __webpack_require__.f.remotes && __webpack_require__.f.remotes(chunkId, []);\n` +
                  `        __webpack_require__.f.consumes && __webpack_require__.f.consumes(chunkId, []);\n` +
                  `        if (typeof __webpack_modules__[missingId] === 'function') return originalWebpackRequire(...args);\n` +
                  `      } catch {}\n` +
                  `    }\n` +
                  `  }\n` +
                  `  throw new Error(\`[Rstest] Cannot find module \"\${missingId}\"\`);\n` +
                  `}`,
              );
            }

            if (filename === 'rstest-runtime.js' && nextCode !== code) {
              compilation.updateAsset(filename, new RawSource(nextCode));
              continue;
            }

            if (!nextCode.includes('__webpack_require__.C(exports)')) continue;
            if (!nextCode.includes('// Federation startup call')) continue;

            const patched = nextCode.replace(
              /(__webpack_require__\\.C\\(exports\\)\\s*\\n)/,
              `$1\n// Ensure MF remotes/consumes are initialized for this entry chunk.\n// This is normally triggered by __webpack_require__.e(chunkId), but Rstest loads entry chunks via require().\nif (exports && exports.ids && exports.ids[0]) {\n  __webpack_require__.f && __webpack_require__.f.remotes && __webpack_require__.f.remotes(exports.ids[0], []);\n  __webpack_require__.f && __webpack_require__.f.consumes && __webpack_require__.f.consumes(exports.ids[0], []);\n}\n`,
            );

            if (patched !== code) {
              compilation.updateAsset(filename, new RawSource(patched));
            }
          }
        },
      );
    });
  },
};

const shouldNotExternalize = (req: string) =>
  req.startsWith('@module-federation/runtime/rspack.js') ||
  req === '@module-federation/node/runtimePlugin' ||
  // When runtimePlugins is a local file, Rspack will emit this request.
  req.startsWith('./scripts/mfNodeRuntimePlugin') ||
  // MF runtime/webpack container internal modules must stay bundled.
  req.startsWith('webpack/container/') ||
  // Keep federation remotes internal so the MF runtime can resolve them.
  req === 'component-app' ||
  req.startsWith('component-app/');

export default defineConfig({
  testEnvironment: 'node',
  plugins: [pluginReact({ swcReactOptions: { runtime: 'classic' } })],
  globalSetup: './scripts/rstest.global.ts',
  tools: {
    // Parse TS/TSX/JSX in this repo and use classic runtime so we don't pull in
    // `react/jsx-runtime` (ESM), which is more likely to hit dynamic import paths.
    swc: {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          react: {
            runtime: 'classic',
          },
        },
      },
    },
    rspack: (config) => {
      // Use Node-style chunk loading so Module Federation's Node runtime plugin can hook into it.
      config.target = 'async-node';

      // Ensure the dynamic import shim is emitted as a global access for any chunks loaded via Node.
      config.output = {
        ...(config.output ?? {}),
        publicPath: 'auto',
        importFunctionName: 'globalThis.__rstest_dynamic_import__',
        filename: '[name].js',
        chunkFilename: '[name].js',
      };

      // Rstest adds externals to allow the worker runtime to intercept requires.
      // MF injects a loader-style request like:
      //   @module-federation/runtime/rspack.js!=!data:text/javascript,...
      // If that gets treated as external, Node will choke on the specifier.
      if (config.externals) {
        const externalsArr = Array.isArray(config.externals)
          ? config.externals
          : [config.externals];

        config.externals = externalsArr.map((ext) => {
          if (typeof ext !== 'function') return ext;
          return (data: any, callback: any) => {
            const req =
              typeof data === 'string'
                ? data
                : data && typeof data.request === 'string'
                  ? data.request
                  : undefined;

            if (typeof req === 'string' && shouldNotExternalize(req)) {
              return callback();
            }
            return (ext as any)(data, callback);
          };
        });
      }

      config.plugins ??= [];
      config.plugins.push(RstestMfChunkInitPlugin);
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'main_app',
          remotes: {
            'component-app': 'component_app@http://localhost:3001/remoteEntry.js',
          },
          // Patch chunk loading + script loading for Node.
          runtimePlugins: [
            '@module-federation/node/runtimePlugin',
            './scripts/mfNodeRuntimePlugin.js',
          ],
          shared: {
            react: { singleton: true, requiredVersion: '17.0.2' },
            'react-dom': { singleton: true, requiredVersion: '17.0.2' },
          },
        }),
      );

      // To reduce the chance of hitting dynamic import paths outside Rstest's VM,
      // keep test bundles in a single chunk.
      config.optimization = {
        ...(config.optimization ?? {}),
        splitChunks: false as any,
      };

      return config;
    },
  },
});
