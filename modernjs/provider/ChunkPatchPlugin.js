module.exports = class ChunkPatchPlugin {
  constructor(remoteEntryName) {
    if (!remoteEntryName) {
      throw new Error('remoteEntryName is required !');
    }
    this.remoteEntryName = remoteEntryName;
  }

  apply(compiler) {
    const { splitChunks } = compiler.options.optimization;

    if (!splitChunks || !splitChunks.chunks) {
      return;
    }

    if (typeof splitChunks.chunks === 'function') {
      const prevChunks = splitChunks.chunks;
      splitChunks.chunks = chunk => {
        if (chunk.name && chunk.name === this.remoteEntryName) {
          return false;
        }
        return prevChunks(chunk);
      };
      return;
    }

    if (splitChunks.chunks === 'all') {
      splitChunks.chunks = chunk => {
        if (chunk.name && chunk.name === this.remoteEntryName) {
          return false;
        }
        return true;
      };
      return;
    }

    if (splitChunks.chunks === 'initial') {
      splitChunks.chunks = chunk => {
        if (chunk.name && chunk.name === this.remoteEntryName) {
          return false;
        }
        return chunk.isOnlyInitial();
      };
    }
  }
};
