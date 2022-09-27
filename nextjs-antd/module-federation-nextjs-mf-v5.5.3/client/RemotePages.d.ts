import type { PageMap } from '@module-federation/utilities';
import { RemoteContainer } from './RemoteContainer';
export declare type PathPrefix = string;
export declare type RemoteToRoutes = Map<RemoteContainer, PathPrefix | PathPrefix[]>;
export declare type RouteInfo = {
    component: any;
    exports: any;
    styles: string[];
};
/**
 * A class which prepares/loads a list of remotes pages and knows how
 * to prepare NextJS pseudo-module of route data.
 */
export declare class RemotePages {
    paths: Record<PathPrefix, RemoteContainer>;
    pageListCache: string[] | undefined;
    private asyncLoadedPageMaps;
    private mode?;
    constructor(mode?: 'production' | 'development');
    /**
     * Add remote routes for specific RemoteContainer which serves them.
     */
    addRoutes(routes: string | string[], remote: RemoteContainer): void;
    /**
     * Load a remote page map and add its routes to registry.
     */
    loadRemotePageMap(remote: RemoteContainer): Promise<PageMap | undefined>;
    /**
     * Get remote module according to provided next route.
     * Under the hood it automatically determines which remote need to be used.
     */
    routeToPageModule(route: string): Promise<any>;
    /**
     * Check that provided route present in registry.
     */
    hasRoute(route: string): boolean;
    /**
     * Find remote according to provided route.
     */
    routeToRemote(route: string): RemoteContainer | undefined;
    /**
     * Get cached unsorted list of remote routes.
     */
    getPageList(): string[];
    /**
     * Get prepared pseudo-module which is consumed by Nextjs' router.
     */
    getRouteInfo(route: string): Promise<undefined | RouteInfo>;
}
