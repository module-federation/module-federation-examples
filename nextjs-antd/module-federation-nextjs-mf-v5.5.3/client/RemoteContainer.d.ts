import type { WebpackRemoteContainer, EventTypes, RemoteData, PageMap } from '@module-federation/utilities';
import EventEmitter from 'eventemitter3';
/**
 * This is a Lazy loader of webpack remote container with some NextJS-specific helper methods.
 *
 * It provides the ability to register remote, and load & init it on the first use.
 */
export declare class RemoteContainer {
    global: string;
    url: string;
    container: WebpackRemoteContainer | undefined;
    pageMap: PageMap | undefined;
    error?: Error;
    events: EventEmitter<EventTypes>;
    static instances: Record<string, RemoteContainer>;
    /**
     * Create or reuse existed remote entry.
     *
     * Be careful, Singleton pattern does not work well in webpack builds,
     * because one module may be copied between different chunks. In such a way
     * you obtain several lists of instances.
     */
    static createSingleton(remote: string | RemoteData): RemoteContainer;
    constructor(opts: RemoteData);
    /**
     * Check is the current remoteEntry.js loaded or not
     */
    isLoaded(): boolean;
    /**
     * Returns initialized webpack RemoteContainer.
     * If its' script does not loaded - then load & init it firstly.
     */
    getContainer(): Promise<WebpackRemoteContainer>;
    /**
     * Return remote module from container.
     * If you provide `exportName` it automatically return exact property value from module.
     *
     * @example
     *   remote.getModule('./pages/index', 'default')
     */
    getModule(modulePath: string, exportName?: string): Promise<any>;
    /**
     * Retrieve registered nextjs' routes from remote app
     */
    getPageMap(): Promise<PageMap | undefined>;
}
