const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { init, loadRemote } = require('@module-federation/runtime');

const generateSharedConfig = (mfConfig) => {
  const sharedConfig = {};
  for (const [packageName, packageConfig] of Object.entries(mfConfig.shared)) {
    let version = false;
    try {
      version = require(path.join(packageName, 'package.json')).version;
    } catch (e) {
      // Handle error if needed
    }
    if (typeof packageConfig === 'string') {
      sharedConfig[packageName] = {
        version,
        lib: () => require(packageName),
      };
    } else {
      sharedConfig[packageName] = {
        version,
        ...packageConfig,
        lib: () => require(packageName),
      };
    }
  }
  return sharedConfig;
};

const setupFederationTest = async (mfConfig) => {
  const sharedConfig = generateSharedConfig(mfConfig);
  let remotes = [];

  const harnessPath = path.resolve(__dirname, 'node_modules', 'federation-test');
  let harnessData = [];

  for (const [remote, entry] of Object.entries(mfConfig.remotes)) {
    const [name, url] = entry.split('@');
    const manifest = url.replace('remoteEntry.js', 'mf-manifest.json');
    const response = await fetch(manifest);
    const data = await response.json();

    const parsedPath = new URL(url).origin;
    const subPath = data.metaData.remoteEntry.path;

    const buildUrl = (parsedPath, subPath, file) => {
      return subPath ? `${parsedPath}/${subPath}/${file}` : `${parsedPath}/${file}`;
    };

    remotes.push(buildUrl(parsedPath, subPath, data.metaData.remoteEntry.name));

    const jsFiles = [
      ...data.shared.flatMap(shared => [...shared.assets.js.sync, ...shared.assets.js.async].map(file => buildUrl(parsedPath, subPath, file))),
      ...data.exposes.flatMap(expose => [...expose.assets.js.sync, ...expose.assets.js.async].map(file => buildUrl(parsedPath, subPath, file)))
    ];

    const cssFiles = [
      ...data.shared.flatMap(shared => [...shared.assets.css.sync, ...shared.assets.css.async].map(file => buildUrl(parsedPath, subPath, file))),
      ...data.exposes.flatMap(expose => [...expose.assets.css.sync, ...expose.assets.css.async].map(file => buildUrl(parsedPath, subPath, file)))
    ];

    remotes.push(...jsFiles, ...cssFiles);

    const fakePackagePath = path.resolve(__dirname, 'node_modules', data.id);
    const fakePackageJsonPath = path.join(fakePackagePath, 'package.json');
    const fakePackageIndexPath = path.join(fakePackagePath, 'index.js');

    if (!fs.existsSync(fakePackagePath)) {
      fs.mkdirSync(fakePackagePath, { recursive: true });
    }

    const exportsContent = data.exposes.reduce((exportsObj, expose) => {
      let exposeName = expose.name;
      if (!exposeName.endsWith('.js')) {
        exposeName += '.js';
      }
      exportsObj[expose.path] = './virtual' + exposeName;
      const resolvePath = path.join(fakePackagePath, './virtual' + exposeName);

      harnessData.push(resolvePath);

      fs.writeFileSync(resolvePath, `    
       const container = require('./remoteEntry.js')[${JSON.stringify(data.id)}];
       const target = {};

       let e;
       const cx = container.get(${JSON.stringify(expose.path)}).then((m) => {
         e = m();
        Object.assign(target, e);
       });

     
       module.exports = new Proxy(target, {
        get(target, prop) {
          if(prop === 'setupTest') return cx;
          if (!e) {
            return cx;
          } else if (prop in e) {
            return e[prop];
          } else {
            return e;
          }
        }
       });
      `, 'utf-8');
      return exportsObj;
    }, {});

    const packageJsonContent = {
      name: data.id,
      version: '1.0.0',
      exports: exportsContent
    };
    const indexJsContent = `
      module.exports = () => 'Hello from fake package!';
    `;

    fs.writeFileSync(fakePackageJsonPath, JSON.stringify(packageJsonContent, null, 2));
    fs.writeFileSync(fakePackageIndexPath, indexJsContent);

    for (const fileUrl of remotes) {
      const fileName = path.basename(fileUrl);
      const filePath = path.join(fakePackagePath, fileName);
      const fileResponse = await fetch(fileUrl);
      const fileData = await fileResponse.buffer();
      fs.writeFileSync(filePath, fileData);
    }
  }

  if (!fs.existsSync(harnessPath)) {
    fs.mkdirSync(harnessPath, { recursive: true });
  }

  fs.writeFileSync('node_modules/federation-test/index.js', `module.exports = Promise.all(${JSON.stringify(harnessData)}.map((p) => require(p).setupTest))`, 'utf-8');
  fs.writeFileSync('node_modules/federation-test/package.json', '{"name": "federation-test", "main": "./index.js"}', 'utf-8');
};

module.exports = {
  generateSharedConfig,
  setupFederationTest
};
