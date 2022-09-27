import type PageLoader from 'next/dist/client/page-loader';
import EventEmitter from 'eventemitter3';
import { CombinedPages } from './CombinedPages';
import { RemotePages } from './RemotePages';
import { RemoteContainer } from './RemoteContainer';
declare type EventTypes = 'loadedRemoteRoute' | 'loadedLocalRoute';
/** Remote Container string eg `home@https://example.com/_next/static/chunks/remoteEntry.js` */
export declare type RemoteString = string;
export declare type MFClientOptions = {
    mode: 'production' | 'development';
};
/**
 * The main class for Module Federation on the client side in runtime.
 * Instance of this class is a Singleton and stored in `window.mf_client` variable.
 */
export declare class MFClient {
    /** List of registered remotes */
    remotes: Record<RemoteString, RemoteContainer>;
    /** Local & Remote pages sorted in correct order */
    combinedPages: CombinedPages;
    /** Remote pages loader */
    remotePages: RemotePages;
    /** EventEmitter which allows to subscribe on different events */
    events: EventEmitter<EventTypes>;
    /** Original nextjs PageLoader which passed by `patchNextClientPageLoader.js` */
    private _nextPageLoader;
    constructor(nextPageLoader: PageLoader, opts: MFClientOptions);
    /**
     * This method returns sorted list of local and federated pages.
     *
     * `patchNextClientPageLoader` change vanilla PageLoader.getPageList() method:
     *   - exposes vanilla implementation as _getPageListOriginal()
     *   - and PageLoader.getPageList() starting call this method under the hood
     */
    getPageList(): Promise<string[]>;
    /**
     * Check that current browser pathname is served by federated remotes.
     *
     * Eg. if cleanPathname `/shop/nodkz/product123` and pageListFederated is ['/shop/nodkz/[...mee]']
     *     then this method will match federated dynamic route and return true.
     *
     * PS. This method is used by DevHmrFixInvalidPongPlugin (fix HMR page reloads in dev mode)
     */
    isFederatedPathname(cleanPathname: string): boolean;
    /**
     * Add remote entry to remotes registry of MFClient.
     * This RemoteContainer will be used for loading remote pages.
     *
     * @remoteStr string -  eg. `home@https://example.com/_next/static/chunks/remoteEntry.js`
     */
    registerRemote(remoteStr: RemoteString): RemoteContainer;
    /**
     * Convert browser pathname to NextJS route.
     *
     *   /shop/products/123 -> /shop/products/[...id]
     *
     * For regular pages logic is simple (just match exact name).
     * But for dynamic routes it's quite complicated - page list must be in specific order.
     */
    pathnameToRoute(cleanPathname: string): Promise<string | undefined>;
    /**
     * This method patch routeLoader.loadRoute() in runtime (on bootstrap).
     * During the build it's quite complicated to do.
     */
    private _wrapLoadRoute;
    /**
     * This method patch routeLoader.whenEntrypoint() in runtime (on bootstrap).
     * During the build it's quite complicated to do.
     */
    private _wrapWhenEntrypoint;
}
export {};
