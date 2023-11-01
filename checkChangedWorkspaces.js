const { execSync } = require("child_process");
const execOptions = { maxBuffer: Infinity }; // Increase maxBuffer to avoid "stdout maxBuffer length exceeded" error

let allPackages = process.argv[2] ? JSON.parse(process.argv[2]) : null;
let updatedPackages = process.argv[3] ? JSON.parse(process.argv[3]) : null;

if (!allPackages) {
    try {
        allPackages = JSON.parse(execSync("npm run list:all --silent", execOptions));
    } catch (error) {
        console.log(`error: ${error.message}`);
        return;
    }
}

if (!updatedPackages) {
    try {
        updatedPackages = JSON.parse(execSync("npm run list:changed --silent", execOptions));
    } catch (error) {
        console.log(`error: ${error.message}`);
        return;
    }
}

try {
    if (updatedPackages && updatedPackages.includes("cypress")) {
        // TODO filter for "@" added temporary to not to add packages wich are not automated and formated yet.
        const newPackages = allPackages.filter(x => !x.name.includes("_") && !updatedPackages.includes(x) && !x.name.includes("cypress") && !x.name.includes("@"));
        console.log(JSON.stringify({ container: newPackages.map(x => x.name)}));
    } else {
      console.log(JSON.stringify({ container: updatedPackages.filter(x => !x.name.includes("_") && !x.name.includes("@")).map(x => x.name)
        }))
    }
} catch (e) {
    console.error(e);
}
