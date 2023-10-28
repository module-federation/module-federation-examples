const getPackages = require("./repotools");
const allPackages = getPackages('./', null);
const packageJson = require('./package.json');
const fs = require('fs');
console.log(allPackages.map(package => package.location))
packageJson.workspaces = allPackages.map(package => package.location);
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
