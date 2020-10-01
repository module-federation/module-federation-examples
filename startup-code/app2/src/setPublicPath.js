__webpack_public_path__ = new URL(document.currentScript.src).origin + "/";
console.log(
  "this is webpack startup code, setting public path to:",
  __webpack_public_path__
);
Object.assign(window, {
  app2: __webpack_require__("webpack/container/entry/app2"),
});
