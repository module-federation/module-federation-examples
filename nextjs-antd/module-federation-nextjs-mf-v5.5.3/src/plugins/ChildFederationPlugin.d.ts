import type { Compiler } from 'webpack';
import type { ModuleFederationPluginOptions, NextFederationPluginExtraOptions } from '@module-federation/utilities';
export declare class ChildFederationPlugin {
    private _options;
    private _extraOptions;
    constructor(options: ModuleFederationPluginOptions, extraOptions: NextFederationPluginExtraOptions);
    apply(compiler: Compiler): void;
}
export default ChildFederationPlugin;
