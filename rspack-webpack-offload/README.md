# rspack as vendor offload to webpack

Speed up webpack by offloading shared modules to rspack which can parse them faster.

In this, we disable module share imports in webpack with
`import: false` on share scope

In rspack, we ensure these modules are actually used in the build somewhere, so they are not tree shaken out.
Often ill expose a file that imports it all to force the modules to exist, then never load that exposed key.

Now rspack will only provide npm packages, webpack will treat them as externals and expect rspack to provide them over federation.

[中文](./README_zh-cn.md)

A complete Webpack Module Federation Case with React.

# project directory

## lib-app

It is a low-level or basic app, which exposes libraries like `react`, `react-dom`.

It is a pure `remote` using rspack

## component-app

It is a middle-level app, which depends on modules exposed from `lib-app` : `react` ,`react-dom`. In the meantime, it also exposes components: `Dialog`, `Button` to another app called `main-app`.

It is both host and remote, uses webpack

## main-app

the top-level app, which depends on `lib-app` and `component-app`.

It is a pure host, uses webpack

# how to use

- `pnpm install`
- `pnpm run start`

after all the commands done, open your browser at `http://localhost:3002`, open the dev-tool's network tab to see resources loading details




["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)
