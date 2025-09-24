const path = require('node:path');
const { createRequire } = require('node:module');

const requireFromHere = createRequire(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

function aliasModule(request) {
  let localPath;
  try {
    localPath = requireFromHere.resolve(request);
  } catch {
    return;
  }

  // Ensure the module is loaded so the cache entry exists.
  requireFromHere(request);

  try {
    const rootPath = requireFromHere.resolve(request, { paths: [repoRoot] });
    if (rootPath !== localPath && require.cache[localPath]) {
      require.cache[rootPath] = require.cache[localPath];
    }
  } catch {
    // The root dependency might not exist when running this example in
    // isolation. That's fine; in that case nothing extra is needed.
  }
}

aliasModule('@playwright/test');
aliasModule('playwright');
