const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

module.exports = class AdaptMedusaPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('AdaptMedusaPlugin', compilation => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: 'AdaptMedusaPlugin',
          stage: compilation.constructor.PROCESS_ASSETS_STAGE_ANALYSE,
        },
        async () => {
          fs.writeFileSync(
            path.resolve(__dirname, 'node_modules/.modern-js/package.json'),
            JSON.stringify(pkg, null, 2),
          );
        },
      );
    });
  }
}
