import type { NextFederationPluginOptions } from '@module-federation/utilities';
import type { Compiler } from 'webpack';
export declare class NextFederationPlugin {
    private _options;
    private _extraOptions;
    constructor(options: NextFederationPluginOptions);
    apply(compiler: Compiler): void;
}
export default NextFederationPlugin;
