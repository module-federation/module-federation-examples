const { writeFileSync, readFileSync } = require("fs");

const fileName = "vite.config.ts";
const delay = 2000;
setTimeout(
  () => writeFileSync(fileName, readFileSync(fileName, "utf-8")),
  delay
);
