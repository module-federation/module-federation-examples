import type { Compiler } from 'webpack';
import type { ModuleFederationPluginOptions } from '@module-federation/utilities';
export default class ModuleFederationPlugin {
    private _options;
    constructor(options: ModuleFederationPluginOptions);
    apply(compiler: Compiler): void;
}
