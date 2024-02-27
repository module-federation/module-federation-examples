import { FederationRuntimePlugin } from '@module-federation/runtime/types';


const getModule = (pg, from) => {
  if (from === 'build') {
    return () => ({
      __esModule: true,
      default: pg,
    });
  } else {
    return {
      default: pg,
    };
  }
};
const getErrorMessage = (id, error) => `remote ${id} is offline due to error: ${error}`;

const OfflineRemoteHandler = (): FederationRuntimePlugin => ({
  name: 'offline-remote-plugin',
  errorLoadRemote({id, error, from, origin}) {
    const pg = function () {
      console.error(id, 'offline', error);
      return getErrorMessage(id, error);
    };

    return getModule(pg, from);
  },
});

export default OfflineRemoteHandler;
