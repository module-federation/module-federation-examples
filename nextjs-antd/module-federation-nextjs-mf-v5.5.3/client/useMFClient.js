"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMFClient = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const router_1 = tslib_1.__importDefault(require("next/dist/client/router"));
const isBrowser = typeof window !== 'undefined';
/**
 * React hook which provides convenient way for working with ModuleFederation runtime changes in runtime;
 */
function useMFClient(opts) {
    const MFClient = isBrowser
        ? window.mf_client
        : /* TODO: inject here SSR version of MFClient if it will be needed in future */ {};
    const innerState = React.useRef({
        remote: undefined,
    });
    React.useEffect(() => {
        // Step 1: Define handlers and helpers
        const processRemoteChange = (remote) => {
            if (innerState.current.remote !== remote) {
                innerState.current.remote = remote;
                if (opts?.onChangeRemote) {
                    opts.onChangeRemote(remote, MFClient);
                }
            }
        };
        const handleRouterChange = (pathname) => {
            if (MFClient.isFederatedPathname(pathname)) {
                const remote = MFClient.remotePages.routeToRemote(pathname);
                processRemoteChange(remote);
            }
            else {
                processRemoteChange(undefined);
            }
        };
        // Step 2: run bootstrap logic
        const initialRemote = MFClient.isFederatedPathname(window.location.pathname)
            ? MFClient.remotePages.routeToRemote(window.location.pathname)
            : undefined;
        if (initialRemote) {
            // important for first load to fire `onChangeRemote` with different remote
            // because in innerState by default we assume that used local application
            processRemoteChange(initialRemote);
        }
        // Step 3: Subscribe on events
        router_1.default.events.on('routeChangeStart', handleRouterChange);
        return () => {
            router_1.default.events.off('routeChangeStart', handleRouterChange);
        };
    }, []);
    return MFClient;
}
exports.useMFClient = useMFClient;
//# sourceMappingURL=useMFClient.js.map