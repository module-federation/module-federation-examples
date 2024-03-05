const fs = require('fs');
const path = require('path');
const semver = require('semver');

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => {
    try {
      return fs.statSync(path.join(srcPath, file)).isDirectory();
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Ignore missing files/directories and continue
        return false;
      } else {
        // Re-throw other errors
        throw err;
      }
    }
  });
}

function getPackages(dir, outdatedApps = [], packagesWithoutEnhanced = [], packagesWithUtilities = []) {
  const directories = getDirectories(dir);
  directories.forEach(directory => {
    // Skip directories that start with 'angular'
    if (directory.startsWith('angular') || directory.startsWith('.') || directory === 'node_modules') {
      return;
    }

    const nestedDir = path.join(dir, directory);
    const packageJsonPath = path.join(nestedDir, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      let packageJson;
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      } catch (e) {
        console.error(`Error reading or parsing package.json at ${packageJsonPath}: ${e}`);
        return; // Skip this package on error
      }

      // Skip if no dependencies or devDependencies
      if (!packageJson.dependencies && !packageJson.devDependencies) {
        return;
      }

      // Check for @module-federation/node and its version
      const mfNodeVersion = packageJson.dependencies?.['@module-federation/node'] || packageJson.devDependencies?.['@module-federation/node'];
      if (mfNodeVersion && !semver.satisfies(semver.coerce(mfNodeVersion), '>=2.0.0')) {
        outdatedApps.push(nestedDir);
      }

      // Check if @module-federation/enhanced is missing
      if (!packageJson.dependencies?.['@module-federation/enhanced'] && !packageJson.devDependencies?.['@module-federation/enhanced']) {
        packagesWithoutEnhanced.push(nestedDir);
      }

      // Check if @module-federation/utilities is present
      if (packageJson.dependencies?.['@module-federation/utilities'] || packageJson.devDependencies?.['@module-federation/utilities']) {
        packagesWithUtilities.push(nestedDir);
      }
    }
    // Recursively call getPackages
    getPackages(nestedDir, outdatedApps, packagesWithoutEnhanced, packagesWithUtilities);
  });
  return { outdatedApps, packagesWithoutEnhanced, packagesWithUtilities };
}

// Running the modified function
const { outdatedApps, packagesWithoutEnhanced, packagesWithUtilities } = getPackages('./'); // start from the current directory
console.log("Outdated Apps:", outdatedApps);
console.log("Packages without Enhanced:", packagesWithoutEnhanced);
console.log("Packages with Utilities:", packagesWithUtilities);
