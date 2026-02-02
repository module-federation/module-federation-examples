const runtimeNmd = module => {
  module.paths = module.paths || [];
  if (!module.children) {
    module.children = [];
  }
  return module;
};

export const ensureNmdPolyfill = () => {
  const runtimes = [];

  if (typeof __webpack_require__ === 'function') {
    runtimes.push(__webpack_require__);
  }

  if (typeof globalThis !== 'undefined' && typeof globalThis.__webpack_require__ === 'function') {
    runtimes.push(globalThis.__webpack_require__);
  }

  if (typeof Function.prototype.nmd !== 'function') {
    Function.prototype.nmd = runtimeNmd;
  }

  for (const runtime of runtimes) {
    if (typeof runtime.nmd !== 'function') {
      runtime.nmd = runtimeNmd;
    }
  }

  if (
    typeof globalThis !== 'undefined' &&
    typeof globalThis.__webpack_require__ !== 'function' &&
    runtimes.length > 0
  ) {
    globalThis.__webpack_require__ = runtimes[0];
  }
};

ensureNmdPolyfill();

export default ensureNmdPolyfill;
