const lsmap = {
  green: 'http://localhost:3003/remoteEntry.js',
  blue: 'http://localhost:3002/remoteEntry.js',
};

const map = {
  app2: 'http://localhost:3003/remoteEntry.js',
};

const CustomPlugin = () => ({
  name: 'backend-remote-control',
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
    while ((globalThis.__FEDERATION__?.__INSTANCES__?.length ?? 0) <= 1) {
      await new Promise(r => setTimeout(r, 150));
    }

    return args;
  },
});

export default CustomPlugin;
