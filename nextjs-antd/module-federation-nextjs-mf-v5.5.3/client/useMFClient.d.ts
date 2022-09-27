import type { MFClient } from './MFClient';
import type { RemoteContainer } from './RemoteContainer';
export declare type MFClientHookOptions = {
    /**
     * This callback will be called when user switches to federated page
     *   - as a first arg you will receive RemoteContainer
     * If user return back to the host application page
     *   - then the first argument became `undefined`
     *
     * This callback is called only if changed remote from which served current visible page
     * and does not called on internal nextjs route changes.
     *
     * This callback helps in very convenient way in _app.tsx (or any other React component)
     * load additional data from RemoteContainer and pass it to your application. Eg.:
     *   - application menu
     *   - apollo configs
     *   - translation strings
     */
    onChangeRemote?: (remote: RemoteContainer | undefined, MFClient: MFClient) => void;
};
/**
 * React hook which provides convenient way for working with ModuleFederation runtime changes in runtime;
 */
export declare function useMFClient(opts: MFClientHookOptions): MFClient;
