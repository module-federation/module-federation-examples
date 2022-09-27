"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteContainer = void 0;
const tslib_1 = require("tslib");
const eventemitter3_1 = tslib_1.__importDefault(require("eventemitter3"));
const utils_1 = require("../utils");
/**
 * This is a Lazy loader of webpack remote container with some NextJS-specific helper methods.
 *
 * It provides the ability to register remote, and load & init it on the first use.
 */
class RemoteContainer {
    constructor(opts) {
        this.global = opts.global;
        this.url = opts.url;
        this.events = new eventemitter3_1.default();
    }
    /**
     * Create or reuse existed remote entry.
     *
     * Be careful, Singleton pattern does not work well in webpack builds,
     * because one module may be copied between different chunks. In such a way
     * you obtain several lists of instances.
     */
    static createSingleton(remote) {
        let data;
        if (typeof remote === 'string') {
            const [global, url] = remote.split('@');
            data = { global, url };
        }
        else if (remote?.global && remote?.url) {
            data = { global: remote.global, url: remote.url };
        }
        if (!data) {
            console.error(`Cannot init RemoteContainer with following data`, RemoteContainer);
            throw Error('[nextjs-mf] RemoteContainer.createSingleton(remote) accepts string "shop@http://example.com/_next/static/chunks/remoteEntry.js" OR object { global: "shop", url: "http://example.com/_next/static/chunks/remoteEntry.js"}');
        }
        let container;
        if (this.instances[data.global]) {
            container = this.instances[data.global];
        }
        else {
            container = new RemoteContainer(data);
            this.instances[data.global] = container;
        }
        return container;
    }
    /**
     * Check is the current remoteEntry.js loaded or not
     */
    isLoaded() {
        return !!this.container;
    }
    /**
     * Returns initialized webpack RemoteContainer.
     * If its' script does not loaded - then load & init it firstly.
     */
    async getContainer() {
        if (this.container) {
            return this.container;
        }
        this.events.emit('loadStart', this);
        try {
            const container = await (0, utils_1.injectScript)({
                global: this.global,
                url: this.url,
            });
            if (container) {
                this.container = container;
                this.events.emit('loadComplete', this);
                return container;
            }
            throw Error(`[nextjs-mf] Remote container ${this.url} is empty`);
        }
        catch (e) {
            this.error = e;
            this.events.emit('loadError', e.message, this);
            throw e;
        }
    }
    /**
     * Return remote module from container.
     * If you provide `exportName` it automatically return exact property value from module.
     *
     * @example
     *   remote.getModule('./pages/index', 'default')
     */
    async getModule(modulePath, exportName) {
        const container = await this.getContainer();
        const modFactory = await container.get(modulePath);
        if (!modFactory)
            return undefined;
        const mod = modFactory();
        if (exportName) {
            return mod && typeof mod === 'object' ? mod[exportName] : undefined;
        }
        else {
            return mod;
        }
    }
    /**
     * Retrieve registered nextjs' routes from remote app
     */
    async getPageMap() {
        if (this.pageMap) {
            return this.pageMap;
        }
        const pageMap = await this.getModule('./pages-map-v2', 'default');
        if (pageMap) {
            this.pageMap = pageMap;
        }
        else {
            this.pageMap = {};
            console.warn(`[nextjs-mf] Container ${this.global} does not expose "./pages-map-v2" module.`);
        }
        return this.pageMap;
    }
}
exports.RemoteContainer = RemoteContainer;
RemoteContainer.instances = {};
//# sourceMappingURL=RemoteContainer.js.map