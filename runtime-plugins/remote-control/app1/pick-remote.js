const store = {};
const lsmap = {
  green: 'http://localhost:3003/remoteEntry.js',
  blue: 'http://localhost:3002/remoteEntry.js',
};

const map = {
  app2: 'http://localhost:3003/remoteEntry.js',
};

const CustomPlugin = (): FederationRuntimePlugin => ({
  name: 'backend-remote-control',
  beforeInit: args => {
    store.name = args.options.name;
    return args;
  },
  init: async args => {
    const override = window.localStorage.getItem('button');

    if (override) {
      args.options.remotes.forEach(remote => {
        remote.entry = lsmap[override];
      });
    } else {
      await Promise.all(
        args.options.remotes.map(async remote => {
          remote.entry = await Promise.resolve(map[remote.name]);
          return remote;
        }),
      );
    }

    return args;
  },
  beforeLoadShare: async args => {
    //@ts-ignore
    while (__FEDERATION__.__INSTANCES__.length <= 1) {
      // workaround to bug thatll be fixed in next release
      await new Promise(r => setTimeout(r, 150));
    }

    return args;
  },
});

export default CustomPlugin;
