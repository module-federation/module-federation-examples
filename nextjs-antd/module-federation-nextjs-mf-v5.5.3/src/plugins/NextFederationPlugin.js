'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$1 = require('fs');
var path = require('path');
var helpers = require('../loaders/helpers.js');
var nextPageMapLoader = require('../loaders/nextPageMapLoader.js');
var DevHmrFixInvalidPongPlugin = require('./DevHmrFixInvalidPongPlugin.js');
var NodeRuntime = require('@module-federation/node/src/plugins/StreamingTargetPlugin');
var index = require('@module-federation/node/src/plugins/NodeFederationPlugin');
var internal = require('../internal.js');
var ModuleFederationPlugin = require('./ModuleFederationPlugin.js');
var ChildFederationPlugin = require('./ChildFederationPlugin');
function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Zackary Jackson @ScriptedAlchemy
*/
'use strict';

const CHILD_PLUGIN_NAME = 'ChildFederationPlugin';

class RemoveRRRuntimePlugin {
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler) {
        const webpack = compiler.webpack;
        // only impacts dev mode - dont waste the memory during prod build
        if (compiler.options.mode === 'development') {
            compiler.hooks.thisCompilation.tap(
              'RemoveRRRuntimePlugin',
              (compilation) => {
                  compilation.hooks.processAssets.tap(
                    {
                        name: 'RemoveRRRuntimePlugin',
                        state:
                        compilation.constructor.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
                    },
                    (assets) => {
                        //can this be improved? I need react refresh not to cause global collision in dev mode
                        Object.keys(assets).forEach((filename) => {
                            if (filename.endsWith('.js') || filename.endsWith('.mjs')) {
                                const asset = compilation.getAsset(filename);
                                // easiest way to solve it is to prevent react refresh helpers from running when its a federated module chunk
                                const newSource = asset.source
                                  .source()
                                  .replace(/RefreshHelpers/g, 'NoExist');
                                const updatedAsset = new webpack.sources.RawSource(newSource);

                                if (asset) {
                                    compilation.updateAsset(filename, updatedAsset);
                                } else {
                                    compilation.emitAsset(filename, updatedAsset);
                                }
                            }
                        });
                    }
                  );
              }
            );
        }
    }
}

const computeRemoteFilename = (isServer, filename) => {
    if (isServer && filename) {
        return path__default["default"].basename(filename);
    }
    return filename;
};
const childCompilers = {};
class ChildFederationPlugin_old {
    constructor(options, extraOptions = {}) {
        this._options = options;
        this._extraOptions = extraOptions;
    }
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler) {
        const webpack = compiler.webpack;
        const LibraryPlugin = webpack.library.EnableLibraryPlugin;
        const LoaderTargetPlugin = webpack.LoaderTargetPlugin;
        const library = compiler.options.output.library;
        const isServer = compiler.options.name === 'server';
        const isDev = compiler.options.mode === 'development';
        let outputPath;
        if (isDev && isServer) {
            outputPath = path__default["default"].join(internal.getOutputPath(compiler), 'static/ssr');
        } else {
            if (isServer) {
                outputPath = path__default["default"].join(internal.getOutputPath(compiler), 'static/ssr');
            } else {
                outputPath = compiler.options.output.path;
            }
        }

        compiler.hooks.thisCompilation.tap(CHILD_PLUGIN_NAME, (compilation) => {
            const buildName = this._options.name;
            const childOutput = {
                ...compiler.options.output,
                path: outputPath,
                // path: deriveOutputPath(isServer, compiler.options.output.path),
                publicPath: 'auto',
                chunkLoadingGlobal: buildName + 'chunkLoader',
                uniqueName: buildName,
                library: {
                    name: buildName,
                    type: library.type,
                },
                chunkFilename: compiler.options.output.chunkFilename.replace(
                  '.js',
                  '-fed.js'
                ),
                filename: compiler.options.output.filename.replace('.js', '-fed.js'),
            };

            // using ModuleFederationPlugin does not work, i had to fork because of afterPlugins hook on containerPlugin.
            const FederationPlugin = ModuleFederationPlugin;

            const federationPluginOptions = {
                // library: {type: 'var', name: buildName},
                ...this._options,
                filename: computeRemoteFilename(isServer, this._options.filename),
                exposes: {
                    ...this._options.exposes,
                    ...(this._extraOptions.exposePages
                      ? nextPageMapLoader.exposeNextjsPages(compiler.options.context)
                      : {}),
                },
                runtime: false,
                shared: {
                    ...(this._extraOptions.skipSharingNextInternals
                      ? {}
                      : internal.externalizedShares),
                    ...this._options.shared,
                },
            };

            let plugins;
            if (compiler.options.name === 'client') {
                plugins = [
                    new FederationPlugin(federationPluginOptions),
                    new webpack.web.JsonpTemplatePlugin(childOutput),
                    new LoaderTargetPlugin('web'),
                    new LibraryPlugin(this._options.library.type),
                    new webpack.DefinePlugin({
                        'process.env.REMOTES': createRuntimeVariables(
                          this._options.remotes
                        ),
                        'process.env.CURRENT_HOST': JSON.stringify(this._options.name),
                    }),
                    new AddRuntimeRequirementToPromiseExternal(),
                ];
            } else if (compiler.options.name === 'server') {


                plugins = [
                    new NodeRuntime["default"](federationPluginOptions, {ModuleFederationPlugin: FederationPlugin}),
                    new webpack.node.NodeTemplatePlugin(childOutput),
                    //TODO: Externals function needs to internalize any shared module for host and remote build
                    new webpack.ExternalsPlugin(compiler.options.externalsType, [
                        // next dynamic needs to be within webpack, cannot be externalized
                        ...Object.keys(internal.DEFAULT_SHARE_SCOPE).filter(
                          (k) => k !== 'next/dynamic'
                        ),
                        'react/jsx-runtime',
                        'react/jsx-dev-runtime',
                    ]),
                    // new LoaderTargetPlugin('async-node'),
                    new index["default"](federationPluginOptions, webpack),
                    new LibraryPlugin(federationPluginOptions.library.type),
                    // new webpack.DefinePlugin({
                    //   'process.env.REMOTES': JSON.stringify(this._options.remotes),
                    //   'process.env.CURRENT_HOST': JSON.stringify(this._options.name),
                    // }),
                    new AddRuntimeRequirementToPromiseExternal(),
                ];
            }
            const childCompiler = compilation.createChildCompiler(
              CHILD_PLUGIN_NAME,
              childOutput,
              plugins
            );

            childCompiler.outputPath = outputPath;
            childCompiler.options.module.rules.forEach((rule) => {
                // next-image-loader fix which adds remote's hostname to the assets url
                if (
                  this._extraOptions.enableImageLoaderFix &&
                  helpers.hasLoader(rule, 'next-image-loader')
                ) {
                    helpers.injectRuleLoader(rule, {
                        loader: path__default["default"].resolve(__dirname, '../loaders/fixImageLoader.js'),
                    });
                }

                // url-loader fix for which adds remote's hostname to the assets url
                if (
                  this._extraOptions.enableUrlLoaderFix &&
                  helpers.hasLoader(rule, 'url-loader')
                ) {
                    helpers.injectRuleLoader({
                        loader: path__default["default"].resolve(__dirname, '../loaders/fixUrlLoader.js'),
                    });
                }
            });
            childCompiler.options.experiments.lazyCompilation = false;
            childCompiler.options.optimization.runtimeChunk = false;
            // no custom chunk splitting should be derived from host (next)
            delete childCompiler.options.optimization.splitChunks;
            childCompiler.outputFileSystem = require$$1__default["default"];

            if (compiler.options.optimization.minimize) {
                for (const minimizer of compiler.options.optimization.minimizer) {
                    if (typeof minimizer === "function") {
                        minimizer.call(childCompiler, childCompiler);
                    } else if (minimizer !== "...") {
                        minimizer.apply(childCompiler);
                    }
                }
            }

            new RemoveRRRuntimePlugin().apply(childCompiler);

            const MiniCss = childCompiler.options.plugins.find((p) => {
                return p.constructor.name === 'NextMiniCssExtractPlugin';
            });

            childCompiler.options.plugins = childCompiler.options.plugins.filter(
              (plugin) => !internal.removePlugins.includes(plugin.constructor.name)
            );

            if (MiniCss) {
                // grab mini-css and reconfigure it to avoid conflicts with host
                new MiniCss.constructor({
                    ...MiniCss.options,
                    filename: MiniCss.options.filename.replace('.css', '-fed.css'),
                    chunkFilename: MiniCss.options.chunkFilename.replace(
                      '.css',
                      '-fed.css'
                    ),
                }).apply(childCompiler);
            }


            // TODO: this can likely be deleted now, if running server child compiler under client is the best way to go
            // help wanted for all asset pipeline stuff below
            // let childAssets
            // if (isServer) {
            //   childAssets = new Promise((resolve) => {
            //     childCompiler.hooks.afterEmit.tap(
            //       CHILD_PLUGIN_NAME,
            //       (childCompilation) => {
            //         console.log('after emit assets server');
            //         resolve(childCompilation.assets);
            //       }
            //     );
            //   });
            // } else {
            //   if(isDev) {
            //     childAssets = new Promise((resolve) => {
            //       childCompiler.hooks.afterEmit.tap(
            //         CHILD_PLUGIN_NAME,
            //         (childCompilation) => {
            //           resolve(childCompilation.assets);
            //         }
            //       );
            //     });
            //
            //   } else {
            //
            //       TODO: improve this
            //       childAssets = new Promise((resolve, reject) => {
            //         fs.readdir(
            //           path.join(childCompiler.context, '.next/ssr'),
            //           function (err, files) {
            //             if (err) {
            //               reject('Unable to scan directory: ' + err);
            //               return;
            //             }
            //
            //             const allFiles = files.map(function (file) {
            //               return new Promise((res, rej) => {
            //                 fs.readFile(
            //                   path.join(childCompiler.context, '.next/ssr', file),
            //                   (err, data) => {
            //                     if (err) rej(err);
            //                     compilation.assets[path.join('static/ssr', file)] = new compiler.webpack.sources.RawSource(data)
            //                     res();
            //                   }
            //                 );
            //               });
            //             });
            //             Promise.all(allFiles).then(resolve).catch(reject)
            //           }
            //         );
            //       });
            //   }
            // }
            // on main compiler add extra assets from server output to browser build
            // compilation.hooks.additionalAssets.tapPromise(CHILD_PLUGIN_NAME, () => {
            //   console.log('additional hooks', compiler.options.name);
            //   console.log('in additional assets hook for main build');
            //   return childAssets
            // });

            // cache the serer compiler instance, we will run the server child compiler during the client main compilation
            // we need to do this because i need access to data from the client build to inject into the server build
            // in prod builds, server build runs first, followed by client build
            // in dev, client build runs first, followed by server build
            childCompilers[compiler.options.name] = childCompiler;

            if (isDev) {
                // in dev, run the compilers in the order they are created (client, server)
                childCompiler.run((err, stats) => {
                    if (err) {
                        compilation.errors.push(err);
                    }
                    if (stats && stats.hasErrors()) {
                        compilation.errors.push(
                          new Error(helpers.toDisplayErrors(stats.compilation.errors))
                        );
                    }
                });
                // in prod, if client
            } else if (!isServer) {
// if ssr enabled and server in compiler cache
                if(childCompilers['server']) {
                    //wrong hook for this
                    // add hook for additional assets to prevent compile from sealing.
                    compilation.hooks.additionalAssets.tapPromise(CHILD_PLUGIN_NAME, () => {
                        return new Promise((res, rej) => {
                            // run server child compilation during client main compilation
                            childCompilers['server'].run((err, stats) => {
                                if (err) {
                                    compilation.errors.push(err);
                                    rej();
                                }
                                if (stats && stats.hasErrors()) {
                                    compilation.errors.push(
                                      new Error(helpers.toDisplayErrors(stats.compilation.errors))
                                    );
                                    rej();
                                }
                                res();
                            });
                        });
                    });
                }
                // run client child compiler like normal
                childCompiler.run((err, stats) => {
                    if (err) {
                        compilation.errors.push(err);
                    }
                    if (stats && stats.hasErrors()) {
                        compilation.errors.push(
                          new Error(helpers.toDisplayErrors(stats.compilation.errors))
                        );
                    }
                });
            }
        });
    }
}

class AddRuntimeRequirementToPromiseExternal {
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler) {
        compiler.hooks.compilation.tap(
          'AddRuntimeRequirementToPromiseExternal',
          (compilation) => {
              const RuntimeGlobals = compiler.webpack.RuntimeGlobals;
              // if (compilation.outputOptions.trustedTypes) {
              compilation.hooks.additionalModuleRuntimeRequirements.tap(
                'AddRuntimeRequirementToPromiseExternal',
                (module, set, context) => {
                    if (module.externalType === 'promise') {
                        set.add(RuntimeGlobals.loadScript);
                        set.add(RuntimeGlobals.require);
                    }
                }
              );
              // }
          }
        );
    }
}

function createRuntimeVariables(remotes) {
    return Object.entries(remotes).reduce((acc, remote) => {
        // handle promise new promise and external new promise
        if (remote[1].startsWith('promise ') || remote[1].startsWith('external ')) {
            const promiseCall = remote[1]
              .replace('promise ', '')
              .replace('external ', '');
            acc[remote[0]] = `function() {
        return ${promiseCall}
      }`;
            return acc;
        }
        // if somehow its just the @ syntax or something else, pass it through
        acc[remote[0]] = JSON.stringify(remote[1]);
        return acc;
    }, {});
}

class NextFederationPlugin {
    constructor(options) {
        const {extraOptions, ...mainOpts} = options;
        this._options = mainOpts;
        this._extraOptions = extraOptions || {};
    }

    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler) {
        const isServer = compiler.options.name === 'server';
        const webpack = compiler.webpack;
        if (isServer) {
            console.error('[nextjs-mf] WARNING: SSR IS NOT FULLY SUPPORTED YET, Only use pluign on client builds');
            // target false because we use our own target for node env
            compiler.options.target = false;
            new index["default"](this._options, webpack).apply(compiler);
            this._options.library = {};
            this._options.library.type = 'commonjs-module';
            this._options.library.name = this._options.name;
            // output remote to ssr if server
            this._options.filename = this._options.filename.replace(
              '/chunks',
              '/ssr'
            );

            // should this be a plugin that we apply to the compiler?
            internal.internalizeSharedPackages(this._options, compiler);
        } else {
            if (this._extraOptions.automaticPageStitching) {
                compiler.options.module.rules.push({
                    test: /next[\\/]dist[\\/]client[\\/]page-loader\.js$/,
                    loader: path__default["default"].resolve(__dirname, '../loaders/patchNextClientPageLoader'),
                });
            }

            if (this._options.remotes) {
                this._options.remotes = internal.parseRemotes(this._options.remotes);
            }
            if (this._options.library) {
                console.error('[mf] you cannot set custom library');
            }
            this._options.library = {
                // assign remote name to object to avoid SWC mangling top level variable
                type: 'window',
                name: this._options.name,
            };
        }
        //todo runtime variable creation needs to be applied for server as well. this is just for client
        // todo: this needs to be refactored into something more comprehensive. this is just a quick fix
        new webpack.DefinePlugin({
            'process.env.REMOTES': createRuntimeVariables(this._options.remotes),
            'process.env.CURRENT_HOST': JSON.stringify(this._options.name),
        }).apply(compiler);

        const ModuleFederationPlugin = isServer ? NodeRuntime["default"] : webpack.container.ModuleFederationPlugin;

        // ignore edge runtime and middleware builds
        if (ModuleFederationPlugin) {
            const internalShare = internal.reKeyHostShared(this._options.shared);
            const hostFederationPluginOptions = {
                ...this._options,
                exposes: {},
                shared: {
                    noop: {
                        import: 'data:text/javascript,module.exports = {};',
                        requiredVersion: false,
                        eager: true,
                        version: '0',
                    },
                    ...internalShare,
                },
            };

            compiler.options.optimization.chunkIds = 'named';

            new ModuleFederationPlugin(hostFederationPluginOptions, {
                ModuleFederationPlugin,
            }).apply(compiler);
            new ChildFederationPlugin(this._options, this._extraOptions).apply(compiler);
            new AddRuntimeRequirementToPromiseExternal().apply(compiler);
            if (compiler.options.mode === 'development') {
                new DevHmrFixInvalidPongPlugin["default"]().apply(compiler);
            }
        }
    }
}
exports.NextFederationPlugin = NextFederationPlugin;
exports["default"] = NextFederationPlugin;
