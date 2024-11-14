const fs = require('fs');
const path = require('path');
const semver = require('semver');

const CONFIG = [
  {
    packageName: '@module-federation/node',
    shouldUpdate: true,
    versionToCheck: '3.0.13',
    targetVersion: 'latest',
  },
  {
    packageName: '@module-federation/sdk',
    shouldUpdate: true,
    versionToCheck: '3.0.13',
    targetVersion: 'latest',
  },
  {
    packageName: '@module-federation/vite',
    shouldUpdate: true,
    versionToCheck: '2.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: '@module-federation/enhanced',
    shouldUpdate: true,
    versionToCheck: '2.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: '@module-federation/nextjs-mf',
    shouldUpdate: true,
    versionToCheck: '9.2.2',
    targetVersion: 'latest',
  },
  {
    packageName: '@module-federation/runtime',
    shouldUpdate: true,
    versionToCheck: '9.2.2',
    targetVersion: 'latest',
  },
  {
    packageName: '@rspack/core',
    shouldUpdate: true,
    versionToCheck: '3.0.13',
    targetVersion: 'latest',
  },
  {
    packageName: '@rspack/cli',
    shouldUpdate: true,
    versionToCheck: '3.0.13',
    targetVersion: 'latest',
  },
  {
    packageName: '@rspack/plugin-react-refresh',
    shouldUpdate: true,
    versionToCheck: '3.0.13',
    targetVersion: 'latest',
  },
  {
    packageName: '@rspack/dev-server',
    shouldUpdate: true,
    versionToCheck: '13.0.13',
    targetVersion: 'latest',
  },
  {
    packageName: '@rsbuild/core',
    shouldUpdate: true, // Assumes no targetVersion needed
    versionToCheck: '2.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: '@rsbuild/plugin-vue',
    shouldUpdate: true, // Assumes no targetVersion needed
    versionToCheck: '100.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: '@rsbuild/plugin-react',
    shouldUpdate: true, // Assumes no targetVersion needed
    versionToCheck: '100.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: 'webpack',
    shouldUpdate: true, // Assumes no targetVersion needed
    versionToCheck: '6.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: 'mini-css-extract-plugin',
    shouldUpdate: true, // Assumes no targetVersion needed
    versionToCheck: '9.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: '@module-federation/utilities',
    shouldUpdate: false, // Assumes no targetVersion needed
  },
  {
    packageName: '@rspack/core',
    shouldUpdate: true,
    versionToCheck: '9.2.2',
    targetVersion: 'latest',
  },
  {
    packageName: '@rspack/cli',
    shouldUpdate: true,
    versionToCheck: '9.2.2',
    targetVersion: 'latest',
  },
  {
    packageName: '@rspack/dev-server',
    shouldUpdate: true,
    versionToCheck: '9.2.2',
    targetVersion: 'latest',
  },
  {
    packageName: '@rspack/plugin-react-refresh',
    shouldUpdate: true,
    versionToCheck: '9.2.2',
    targetVersion: 'latest',
  },
];

const versionCache = {};

async function getLatestVersion(packageName, targetVersion) {
  if (versionCache[packageName]) {
    return versionCache[packageName];
  }

  const url = `https://registry.npmjs.org/${packageName}/${targetVersion}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    versionCache[packageName] = data.version;
    return data.version;
  } catch (error) {
    console.error(`Failed to fetch latest version for ${packageName}: ${error}`);
    return null;
  }
}

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => {
    try {
      return fs.statSync(path.join(srcPath, file)).isDirectory();
    } catch (err) {
      return false; // Ignore missing files/directories
    }
  });
}

function readPackageJson(packageJsonPath) {
  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch (e) {
    console.error(`Error reading or parsing package.json at ${packageJsonPath}: ${e}`);
    return null;
  }
}

async function checkAndUpdatePackages(nestedDir, packageJson, results) {
  let needsUpdate = false;

  for (const config of CONFIG) {
    const { packageName, shouldUpdate, versionToCheck } = config;
    let { targetVersion } = config;
    const currentVersion =
      packageJson.dependencies?.[packageName] || packageJson.devDependencies?.[packageName];

    if (targetVersion === 'latest') {
      targetVersion = await getLatestVersion(packageName, targetVersion);
      if (!targetVersion) continue; // Skip if failed to fetch latest version
    }
    if (targetVersion === 'next') {
      targetVersion = await getLatestVersion(packageName, targetVersion);
      if (!targetVersion) continue; // Skip if failed to fetch latest version
      updateDependencies(packageJson, packageName, targetVersion);
    }

    if (currentVersion && semver.satisfies(semver.coerce(currentVersion), `<${versionToCheck}`)) {
      if (shouldUpdate && targetVersion) {
        updateDependencies(packageJson, packageName, targetVersion);
      }
      if (shouldUpdate) {
        needsUpdate = true;
      }
      trackPackage(nestedDir, packageName, results);
    }
  }

  if (needsUpdate) {
    fs.writeFileSync(
      path.join(nestedDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
      'utf8',
    );
    console.log(`Updated dependencies in ${nestedDir}`);
  }
}

function updateDependencies(packageJson, dependencyKey, newVersion) {
  if (packageJson.dependencies?.[dependencyKey]) {
    packageJson.dependencies[dependencyKey] = `${newVersion}`;
  } else if (packageJson.devDependencies?.[dependencyKey]) {
    packageJson.devDependencies[dependencyKey] = `${newVersion}`;
  }
}

function trackPackage(nestedDir, packageName, results) {
  if (!results[packageName]) {
    results[packageName] = [];
  }
  results[packageName].push(nestedDir);
}

async function traverseDirectories(dir, results) {
  const directories = getDirectories(dir);
  for (const directory of directories) {
    if (directory.startsWith('.') || directory === 'node_modules') {
      continue;
    }
    const nestedDir = path.join(dir, directory);
    const packageJsonPath = path.join(nestedDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = readPackageJson(packageJsonPath);
      if (packageJson && (packageJson.dependencies || packageJson.devDependencies)) {
        await checkAndUpdatePackages(nestedDir, packageJson, results);
      }
    }
    await traverseDirectories(nestedDir, results); // Recursively traverse directories
  }
}

async function getPackages(dir) {
  const results = {};
  await traverseDirectories(dir, results);
  return results;
}

// Running the modified function
(async () => {
  const results = await getPackages('./'); // Start from the current directory
  console.log('Package Updates:', results);
})();
