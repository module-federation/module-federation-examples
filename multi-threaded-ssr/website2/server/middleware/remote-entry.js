module.exports = function createRemoteEntry(modules) {
  const moduleMap = `{${modules
    .map(
      (mod, index) => `
	${JSON.stringify(mod.name)}: () => {
		return __webpack_require__.e(${
      index + 1
    }).then(() => () => __webpack_require__(${index + 1}));
	},`
    )
    .join("\n")}
}`;

  return `
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 276:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var moduleMap = ${moduleMap};
var get = (module) => {
	return (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
};
var override = (override) => {
	Object.assign(__webpack_require__.O, override);
};
var mutateRuntime = (mutate) => {
	mutate(__webpack_require__)
};
// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => get,
	override: () => override,
	mutateRuntime: () => mutateRuntime
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".edge-handler.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/overridables */
/******/ 	(() => {
/******/ 		__webpack_require__.O = {};
/******/ 		var installedModules = {};
/******/ 		var idToNameMapping = {};
/******/ 		// no overridables in initial chunks
/******/ 		var chunkMapping = {};
/******/ 		var fallbackMapping = {
/******/ 		
/******/ 		};
/******/ 		__webpack_require__.f.overridables = (chunkId, promises) => {
/******/ 			if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 				chunkMapping[chunkId].forEach((id) => {
/******/ 					promises.push(__webpack_require__.o(installedModules, id) ? installedModules[id] : installedModules[id] = Promise.resolve((__webpack_require__.O[idToNameMapping[id]] || fallbackMapping[id])()).then((factory) => {
/******/ 						installedModules[id] = 0;
/******/ 						__webpack_modules__[id] = (module) => {
/******/ 							module.exports = factory();
/******/ 						}
/******/ 					}))
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/readFile chunk loading */
/******/ 	(() => {
/******/ 		const Module = require("module");
/******/ 		const path = require("path");
/******/ 		const rfn = Module._resolveFilename;
/******/ 		Module._resolveFilename = function(r, p) {
/******/ 			const w = path.resolve(process.cwd(), r);
/******/ 			if (require.cache[w] || (__webpack_require__.c && __webpack_require__.c[w])) {
/******/ 				return w;
/******/ 			}
/******/ 			const we = w + ".js";
/******/ 			if (require.cache[we] || (__webpack_require__.c && __webpack_require__.c[we])) {
/******/ 				return we;
/******/ 			}
/******/ 			return rfn.apply(this, arguments);
/******/ 		};
/******/ 		// object to store loaded chunks
/******/ 		// "0" means "already loaded", Promise means loading
/******/ 		var installedChunks = {
/******/ 			104: 0
/******/ 		};
/******/ 		// ReadFile + VM.run chunk loading for javascript
/******/ 		__webpack_require__.f.setReadFileVm = function(readFile) {
/******/ 			return function(chunkId, promises) {
/******/ 					var installedChunkData = installedChunks[chunkId];
/******/ 					if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 						// array of [resolve, reject, promise] means "currently loading"
/******/ 						if(installedChunkData) {
/******/ 							promises.push(installedChunkData[2]);
/******/ 						} else {
/******/ 							if(true) { // all chunks have JS
/******/ 								// load the chunk and return promise to it
/******/ 								var promise = new Promise(function(resolve, reject) {
/******/ 									installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 									var filename = "http://localhost:3001/edge/" + __webpack_require__.u(chunkId);
console.log("here>>>>>", filename);
/******/ 									readFile(filename, 'utf-8', function(err, content) {
/******/ 										if(err) return reject(err);
/******/ 										var chunk = {};
/******/ 										require('vm').runInThisContext('(function(exports, require, __dirname, __filename) {' + content + '\\n})', filename)(chunk, require, require('path').dirname(filename), filename);
/******/ 										var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 										for(var moduleId in moreModules) {
/******/ 											if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 												__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 											}
/******/ 										}
/******/ 										if(runtime) runtime(__webpack_require__);
/******/ 										var callbacks = [];
/******/ 										for(var i = 0; i < chunkIds.length; i++) {
/******/ 											if(installedChunks[chunkIds[i]])
/******/ 												callbacks = callbacks.concat(installedChunks[chunkIds[i]][0]);
/******/ 											installedChunks[chunkIds[i]] = 0;
/******/ 										}
/******/ 										for(i = 0; i < callbacks.length; i++)
/******/ 											callbacks[i]();
/******/ 									});
/******/ 								});
/******/ 								promises.push(installedChunkData[2] = promise);
/******/ 							} else installedChunks[chunkId] = 0;
/******/ 						}
/******/ 					}
/******/ 			};
/******/ 		}
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/readFile chunk loading */
/******/ 	(() => {
/******/ 		// object to store loaded chunks
/******/ 		// "0" means "already loaded", Promise means loading
/******/ 		var installedChunks = {
/******/ 			104: 0
/******/ 		};
/******/ 		
/******/ 		// ReadFile + VM.run chunk loading for javascript
/******/ 		__webpack_require__.f.readFileVm = function(chunkId, promises) {
/******/ 		
/******/ 			var installedChunkData = installedChunks[chunkId];
/******/ 			if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 				// array of [resolve, reject, promise] means "currently loading"
/******/ 				if(installedChunkData) {
/******/ 					promises.push(installedChunkData[2]);
/******/ 				} else {
/******/ 					if(true) { // all chunks have JS
/******/ 						// load the chunk and return promise to it
/******/ 						var promise = new Promise(function(resolve, reject) {
/******/ 							installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 							var filename = require('path').join(__dirname, __webpack_require__.u(chunkId));
/******/ 							require('fs').readFile(filename, 'utf-8', function(err, content) {
/******/ 								if(err) return reject(err);
/******/ 								var chunk = {};
/******/ 								require('vm').runInThisContext('(function(exports, require, __dirname, __filename) {' + content + '\\n})', filename)(chunk, require, require('path').dirname(filename), filename);
/******/ 								var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 								for(var moduleId in moreModules) {
/******/ 									if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 										__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 									}
/******/ 								}
/******/ 								if(runtime) runtime(__webpack_require__);
/******/ 								var callbacks = [];
/******/ 								for(var i = 0; i < chunkIds.length; i++) {
/******/ 									if(installedChunks[chunkIds[i]])
/******/ 										callbacks = callbacks.concat(installedChunks[chunkIds[i]][0]);
/******/ 									installedChunks[chunkIds[i]] = 0;
/******/ 								}
/******/ 								for(i = 0; i < callbacks.length; i++)
/******/ 									callbacks[i]();
/******/ 							});
/******/ 						});
/******/ 						promises.push(installedChunkData[2] = promise);
/******/ 					} else installedChunks[chunkId] = 0;
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module factories are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(276);
/******/ })()
;
`;
};
