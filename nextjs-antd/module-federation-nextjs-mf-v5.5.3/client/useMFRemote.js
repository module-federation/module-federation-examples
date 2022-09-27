"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMFRemote = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const RemoteContainer_1 = require("./RemoteContainer");
const isBrowser = typeof window !== 'undefined';
/**
 * React hook which provides an access to RemoteContainer in Module Federation
 *
 * @param global - can be a global variable name OR connection string "global@url"
 */
function useMFRemote(global) {
    let remote;
    if (isBrowser) {
        // on client (we get instances from global variable because webpack breaks Singletons)
        const MFClient = window.mf_client;
        remote = MFClient.remotes[global] || MFClient.registerRemote(global);
    }
    else {
        // on server side
        remote = RemoteContainer_1.RemoteContainer.createSingleton(global);
    }
    const [loaded, setLoaded] = React.useState(remote.isLoaded());
    const [error, setError] = React.useState(remote.error);
    React.useEffect(() => {
        const handleLoadComplete = () => {
            setLoaded(true);
        };
        const handleLoadError = (e) => {
            setError(e);
        };
        if (!loaded && remote.isLoaded()) {
            handleLoadComplete();
        }
        remote.events.on('loadComplete', handleLoadComplete);
        remote.events.on('loadError', handleLoadError);
        return () => {
            remote.events.off('loadComplete', handleLoadComplete);
            remote.events.off('loadError', handleLoadError);
        };
    }, [remote]);
    return {
        remote,
        loaded,
        error,
    };
}
exports.useMFRemote = useMFRemote;
//# sourceMappingURL=useMFRemote.js.map