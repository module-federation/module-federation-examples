const pluginName = 'AddRuntimeRequiremetToPromiseExternalPlugin';

class AddRuntimeRequiremetToPromiseExternalPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      const RuntimeGlobals = compiler.webpack.RuntimeGlobals;
      if (compilation.outputOptions.trustedTypes) {
        compilation.hooks.additionalModuleRuntimeRequirements.tap(
          pluginName,
          (module, set, context) => {
            if (module.externalType === 'promise') {
              set.add(RuntimeGlobals.loadScript);
              set.add(RuntimeGlobals.require);
            }
          },
        );
      }
    });
  }
}

module.exports = AddRuntimeRequiremetToPromiseExternalPlugin;
