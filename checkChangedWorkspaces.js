const { exec } = require("child_process");

exec("npx lerna ls --all --since=origin/master --json", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    try {
      const jsonArray = JSON.parse(stdout);
      console.log(JSON.stringify({ container: jsonArray.filter(x => !x.name.includes("_")).map(x => x.name)}))
    } catch (e) {
      console.error(e)
    }
});
