const fs = require('fs');
const path = require('path');

const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
const harnessPath = path.join(nodeModulesPath, 'federation-test');
const safePackageNamePattern = /^(?:@[A-Za-z0-9._-]+\/)?[A-Za-z0-9._-]+$/;
const safeExportPathPattern = /^\.\/[A-Za-z0-9._/-]+$/;
const safeAssetPathPattern = /^[A-Za-z0-9._/-]+$/;

const safeResolve = (basePath, ...segments) => {
  const resolvedBase = path.resolve(basePath);
  const targetPath = path.resolve(resolvedBase, ...segments);
  const relativePath = path.relative(resolvedBase, targetPath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Refusing to write outside ${resolvedBase}`);
  }

  return targetPath;
};

const assertSafePackageName = (packageName) => {
  if (typeof packageName !== 'string' || !safePackageNamePattern.test(packageName)) {
    throw new Error(`Invalid remote package name: ${packageName}`);
  }

  return packageName;
};

const assertSafeExposePath = (exposePath) => {
  if (
    typeof exposePath !== 'string' ||
    exposePath.includes('..') ||
    !safeExportPathPattern.test(exposePath)
  ) {
    throw new Error(`Invalid exposed module path: ${exposePath}`);
  }

  return exposePath;
};

const assertSafeRemoteEntry = (remoteEntry) => {
  if (!remoteEntry || typeof remoteEntry.name !== 'string' || !remoteEntry.name.endsWith('.js')) {
    throw new Error('Invalid remote entry metadata');
  }

  if (
    typeof remoteEntry.path === 'string' &&
    remoteEntry.path !== '' &&
    (remoteEntry.path.includes('..') || !safeAssetPathPattern.test(remoteEntry.path))
  ) {
    throw new Error(`Invalid remote entry path: ${remoteEntry.path}`);
  }
};

const normalizeAssetList = (assets = {}) => {
  const assetNames = [...(assets.sync || []), ...(assets.async || [])];

  return assetNames.map((assetName) => {
    if (
      typeof assetName !== 'string' ||
      assetName.includes('..') ||
      !safeAssetPathPattern.test(assetName)
    ) {
      throw new Error(`Invalid remote asset path: ${assetName}`);
    }

    return assetName;
  });
};

const toVirtualFileName = (exposePath) => {
  const fileName = assertSafeExposePath(exposePath)
    .slice(2)
    .replace(/[\\/]/g, '_');

  return `virtual-${fileName.endsWith('.js') ? fileName : `${fileName}.js`}`;
};

const getRemoteUrl = (entry) => {
  const separatorIndex = entry.indexOf('@');
  return separatorIndex === -1 ? entry : entry.slice(separatorIndex + 1);
};

const getRemoteName = (remoteAlias, entry) => {
  const separatorIndex = entry.indexOf('@');
  const remoteName = separatorIndex === -1 ? remoteAlias : entry.slice(0, separatorIndex);

  return assertSafePackageName(remoteName);
};

const getFakePackagePath = (packageName) => {
  return safeResolve(nodeModulesPath, ...assertSafePackageName(packageName).split('/'));
};

const getSafeAssetFilePath = (packagePath, fileUrl) => {
  const fileName = path.basename(new URL(fileUrl).pathname);

  if (!fileName || fileName === '.' || fileName === '..') {
    throw new Error(`Invalid remote asset URL: ${fileUrl}`);
  }

  return safeResolve(packagePath, fileName);
};

const fetchRemote = (...args) => {
  if (globalThis.fetch) {
    return globalThis.fetch(...args);
  }

  const fetchPath = require.resolve('node-fetch', {
    paths: [process.cwd(), __dirname],
  });

  return require(fetchPath)(...args);
};

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

const setupFederationTest = async (mfConfig, testExposes = {}) => {
  let harnessData = [];

  for (const [remoteAlias, entry] of Object.entries(mfConfig.remotes)) {
    const remoteName = getRemoteName(remoteAlias, entry);
    const exposedModules = testExposes[remoteName];

    if (!exposedModules || exposedModules.length === 0) {
      throw new Error(`Missing test exposes for remote: ${remoteName}`);
    }

    const url = getRemoteUrl(entry);
    const manifest = url.replace('remoteEntry.js', 'mf-manifest.json');
    const response = await fetchRemote(manifest);
    const data = await response.json();

    const remoteEntryUrl = new URL(url);
    const remoteEntryBaseUrl = new URL('.', remoteEntryUrl).toString().replace(/\/$/, '');
    assertSafePackageName(data.id);
    assertSafeRemoteEntry(data.metaData.remoteEntry);

    const subPath = data.metaData.remoteEntry.path;
    const assetBaseUrl = subPath ? `${remoteEntryUrl.origin}/${subPath}` : remoteEntryBaseUrl;

    const buildUrl = (baseUrl, file) => {
      return `${baseUrl}/${file}`;
    };

    const remotes = [buildUrl(assetBaseUrl, data.metaData.remoteEntry.name)];
    const exposeManifests = exposedModules.map((exposePath) => {
      const safeExposePath = assertSafeExposePath(exposePath);
      const manifestExpose = data.exposes.find(expose => expose.path === safeExposePath);

      if (!manifestExpose) {
        throw new Error(`Missing manifest expose for ${remoteName}${safeExposePath}`);
      }

      return {
        path: safeExposePath,
        assets: manifestExpose.assets,
      };
    });

    const jsFiles = [
      ...data.shared.flatMap(shared => normalizeAssetList(shared.assets.js).map(file => buildUrl(assetBaseUrl, file))),
      ...exposeManifests.flatMap(expose => normalizeAssetList(expose.assets.js).map(file => buildUrl(assetBaseUrl, file)))
    ];

    const cssFiles = [
      ...data.shared.flatMap(shared => normalizeAssetList(shared.assets.css).map(file => buildUrl(assetBaseUrl, file))),
      ...exposeManifests.flatMap(expose => normalizeAssetList(expose.assets.css).map(file => buildUrl(assetBaseUrl, file)))
    ];

    remotes.push(...jsFiles, ...cssFiles);

    const fakePackagePath = getFakePackagePath(remoteName);
    const fakePackageJsonPath = safeResolve(fakePackagePath, 'package.json');
    const fakePackageIndexPath = safeResolve(fakePackagePath, 'index.js');

    if (!fs.existsSync(fakePackagePath)) {
      fs.mkdirSync(fakePackagePath, { recursive: true });
    }

    const exportsContent = exposedModules.reduce((exportsObj, exposePath) => {
      assertSafeExposePath(exposePath);
      const virtualFileName = toVirtualFileName(exposePath);
      exportsObj[exposePath] = `./${virtualFileName}`;
      const resolvePath = safeResolve(fakePackagePath, virtualFileName);

      harnessData.push(resolvePath);

      fs.writeFileSync(resolvePath, `    
       const container = require('./remoteEntry.js')[${JSON.stringify(remoteName)}];
       const target = {};

       let e;
       const cx = container.get(${JSON.stringify(exposePath)}).then((m) => {
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
      name: remoteName,
      version: '1.0.0',
      exports: exportsContent
    };
    const indexJsContent = `
      module.exports = () => 'Hello from fake package!';
    `;

    fs.writeFileSync(fakePackageJsonPath, JSON.stringify(packageJsonContent, null, 2));
    fs.writeFileSync(fakePackageIndexPath, indexJsContent);

    for (const fileUrl of remotes) {
      const filePath = getSafeAssetFilePath(fakePackagePath, fileUrl);
      const fileResponse = await fetchRemote(fileUrl);
      const fileData = Buffer.from(await fileResponse.arrayBuffer());
      fs.writeFileSync(filePath, fileData);
    }
  }

  if (!fs.existsSync(harnessPath)) {
    fs.mkdirSync(harnessPath, { recursive: true });
  }

  fs.writeFileSync(safeResolve(harnessPath, 'index.js'), `module.exports = Promise.all(${JSON.stringify(harnessData)}.map((p) => require(p).setupTest))`, 'utf-8');
  fs.writeFileSync(safeResolve(harnessPath, 'package.json'), '{"name": "federation-test", "main": "./index.js"}', 'utf-8');
};

module.exports = {
  generateSharedConfig,
  setupFederationTest
};
