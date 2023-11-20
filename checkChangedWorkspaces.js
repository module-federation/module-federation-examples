const { execSync } = require('child_process');
const execOptions = { maxBuffer: Infinity }; // Increase maxBuffer to avoid "stdout maxBuffer length exceeded" error
const path = require('path')
const fs = require('fs')
let allPackages = process.argv[2] ? JSON.parse(process.argv[2]) : null;
let updatedPackages = process.argv[3] ? JSON.parse(process.argv[3]) : null;

if (!allPackages) {
  try {
    allPackages = JSON.parse(execSync('npm run list:all --silent', execOptions));
  } catch (error) {
    console.log(`error: ${error.message}`);
    return;
  }
}

if (!updatedPackages) {
  try {
    updatedPackages = JSON.parse(execSync('npm run list:changed --silent', execOptions));
  } catch (error) {
    console.log(`error: ${error.message}`);
    return;
  }
}

try {
  if (updatedPackages && updatedPackages.includes('cypress')) {
    // TODO filter for "@" added temporary to not to add packages wich are not automated and formated yet.
    let newPackages

    newPackages = updatedPackages.map(package=>{
      if(path.resolve(package.path, '../').endsWith('module-federation-examples')) {
        return package.path
      }
      try {
        return require(path.resolve(package.path, '../package.json'))
      } catch (e) {
        return package
      }
    }).filter(p=>p.name && !p.name.includes('cypress'))
    console.log(JSON.stringify({ container: newPackages.map(x => x.name) }));
  } else {
    let newPackages

    newPackages = updatedPackages.map(package=>{
      if(path.resolve(package.path, '../').endsWith('module-federation-examples')) {
        return package.path
      }
      try {
        return require(path.resolve(package.path, '../package.json'))
      } catch (e) {
        return package
      }
    }).filter(p=>p.name)
    console.log(
      JSON.stringify({
        container: Array.from(new Set(newPackages.map(x => x.name)))
      }),
    );
  }
} catch (e) {
  console.error(e);
}
