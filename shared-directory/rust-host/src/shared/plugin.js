export default function () {
  return {
    name: 'delegate-modules-plugin',
    loadEntry({ remoteInfo }) {
      if (remoteInfo.name === 'shared') {
        return {
          init() {},
          async get(path) {
            path = path.replace('./', '');
            const result = await import(`./${path}`);
            return () => ({
              ...result,
              __esModule: true
            });
          },
        };
      }
    },
  };
}
