class HoistContainerReferences {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('HoistContainerReferences', compilation => {
      compilation.hooks.afterOptimizeChunks.tap('HoistContainerReferences', chunks => {
        const chunkSet = new Map();
        const externalRequests = new Set();
        for (const chunk of chunks) {
          chunkSet.set(chunk.id || chunk.name, chunk);
        }
        // console.log(chunkSet)
        for (const chunk of chunks) {
          const remoteModules = compilation.chunkGraph.getChunkModulesIterableBySourceType(
            chunk,
            'remote',
          );
          if (!remoteModules) continue;
          for (const remoteModule of remoteModules) {
            remoteModule.dependencies.forEach(dep => {
              const mod = compilation.moduleGraph.getModule(dep);
              externalRequests.add(mod);
              const runtimeChunk = chunkSet.get(chunk.runtime);
              compilation.chunkGraph.connectChunkAndModule(runtimeChunk, mod);
            });
          }
        }
        console.log(externalRequests);
      });
    });
  }
}

export {HoistContainerReferences}
