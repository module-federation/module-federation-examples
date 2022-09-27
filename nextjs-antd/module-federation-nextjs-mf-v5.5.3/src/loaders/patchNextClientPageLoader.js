"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * This webpack loader patches next/dist/client/page-loader.js file.
 * Also it requires `include-defaults.js` with required shared libs
 *
 */
function patchNextClientPageLoader(content) {
    if (content.includes('MFClient')) {
        // If MFClient already applied then skip patch
        return content;
    }
    // avoid absolute paths as they break hashing when the root for the project is moved
    // @see https://webpack.js.org/contribute/writing-a-loader/#absolute-paths
    const pathIncludeDefaults = path_1.default.relative(this.context, path_1.default.resolve(__dirname, '../include-defaults.js'));
    const pathMFClient = path_1.default.relative(this.context, path_1.default.resolve(__dirname, '../../client/MFClient.js'));
    const patchedContent = content.replace('exports.default = PageLoader;', `
      require(${JSON.stringify(pathIncludeDefaults)});
      const MFClient = require(${JSON.stringify(pathMFClient)}).MFClient;

      class PageLoaderExtended extends PageLoader {
        constructor(buildId, assetPrefix) {
          super(buildId, assetPrefix);
          global.mf_client = new MFClient(this, { mode: process.env.NODE_ENV });
        }

        _getPageListOriginal() {
          return super.getPageList();
        }

        getPageList() {
          return global.mf_client.getPageList();
        }
      }
      exports.default = PageLoaderExtended;
    `);
    return patchedContent;
}
exports.default = patchNextClientPageLoader;
// module.exports = patchNextClientPageLoader;
//# sourceMappingURL=patchNextClientPageLoader.js.map