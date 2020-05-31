const Template = require("webpack/lib/Template");
const { ConcatSource } = require("webpack-sources");

/** @typedef {import("webpack/lib/Compiler")} Compiler  */

const PLUGIN_NAME = "FederatedRuntimePlugin";

class FederatedRuntimePlugin {
  constructor({ remotes, runtimes }) {
    this.remotes = Array.isArray(remotes)
      ? remotes
      : Object.keys(remotes).reduce((p, c) => {
          p.push(remotes[c]);
          return p;
        }, []);

    this.runtimes = runtimes;
  }

  /**
   * @param {Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap(PLUGIN_NAME, (chunks) => {
        for (const chunk of chunks) {
          if (!chunk.canBeInitial()) {
            continue;
          }

          for (const file of chunk.files) {
            compilation.updateAsset(
              file,
              (old) =>
                new ConcatSource(
                  `
(function(entrypoint) {
  if (global.__federated_runtime__) {
    entrypoint();
    return;
  }

  var requireMiddleware = [
    ${this.runtimes
      .reduce((p, runtime) => {
        if (runtime.resolve) {
          p.push(runtime.resolve);
        }
        return p;
      }, [])
      .join(",")}
  ];

  var resolveFilenameMiddleware = [
    ${this.runtimes
      .reduce((p, runtime) => {
        if (runtime.resolveFilename) {
          p.push(runtime.resolveFilename);
        }
        return p;
      }, [])
      .join(",")}
  ];

  function requireFromString(code, filename, opts) {
    if (typeof filename === "object") {
      opts = filename;
      filename = undefined;
    }

    opts = opts || {};
    filename = filename || "";

    opts.appendPaths = opts.appendPaths || [];
    opts.prependPaths = opts.prependPaths || [];
  
    opts = opts || {};
    filename = filename || "";
  
    if (typeof code !== "string") {
      throw new Error("code must be a string");
    }

    const paths = Module._nodeModulePaths(require("path").dirname(filename))
    
    const { parent } = module;
  
    const m = new Module(filename, parent);
  
    m.filename = filename;
    m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
    require.cache[m.id] = m;
    m._compile(code, filename);
  
    parent &&
      parent.children &&
      parent.children.splice(parent.children.indexOf(m), 1);
    m.loaded = true;
  
    return m;
  }

  global.__federated_runtime__ = {
    remotes: ${JSON.stringify(this.remotes)},
    requireFromString: requireFromString
  };

  var Module = require("module");

  Module.prototype.require = new Proxy(Module.prototype.require, {
    apply(target, thisArg, argArray) {
      if (global.__federated_runtime__.remotes[argArray[0]]) {
        for (var middleware of requireMiddleware) {
          var result = middleware.apply(thisArg, argArray);
          
          if (result) {
            return () => result;
          }
        }
      }

      return Reflect.apply(target, thisArg, argArray);
    }
  });

  const ogResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function() {
    for (var middleware of resolveFilenameMiddleware) {
      var result = middleware.apply(this, arguments);
      
      if (result) {
        return result;
      }
    }

    return ogResolveFilename.apply(this, arguments);
  };

  Promise.all([
    ${this.runtimes
      .reduce((p, runtime) => {
        if (runtime.initialize) {
          p.push(
            `(${runtime.initialize})(global.__federated_runtime__.remotes)`
          );
        }
        return p;
      }, [])
      .join(",")}
  ]).then(() => {
    entrypoint();
  });
})(function() {`,
                  old,
                  `});
`
                )
            );
          }
        }
      });
    });
  }
}

module.exports = FederatedRuntimePlugin;
