import * as __WEBPACK_EXTERNAL_MODULE__remix_run_express__ from '@remix-run/express';
import * as __WEBPACK_EXTERNAL_MODULE__remix_run_node__ from '@remix-run/node';
import * as __WEBPACK_EXTERNAL_MODULE__remix_run_react__ from '@remix-run/react';
import * as __WEBPACK_EXTERNAL_MODULE_cors__ from 'cors';
import * as __WEBPACK_EXTERNAL_MODULE_express__ from 'express';
import * as __WEBPACK_EXTERNAL_MODULE_isbot__ from 'isbot';
import * as __WEBPACK_EXTERNAL_MODULE_react_dom_server__ from 'react-dom/server';
import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime__ from 'react/jsx-runtime';
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from 'module';
var __webpack_modules__ = {
"@remix-run/express": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE__remix_run_express__}),
"@remix-run/node": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE__remix_run_node__}),
"@remix-run/react": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE__remix_run_react__}),
"cors": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE_cors__}),
"express": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE_express__}),
"isbot": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE_isbot__}),
"react-dom/server": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom_server__}),
"react/jsx-runtime": (function (module, exports, __webpack_require__) {
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
            var y = x => () => x
            module.exports = __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime__}),
"node:stream": (function (module, exports, __webpack_require__) {
__WEBPACK_EXTERNAL_createRequire(import.meta.url)('node:stream')}),
"./.cache/server-build.js": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  entry: function() { return entry; },
  routes: function() { return routes; },
  assets: function() { return assets; },
  future: function() { return future; },
  publicPath: function() { return publicPath; }
});
/* harmony import */var _Users_zackjackson_lulu_dev_module_federation_examples_node_modules_pnpm_remix_run_dev_2_2_0_types_node_20_9_0_typescript_5_2_2_node_modules_remix_run_dev_dist_config_defaults_entry_server_node_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* /Users/zackjackson/lulu_dev/module-federation-examples/node_modules/.pnpm/@remix-run+dev@2.2.0_@types+node@20.9.0_typescript@5.2.2/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx */"../../node_modules/.pnpm/@remix-run+dev@2.2.0_@types+node@20.9.0_typescript@5.2.2/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx");
/* harmony import */var _app_root_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ../app/root.tsx */"./app/root.tsx");
/* harmony import */var _app_routes_index_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/* ../app/routes/_index.tsx */"./app/routes/_index.tsx");



 const entry = {
    module: _Users_zackjackson_lulu_dev_module_federation_examples_node_modules_pnpm_remix_run_dev_2_2_0_types_node_20_9_0_typescript_5_2_2_node_modules_remix_run_dev_dist_config_defaults_entry_server_node_tsx__WEBPACK_IMPORTED_MODULE_0__
};
 const routes = {
    "root": {
        id: "root",
        parentId: undefined,
        path: "",
        index: undefined,
        caseSensitive: undefined,
        module: _app_root_tsx__WEBPACK_IMPORTED_MODULE_1__
    },
    "routes/_index": {
        id: "routes/_index",
        parentId: "root",
        path: undefined,
        index: true,
        caseSensitive: undefined,
        module: _app_routes_index_tsx__WEBPACK_IMPORTED_MODULE_2__
    }
};
 const assets = {
    "version": "3fa11160186179d5b983",
    "url": "/build/manifest-3FA11160186179D5B983.js",
    "entry": {
        "imports": [
            "/build/runtime-cb6a0d8bac21c032c4c5.js",
            "/build/entry.client-6c38fdcf3a9e42fa989e.js",
            "/build/root-40cf8f30f6810d582feb.js"
        ],
        "module": "/build/entry.client-6c38fdcf3a9e42fa989e.js"
    },
    "routes": {
        "root": {
            "id": "root",
            "path": "",
            "module": "/build/root-40cf8f30f6810d582feb.js",
            "imports": [
                "/build/runtime-cb6a0d8bac21c032c4c5.js"
            ],
            "hasAction": false,
            "hasLoader": true,
            "hasCatchBoundary": false,
            "hasErrorBoundary": false
        },
        "routes/_index": {
            "id": "routes/_index",
            "parentId": "root",
            "index": true,
            "module": "/build/routes/_index-e2583b3bf88263c95d92.js",
            "imports": [
                "/build/runtime-cb6a0d8bac21c032c4c5.js"
            ],
            "hasAction": false,
            "hasLoader": true,
            "hasCatchBoundary": false,
            "hasErrorBoundary": false
        }
    }
};
 const future = {
    "v3_fetcherPersist": false
};
 const publicPath = "/build/";
}),
"../../node_modules/.pnpm/@remix-run+dev@2.2.0_@types+node@20.9.0_typescript@5.2.2/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return handleRequest; }
});
/* harmony import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* react/jsx-runtime */"react/jsx-runtime");
/* harmony import */var node_stream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* node:stream */"node:stream");
/* harmony import */var node_stream__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_stream__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */var _remix_run_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/* @remix-run/node */"@remix-run/node");
/* harmony import */var _remix_run_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/* @remix-run/react */"@remix-run/react");
/* harmony import */var isbot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/* isbot */"isbot");
/* harmony import */var react_dom_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/* react-dom/server */"react-dom/server");






const ABORT_DELAY = 5_000;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
    return (0, isbot__WEBPACK_IMPORTED_MODULE_4__["default"])(request.headers.get("user-agent")) ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return new Promise((resolve, reject)=>{
        let shellRendered = false;
        const { pipe, abort } = (0, react_dom_server__WEBPACK_IMPORTED_MODULE_5__.renderToPipeableStream)((0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_remix_run_react__WEBPACK_IMPORTED_MODULE_3__.RemixServer, {
            context: remixContext,
            url: request.url,
            abortDelay: ABORT_DELAY
        }), {
            onAllReady () {
                shellRendered = true;
                const body = new node_stream__WEBPACK_IMPORTED_MODULE_1__.PassThrough();
                const stream = (0, _remix_run_node__WEBPACK_IMPORTED_MODULE_2__.createReadableStreamFromReadable)(body);
                responseHeaders.set("Content-Type", "text/html");
                resolve(new Response(stream, {
                    headers: responseHeaders,
                    status: responseStatusCode
                }));
                pipe(body);
            },
            onShellError (error) {
                reject(error);
            },
            onError (error) {
                responseStatusCode = 500;
                // Log streaming rendering errors from inside the shell.  Don't log
                // errors encountered during initial shell rendering since they'll
                // reject and get logged in handleDocumentRequest.
                if (shellRendered) console.error(error);
            }
        });
        setTimeout(abort, ABORT_DELAY);
    });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return new Promise((resolve, reject)=>{
        let shellRendered = false;
        const { pipe, abort } = (0, react_dom_server__WEBPACK_IMPORTED_MODULE_5__.renderToPipeableStream)((0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_remix_run_react__WEBPACK_IMPORTED_MODULE_3__.RemixServer, {
            context: remixContext,
            url: request.url,
            abortDelay: ABORT_DELAY
        }), {
            onShellReady () {
                shellRendered = true;
                const body = new node_stream__WEBPACK_IMPORTED_MODULE_1__.PassThrough();
                const stream = (0, _remix_run_node__WEBPACK_IMPORTED_MODULE_2__.createReadableStreamFromReadable)(body);
                responseHeaders.set("Content-Type", "text/html");
                resolve(new Response(stream, {
                    headers: responseHeaders,
                    status: responseStatusCode
                }));
                pipe(body);
            },
            onShellError (error) {
                reject(error);
            },
            onError (error) {
                responseStatusCode = 500;
                // Log streaming rendering errors from inside the shell.  Don't log
                // errors encountered during initial shell rendering since they'll
                // reject and get logged in handleDocumentRequest.
                if (shellRendered) console.error(error);
            }
        });
        setTimeout(abort, ABORT_DELAY);
    });
}
}),
"./app/root.tsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  loader: function() { return loader; },
  "default": function() { return App; }
});
/* harmony import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* react/jsx-runtime */"react/jsx-runtime");
/* harmony import */var _remix_run_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* @remix-run/react */"@remix-run/react");


 function loader() {
    return "Hello, World!";
}
function App() {
    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("html", {
        lang: "en",
        children: [
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("head", {
                children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        charSet: "utf-8"
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_remix_run_react__WEBPACK_IMPORTED_MODULE_1__.Meta, {}),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_remix_run_react__WEBPACK_IMPORTED_MODULE_1__.Links, {})
                ]
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_remix_run_react__WEBPACK_IMPORTED_MODULE_1__.Outlet, {}),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_remix_run_react__WEBPACK_IMPORTED_MODULE_1__.ScrollRestoration, {}),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_remix_run_react__WEBPACK_IMPORTED_MODULE_1__.Scripts, {})
                ]
            })
        ]
    });
}
}),
"./app/routes/_index.tsx": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  loader: function() { return loader; },
  "default": function() { return Home; }
});
/* harmony import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* react/jsx-runtime */"react/jsx-runtime");
/* harmony import */var _remix_run_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* @remix-run/react */"@remix-run/react");


 function loader() {
    return {
        message: "Hello, World!"
    };
}
function Home() {
    const { message } = (0, _remix_run_react__WEBPACK_IMPORTED_MODULE_1__.useLoaderData)();
    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                children: "Home"
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                children: message
            })
        ]
    });
}
}),
"./server.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* express */"express");
/* harmony import */var _remix_run_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* @remix-run/express */"@remix-run/express");
/* harmony import */var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/* cors */"cors");
/* harmony import */var _remix_run_dev_server_build_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/* @remix-run/dev/server-build.js */"./.cache/server-build.js");




const app = (0, express__WEBPACK_IMPORTED_MODULE_0__["default"])();
app.use((0, cors__WEBPACK_IMPORTED_MODULE_2__["default"])());
app.use(express__WEBPACK_IMPORTED_MODULE_0__["default"].static("public"));
app.use('/server', express__WEBPACK_IMPORTED_MODULE_0__["default"].static("build"));
app.all("*", (0, _remix_run_express__WEBPACK_IMPORTED_MODULE_1__.createRequestHandler)({
    build: _remix_run_dev_server_build_js__WEBPACK_IMPORTED_MODULE_3__
}));
app.listen(3001, ()=>{
    console.log(`Server started at http://localhost:3001`);
});
}),

}
// The module cache
 var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
// Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
      return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
       exports: {}
      });
      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
// Return the exports of the module
 return module.exports;

}
// webpack/runtime/has_own_property
!function() {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

}();
// webpack/runtime/define_property_getters
!function() {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
}();
// webpack/runtime/make_namespace_object
!function() {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};

}();
// webpack/runtime/compat_get_default_export
!function() {
// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function (module) {
	var getter = module && module.__esModule ?
		function () { return module['default']; } :
		function () { return module; };
	__webpack_require__.d(getter, { a: getter });
	return getter;
};




}();
var __webpack_exports__ = __webpack_require__("./server.ts");
//# sourceMappingURL=index.js.map