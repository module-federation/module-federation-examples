"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseTemplate = exports.promiseFactory = exports.computeRemoteFilename = void 0;
const tslib_1 = require("tslib");
const Template_1 = tslib_1.__importDefault(require("./Template"));
const internal_1 = require("../src/internal");
const path_1 = tslib_1.__importDefault(require("path"));
const swc = require('@swc/core');
const transformInput = (code) => {
    return swc.transformSync(code, {
        // Some options cannot be specified in .swcrc
        sourceMaps: false,
        // Input files are treated as module by default.
        isModule: false,
        // All options below can be configured via .swcrc
        jsc: {
            loose: false,
            target: 'es5',
            externalHelpers: false,
            parser: {
                syntax: 'ecmascript',
            },
            transform: {},
        },
    }).code;
};
const computeRemoteFilename = (isServer, filename) => {
    if (isServer && filename) {
        return path_1.default.basename(filename);
    }
    return filename;
};
exports.computeRemoteFilename = computeRemoteFilename;
//remote is defined in the template wrapper
const remoteTemplate = function () {
    const index = urlAndGlobal.indexOf('@');
    if (index <= 0 || index === urlAndGlobal.length - 1) {
        throw new Error(`Invalid request "${urlAndGlobal}"`);
    }
    var remote = {
        url: urlAndGlobal.substring(index + 1),
        global: urlAndGlobal.substring(0, index), // this casting to satisfy TS
    };
    return new Promise(function (resolve, reject) {
        const __webpack_error__ = new Error();
        if (typeof window[remote.global] !== 'undefined') {
            return resolve();
        }
        __webpack_require__.l(remote.url, function (event) {
            if (typeof window[remote.global] !== 'undefined') {
                return resolve();
            }
            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
            var realSrc = event && event.target && event.target.src;
            __webpack_error__.message =
                'Loading script failed.(' +
                    errorType +
                    ': ' +
                    realSrc +
                    ' or global var ' +
                    remote.global +
                    ')';
            __webpack_error__.name = 'ScriptExternalLoadError';
            __webpack_error__.type = errorType;
            __webpack_error__.request = realSrc;
            reject(__webpack_error__);
        }, remote.global);
    }).then(function () {
        const remoteGlobal = window[remote.global];
        const proxy = {
            get: remoteGlobal.get,
            //@ts-ignore
            init: function (shareScope) {
                const handler = {
                    get(target, prop) {
                        if (target[prop]) {
                            Object.values(target[prop]).forEach(function (o) {
                                if (o.from === '_N_E') {
                                    o.loaded = 1;
                                }
                            });
                        }
                        return target[prop];
                    },
                    set(target, property, value, receiver) {
                        if (target[property]) {
                            return target[property];
                        }
                        target[property] = value;
                        return true;
                    },
                };
                try {
                    remoteGlobal.init(new Proxy(shareScope, handler));
                }
                catch (e) { }
                remoteGlobal.__initialized = true;
            },
        };
        if (!remoteGlobal.__initialized) {
            proxy.init();
        }
        return proxy;
    });
};
const promiseFactory = (factory) => {
    const wrapper = `new Promise(${factory.toString()})`;
    const isPromiseFactoryIncludesImportOrRequireContext = [
        'require(',
        'import(',
        'import ',
    ].some((statement) => wrapper.includes(statement));
    if (isPromiseFactoryIncludesImportOrRequireContext) {
        throw new Error('promiseFactory does not support require, import, or import statements');
    }
    const template = Template_1.default.asString([
        'function() {',
        Template_1.default.indent([wrapper]),
        '}',
    ]);
    return template;
};
exports.promiseFactory = promiseFactory;
const promiseTemplate = (remote, ...otherPromises) => {
    let promises = [];
    if (otherPromises) {
        promises = otherPromises.map((p) => {
            return Template_1.default.getFunctionContent((0, exports.promiseFactory)(p));
        });
    }
    let remoteSyntax = remote;
    let remoteFactory = internal_1.parseRemoteSyntax;
    if (typeof remote === 'function' ||
        remote.startsWith('function') ||
        remote.startsWith('(')) {
        remoteSyntax = Template_1.default.getFunctionContent((0, exports.promiseFactory)(remote));
        remoteFactory = (remoteSyntax) => {
            return Template_1.default.asString([
                `${remoteSyntax}.then(function(urlAndGlobal) {`,
                Template_1.default.indent([Template_1.default.getFunctionContent(remoteTemplate)]),
                '})',
            ]);
        };
    }
    const allPromises = [remoteFactory(remoteSyntax), ...promises].join(',\n');
    return Template_1.default.asString([
        'promise new Promise(function(resolve, reject) {',
        transformInput(Template_1.default.indent([
            'Promise.all([',
            Template_1.default.indent(allPromises),
            ']).then(function(promises) {',
            Template_1.default.indent(['resolve(promises[0]);']),
            '})',
        ])),
        '})',
    ]);
};
exports.promiseTemplate = promiseTemplate;
// remotes: {
//   shop: promiseTemplate('global@url', (resolve,reject) => {}),
//     shop: promiseTemplate(
//     // can also be a string if it needs to be computed in scope
//     `(resolve, reject) => {
//                 resolve("${remotes.shop}");
//               }`,
//     (resolve,reject)=>{
//       console.log('runing other promise');
//       setTimeout(() => {
//         console.log('resolving promise');
//         resolve();
//       } , 1000);
//     }),
//     checkout: remotes.checkout,
// },
//# sourceMappingURL=build-utils.js.map