const fs = require('fs');
const path = require('path');
const semver = require('semver');

const CONFIG = [
  {
    packageName: '@module-federation/node',
    shouldUpdate: true,
    versionToCheck: '2.0.0',
    targetVersion: '2.0.11'
  },
  {
    packageName: '@module-federation/enhanced',
    shouldUpdate: true, // Assumes no targetVersion needed
    versionToCheck: "0.0.13",
    targetVersion: "0.0.13",
  },
  {
    packageName: '@module-federation/utilities',
    shouldUpdate: false // Assumes no targetVersion needed
  },
  {
    packageName: '@module-federation/nextjs-mf',
    shouldUpdate: true,
    versionToCheck: '8.2.0',
    targetVersion: '8.2.0'
  }
];

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

function checkAndUpdatePackages(nestedDir, packageJson, results) {
  let needsUpdate = false;

  CONFIG.forEach(config => {
    const { packageName, shouldUpdate, versionToCheck, targetVersion } = config;
    const currentVersion = packageJson.dependencies?.[packageName] || packageJson.devDependencies?.[packageName];

    // Check if the package needs an update based on versionToCheck
    if (currentVersion && semver.satisfies(semver.coerce(currentVersion), `<${versionToCheck}`)) {
      if (shouldUpdate && targetVersion) {
        updateDependencies(packageJson, packageName, targetVersion);
        needsUpdate = true;
      }
      // Track packages based on condition
      trackPackage(nestedDir, packageName, results);
    }
  });

  if (needsUpdate) {
    fs.writeFileSync(path.join(nestedDir, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');
    console.log(`Updated dependencies in ${nestedDir}`);
  }
}

function updateDependencies(packageJson, dependencyKey, newVersion) {
  if (packageJson.dependencies?.[dependencyKey]) {
    packageJson.dependencies[dependencyKey] = `^${newVersion}`;
  } else if (packageJson.devDependencies?.[dependencyKey]) {
    packageJson.devDependencies[dependencyKey] = `^${newVersion}`;
  }
}

function trackPackage(nestedDir, packageName, results) {
  // Logic to track different conditions based on packageName
  if (!results[packageName]) {
    results[packageName] = [];
  }
  results[packageName].push(nestedDir);
}

function traverseDirectories(dir, results) {
  const directories = getDirectories(dir);
  directories.forEach(directory => {
    if (directory.startsWith('angular') || directory.startsWith('.') || directory === 'node_modules') {
      return;
    }
    const nestedDir = path.join(dir, directory);
    const packageJsonPath = path.join(nestedDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = readPackageJson(packageJsonPath);
      if (packageJson && (packageJson.dependencies || packageJson.devDependencies)) {
        checkAndUpdatePackages(nestedDir, packageJson, results);
      }
    }
    traverseDirectories(nestedDir, results); // Recursively traverse directories
  });
}

function getPackages(dir) {
  const results = {};
  traverseDirectories(dir, results);
  return results;
}

// Running the modified function
const results = getPackages('./'); // Start from the current directory
console.log("Package Updates:", results);
