/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra and Zackary Jackson @ScriptedAlchemy
*/

"use strict";

const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");
const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");
const RuntimeGlobals = require("webpack/lib/RuntimeGlobals");
const HotModuleReplacementRuntimeModule = require("webpack/lib//hmr/HotModuleReplacementRuntimeModule");

const { RawSource } = require("webpack-sources");

class ModuleFederationPlugin {
  constructor(options) {
    // TODO options validation
    this.options = options;
  }

  /**
   * @param {Compiler} compiler webpack compiler
   * @returns {void}
   */
  apply(compiler) {
    // runtimeModule
    const { options } = this;
    new ContainerPlugin({
      name: options.name,
      library: options.library,
      filename: options.filename,
      exposes: options.exposes,
      overridables: options.shared,
    }).apply(compiler);
    new ContainerReferencePlugin({
      remoteType: options.remoteType || options.library.type,
      remotes: options.remotes,
      overrides: options.shared,
    }).apply(compiler);
    let preShakenRuntimeChunk;
    let requestedRuntimes = [];
    const requirements = new Set([
      "CompatGetDefaultExportRuntimeModule",
      "ContainerEntryModule",
      "DefinePropertyGettersRuntimeModule",
      "EnsureChunkRuntimeModule",
      "GetChunkFilenameRuntimeModule",
      "HasOwnPropertyRuntimeModule",
      "JsonpChunkLoadingRuntimeModule",
      "MakeNamespaceObjectRuntimeModule",
      "OverridablesRuntimeModule",
      "PublicPathRuntimeModule",
      "RemoteRuntimeModule",
    ]);

    compiler.hooks.make.tapAsync("SingleRuntime", (compilation, callback) => {
      compilation.hooks.afterRuntimeRequirements.tap("SingleRuntime", () => {
        compilation.chunks.forEach((chunk) => {
          if (chunk.hasEntryModule() && chunk.id !== options.name) {
            chunk.getModules().forEach((module) => {
              if (requirements.has(module.constructor.name)) {
                requestedRuntimes.push(module);
              }
            });
          }
        });
      });

      compilation.hooks.runtimeModule.tap("SingleRuntime", (module, chunk) => {
        requestedRuntimes.push(module.generate());
      });

      compilation.hooks.optimizeAssets.tap("SingleRuntime", (assets) => {
        // preShakenRuntimeChunk = compilation.assets[Array.from(chunk.files)[0]].source();
        console.log("after optimize;", assets[options.filename]);
        const originalChildren = assets[options.filename]
          .original()
          .getChildren();
        originalChildren.shift();
        originalChildren.pop();
        originalChildren.push(requestedRuntimes);

        console.log("cleaned children", originalChildren);
        console.log("after optimize;", assets[options.filename].source());
        // console.log('after optimize children;', assets[options.filename].getChildren());
      });

      //
      //   return
      //   chunks.forEach((chunk) => {
      //
      //
      //     chunk.files.forEach((file) => {
      //       let source;
      //       const originalSource = compilation.assets[file];
      //       if (file === "runtime.js") {
      //         console.log('############', file, '##############');
      //         console.log(RuntimeGlobals.startup)
      //         const renderedSource = originalSource.source();
      //         // const replacedSource = renderedSource.replace('return ' + RuntimeGlobals.startup + '();','')
      //         // console.log(originalSource.source())
      //
      //         // compilation.assets[file] = replacedSource;
      //         console.log("############")
      //       }
      //
      //       // codeMapEntries.forEach(([fromCode, toCode]) => {
      //       //   const indices = getAllIndices(originalSource.source(), fromCode);
      //       //   if (!indices.length) {
      //       //     return;
      //       //   }
      //       //
      //       //   if (!source) {
      //       //     source = new ReplaceSource(originalSource);
      //       //   }
      //       //
      //       //   indices.forEach((startPos) => {
      //       //     const endPos = startPos + fromCode.length - 1;
      //       //     source.replace(startPos, endPos, toCode);
      //       //   });
      //       // });
      //
      //       // if (source) {
      //       //   // eslint-disable-next-line no-param-reassign
      //       //   compilation.assets[file] = source;
      //       // }
      //
      //       // callback();
      //     });
      //   });
      //
      // });
      callback();
    });
  }
}

module.exports = ModuleFederationPlugin;
