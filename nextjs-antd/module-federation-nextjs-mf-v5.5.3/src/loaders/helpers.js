"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasLoader = exports.injectRuleLoader = void 0;
/**
 * Inject a loader into the current module rule.
 * This function mutates `rule` argument!
 */
function injectRuleLoader(rule, loader = {}) {
    if (rule !== '...') {
        if (rule.loader) {
            rule.use = [loader, { loader: rule.loader, options: rule.options }];
            delete rule.loader;
            delete rule.options;
        }
        else if (rule.use) {
            rule.use = [loader, ...rule.use];
        }
    }
}
exports.injectRuleLoader = injectRuleLoader;
/**
 * Check that current module rule has a loader with the provided name.
 */
function hasLoader(rule, loaderName) {
    if (rule !== '...') {
        if (rule.loader === loaderName) {
            return true;
        }
        else if (rule.use && Array.isArray(rule.use)) {
            for (let i = 0; i < rule.use.length; i++) {
                const loader = rule.use[i];
                // check exact name, eg "url-loader" or its path "node_modules/url-loader/dist/cjs.js"
                if (typeof loader !== 'string' &&
                    typeof loader !== 'function' &&
                    loader.loader &&
                    (loader.loader === loaderName ||
                        loader.loader.includes(`/${loaderName}/`))) {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.hasLoader = hasLoader;
//# sourceMappingURL=helpers.js.map