"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MFClient = void 0;
const tslib_1 = require("tslib");
const eventemitter3_1 = tslib_1.__importDefault(require("eventemitter3"));
const helpers_1 = require("./helpers");
const CombinedPages_1 = require("./CombinedPages");
const RemotePages_1 = require("./RemotePages");
const RemoteContainer_1 = require("./RemoteContainer");
/**
 * The main class for Module Federation on the client side in runtime.
 * Instance of this class is a Singleton and stored in `window.mf_client` variable.
 */
class MFClient {
    constructor(nextPageLoader, opts) {
        /** List of registered remotes */
        this.remotes = {};
        this._nextPageLoader = nextPageLoader;
        this.events = new eventemitter3_1.default();
        const cfg = global?.__NEXT_DATA__?.props?.mfRoutes || {};
        this.remotePages = new RemotePages_1.RemotePages(opts?.mode);
        Object.keys(cfg).forEach((remoteStr) => {
            const remote = this.registerRemote(remoteStr);
            this.remotePages.addRoutes(cfg[remoteStr], remote);
        });
        this.combinedPages = new CombinedPages_1.CombinedPages(this._nextPageLoader._getPageListOriginal.bind(this._nextPageLoader), this.remotePages);
        this._wrapLoadRoute(nextPageLoader);
        this._wrapWhenEntrypoint(nextPageLoader);
    }
    /**
     * This method returns sorted list of local and federated pages.
     *
     * `patchNextClientPageLoader` change vanilla PageLoader.getPageList() method:
     *   - exposes vanilla implementation as _getPageListOriginal()
     *   - and PageLoader.getPageList() starting call this method under the hood
     */
    async getPageList() {
        return this.combinedPages.getPageList();
    }
    /**
     * Check that current browser pathname is served by federated remotes.
     *
     * Eg. if cleanPathname `/shop/nodkz/product123` and pageListFederated is ['/shop/nodkz/[...mee]']
     *     then this method will match federated dynamic route and return true.
     *
     * PS. This method is used by DevHmrFixInvalidPongPlugin (fix HMR page reloads in dev mode)
     */
    isFederatedPathname(cleanPathname) {
        return !!this.remotePages.routeToRemote(cleanPathname);
    }
    /**
     * Add remote entry to remotes registry of MFClient.
     * This RemoteContainer will be used for loading remote pages.
     *
     * @remoteStr string -  eg. `home@https://example.com/_next/static/chunks/remoteEntry.js`
     */
    registerRemote(remoteStr) {
        const remote = RemoteContainer_1.RemoteContainer.createSingleton(remoteStr);
        this.remotes[remote.global] = remote;
        return remote;
    }
    /**
     * Convert browser pathname to NextJS route.
     *
     *   /shop/products/123 -> /shop/products/[...id]
     *
     * For regular pages logic is simple (just match exact name).
     * But for dynamic routes it's quite complicated - page list must be in specific order.
     */
    async pathnameToRoute(cleanPathname) {
        const routes = await this.getPageList();
        return (0, helpers_1.pathnameToRoute)(cleanPathname, routes);
    }
    /**
     * This method patch routeLoader.loadRoute() in runtime (on bootstrap).
     * During the build it's quite complicated to do.
     */
    _wrapLoadRoute(nextPageLoader) {
        if (!nextPageLoader?.routeLoader?.loadRoute) {
            throw new Error('[nextjs-mf] Cannot wrap `pageLoader.routeLoader.loadRoute()` with custom logic.');
        }
        const routeLoader = nextPageLoader.routeLoader;
        // if _loadRouteOriginal does not initialized then take original loadRoute method
        if (!routeLoader._loadRouteOriginal) {
            routeLoader._loadRouteOriginal = routeLoader.loadRoute.bind(routeLoader);
        }
        // replace loadRoute logic
        routeLoader.loadRoute = async (route, prefetch) => {
            let routeInfo;
            if (await this.combinedPages.isLocalRoute(route)) {
                routeInfo = await routeLoader._loadRouteOriginal(route);
                this.events.emit('loadedLocalRoute', routeInfo, prefetch);
            }
            else {
                try {
                    routeInfo = await this.remotePages.getRouteInfo(route);
                    this.events.emit('loadedRemoteRoute', routeInfo, prefetch, this.remotePages.routeToRemote(route));
                }
                catch (e) {
                    // as fallback try to use original loadRoute for keeping nextjs logic for routes load errors
                    routeInfo = await routeLoader._loadRouteOriginal(route);
                }
            }
            return routeInfo;
        };
    }
    /**
     * This method patch routeLoader.whenEntrypoint() in runtime (on bootstrap).
     * During the build it's quite complicated to do.
     */
    _wrapWhenEntrypoint(nextPageLoader) {
        if (!nextPageLoader.routeLoader?.whenEntrypoint) {
            throw new Error('[nextjs-mf] Cannot wrap `pageLoader.routeLoader.whenEntrypoint()` with custom logic.');
        }
        const routeLoader = nextPageLoader.routeLoader;
        // if _whenEntrypointOriginal does not initialized then take original loadRoute method
        if (!routeLoader._whenEntrypointOriginal) {
            routeLoader._whenEntrypointOriginal =
                routeLoader.whenEntrypoint.bind(routeLoader);
        }
        // replace routeLoader.whenEntrypoint logic
        routeLoader.whenEntrypoint = async (route) => {
            if (route === '/_error') {
                try {
                    let route = await this.pathnameToRoute(window.location.pathname);
                    if (!route) {
                        // if route not found then try to load all non-downloaded remoteEntries
                        // and try to find route again
                        const awaitRemotes = [];
                        Object.values(this.remotes).forEach((remote) => {
                            if (!remote.isLoaded()) {
                                awaitRemotes.push(remote
                                    .getContainer()
                                    .then(() => this.remotePages.loadRemotePageMap(remote))
                                    .catch(() => null));
                            }
                        });
                        await Promise.all(awaitRemotes);
                        route = await this.pathnameToRoute(window.location.pathname);
                    }
                    if (route) {
                        // TODO: fix router properties for the first page load of federated page http://localhost:3000/shop/products/B
                        console.warn('replace entrypoint /_error by', route);
                        const routeInfo = await this.remotePages.getRouteInfo(route);
                        this.events.emit('loadedRemoteRoute', routeInfo, false, this.remotePages.routeToRemote(route));
                        return routeInfo;
                    }
                }
                catch (e) {
                    // do nothing, load original entrypoint
                }
            }
            const routeInfo = await routeLoader._whenEntrypointOriginal(route);
            return routeInfo;
        };
    }
}
exports.MFClient = MFClient;
//# sourceMappingURL=MFClient.js.map