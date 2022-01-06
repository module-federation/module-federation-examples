const moduleFileName = 'remoteEntry.js';

// Host module
const app1Module = {
  fileName: moduleFileName,
  name: 'app1',
  port: 3001,
};

// Remote module
const app2Module = {
  fileName: moduleFileName,
  name: 'app2',
  port: 3002,
  get url() {
    return `//localhost:${this.port}`;
  },
  urlGlobalVariable: 'app2Url',
  get federationConfig() {
    // app2@[window.app2Url]/remoteEntry.js
    return `${this.name}@[window.${this.urlGlobalVariable}]/${this.fileName}`;
  },
};

module.exports = {
  app1Module,
  app2Module,
};
