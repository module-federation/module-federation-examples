import { RemoteContainer } from './RemoteContainer';
declare type UseMFRemoteResult = {
    /** is container loaded or not */
    loaded: boolean;
    /** remote is Lazy, so it will be loaded if getModule(), getContainer() were called */
    remote: RemoteContainer;
    /** Present if error occurs during remote container loading */
    error: Error | undefined;
};
/**
 * React hook which provides an access to RemoteContainer in Module Federation
 *
 * @param global - can be a global variable name OR connection string "global@url"
 */
export declare function useMFRemote(global: string): UseMFRemoteResult;
export {};
