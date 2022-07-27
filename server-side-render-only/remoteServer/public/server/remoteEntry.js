/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function () {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ 'webpack/container/entry/website2':
      /*!***********************!*\
  !*** container entry ***!
  \***********************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          'var moduleMap = {\n\t"./SharedComponent": function() {\n\t\treturn Promise.all([__webpack_require__.e("vendors-node_modules_react_index_js"), __webpack_require__.e("remoteServer_SharedComponent_js")]).then(function() { return function() { return (__webpack_require__(/*! ./remoteServer/SharedComponent */ "./remoteServer/SharedComponent.js")); }; });\n\t}\n};\nvar get = function(module, getScope) {\n\t__webpack_require__.R = getScope;\n\tgetScope = (\n\t\t__webpack_require__.o(moduleMap, module)\n\t\t\t? moduleMap[module]()\n\t\t\t: Promise.resolve().then(function() {\n\t\t\t\tthrow new Error(\'Module "\' + module + \'" does not exist in container.\');\n\t\t\t})\n\t);\n\t__webpack_require__.R = undefined;\n\treturn getScope;\n};\nvar init = function(shareScope, initScope) {\n\tif (!__webpack_require__.S) return;\n\tvar name = "default"\n\tvar oldScope = __webpack_require__.S[name];\n\tif(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");\n\t__webpack_require__.S[name] = shareScope;\n\treturn __webpack_require__.I(name, initScope);\n};\n\n// This exports getters to disallow modifications\n__webpack_require__.d(exports, {\n\tget: function() { return get; },\n\tinit: function() { return init; }\n});\n\n//# sourceURL=webpack://module-federation-ssr/container_entry?',
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__;
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ !(function () {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = function (exports, definition) {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/ensure chunk */
  /******/ !(function () {
    /******/ __webpack_require__.f = {};
    /******/ // This file contains only the entry chunk.
    /******/ // The chunk loading function for additional chunks
    /******/ __webpack_require__.e = function (chunkId) {
      /******/ return Promise.all(
        Object.keys(__webpack_require__.f).reduce(function (promises, key) {
          /******/ __webpack_require__.f[key](chunkId, promises);
          /******/ return promises;
          /******/
        }, []),
      );
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/get javascript chunk filename */
  /******/ !(function () {
    /******/ // This function allow to reference async chunks
    /******/ __webpack_require__.u = function (chunkId) {
      /******/ // return url for filenames based on template
      /******/ return '' + chunkId + '.server.js';
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/global */
  /******/ !(function () {
    /******/ __webpack_require__.g = (function () {
      /******/ if (typeof globalThis === 'object') return globalThis;
      /******/ try {
        /******/ return this || new Function('return this')();
        /******/
      } catch (e) {
        /******/ if (typeof window === 'object') return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ !(function () {
    /******/ __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ !(function () {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function (exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/readFile chunk loading */
  /******/ !(function () {
    /******/ // no baseURI
    /******/
    /******/ // object to store loaded chunks
    /******/ // "0" means "already loaded", Promise means loading
    /******/ var installedChunks = {
      /******/ website2: 0,
      /******/
    };
    /******/
    /******/ // no on chunks loaded
    /******/
    /******/ var installChunk = function (chunk) {
      /******/ var moreModules = chunk.modules,
        chunkIds = chunk.ids,
        runtime = chunk.runtime;
      /******/ for (var moduleId in moreModules) {
        /******/ if (__webpack_require__.o(moreModules, moduleId)) {
          /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
          /******/
        }
        /******/
      }
      /******/ if (runtime) runtime(__webpack_require__);
      /******/ for (var i = 0; i < chunkIds.length; i++) {
        /******/ if (installedChunks[chunkIds[i]]) {
          /******/ installedChunks[chunkIds[i]][0]();
          /******/
        }
        /******/ installedChunks[chunkIds[i]] = 0;
        /******/
      }
      /******/
      /******/
    };
    /******/
    /******/ // ReadFile + VM.run chunk loading for javascript
    /******/ __webpack_require__.f.readFileVm = function (chunkId, promises) {
      /******/
      /******/ var installedChunkData = installedChunks[chunkId];
      /******/ if (installedChunkData !== 0) {
        // 0 means "already installed".
        /******/ // array of [resolve, reject, promise] means "currently loading"
        /******/ if (installedChunkData) {
          /******/ promises.push(installedChunkData[2]);
          /******/
        } else {
          /******/ if (true) {
            // all chunks have JS
            /******/ // load the chunk and return promise to it
            /******/ var promise = new Promise(async function (resolve, reject) {
              /******/ installedChunkData = installedChunks[chunkId] = [resolve, reject];
              /******/ var filename = require('path').join(
                __dirname,
                '' + __webpack_require__.u(chunkId),
              );
              /******/ var fs = require('fs');
              /******/ if (fs.existsSync(filename)) {
                /******/ console.log(filename, 'exists locally');
                /******/ fs.readFile(filename, 'utf-8', function (err, content) {
                  /******/ if (err) return reject(err);
                  /******/ var chunk = {};
                  /******/ require('vm').runInThisContext(
                    '(function(exports, require, __dirname, __filename) {' + content + '\n})',
                    filename,
                  )(chunk, require, require('path').dirname(filename), filename);
                  /******/ installChunk(chunk);
                  /******/
                });
                /******/
              } else {
                /******/
                /******/ function loadScript() {
                  /******/ var url;
                  /******/ var cb = arguments[arguments.length - 1];
                  /******/ if (typeof cb !== 'function') {
                    /******/ throw new Error('last argument should be a function');
                    /******/
                  }
                  /******/ if (arguments.length === 2) {
                    /******/ url = arguments[0];
                    /******/
                  } else if (arguments.length === 3) {
                    /******/ url = new URL(arguments[1], arguments[0]).toString();
                    /******/
                  } else {
                    /******/ throw new Error('invalid number of arguments');
                    /******/
                  }
                  /******/ if (global.webpackChunkLoad) {
                    /******/ global
                      .webpackChunkLoad(url)
                      .then(function (resp) {
                        /******/ return resp.text();
                        /******/
                      })
                      .then(function (rawData) {
                        /******/ cb(null, rawData);
                        /******/
                      })
                      .catch(function (err) {
                        /******/ console.error('Federated Chunk load failed', error);
                        /******/ return cb(error);
                        /******/
                      });
                    /******/
                  } else {
                    /******/ //TODO https support
                    /******/ let request = (
                      url.startsWith('https') ? require('https') : require('http')
                    ).get(url, function (resp) {
                      /******/ if (resp.statusCode === 200) {
                        /******/ let rawData = '';
                        /******/ resp.setEncoding('utf8');
                        /******/ resp.on('data', chunk => {
                          /******/ rawData += chunk;
                          /******/
                        });
                        /******/ resp.on('end', () => {
                          /******/ cb(null, rawData);
                          /******/
                        });
                        /******/
                      } else {
                        /******/ cb(resp);
                        /******/
                      }
                      /******/
                    });
                    /******/ request.on('error', error => {
                      /******/ console.error('Federated Chunk load failed', error);
                      /******/ return cb(error);
                      /******/
                    });
                    /******/
                  }
                  /******/
                }
                /******/ console.log('needs to load remote script');
                /******/ console.log('before remote var creation');
                /******/ console.log('before remote var creation', undefined);
                /******/ var remotes = undefined;
                /******/ console.log('remotes in chunk load', remotes);
                /******/ console.log('global.REMOTE_CONFIG', global.REMOTE_CONFIG);
                /******/ if (global.REMOTE_CONFIG && !global.REMOTE_CONFIG['website2']) {
                  /******/ if (global.loadedRemotes) {
                    /******/ for (const property in global.loadedRemotes) {
                      /******/ global.REMOTE_CONFIG[property] = global.loadedRemotes[property].path;
                      /******/
                    }
                    /******/
                  }
                  /******/ Object.assign(global.REMOTE_CONFIG, remotes);
                  /******/
                }
                /******/ var requestedRemote = global.REMOTE_CONFIG['website2'];
                /******/ if (typeof requestedRemote === 'function') {
                  /******/ requestedRemote = await requestedRemote();
                  /******/
                }
                /******/ console.log('requestedRemote', requestedRemote);
                /******/ var scriptUrl = new URL(requestedRemote.split('@')[1]);
                /******/ var chunkName = __webpack_require__.u(chunkId);
                /******/ console.log('remotes global', global.REMOTE_CONFIG);
                /******/ console.log('chunkname to request', chunkName);
                /******/ var fileToReplace = require('path').basename(scriptUrl.pathname);
                /******/ scriptUrl.pathname = scriptUrl.pathname.replace(fileToReplace, chunkName);
                /******/ console.log('will load remote chunk', scriptUrl.toString());
                /******/ loadScript(scriptUrl.toString(), function (err, content) {
                  /******/ if (err) {
                    console.error(
                      'error loading remote chunk',
                      scriptUrl.toString(),
                      'got',
                      content,
                    );
                    return reject(err);
                  }
                  /******/ var chunk = {};
                  /******/ require('vm').runInThisContext(
                    '(function(exports, require, __dirname, __filename) {' + content + '\n})',
                    filename,
                  )(chunk, require, require('path').dirname(filename), filename);
                  /******/ installChunk(chunk);
                  /******/
                });
                /******/
              }
              /******/
            });
            /******/ promises.push((installedChunkData[2] = promise));
            /******/
          } else installedChunks[chunkId] = 0;
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
    /******/ // no external install chunk
    /******/
    /******/ // no HMR
    /******/
    /******/ // no HMR manifest
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__('webpack/container/entry/website2');
  /******/ var __webpack_export_target__ = exports;
  /******/ for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  /******/ if (__webpack_exports__.__esModule)
    Object.defineProperty(__webpack_export_target__, '__esModule', { value: true });
  /******/
  /******/
})();
