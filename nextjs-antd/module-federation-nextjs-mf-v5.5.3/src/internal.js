"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDisplayErrors = exports.parseRemotes = exports.parseRemoteSyntax = exports.removePlugins = exports.getOutputPath = exports.externalizedShares = exports.internalizeSharedPackages = exports.generateRemoteTemplate = exports.reKeyHostShared = exports.DEFAULT_SHARE_SCOPE = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const options_1 = require("webpack/lib/container/options");
const utils_1 = require("webpack/lib/sharing/utils");
const utilities_1 = require("@module-federation/utilities");
// the share scope we attach by default
// in hosts we re-key them to prevent webpack moving the modules into their own chunks (cause eager error)
// in remote these are marked as import:false as we always expect the host to prove them
exports.DEFAULT_SHARE_SCOPE = {
    react: {
        singleton: true,
        requiredVersion: false,
    },
    'react/jsx-runtime': {
        singleton: true,
        requiredVersion: false,
    },
    'react-dom': {
        singleton: true,
        requiredVersion: false,
    },
    'next/dynamic': {
        requiredVersion: false,
        singleton: true,
    },
    'styled-jsx': {
        requiredVersion: false,
        singleton: true,
    },
    'next/link': {
        requiredVersion: false,
        singleton: true,
    },
    'next/router': {
        requiredVersion: false,
        singleton: true,
    },
    'next/script': {
        requiredVersion: false,
        singleton: true,
    },
    'next/head': {
        requiredVersion: false,
        singleton: true,
    },
};
// put host in-front of any shared module key, so "hostreact"
const reKeyHostShared = (options = {}) => {
    const shared = {
        ...options,
        ...exports.DEFAULT_SHARE_SCOPE,
    };
    return Object.entries(shared).reduce((acc, item) => {
        const [itemKey, shareOptions] = item;
        const shareKey = 'host' + (item.shareKey || itemKey);
        acc[shareKey] = shareOptions;
        if (!shareOptions.import) {
            acc[shareKey].import = itemKey;
        }
        if (!shareOptions.shareKey) {
            acc[shareKey].shareKey = itemKey;
        }
        if (exports.DEFAULT_SHARE_SCOPE[itemKey]) {
            acc[shareKey].packageName = itemKey;
        }
        return acc;
    }, {});
};
exports.reKeyHostShared = reKeyHostShared;
// browser template to convert remote into promise new promise and use require.loadChunk to load the chunk
const generateRemoteTemplate = (url, global) => {
    return `new Promise(function (resolve, reject) {
    var __webpack_error__ = new Error();
    if (typeof ${global} !== 'undefined') return resolve();
    __webpack_require__.l(
      ${JSON.stringify(url)},
      function (event) {
        if (typeof ${global} !== 'undefined') return resolve();
        var errorType = event && (event.type === 'load' ? 'missing' : event.type);
        var realSrc = event && event.target && event.target.src;
        __webpack_error__.message =
          'Loading script failed.\\n(' + errorType + ': ' + realSrc + ')';
        __webpack_error__.name = 'ScriptExternalLoadError';
        __webpack_error__.type = errorType;
        __webpack_error__.request = realSrc;
        reject(__webpack_error__);
      },
      ${JSON.stringify(global)},
    );
  }).then(function () {
    const proxy = {
      get: ${global}.get,
      init: function(shareScope) {
        const handler = {
          get(target, prop) {
            if (target[prop]) {
              Object.values(target[prop]).forEach(function(o) {
                if(o.from === '_N_E') {
                  o.loaded = 1
                }
              })
            }
            return target[prop]
          },
          set(target, property, value, receiver) {
            if (target[property]) {
              return target[property]
            }
            target[property] = value
            return true
          }
        }
        try {
          ${global}.init(new Proxy(shareScope, handler))
        } catch (e) {

        }
        ${global}.__initialized = true
      }
    }
    if (!${global}.__initialized) {
      proxy.init()
    }
    return proxy
  })`;
};
exports.generateRemoteTemplate = generateRemoteTemplate;
// shared packages must be compiled into webpack bundle, not require() pass through
const internalizeSharedPackages = (options, compiler) => {
    //TODO: should use this util for other areas where we read MF options from userland
    if (!options.shared) {
        return;
    }
    const sharedOptions = parseShareOptions(options);
    // get share keys from user, filter out ones that need to be external
    const internalizableKeys = Object.keys(sharedOptions).filter((key) => {
        if (!exports.DEFAULT_SHARE_SCOPE[key]) {
            return true;
        }
        const index = sharedOptions[key].import;
        if (index && !exports.DEFAULT_SHARE_SCOPE[index]) {
            return true;
        }
        return false;
    });
    if (Array.isArray(compiler.options.externals)) {
        // take original externals regex
        const backupExternals = compiler.options.externals[0];
        // if externals is a function (like when you're not running in serverless mode or creating a single build)
        if (typeof backupExternals === 'function') {
            // replace externals function with short-circuit, or fall back to original algo
            compiler.options.externals[0] = (mod, callback) => {
                if (!internalizableKeys.some((v) => mod.request?.includes(v))) {
                    return backupExternals(mod, callback);
                }
                // bundle it
                return Promise.resolve();
            };
        }
    }
};
exports.internalizeSharedPackages = internalizeSharedPackages;
exports.externalizedShares = Object.entries(exports.DEFAULT_SHARE_SCOPE).reduce((acc, item) => {
    const [key, value] = item;
    acc[key] = { ...value, import: false };
    if (key === 'react/jsx-runtime') {
        delete acc[key].import;
    }
    return acc;
}, {});
// determine output base path, derives .next folder location
const getOutputPath = (compiler) => {
    const isServer = compiler.options.target !== 'client';
    let outputPath = compiler.options.output.path?.split(path_1.default.sep);
    const foundIndex = outputPath?.findIndex((i) => {
        return i === (isServer ? 'server' : 'static');
    });
    outputPath = outputPath
        ?.slice(0, foundIndex && foundIndex > 0 ? foundIndex : outputPath.length)
        .join(path_1.default.sep);
    return outputPath;
};
exports.getOutputPath = getOutputPath;
exports.removePlugins = [
    'NextJsRequireCacheHotReloader',
    'BuildManifestPlugin',
    'WellKnownErrorsPlugin',
    'WebpackBuildEventsPlugin',
    'HotModuleReplacementPlugin',
    'NextMiniCssExtractPlugin',
    'NextFederationPlugin',
    'CopyFilePlugin',
    'ProfilingPlugin',
    'DropClientPage',
    'ReactFreshWebpackPlugin',
];
const parseRemoteSyntax = (remote) => {
    if (typeof remote === 'string' && remote.includes('@')) {
        const [url, global] = (0, utilities_1.extractUrlAndGlobal)(remote);
        return (0, exports.generateRemoteTemplate)(url, global);
    }
    return remote;
};
exports.parseRemoteSyntax = parseRemoteSyntax;
const parseRemotes = (remotes) => {
    return Object.entries(remotes).reduce((acc, remote) => {
        if (!remote[1].startsWith('promise ') && remote[1].includes('@')) {
            acc[remote[0]] = 'promise ' + (0, exports.parseRemoteSyntax)(remote[1]);
            return acc;
        }
        acc[remote[0]] = remote[1];
        return acc;
    }, {});
};
exports.parseRemotes = parseRemotes;
const parseShareOptions = (options) => {
    const sharedOptions = (0, options_1.parseOptions)(options.shared, (item, key) => {
        if (typeof item !== 'string')
            throw new Error('Unexpected array in shared');
        /** @type {SharedConfig} */
        const config = item === key || !(0, utils_1.isRequiredVersion)(item)
            ? {
                import: item,
            }
            : {
                import: key,
                requiredVersion: item,
            };
        return config;
    }, (item) => item);
    return sharedOptions.reduce((acc, [key, options]) => {
        acc[key] = {
            import: options.import,
            shareKey: options.shareKey || key,
            shareScope: options.shareScope,
            requiredVersion: options.requiredVersion,
            strictVersion: options.strictVersion,
            singleton: options.singleton,
            packageName: options.packageName,
            eager: options.eager,
        };
        return acc;
    }, {});
};
const toDisplayErrors = (err) => {
    return err
        .map((error) => {
        let message = error.message;
        if (error.stack) {
            message += '\n' + error.stack;
        }
        return message;
    })
        .join('\n');
};
exports.toDisplayErrors = toDisplayErrors;
//# sourceMappingURL=internal.js.map