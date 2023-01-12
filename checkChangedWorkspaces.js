const { exec } = require("child_process");
exec("npx lerna ls --since=origin/master --json", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    try {
      const jsonArray = JSON.parse(stdout);
      console.log(JSON.stringify({ container: jsonArray.map(x => x.name)}))
    } catch (e) {
      console.error(e)
    }
});
