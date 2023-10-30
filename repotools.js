const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function getPackages(dir, since) {
  let packages = [];
  const directories = getDirectories(dir);
  directories.forEach(directory => {
    if (directory !== 'node_modules' && !directory.startsWith('.')) {
      const nestedDir = path.join(dir, directory);
      const packageJsonPath = path.join(nestedDir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (since) {
          const result = execSync(`git diff --name-only ${since}..HEAD -- ${nestedDir}`, { encoding: 'utf8' });

          if (result) {
            packages.push({
              name: packageJson.name,
              version: packageJson.version,
              private: packageJson.private || false,
              location: nestedDir
            });
          }
        } else {
          packages.push({
            name: packageJson.name,
            version: packageJson.version,
            private: packageJson.private || false,
            location: nestedDir
          });
        }
      }
      packages = packages.concat(getPackages(nestedDir, since));
    }
  });
  return packages;
}

const since = process.argv[2] === '--since' ? process.argv[3] : null;
// const packages = getPackages('./', since); // start from current directory
// console.log(JSON.stringify(packages, null, 2));
module.exports = getPackages
