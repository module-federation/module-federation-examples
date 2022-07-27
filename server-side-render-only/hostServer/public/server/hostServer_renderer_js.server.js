'use strict';
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = 'hostServer_renderer_js';
exports.ids = ['hostServer_renderer_js'];
exports.modules = {
  /***/ './hostServer/App.js':
    /*!***************************!*\
  !*** ./hostServer/App.js ***!
  \***************************/
    /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");\n/* harmony import */ var website2_SharedComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! website2/SharedComponent */ "webpack/container/remote/website2/SharedComponent");\n/* harmony import */ var website2_SharedComponent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(website2_SharedComponent__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar App = function App() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "Host Server"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((website2_SharedComponent__WEBPACK_IMPORTED_MODULE_1___default()), null));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (App);\n\n//# sourceURL=webpack://module-federation-ssr/./hostServer/App.js?',
      );

      /***/
    },

  /***/ './hostServer/renderer.js':
    /*!********************************!*\
  !*** ./hostServer/renderer.js ***!
  \********************************/
    /***/ function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/server */ "../node_modules/react-dom/server.js");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./hostServer/App.js");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }\n\n\n\n\n/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/(function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {\n    var html;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            html = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_0__.renderToString)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));\n            res.send(html);\n\n          case 2:\n          case "end":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n})());\n\n//# sourceURL=webpack://module-federation-ssr/./hostServer/renderer.js?',
      );

      /***/
    },
};
