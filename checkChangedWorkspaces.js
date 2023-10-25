const getPackages = require('./repotools.js');
const changedPackages = getPackages('./', 'origin/master');
const allPackages = getPackages('./', null);

try {
    const updatedPackages = changedPackages;
    const newPackages = changedPackages

    console.log(JSON.stringify({ container: newPackages.map(package => package.name)}));
} catch (e) {
    console.error(e);
}
