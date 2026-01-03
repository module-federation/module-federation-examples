# Migration Guide: Enhanced Module Federation

Use this guide to migrate the examples to `@module-federation/enhanced` for both Webpack and Rspack, enable `asyncStartup`, and ensure correct entrypoint behavior.

Do not make any changes to rsbuild or modernjs or nextjs based apps. only pure webpack and rspack 

## 1) Use Enhanced Module Federation
- Webpack: import `@module-federation/enhanced/webpack` and use its `ModuleFederationPlugin`.
- Rspack: import `@module-federation/enhanced/rspack` and use its `ModuleFederationPlugin`.
Use the latest stable version on npm, add it to the package.json or update it in the app if needed

## 2) Rspack: use canary aliases (if required)
Add the canary aliases to `package.json` to ensure compatibility:

```json
{
  "devDependencies": {
    "@rspack/core": "npm:@rspack-canary/core@1.7.1-canary-becc2931-20260103070024",
    "@rspack/cli": "npm:@rspack-canary/cli@1.7.1-canary-becc2931-20260103070024"
  }
}
```

## 3) Enable async startup
Set `experiments.asyncStartup = true` on the `ModuleFederationPlugin` options.

Webpack example:
```js
// webpack.config.js
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      // name, remotes, exposes, shared, etc.
    }),
  ],
};
```

Rspack example:
```js
// rspack.config.js
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      // name, remotes, exposes, shared, etc.
    }),
  ],
};
```

## 4) Make entrypoints eager
Ensure the application bootstrap is imported eagerly. Replace dynamic imports of the bootstrap with a static import.

Before:
```js
import('./bootstrap');
```

After:
```js
import './bootstrap';
```

This guarantees the runtime starts immediately and coordinates correctly with `asyncStartup`.

## 5) Verify
- Run the dev server and navigate through routes that consume remotes.
- Confirm remotes load on first usage without timing issues.
- Check browser console for shared resolution or initialization errors.

## Notes
- Do not lazy-import the bootstrap entry when `asyncStartup` is enabled.
