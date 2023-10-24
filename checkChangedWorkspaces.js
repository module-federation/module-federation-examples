const getPackages = require('./repotools.js');
const stdout = JSON.stringify(getPackages('./', 'origin/master'))
const all = getPackages('./', null)
            try {
              // remove last line of stdout
                const updatedPackages = JSON.parse(stdout);
                // if (stdout.includes("cypress")) {
                    // TODO filter for "@" added temporary to not to add packages wich are not automated and formated yet.

                    const newPackages = all.filter(x => !x.name?.includes("_") && !updatedPackages?.includes(x) && !x.name?.includes("cypress") && !x.name?.includes("@"));
                    console.log(JSON.stringify({ container: newPackages.map(x => x.name)}));
                // } else {
                //   console.log(JSON.stringify({ container: updatedPackages.filter(x => !x.name.includes("_") && !x.name.includes("@")).map(x => x.name)
                //     }))
                // }
            } catch (e) {
                console.error(e);
            }

