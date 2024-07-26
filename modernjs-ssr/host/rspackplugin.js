class ModifyServerLoaderPlugin {
    apply(compiler){
        compiler.hooks.thisCompilation.tap(
            'ModifyServerLoaderPlugin',
            (compilation) => {
              this._handleRenderStartup(compiler, compilation);
            },
          );
    }

    _handleRenderStartup(compiler, compilation) {
        compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(
            compilation,
          ).renderStartup.tap(
            'ModifyServerLoaderPlugin',
            (
              source,
              _renderContext,
              upperContext,
            ) => {
                return new compiler.webpack.sources.ConcatSource(`
                console.log(11);
                ${source.source().toString()}
                `);

                //   const isSingleRuntime = compiler.options?.optimization?.runtimeChunk;
            //   if (upperContext?.chunk.id && isSingleRuntime) {
            //     if (upperContext?.chunk.hasRuntime()) {
            //       return source;
            //     }
            //   }
      
            //   if (
            //     this._options.excludeChunk &&
            //     this._options.excludeChunk(upperContext.chunk)
            //   ) {
            //     return source;
            //   }
      
            //   const runtime = this._getChunkRuntime(upperContext);
      
            //   let remotes = '';
            //   let shared = '';
      
            //   for (const runtimeItem of runtime) {
            //     if (!runtimeItem) {
            //       continue;
            //     }
      
            //     const requirements =
            //       compilation.chunkGraph.getTreeRuntimeRequirements(runtimeItem);
      
            //     const entryOptions = upperContext.chunk.getEntryOptions();
            //     const chunkInitialsSet = new Set(
            //       compilation.chunkGraph.getChunkEntryDependentChunksIterable(
            //         upperContext.chunk,
            //       ),
            //     );
      
            //     chunkInitialsSet.add(upperContext.chunk);
            //     const dependOn = entryOptions?.dependOn || [];
            //     this.getChunkByName(compilation, dependOn, chunkInitialsSet);
      
            //     const initialChunks = [];
      
            //     let hasRemoteModules = false;
            //     let consumeShares = false;
      
            //     for (const chunk of chunkInitialsSet) {
            //       initialChunks.push(chunk.id);
            //       if (!hasRemoteModules) {
            //         hasRemoteModules = Boolean(
            //           compilation.chunkGraph.getChunkModulesIterableBySourceType(
            //             chunk,
            //             'remote',
            //           ),
            //         );
            //       }
            //       if (!consumeShares) {
            //         consumeShares = Boolean(
            //           compilation.chunkGraph.getChunkModulesIterableBySourceType(
            //             chunk,
            //             'consume-shared',
            //           ),
            //         );
            //       }
            //       if (hasRemoteModules && consumeShares) {
            //         break;
            //       }
            //     }
      
            //     remotes = this._getRemotes(
            //       compiler.webpack.RuntimeGlobals,
            //       requirements,
            //       hasRemoteModules,
            //       initialChunks,
            //       remotes,
            //     );
      
            //     shared = this._getShared(
            //       compiler.webpack.RuntimeGlobals,
            //       requirements,
            //       consumeShares,
            //       initialChunks,
            //       shared,
            //     );
            //   }
      
            //   if (!remotes && !shared) {
            //     return source;
            //   }
      
            //   const initialEntryModules = this._getInitialEntryModules(
            //     compilation,
            //     upperContext,
            //   );
            //   const templateString = this._getTemplateString(
            //     compiler,
            //     initialEntryModules,
            //     shared,
            //     remotes,
            //     source,
            //   );
      
              return new compiler.webpack.sources.ConcatSource(templateString);
            },
          );
    }
}
module.exports = ModifyServerLoaderPlugin