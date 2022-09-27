import type { RuleSetRuleUnion, Loader } from '@module-federation/utilities';
/**
 * Inject a loader into the current module rule.
 * This function mutates `rule` argument!
 */
export declare function injectRuleLoader(rule: RuleSetRuleUnion, loader?: Loader): void;
/**
 * Check that current module rule has a loader with the provided name.
 */
export declare function hasLoader(rule: RuleSetRuleUnion, loaderName: string): boolean;
