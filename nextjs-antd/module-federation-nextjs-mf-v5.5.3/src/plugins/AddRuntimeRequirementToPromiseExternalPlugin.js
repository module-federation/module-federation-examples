"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRuntimeRequirementToPromiseExternal = void 0;
class AddRuntimeRequirementToPromiseExternal {
    apply(compiler) {
        compiler.hooks.compilation.tap('AddRuntimeRequirementToPromiseExternal', (compilation) => {
            const RuntimeGlobals = compiler.webpack.RuntimeGlobals;
            compilation.hooks.additionalModuleRuntimeRequirements.tap('AddRuntimeRequirementToPromiseExternal', (module, set) => {
                if (module.externalType === 'promise') {
                    set.add(RuntimeGlobals.loadScript);
                    set.add(RuntimeGlobals.require);
                }
            });
        });
    }
}
exports.AddRuntimeRequirementToPromiseExternal = AddRuntimeRequirementToPromiseExternal;
exports.default = AddRuntimeRequirementToPromiseExternal;
//# sourceMappingURL=AddRuntimeRequirementToPromiseExternalPlugin.js.map