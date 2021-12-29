// nod to parcel, i think they inspired this convention.
__webpack_public_path__ = new URL(document.currentScript.src).origin + '/';
console.log('this is webpack startup code, setting public path to:', __webpack_public_path__);
// since i just added a other module to the runtime, it ends up being the last module returned to the scope.
// For now, we need to re-export the container to the scope.
// you could use webpack internals to make this more dynamic, bue we will likely provide a internalized solution to attach a startup module
Object.assign(self, {
  app2: __webpack_require__('webpack/container/entry/app2'),
});
