export default function () {
  const remoteEntries = {
    remote_one: 'http://localhost:4200/remoteEntry.js',
    remote_two: 'http://localhost:4201/remoteEntry.js',
  };

  const getErrorMessage = (id, error) => `remote ${id} is offline due to error: ${error}`;

  const getModule = (pg, from) => {
    if (from === 'build') {
      return () => ({
        __esModule: true,
        default: pg,
      });
    }

    return {
      default: pg,
    };
  };

  return {
    name: 'remote-router',
    errorLoadRemote({ id, error, from }) {
      console.error(id, 'offline');
      const pg = function () {
        console.error(id, 'offline', error);
        return getErrorMessage(id, error);
      };

      return getModule(pg, from);
    },
    beforeRequest(args) {
      args.options.remotes.forEach(r => {
        const name = r.name;
        if (remoteEntries[name]) {
          r.entry = remoteEntries[name];
        }
      });
      return args;
    },
  };
}
