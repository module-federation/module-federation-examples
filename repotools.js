const fs = require('fs');
const path = require('path');
const semver = require('semver');

// Packages that should always be updated to latest regardless of scope
const ALWAYS_UPDATE_SCOPES = ['@rspack/', '@rsbuild/'];

// Packages published to pkg.pr.new for module-federation/core (from PR checks)
// Only these get canary URLs; others (node, nextjs-mf, modern-js, vite, etc.) stay on npm.
const PKG_PR_NEW_PACKAGES = new Set([
  '@module-federation/devtools',
  '@module-federation/cli',
  '@module-federation/data-prefetch',
  '@module-federation/dts-plugin',
  '@module-federation/enhanced',
  '@module-federation/error-codes',
  '@module-federation/managers',
  '@module-federation/manifest',
  '@module-federation/metro',
  '@module-federation/metro-plugin-rnc-cli',
  '@module-federation/metro-plugin-rnef',
  '@module-federation/modern-js-v3',
  '@module-federation/retry-plugin',
  '@module-federation/rsbuild-plugin',
  '@module-federation/rspack',
  '@module-federation/rspress-plugin',
  '@module-federation/runtime',
  '@module-federation/runtime-core',
  '@module-federation/runtime-tools',
  '@module-federation/sdk',
  '@module-federation/third-party-dts-extractor',
  '@module-federation/treeshake-frontend',
  '@module-federation/treeshake-server',
  '@module-federation/webpack-bundler-runtime',
  '@module-federation/bridge-react',
  '@module-federation/bridge-react-webpack-plugin',
  '@module-federation/bridge-shared',
  '@module-federation/bridge-vue3',
  '@module-federation/inject-external-runtime-core-plugin',
]);

const PKG_PR_NEW_BASE = 'https://pkg.pr.new/module-federation/core';

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
    packageName: '@module-federation/modern-js',
    shouldUpdate: true,
    versionToCheck: '3.0.13',
    targetVersion: 'latest',
  },
  {
    packageName: '@module-federation/dts-plugin',
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
    packageName: '@playwright/test',
    shouldUpdate: true,
    versionToCheck: '999.0.0',
    targetVersion: 'latest',
  },
  {
    packageName: 'playwright',
    shouldUpdate: true,
    versionToCheck: '999.0.0',
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

  // Check packages from CONFIG
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

  // Check packages from ALWAYS_UPDATE_SCOPES
  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  for (const [packageName, currentVersion] of Object.entries(allDependencies)) {
    if (ALWAYS_UPDATE_SCOPES.some(scope => packageName.startsWith(scope))) {
      const latestVersion = await getLatestVersion(packageName, 'latest');
      if (latestVersion && currentVersion !== latestVersion) {
        updateDependencies(packageJson, packageName, latestVersion);
        needsUpdate = true;
        trackPackage(nestedDir, packageName, results);
        console.log(`Updating ${packageName} from ${currentVersion} to ${latestVersion}`);
      }
    }
  }

  if (needsUpdate) {
    fs.writeFileSync(
      path.join(nestedDir, 'package.json'),
      `${JSON.stringify(packageJson, null, 2)}\n`,
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

function walkPackageJsonFiles(dir, list, skipDirs = new Set(['node_modules', '.pnpm', '.git'])) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (skipDirs.has(e.name)) continue;
      if (e.isDirectory()) {
        walkPackageJsonFiles(full, list, skipDirs);
      } else if (e.name === 'package.json') {
        list.push(full);
      }
    }
  } catch (err) {
    // ignore
  }
}

function applyCanary(commit) {
  if (!commit || commit.length < 7) {
    console.error('Usage: node repotools.js canary <commit>');
    console.error('Example: node repotools.js canary d8962b5');
    process.exit(1);
  }
  const list = [];
  walkPackageJsonFiles('.', list);
  let changed = 0;
  for (const p of list) {
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    let dirty = false;
    for (const key of ['dependencies', 'devDependencies']) {
      if (!j[key]) continue;
      for (const [name, ver] of Object.entries(j[key])) {
        if (PKG_PR_NEW_PACKAGES.has(name) && typeof ver === 'string') {
          const canaryUrl = `${PKG_PR_NEW_BASE}/${name}@${commit}`;
          if (j[key][name] !== canaryUrl) {
            j[key][name] = canaryUrl;
            dirty = true;
          }
        }
      }
    }
    if (dirty) {
      fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
      changed++;
    }
  }
  console.log(`Canary: updated ${changed} package.json files to commit ${commit}`);
  return changed;
}

// Running the modified function
(async () => {
  const cmd = process.argv[2];
  const arg = process.argv[3] || process.env.CANARY_COMMIT;

  if (cmd === 'canary') {
    applyCanary(arg);
    return;
  }

  const results = await getPackages('./'); // Start from the current directory
  console.log('Package Updates:', results);
})();
