const { exec } = require("child_process");
const execOptions = { maxBuffer: Infinity }; // Increase maxBuffer to avoid "stdout maxBuffer length exceeded" error
exec("npm run list:all --silent", execOptions, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    try {

        const allPackages = JSON.parse(stdout);
        exec("npm run list:changed --silent", execOptions, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }


            try {
                const updatedPackages = JSON.parse(stdout);
                if (stdout.includes("cypress")) {
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
        });
    } catch (e) {
        console.error(e);
    }
});
