export default function () {
  const remoteEntries = {
    remote_one: 'http://localhost:4200/remoteEntry.js',
    remote_two: 'http://localhost:4201/remoteEntry.js',
  };

  const record = (type, details = {}) => {
    const events = globalThis.__REMOTE_ROUTER_EVENTS__ || [];
    events.push({ type, ...details });
    globalThis.__REMOTE_ROUTER_EVENTS__ = events;
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
    version: '1.0.0',
    apply(instance) {
      record('apply', { name: instance.name });
    },
    createScript(args) {
      record('createScript', { url: args.url, remote: args.remoteInfo?.name });

      if (typeof document === 'undefined') {
        return undefined;
      }

      const script = document.createElement('script');
      script.src = args.url;
      script.async = true;
      script.dataset.remoteRouter = args.remoteInfo?.name || '';

      return { script, timeout: 8000 };
    },
    errorLoadRemote({ id, error, from }) {
      record('errorLoadRemote', { id, from });
      console.error(id, 'offline');
      const pg = function () {
        console.error(id, 'offline', error);
        return getErrorMessage(id, error);
      };

      return getModule(pg, from);
    },
    afterLoadRemote(args) {
      record('afterLoadRemote', {
        id: args.id,
        recovered: Boolean(args.recovered),
      });
    },
    afterLoadEntry(args) {
      record('afterLoadEntry', {
        remote: args.remoteInfo?.name,
        recovered: Boolean(args.recovered),
      });
    },
    async beforePreloadRemote(args) {
      record('beforePreloadRemote', { count: args.preloadOps?.length ?? 0 });
    },
    async generatePreloadAssets(args) {
      record('generatePreloadAssets', { remote: args.remoteInfo?.name });
    },
    beforeRequest(args) {
      record('beforeRequest', { id: args.id });
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
