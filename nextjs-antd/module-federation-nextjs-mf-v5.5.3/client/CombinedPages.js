"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedPages = void 0;
const helpers_1 = require("./helpers");
/**
 * Class which provides combined sorted list of local and remote routes.
 */
class CombinedPages {
    constructor(localPagesGetter, remotePages) {
        this.localPagesGetter = localPagesGetter;
        this.remotePages = remotePages;
    }
    /**
     * Check that provided route belongs to host application
     */
    async isLocalRoute(route) {
        const localPages = await this.localPagesGetter();
        return localPages.includes(route);
    }
    /**
     * Return sorted list of local & remotes routes.
     * This method is used in patchNextClientPageLoader
     * for patching nextjs' getPageList method.
     */
    async getPageList() {
        const localPages = await this.localPagesGetter();
        const remotePages = this.remotePages.getPageList();
        if (localPages !== this.localPagesCache ||
            remotePages !== this.remotePagesCache) {
            this.localPagesCache = localPages;
            this.remotePagesCache = remotePages;
            this.sortedPageCache = (0, helpers_1.sortNextPages)([...localPages, ...remotePages]);
        }
        return this.sortedPageCache;
    }
}
exports.CombinedPages = CombinedPages;
//# sourceMappingURL=CombinedPages.js.map