const { injectScript } = require('./runtime-container/dist/main');

async function importModule (lib, url, moduleName, modulePath, exportName) {
  const container = await injectScript({
    global: lib,
    url: url,
  });
  const factory = await container.get(modulePath);
  const module = factory();
  return {
    moduleObj: module[moduleName],
    exportObj: module[moduleName][exportName],
  };
}

importModule(
  'microservices',
  'https://raw.githubusercontent.com/module-federation/aegis-app/master/dist/remoteEntry.js',
  'models',
  './models',
  'ORDER',
).then(module => console.log(module));