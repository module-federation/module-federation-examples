const path = require("path");
const fs = require("fs");
const VirtualModulesPlugin = require("webpack-virtual-modules");

class VirtualBootstrapPlugin extends VirtualModulesPlugin {
  constructor(modules = {}) {
    super(modules);
  }

  apply(compiler) {
    const entry = compiler.options.entry.main.import[0];
    const resolvedEntryFile = require.resolve(entry);
    const originalEntrySource = fs.readFileSync(resolvedEntryFile, {
      encoding: "utf8",
    });
    const onlyPath = path.dirname(resolvedEntryFile);

    Object.assign(this._staticModules, {
      [entry]: 'import("./bootstrap.js")',
      [path.join(onlyPath, "bootstrap.js")]: originalEntrySource,
    });
    super.apply(compiler);
  }
}

module.exports = VirtualBootstrapPlugin;
