// sometimes you need to access webpack internals outside of webpack itself, like in express server
const __webpack_require__ = require('./runtime-container/dist/runtime.js')
// this gives you webpack require, you can use my utils which depend on webpack_require.l
const runtimeApiReExport = require('./runtime-container/dist/main.js')
// this just re-exports the injectScript runtime api which uses webpack_require.l, you can use it directly outside of webpack
console.log(__webpack_require__);
console.log(runtimeApiReExport);
