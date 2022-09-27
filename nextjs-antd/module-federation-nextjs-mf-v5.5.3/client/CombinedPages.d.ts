import { RemotePages } from './RemotePages';
/**
 * Class which provides combined sorted list of local and remote routes.
 */
export declare class CombinedPages {
    /** Computable list of available local & remote pages in proper sorted order. */
    private sortedPageCache;
    /** List of pages that belongs to the current host application */
    private localPagesCache;
    /** List of known remote pages this list might be extent during runtime */
    private remotePagesCache;
    /** Nextjs getter which obtained from patchNextClientPageLoader */
    private localPagesGetter;
    /** Loader of remote pages  */
    private remotePages;
    constructor(localPagesGetter: () => Promise<string[]>, remotePages: RemotePages);
    /**
     * Check that provided route belongs to host application
     */
    isLocalRoute(route: string): Promise<boolean>;
    /**
     * Return sorted list of local & remotes routes.
     * This method is used in patchNextClientPageLoader
     * for patching nextjs' getPageList method.
     */
    getPageList(): Promise<string[]>;
}
